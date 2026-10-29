# Simulador de evaluaciones — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sección "Evaluaciones" en cada materia: los admins arman simulacros de afirmaciones V/F con criterios de corrección configurables, y los alumnos los rinden con reloj y ven la corrección detallada.

**Architecture:** La corrección, la validación del editor y el troceo de fórmulas son funciones puras en un archivo nuevo, `exam-core.js`, que carga el navegador como script normal y prueba Node con `node --test`. La interfaz vive en `app.js`, como el resto del portal, renderizando en un panel nuevo de `#materiaView` según `state.examView`. Los datos van en una tabla de Supabase, `subject_exams`, con config y preguntas en JSONB.

**Tech Stack:** HTML/CSS/JS vanilla sin build, Supabase JS v2 (ya cargado), KaTeX 0.18.10 desde jsDelivr (solo `katex.min.js` y `katex.min.css`; no se usa auto-render), Node `node:test` para las pruebas.

**Spec:** `docs/superpowers/specs/2026-10-21-evaluaciones-design.md`

**Desvío del spec, decidido acá:** el spec nombraba el archivo puro `exam-scoring.js`. Se llama `exam-core.js` porque también contiene `splitMathSegments` y `validateExamDraft`. Además, el auto-render de KaTeX no se usa: su escáner solo respeta `\$` *dentro* de una fórmula (verificado en la documentación, `splitAtDelimiters.ts`), así que un `\$1500` en texto común igual abriría una fórmula. El troceo de texto lo hace `splitMathSegments`, y cada fórmula se pasa a `katex.renderToString`.

## Global Constraints

- Mobile-first: sin scroll horizontal a 360px; todo botón o control táctil ≥ 44px de alto; foco visible; respetar `prefers-reduced-motion`; tema claro y oscuro con las variables existentes (`--primary`, `--surface`, `--border`, `--muted`, …).
- Textos en español rioplatense, como el resto del portal. Nombre de la sección: **"Evaluaciones"**.
- Valores por defecto de una evaluación nueva: `pointsPerQuestion: 0.5`, `fpPenaltyEnabled: true`, `fpPenalty: 0.2`, `fnPenaltyEnabled: true`, `fnPenalty: 0.1`, `passMode: 'percent'`, `passValue: 60`, duración vacía (sin límite), 5 afirmaciones por pregunta nueva.
- Solo admins crean, editan o borran (`isAdminView()` en la UI, `public.is_admin()` en RLS). Los resultados no se guardan.
- Todo texto cargado por un admin se escapa con `escapeHtml` (ya existe en `app.js`) antes de ir al DOM; las fórmulas pasan por `katex.renderToString(..., { throwOnError: false })`.
- Números mostrados con coma decimal y 2 decimales como máximo: `formatScore(n)` → `0,2`, `−0,1`, `10`.
- No hacer commits salvo que el usuario lo pida. Los pasos "Commit" de este plan quedan como **checkpoint**: correr `git status` y anotar los archivos tocados.

## Review Focus

1. **Recargar o navegar fuera a mitad del examen.** Ir a otra sección, otra materia, "Volver" o el sidebar global con respuestas marcadas tiene que pedir confirmación; aceptar descarta el intento sin errores ni reloj colgado (Task 5).
2. **El reloj llega a 0 mientras hay un `confirm()` abierto o con la pestaña en segundo plano.** La entrega se calcula con el tiempo real (`Date.now()` contra la hora de inicio), no contando ticks, y entrega una sola vez (Task 5).
3. **Fórmulas mal escritas en el editor** (`$x^{2$`, un `$` sin cerrar). La vista previa y el examen muestran el texto o el error de KaTeX en línea; nunca rompen la página ni el resto de la pregunta (Tasks 1 y 2).
4. **Admin cambia de vista a "alumno" (o borra la evaluación) mientras la edita.** El editor se cierra y vuelve a la lista; si la evaluación borrada estaba en curso, el intento se descarta (Task 4).
5. **La tabla `subject_exams` todavía no existe en Supabase** (el usuario no corrió el SQL). La sección muestra "Sin evaluaciones" y el resto de la materia carga normal; guardar muestra el mensaje de error de Supabase en el editor (Task 2).

---

### Task 1: Núcleo puro (`exam-core.js`) con pruebas

**Files:**
- Create: `exam-core.js`
- Create: `tests/exam-core.test.js`

