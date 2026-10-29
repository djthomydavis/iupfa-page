const { test } = require('node:test');
const assert = require('node:assert/strict');
const core = require('../exam-core.js');

const cfg = core.DEFAULT_EXAM_CONFIG;

// 'VFFVF' -> pregunta con esas respuestas correctas.
function q(answers, id = 'q1') {
  return {
    id,
    type: 'true_false_statements',
    prompt: 'Pregunta',
    statements: [...answers].map((letter, index) => ({ text: `Afirmación ${index + 1}`, answer: letter === 'V' })),
  };
}

// 'VV_FF' -> respuestas marcadas ('_' = en blanco).
function m(marks) {
  return [...marks].map(letter => (letter === '_' ? null : letter === 'V'));
}

test('todo correcto vale 0,5', () => {
  const result = core.scoreQuestion(q('VFFVF'), m('VFFVF'), cfg);
  assert.equal(result.score, 0.5);
  assert.equal(result.fp, 0);
  assert.equal(result.fn, 0);
  assert.equal(result.voided, false);
});

test('ejemplo del usuario: 1 FP y 1 FN da 0,2', () => {
  const result = core.scoreQuestion(q('VFFVF'), m('VVFFF'), cfg);
  assert.equal(result.score, 0.2);
  assert.equal(result.fp, 1);
  assert.equal(result.fn, 1);
  assert.equal(result.statements[1].outcome, 'fp');
  assert.equal(result.statements[3].outcome, 'fn');
  assert.equal(result.statements[0].outcome, 'ok');
});

test('puede quedar negativa', () => {
  assert.equal(core.scoreQuestion(q('FFFFF'), m('VVVFF'), cfg).score, -0.1);
});

test('en blanco y era F cuenta como FP', () => {
  const result = core.scoreQuestion(q('VFFVF'), m('V_FVF'), cfg);
  assert.equal(result.score, 0.3);
  assert.equal(result.statements[1].outcome, 'fp');
  assert.equal(result.statements[1].blank, true);
  assert.equal(result.statements[1].marked, null);
});

test('en blanco y era V cuenta como FN', () => {
  const result = core.scoreQuestion(q('VFFVF'), m('VFF_F'), cfg);
  assert.equal(result.score, 0.4);
  assert.equal(result.statements[3].outcome, 'fn');
});

test('FP desactivado anula la pregunta', () => {
  const result = core.scoreQuestion(q('VFFVF'), m('VVFVF'), { ...cfg, fpPenaltyEnabled: false });
  assert.equal(result.score, 0);
  assert.equal(result.voided, true);
});

test('FP desactivado no afecta a los FN', () => {
  const result = core.scoreQuestion(q('VFFVF'), m('VFFFF'), { ...cfg, fpPenaltyEnabled: false });
  assert.equal(result.score, 0.4);
  assert.equal(result.voided, false);
});

test('error de tipo desactivado anula aunque haya errores del tipo activo', () => {
  const result = core.scoreQuestion(q('VFFVF'), m('VVFFF'), { ...cfg, fnPenaltyEnabled: false });
  assert.equal(result.score, 0);
  assert.equal(result.voided, true);
});

function exam(passMode, passValue) {
  return { id: 'e1', config: { ...cfg, passMode, passValue }, questions: [q('VFFVF', 'a'), q('VFFVF', 'b')] };
}

test('scoreExam suma, calcula máximo y porcentaje', () => {
  const result = core.scoreExam(exam('percent', 60), { a: m('VFFVF'), b: m('VVFFF') });
  assert.equal(result.total, 0.7);
  assert.equal(result.max, 1);
  assert.equal(result.percent, 70);
  assert.equal(result.questions.length, 2);
  assert.equal(result.questions[1].id, 'b');
  assert.equal(result.questions[1].score, 0.2);
});

test('aprobación por porcentaje es inclusiva', () => {
  const answers = { a: m('VFFVF'), b: m('VVFFF') };
  assert.equal(core.scoreExam(exam('percent', 70), answers).passed, true);
  assert.equal(core.scoreExam(exam('percent', 71), answers).passed, false);
});

