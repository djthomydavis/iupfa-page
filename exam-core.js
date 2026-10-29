// Núcleo del simulador de evaluaciones: corrección, validación del editor y
// troceo de texto con fórmulas. Son funciones puras (sin DOM) para poder
// probarlas con Node (`node --test "tests/*.test.js"`); en el navegador se
// cargan como script normal antes de app.js y quedan como globales.
(function (root) {
  const DEFAULT_EXAM_CONFIG = Object.freeze({
    pointsPerQuestion: 0.5,
    fpPenaltyEnabled: true,
    fpPenalty: 0.2,
    fnPenaltyEnabled: true,
    fnPenalty: 0.1,
    passMode: 'percent',
    passValue: 60
  });

  function round2(value) {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }

  // 0.2 -> "0,2", -0.1 -> "−0,1", 10 -> "10".
  function formatScore(value) {
    const rounded = round2(value);
    const text = String(Math.abs(rounded)).replace('.', ',');
    return rounded < 0 ? `−${text}` : text;
  }

  const MULTIPLE_CHOICE = 'multiple_choice';

  function isMultipleChoice(question) {
    return question.type === MULTIPLE_CHOICE;
  }

  // Opción múltiple: la opción correcta suma el puntaje de la pregunta; una
  // incorrecta o en blanco vale 0 (nunca resta).
  function scoreChoiceQuestion(question, answer, config) {
    const marked = Number.isInteger(answer) && answer >= 0 && answer < question.options.length ? answer : null;
    const blank = marked === null;
    const outcome = blank ? 'blank' : marked === question.correct ? 'ok' : 'wrong';
    return {
      score: outcome === 'ok' ? round2(Number(config.pointsPerQuestion)) : 0,
      fp: 0,
      fn: 0,
      statements: [],
      voided: false,
      choice: { marked, correct: question.correct, outcome, blank }
    };
  }

  // Regla de corrección V/F (spec "Regla de corrección"):
  // - en blanco cuenta como error: FP si era F, FN si era V;
  // - un error de un tipo cuyo descuento está desactivado deja la pregunta en 0;
  // - si no, P − FP × descuentoFP − FN × descuentoFN (puede quedar negativa).
  function scoreQuestion(question, answers, config) {
    if (isMultipleChoice(question)) return scoreChoiceQuestion(question, answers, config);
    const marks = answers || [];
    let fp = 0;
    let fn = 0;
    const statements = question.statements.map((statement, index) => {
      const marked = marks[index] === true || marks[index] === false ? marks[index] : null;
      const blank = marked === null;
      let outcome = 'ok';
      if (blank || marked !== statement.answer) outcome = statement.answer ? 'fn' : 'fp';
      if (outcome === 'fp') fp += 1;
      if (outcome === 'fn') fn += 1;
      return { answer: statement.answer, marked, outcome, blank };
    });

    const voided = (fp > 0 && !config.fpPenaltyEnabled) || (fn > 0 && !config.fnPenaltyEnabled);
    const score = voided
      ? 0
      : round2(Number(config.pointsPerQuestion) - fp * Number(config.fpPenalty) - fn * Number(config.fnPenalty));
    return { score, fp, fn, statements, voided };
  }

  function scoreExam(exam, answersByQuestionId) {
    const config = { ...DEFAULT_EXAM_CONFIG, ...(exam.config || {}) };
    const answers = answersByQuestionId || {};
    const questions = exam.questions.map(question => ({
      id: question.id,
      ...scoreQuestion(question, answers[question.id], config)
    }));
    const total = round2(questions.reduce((sum, question) => sum + question.score, 0));
    const max = round2(Number(config.pointsPerQuestion) * questions.length);
    const percent = max > 0 ? round2((total / max) * 100) : 0;
    const passed = config.passMode === 'points'
      ? total >= Number(config.passValue)
      : percent >= Number(config.passValue);
    return { total, max, percent, passed, questions };
  }

  // Resumen de desempeño para el final del examen: puntaje por tema
  // (question.topic, en orden de aparición) y patrón de errores.
  // Fuerte: ≥ 70 % del puntaje del tema; débil: < 50 %; en el medio, a reforzar.
  function buildPerformanceSummary(exam, result) {
    const config = { ...DEFAULT_EXAM_CONFIG, ...(exam.config || {}) };
    const byTopic = new Map();
    exam.questions.forEach((question, index) => {
      const topic = String(question.topic || '').trim();
      if (!topic) return;
      if (!byTopic.has(topic)) byTopic.set(topic, { topic, earned: 0, max: 0 });
      const entry = byTopic.get(topic);
      entry.earned += result.questions[index].score;
      entry.max += Number(config.pointsPerQuestion);
    });

    const topics = [...byTopic.values()].map(entry => {
      const earned = round2(entry.earned);
      const max = round2(entry.max);
      const percent = max > 0 ? round2((earned / max) * 100) : 0;
      const level = percent >= 70 ? 'strong' : percent < 50 ? 'weak' : 'mid';
      return { topic: entry.topic, earned, max, percent, level };
    });

    const statements = result.questions.flatMap(question => question.statements);
    const choices = result.questions.map(question => question.choice).filter(Boolean);
    const fp = statements.filter(statement => statement.outcome === 'fp').length;
    const fn = statements.filter(statement => statement.outcome === 'fn').length;
    const wrong = choices.filter(choice => choice.outcome !== 'ok').length;
    const blanks = statements.filter(statement => statement.blank).length + choices.filter(choice => choice.blank).length;
    const total = fp + fn + wrong;
    let pattern = 'balanced';
    if (total === 0) pattern = 'none';
    else if (blanks * 2 >= total) pattern = 'blanks';
    else if (wrong >= fp + fn) pattern = 'mc';
    else if (fp >= 2 * fn) pattern = 'fp';
    else if (fn >= 2 * fp) pattern = 'fn';

    const byLevel = level => topics.filter(topic => topic.level === level).map(topic => topic.topic);
    return {
      topics,
      strengths: byLevel('strong'),
      reinforce: byLevel('mid'),
      weaknesses: byLevel('weak'),
      errors: { fp, fn, wrong, blanks, total },
      pattern
    };
  }

  // Separa un texto en tramos de texto común y fórmulas LaTeX:
  // $...$ en línea, $$...$$ en bloque, \$ fuera de una fórmula es un "$"
  // literal y una fórmula sin cerrar queda como texto.
  function splitMathSegments(text) {
    const source = String(text || '');
    const segments = [];
    let buffer = '';
    const pushText = value => {
      if (!value) return;
      const last = segments[segments.length - 1];
      if (last && last.type === 'text') last.value += value;
      else segments.push({ type: 'text', value, display: false });
    };

    let index = 0;
    while (index < source.length) {
      const char = source[index];
      if (char === '\\' && source[index + 1] === '$') {
        buffer += '$';
        index += 2;
        continue;
      }
      if (char !== '$') {
        buffer += char;
        index += 1;
        continue;
      }

      const display = source[index + 1] === '$';
      const delimiter = display ? '$$' : '$';
      let cursor = index + delimiter.length;
      let math = '';
      let closed = false;
      while (cursor < source.length) {
        if (source[cursor] === '\\' && cursor + 1 < source.length) {
          math += source[cursor] + source[cursor + 1];
          cursor += 2;
          continue;
        }
        if (source.startsWith(delimiter, cursor)) {
          closed = true;
          break;
        }
        math += source[cursor];
        cursor += 1;
      }

      if (!closed || !math.trim()) {
        buffer += delimiter;
        index += delimiter.length;
        continue;
      }
      pushText(buffer);
      buffer = '';
      segments.push({ type: 'math', value: math, display });
      index = cursor + delimiter.length;
    }
    pushText(buffer);
    return segments;
  }

  function isNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
  }

  function validateExamDraft(draft) {
    const errors = {};
    const config = draft.config || {};

    if (!String(draft.title || '').trim()) errors.title = 'Escribí un título.';
    if (draft.durationMinutes !== null && draft.durationMinutes !== undefined && draft.durationMinutes !== '') {
      if (!isNumber(draft.durationMinutes) || draft.durationMinutes < 1) {
        errors.durationMinutes = 'La duración tiene que ser de al menos 1 minuto, o quedar vacía (sin límite).';
      }
    }
    if (!isNumber(config.pointsPerQuestion) || config.pointsPerQuestion <= 0) {
      errors['config.pointsPerQuestion'] = 'El puntaje por pregunta tiene que ser mayor a 0.';
    }
    ['fpPenalty', 'fnPenalty', 'passValue'].forEach(key => {
      if (!isNumber(config[key]) || config[key] < 0) errors[`config.${key}`] = 'Tiene que ser un número mayor o igual a 0.';
    });

    const questions = draft.questions || [];
    if (!questions.length) errors.questions = 'Agregá al menos una pregunta.';
    questions.forEach((question, qIndex) => {
      if (!String(question.prompt || '').trim()) errors[`questions.${qIndex}.prompt`] = 'Escribí el enunciado.';
      if (isMultipleChoice(question)) {
        const options = question.options || [];
        if (options.length < 2) errors[`questions.${qIndex}.options`] = 'Cada pregunta necesita al menos 2 opciones.';
        options.forEach((option, oIndex) => {
          if (!String(option.text || '').trim()) errors[`questions.${qIndex}.options.${oIndex}.text`] = 'Escribí la opción.';
        });
        if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct >= options.length) {
          errors[`questions.${qIndex}.correct`] = 'Marcá cuál es la opción correcta.';
        }
        return;
      }
      const statements = question.statements || [];
      if (statements.length < 2) errors[`questions.${qIndex}.statements`] = 'Cada pregunta necesita al menos 2 afirmaciones.';
      statements.forEach((statement, sIndex) => {
        if (!String(statement.text || '').trim()) {
          errors[`questions.${qIndex}.statements.${sIndex}.text`] = 'Escribí la afirmación.';
        }
      });
    });

    return { ok: Object.keys(errors).length === 0, errors };
  }

  // Elige al azar una evaluación con preguntas para "Iniciar prueba". Si hay
  // más de una, evita repetir la última que se rindió. random() devuelve un
  // número en [0, 1), como Math.random (se pasa para poder probarlo).
  function pickRandomExam(exams, lastExamId, random) {
    const available = (exams || []).filter(exam => exam.questions && exam.questions.length);
    if (!available.length) return null;
    const pool = available.length > 1 ? available.filter(exam => exam.id !== lastExamId) : available;
    const index = Math.min(pool.length - 1, Math.floor((random || Math.random)() * pool.length));
    return pool[index];
  }

  const api = { DEFAULT_EXAM_CONFIG, MULTIPLE_CHOICE, isMultipleChoice, round2, formatScore, scoreQuestion, scoreExam, buildPerformanceSummary, splitMathSegments, validateExamDraft, pickRandomExam };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else Object.assign(root, api);
})(typeof window !== 'undefined' ? window : globalThis);