**Interfaces:**
- Produces (globales en el navegador; `module.exports` en Node):
  - `DEFAULT_EXAM_CONFIG` — objeto congelado con los valores de Global Constraints.
  - `scoreQuestion(question, answers, config) → { score: number, fp: number, fn: number, statements: Array<{ answer: boolean, marked: boolean|null, outcome: 'ok'|'fp'|'fn' , blank: boolean }>, voided: boolean }`. `answers` es un array del mismo largo que `question.statements`, con `true` / `false` / `null` (en blanco). `voided` es true cuando la regla 2 del spec dejó la pregunta en 0.
  - `scoreExam(exam, answersByQuestionId) → { total: number, max: number, percent: number, passed: boolean, questions: Array<ReturnType<scoreQuestion> & { id: string }> }`. `answersByQuestionId` es `{ [questionId]: Array<boolean|null> }`; si falta una pregunta, todas sus afirmaciones van en blanco.
  - `round2(n) → number` (redondeo a 2 decimales que evita `0.20000000000000004`).
  - `formatScore(n) → string` (coma decimal, sin ceros sobrantes, signo `−` U+2212 para negativos).
  - `splitMathSegments(text) → Array<{ type: 'text'|'math', value: string, display: boolean }>`.
  - `validateExamDraft(draft) → { ok: boolean, errors: { [path: string]: string } }`, con rutas como `'title'`, `'questions'`, `'questions.2.prompt'`, `'questions.2.statements'`, `'questions.2.statements.1.text'`, `'config.fpPenalty'`, `'config.passValue'`, `'durationMinutes'`.

- [ ] **Step 1: Escribir las pruebas que fallan** en `tests/exam-core.test.js` (`const { test } = require('node:test'); const assert = require('node:assert/strict'); const core = require('../exam-core.js');`). Un helper `q(answersVF)` arma una pregunta con `statements` a partir de un string tipo `'VFFVF'`, y `m('VVF_F')` arma las respuestas (`'_'` = `null`). Con `cfg = core.DEFAULT_EXAM_CONFIG`:
  - `test('todo correcto vale 0,5')`: `scoreQuestion(q('VFFVF'), m('VFFVF'), cfg).score === 0.5`.
  - `test('ejemplo del usuario: 1 FP y 1 FN da 0,2')`: `q('VFFVF')`, `m('VVFFF')` → `score === 0.2`, `fp === 1`, `fn === 1`.
  - `test('puede quedar negativa')`: `q('FFFFF')`, `m('VVVFF')` → `score === -0.1`.
  - `test('en blanco y era F cuenta como FP')`: `q('VFFVF')`, `m('V_FVF')` → `score === 0.3`, `statements[1].outcome === 'fp'`, `statements[1].blank === true`.
  - `test('en blanco y era V cuenta como FN')`: `q('VFFVF')`, `m('VFF_F')` → `score === 0.4`.
  - `test('FP desactivado anula la pregunta')`: config con `fpPenaltyEnabled: false`; `q('VFFVF')`, `m('VVFVF')` → `score === 0`, `voided === true`.
  - `test('FP desactivado no afecta a los FN')`: misma config; `q('VFFVF')`, `m('VFFFF')` → `score === 0.4`, `voided === false`.
  - `test('scoreExam suma, calcula máximo y porcentaje')`: 2 preguntas, una 0,5 y otra 0,2 → `total === 0.7`, `max === 1`, `percent === 70`.
  - `test('aprobación por porcentaje es inclusiva')`: `passMode: 'percent', passValue: 70` con el caso anterior → `passed === true`; con `passValue: 71` → `false`.
  - `test('aprobación por puntos')`: `passMode: 'points', passValue: 0.7` → `passed === true`.
  - `test('pregunta sin respuestas en answersByQuestionId va toda en blanco')`.
  - `test('formatScore')`: `formatScore(0.2) === '0,2'`, `formatScore(-0.1) === '−0,1'`, `formatScore(10) === '10'`, `formatScore(0.1 + 0.2) === '0,3'`.
  - `test('splitMathSegments separa texto y fórmulas')`: `'Sea $x^2$ y $$y$$.'` → `[text 'Sea ', math 'x^2' (display false), text ' y ', math 'y' (display true), text '.']`.
  - `test('splitMathSegments: \\$ es un signo pesos literal')`: `'Cuesta \\$1500 y \\$200'` → un solo segmento de texto `'Cuesta $1500 y $200'`.
  - `test('splitMathSegments: \\$ dentro de una fórmula queda en la fórmula')`: `'$x = \\$5$'` → math `'x = \\$5'`.
  - `test('splitMathSegments: $ sin cerrar queda como texto')`: `'Precio $ 15'` → texto `'Precio $ 15'`.
  - `test('validateExamDraft')`: un borrador válido da `ok: true`; título vacío da `errors.title`; 0 preguntas da `errors.questions`; una pregunta con 1 afirmación da `errors['questions.0.statements']`; afirmación sin texto da `errors['questions.0.statements.1.text']`; `config.fpPenalty: -1` da `errors['config.fpPenalty']`; `durationMinutes: 0` da `errors.durationMinutes` (vacío/`null` es válido = sin límite).