test('aprobación por puntos', () => {
  const answers = { a: m('VFFVF'), b: m('VVFFF') };
  assert.equal(core.scoreExam(exam('points', 0.7), answers).passed, true);
  assert.equal(core.scoreExam(exam('points', 0.71), answers).passed, false);
});

test('pregunta sin respuestas en answersByQuestionId va toda en blanco', () => {
  const result = core.scoreExam(exam('percent', 60), { a: m('VFFVF') });
  const blank = result.questions[1];
  assert.equal(blank.statements.every(statement => statement.blank), true);
  // VFFVF en blanco: 2 FN (V) y 3 FP (F) -> 0,5 - 0,6 - 0,2 = -0,3
  assert.equal(blank.score, -0.3);
  assert.equal(result.total, 0.2);
});

test('scoreExam con 0 preguntas no divide por cero', () => {
  const result = core.scoreExam({ id: 'e', config: cfg, questions: [] }, {});
  assert.equal(result.max, 0);
  assert.equal(result.percent, 0);
});

test('formatScore', () => {
  assert.equal(core.formatScore(0.2), '0,2');
  assert.equal(core.formatScore(-0.1), '−0,1');
  assert.equal(core.formatScore(10), '10');
  assert.equal(core.formatScore(0.1 + 0.2), '0,3');
  assert.equal(core.formatScore(0), '0');
});

test('round2 evita errores de coma flotante', () => {
  assert.equal(core.round2(0.5 - 0.2 - 0.1), 0.2);
});

test('splitMathSegments separa texto y fórmulas', () => {
  assert.deepEqual(core.splitMathSegments('Sea $x^2$ y $$y$$.'), [
    { type: 'text', value: 'Sea ', display: false },
    { type: 'math', value: 'x^2', display: false },
    { type: 'text', value: ' y ', display: false },
    { type: 'math', value: 'y', display: true },
    { type: 'text', value: '.', display: false },
  ]);
});

test('splitMathSegments: \\$ es un signo pesos literal', () => {
  assert.deepEqual(core.splitMathSegments('Cuesta \\$1500 y \\$200'), [
    { type: 'text', value: 'Cuesta $1500 y $200', display: false },
  ]);
});

test('splitMathSegments: \\$ dentro de una fórmula queda en la fórmula', () => {
  assert.deepEqual(core.splitMathSegments('$x = \\$5$'), [
    { type: 'math', value: 'x = \\$5', display: false },
  ]);
});

test('splitMathSegments: $ sin cerrar queda como texto', () => {
  assert.deepEqual(core.splitMathSegments('Precio $ 15'), [
    { type: 'text', value: 'Precio $ 15', display: false },
  ]);
});

test('splitMathSegments: texto vacío da lista vacía', () => {
  assert.deepEqual(core.splitMathSegments(''), []);
});

function validDraft() {
  return {
    title: 'Parcial 1',
    description: '',
    durationMinutes: null,
    config: { ...cfg },
    questions: [{ id: 'q1', type: 'true_false_statements', prompt: 'Enunciado', statements: [{ text: 'A', answer: true }, { text: 'B', answer: false }] }],
  };
}

test('validateExamDraft acepta un borrador válido', () => {
  assert.deepEqual(core.validateExamDraft(validDraft()), { ok: true, errors: {} });
});

test('validateExamDraft marca título vacío', () => {
  const draft = { ...validDraft(), title: '   ' };
  const result = core.validateExamDraft(draft);
  assert.equal(result.ok, false);
  assert.ok(result.errors.title);
});

test('validateExamDraft exige al menos una pregunta', () => {
  assert.ok(core.validateExamDraft({ ...validDraft(), questions: [] }).errors.questions);
});

test('validateExamDraft exige enunciado y 2 afirmaciones con texto', () => {
  const draft = validDraft();
  draft.questions[0].prompt = '';
  draft.questions[0].statements = [{ text: 'A', answer: true }];
  const errors = core.validateExamDraft(draft).errors;
  assert.ok(errors['questions.0.prompt']);
  assert.ok(errors['questions.0.statements']);

  const draft2 = validDraft();
  draft2.questions[0].statements[1].text = ' ';
  assert.ok(core.validateExamDraft(draft2).errors['questions.0.statements.1.text']);
});

test('validateExamDraft rechaza montos negativos y duración 0', () => {
  const draft = validDraft();
  draft.config.fpPenalty = -1;
  draft.config.passValue = -5;
  draft.durationMinutes = 0;
  const errors = core.validateExamDraft(draft).errors;
  assert.ok(errors['config.fpPenalty']);
  assert.ok(errors['config.passValue']);
  assert.ok(errors.durationMinutes);
});

test('validateExamDraft rechaza puntaje por pregunta no numérico o 0', () => {
  const draft = validDraft();
  draft.config.pointsPerQuestion = 0;
  assert.ok(core.validateExamDraft(draft).errors['config.pointsPerQuestion']);
  draft.config.pointsPerQuestion = NaN;
  assert.ok(core.validateExamDraft(draft).errors['config.pointsPerQuestion']);
});

// ---------- Resumen de desempeño ----------

function topicExam() {
  const make = (id, topic, answers) => ({ ...q(answers, id), topic });
  return {
    id: 'e-topics',
    config: { ...cfg },
    questions: [
      make('t1', 'Unidad 1', 'VFFVF'),
      make('t2', 'Unidad 1', 'VFFVF'),
      make('t3', 'Unidad 2', 'VFFVF'),
      make('t4', 'Unidad 2', 'VFFVF'),
      make('t5', 'Unidad 3', 'VFFVF'),
    ],
  };
}

test('buildPerformanceSummary agrupa por tema y clasifica fuerte / a reforzar / débil', () => {
  const exam = topicExam();
  const answers = {
    t1: m('VFFVF'), t2: m('VFFVF'), // Unidad 1: 1 de 1 -> 100 %
    t3: m('VFFVF'), t4: m('VVFFF'), // Unidad 2: 0,5 + 0,2 = 0,7 de 1 -> 70 %
    t5: m('FVVFV'),                 // Unidad 3: 0,5 - 3*0,2 - 2*0,1 = -0,3 -> -60 %
  };
  const summary = core.buildPerformanceSummary(exam, core.scoreExam(exam, answers));
  assert.deepEqual(summary.topics.map(t => [t.topic, t.earned, t.max, t.percent, t.level]), [
    ['Unidad 1', 1, 1, 100, 'strong'],
    ['Unidad 2', 0.7, 1, 70, 'strong'],
    ['Unidad 3', -0.3, 0.5, -60, 'weak'],
  ]);
  assert.deepEqual(summary.strengths, ['Unidad 1', 'Unidad 2']);
  assert.deepEqual(summary.weaknesses, ['Unidad 3']);
  assert.deepEqual(summary.reinforce, []);
});

test('buildPerformanceSummary: entre 50 % y 70 % queda "a reforzar"', () => {
  const exam = topicExam();
  const answers = { t1: m('VFFVF'), t2: m('VVFVF'), t3: m('VFFVF'), t4: m('VFFVF'), t5: m('VFFVF') };
  // Unidad 1: 0,5 + 0,3 = 0,8 de 1 -> 80 % ; para 60 % usamos t2 con FP+FN y t1 con FN
  const answers60 = { ...answers, t1: m('VFFFF'), t2: m('VFFFF') }; // 0,4 + 0,4 = 0,8 -> 80 %
  const s80 = core.buildPerformanceSummary(exam, core.scoreExam(exam, answers60));
  assert.equal(s80.topics.find(t => t.topic === 'Unidad 1').level, 'strong');
  const answersMid = { ...answers, t1: m('VVFFF'), t2: m('VFFVF') }; // 0,2 + 0,5 = 0,7 -> 70 % strong
  assert.equal(core.buildPerformanceSummary(exam, core.scoreExam(exam, answersMid)).topics.find(t => t.topic === 'Unidad 1').level, 'strong');
  const answersReinforce = { ...answers, t1: m('VVFFF'), t2: m('VFFFF') }; // 0,2 + 0,4 = 0,6 -> 60 %
  const summary = core.buildPerformanceSummary(exam, core.scoreExam(exam, answersReinforce));
  const unit1 = summary.topics.find(t => t.topic === 'Unidad 1');
  assert.equal(unit1.percent, 60);
  assert.equal(unit1.level, 'mid');
  assert.deepEqual(summary.reinforce, ['Unidad 1']);
});