- [ ] **Step 2: Correr las pruebas y confirmar que fallan.** Run: `node --test tests/` → Expected: FAIL (`Cannot find module '../exam-core.js'`).

- [ ] **Step 3: Implementar `exam-core.js`.** IIFE que arma el objeto de exports y lo asigna a `window` (cada nombre como global) o a `module.exports` si existe. `scoreQuestion` aplica la regla del spec en este orden: clasificar cada afirmación (en blanco → `fp` si `answer === false`, `fn` si `answer === true`); si hay algún `fp` y `!fpPenaltyEnabled`, o algún `fn` y `!fnPenaltyEnabled` → `score 0, voided: true`; si no, `P − fp×fpPenalty − fn×fnPenalty`, con `round2`. `splitMathSegments` recorre el texto carácter a carácter: `\$` fuera de fórmula agrega `$` al texto; `$$` abre o cierra display y `$` abre o cierra inline; dentro de una fórmula, `\` copia también el carácter siguiente; una fórmula sin cerrar se devuelve como texto, con sus `$` originales.

- [ ] **Step 4: Correr las pruebas.** Run: `node --test tests/` → Expected: todas PASS.

- [ ] **Step 5: Checkpoint.** `git status` debe mostrar `exam-core.js` y `tests/exam-core.test.js`.

### Task 2: Datos en Supabase, KaTeX y render de texto con fórmulas

**Files:**
- Modify: `supabase_schema.sql` (agregar al final)
- Modify: `index.html` (`<head>`: KaTeX CSS + JS; antes de `app.js`: `<script src="exam-core.js"></script>`)
- Modify: `app.js` (`mapExamRow`, `examToRow`, carga en `loadSubjectContentFromSupabase`, `saveExam`, `deleteExam`, `renderRichText`; `exams: []` en los tres lugares donde se arman materias: `buildCurriculumSubjects`, el mapeo de filas de `subjects` y la creación de materia en admin, hoy en las líneas ~56, ~251 y ~5795)

**Interfaces:**
- Consumes: `splitMathSegments`, `DEFAULT_EXAM_CONFIG` (Task 1).
- Produces:
  - `subject.exams: Array<Exam>` con `Exam = { id, subjectId, title, description, durationMinutes: number|null, config: ExamConfig, questions: Array<{ id, type: 'true_false_statements', prompt, statements: Array<{ text, answer: boolean }> }>, createdBy, updatedAt }`.
  - `mapExamRow(row) → Exam` (completa `config` faltante con `DEFAULT_EXAM_CONFIG`).
  - `async saveExam(subject, draft) → { ok: boolean, message?: string, exam?: Exam }`: insert si `draft.id` es falsy y update si no (setea `updated_at`); reemplaza o agrega en `subject.exams`.
  - `async deleteExam(subject, examId) → { ok: boolean, message?: string }`.
  - `renderRichText(text) → string` (HTML: texto con `escapeHtml`, fórmulas con `katex.renderToString(value, { displayMode, throwOnError: false })`; si `window.katex` no existe, la fórmula se muestra escapada entre sus `$`).

- [ ] **Step 1: SQL.** Agregar a `supabase_schema.sql`, con el mismo estilo de comentario de encabezado y `drop policy if exists` que las tablas existentes, la tabla `subject_exams` exactamente con las columnas del spec, más estas políticas: "Subject exams are viewable by authenticated users" (`select`, `using (true)`) y "Only admins can modify subject exams" (`for all`, `using (public.is_admin()) with check (public.is_admin())`).
- [ ] **Step 2: KaTeX.** En `index.html`, después de los `<script>` de CDN existentes:
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.18.10/dist/katex.min.css" integrity="sha384-rdqqrpVNEfmY6hsVFS50HU5L84tWeMdr4XpF+TJPvLR6e8YxPgRyDzzpawPHMQE6" crossorigin="anonymous">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.18.10/dist/katex.min.js" integrity="sha384-oeXTyN/gxEn/v98/oDFW+7XVfZrp59R6Tporzsg2uNs9g+G9Xel/Afxdamc4Mags" crossorigin="anonymous"></script>
  ```
  Antes de `<script src="app.js">`, agregar `<script src="exam-core.js"></script>`.