test('buildPerformanceSummary cuenta errores y detecta el patrón de respuesta', () => {
  const exam = topicExam();
  // Muchos falsos positivos: marca V en todo
  const allTrue = Object.fromEntries(exam.questions.map(question => [question.id, m('VVVVV')]));
  const s1 = core.buildPerformanceSummary(exam, core.scoreExam(exam, allTrue));
  assert.deepEqual(s1.errors, { fp: 15, fn: 0, wrong: 0, blanks: 0, total: 15 });
  assert.equal(s1.pattern, 'fp');

  // Muchos falsos negativos: marca F en todo
  const allFalse = Object.fromEntries(exam.questions.map(question => [question.id, m('FFFFF')]));
  assert.equal(core.buildPerformanceSummary(exam, core.scoreExam(exam, allFalse)).pattern, 'fn');

  // Mayoría en blanco
  const blanks = Object.fromEntries(exam.questions.map(question => [question.id, m('_____')]));
  const s3 = core.buildPerformanceSummary(exam, core.scoreExam(exam, blanks));
  assert.equal(s3.errors.blanks, 25);
  assert.equal(s3.pattern, 'blanks');

  // Sin errores
  const perfect = Object.fromEntries(exam.questions.map(question => [question.id, m('VFFVF')]));
  assert.equal(core.buildPerformanceSummary(exam, core.scoreExam(exam, perfect)).pattern, 'none');

  // Errores parejos
  const mixed = { ...perfect, t1: m('VVFFF') };
  assert.equal(core.buildPerformanceSummary(exam, core.scoreExam(exam, mixed)).pattern, 'balanced');
});

test('buildPerformanceSummary sin temas cargados no inventa temas', () => {
  const exam = { id: 'x', config: cfg, questions: [q('VF', 'a'), q('FV', 'b')] };
  const summary = core.buildPerformanceSummary(exam, core.scoreExam(exam, { a: m('VF'), b: m('VV') }));
  assert.deepEqual(summary.topics, []);
  assert.equal(summary.errors.total, 1);
});

// ---------- Opción múltiple ----------

// Pregunta de opción múltiple con `count` opciones y la correcta en `correct`.
function mc(correct, id = 'mc1', count = 4) {
  return {
    id,
    type: 'multiple_choice',
    prompt: 'Pregunta',
    options: Array.from({ length: count }, (_, index) => ({ text: `Opción ${index + 1}` })),
    correct,
  };
}

const mcCfg = { ...cfg, fpPenaltyEnabled: false, fnPenaltyEnabled: false };

test('opción múltiple: la correcta suma el puntaje de la pregunta', () => {
  const result = core.scoreQuestion(mc(2), 2, mcCfg);
  assert.equal(result.score, 0.5);
  assert.equal(result.voided, false);
  assert.deepEqual(result.choice, { marked: 2, correct: 2, outcome: 'ok', blank: false });
  assert.deepEqual(result.statements, []);
});

test('opción múltiple: una incorrecta vale 0 y no resta, aunque haya descuentos V/F activos', () => {
  for (const config of [mcCfg, cfg]) {
    const result = core.scoreQuestion(mc(2), 0, config);
    assert.equal(result.score, 0);
    assert.equal(result.voided, false);
    assert.deepEqual(result.choice, { marked: 0, correct: 2, outcome: 'wrong', blank: false });
  }
});