- [ ] **Step 3: Carga.** En `loadSubjectContentFromSupabase`, agregar `supabaseClient.from('subject_exams').select('*').order('created_at', { ascending: true })` al `Promise.all` y repartir las filas con `mapExamRow` en `subject.exams` (inicializar `subject.exams = []` junto a `subject.summaries = []`). Si la respuesta trae `error`, `console.warn` y seguir.
- [ ] **Step 4: Guardar y borrar** según las firmas de Interfaces. `created_by_name` = `getFullName(state.currentUser)`.
- [ ] **Step 5: Verificar.** `node --check app.js` OK. En el harness de prueba (memoria `testing-portal-without-login`), sin tabla creada, abrir una materia: `ERR=[]` y `subject.exams` es `[]`. Ejecutar en la página `renderRichText('Sea $x^2$ y \\$5')` y comprobar que el resultado contiene `class="katex"` y `$5`, y que `renderRichText('$x^{2$')` no lanza error.
- [ ] **Step 6: Checkpoint.**

### Task 3: Entrada "Evaluaciones" y lista

**Files:**
- Modify: `index.html` (panel nuevo dentro de `.materia-main`: `<section class="card subject-panel hidden" data-subject-panel="evaluaciones"><div id="subjectExams"></div></section>`)
- Modify: `app.js` (`renderSubjectNav`, `setSubjectTab`, `openSubject`, `renderSubjectLists`, `renderExamsSection` nuevo)
- Modify: `styles.css`

**Interfaces:**
- Consumes: `subject.exams`, `formatScore`, `renderRichText`.
- Produces:
  - `state.examView: { mode: 'list'|'edit'|'take'|'result', examId: string|null, draft?: object, attempt?: Attempt, result?: object }`, reiniciado a `{ mode: 'list', examId: null }` en `openSubject`.
  - `renderExamsSection(subject)`, que despacha según `state.examView.mode` a `renderExamList` (este task), `renderExamEditor` (Task 4), `renderExamAttempt` (Task 5) y `renderExamResult` (Task 6).
  - `setExamView(next)`: hace merge sobre `state.examView` y llama a `renderExamsSection` de la materia actual.

- [ ] **Step 1: Nav.** En `renderSubjectNav`, `link('evaluaciones', 'icon-check-circle', 'Evaluaciones')` entre el grupo "Clases grabadas" y "Resúmenes". `setSubjectTab('evaluaciones')` muestra el panel `evaluaciones` y llama a `renderExamsSection`.
- [ ] **Step 2: Lista.** Encabezado "Evaluaciones" + cantidad; en vista admin, botón "Nueva evaluación". Una tarjeta por evaluación (reutilizar `.material-card` / `.material-list`), con ícono `icon-check-circle`; título; descripción con `renderRichText`; línea de metadatos: "`N` preguntas · `Duración`" (`"45 min"` o `"Sin límite"`) · "Aprueba con 60 %" o "Aprueba con 6 puntos" · descuentos ("FP −0,2 · FN −0,1", "Solo FP −0,2", "Solo FN −0,1" o "Sin descuentos"). Acción "Comenzar" (`download-link primary`). En vista admin, además "Editar" y "Eliminar" (este último con confirmación en dos pasos, como los materiales: `state.confirmDeleteExamId`). Las evaluaciones sin preguntas solo se listan en vista admin, con la etiqueta "Sin preguntas" en lugar de "Comenzar". Si no hay evaluaciones: `createItemCard('Sin evaluaciones', 'Todavía no hay simulacros para esta materia.', '')`.
- [ ] **Step 3: Verificar** con el harness (agregar un paso `evaluaciones` que inyecte 2 exámenes en `subject.exams`): `OVERFLOW=[]`, `UNDER44=[]`, `ERR=[]` a 375, 768 y 1440px, como alumno y como admin; captura a 375px.
- [ ] **Step 4: Checkpoint.**

### Task 4: Editor de evaluaciones (admin)

**Files:**
- Modify: `app.js` (`renderExamEditor`, `newExamDraft`, `collectExamDraft`)
- Modify: `styles.css`

**Interfaces:**
- Consumes: `validateExamDraft`, `saveExam`, `renderRichText`, `DEFAULT_EXAM_CONFIG`, `setExamView`.
- Produces: `newExamDraft() → draft` (título vacío, `DEFAULT_EXAM_CONFIG`, una pregunta con 5 afirmaciones `{ text: '', answer: true }`); ids de pregunta `generateLocalId('q')` (ya existe).

- [ ] **Step 1: Formulario.** Secciones con `<fieldset>`/`<legend>`:
  - "Datos": Título, Descripción (opcional), Duración en minutos (`type="number" min="1"`, placeholder "Sin límite").
  - "Corrección": Puntaje por pregunta (`step="0.01" min="0"`); casilla "Los falsos positivos restan" + monto; casilla "Los falsos negativos restan" + monto (el monto se deshabilita si la casilla está apagada); "Aprobación": select "Porcentaje" / "Puntaje mínimo" + valor.
  - Ayuda fija debajo: "Cada pregunta arranca con su puntaje y cada error lo descuenta. Una afirmación en blanco cuenta como error. Si un tipo de descuento está desactivado, un error de ese tipo deja la pregunta en 0. Para fórmulas escribí LaTeX entre $…$ (o $$…$$ para centrarlas); para un signo pesos común escribí \$."
- [ ] **Step 2: Preguntas.** Por pregunta: "Pregunta N"; botones Subir / Bajar / Eliminar (44px, con `aria-label`); textarea "Enunciado" y debajo la vista previa (`renderRichText`, actualizada en `input`); lista de afirmaciones con input de texto, vista previa en línea si el texto contiene `$`, un grupo V/F (`role="radiogroup"`, dos botones `aria-pressed`) para la respuesta correcta y un botón quitar (deshabilitado con 2 afirmaciones); "Agregar afirmación". "Agregar pregunta" al final. El borrador vive en `state.examView.draft` y cada cambio actualiza ese objeto sin redibujar todo el formulario (solo las vistas previas), para no perder el foco al escribir; agregar, quitar o mover preguntas o afirmaciones sí redibuja el bloque.
- [ ] **Step 3: Guardar / Cancelar.** "Guardar" → `validateExamDraft`; si falla, mostrar cada mensaje junto a su campo (`aria-invalid="true"` + `<p class="field-error">`) y enfocar el primer campo con error. Si pasa, `saveExam` con el botón deshabilitado y el texto "Guardando…"; si hay error de Supabase, mostrarlo en un `.notice` arriba del formulario; si sale bien, volver a la lista. "Cancelar" vuelve a la lista, y si el borrador cambió, pide `confirm('¿Descartar los cambios de esta evaluación?')`.
- [ ] **Step 4: Cambio de vista y borrado (Review Focus 4).** En `applyViewMode`, si la vista deja de ser admin y `state.examView.mode === 'edit'`, volver a `list`. Al borrar una evaluación, si `state.examView.examId` es esa, volver a `list`.
- [ ] **Step 5: Verificar** con el harness en vista admin: crear un borrador con un error (título vacío) → aparece el error; completarlo → `validateExamDraft` ok (stubear `saveExam` en el harness para no llamar a Supabase). Sin desbordes y con áreas táctiles de 44px a 375, 768 y 1440px; capturas del editor a 375 y 1440px.
- [ ] **Step 6: Checkpoint.**

### Task 5: Rendir la evaluación

**Files:**
- Modify: `app.js` (`startExamAttempt`, `renderExamAttempt`, `submitExamAttempt`, `confirmLeaveExam`)
- Modify: `styles.css`

**Interfaces:**
- Consumes: `scoreExam`, `renderRichText`, `setExamView`.
- Produces:
  - `Attempt = { examId, startedAt: number (ms), deadline: number|null (ms), answers: { [questionId]: Array<boolean|null> }, timerId: number|null, submitted: boolean }`.
  - `submitExamAttempt(reason: 'manual'|'timeout')`: idempotente (si `attempt.submitted`, no hace nada), limpia el intervalo y pasa a `mode: 'result'` con `result = { ...scoreExam(exam, answers), elapsedMs, reason }`.
  - `confirmLeaveExam() → boolean`: true si no hay intento en curso o si el usuario confirma `'Tenés una evaluación en curso. Si salís, se pierden tus respuestas. ¿Salir igual?'`; al confirmar, limpia el reloj y vuelve a `list`.