test('opción múltiple: en blanco vale 0', () => {
  const result = core.scoreQuestion(mc(1), null, mcCfg);
  assert.equal(result.score, 0);
  assert.deepEqual(result.choice, { marked: null, correct: 1, outcome: 'blank', blank: true });
  assert.equal(core.scoreQuestion(mc(1), undefined, mcCfg).choice.outcome, 'blank');
  assert.equal(core.scoreQuestion(mc(1), 9, mcCfg).choice.outcome, 'blank');
});

test('scoreExam mezcla V/F y opción múltiple', () => {
  const exam = { id: 'mix', config: { ...cfg }, questions: [q('VF', 'vf'), mc(3, 'a'), mc(0, 'b')] };
  const result = core.scoreExam(exam, { vf: m('VF'), a: 3, b: 1 });
  assert.equal(result.total, 1);
  assert.equal(result.max, 1.5);
  assert.deepEqual(result.questions.map(question => question.score), [0.5, 0.5, 0]);
});

test('validateExamDraft acepta opción múltiple válida', () => {
  const draft = { ...validDraft(), questions: [mc(1)] };
  assert.deepEqual(core.validateExamDraft(draft), { ok: true, errors: {} });
});

test('validateExamDraft: opción múltiple necesita 2 opciones con texto y una correcta válida', () => {
  const one = { ...mc(0), options: [{ text: 'Sola' }] };
  const empty = { ...mc(0, 'mc2'), options: [{ text: 'A' }, { text: ' ' }] };
  const badCorrect = mc(7, 'mc3');
  const { ok, errors } = core.validateExamDraft({ ...validDraft(), questions: [one, empty, badCorrect] });
  assert.equal(ok, false);
  assert.ok(errors['questions.0.options']);
  assert.ok(errors['questions.1.options.1.text']);
  assert.ok(errors['questions.2.correct']);
  assert.equal(errors['questions.0.statements'], undefined);
});

test('buildPerformanceSummary cuenta las incorrectas de opción múltiple', () => {
  const exam = { id: 'mcx', config: mcCfg, questions: [mc(0, 'a'), mc(1, 'b'), mc(2, 'c'), mc(3, 'd')] };
  const wrong = core.buildPerformanceSummary(exam, core.scoreExam(exam, { a: 1, b: 0, c: 2, d: 3 }));
  assert.deepEqual(wrong.errors, { fp: 0, fn: 0, wrong: 2, blanks: 0, total: 2 });
  assert.equal(wrong.pattern, 'mc');

  const blank = core.buildPerformanceSummary(exam, core.scoreExam(exam, { a: 1, c: 2, d: 3 }));
  assert.deepEqual(blank.errors, { fp: 0, fn: 0, wrong: 2, blanks: 1, total: 2 });
  assert.equal(blank.pattern, 'blanks');

  assert.equal(core.buildPerformanceSummary(exam, core.scoreExam(exam, { a: 0, b: 1, c: 2, d: 3 })).pattern, 'none');
});

// ---------- Sorteo de evaluación ----------

test('pickRandomExam ignora evaluaciones sin preguntas', () => {
  const exams = [{ id: 'vacia', questions: [] }, { id: 'ok', questions: [mc(0)] }];
  assert.equal(core.pickRandomExam(exams, null, () => 0).id, 'ok');
  assert.equal(core.pickRandomExam([{ id: 'vacia', questions: [] }], null, () => 0), null);
  assert.equal(core.pickRandomExam([], null, () => 0), null);
});

test('pickRandomExam no repite la última si hay otra disponible', () => {
  const exams = ['a', 'b', 'c'].map(id => ({ id, questions: [mc(0)] }));
  for (const value of [0, 0.4, 0.99]) {
    assert.notEqual(core.pickRandomExam(exams, 'a', () => value).id, 'a');
  }
  assert.equal(core.pickRandomExam([exams[0]], 'a', () => 0.5).id, 'a');
});

test('pickRandomExam reparte entre todas las disponibles', () => {
  const exams = ['a', 'b', 'c', 'd'].map(id => ({ id, questions: [mc(0)] }));
  const picked = [0, 0.25, 0.5, 0.75].map(value => core.pickRandomExam(exams, null, () => value).id);
  assert.deepEqual(picked, ['a', 'b', 'c', 'd']);
});