- [ ] **Step 1: Inicio.** "Comenzar" crea el `Attempt` (todas las respuestas en `null`) y pasa a `mode: 'take'`.
- [ ] **Step 2: Pantalla.** Barra `position: sticky` arriba del área principal con título, reloj `mm:ss` (oculto sin duración; `role="timer"`, y un aviso `aria-live="polite"` al quedar 5 minutos y 1 minuto), "N de M preguntas completas" (completa = sin `null`) y botón "Entregar". Cada pregunta: "Pregunta N" + enunciado con `renderRichText`, y por cada afirmación su texto con `renderRichText` y un grupo V/F (`role="radiogroup"`, botones `role="radio"` con `aria-checked`, 44×44 mínimo). Tocar el botón ya marcado lo desmarca (`null`). Los cambios actualizan solo el grupo y el contador, sin redibujar.
- [ ] **Step 3: Reloj (Review Focus 2).** `setInterval` de 1000 ms que recalcula `restante = deadline − Date.now()`; con `restante ≤ 0` llama a `submitExamAttempt('timeout')`. Además, un listener de `visibilitychange` hace el mismo chequeo al volver a la pestaña.
- [ ] **Step 4: Entregar.** Si hay afirmaciones en blanco: `confirm('Te quedan N afirmaciones sin responder. En blanco cuentan como error. ¿Entregar igual?')`; si no, entrega directo.
- [ ] **Step 5: Salir (Review Focus 1).** Llamar a `confirmLeaveExam()` al inicio de: los handlers `goTo` de `renderSubjectNav`; `openSubject`; el botón "Volver" (`backToMaterias`); y los clics en `.sidebar .nav-link` (un listener en fase de captura que hace `preventDefault` + `stopPropagation` si devuelve false). Agregar un `beforeunload` que pide confirmación solo con un intento en curso.
- [ ] **Step 6: Verificar** con el harness: un examen de 2 preguntas con `durationMinutes` en 1 y `attempt.deadline` forzado a `Date.now() + 1500` → después de 3 s, `state.examView.mode === 'result'` y `result.reason === 'timeout'`, una sola vez. Marcar y desmarcar actualiza el contador. Sin desbordes y con 44px a 375, 768 y 1440px; captura a 375px.
- [ ] **Step 7: Checkpoint.**

### Task 6: Resultado

**Files:**
- Modify: `app.js` (`renderExamResult`)
- Modify: `styles.css`

**Interfaces:**
- Consumes: `state.examView.result` (Task 5), `formatScore`, `renderRichText`.

- [ ] **Step 1: Resumen.** "`formatScore(total)` de `formatScore(max)`", el porcentaje redondeado a entero, la etiqueta "Aprobado" (verde) o "No aprobado" (rojo) usando los colores existentes de `status-aprobada` / `status-no-cursable`, el tiempo usado `mm:ss` y, si fue por tiempo, "Se entregó automáticamente al terminar el tiempo".
- [ ] **Step 2: Corrección por pregunta.** Enunciado; por afirmación: texto, "Marcaste: V / F / En blanco", "Correcta: V / F" y una etiqueta Acierto / Falso positivo / Falso negativo (con "(en blanco)" si correspondía), con color e ícono además del color. Puntaje de la pregunta con su cálculo: `"0,5 − 0,2 − 0,1 = 0,2"`, `"0,5"` si no hubo errores, o `"0 (un error de un tipo sin descuento anula la pregunta)"` si `voided`.
- [ ] **Step 3: Acciones.** "Volver a intentar" (nuevo `Attempt` del mismo examen) y "Volver a evaluaciones".
- [ ] **Step 4: Verificar** con el harness: inyectar respuestas `VVFFF` sobre `VFFVF` → aparece "0,5 − 0,2 − 0,1 = 0,2". Sin desbordes y con 44px a 375, 768 y 1440px; capturas en claro y oscuro.
- [ ] **Step 5: Checkpoint.**

### Task 7: Verificación final

- [ ] **Step 1:** `node --test tests/` → todas PASS. `node --check app.js` y `node --check exam-core.js` → OK.
- [ ] **Step 2:** Recorrer el flujo completo en el harness a 375, 768 y 1440px (crear como admin → cambiar a vista alumno → rendir → entregar → resultado → volver a intentar → salir a mitad con confirmación) sin `ERR`, `OVERFLOW` ni `UNDER44`.
- [ ] **Step 3:** Revisar que las secciones existentes de la materia (Contenido, Clases grabadas, Resúmenes, Foro, Opiniones) sigan funcionando con los pasos de harness existentes.
- [ ] **Step 4:** Informar al usuario: archivos tocados, SQL a correr en Supabase y que no se hicieron commits.
