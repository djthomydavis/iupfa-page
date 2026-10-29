const CURRICULUM = [
  // [codigo, nombre, año, cuatrimestre, horas, modalidad, correlativas(códigos), libre, examen final]
  [1, 'Informática I', 1, 1, 64, 'Presencial', [], 'Libre', 'Con examen final'],
  [2, 'Aspectos Constitucionales y Derechos Humanos', 1, 1, 48, 'A Distancia', [], 'Libre', 'Sin examen final'],
  [3, 'Elementos del Derecho Penal y Garantías Fundamentales', 1, 1, 48, 'A Distancia', [], 'Libre', 'Sin examen final'],
  [4, 'Redes de Área Local y Extendida', 1, 1, 64, 'A Distancia', [], 'No libre', 'Con examen final'],
  [5, 'Matemática Aplicada', 1, 1, 64, 'Presencial', [], 'No libre', 'Con examen final'],
  [6, 'Introducción a la Ciberdefensa, Ciberdelito y Ciberinteligencia', 1, 1, 48, 'A Distancia', [], 'No libre', 'Sin examen final'],
  [7, 'Informática II', 1, 2, 64, 'Presencial', [1], 'Libre', 'Con examen final'],
  [8, 'Teleinformática', 1, 2, 64, 'A Distancia', [], 'Libre', 'Con examen final'],
  [9, 'Elementos del Derecho Procesal Penal y Garantías en el Proceso', 1, 2, 48, 'A Distancia', [3], 'Libre', 'Sin examen final'],
  [10, 'Legislación Penal Aplicada', 1, 2, 48, 'A Distancia', [], 'Libre', 'Sin examen final'],
  [11, 'Introducción a la Programación', 2, 1, 64, 'Presencial', [5], 'Libre', 'Con examen final'],
  [12, 'Seguridad Informática', 2, 1, 80, 'Presencial', [8], 'No libre', 'Con examen final'],
  [13, 'Seguridad en Internet', 2, 1, 48, 'A Distancia', [9], 'No libre', 'Con examen final'],
  [14, 'Estadística Aplicada', 2, 1, 64, 'Presencial', [5], 'Libre', 'Sin examen final'],
  [15, 'Criptoactivos y Blockchain', 2, 1, 48, 'A Distancia', [5], 'No libre', 'Con examen final'],
  [16, 'Informática Forense I', 2, 2, 64, 'Presencial', [8, 9], 'No libre', 'Con examen final'],
  [17, 'Prevención, Conjuración e Investigación de Delitos en Tecnología', 2, 2, 80, 'A Distancia', [10], 'Libre', 'Sin examen final'],
  [18, 'Evidencia Digital', 2, 2, 80, 'Presencial', [5, 8], 'No libre', 'Con examen final'],
  [19, 'Tecnologías Aplicadas', 2, 2, 64, 'A Distancia', [4, 10], 'No libre', 'Con examen final'],
  [20, 'Investigación con Fuentes Abiertas', 2, 2, 64, 'A Distancia', [12], 'No libre', 'Con examen final'],
  [21, 'Informática Forense II', 3, 1, 64, 'Presencial', [16], 'No libre', 'Con examen final'],
  [22, 'Metodología de la Investigación Científica y Tecnología', 3, 1, 64, 'Presencial', [14], 'Libre', 'Sin examen final'],
  [23, 'Seguridad en Redes Informáticas', 3, 1, 64, 'A Distancia', [12, 13], 'No libre', 'Con examen final'],
  [24, 'Ciberseguridad en Tecnologías de Operación', 3, 1, 64, 'Presencial', [19], 'No libre', 'Con examen final'],
  [25, 'Seguridad Física', 3, 1, 64, 'Presencial', [17], 'No libre', 'Sin examen final'],
  [26, 'Lenguajes, Estructuras y Algoritmos de Programación', 3, 2, 80, 'Presencial', [11], 'No libre', 'Con examen final'],
  [27, 'Criptografía I', 3, 2, 64, 'Presencial', [23], 'No libre', 'Con examen final'],
  [28, 'Legislación y Normativa Vigente en Ciberseguridad', 3, 2, 48, 'A Distancia', [10], 'Libre', 'Sin examen final'],
  [29, 'Ética Aplicada a la Ciberseguridad', 3, 2, 48, 'A Distancia', [20], 'Libre', 'Sin examen final'],
  [30, 'Gestión de la Seguridad Informática I', 3, 2, 80, 'Presencial', [12], 'No libre', 'Con examen final'],
  [31, 'Seguridad en Sistemas Operativos y Bases de Datos', 4, 1, 64, 'Presencial', [26], 'No libre', 'Con examen final'],
  [32, 'Evaluación y Gestión de Proyectos en Seguridad Pública', 4, 1, 64, 'Presencial', [22], 'No libre', 'Con examen final'],
  [33, 'Cooperación Internacional en Cibercrimen y Ciberseguridad', 4, 1, 48, 'A Distancia', [21], 'Libre', 'Sin examen final'],
  [34, 'Criptografía II', 4, 1, 80, 'Presencial', [27], 'No libre', 'Con examen final'],
  [35, 'Inteligencia Artificial Aplicada', 4, 1, 64, 'Presencial', [26], 'No libre', 'Sin examen final'],
  [36, 'Auditorías Informáticas', 4, 2, 80, 'Presencial', [30], 'No libre', 'Sin examen final'],
  [37, 'Continuidad de las Operaciones e Infraestructuras Críticas', 4, 2, 96, 'Presencial', [24], 'No libre', 'Con examen final'],
  [38, 'Gestión de la Seguridad Informática II', 4, 2, 80, 'Presencial', [30], 'No libre', 'Con examen final'],
  [39, 'Práctica Profesionalizante', 4, 2, 64, 'Presencial', [32], 'No libre', 'Con examen final']
];

function buildCurriculumSubjects() {
  return CURRICULUM.map(([code, name, year, semester, hours, modality, correlatives, libre, examFinal]) => ({
    id: `mat${code}`,
    code: String(code),
    name,
    year,
    semester: String(semester),
    hours: `${hours} hs`,
    modality,
    libre,
    examFinal,
    correlatives: correlatives.map(c => `mat${c}`),
    units: [], dates: [], forum: [], opinions: [], polls: [], exams: []
  }));
}

function emptyGrades() {
  return { tp1: '', tp2: '', tp3: '', parcial: '', final: '', notaFinal: '' };
}

// Cada alumno tiene su propio progreso (estado + notas) por materia, separado del contenido/curriculum compartido.
function getStudentProgress(email) {
  if (!state.data.studentProgress[email]) state.data.studentProgress[email] = {};
  return state.data.studentProgress[email];
}

function getSubjectProgress(email, subjectId) {
  const progress = getStudentProgress(email);
  if (!progress[subjectId]) progress[subjectId] = { status: 'No cursable', grades: emptyGrades() };
  return progress[subjectId];
}

let nextLocalId = 1;
function generateLocalId(prefix) {
  nextLocalId += 1;
  return `${prefix}_${Date.now()}_${nextLocalId}`;
}

function sanitizeStorageFilename(name) {
  const dot = name.lastIndexOf('.');
  const base = dot > -1 ? name.slice(0, dot) : name;
  const ext = dot > -1 ? name.slice(dot).toLowerCase().replace(/[^a-z0-9.]/g, '') : '';
  const combiningMarks = new RegExp('[̀-ͯ]', 'g');
  const cleanBase = base
    .normalize('NFD').replace(combiningMarks, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  return (cleanBase || 'archivo') + ext;
}

// Clases grabadas cargadas a mano, por código de materia. Los videos subidos
// como material de una unidad ya aparecen solos en "Clases grabadas"; acá van
// las grabaciones que no pertenecen a ninguna unidad.
//   title: nombre de la clase
//   date: 'AAAA-MM-DD'
//   duration: texto libre, opcional (ej. '1 h 45 min')
//   unit: unidad relacionada, opcional
//   url: link de compartir de Google Drive ("Cualquiera con el enlace")
const RECORDED_CLASSES = {
  // '101': [
  //   { title: 'Clase 02', date: '2026-08-19', duration: '1 h 45 min', unit: 'Unidad 1', url: 'https://drive.google.com/file/d/ID_DEL_ARCHIVO/view' },
  //   { title: 'Clase 03', date: '2026-08-26', duration: '', unit: 'Unidad 1', url: 'https://drive.google.com/file/d/ID_DEL_ARCHIVO/view' }
  // ]
};

const state = {
  data: {
    calendar: [
      { id: 'cal_seed_1', title: 'Inicio de clases', date: '2026-03-10', type: 'Académico' },
      { id: 'cal_seed_2', title: 'Inscripción a finales', date: '2026-07-01', type: 'Inscripción' },
      { id: 'cal_seed_3', title: 'Receso invernal', date: '2026-07-15', type: 'Feriado' }
    ],
    forum: [
      { id: 'post_seed_1', title: 'Grupo de estudio para Estadística', content: 'Busco compañeros para organizar una mesa de estudio esta semana.', author: 'Camila R.' },
      { id: 'post_seed_2', title: 'Consulta sobre fechas de entrega', content: '¿Alguien tiene confirmado el cronograma actualizado de evaluaciones?', author: 'Mariano F.' }
    ],
    subjects: [],
    studentProgress: {},
    students: [],
    studentSubjects: {},
    faq: []
  },
  currentUser: null,
  authError: null,
  alumnosSearch: '',
  alumnosSubjectFilter: 'all',
  openStudentProfileId: null,
  openFaqId: null,
  currentSubjectId: null,
  currentUnitId: null,
  currentItemId: null,
  currentRecordedId: null,
  currentYear: null,
  subjectSection: 'contenido',
  navGroupsOpen: { contenido: true, grabadas: false },
  examView: { mode: 'list', examId: null },
  confirmDeleteExamId: null,
  lastRandomExamId: null,
  confirmDeleteUnitId: null,
  viewMode: 'admin',
  calendarView: { year: new Date().getFullYear(), month: new Date().getMonth(), selectedDate: null, holidaysListOpen: false },
  planningSearch: '',
  planningYearFilter: 'all',
  planningStatusFilter: 'all',
  opinionProfessorFilter: 'all',
  opinionStarFilter: 'all',
  editingCalendarId: null,
  editingClassSeriesId: null,
  editingForumId: null,
  pendingConfirmEmail: null,
  pendingConfirmUserId: null,
  pendingConfirmName: '',
  pendingVerification: false,
  passwordRecovery: false
};

// ---------------------------------------------------------------
// Supabase: cuentas (auth) + curriculum + progreso por alumno.
// ---------------------------------------------------------------
const SUPABASE_URL = 'https://mwjytbillaioenyicpta.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_EbyGXstCU3-PRbmz7LEw8g_KdAT5959';
const supabaseClient = (typeof window !== 'undefined' && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ---------------------------------------------------------------
// EmailJS: envío del código de verificación de 6 dígitos.
// Reemplazá estos 3 valores por los de tu cuenta de EmailJS
// (Service ID, Template ID y Public Key). El template debe
// aceptar las variables: {{email}}, {{name}}, {{passcode}}, {{time}}.
// ---------------------------------------------------------------
const EMAILJS_CONFIG = {
  serviceId: 'service_5jgsb99',
  templateId: 'template_rrjjnbu',
  publicKey: 'ud2vVqmpmirKTW75d'
};
if (typeof window !== 'undefined' && window.emailjs) {
  window.emailjs.init(EMAILJS_CONFIG.publicKey);
}

function generateVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendVerificationEmail(email, name, code, validFor) {
  if (typeof window === 'undefined' || !window.emailjs) {
    return { ok: false, message: 'EmailJS no se cargó en la página.' };
  }
  try {
    await window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
      email,
      name,
      passcode: code,
      time: validFor || '15 minutos'
    });
    return { ok: true };
  } catch (error) {
    console.error('EmailJS send error:', error);
    const message = error && error.text ? error.text : 'No se pudo enviar el correo.';
    return { ok: false, message };
  }
}

async function issueVerificationCode(userId, email, name) {
  const code = generateVerificationCode();
  const expires = new Date(Date.now() + 15 * 60000).toISOString();
  const { error: dbError } = await supabaseClient
    .from('profiles')
    .update({ verification_code: code, verification_expires: expires })
    .eq('id', userId);
  if (dbError) {
    console.error('No se pudo guardar el código de verificación:', dbError.message);
    return { ok: false, message: 'No se pudo generar el código. Intentá de nuevo.' };
  }
  return sendVerificationEmail(email, name, code);
}

async function confirmPasswordReset(email, code, newPassword) {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ action: 'confirm_password_reset', email, code, newPassword })
    });
    const result = await response.json();
    if (!response.ok) return { ok: false, message: result.error || 'No se pudo actualizar la contraseña.' };
    return { ok: true };
  } catch (error) {
    return { ok: false, message: 'No se pudo contactar el servidor.' };
  }
}

function mapSubjectRow(row) {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    year: row.year,
    semester: row.semester,
    hours: row.hours,
    modality: row.modality,
    libre: row.libre,
    examFinal: row.exam_final,
    correlatives: row.correlatives || [],
    anySemester: !!row.any_semester,
    units: [], dates: [], forum: [], opinions: [], polls: [], exams: []
  };
}

async function loadSubjectsFromSupabase() {
  if (!supabaseClient) {
    state.data.subjects = buildCurriculumSubjects();
    return;
  }
  const { data, error } = await supabaseClient.from('subjects').select('*').order('code');
  if (error || !data || !data.length) {
    state.data.subjects = buildCurriculumSubjects();
    return;
  }
  // "code" es texto en la base, así que .order('code') lo ordena
  // alfabéticamente (1, 10, 11, 2, 3...) en vez de numéricamente. Se
  // reordena acá una sola vez para que toda la web (listados, selectores,
  // etc.) muestre 1, 2, 3... 10, 11 como corresponde.
  state.data.subjects = data.map(mapSubjectRow).sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10));
}

// El calendario vive en Supabase (tabla calendar_events) para que sea un
// dato real y compartido: entre otras cosas, es lo que lee el bot de
// Discord para mostrar fechas y mandar recordatorios. Si no hay conexión a
// Supabase (ej. abriendo el archivo local sin red) se usan los 3 eventos
// semilla de arriba como fallback, igual que el curriculum.
function mapCalendarRow(row) {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    date: row.date,
    endDate: row.end_date || '',
    startTime: row.start_time ? row.start_time.slice(0, 5) : '',
    endTime: row.end_time ? row.end_time.slice(0, 5) : '',
    subjectId: row.subject_id || '',
    modality: row.modality || '',
    seriesId: row.series_id || '',
    room: row.room || '',
    classCode: row.class_code || ''
  };
}

async function loadCalendarFromSupabase() {
  if (!supabaseClient) return;
  const { data, error } = await supabaseClient.from('calendar_events').select('*').order('date');
  if (error || !data) return;
  state.data.calendar = data.map(mapCalendarRow);
}

async function createCalendarEvent({ title, date, type, endDate, startTime, endTime, subjectId, modality, room, classCode }) {
  if (!supabaseClient) {
    state.data.calendar.unshift({ id: generateLocalId('event'), title, date, type, endDate, startTime, endTime, subjectId: subjectId || '', modality: modality || '', seriesId: '', room: room || '', classCode: classCode || '' });
    return;
  }
  const { data, error } = await supabaseClient.from('calendar_events').insert({
    title, date, type,
    end_date: endDate || null,
    start_time: startTime || null,
    end_time: endTime || null,
    subject_id: subjectId || null,
    modality: modality || null,
    room: room || null,
    class_code: classCode || null,
    created_by: state.currentUser ? state.currentUser.id : null
  }).select().single();
  if (error) { console.error('No se pudo crear el evento:', error); return; }
  state.data.calendar.unshift(mapCalendarRow(data));
}

async function updateCalendarEvent(id, { title, date, type, endDate, startTime, endTime, subjectId, modality, room, classCode }) {
  const item = state.data.calendar.find(entry => entry.id === id);
  if (item) Object.assign(item, { title, date, type, endDate, startTime, endTime, subjectId: subjectId || '', modality: modality || '', room: room || '', classCode: classCode || '' });
  if (!supabaseClient) return;
  const { error } = await supabaseClient.from('calendar_events').update({
    title, date, type,
    end_date: endDate || null,
    start_time: startTime || null,
    end_time: endTime || null,
    subject_id: subjectId || null,
    modality: modality || null,
    room: room || null,
    class_code: classCode || null
  }).eq('id', id);
  if (error) console.error('No se pudo actualizar el evento:', error);
}

async function deleteCalendarEvent(id) {
  state.data.calendar = state.data.calendar.filter(item => item.id !== id);
  if (!supabaseClient) return;
  const { error } = await supabaseClient.from('calendar_events').delete().eq('id', id);
  if (error) console.error('No se pudo borrar el evento:', error);
}

// Un evento se considera vencido (y se deja de mostrar) X días después de
// terminar, según el tipo: "Cuatrimestre" dura 1 mes (para no perder la
// referencia del cuatrimestre activo apenas termina), "Examen" dura 3 meses
// (para que las fechas de examen de la pestaña "Fechas" de cada materia no
// desaparezcan enseguida) y el resto (Académico, Inscripción, Entrega, Clase)
// 1 semana. "Feriado" es un caso aparte: no tiene un plazo fijo, se borra
// cuando arranca un año nuevo (es decir, en cuanto cambia el año calendario
// respecto a la fecha del feriado). Si quien tiene la sesión abierta es
// admin, además se borra de verdad en Supabase — no hay un cron en este sitio
// estático, así que la limpieza real en la base ocurre recién la primera vez
// que un admin visita la página después de ese plazo.
const CALENDAR_RETENTION_DAYS = { 'Examen': 90, 'Cuatrimestre': 30 };
const CALENDAR_RETENTION_DAYS_DEFAULT = 7;

function isCalendarEventExpired(event, todayISO) {
  if (event.type === 'Feriado') return Number(event.date.slice(0, 4)) < Number(todayISO.slice(0, 4));
  const retentionDays = CALENDAR_RETENTION_DAYS[event.type] ?? CALENDAR_RETENTION_DAYS_DEFAULT;
  const end = event.endDate || event.date;
  return addDaysISO(end, retentionDays) < todayISO;
}

async function cleanupExpiredCalendarEvents() {
  const todayISO = toISODate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const expired = state.data.calendar.filter(event => isCalendarEventExpired(event, todayISO));
  if (!expired.length) return;

  state.data.calendar = state.data.calendar.filter(event => !isCalendarEventExpired(event, todayISO));
  if (!supabaseClient || !isAdminView()) return;

  const { error } = await supabaseClient.from('calendar_events').delete().in('id', expired.map(event => event.id));
  if (error) console.error('No se pudieron borrar eventos vencidos:', error);
}

async function deleteCalendarSeries(seriesId) {
  state.data.calendar = state.data.calendar.filter(item => item.seriesId !== seriesId);
  if (!supabaseClient) return;
  const { error } = await supabaseClient.from('calendar_events').delete().eq('series_id', seriesId);
  if (error) console.error('No se pudo borrar la serie:', error);
}

async function updateCalendarSeriesRoomAndCode(seriesId, room, classCode) {
  state.data.calendar.forEach(item => { if (item.seriesId === seriesId) { item.room = room || ''; item.classCode = classCode || ''; } });
  if (!supabaseClient) return;
  const { error } = await supabaseClient.from('calendar_events').update({ room: room || null, class_code: classCode || null }).eq('series_id', seriesId);
  if (error) console.error('No se pudo actualizar el aula/código de la serie:', error);
}

// Recalcula el patrón Presencial/Virtual de una serie ya generada. OJO: las
// clases pasadas se auto-borran del calendario 1 semana después de darse (ver
// CALENDAR_RETENTION_DAYS_DEFAULT), así que para cuando se recalcula, las
// primeras fechas de la serie ya pueden no existir más como evento. Por eso
// el índice del patrón NO se calcula sobre los eventos que sobreviven, sino
// sobre la lista completa y teórica de fechas de ese día de la semana dentro
// del cuatrimestre activo (la misma lógica que generateRecurringClasses),
// salteando feriados — así una clase ya borrada por antigua sigue "ocupando"
// su lugar en el ciclo y no se corre el patrón. "anchorDate" (opcional) fija
// a mano cuál fue la primera clase real (índice 0 = Presencial ahí), para
// los casos en que el inicio real de cursada no coincide con la fecha de
// inicio del evento "Cuatrimestre" cargado en el calendario.
async function recalculateSeriesModality(seriesId, presencialCount, virtualCount, anchorDate) {
  const seriesEvents = state.data.calendar.filter(item => item.seriesId === seriesId && item.type === 'Clase');
  if (!seriesEvents.length) return;

  const semesterEvent = getCurrentSemesterEvent();
  if (!semesterEvent) return;

  const sampleDate = seriesEvents[0].date;
  const [sy, sm, sd] = sampleDate.split('-').map(Number);
  const weekday = new Date(sy, sm - 1, sd).getDay();

  const rangeStart = anchorDate || semesterEvent.date;
  const rangeEnd = semesterEvent.endDate || semesterEvent.date;

  const pattern = [
    ...Array(Math.max(0, presencialCount)).fill('Presencial'),
    ...Array(Math.max(0, virtualCount)).fill('Virtual')
  ];
  if (!pattern.length) return;

  const modalityByDate = {};
  let index = 0;
  let cursor = rangeStart;
  while (cursor <= rangeEnd) {
    const [y, m, d] = cursor.split('-').map(Number);
    if (new Date(y, m - 1, d).getDay() === weekday && !isHolidayDate(cursor)) {
      modalityByDate[cursor] = pattern[index % pattern.length];
      index += 1;
    }
    cursor = addDaysISO(cursor, 1);
  }

  for (const event of seriesEvents) {
    if (isHolidayDate(event.date)) {
      await deleteCalendarEvent(event.id);
      continue;
    }
    const modality = modalityByDate[event.date];
    if (!modality || event.modality === modality) continue;
    event.modality = modality;
    if (supabaseClient) {
      const { error } = await supabaseClient.from('calendar_events').update({ modality }).eq('id', event.id);
      if (error) console.error('No se pudo actualizar la modalidad:', error);
    }
  }
}

// Genera una tanda de "Clase" para una materia, una por cada día de la semana
// elegido dentro del rango del cuatrimestre activo, alternando modalidad según
// el patrón (ej. 1 presencial + 2 virtuales => P, V, V, P, V, V...). Todas
// comparten un series_id para poder borrarlas juntas después.
async function generateRecurringClasses({ subjectId, weekday, startTime, endTime, presencialCount, virtualCount, room, classCode }) {
  const semesterEvent = getCurrentSemesterEvent();
  if (!semesterEvent) return { ok: false, message: 'No hay un cuatrimestre activo cargado en el calendario.' };

  const subject = state.data.subjects.find(item => item.id === subjectId);
  if (!subject) return { ok: false, message: 'Elegí una materia.' };

  const pattern = [
    ...Array(Math.max(0, presencialCount)).fill('Presencial'),
    ...Array(Math.max(0, virtualCount)).fill('Virtual')
  ];
  if (!pattern.length) return { ok: false, message: 'Ingresá al menos una clase presencial o virtual.' };

  const rangeStart = semesterEvent.date;
  const rangeEnd = semesterEvent.endDate || semesterEvent.date;

  // Los feriados se excluyen antes de repartir el patrón P/V/V, así una
  // semana de feriado no consume un turno del ciclo: si la 2da semana es
  // feriado, la 3ra sigue con lo que le tocaba a la 2da (el ciclo se corre,
  // no se "pisa" un turno con el feriado).
  const dates = [];
  let cursor = rangeStart;
  while (cursor <= rangeEnd) {
    const [y, m, d] = cursor.split('-').map(Number);
    if (new Date(y, m - 1, d).getDay() === weekday && !isHolidayDate(cursor)) dates.push(cursor);
    cursor = addDaysISO(cursor, 1);
  }
  if (!dates.length) return { ok: false, message: 'No hay ninguna fecha con ese día de la semana (sin contar feriados) dentro del cuatrimestre activo.' };

  const seriesId = (crypto.randomUUID ? crypto.randomUUID() : generateLocalId('series'));
  const rows = dates.map((date, index) => ({
    title: subject.name,
    type: 'Clase',
    date,
    start_time: startTime || null,
    end_time: endTime || null,
    subject_id: subject.id,
    modality: pattern[index % pattern.length],
    series_id: seriesId,
    room: room || null,
    class_code: classCode || null,
    created_by: state.currentUser ? state.currentUser.id : null
  }));

  if (!supabaseClient) {
    rows.forEach(row => state.data.calendar.unshift({
      id: generateLocalId('event'), title: row.title, type: row.type, date: row.date,
      endDate: '', startTime, endTime, subjectId: row.subject_id, modality: row.modality, seriesId, room: room || '', classCode: classCode || ''
    }));
    return { ok: true, count: rows.length };
  }

  const { data, error } = await supabaseClient.from('calendar_events').insert(rows).select();
  if (error) return { ok: false, message: error.message };

  data.map(mapCalendarRow).forEach(item => state.data.calendar.unshift(item));
  return { ok: true, count: data.length };
}

// Trae los feriados nacionales de Argentina de un año desde Nager.Date (servicio
// público gratuito, sin API key, habilitado para pedirse directo desde el
// navegador). No reproduce las 4 categorías de argentina.gob.ar/feriados
// (inamovible/trasladable/no laborable/turístico), solo nombre + fecha.
async function importArgentinaHolidays(year) {
  if (!supabaseClient) return { ok: false, message: 'No hay sesión con Supabase.' };

  let holidays;
  try {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/AR`);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    holidays = await response.json();
  } catch (error) {
    return { ok: false, message: 'No se pudo consultar el servicio de feriados: ' + error.message };
  }
  if (!Array.isArray(holidays) || !holidays.length) {
    return { ok: false, message: 'No se encontraron feriados para ese año.' };
  }

  const existingDates = new Set(
    state.data.calendar.filter(event => event.type === 'Feriado').map(event => event.date)
  );
  const toInsert = holidays
    .filter(holiday => !existingDates.has(holiday.date))
    .map(holiday => ({
      title: holiday.localName,
      type: 'Feriado',
      date: holiday.date,
      created_by: state.currentUser ? state.currentUser.id : null
    }));

  if (!toInsert.length) return { ok: true, added: 0, skipped: holidays.length };

  const { data, error } = await supabaseClient.from('calendar_events').insert(toInsert).select();
  if (error) return { ok: false, message: error.message };

  data.map(mapCalendarRow).forEach(item => state.data.calendar.unshift(item));
  return { ok: true, added: data.length, skipped: holidays.length - data.length };
}

// =========================================================
// Foro general
// =========================================================
async function createForumPost({ title, content }) {
  if (!supabaseClient || !state.currentUser) return { ok: false, message: 'No hay sesión.' };
  const { data, error } = await supabaseClient.from('forum_posts').insert({
    title, content,
    author_id: state.currentUser.id,
    author_name: getFullName(state.currentUser)
  }).select().single();
  if (error) return { ok: false, message: error.message };
  state.data.forum.unshift(mapForumRow(data));
  return { ok: true };
}

async function updateForumPost(id, { title, content }) {
  const item = state.data.forum.find(entry => entry.id === id);
  if (item) Object.assign(item, { title, content });
  if (!supabaseClient) return;
  const { error } = await supabaseClient.from('forum_posts').update({ title, content }).eq('id', id);
  if (error) console.error('No se pudo actualizar la publicación:', error);
}

async function deleteForumPost(id) {
  state.data.forum = state.data.forum.filter(item => item.id !== id);
  if (!supabaseClient) return;
  const { error } = await supabaseClient.from('forum_posts').delete().eq('id', id);
  if (error) console.error('No se pudo borrar la publicación:', error);
}

// Vinculación de la cuenta del portal con Discord (ver user.html, sección
// "Discord"). El código generado acá lo consume el bot con /vincular, que
// usa la service_role key (evade RLS) para completar discord_user_id.
function initDiscordLinkSection() {
  const generateBtn = document.getElementById('generateDiscordCodeBtn');
  const unlinkBtn = document.getElementById('unlinkDiscordBtn');
  const status = document.getElementById('discordLinkStatus');
  if (!generateBtn || !status || !supabaseClient || !state.currentUser) return;

  async function refreshStatus() {
    const { data } = await supabaseClient
      .from('discord_links')
      .select('discord_user_id, link_code, link_code_expires')
      .eq('user_id', state.currentUser.id)
      .maybeSingle();

    if (data && data.discord_user_id) {
      status.className = 'notice show';
      status.textContent = 'Tu cuenta ya está vinculada con Discord. Vas a recibir recordatorios por DM.';
      unlinkBtn.classList.remove('hidden');
      generateBtn.textContent = 'Generar nuevo código';
    } else if (data && data.link_code && new Date(data.link_code_expires) > new Date()) {
      status.className = 'notice show';
      status.textContent = `Tu código es ${data.link_code}. Escribile "/vincular ${data.link_code}" al bot antes de que expire (10 min).`;
      unlinkBtn.classList.add('hidden');
    } else {
      status.className = 'notice show';
      status.textContent = 'Todavía no vinculaste tu cuenta de Discord.';
      unlinkBtn.classList.add('hidden');
    }
  }

  generateBtn.addEventListener('click', async () => {
    generateBtn.disabled = true;
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const { error } = await supabaseClient.from('discord_links').upsert({
      user_id: state.currentUser.id,
      link_code: code,
      link_code_expires: expires
    });
    generateBtn.disabled = false;
    if (error) {
      status.className = 'notice show error';
      status.textContent = 'No se pudo generar el código: ' + error.message;
      return;
    }
    await refreshStatus();
  });

  unlinkBtn.addEventListener('click', async () => {
    unlinkBtn.disabled = true;
    await supabaseClient.from('discord_links')
      .update({ discord_user_id: null, linked_at: null, link_code: null, link_code_expires: null })
      .eq('user_id', state.currentUser.id);
    unlinkBtn.disabled = false;
    await refreshStatus();
  });

  refreshStatus();
}

async function loadStudentProgress(userId, email) {
  state.data.studentProgress[email] = {};
  if (!supabaseClient || !userId) return;
  const { data, error } = await supabaseClient.from('student_progress').select('*').eq('user_id', userId);
  if (error || !data) return;
  data.forEach(row => {
    state.data.studentProgress[email][row.subject_id] = { status: row.status, grades: row.grades };
  });
}

function persistProgress(subjectId) {
  if (!supabaseClient || !state.currentUser) return;
  const progress = getSubjectProgress(state.currentUser.email, subjectId);
  supabaseClient.from('student_progress').upsert({
    user_id: state.currentUser.id,
    subject_id: subjectId,
    status: progress.status,
    grades: progress.grades,
    updated_at: new Date().toISOString()
  }).then(({ error }) => {
    if (error) console.error('No se pudo guardar el progreso en Supabase:', error.message);
  });
}

async function setCurrentUserFromSession(session) {
  if (!session) {
    state.currentUser = null;
    return;
  }
  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error || !profile) {
    state.currentUser = null;
    state.authError = error ? error.message : 'No se encontró el perfil de este usuario.';
    console.error('No se pudo cargar el perfil tras iniciar sesión:', error);
    return;
  }

  state.authError = null;

  if (!profile.email_verified) {
    state.currentUser = null;
    state.pendingVerification = true;
    state.pendingConfirmEmail = profile.email;
    state.pendingConfirmUserId = profile.id;
    state.pendingConfirmName = profile.name;
    return;
  }

  state.currentUser = {
    id: session.user.id,
    email: session.user.email,
    name: profile.name,
    lastName: profile.last_name || '',
    birthDate: profile.birth_date || '',
    role: profile.role,
    avatar: profile.avatar,
    avatarUrl: profile.avatar_url || null,
    extraInfo: profile.extra_info || {},
    createdAt: profile.created_at,
    phone: profile.phone || '',
    instagram: profile.instagram || '',
    linkedin: profile.linkedin || '',
    contactVisible: !!profile.contact_visible
  };
  await loadStudentProgress(session.user.id, session.user.email);
}

async function restoreSession() {
  if (!supabaseClient) return;
  const { data } = await supabaseClient.auth.getSession();
  await setCurrentUserFromSession(data.session);
}

function isAdminView() {
  return !!(state.currentUser && state.currentUser.role === 'admin' && state.viewMode !== 'user');
}

function applyViewMode() {
  const adminShortcut = document.getElementById('adminShortcut');
  const contentAddCard = document.getElementById('subjectContentAdmin');
  const toggleBtn = document.getElementById('viewModeToggle');
  const addCalendarEventBtn = document.getElementById('addCalendarEventBtn');
  const addRecurringClassBtn = document.getElementById('addRecurringClassBtn');
  const importHolidaysBtn = document.getElementById('importHolidaysBtn');
  const newCalendarEventForm = document.getElementById('newCalendarEventForm');
  const recurringClassForm = document.getElementById('recurringClassForm');
  const importHolidaysForm = document.getElementById('importHolidaysForm');
  const isAdminAccount = !!(state.currentUser && state.currentUser.role === 'admin');

  if (adminShortcut) adminShortcut.classList.toggle('hidden', !isAdminView());
  if (contentAddCard && state.currentSubjectId) contentAddCard.classList.toggle('hidden', !isAdminView() || state.subjectSection !== 'contenido');
  if (addCalendarEventBtn) addCalendarEventBtn.classList.toggle('hidden', !isAdminView());
  if (addRecurringClassBtn) addRecurringClassBtn.classList.toggle('hidden', !isAdminView());
  if (importHolidaysBtn) importHolidaysBtn.classList.toggle('hidden', !isAdminView());
  if (newCalendarEventForm && !isAdminView()) newCalendarEventForm.classList.add('hidden');
  if (recurringClassForm && !isAdminView()) recurringClassForm.classList.add('hidden');
  if (importHolidaysForm && !isAdminView()) importHolidaysForm.classList.add('hidden');

  if (toggleBtn) {
    toggleBtn.classList.toggle('hidden', !isAdminAccount);
    toggleBtn.textContent = state.viewMode === 'user' ? 'Ver como admin' : 'Ver como usuario';
  }

  const sidebarToggleBtn = document.getElementById('sidebarViewModeToggle');
  const sidebarToggleLabel = document.getElementById('sidebarViewModeLabel');
  if (sidebarToggleBtn) {
    sidebarToggleBtn.classList.toggle('hidden', !isAdminAccount);
    if (sidebarToggleLabel) sidebarToggleLabel.textContent = state.viewMode === 'user' ? 'Ver como admin' : 'Ver como usuario';
  }

  // Evaluaciones: al pasar a vista alumno se cierra el editor y se ocultan
  // las acciones de admin.
  if (state.examView.mode === 'edit' && !isAdminView()) state.examView = { mode: 'list', examId: null };
  const examSubject = currentSubject();
  if (examSubject) renderExamsSection(examSubject);
}

function toggleViewMode() {
  if (!state.currentUser || state.currentUser.role !== 'admin') return;
  state.viewMode = state.viewMode === 'user' ? 'admin' : 'user';
  state.editingCalendarId = null;
  state.editingForumId = null;
  updatePortalHeader(state.currentUser);
  renderCalendarList();
  renderForumList();
}

async function performLogout() {
  if (supabaseClient) await supabaseClient.auth.signOut();
  window.location.reload();
}

const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const PORTAL_DATA_VERSION = '11';

// El curriculum, el progreso por alumno, el calendario, el foro general y el
// contenido de cada materia (unidades, PDFs/clases, foro de materia,
// opiniones, encuestas) viven todos en Supabase — son datos reales y
// compartidos entre dominios/dispositivos, no locales del navegador.

function mapForumRow(row) {
  return { id: row.id, title: row.title, content: row.content, author: row.author_name, authorId: row.author_id };
}

async function loadForumFromSupabase() {
  if (!supabaseClient) return;
  const { data, error } = await supabaseClient.from('forum_posts').select('*').order('created_at', { ascending: false });
  if (error || !data) return;
  state.data.forum = data.map(mapForumRow);
}

function mapFaqRow(row) {
  return { id: row.id, question: row.question, answer: row.answer, position: row.position };
}

async function loadFaqFromSupabase() {
  if (!supabaseClient) return;
  const { data, error } = await supabaseClient.from('faq_items').select('*').order('position', { ascending: true });
  if (error || !data) return;
  state.data.faq = data.map(mapFaqRow);
}

function mapContentItemRow(row) {
  const base = { id: row.id, type: row.type, title: row.title, uploadedBy: row.uploaded_by, position: row.position, createdAt: row.created_at };
  return row.type === 'pdf'
    ? { ...base, fileName: row.file_name, url: row.url, storagePath: row.storage_path }
    : { ...base, body: row.body };
}

// Importador de "Clase N.html" guardadas desde el campus (con su carpeta
// "..._files" de imágenes al lado) directamente desde admin.html, sin pasar
// por un script aparte. Reutiliza el mismo modelo que ya usa el editor de
// Contenido de Materias (unidad "Clases" + subject_content_items tipo "clase").
function groupImportFilesBySubject(fileList, subjects) {
  const groups = new Map();
  const files = Array.from(fileList).filter(file => file.webkitRelativePath);
  if (!files.length) return groups;

  const sample = files[0].webkitRelativePath.split('/');
  const rootIsSubjectFolder = subjects.some(subject => Number(subject.code) === Number(sample[0]));

  files.forEach(file => {
    const segments = file.webkitRelativePath.split('/');
    const codeFolder = rootIsSubjectFolder ? segments[0] : segments[1];
    const restPath = rootIsSubjectFolder ? segments.slice(1).join('/') : segments.slice(2).join('/');
    if (!restPath) return;
    const subject = subjects.find(item => Number(item.code) === Number(codeFolder));
    if (!subject) return;

    if (!groups.has(subject.id)) groups.set(subject.id, { subject, htmlFiles: [], assets: new Map() });
    const group = groups.get(subject.id);
    if (/\.html?$/i.test(restPath) && !restPath.includes('/')) {
      group.htmlFiles.push({ file, relPath: restPath });
    } else {
      group.assets.set(restPath, file);
    }
  });
  return groups;
}

async function decodeHtmlFile(file) {
  const buffer = await file.arrayBuffer();
  try {
    return new TextDecoder('windows-1252').decode(buffer);
  } catch (error) {
    return new TextDecoder('utf-8').decode(buffer);
  }
}

// El campus guarda la clase dentro de <article class="contenido item_programa">,
// con el título en un <h3 class="edu-header-h3"> y el cuerpo real en el
// <div class="item_unidad">. El resto del archivo es chrome de la plataforma
// (menú, header, nav) que no nos interesa.
function extractClaseFromHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const article = doc.querySelector('article.contenido.item_programa');
  if (!article) return null;
  const bodyEl = article.querySelector('.item_unidad');
  if (!bodyEl) return null;
  const titleEl = article.querySelector('h3.edu-header-h3');
  const title = titleEl ? titleEl.textContent.replace(/\s+/g, ' ').trim() : '';

  bodyEl.querySelectorAll('script, style').forEach(el => el.remove());
  bodyEl.querySelectorAll('*').forEach(el => {
    [...el.attributes].forEach(attr => {
      if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
    });
  });
  return { title, bodyEl };
}

async function uploadClaseImage(subjectId, file) {
  const path = `clases-import/${subjectId}/${generateLocalId('img')}_${sanitizeStorageFilename(file.name)}`;
  const { error } = await supabaseClient.storage.from('subject-content').upload(path, file, { contentType: file.type || 'image/png' });
  if (error) return null;
  const { data } = supabaseClient.storage.from('subject-content').getPublicUrl(path);
  return data.publicUrl;
}

async function ensureClasesUnit(subject) {
  const existing = subject.units.find(unit => unit.title === 'Clases');
  if (existing) return existing;
  const { data, error } = await supabaseClient.from('subject_units').insert({ subject_id: subject.id, title: 'Clases' }).select().single();
  if (error) throw new Error(error.message);
  const unit = { id: data.id, title: data.title, items: [] };
  subject.units.push(unit);
  return unit;
}

async function runClasesImport(fileList, force, logEl, noticeEl) {
  if (!supabaseClient || !isAdminView()) return;
  const groups = groupImportFilesBySubject(fileList, state.data.subjects);
  if (!groups.size) {
    noticeEl.className = 'notice show error';
    noticeEl.textContent = 'No se encontraron materias que coincidan por código dentro de la carpeta elegida.';
    return;
  }

  logEl.innerHTML = '';
  const appendLog = text => {
    const line = document.createElement('div');
    line.textContent = text;
    logEl.appendChild(line);
  };

  let imported = 0, updated = 0, skipped = 0, failed = 0;

  for (const { subject, htmlFiles, assets } of groups.values()) {
    if (!htmlFiles.length) continue;
    appendLog(`Materia ${subject.code} · ${subject.name}`);

    let unit;
    try {
      unit = await ensureClasesUnit(subject);
    } catch (error) {
      appendLog(`  ! no se pudo crear/leer la unidad "Clases": ${error.message}`);
      failed += htmlFiles.length;
      continue;
    }

    const sortedHtmlFiles = htmlFiles.slice().sort((a, b) => a.relPath.localeCompare(b.relPath, 'es', { numeric: true }));
    for (const { file, relPath } of sortedHtmlFiles) {
      const html = await decodeHtmlFile(file);
      const extracted = extractClaseFromHtml(html);
      if (!extracted) {
        appendLog(`  ! no se pudo leer el contenido de "${relPath}", se saltea.`);
        failed += 1;
        continue;
      }
      const title = extracted.title || relPath.replace(/\.html?$/i, '');

      const imgEls = [...extracted.bodyEl.querySelectorAll('img[src^="./"]')];
      for (const img of imgEls) {
        const ref = img.getAttribute('src').replace(/^\.\//, '');
        const assetFile = assets.get(ref);
        if (!assetFile) continue;
        const url = await uploadClaseImage(subject.id, assetFile);
        if (url) img.setAttribute('src', url);
      }

      const body = extracted.bodyEl.innerHTML.trim();
      if (!body) {
        appendLog(`  ! "${title}" quedó vacía, se saltea.`);
        failed += 1;
        continue;
      }

      const existingItem = unit.items.find(item => item.title === title);
      const uploadedBy = getFullName(state.currentUser);

      if (existingItem && !force) {
        appendLog(`  = "${title}" ya existe, se saltea.`);
        skipped += 1;
        continue;
      }

      if (existingItem && force) {
        const { error } = await supabaseClient.from('subject_content_items').update({ body, uploaded_by: uploadedBy }).eq('id', existingItem.id);
        if (error) { appendLog(`  ! no se pudo actualizar "${title}": ${error.message}`); failed += 1; continue; }
        existingItem.body = body;
        appendLog(`  ↻ "${title}" actualizada.`);
        updated += 1;
        continue;
      }

      const { data, error } = await supabaseClient.from('subject_content_items')
        .insert({ unit_id: unit.id, subject_id: subject.id, type: 'clase', title, body, uploaded_by: uploadedBy, position: unit.items.length })
        .select().single();
      if (error) { appendLog(`  ! no se pudo crear "${title}": ${error.message}`); failed += 1; continue; }
      unit.items.push(mapContentItemRow(data));
      appendLog(`  + "${title}" importada.`);
      imported += 1;
    }
  }

  noticeEl.className = 'notice show';
  noticeEl.textContent = `Listo: ${imported} nuevas, ${updated} actualizadas, ${skipped} saltedas, ${failed} con error.`;
}

// Carga en bloque (pocas queries en vez de una por materia) todo el
// contenido propio de cada materia y lo cuelga de state.data.subjects.
function mapSummaryRow(row) {
  return { id: row.id, title: row.title, fileName: row.file_name, url: row.url, storagePath: row.storage_path, author: row.author_name, authorId: row.author_id, createdAt: row.created_at };
}

async function loadSubjectContentFromSupabase() {
  state.data.subjects.forEach(subject => {
    subject.units = [];
    subject.dates = subject.dates || [];
    subject.forum = [];
    subject.opinions = [];
    subject.polls = [];
    subject.summaries = [];
    subject.exams = [];
  });
  if (!supabaseClient) return;

  const [unitsRes, itemsRes, forumRes, opinionsRes, pollsRes, optionsRes, votesRes, summariesRes, examsRes] = await Promise.all([
    supabaseClient.from('subject_units').select('*').order('created_at', { ascending: true }),
    supabaseClient.from('subject_content_items').select('*').order('position', { ascending: true }).order('created_at', { ascending: true }),
    supabaseClient.from('subject_forum_posts').select('*').order('created_at', { ascending: false }),
    supabaseClient.from('subject_opinions').select('*').order('created_at', { ascending: false }),
    supabaseClient.from('subject_polls').select('*').order('created_at', { ascending: false }),
    supabaseClient.from('subject_poll_options').select('*').order('position', { ascending: true }),
    supabaseClient.from('subject_poll_votes').select('*'),
    supabaseClient.from('subject_summaries').select('*').order('created_at', { ascending: false }),
    supabaseClient.from('subject_exams').select('*').order('created_at', { ascending: true })
  ]);

  const subjectsById = {};
  state.data.subjects.forEach(subject => { subjectsById[subject.id] = subject; });

  const unitsById = {};
  (unitsRes.data || []).forEach(row => {
    const subject = subjectsById[row.subject_id];
    if (!subject) return;
    const unit = { id: row.id, title: row.title, items: [] };
    unitsById[row.id] = unit;
    subject.units.push(unit);
  });

  (itemsRes.data || []).forEach(row => {
    const unit = unitsById[row.unit_id];
    if (unit) unit.items.push(mapContentItemRow(row));
  });

  (forumRes.data || []).forEach(row => {
    const subject = subjectsById[row.subject_id];
    if (subject) subject.forum.push({ id: row.id, author: row.author_name, authorId: row.author_id, content: row.content });
  });

  (opinionsRes.data || []).forEach(row => {
    const subject = subjectsById[row.subject_id];
    if (subject) subject.opinions.push({ id: row.id, professor: row.professor, rating: row.rating, content: row.content, author: row.author_name, authorId: row.author_id });
  });

  const pollsById = {};
  (pollsRes.data || []).forEach(row => {
    const subject = subjectsById[row.subject_id];
    if (!subject) return;
    const poll = { id: row.id, question: row.question, createdBy: row.created_by_name, options: [] };
    pollsById[row.id] = poll;
    subject.polls.push(poll);
  });

  const optionsById = {};
  (optionsRes.data || []).forEach(row => {
    const poll = pollsById[row.poll_id];
    if (!poll) return;
    const option = { id: row.id, label: row.label, votes: [] };
    optionsById[row.id] = option;
    poll.options.push(option);
  });

  (votesRes.data || []).forEach(row => {
    const option = optionsById[row.option_id];
    if (option) option.votes.push(row.user_id);
  });

  (summariesRes.data || []).forEach(row => {
    const subject = subjectsById[row.subject_id];
    if (subject) subject.summaries.push(mapSummaryRow(row));
  });

  // Si la tabla todavía no existe (no se corrió el SQL), la sección de
  // evaluaciones queda vacía y el resto de la materia carga igual.
  if (examsRes.error) console.warn('No se pudieron cargar las evaluaciones:', examsRes.error.message);
  (examsRes.data || []).forEach(row => {
    const subject = subjectsById[row.subject_id];
    if (subject) subject.exams.push(mapExamRow(row));
  });
}

function mapExamRow(row) {
  return {
    id: row.id,
    subjectId: row.subject_id,
    title: row.title,
    description: row.description || '',
    durationMinutes: row.duration_minutes || null,
    config: { ...DEFAULT_EXAM_CONFIG, ...(row.config || {}) },
    questions: Array.isArray(row.questions) ? row.questions : [],
    createdBy: row.created_by_name,
    updatedAt: row.updated_at
  };
}

function examToRow(subject, draft) {
  return {
    subject_id: subject.id,
    title: draft.title.trim(),
    description: (draft.description || '').trim(),
    duration_minutes: draft.durationMinutes || null,
    config: draft.config,
    questions: draft.questions.map(question => {
      const base = { id: question.id, type: question.type || 'true_false_statements', topic: (question.topic || '').trim(), prompt: question.prompt };
      return isMultipleChoice(question)
        ? { ...base, options: question.options.map(option => ({ text: option.text })), correct: question.correct }
        : { ...base, statements: question.statements.map(statement => ({ text: statement.text, answer: !!statement.answer })) };
    })
  };
}

async function saveExam(subject, draft) {
  if (!supabaseClient || !isAdminView()) return { ok: false, message: 'Solo un admin puede guardar evaluaciones.' };
  const row = examToRow(subject, draft);
  const query = draft.id
    ? supabaseClient.from('subject_exams').update({ ...row, updated_at: new Date().toISOString() }).eq('id', draft.id)
    : supabaseClient.from('subject_exams').insert({ ...row, created_by_name: getFullName(state.currentUser) || 'Admin' });
  const { data, error } = await query.select().single();
  if (error) return { ok: false, message: `No se pudo guardar la evaluación: ${error.message}` };

  const exam = mapExamRow(data);
  const index = subject.exams.findIndex(item => item.id === exam.id);
  if (index === -1) subject.exams.push(exam);
  else subject.exams[index] = exam;
  return { ok: true, exam };
}

async function deleteExam(subject, examId) {
  if (!supabaseClient || !isAdminView()) return { ok: false, message: 'Solo un admin puede borrar evaluaciones.' };
  const { error } = await supabaseClient.from('subject_exams').delete().eq('id', examId);
  if (error) return { ok: false, message: `No se pudo borrar la evaluación: ${error.message}` };
  subject.exams = subject.exams.filter(item => item.id !== examId);
  return { ok: true };
}

// Texto cargado por un admin, con fórmulas opcionales ($...$ / $$...$$), a
// HTML. Si KaTeX no cargó, la fórmula se muestra como texto entre sus $.
function renderMathText(text) {
  return splitMathSegments(text).map(segment => {
    if (segment.type === 'text') return escapeHtml(segment.value).replace(/\n/g, '<br>');
    const delimiter = segment.display ? '$$' : '$';
    const raw = escapeHtml(`${delimiter}${segment.value}${delimiter}`);
    if (typeof window === 'undefined' || !window.katex) return raw;
    try {
      return window.katex.renderToString(segment.value, { displayMode: segment.display, throwOnError: false });
    } catch (error) {
      return `<span class="math-error">${raw}</span>`;
    }
  }).join('');
}

// =========================================================
// Evaluaciones: simulador de exámenes por materia (lista, editor de admin,
// rendir con reloj y resultado). La corrección vive en exam-core.js. Ver
// docs/superpowers/specs/2026-10-21-evaluaciones-design.md.
// =========================================================

function currentSubject() {
  return state.data.subjects.find(item => item.id === state.currentSubjectId) || null;
}

function setExamView(next) {
  state.examView = { ...state.examView, ...next };
  const subject = currentSubject();
  if (subject) renderExamsSection(subject);
}

function renderExamsSection(subject) {
  const target = document.getElementById('subjectExams');
  if (!target) return;
  const view = state.examView;
  const exam = view.examId ? subject.exams.find(item => item.id === view.examId) : null;

  if (view.mode === 'edit' && isAdminView() && view.draft) {
    renderExamEditor(target);
    return;
  }
  if (view.mode === 'take' && exam && view.attempt && !view.attempt.submitted) {
    renderExamAttempt(exam, target);
    return;
  }
  if (view.mode === 'result' && exam && view.result) {
    renderExamResult(exam, target);
    return;
  }
  stopExamTimer();
  state.examView = { mode: 'list', examId: null };
  renderExamList(subject, target);
}

function formatClock(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  return `${pad2(Math.floor(totalSeconds / 60))}:${pad2(totalSeconds % 60)}`;
}

function examDurationLabel(exam) {
  return exam.durationMinutes ? `${exam.durationMinutes} min` : 'Sin límite de tiempo';
}

function examPassLabel(config) {
  return config.passMode === 'points'
    ? `Aprueba con ${formatScore(config.passValue)} ${Number(config.passValue) === 1 ? 'punto' : 'puntos'}`
    : `Aprueba con ${formatScore(config.passValue)} %`;
}

function examHasTrueFalse(exam) {
  return exam.questions.some(question => !isMultipleChoice(question));
}

function examPenaltyLabel(exam) {
  const config = exam.config;
  if (exam.questions.length && !examHasTrueFalse(exam)) return 'Opción múltiple · las respuestas incorrectas no restan';
  const fp = config.fpPenaltyEnabled ? `falso positivo −${formatScore(config.fpPenalty)}` : '';
  const fn = config.fnPenaltyEnabled ? `falso negativo −${formatScore(config.fnPenalty)}` : '';
  if (fp && fn) return `Descuentos: ${fp}, ${fn}`;
  if (fp || fn) return `Descuento: solo ${fp || fn}`;
  return 'Sin descuentos (pregunta con error vale 0)';
}

// ---------- Lista ----------

// Tarjeta "Evaluación de práctica": el alumno no elige cuál rinde, se
// sortea una de las evaluaciones con preguntas. La descripción y los datos
// (preguntas, duración, aprobación) se muestran si son iguales en todas.
function examPracticeCardHtml(exams) {
  const available = exams.filter(exam => exam.questions.length);
  if (!available.length) return '';
  const shared = valueOf => {
    const values = [...new Set(available.map(valueOf))];
    return values.length === 1 ? values[0] : '';
  };
  const description = shared(exam => exam.description || '');
  const count = shared(exam => exam.questions.length);
  const meta = [
    count ? `${count} ${count === 1 ? 'pregunta' : 'preguntas'}` : '',
    shared(exam => examDurationLabel(exam)),
    shared(exam => examPassLabel(exam.config)),
    shared(exam => examPenaltyLabel(exam))
  ].filter(Boolean).join(' · ');
  const timed = available.some(exam => exam.durationMinutes);
  return `
    <div class="exam-random card">
      <div class="exam-random-text">
        <h3>Evaluación de práctica</h3>
        ${description ? `<p class="exam-description">${renderMathText(description)}</p>` : ''}
        ${meta ? `<span>${meta}</span>` : ''}
      </div>
      <div class="exam-random-actions">
        <button type="button" data-exam-random>Iniciar prueba</button>
        ${timed ? '<button type="button" class="ghost-btn" data-exam-random-practice>Practicar sin límite</button>' : ''}
      </div>
    </div>
  `;
}

function startRandomExam(subject, practice) {
  const exam = pickRandomExam(subject.exams, state.lastRandomExamId);
  if (!exam) return;
  state.lastRandomExamId = exam.id;
  startExamAttempt(exam, practice);
}

function renderExamList(subject, target) {
  const admin = isAdminView();
  const exams = subject.exams.filter(exam => admin || exam.questions.length);

  const cards = exams.map(exam => {
    const count = exam.questions.length;
    const meta = [
      `${count} ${count === 1 ? 'pregunta' : 'preguntas'}`,
      examDurationLabel(exam),
      examPassLabel(exam.config)
    ].join(' · ');
    const adminActions = !admin ? ''
      : state.confirmDeleteExamId === exam.id
      ? `<button type="button" class="ghost-btn small-btn danger-btn" data-exam-delete-confirm="${exam.id}">Confirmar eliminación</button>
         <button type="button" class="ghost-btn small-btn" data-exam-delete-cancel>Cancelar</button>`
      : `<button type="button" class="ghost-btn small-btn" data-exam-edit="${exam.id}"><span class="icon icon-edit"></span> Editar</button>
         <button type="button" class="ghost-btn small-btn danger-btn" data-exam-delete="${exam.id}"><span class="icon icon-trash"></span> Eliminar</button>`;
    const start = !count
      ? '<span class="materia-chip">Sin preguntas</span>'
      : exam.durationMinutes
      ? `<button type="button" class="download-link primary" data-exam-start="${exam.id}">Rendir con tiempo (${exam.durationMinutes} min)</button>
         <button type="button" class="download-link" data-exam-practice="${exam.id}">Practicar sin límite</button>`
      : `<button type="button" class="download-link primary" data-exam-start="${exam.id}">Comenzar</button>`;
    return `
      <li class="material-card exam-card">
        <span class="material-icon type-exam"><span class="icon icon-check-circle"></span></span>
        <div class="material-info">
          <strong>${escapeHtml(exam.title)}</strong>
          ${exam.description ? `<span class="exam-description">${renderMathText(exam.description)}</span>` : ''}
          <span>${meta}</span>
          <span>${examPenaltyLabel(exam)}</span>
        </div>
        <div class="material-actions">${start}${adminActions}</div>
      </li>
    `;
  }).join('');

  if (!admin) {
    target.innerHTML = `
      ${examPracticeCardHtml(exams) || createItemCard('Sin evaluaciones', 'Todavía no hay simulacros para esta materia.', '')}
      <p class="form-hint">Practicá con simulacros corregidos con los mismos criterios del examen. Tu resultado no se guarda.</p>
    `;
    return;
  }

  target.innerHTML = `
    <div class="section-head unit-list-head">
      <h3>Evaluaciones</h3>
      <span class="content-item-meta">${exams.length} ${exams.length === 1 ? 'simulacro' : 'simulacros'}</span>
      ${admin ? '<div class="unit-admin-actions"><button type="button" class="small-btn" data-exam-new><span class="icon icon-edit"></span> Nueva evaluación</button></div>' : ''}
    </div>
    <p class="form-hint">Practicá con simulacros corregidos con los mismos criterios del examen. Tu resultado no se guarda.</p>
    <div id="examListNotice" class="notice"></div>
    ${examPracticeCardHtml(exams)}
    ${exams.length
      ? `<ul class="material-list">${cards}</ul>`
      : createItemCard('Sin evaluaciones', 'Todavía no hay simulacros para esta materia.', '')}
  `;
}

// ---------- Editor (solo admin) ----------

function newExamQuestion(type = 'true_false_statements') {
  const question = { id: generateLocalId('q'), type, prompt: '' };
  return type === MULTIPLE_CHOICE
    ? { ...question, options: Array.from({ length: 4 }, () => ({ text: '' })), correct: 0 }
    : { ...question, statements: Array.from({ length: 5 }, () => ({ text: '', answer: true })) };
}

// Cambia el tipo de una pregunta del editor conservando los textos: las
// afirmaciones pasan a ser opciones y viceversa.
function convertExamQuestion(question, type) {
  if ((question.type || 'true_false_statements') === type) return question;
  const { statements, options, correct, ...rest } = question;
  if (type === MULTIPLE_CHOICE) {
    const texts = (statements || []).map(statement => ({ text: statement.text }));
    return { ...rest, type, options: texts.length >= 2 ? texts : [{ text: '' }, { text: '' }], correct: 0 };
  }
  const texts = (options || []).map((option, index) => ({ text: option.text, answer: index === correct }));
  return { ...rest, type, statements: texts.length >= 2 ? texts : [{ text: '', answer: true }, { text: '', answer: false }] };
}

function examChoiceLetter(index) {
  return String.fromCharCode(97 + index);
}

function newExamDraft() {
  return {
    id: null,
    title: '',
    description: '',
    durationMinutes: null,
    config: { ...DEFAULT_EXAM_CONFIG },
    questions: [newExamQuestion()]
  };
}

function openExamEditor(exam) {
  const draft = exam ? JSON.parse(JSON.stringify({ ...exam })) : newExamDraft();
  setExamView({ mode: 'edit', examId: exam ? exam.id : null, draft, dirty: false, errors: {}, saveError: '', saving: false });
}

function examFieldError(path) {
  const message = (state.examView.errors || {})[path];
  return message ? `<p class="field-error" id="err-${path.replace(/\./g, '-')}">${message}</p>` : '';
}

function examInvalidAttrs(path) {
  const message = (state.examView.errors || {})[path];
  return message ? `aria-invalid="true" aria-describedby="err-${path.replace(/\./g, '-')}"` : '';
}

function examNumberValue(value) {
  return value === null || value === undefined || Number.isNaN(value) ? '' : String(value);
}

function vfGroupHtml(label, value, attrs) {
  return `
    <div class="vf-group" role="group" aria-label="${label}">
      <button type="button" class="vf-btn" aria-pressed="${value === true}" data-vf="true" ${attrs}>V</button>
      <button type="button" class="vf-btn" aria-pressed="${value === false}" data-vf="false" ${attrs}>F</button>
    </div>
  `;
}

function renderExamEditor(target) {
  const view = state.examView;
  const draft = view.draft;
  const config = draft.config;

  const questions = draft.questions.map((question, qIndex) => {
    const isChoice = isMultipleChoice(question);
    const options = !isChoice ? '' : question.options.map((option, oIndex) => `
      <li class="exam-statement-edit">
        <div class="exam-statement-row">
          <input type="text" value="${escapeHtml(option.text)}" placeholder="Opción ${examChoiceLetter(oIndex)}"
            aria-label="Pregunta ${qIndex + 1}, opción ${examChoiceLetter(oIndex)}" data-q="${qIndex}" data-o="${oIndex}" data-field="option"
            ${examInvalidAttrs(`questions.${qIndex}.options.${oIndex}.text`)} />
          <button type="button" class="vf-btn mc-correct-btn" aria-pressed="${question.correct === oIndex}" data-q="${qIndex}" data-correct="${oIndex}"
            aria-label="Marcar la opción ${examChoiceLetter(oIndex)} como correcta">${question.correct === oIndex ? '✓ Correcta' : 'Correcta'}</button>
          <button type="button" class="ghost-btn icon-btn exam-icon-btn" data-q="${qIndex}" data-o-remove="${oIndex}"
            aria-label="Quitar opción ${examChoiceLetter(oIndex)}" ${question.options.length <= 2 ? 'disabled' : ''}>✕</button>
        </div>
        <div class="math-preview inline" ${option.text.includes('$') ? '' : 'hidden'}>${renderMathText(option.text)}</div>
        ${examFieldError(`questions.${qIndex}.options.${oIndex}.text`)}
      </li>
    `).join('');
    const statements = isChoice ? '' : question.statements.map((statement, sIndex) => `
      <li class="exam-statement-edit">
        <div class="exam-statement-row">
          <input type="text" value="${escapeHtml(statement.text).replace(/"/g, '&quot;')}" placeholder="Afirmación ${sIndex + 1}"
            aria-label="Pregunta ${qIndex + 1}, afirmación ${sIndex + 1}" data-q="${qIndex}" data-s="${sIndex}" data-field="text"
            ${examInvalidAttrs(`questions.${qIndex}.statements.${sIndex}.text`)} />
          ${vfGroupHtml(`Respuesta correcta de la afirmación ${sIndex + 1}`, statement.answer, `data-q="${qIndex}" data-s="${sIndex}"`)}
          <button type="button" class="ghost-btn icon-btn exam-icon-btn" data-q="${qIndex}" data-s-remove="${sIndex}"
            aria-label="Quitar afirmación ${sIndex + 1}" ${question.statements.length <= 2 ? 'disabled' : ''}>✕</button>
        </div>
        <div class="math-preview inline" data-preview="${qIndex}-${sIndex}" ${statement.text.includes('$') ? '' : 'hidden'}>${renderMathText(statement.text)}</div>
        ${examFieldError(`questions.${qIndex}.statements.${sIndex}.text`)}
      </li>
    `).join('');

    return `
      <li class="exam-q-card">
        <div class="exam-q-head">
          <h4>Pregunta ${qIndex + 1}</h4>
          <button type="button" class="ghost-btn icon-btn exam-icon-btn" data-q-action="up" data-q="${qIndex}" aria-label="Subir pregunta ${qIndex + 1}" ${qIndex === 0 ? 'disabled' : ''}>▲</button>
          <button type="button" class="ghost-btn icon-btn exam-icon-btn" data-q-action="down" data-q="${qIndex}" aria-label="Bajar pregunta ${qIndex + 1}" ${qIndex === draft.questions.length - 1 ? 'disabled' : ''}>▼</button>
          <button type="button" class="ghost-btn icon-btn exam-icon-btn danger-btn" data-q-action="delete" data-q="${qIndex}" aria-label="Eliminar pregunta ${qIndex + 1}"><span class="icon icon-trash"></span></button>
        </div>
        <label class="exam-field">Tipo de pregunta
          <select data-q="${qIndex}" data-field="type">
            <option value="true_false_statements" ${isChoice ? '' : 'selected'}>Afirmaciones verdadero / falso</option>
            <option value="${MULTIPLE_CHOICE}" ${isChoice ? 'selected' : ''}>Opción múltiple (una correcta)</option>
          </select>
        </label>
        <label class="exam-field">Tema (opcional, para el resumen de fortalezas y debilidades)
          <input type="text" list="examTopicList" data-q="${qIndex}" data-field="topic" value="${escapeHtml(question.topic || '').replace(/"/g, '&quot;')}" placeholder="Ej.: Unidad 2 · Aritmética modular" />
        </label>
        <label class="exam-field">Enunciado
          <textarea data-q="${qIndex}" data-field="prompt" rows="3" ${examInvalidAttrs(`questions.${qIndex}.prompt`)}>${escapeHtml(question.prompt)}</textarea>
        </label>
        <div class="math-preview" data-preview="${qIndex}" ${question.prompt ? '' : 'hidden'}>${renderMathText(question.prompt)}</div>
        ${examFieldError(`questions.${qIndex}.prompt`)}
        ${isChoice ? `
        <p class="exam-sublabel">Opciones (marcá la correcta)</p>
        <ol class="exam-statements-edit">${options}</ol>
        ${examFieldError(`questions.${qIndex}.options`)}
        ${examFieldError(`questions.${qIndex}.correct`)}
        <button type="button" class="ghost-btn small-btn exam-add-btn" data-q-action="add-option" data-q="${qIndex}">+ Agregar opción</button>` : `
        <p class="exam-sublabel">Afirmaciones y respuesta correcta</p>
        <ol class="exam-statements-edit">${statements}</ol>
        ${examFieldError(`questions.${qIndex}.statements`)}
        <button type="button" class="ghost-btn small-btn exam-add-btn" data-q-action="add-statement" data-q="${qIndex}">+ Agregar afirmación</button>`}
      </li>
    `;
  }).join('');

  target.innerHTML = `
    <form class="exam-editor" novalidate>
      <div class="section-head unit-list-head"><h3>${draft.id ? 'Editar evaluación' : 'Nueva evaluación'}</h3></div>
      <div class="notice ${view.saveError ? 'error show' : ''}" role="alert">${escapeHtml(view.saveError || '')}</div>

      <fieldset>
        <legend>Datos</legend>
        <label class="exam-field">Título
          <input type="text" data-field="title" value="${escapeHtml(draft.title).replace(/"/g, '&quot;')}" ${examInvalidAttrs('title')} />
        </label>
        ${examFieldError('title')}
        <label class="exam-field">Descripción (opcional)
          <textarea data-field="description" rows="2">${escapeHtml(draft.description || '')}</textarea>
        </label>
        <label class="exam-field">Duración en minutos
          <input type="number" min="1" step="1" inputmode="numeric" placeholder="Sin límite" data-field="durationMinutes" data-number value="${examNumberValue(draft.durationMinutes)}" ${examInvalidAttrs('durationMinutes')} />
        </label>
        ${examFieldError('durationMinutes')}
      </fieldset>

      <fieldset>
        <legend>Corrección</legend>
        <div class="exam-grid">
          <label class="exam-field">Puntaje por pregunta
            <input type="number" min="0" step="0.01" inputmode="decimal" data-field="config.pointsPerQuestion" data-number value="${examNumberValue(config.pointsPerQuestion)}" ${examInvalidAttrs('config.pointsPerQuestion')} />
            ${examFieldError('config.pointsPerQuestion')}
          </label>
          <div class="exam-field">
            <label class="checkbox-row exam-check"><input type="checkbox" data-field="config.fpPenaltyEnabled" ${config.fpPenaltyEnabled ? 'checked' : ''} /> Los falsos positivos restan</label>
            <input type="number" min="0" step="0.01" inputmode="decimal" aria-label="Descuento por falso positivo" data-field="config.fpPenalty" data-number value="${examNumberValue(config.fpPenalty)}" ${config.fpPenaltyEnabled ? '' : 'disabled'} ${examInvalidAttrs('config.fpPenalty')} />
            ${examFieldError('config.fpPenalty')}
          </div>
          <div class="exam-field">
            <label class="checkbox-row exam-check"><input type="checkbox" data-field="config.fnPenaltyEnabled" ${config.fnPenaltyEnabled ? 'checked' : ''} /> Los falsos negativos restan</label>
            <input type="number" min="0" step="0.01" inputmode="decimal" aria-label="Descuento por falso negativo" data-field="config.fnPenalty" data-number value="${examNumberValue(config.fnPenalty)}" ${config.fnPenaltyEnabled ? '' : 'disabled'} ${examInvalidAttrs('config.fnPenalty')} />
            ${examFieldError('config.fnPenalty')}
          </div>
          <label class="exam-field">Aprobación
            <select data-field="config.passMode">
              <option value="percent" ${config.passMode === 'percent' ? 'selected' : ''}>Porcentaje</option>
              <option value="points" ${config.passMode === 'points' ? 'selected' : ''}>Puntaje mínimo</option>
            </select>
          </label>
          <label class="exam-field">${config.passMode === 'points' ? 'Puntaje mínimo para aprobar' : 'Porcentaje mínimo para aprobar'}
            <input type="number" min="0" step="0.01" inputmode="decimal" data-field="config.passValue" data-number value="${examNumberValue(config.passValue)}" ${examInvalidAttrs('config.passValue')} />
            ${examFieldError('config.passValue')}
          </label>
        </div>
        <p class="form-hint">V/F: cada pregunta arranca con su puntaje y cada error lo descuenta. Una afirmación en blanco cuenta como error. Si un tipo de descuento está desactivado, un error de ese tipo deja la pregunta en 0. Opción múltiple: la correcta suma el puntaje y una incorrecta o en blanco vale 0 (los descuentos no se aplican). Para fórmulas escribí LaTeX entre $…$ (o $$…$$ para centrarlas); para un signo pesos común escribí \\$.</p>
      </fieldset>

      <fieldset>
        <legend>Preguntas (${draft.questions.length})</legend>
        ${examFieldError('questions')}
        <datalist id="examTopicList">${[...new Set(draft.questions.map(question => (question.topic || '').trim()).filter(Boolean))].map(topic => `<option value="${escapeHtml(topic).replace(/"/g, '&quot;')}"></option>`).join('')}</datalist>
        <ol class="exam-q-list">${questions}</ol>
        <button type="button" class="ghost-btn exam-add-btn" data-exam-add-question>+ Agregar pregunta</button>
      </fieldset>

      <div class="exam-editor-actions">
        <button type="button" data-exam-save ${view.saving ? 'disabled' : ''}>${view.saving ? 'Guardando…' : 'Guardar evaluación'}</button>
        <button type="button" class="ghost-btn" data-exam-cancel>Cancelar</button>
      </div>
    </form>
  `;

  const firstInvalid = target.querySelector('[aria-invalid="true"]');
  if (firstInvalid && view.focusErrors) {
    state.examView.focusErrors = false;
    firstInvalid.focus();
    firstInvalid.scrollIntoView({ block: 'center' });
  }
}

function setDraftValue(path, value) {
  const draft = state.examView.draft;
  if (path.startsWith('config.')) draft.config[path.slice(7)] = value;
  else draft[path] = value;
  state.examView.dirty = true;
}

function handleExamEditorInput(event) {
  const el = event.target;
  const field = el.dataset.field;
  if (!field) return;
  const draft = state.examView.draft;

  if (el.dataset.q !== undefined) {
    const qIndex = Number(el.dataset.q);
    const question = draft.questions[qIndex];
    if (field === 'type') {
      if ((question.type || 'true_false_statements') === el.value) return;
      draft.questions[qIndex] = convertExamQuestion(question, el.value);
      state.examView.dirty = true;
      renderExamsSection(currentSubject());
      const select = document.querySelector(`#subjectExams [data-q="${qIndex}"][data-field="type"]`);
      if (select) select.focus();
      return;
    }
    if (field === 'option') {
      question.options[Number(el.dataset.o)].text = el.value;
      const preview = el.closest('.exam-statement-edit').querySelector('.math-preview');
      preview.hidden = !el.value.includes('$');
      preview.innerHTML = renderMathText(el.value);
      state.examView.dirty = true;
      return;
    }
    if (field === 'topic') {
      question.topic = el.value;
    } else if (field === 'prompt') {
      question.prompt = el.value;
      const preview = el.closest('.exam-q-card').querySelector(`[data-preview="${el.dataset.q}"]`);
      preview.hidden = !el.value;
      preview.innerHTML = renderMathText(el.value);
    } else {
      question.statements[Number(el.dataset.s)].text = el.value;
      const preview = el.closest('.exam-statement-edit').querySelector('.math-preview');
      preview.hidden = !el.value.includes('$');
      preview.innerHTML = renderMathText(el.value);
    }
    state.examView.dirty = true;
    return;
  }

  if (el.type === 'checkbox') {
    setDraftValue(field, el.checked);
    const amount = el.closest('.exam-field').querySelector('input[type="number"]');
    if (amount) amount.disabled = !el.checked;
    return;
  }
  if (el.dataset.number !== undefined) {
    const raw = el.value.trim().replace(',', '.');
    if (field === 'durationMinutes') setDraftValue(field, raw === '' ? null : Number(raw));
    else setDraftValue(field, raw === '' ? NaN : Number(raw));
    return;
  }
  setDraftValue(field, el.value);
  if (field === 'config.passMode') renderExamsSection(currentSubject());
}

async function handleExamEditorClick(event) {
  const view = state.examView;
  const draft = view.draft;
  const subject = currentSubject();
  const button = event.target.closest('button');
  if (!button || !subject) return;

  if (button.dataset.vf !== undefined) {
    const value = button.dataset.vf === 'true';
    draft.questions[Number(button.dataset.q)].statements[Number(button.dataset.s)].answer = value;
    button.closest('.vf-group').querySelectorAll('.vf-btn').forEach(btn => btn.setAttribute('aria-pressed', String(btn === button)));
    view.dirty = true;
    return;
  }

  const rerenderAndFocus = selector => {
    view.dirty = true;
    renderExamsSection(subject);
    const el = selector ? document.querySelector(`#subjectExams ${selector}`) : null;
    if (el) el.focus();
  };

  if (button.dataset.correct !== undefined) {
    const question = draft.questions[Number(button.dataset.q)];
    question.correct = Number(button.dataset.correct);
    button.closest('.exam-statements-edit').querySelectorAll('[data-correct]').forEach(btn => {
      const isCorrect = Number(btn.dataset.correct) === question.correct;
      btn.setAttribute('aria-pressed', String(isCorrect));
      btn.textContent = isCorrect ? '✓ Correcta' : 'Correcta';
    });
    view.dirty = true;
    return;
  }

  if (button.dataset.oRemove !== undefined) {
    const question = draft.questions[Number(button.dataset.q)];
    const removed = Number(button.dataset.oRemove);
    if (question.options.length > 2) {
      question.options.splice(removed, 1);
      if (question.correct === removed) question.correct = 0;
      else if (question.correct > removed) question.correct -= 1;
    }
    rerenderAndFocus(`[data-q-action="add-option"][data-q="${button.dataset.q}"]`);
    return;
  }

  if (button.dataset.sRemove !== undefined) {
    const question = draft.questions[Number(button.dataset.q)];
    if (question.statements.length > 2) question.statements.splice(Number(button.dataset.sRemove), 1);
    rerenderAndFocus(`[data-q-action="add-statement"][data-q="${button.dataset.q}"]`);
    return;
  }

  if (button.dataset.qAction) {
    const index = Number(button.dataset.q);
    const list = draft.questions;
    const action = button.dataset.qAction;
    if (action === 'add-statement') {
      list[index].statements.push({ text: '', answer: true });
      rerenderAndFocus(`[data-q="${index}"][data-s="${list[index].statements.length - 1}"][data-field="text"]`);
    } else if (action === 'add-option') {
      list[index].options.push({ text: '' });
      rerenderAndFocus(`[data-q="${index}"][data-o="${list[index].options.length - 1}"][data-field="option"]`);
    } else if (action === 'delete') {
      if (!confirm(`¿Eliminar la pregunta ${index + 1}?`)) return;
      list.splice(index, 1);
      rerenderAndFocus('[data-exam-add-question]');
    } else {
      const swap = action === 'up' ? index - 1 : index + 1;
      if (swap < 0 || swap >= list.length) return;
      [list[index], list[swap]] = [list[swap], list[index]];
      rerenderAndFocus(`[data-q-action="${action}"][data-q="${swap}"]`);
    }
    return;
  }

  if (button.hasAttribute('data-exam-add-question')) {
    const last = draft.questions[draft.questions.length - 1];
    draft.questions.push(newExamQuestion(last ? last.type : undefined));
    rerenderAndFocus(`[data-q="${draft.questions.length - 1}"][data-field="prompt"]`);
    return;
  }

  if (button.hasAttribute('data-exam-cancel')) {
    if (view.dirty && !confirm('¿Descartar los cambios de esta evaluación?')) return;
    setExamView({ mode: 'list', examId: null, draft: null });
    return;
  }

  if (button.hasAttribute('data-exam-save')) {
    event.preventDefault();
    const { ok, errors } = validateExamDraft(draft);
    if (!ok) {
      setExamView({ errors, saveError: 'Revisá los campos marcados.', focusErrors: true });
      return;
    }
    setExamView({ errors: {}, saveError: '', saving: true });
    const result = await saveExam(subject, draft);
    if (!result.ok) {
      setExamView({ saving: false, saveError: result.message });
      return;
    }
    setExamView({ mode: 'list', examId: null, draft: null, saving: false });
  }
}

// ---------- Rendir ----------

function startExamAttempt(exam, practice = false) {
  stopExamTimer();
  const now = Date.now();
  const attempt = {
    examId: exam.id,
    practice,
    startedAt: now,
    deadline: exam.durationMinutes && !practice ? now + exam.durationMinutes * 60000 : null,
    answers: Object.fromEntries(exam.questions.map(question => [question.id, isMultipleChoice(question) ? null : question.statements.map(() => null)])),
    timerId: null,
    submitted: false,
    warned: {}
  };
  setExamView({ mode: 'take', examId: exam.id, attempt, result: null });
  if (attempt.deadline) {
    attempt.timerId = setInterval(tickExamTimer, 1000);
    tickExamTimer();
  }
  const section = document.getElementById('subjectExams');
  if (section) section.scrollIntoView({ block: 'start' });
}

function stopExamTimer() {
  const attempt = state.examView && state.examView.attempt;
  if (attempt && attempt.timerId) {
    clearInterval(attempt.timerId);
    attempt.timerId = null;
  }
}

function examAttemptInProgress() {
  const view = state.examView;
  return !!(view && view.mode === 'take' && view.attempt && !view.attempt.submitted);
}

// Recalcula con la hora real (no cuenta ticks), así que funciona igual si la
// pestaña estuvo en segundo plano o hubo un confirm() abierto.
function tickExamTimer() {
  if (!examAttemptInProgress()) return;
  const attempt = state.examView.attempt;
  if (!attempt.deadline) return;
  const remaining = attempt.deadline - Date.now();
  if (remaining <= 0) {
    submitExamAttempt('timeout');
    return;
  }
  const clock = document.getElementById('examTimer');
  if (clock) {
    clock.textContent = formatClock(remaining);
    clock.classList.toggle('low', remaining <= 60000);
  }
  const alert = document.getElementById('examTimerAlert');
  [[300000, 'Quedan 5 minutos.'], [60000, 'Queda 1 minuto.']].forEach(([limit, message]) => {
    if (remaining <= limit && !attempt.warned[limit]) {
      attempt.warned[limit] = true;
      if (alert) alert.textContent = message;
    }
  });
}

function examQuestionAnswered(question, answer) {
  return isMultipleChoice(question) ? answer !== null : answer.every(mark => mark !== null);
}

function examProgressText(exam, attempt) {
  const complete = exam.questions.filter(question => examQuestionAnswered(question, attempt.answers[question.id])).length;
  return `${complete} de ${exam.questions.length} preguntas completas`;
}

// Respuestas sin marcar: afirmaciones V/F en blanco + preguntas de opción
// múltiple sin elegir.
function examBlankCount(exam, answers) {
  return exam.questions.reduce((count, question) => {
    const answer = answers[question.id];
    if (isMultipleChoice(question)) return count + (answer === null ? 1 : 0);
    return count + answer.filter(mark => mark === null).length;
  }, 0);
}

function renderExamAttempt(exam, target) {
  const attempt = state.examView.attempt;
  const questions = exam.questions.map((question, qIndex) => {
    if (isMultipleChoice(question)) {
      const chosen = attempt.answers[question.id];
      const options = question.options.map((option, oIndex) => `
        <li>
          <button type="button" class="mc-option" aria-pressed="${chosen === oIndex}" data-choice-q="${question.id}" data-o="${oIndex}">
            <span class="exam-statement-letter">${examChoiceLetter(oIndex)})</span>
            <span class="exam-statement-text">${renderMathText(option.text)}</span>
          </button>
        </li>
      `).join('');
      return `
        <li class="exam-question">
          <h4>Pregunta ${qIndex + 1}</h4>
          <div class="exam-prompt">${renderMathText(question.prompt)}</div>
          <ol class="mc-options" role="group" aria-label="Opciones de la pregunta ${qIndex + 1}">${options}</ol>
        </li>
      `;
    }
    const statements = question.statements.map((statement, sIndex) => `
      <li class="exam-statement">
        <span class="exam-statement-letter">${String.fromCharCode(97 + sIndex)})</span>
        <div class="exam-statement-text">${renderMathText(statement.text)}</div>
        ${vfGroupHtml(`Pregunta ${qIndex + 1}, afirmación ${String.fromCharCode(97 + sIndex)}`, attempt.answers[question.id][sIndex], `data-mark-q="${question.id}" data-s="${sIndex}"`)}
      </li>
    `).join('');
    return `
      <li class="exam-question">
        <h4>Pregunta ${qIndex + 1}</h4>
        <div class="exam-prompt">${renderMathText(question.prompt)}</div>
        <ol class="exam-statements">${statements}</ol>
      </li>
    `;
  }).join('');

  target.innerHTML = `
    <div class="exam-bar">
      <div class="exam-bar-title"><strong>${escapeHtml(exam.title)}</strong><span id="examProgress">${examProgressText(exam, attempt)}</span>${attempt.practice ? '<span class="exam-mode">Modo práctica · sin límite de tiempo</span>' : ''}</div>
      ${attempt.deadline ? `<span class="exam-timer" id="examTimer" role="timer" aria-label="Tiempo restante">${formatClock(attempt.deadline - Date.now())}</span>` : ''}
      <button type="button" data-exam-submit>Entregar</button>
    </div>
    <p class="visually-hidden" id="examTimerAlert" aria-live="polite"></p>
    <p class="form-hint">${examAttemptHint(exam)}</p>
    <ol class="exam-questions">${questions}</ol>
    <div class="exam-editor-actions"><button type="button" data-exam-submit>Entregar</button></div>
  `;
}

function examAttemptHint(exam) {
  const hasChoice = exam.questions.some(isMultipleChoice);
  const hasTrueFalse = examHasTrueFalse(exam);
  const tf = 'Marcá V o F en cada afirmación; tocá de nuevo para dejarla en blanco (en blanco cuenta como error).';
  const choice = 'Elegí una opción por pregunta; tocala de nuevo para dejarla en blanco. Las incorrectas no restan.';
  return [hasTrueFalse ? tf : '', hasChoice ? choice : ''].filter(Boolean).join(' ');
}

function handleExamAttemptClick(event) {
  const button = event.target.closest('button');
  if (!button) return;
  const subject = currentSubject();
  const view = state.examView;
  const exam = subject && subject.exams.find(item => item.id === view.examId);
  if (!exam) return;

  if (button.dataset.choiceQ !== undefined) {
    const questionId = button.dataset.choiceQ;
    const index = Number(button.dataset.o);
    view.attempt.answers[questionId] = view.attempt.answers[questionId] === index ? null : index;
    const chosen = view.attempt.answers[questionId];
    button.closest('.mc-options').querySelectorAll('.mc-option').forEach(btn => {
      btn.setAttribute('aria-pressed', String(Number(btn.dataset.o) === chosen));
    });
    const progress = document.getElementById('examProgress');
    if (progress) progress.textContent = examProgressText(exam, view.attempt);
    return;
  }

  if (button.dataset.markQ !== undefined) {
    const marks = view.attempt.answers[button.dataset.markQ];
    const index = Number(button.dataset.s);
    const value = button.dataset.vf === 'true';
    marks[index] = marks[index] === value ? null : value;
    button.closest('.vf-group').querySelectorAll('.vf-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', String(marks[index] !== null && (btn.dataset.vf === 'true') === marks[index]));
    });
    const progress = document.getElementById('examProgress');
    if (progress) progress.textContent = examProgressText(exam, view.attempt);
    return;
  }

  if (button.hasAttribute('data-exam-submit')) submitExamAttempt('manual');
}

function submitExamAttempt(reason) {
  if (!examAttemptInProgress()) return;
  const view = state.examView;
  const attempt = view.attempt;
  const subject = currentSubject();
  const exam = subject && subject.exams.find(item => item.id === attempt.examId);
  if (!exam) return;

  if (reason === 'manual') {
    const blanks = examBlankCount(exam, attempt.answers);
    const unit = examHasTrueFalse(exam) ? ['respuesta', 'respuestas'] : ['pregunta', 'preguntas'];
    if (blanks && !confirm(`Te ${blanks === 1 ? `queda 1 ${unit[0]}` : `quedan ${blanks} ${unit[1]}`} sin responder. En blanco no suma puntos. ¿Entregar igual?`)) return;
    if (attempt.submitted) return;
  }

  const now = Date.now();
  const timedOut = attempt.deadline !== null && now >= attempt.deadline;
  attempt.submitted = true;
  stopExamTimer();
  const elapsedMs = timedOut ? attempt.deadline - attempt.startedAt : now - attempt.startedAt;
  const result = { ...scoreExam(exam, attempt.answers), elapsedMs, reason: timedOut ? 'timeout' : 'manual', answers: attempt.answers, practice: !!attempt.practice };
  setExamView({ mode: 'result', result });
  const section = document.getElementById('subjectExams');
  if (section) section.scrollIntoView({ block: 'start' });
}

// Pide confirmación antes de abandonar un intento en curso. Devuelve true si
// se puede seguir navegando.
function confirmLeaveExam() {
  if (!examAttemptInProgress()) return true;
  if (!confirm('Tenés una evaluación en curso. Si salís, se pierden tus respuestas. ¿Salir igual?')) return false;
  stopExamTimer();
  state.examView = { mode: 'list', examId: null };
  return true;
}

// ---------- Resultado ----------

const EXAM_PATTERN_ADVICE = {
  fp: 'La mayoría de tus errores son falsos positivos: marcaste como verdaderas afirmaciones que eran falsas. Antes de marcar V, buscá un contraejemplo o revisá la condición que hace falta para que se cumpla. Recordá que un falso positivo descuenta más que un falso negativo.',
  fn: 'La mayoría de tus errores son falsos negativos: descartaste afirmaciones que eran verdaderas. Revisá las definiciones y propiedades de cada tema para reconocerlas cuando aparecen escritas de otra forma.',
  blanks: 'Muchos de tus errores vienen de respuestas en blanco: no suman puntos (y en V/F cuentan como error). Practicá con tiempo para llegar a responder todo.',
  balanced: 'Tus errores se reparten entre falsos positivos y falsos negativos. Conviene repasar los temas marcados abajo antes que la forma de responder.',
  mc: 'Elegiste opciones incorrectas en varias preguntas. Antes de responder, descartá las opciones que contradicen el material y releé el enunciado: muchas veces la diferencia está en una sola palabra ("siempre", "solo", "no"). Repasá los temas marcados abajo.',
  none: 'No cometiste errores. ¡Excelente!'
};

function renderPerformanceSummary(exam, result) {
  const summary = buildPerformanceSummary(exam, result);
  const topicRow = topic => `
    <li class="perf-topic ${topic.level}">
      <span class="perf-topic-name">${escapeHtml(topic.topic)}</span>
      <span class="perf-topic-score">${formatScore(topic.earned)} de ${formatScore(topic.max)} · ${formatScore(Math.round(topic.percent))} %</span>
    </li>`;
  const group = (title, level, extra) => {
    const topics = summary.topics.filter(topic => topic.level === level);
    if (!topics.length) return '';
    return `
      <section class="perf-group ${level}">
        <h4>${title}</h4>
        <ul class="perf-topics">${topics.map(topicRow).join('')}</ul>
        ${extra || ''}
      </section>`;
  };
  const { fp, fn, wrong, blanks } = summary.errors;
  const errorParts = [
    fp || fn ? `${fp} ${fp === 1 ? 'falso positivo' : 'falsos positivos'} y ${fn} ${fn === 1 ? 'falso negativo' : 'falsos negativos'}` : '',
    wrong ? `${wrong} ${wrong === 1 ? 'pregunta de opción múltiple sin acertar' : 'preguntas de opción múltiple sin acertar'}` : ''
  ].filter(Boolean);
  const errorsLine = summary.errors.total
    ? `Errores: ${errorParts.join('; ')}${blanks ? ` (${blanks} en blanco)` : ''}.`
    : '';

  return `
    <section class="perf-summary" aria-labelledby="perfSummaryTitle">
      <h3 id="perfSummaryTitle" class="exam-review-title">Resumen de tu desempeño</h3>
      ${summary.topics.length ? `
        <div class="perf-groups">
          ${group('Qué tendrías que mejorar', 'weak', '<p class="form-hint">Repasá el material de estos temas en "Contenido del curso" y volvé a intentar.</p>')}
          ${group('A reforzar', 'mid')}
          ${group('Tus fortalezas', 'strong')}
        </div>` : ''}
      <div class="perf-pattern">
        <p>${EXAM_PATTERN_ADVICE[summary.pattern]}</p>
        ${errorsLine ? `<p class="form-hint">${errorsLine}</p>` : ''}
      </div>
    </section>
  `;
}

function examQuestionCalc(scored, config) {
  if (scored.choice) return formatScore(scored.score);
  if (scored.voided) return '0 (un error de un tipo sin descuento anula la pregunta)';
  const base = formatScore(config.pointsPerQuestion);
  if (!scored.fp && !scored.fn) return base;
  const term = (count, amount) => (count === 1 ? ` − ${formatScore(amount)}` : ` − ${count} × ${formatScore(amount)}`);
  let calc = base;
  if (scored.fp) calc += term(scored.fp, config.fpPenalty);
  if (scored.fn) calc += term(scored.fn, config.fnPenalty);
  return `${calc} = ${formatScore(scored.score)}`;
}

function renderExamResult(exam, target) {
  const result = state.examView.result;
  const config = exam.config;
  const vf = value => (value === null ? 'En blanco' : value ? 'V' : 'F');
  const outcomeLabel = statement => {
    if (statement.outcome === 'ok') return '<span class="exam-outcome ok"><span class="icon icon-check-circle"></span> Acierto</span>';
    const label = statement.outcome === 'fp' ? 'Falso positivo' : 'Falso negativo';
    return `<span class="exam-outcome bad"><span class="icon icon-alert-triangle"></span> ${label}${statement.blank ? ' (en blanco)' : ''}</span>`;
  };

  const choiceOutcome = {
    ok: '<span class="exam-outcome ok"><span class="icon icon-check-circle"></span> Correcta</span>',
    wrong: '<span class="exam-outcome bad"><span class="icon icon-alert-triangle"></span> Incorrecta</span>',
    blank: '<span class="exam-outcome bad"><span class="icon icon-alert-triangle"></span> En blanco</span>'
  };

  const questions = exam.questions.map((question, qIndex) => {
    const scored = result.questions[qIndex];
    if (scored.choice) {
      const { marked, correct, outcome } = scored.choice;
      const options = question.options.map((option, oIndex) => {
        const tags = [
          oIndex === marked ? '<span>Tu respuesta</span>' : '',
          oIndex === correct ? '<strong>Correcta</strong>' : ''
        ].filter(Boolean).join(' · ');
        const mark = oIndex === correct ? 'ok' : oIndex === marked ? 'wrong' : '';
        return `
          <li class="exam-statement result mc-result ${mark}">
            <span class="exam-statement-letter">${examChoiceLetter(oIndex)})</span>
            <div class="exam-statement-text">${renderMathText(option.text)}</div>
            ${tags ? `<div class="exam-statement-check">${tags}</div>` : ''}
          </li>
        `;
      }).join('');
      return `
        <li class="exam-question">
          <div class="exam-q-head"><h4>Pregunta ${qIndex + 1}</h4><span class="exam-q-score">${examQuestionCalc(scored, config)}</span>${choiceOutcome[outcome]}</div>
          <div class="exam-prompt">${renderMathText(question.prompt)}</div>
          <ol class="exam-statements">${options}</ol>
        </li>
      `;
    }
    const statements = question.statements.map((statement, sIndex) => {
      const s = scored.statements[sIndex];
      return `
        <li class="exam-statement result ${s.outcome}">
          <span class="exam-statement-letter">${String.fromCharCode(97 + sIndex)})</span>
          <div class="exam-statement-text">${renderMathText(statement.text)}</div>
          <div class="exam-statement-check">
            <span>Marcaste: <strong>${vf(s.marked)}</strong></span>
            <span>Correcta: <strong>${vf(s.answer)}</strong></span>
            ${outcomeLabel(s)}
          </div>
        </li>
      `;
    }).join('');
    return `
      <li class="exam-question">
        <div class="exam-q-head"><h4>Pregunta ${qIndex + 1}</h4><span class="exam-q-score ${scored.score < 0 ? 'negative' : ''}">${examQuestionCalc(scored, config)}</span></div>
        <div class="exam-prompt">${renderMathText(question.prompt)}</div>
        <ol class="exam-statements">${statements}</ol>
      </li>
    `;
  }).join('');

  target.innerHTML = `
    <div class="exam-result-summary">
      <span class="content-item-meta">${escapeHtml(exam.title)}</span>
      <p class="exam-score"><strong>${formatScore(result.total)}</strong> de ${formatScore(result.max)}</p>
      <div class="materia-chips">
        <span class="subject-status-badge ${result.passed ? 'status-aprobada' : 'status-no-cursable'}">${result.passed ? 'Aprobado' : 'No aprobado'}</span>
        <span class="materia-chip">${formatScore(result.percent)} %</span>
        <span class="materia-chip">${examPassLabel(config)}</span>
        <span class="materia-chip">Tiempo usado: ${formatClock(result.elapsedMs)}</span>
        ${result.practice ? '<span class="materia-chip">Modo práctica</span>' : ''}
      </div>
      ${result.reason === 'timeout' ? '<p class="form-hint">Se entregó automáticamente al terminar el tiempo.</p>' : ''}
      <div class="exam-editor-actions">
        <button type="button" data-exam-retry>Volver a intentar</button>
        ${currentSubject() && currentSubject().exams.filter(item => item.questions.length).length > 1 ? '<button type="button" class="ghost-btn" data-exam-another>Otra evaluación</button>' : ''}
        <button type="button" class="ghost-btn" data-exam-back>Volver a evaluaciones</button>
      </div>
    </div>
    ${renderPerformanceSummary(exam, result)}
    <h3 class="exam-review-title">Corrección</h3>
    <ol class="exam-questions">${questions}</ol>
  `;
}

// ---------- Eventos (delegados, se registran una sola vez) ----------

function setupExamEvents() {
  const target = document.getElementById('subjectExams');
  if (!target || target.dataset.bound) return;
  target.dataset.bound = 'true';

  target.addEventListener('input', event => {
    if (state.examView.mode === 'edit') handleExamEditorInput(event);
  });
  target.addEventListener('change', event => {
    if (state.examView.mode === 'edit' && (event.target.type === 'checkbox' || event.target.tagName === 'SELECT')) handleExamEditorInput(event);
  });
  target.addEventListener('submit', event => event.preventDefault());

  target.addEventListener('click', async event => {
    const subject = currentSubject();
    if (!subject) return;
    const mode = state.examView.mode;
    if (mode === 'edit') {
      handleExamEditorClick(event);
      return;
    }
    if (mode === 'take') {
      handleExamAttemptClick(event);
      return;
    }

    const button = event.target.closest('button');
    if (!button) return;
    const findExam = id => subject.exams.find(item => item.id === id);

    if (button.hasAttribute('data-exam-retry')) startExamAttempt(findExam(state.examView.examId), !!(state.examView.result && state.examView.result.practice));
    else if (button.hasAttribute('data-exam-random')) startRandomExam(subject, false);
    else if (button.hasAttribute('data-exam-random-practice')) startRandomExam(subject, true);
    else if (button.hasAttribute('data-exam-another')) startRandomExam(subject, !!(state.examView.result && state.examView.result.practice));
    else if (button.dataset.examPractice && isAdminView()) startExamAttempt(findExam(button.dataset.examPractice), true);
    else if (button.hasAttribute('data-exam-back')) setExamView({ mode: 'list', examId: null, result: null });
    else if (button.dataset.examStart && isAdminView()) startExamAttempt(findExam(button.dataset.examStart));
    else if (button.hasAttribute('data-exam-new') && isAdminView()) openExamEditor(null);
    else if (button.dataset.examEdit && isAdminView()) openExamEditor(findExam(button.dataset.examEdit));
    else if (button.dataset.examDelete) {
      state.confirmDeleteExamId = button.dataset.examDelete;
      renderExamsSection(subject);
    } else if (button.hasAttribute('data-exam-delete-cancel')) {
      state.confirmDeleteExamId = null;
      renderExamsSection(subject);
    } else if (button.dataset.examDeleteConfirm) {
      const examId = button.dataset.examDeleteConfirm;
      button.disabled = true;
      const result = await deleteExam(subject, examId);
      state.confirmDeleteExamId = null;
      if (state.examView.examId === examId) state.examView = { mode: 'list', examId: null };
      renderExamsSection(subject);
      if (!result.ok) {
        const notice = document.getElementById('examListNotice');
        if (notice) {
          notice.textContent = result.message;
          notice.classList.add('error', 'show');
        }
      }
    }
  });

  // Salir del portal o recargar con un intento en curso.
  window.addEventListener('beforeunload', event => {
    if (!examAttemptInProgress()) return;
    event.preventDefault();
    event.returnValue = '';
  });
  document.addEventListener('visibilitychange', tickExamTimer);

  // Navegación del sidebar global con un intento en curso.
  document.addEventListener('click', event => {
    if (!event.target.closest('.sidebar .nav-link, #sidebarLogoutBtn, #sidebarUserProfileBtn')) return;
    if (!confirmLeaveExam()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
}

// Calendario, foro general y contenido de materias viven todos en Supabase.
// Esta herramienta (panel Admin → Datos locales) sirve para dos cosas:
// 1) hacer un backup en JSON de todo lo que hay cargado, y
// 2) migrar a Supabase un backup viejo de cuando esto todavía se guardaba en
//    localStorage del navegador.
// Ojo con el import: no chequea duplicados (importar el mismo archivo dos
// veces duplica todo), y como el JSON viejo solo guardaba el NOMBRE del autor
// (no su id), las publicaciones/opiniones/encuestas importadas quedan
// atribuidas a la cuenta del admin que hace la importación (se conserva el
// nombre original solo como texto). Los votos de encuestas viejas tampoco se
// migran, porque antes se guardaban por email y no hay forma confiable de
// mapear eso a una cuenta real.
function buildSubjectContentSnapshot() {
  const map = {};
  state.data.subjects.forEach(subject => {
    map[subject.id] = {
      units: subject.units,
      forum: subject.forum,
      opinions: subject.opinions,
      polls: subject.polls
    };
  });
  return map;
}

function exportLocalData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    version: PORTAL_DATA_VERSION,
    calendar: state.data.calendar,
    forum: state.data.forum,
    subjectContent: buildSubjectContentSnapshot()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `iupfa-datos-locales-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

// Borra todo lo que puede haberse cargado a mano o por importación: calendario,
// foro general y, por cascada de foreign keys, unidades/contenido/foro/opiniones/
// encuestas de cada materia. Las materias en sí y el progreso de los alumnos NO
// se tocan.
async function clearAllImportableData() {
  if (!supabaseClient) throw new Error('No hay sesión con Supabase.');
  const tables = ['calendar_events', 'forum_posts', 'subject_units', 'subject_forum_posts', 'subject_opinions', 'subject_polls'];
  for (const table of tables) {
    const { error } = await supabaseClient.from(table).delete().not('id', 'is', null);
    if (error) throw error;
  }
}

function importLocalData(file, onDone, options) {
  const clearFirst = !!(options && options.clearFirst);
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const payload = JSON.parse(reader.result);
      if (!supabaseClient || !state.currentUser) throw new Error('No hay sesión con Supabase para importar.');
      const importerId = state.currentUser.id;

      if (clearFirst) await clearAllImportableData();

      if (payload.calendar && payload.calendar.length) {
        const rows = payload.calendar.map(event => ({
          title: event.title,
          date: event.date,
          type: event.type,
          end_date: event.endDate || null,
          start_time: event.startTime || null,
          end_time: event.endTime || null,
          created_by: importerId
        }));
        const { error } = await supabaseClient.from('calendar_events').insert(rows);
        if (error) throw error;
      }

      if (payload.forum && payload.forum.length) {
        const rows = payload.forum.map(post => ({
          title: post.title,
          content: post.content,
          author_id: importerId,
          author_name: post.author || 'Desconocido'
        }));
        const { error } = await supabaseClient.from('forum_posts').insert(rows);
        if (error) throw error;
      }

      if (payload.subjectContent) {
        for (const subjectId of Object.keys(payload.subjectContent)) {
          const saved = payload.subjectContent[subjectId];
          if (!saved || !state.data.subjects.some(s => s.id === subjectId)) continue;

          for (const unit of (saved.units || [])) {
            const { data: unitRow, error: unitError } = await supabaseClient
              .from('subject_units').insert({ subject_id: subjectId, title: unit.title }).select().single();
            if (unitError) throw unitError;

            for (const item of (unit.items || [])) {
              if (item.type === 'pdf') {
                let url = item.url;
                let storagePath = item.storagePath || null;
                if (!url && item.dataUrl) {
                  const path = `${subjectId}/${generateLocalId('pdf')}_${sanitizeStorageFilename(item.fileName || item.title)}`;
                  const { error: uploadError } = await supabaseClient.storage
                    .from('subject-content').upload(path, dataUrlToBlob(item.dataUrl));
                  if (uploadError) throw uploadError;
                  url = supabaseClient.storage.from('subject-content').getPublicUrl(path).data.publicUrl;
                  storagePath = path;
                }
                if (!url) continue;
                const { error: itemError } = await supabaseClient.from('subject_content_items').insert({
                  unit_id: unitRow.id, subject_id: subjectId, type: 'pdf', title: item.title,
                  file_name: item.fileName || null, url, storage_path: storagePath, uploaded_by: item.uploadedBy || null
                });
                if (itemError) throw itemError;
              } else {
                const { error: itemError } = await supabaseClient.from('subject_content_items').insert({
                  unit_id: unitRow.id, subject_id: subjectId, type: 'clase', title: item.title,
                  body: item.body || '', uploaded_by: item.uploadedBy || null
                });
                if (itemError) throw itemError;
              }
            }
          }

          if ((saved.forum || []).length) {
            const rows = saved.forum.map(post => ({
              subject_id: subjectId, author_id: importerId, author_name: post.author || 'Desconocido', content: post.content
            }));
            const { error } = await supabaseClient.from('subject_forum_posts').insert(rows);
            if (error) throw error;
          }

          if ((saved.opinions || []).length) {
            const rows = saved.opinions.map(opinion => ({
              subject_id: subjectId, author_id: importerId, author_name: opinion.author || 'Desconocido',
              professor: opinion.professor, rating: opinion.rating, content: opinion.content || ''
            }));
            const { error } = await supabaseClient.from('subject_opinions').insert(rows);
            if (error) throw error;
          }

          for (const poll of (saved.polls || [])) {
            const { data: pollRow, error: pollError } = await supabaseClient
              .from('subject_polls')
              .insert({ subject_id: subjectId, created_by_id: importerId, created_by_name: poll.createdBy || 'Desconocido', question: poll.question })
              .select().single();
            if (pollError) throw pollError;

            const options = (poll.options || []).map((option, index) => ({ poll_id: pollRow.id, label: option.label, position: index }));
            if (options.length) {
              const { error: optionsError } = await supabaseClient.from('subject_poll_options').insert(options);
              if (optionsError) throw optionsError;
            }
          }
        }
      }

      onDone(null);
    } catch (error) {
      onDone(error);
    }
  };
  reader.onerror = () => onDone(reader.error);
  reader.readAsText(file);
}

function createItemCard(title, subtitle, content) {
  return `<article class="item-card"><strong>${title}</strong>${content ? `<p>${content}</p>` : ''}<span>${subtitle}</span></article>`;
}

function renderList(targetId, items, mapper) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = items.length ? items.map(mapper).join('') : createItemCard('Sin datos', 'No hay información cargada.', '');
}

function groupSubjects() {
  return state.data.subjects.reduce((acc, subject) => {
    if (!acc[subject.year]) acc[subject.year] = [];
    acc[subject.year].push(subject);
    return acc;
  }, {});
}

// Botón "Materias" del sidebar: abre el último año visto (o el primero); el
// año se cambia desde las pestañas de la vista.
function renderYears() {
  const button = document.getElementById('materiasNavBtn');
  if (!button || button.dataset.bound) return;
  button.dataset.bound = 'true';
  button.addEventListener('click', () => {
    const years = Object.keys(groupSubjects()).sort((a, b) => Number(a) - Number(b));
    openYear(years.includes(state.currentYear) ? state.currentYear : (years[0] || '1'));
  });
}

// Indicador rápido de correlativas de una tarjeta: un punto por correlativa
// (verde si ya está aprobada o a rendir final) + el conteo en texto. Al pasar
// el mouse (o con foco de teclado en la tarjeta) muestra el detalle de cada una.
function correlativeIndicator(subject) {
  if (!subject.correlatives.length) {
    return '<span class="correl-indicator none"><span class="icon icon-check-circle"></span> Sin correlativas</span>';
  }
  const email = state.currentUser ? state.currentUser.email : null;
  const deps = subject.correlatives.map(id => {
    const dependency = state.data.subjects.find(item => item.id === id);
    const depStatus = email ? getSubjectProgress(email, id).status : '';
    const met = depStatus === 'Aprobada' || depStatus === 'A rendir final';
    return {
      code: dependency ? dependency.code : id.replace(/^mat/, ''),
      name: dependency ? dependency.name : 'Materia',
      met,
      label: depStatus === 'Aprobada' || depStatus === 'A rendir final' ? depStatus : 'No aprobada'
    };
  });
  const metFlags = deps.map(dep => dep.met);
  const metCount = metFlags.filter(Boolean).length;
  const total = metFlags.length;
  const dots = metFlags.map(met => `<span class="correl-dot ${met ? 'met' : ''}"></span>`).join('');
  const label = total === 1
    ? (metCount ? '1 correlativa cumplida' : '1 correlativa pendiente')
    : `${metCount} de ${total} correlativas cumplidas`;
  const rows = deps.map(dep => `
    <span class="correl-row ${dep.met ? 'met' : ''}">
      <span class="correl-dot ${dep.met ? 'met' : ''}" aria-hidden="true"></span>
      <span class="correl-row-name">#${dep.code} ${dep.name}</span>
      <span class="correl-row-status">${dep.label}</span>
    </span>`).join('');
  return `<span class="correl-indicator has-tip ${metCount === total ? 'all-met' : ''}"><span class="correl-dots" aria-hidden="true">${dots}</span> ${label}<span class="correl-tooltip" role="tooltip" id="correl-tip-${subject.id}"><span class="correl-tooltip-title">Correlativas</span>${rows}</span></span>`;
}

function subjectCardHtml(subject) {
  const status = state.currentUser ? getSubjectProgress(state.currentUser.email, subject.id).status : 'No cursable';
  const statusClass = STATUS_CLASSES[status] || '';
  const modalityIcon = subject.modality === 'Presencial' ? '<span class="icon icon-pin"></span>' : '<span class="icon icon-monitor"></span>';
  return `
    <button type="button" class="subject-card" data-subject-id="${subject.id}" ${subject.correlatives.length ? `aria-describedby="correl-tip-${subject.id}"` : ''}>
      <span class="subject-card-top">
        <span class="subject-code">#${subject.code}</span>
        <span class="subject-status-badge ${statusClass}">${status}</span>
      </span>
      <strong class="subject-card-name">${subject.name}</strong>
      <span class="subject-card-meta">
        <span><span class="icon icon-calendar"></span> ${subject.semester}° cuatrimestre</span>
        <span><span class="icon icon-clock"></span> ${subject.hours}</span>
        <span>${modalityIcon} ${subject.modality}</span>
      </span>
      ${correlativeIndicator(subject)}
    </button>
  `;
}

function renderYearTabs(grouped, activeYear) {
  const tabs = document.getElementById('yearTabs');
  if (!tabs) return;
  tabs.innerHTML = Object.keys(grouped).sort((a, b) => Number(a) - Number(b)).map(year => {
    const isActive = year === activeYear;
    return `<button type="button" class="subject-tab ${isActive ? 'active' : ''}" role="tab" aria-selected="${isActive}" data-year-tab="${year}">${year}° año <span class="tab-count">${grouped[year].length}</span></button>`;
  }).join('');
  tabs.querySelectorAll('[data-year-tab]').forEach(button => {
    button.addEventListener('click', () => openYear(button.dataset.yearTab));
  });
  const activeTab = tabs.querySelector('.subject-tab.active');
  if (activeTab) tabs.scrollLeft = Math.max(0, activeTab.offsetLeft - 16);
}

function openYear(year) {
  year = String(year);
  state.currentYear = year;
  if (state.currentUser) enforceCorrelativityAndPersist(state.currentUser.email);

  const grouped = groupSubjects();
  const subjects = (grouped[year] || []).slice().sort((a, b) => Number(a.code) - Number(b.code));

  renderYearTabs(grouped, year);

  const target = document.getElementById('subjectsGrid');
  if (target) {
    const terms = [...new Set(subjects.map(subject => subject.semester))].sort((a, b) => Number(a) - Number(b));
    target.innerHTML = subjects.length
      ? terms.map(term => {
          const termSubjects = subjects.filter(subject => subject.semester === term);
          return `
            <details class="term-group" open>
              <summary><span class="term-title">${term}° cuatrimestre</span><span class="tab-count">${termSubjects.length}</span><span class="term-arrow" aria-hidden="true">▾</span></summary>
              <div class="subjects-grid">${termSubjects.map(subjectCardHtml).join('')}</div>
            </details>
          `;
        }).join('')
      : createItemCard('Sin materias', 'Todavía no hay materias cargadas para este año.', '');

    target.querySelectorAll('.subject-card').forEach(card => {
      card.addEventListener('click', () => openSubject(card.dataset.subjectId));
    });
  }

  document.querySelectorAll('.year-btn').forEach(btn => btn.classList.add('active'));
  document.querySelectorAll('.nav-link[data-view]').forEach(link => link.classList.remove('active'));
  setView('materias');
}

function pad2(value) {
  return String(value).padStart(2, '0');
}

function toISODate(year, month, day) {
  return `${year}-${pad2(month + 1)}-${pad2(day)}`;
}

function eventCoversDate(event, iso) {
  const end = event.endDate || event.date;
  return iso >= event.date && iso <= end;
}

function isHolidayDate(iso) {
  return state.data.calendar.some(event => event.type === 'Feriado' && eventCoversDate(event, iso));
}

// Convierte un link de "compartir" de Google Drive (view/open) a su URL de
// preview embebible, para que el video se vea adentro de la página en vez de
// redirigir a Drive. Si no reconoce el formato, deja la URL tal cual (por si
// ya es un link de preview u otro host embebible).
function driveEmbedUrl(rawUrl) {
  const trimmed = (rawUrl || '').trim();
  const match = trimmed.match(/[-\w]{25,}/);
  if (!match) return trimmed;
  return `https://drive.google.com/file/d/${match[0]}/preview`;
}

function zoomLinkFor(code) {
  const trimmed = (code || '').trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://zoom.us/j/${encodeURIComponent(trimmed.replace(/\s+/g, ''))}`;
}

// Aula solo aplica a clases presenciales, código de clase (link de Zoom) solo a
// virtuales — se muestra uno u otro según la modalidad real del evento/ocurrencia.
function buildRoomOrCodeBadge(item) {
  if (item.modality === 'Presencial' && item.room) {
    return `<span class="event-room-badge"><span class="icon icon-pin"></span> ${escapeHtml(item.room)}</span>`;
  }
  if (item.modality === 'Virtual' && item.classCode) {
    return `<a class="event-room-badge event-zoom-link" href="${zoomLinkFor(item.classCode)}" target="_blank" rel="noopener"><span class="icon icon-link"></span> ${escapeHtml(item.classCode)}</a>`;
  }
  return '';
}

function addDaysISO(iso, delta) {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + delta);
  return toISODate(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSemesterDay(iso) {
  return state.data.calendar.some(event => event.type === 'Cuatrimestre' && eventCoversDate(event, iso));
}

function getCurrentSemesterEvent() {
  const todayISO = toISODate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const semesters = state.data.calendar.filter(event => event.type === 'Cuatrimestre');
  if (!semesters.length) return null;
  return semesters.find(event => eventCoversDate(event, todayISO))
    || semesters.slice().sort((a, b) => b.date.localeCompare(a.date))[0];
}

function daysBetweenISO(isoA, isoB) {
  const [ya, ma, da] = isoA.split('-').map(Number);
  const [yb, mb, db] = isoB.split('-').map(Number);
  const dateA = new Date(ya, ma - 1, da);
  const dateB = new Date(yb, mb - 1, db);
  return Math.round((dateA - dateB) / 86400000);
}

function sortEventsForDisplay(events) {
  const isSemester = event => event.type === 'Cuatrimestre';
  const current = getCurrentSemesterEvent();
  const isCurrent = event => current && event.id === current.id;
  const todayISO = toISODate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const byProximityToToday = (a, b) => Math.abs(daysBetweenISO(a.date, todayISO)) - Math.abs(daysBetweenISO(b.date, todayISO));
  const others = events.filter(event => !isSemester(event) && !isCurrent(event)).slice().sort(byProximityToToday);
  const otherSemesters = events.filter(event => isSemester(event) && !isCurrent(event)).slice().sort(byProximityToToday);
  const ordered = [...others, ...otherSemesters];
  const currentInList = events.find(event => isCurrent(event));
  if (currentInList) ordered.push(currentInList);
  return ordered;
}

function formatEventSchedule(event) {
  const hasRange = event.endDate && event.endDate !== event.date;
  const dateLabel = hasRange ? `${event.date} al ${event.endDate}` : event.date;
  let timeLabel = '';
  if (event.startTime && event.endTime) {
    timeLabel = ` · ${event.startTime} a ${event.endTime}`;
  } else if (event.startTime) {
    timeLabel = ` · desde las ${event.startTime}`;
  } else if (event.endTime) {
    timeLabel = ` · hasta las ${event.endTime}`;
  }
  return `${dateLabel}${timeLabel} · ${event.type}`;
}

const CALENDAR_GRID_SLOTS = 42; // 6 filas x 7 días: altura fija sin importar el mes

function renderCalendarMonth() {
  const grid = document.getElementById('calendarGrid');
  const label = document.getElementById('calendarMonthLabel');
  if (!grid || !label) return;

  const { year, month, selectedDate } = state.calendarView;
  label.textContent = `${MONTH_NAMES[month]} ${year}`;

  const todayISO = toISODate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const firstWeekday = new Date(year, month, 1).getDay();
  const startOffset = firstWeekday === 0 ? 6 : firstWeekday - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  grid.innerHTML = '';

  // Franja de fondo del cuatrimestre: sigue exactamente los días que
  // pertenecen al cuatrimestre (no todo el ancho de la semana). Se dibuja una
  // pieza por fila, y las esquinas que tocan una pieza en la fila de
  // arriba/abajo se dejan cuadradas para que todo se vea como una sola forma
  // continua en vez de rectángulos sueltos.
  const semesterFlags = new Array(CALENDAR_GRID_SLOTS).fill(false);
  for (let day = 1; day <= daysInMonth; day += 1) {
    semesterFlags[startOffset + day - 1] = isSemesterDay(toISODate(year, month, day));
  }
  const isSemesterSlot = (row, col) => {
    if (row < 0 || row > 5 || col < 0 || col > 6) return false;
    return semesterFlags[row * 7 + col];
  };
  for (let row = 0; row < 6; row += 1) {
    let col = 0;
    while (col < 7) {
      if (!isSemesterSlot(row, col)) { col += 1; continue; }
      let colEnd = col;
      while (colEnd < 6 && isSemesterSlot(row, colEnd + 1)) colEnd += 1;
      const el = document.createElement('div');
      el.className = 'semester-band';
      el.style.gridRow = String(row + 1);
      el.style.gridColumn = `${col + 1} / ${colEnd + 2}`;
      if (isSemesterSlot(row - 1, col)) el.style.borderTopLeftRadius = '0';
      if (isSemesterSlot(row - 1, colEnd)) el.style.borderTopRightRadius = '0';
      if (isSemesterSlot(row + 1, col)) el.style.borderBottomLeftRadius = '0';
      if (isSemesterSlot(row + 1, colEnd)) el.style.borderBottomRightRadius = '0';
      grid.appendChild(el);
      col = colEnd + 1;
    }
  }

  for (let slot = 0; slot < CALENDAR_GRID_SLOTS; slot += 1) {
    const row = Math.floor(slot / 7);
    const col = slot % 7;
    const day = slot - startOffset + 1;
    if (day < 1 || day > daysInMonth) {
      const empty = document.createElement('span');
      empty.className = 'calendar-cell empty';
      empty.style.gridRow = String(row + 1);
      empty.style.gridColumn = String(col + 1);
      grid.appendChild(empty);
      continue;
    }
    const iso = toISODate(year, month, day);
    const dayEvents = state.data.calendar.filter(event => eventCoversDate(event, iso));
    const dotEvents = dayEvents.filter(event => event.type !== 'Cuatrimestre');
    const isHoliday = dayEvents.some(event => event.type === 'Feriado');
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'calendar-cell';
    cell.style.gridRow = String(row + 1);
    cell.style.gridColumn = String(col + 1);
    if (isHoliday) cell.classList.add('holiday');
    if (iso === todayISO) cell.classList.add('today');
    if (iso === selectedDate) cell.classList.add('selected');
    const dots = dotEvents.map(event => `<i class="event-dot" style="background:${EVENT_TYPE_COLORS[event.type] || 'var(--primary)'}"></i>`).join('');
    cell.innerHTML = `<span>${day}</span>${dots ? `<span class="event-dots">${dots}</span>` : ''}`;
    cell.addEventListener('click', () => {
      state.calendarView.selectedDate = state.calendarView.selectedDate === iso ? null : iso;
      state.calendarView.holidaysListOpen = false;
      const toggleBtn = document.getElementById('toggleHolidaysBtn');
      if (toggleBtn) toggleBtn.classList.remove('active-toggle');
      renderCalendarMonth();
      renderCalendarList();
    });
    grid.appendChild(cell);
  }
}

const CALENDAR_EVENT_TYPES = ['Académico', 'Examen', 'Inscripción', 'Feriado', 'Entrega', 'Cuatrimestre', 'Clase'];
const EVENT_TYPE_COLORS = {
  'Académico': '#0d6efd',
  'Examen': '#dc2626',
  'Inscripción': '#7c3aed',
  'Feriado': '#ea580c',
  'Entrega': '#f59e0b',
  'Cuatrimestre': '#38bdf8',
  'Clase': '#059669'
};

function populateCalendarSubjectSelect(select, selectedId) {
  if (!select) return;
  const options = state.data.subjects
    .slice()
    .sort((a, b) => Number(a.code) - Number(b.code))
    .map(subject => `<option value="${subject.id}" ${selectedId === subject.id ? 'selected' : ''}>${subject.code} · ${subject.name}</option>`)
    .join('');
  select.innerHTML = `<option value="">Sin materia</option>${options}`;
}

function buildCalendarCard(item) {
  if (state.editingCalendarId === item.id) {
    return `<form class="item-card inline-edit-form" data-calendar-edit-form="${item.id}">
      <input type="text" name="title" value="${item.title}" required />
      <div class="two-cols">
        <input type="date" name="date" value="${item.date}" required />
        <select name="type">
          ${CALENDAR_EVENT_TYPES.map(type => `<option value="${type}" ${item.type === type ? 'selected' : ''}>${type}</option>`).join('')}
        </select>
      </div>
      <select name="subjectId" class="calendar-edit-subject-select"></select>
      <select name="modality">
        <option value="" ${!item.modality ? 'selected' : ''}>Sin modalidad</option>
        <option value="Presencial" ${item.modality === 'Presencial' ? 'selected' : ''}>Presencial</option>
        <option value="Virtual" ${item.modality === 'Virtual' ? 'selected' : ''}>Virtual</option>
      </select>
      <label class="checkbox-row small"><input type="checkbox" class="room-toggle" ${item.room ? 'checked' : ''} /> Aula (clase presencial)</label>
      <input type="text" name="room" value="${item.room || ''}" placeholder="Aula" class="${item.room ? '' : 'hidden'}" />
      <label class="checkbox-row small"><input type="checkbox" class="code-toggle" ${item.classCode ? 'checked' : ''} /> Código de clase (link de Zoom, clase virtual)</label>
      <input type="text" name="classCode" value="${item.classCode || ''}" placeholder="Código o link de Zoom" class="${item.classCode ? '' : 'hidden'}" />
      <label class="field-label">Fecha fin<input type="date" name="endDate" value="${item.endDate || ''}" /></label>
      <div class="two-cols">
        <label class="field-label">Hora inicio<input type="time" name="startTime" value="${item.startTime || ''}" /></label>
        <label class="field-label">Hora fin<input type="time" name="endTime" value="${item.endTime || ''}" /></label>
      </div>
      ${item.seriesId ? `<p class="form-hint">Es parte de una serie de clases recurrentes. <button type="button" class="ghost-btn small-btn danger-btn" data-calendar-delete-series="${item.seriesId}">Borrar toda la serie</button></p>` : ''}
      <div class="stack-row">
        <button type="submit" class="small-btn">Guardar</button>
        <button type="button" class="ghost-btn small-btn" data-calendar-cancel="${item.id}">Cancelar</button>
      </div>
    </form>`;
  }
  const adminControls = isAdminView() ? `<div class="stack-row">
      <button type="button" class="ghost-btn small-btn" data-calendar-edit="${item.id}">Editar</button>
      <button type="button" class="ghost-btn small-btn danger-btn" data-calendar-delete="${item.id}">Eliminar</button>
    </div>` : '';
  const color = EVENT_TYPE_COLORS[item.type] || 'var(--primary)';
  const current = getCurrentSemesterEvent();
  const stickyClass = current && item.id === current.id ? ' calendar-sticky-current' : '';
  const subject = item.subjectId ? state.data.subjects.find(entry => entry.id === item.subjectId) : null;
  const subjectBadge = subject ? `<span class="event-subject-badge">${subject.code} · ${subject.name}</span>` : '';
  const modalityBadge = item.modality ? `<span class="event-modality-badge ${item.modality === 'Presencial' ? 'presencial' : 'virtual'}">${item.modality}</span>` : '';
  const roomBadge = buildRoomOrCodeBadge(item);
  const isHoliday = item.type !== 'Feriado' && item.type !== 'Cuatrimestre' && isHolidayDate(item.date);
  const holidayBadge = isHoliday ? '<span class="event-holiday-badge"><span class="icon icon-alert-triangle"></span> Feriado: no hay clase</span>' : '';
  return `<article class="item-card${stickyClass}"><strong>${item.title}</strong><span><i class="event-dot" style="background:${color}"></i>${formatEventSchedule(item)}</span>${subjectBadge}${modalityBadge}${roomBadge}${holidayBadge}${adminControls}</article>`;
}

// Resume cada serie de clases recurrentes en una sola card (materia, día de la
// semana, horario y si esta semana toca presencial o virtual) en vez de listar
// cada fecha individual — eso solo se ve al clickear un día puntual del calendario.
const WEEKDAY_LABELS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function summarizeRecurringClasses(classEvents) {
  const todayISO = toISODate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const groups = {};
  classEvents.forEach(event => {
    const key = event.seriesId || `${event.subjectId}_${event.startTime}_${event.endTime}`;
    (groups[key] = groups[key] || []).push(event);
  });

  return Object.values(groups).map(occurrences => {
    occurrences.sort((a, b) => a.date.localeCompare(b.date));
    const current = occurrences.find(entry => entry.date >= todayISO) || occurrences[occurrences.length - 1];
    const [y, m, d] = current.date.split('-').map(Number);
    return { ...current, weekdayLabel: WEEKDAY_LABELS[new Date(y, m - 1, d).getDay()] };
  });
}

function buildRecurringClassSummaryCard(item) {
  const subject = item.subjectId ? state.data.subjects.find(entry => entry.id === item.subjectId) : null;
  const name = subject ? subject.name : item.title;
  const timeLabel = item.startTime && item.endTime ? `${item.startTime} a ${item.endTime}` : (item.startTime || '');
  if (item.seriesId && state.editingClassSeriesId === item.seriesId) {
    return `<form class="item-card inline-edit-form" data-class-series-edit-form="${item.seriesId}">
      <strong>${name}</strong>
      <span>${item.weekdayLabel} · ${timeLabel} · Clase</span>
      <p class="form-hint">Se aplica a toda la serie: se usa el Aula en las ocurrencias presenciales y el Código de clase en las virtuales.</p>
      <label class="checkbox-row small"><input type="checkbox" class="room-toggle" ${item.room ? 'checked' : ''} /> Aula (clase presencial)</label>
      <input type="text" name="room" value="${item.room || ''}" placeholder="Aula" class="${item.room ? '' : 'hidden'}" />
      <label class="checkbox-row small"><input type="checkbox" class="code-toggle" ${item.classCode ? 'checked' : ''} /> Código de clase (link de Zoom, clase virtual)</label>
      <input type="text" name="classCode" value="${item.classCode || ''}" placeholder="Código o link de Zoom" class="${item.classCode ? '' : 'hidden'}" />
      <p class="form-hint">Recalcular patrón (opcional): borra las fechas que caigan en feriado y reordena Presencial/Virtual desde la fecha ancla, sin "pisar" turnos por los feriados. Dejá los 3 campos vacíos para no tocar el patrón.</p>
      <div class="two-cols">
        <label class="field-label">Presenciales seguidas<input type="number" name="presencialCount" min="0" placeholder="ej. 1" /></label>
        <label class="field-label">Virtuales seguidas<input type="number" name="virtualCount" min="0" placeholder="ej. 2" /></label>
      </div>
      <label class="field-label">Fecha de la primera clase (ancla del patrón, esa fecha = primer turno)<input type="date" name="anchorDate" /></label>
      <div class="stack-row">
        <button type="submit" class="small-btn">Guardar</button>
        <button type="button" class="ghost-btn small-btn" data-class-series-cancel="${item.seriesId}">Cancelar</button>
        <button type="button" class="ghost-btn small-btn danger-btn" data-calendar-delete-series="${item.seriesId}">Borrar serie</button>
      </div>
    </form>`;
  }
  const modalityBadge = item.modality ? `<span class="event-modality-badge ${item.modality === 'Presencial' ? 'presencial' : 'virtual'}">${item.modality} esta semana</span>` : '';
  const roomBadge = buildRoomOrCodeBadge(item);
  const isHoliday = isHolidayDate(item.date);
  const holidayBadge = isHoliday ? '<span class="event-holiday-badge"><span class="icon icon-alert-triangle"></span> Feriado: no hay clase</span>' : '';
  const adminControls = (isAdminView() && item.seriesId) ? `<div class="stack-row">
      <button type="button" class="ghost-btn small-btn" data-class-series-edit="${item.seriesId}">Editar</button>
      <button type="button" class="ghost-btn small-btn danger-btn" data-calendar-delete-series="${item.seriesId}">Borrar serie</button>
    </div>` : '';
  return `<article class="item-card"><strong>${name}</strong><span><i class="event-dot" style="background:${EVENT_TYPE_COLORS.Clase}"></i>${item.weekdayLabel} · ${timeLabel} · Clase</span>${modalityBadge}${roomBadge}${holidayBadge}${adminControls}</article>`;
}

// "Calendario académico" agrupa todo lo que no es una clase puntual (las
// clases tienen su propio panel, ver más abajo). El feriado no forma parte de
// este conjunto fijo porque solo se lista bajo demanda (botón "Ver feriados").
const ACADEMIC_CALENDAR_TYPES = ['Cuatrimestre', 'Inscripción', 'Entrega', 'Examen', 'Académico'];

function renderCalendarList() {
  const { selectedDate, holidaysListOpen } = state.calendarView;
  const academicTarget = document.getElementById('calendarFull');
  const clasesTarget = document.getElementById('calendarClasesList');
  if (!academicTarget && !clasesTarget) return;

  let academicHtml;
  if (holidaysListOpen) {
    // Todos los feriados cargados, del más reciente al más antiguo.
    const holidays = state.data.calendar
      .filter(event => event.type === 'Feriado')
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    academicHtml = holidays.map(buildCalendarCard).join('');
  } else if (selectedDate) {
    // Un día puntual: los eventos académicos (y el feriado si lo hay) de ese día.
    const events = state.data.calendar.filter(event => eventCoversDate(event, selectedDate) && event.type !== 'Clase');
    academicHtml = sortEventsForDisplay(events).map(buildCalendarCard).join('');
  } else {
    const events = state.data.calendar.filter(event => ACADEMIC_CALENDAR_TYPES.includes(event.type));
    academicHtml = sortEventsForDisplay(events).map(buildCalendarCard).join('');
  }
  if (academicTarget) academicTarget.innerHTML = academicHtml || createItemCard('Sin datos', 'No hay información cargada.', '');

  let clasesHtml;
  if (selectedDate) {
    // Las clases del día seleccionado se ven una por una (no como resumen de serie).
    const events = state.data.calendar.filter(event => eventCoversDate(event, selectedDate) && event.type === 'Clase');
    clasesHtml = sortEventsForDisplay(events).map(buildCalendarCard).join('');
  } else {
    // Vista general: las clases se resumen por serie (serían decenas una por una).
    const classEvents = state.data.calendar.filter(event => event.type === 'Clase');
    const summaries = summarizeRecurringClasses(classEvents)
      .sort((a, b) => a.date.localeCompare(b.date));
    clasesHtml = summaries.map(buildRecurringClassSummaryCard).join('');
  }
  if (clasesTarget) clasesTarget.innerHTML = clasesHtml || createItemCard('Sin clases', 'No hay clases cargadas.', '');

  if (state.editingCalendarId) {
    const editingItem = state.data.calendar.find(item => item.id === state.editingCalendarId);
    const select = (academicTarget && academicTarget.querySelector('.calendar-edit-subject-select'))
      || (clasesTarget && clasesTarget.querySelector('.calendar-edit-subject-select'));
    if (editingItem && select) populateCalendarSubjectSelect(select, editingItem.subjectId);
  }
}

function changeCalendarMonth(delta) {
  let { year, month } = state.calendarView;
  month += delta;
  if (month < 0) { month = 11; year -= 1; }
  if (month > 11) { month = 0; year += 1; }
  state.calendarView.year = year;
  state.calendarView.month = month;
  state.calendarView.selectedDate = null;
  renderCalendarMonth();
  renderCalendarList();
}

function renderCalendarViews() {
  const mapper = item => createItemCard(item.title, `<i class="event-dot" style="background:${EVENT_TYPE_COLORS[item.type] || 'var(--primary)'}"></i>${formatEventSchedule(item)}`, '');
  const sorted = sortEventsForDisplay(state.data.calendar);
  renderList('calendarPreview', sorted.slice(0, 3), mapper);
  renderList('adminCalendarList', sorted, mapper);
  renderCalendarMonth();
  renderCalendarList();
}

function buildForumCard(item) {
  if (state.editingForumId === item.id) {
    return `<form class="item-card inline-edit-form" data-forum-edit-form="${item.id}">
      <input type="text" name="title" value="${item.title}" required />
      <textarea name="content" required>${item.content}</textarea>
      <div class="stack-row">
        <button type="submit" class="small-btn">Guardar</button>
        <button type="button" class="ghost-btn small-btn" data-forum-cancel="${item.id}">Cancelar</button>
      </div>
    </form>`;
  }
  const adminControls = isAdminView() ? `<div class="stack-row">
      <button type="button" class="ghost-btn small-btn" data-forum-edit="${item.id}">Editar</button>
      <button type="button" class="ghost-btn small-btn danger-btn" data-forum-delete="${item.id}">Eliminar</button>
    </div>` : '';
  return `<article class="item-card"><strong>${item.title}</strong>${item.content ? `<p>${item.content}</p>` : ''}<span>${item.author}</span>${adminControls}</article>`;
}

function renderForumList() {
  const target = document.getElementById('forumList');
  if (!target) return;
  target.innerHTML = state.data.forum.length ? state.data.forum.map(buildForumCard).join('') : createItemCard('Sin datos', 'No hay información cargada.', '');
}

function renderForumViews() {
  const mapper = item => createItemCard(item.title, item.author, item.content);
  renderList('forumPreview', state.data.forum.slice(0, 3), mapper);
  renderForumList();
}

function renderHomeStats() {
  const cursables = document.getElementById('statCursables');
  const cursando = document.getElementById('statCursando');
  const aprobadas = document.getElementById('statAprobadas');
  if (!state.currentUser) return;

  const email = state.currentUser.email;
  const statuses = state.data.subjects.map(subject => getSubjectProgress(email, subject.id).status);
  if (cursables) cursables.textContent = statuses.filter(status => status === 'Cursable').length;
  if (cursando) cursando.textContent = statuses.filter(status => status === 'Cursando').length;
  if (aprobadas) aprobadas.textContent = statuses.filter(status => status === 'Aprobada').length;
}

// Deduce si el cuatrimestre activo (evento de calendario tipo "Cuatrimestre" que
// cubre la fecha de hoy) es el 1° o el 2°, leyendo el título del evento. Se espera
// que el admin lo titule de forma clara ("1er Cuatrimestre 2026", "2do Cuatrimestre
// 2026", etc.) — si no hay evento activo, devuelve null y no se bloquea nada por
// cuatrimestre (para no romper la planificación si todavía no cargaron el calendario).
function getCurrentSemesterNumber() {
  const event = getCurrentSemesterEvent();
  if (!event || !event.title) return null;
  const title = event.title.toLowerCase();
  if (/primer|1er|1ero|1°/.test(title)) return '1';
  if (/segundo|2do|2ndo|2°/.test(title)) return '2';
  const digitMatch = title.match(/[12](?!\d{3})/);
  return digitMatch ? digitMatch[0] : null;
}

// Una materia solo se puede empezar a cursar durante el cuatrimestre en el que
// se dicta (las de "1er cuatrimestre" solo se habilitan en 1er cuatrimestre, etc).
// Si no hay forma de saber qué cuatrimestre es (sin evento en el calendario), no
// se bloquea nada.
function isEnrollmentWindowOpenFor(subject) {
  if (subject.anySemester) return true;
  const currentSemester = getCurrentSemesterNumber();
  if (!currentSemester) return true;
  return String(subject.semester) === currentSemester;
}

const STATUS_OPTIONS = ['Cursable', 'No cursable', 'Cursando', 'Aprobada', 'A rendir final'];
const GRADE_FIELDS = ['tp1', 'tp2', 'tp3', 'parcial', 'final', 'notaFinal'];
const GRADE_LABELS = { tp1: 'TP1', tp2: 'TP2', tp3: 'TP3', parcial: 'Parcial', final: 'Final', notaFinal: 'Nota final' };
const STATUS_CLASSES = {
  'Cursable': 'status-cursable',
  'No cursable': 'status-no-cursable',
  'Cursando': 'status-cursando',
  'Aprobada': 'status-aprobada',
  'A rendir final': 'status-a-rendir-final'
};

function correlativesMet(subject, email) {
  return subject.correlatives.every(id => {
    const dependency = state.data.subjects.find(item => item.id === id);
    if (!dependency) return false;
    const depStatus = getSubjectProgress(email, dependency.id).status;
    return depStatus === 'Aprobada' || depStatus === 'A rendir final';
  });
}

function enforceCorrelativity(email) {
  if (!email) return [];
  const changedIds = new Set();
  let changed = true;
  let guard = 0;
  while (changed && guard <= state.data.subjects.length) {
    changed = false;
    state.data.subjects.forEach(subject => {
      const met = correlativesMet(subject, email) && isEnrollmentWindowOpenFor(subject);
      const progress = getSubjectProgress(email, subject.id);
      // Solo alternamos entre Cursable/No cursable: nunca tocamos una materia
      // que ya está Cursando, Aprobada o A rendir final (aunque el cuatrimestre
      // activo haya cambiado desde que se anotó).
      if (!met && progress.status === 'Cursable') {
        progress.status = 'No cursable';
        changed = true;
        changedIds.add(subject.id);
      } else if (met && progress.status === 'No cursable') {
        progress.status = 'Cursable';
        changed = true;
        changedIds.add(subject.id);
      }
    });
    guard += 1;
  }
  return [...changedIds];
}

function enforceCorrelativityAndPersist(email) {
  const changed = enforceCorrelativity(email);
  changed.forEach(id => persistProgress(id));
  return changed;
}

// Los primeros 5 códigos (Informática I, Aspectos Constitucionales, Elementos
// del Derecho Penal, Redes de Área Local y Teleinformática) son con los que la
// facultad anota automáticamente a todo alumno que ingresa, en su 1er cuatrimestre.
const ROADMAP_FOUNDATION_CODES = [1, 2, 3, 4, 8];

// Arma el roadmap completo de la carrera: arranca siempre con el cuatrimestre
// de ingreso fijo, sigue con lo que el alumno ya está cursando o puede empezar
// a cursar, y de ahí en más simula cuatrimestre a cuatrimestre (alternando 1°/2°,
// como se dictan realmente las materias) asumiendo que todo lo anterior se aprobó,
// respetando correlativas y los topes que ingresó (materias por cuatrimestre y
// máximo de presenciales), sin importar si hoy realmente se podría anotar o no.
function computeRoadmap(email, maxSubjects, maxPresenciales) {
  const subjects = state.data.subjects;
  const statusOf = subject => getSubjectProgress(email, subject.id).status;

  const foundation = ROADMAP_FOUNDATION_CODES
    .map(code => subjects.find(subject => Number(subject.code) === code))
    .filter(Boolean);

  const scheduled = new Set(foundation.map(subject => subject.id));
  const virtualApproved = new Set(foundation.map(subject => subject.id));

  subjects.forEach(subject => {
    const status = statusOf(subject);
    if (status === 'Aprobada' || status === 'A rendir final') {
      scheduled.add(subject.id);
      virtualApproved.add(subject.id);
    }
  });

  let pendingCursando = subjects.filter(subject => statusOf(subject) === 'Cursando' && !scheduled.has(subject.id));
  pendingCursando.forEach(subject => scheduled.add(subject.id));

  const pending = new Map(subjects.filter(subject => !scheduled.has(subject.id)).map(subject => [subject.id, subject]));

  const plan = [{ term: 1, subjects: foundation, fixed: true }];

  let term = 2;
  let guard = 0;

  while ((pendingCursando.length || pending.size) && guard < 80) {
    guard += 1;
    const parity = term % 2 === 0 ? '2' : '1';

    const selected = pendingCursando;
    let presencialCount = selected.filter(subject => subject.modality === 'Presencial').length;

    const eligible = [...pending.values()]
      .filter(subject => subject.anySemester || String(subject.semester) === parity)
      .filter(subject => subject.correlatives.every(id => virtualApproved.has(id)))
      .sort((a, b) => Number(a.code) - Number(b.code));

    eligible.forEach(subject => {
      if (selected.length >= maxSubjects) return;
      if (subject.modality === 'Presencial') {
        if (presencialCount >= maxPresenciales) return;
        presencialCount += 1;
      }
      selected.push(subject);
    });

    selected.forEach(subject => {
      pending.delete(subject.id);
      virtualApproved.add(subject.id);
    });

    if (selected.length) plan.push({ term, subjects: selected });

    pendingCursando = [];
    term += 1;
  }

  if (pending.size) {
    plan.push({ term, blocked: true, remaining: [...pending.values()] });
  }

  return plan;
}

function renderRoadmapResult(plan) {
  const target = document.getElementById('roadmapResult');
  if (!target) return;

  target.innerHTML = plan.map(step => {
    if (step.blocked) {
      const names = step.remaining.map(subject => `${subject.code} · ${subject.name}`).join(', ');
      return createItemCard(
        'No se puede seguir con estos límites',
        'Subí el máximo de materias o de presenciales por cuatrimestre para poder ubicar el resto.',
        `Quedan sin ubicar: ${names}`
      );
    }
    const presenciales = step.subjects.filter(subject => subject.modality === 'Presencial').length;
    const items = step.subjects.map(subject => `${subject.code} · ${subject.name} (${subject.modality})`).join('<br>');
    const title = step.fixed ? `Cuatrimestre ${step.term} (ingreso)` : `Cuatrimestre ${step.term}`;
    const subtitle = step.fixed
      ? 'Materias con las que se anota automáticamente todo alumno que ingresa'
      : `${step.subjects.length} materia${step.subjects.length === 1 ? '' : 's'} · ${presenciales} presencial${presenciales === 1 ? '' : 'es'}`;
    return createItemCard(title, subtitle, items);
  }).join('');
}

function correlativeCodes(subject) {
  if (!subject.correlatives.length) return 'Sin correlativas';
  return subject.correlatives
    .map(id => (state.data.subjects.find(item => item.id === id) || {}).code || id)
    .join(', ');
}

function renderPlanningTable() {
  const target = document.getElementById('planningTable');
  if (!target || !state.currentUser) return;

  const email = state.currentUser.email;
  enforceCorrelativityAndPersist(email);

  const query = (state.planningSearch || '').trim().toLowerCase();
  const visibleSubjects = state.data.subjects
    .slice()
    .sort((a, b) => Number(a.code) - Number(b.code))
    .filter(subject => {
      if (state.planningYearFilter !== 'all' && String(subject.year) !== state.planningYearFilter) return false;
      const status = getSubjectProgress(email, subject.id).status;
      if (state.planningStatusFilter !== 'all' && status !== state.planningStatusFilter) return false;
      if (!query) return true;
      return [subject.code, subject.name, subject.modality, status, subject.hours]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });

  let rows = '';
  let cards = '';

  visibleSubjects.forEach(subject => {
    const progress = getSubjectProgress(email, subject.id);
    const correlMet = correlativesMet(subject, email);
    // Si ya está Cursando/Aprobada/A rendir final no la volvemos a bloquear por
    // cuatrimestre (eso solo aplica para decidir si puede empezar a cursarla ahora).
    const alreadyCommitted = progress.status === 'Cursando' || progress.status === 'Aprobada' || progress.status === 'A rendir final';
    const windowOpen = alreadyCommitted || isEnrollmentWindowOpenFor(subject);
    const met = correlMet && windowOpen;
    const availableStatusOptions = met ? STATUS_OPTIONS.filter(option => option !== 'No cursable') : ['No cursable'];
    const lockedHint = correlMet && !windowOpen
      ? `Correlativas cumplidas, pero esta materia se dicta en otro cuatrimestre.`
      : '';

    const statusOptions = availableStatusOptions
      .map(option => `<option value="${option}" ${progress.status === option ? 'selected' : ''}>${option}</option>`)
      .join('');
    const statusClass = STATUS_CLASSES[progress.status] || '';
    const gradesLocked = progress.status === 'No cursable';

    const gradeCells = GRADE_FIELDS.map(field =>
      `<td><input class="table-input" type="text" maxlength="2" data-field="${field}" value="${progress.grades[field]}" ${gradesLocked ? 'disabled' : ''} /></td>`
    ).join('');

    rows += `
      <tr data-subject-id="${subject.id}" class="${statusClass}">
        <td>${subject.code}</td>
        <td>${subject.name}</td>
        <td>${subject.hours}</td>
        <td>${subject.modality}</td>
        <td>${correlativeCodes(subject)}</td>
        <td><select class="table-select status-select" data-field="status" ${met ? '' : 'disabled'}>${statusOptions}</select></td>
        <td>${subject.libre} · ${subject.examFinal}</td>
        ${gradeCells}
      </tr>
    `;

    const gradeInputs = GRADE_FIELDS.map(field => `
      <label class="planning-card-grade">
        <span>${GRADE_LABELS[field]}</span>
        <input class="table-input" type="text" maxlength="2" data-field="${field}" value="${progress.grades[field]}" ${gradesLocked ? 'disabled' : ''} />
      </label>
    `).join('');

    cards += `
      <article class="planning-card ${statusClass}" data-subject-id="${subject.id}">
        <div class="planning-card-head">
          <span class="planning-card-code">#${subject.code}</span>
          <strong class="planning-card-name">${subject.name}</strong>
        </div>
        <select class="table-select status-select" data-field="status" ${met ? '' : 'disabled'} ${lockedHint ? `title="${lockedHint}"` : ''}>${statusOptions}</select>
        <div class="planning-card-grades">${gradeInputs}</div>
      </article>
    `;
  });

  if (!visibleSubjects.length) {
    rows = '<tr><td colspan="13" class="table-empty">No se encontraron materias para esa búsqueda.</td></tr>';
    cards = '<p class="table-empty">No se encontraron materias para esa búsqueda.</p>';
  }

  target.innerHTML = `
    <div class="table-scroll planning-table-wrap">
      <table class="admin-table planning-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Asignatura</th>
            <th>Carga horaria</th>
            <th>Modalidad</th>
            <th>Correlatividad</th>
            <th>Estado</th>
            <th>Libre / Sin final</th>
            <th>TP1</th>
            <th>TP2</th>
            <th>TP3</th>
            <th>Parcial</th>
            <th>Final</th>
            <th>Nota final</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="planning-cards">${cards}</div>
  `;

  target.querySelectorAll('select[data-field="status"]').forEach(select => {
    select.addEventListener('change', event => {
      const subjectId = event.target.closest('[data-subject-id]').dataset.subjectId;
      getSubjectProgress(email, subjectId).status = event.target.value;
      persistProgress(subjectId);
      enforceCorrelativityAndPersist(email);
      renderPlanningTable();
      renderHomeStats();
    });
  });

  target.querySelectorAll('.table-input').forEach(input => {
    input.addEventListener('change', event => {
      const subjectId = event.target.closest('[data-subject-id]').dataset.subjectId;
      getSubjectProgress(email, subjectId).grades[event.target.dataset.field] = event.target.value.trim();
      persistProgress(subjectId);
    });
  });
}

// Editor de texto enriquecido para "Clase" (RichTextWrapper estilo TinyMCE).
// Nota: "insertar fórmula matemática" (editor WIRIS/MathType) es un plugin
// pago exclusivo de Moodle y no tiene equivalente gratuito para un sitio
// estático; "insertar símbolos matemáticos" se mapea al mapa de caracteres
// especiales de TinyMCE (incluye símbolos matemáticos entre otros), e
// "insertar objeto web 2.0" se mapea al plugin de medios embebidos (YouTube,
// Vimeo, etc.).
function initClaseEditor() {
  if (typeof window === 'undefined' || !window.tinymce) return;
  if (tinymce.get('contentBodyInput')) return;

  tinymce.init({
    selector: '#contentBodyInput',
    height: 340,
    menubar: false,
    statusbar: false,
    toolbar_mode: 'wrap',
    plugins: 'lists link image charmap preview emoticons media',
    toolbar: 'blocks | bold italic underline strikethrough | forecolor backcolor | bullist numlist | preview | ' +
      'alignleft aligncenter alignright alignjustify | emoticons charmap | link unlink | image media',
    content_style: "body { font-family: Montserrat, Arial, sans-serif; font-size: 15px; }",
    branding: false
  });
}

function getClaseEditorContent() {
  if (typeof window === 'undefined' || !window.tinymce) return null;
  return tinymce.get('contentBodyInput');
}

function parseClaseBody(text) {
  return (text || '')
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      const ytMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
      if (ytMatch) {
        return `<div class="yt-embed"><iframe src="https://www.youtube.com/embed/${ytMatch[1]}" title="Video de YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
      }
      if (trimmed.startsWith('## ')) return `<h4>${trimmed.slice(3)}</h4>`;
      if (trimmed.startsWith('# ')) return `<h3>${trimmed.slice(2)}</h3>`;
      return `<p>${trimmed}</p>`;
    })
    .join('');
}

function dataUrlToBlob(dataUrl) {
  const [header, base64] = dataUrl.split(',');
  const mimeMatch = header.match(/data:(.*?);base64/);
  const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

// Los navegadores bloquean la navegación de una pestaña nueva a una data: URL
// (los PDFs viejos guardados en base64 antes de migrar a Supabase Storage),
// así que ahí convertimos el base64 a un blob: URL, que sí se puede abrir en pestaña.
function openPdfForItem(item) {
  if (item.url) {
    window.open(item.url, '_blank');
    return;
  }
  if (!item.dataUrl) return;
  try {
    const blobUrl = URL.createObjectURL(dataUrlToBlob(item.dataUrl));
    window.open(blobUrl, '_blank');
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
  } catch (error) {
    console.error('No se pudo abrir el PDF viejo, se descarga en su lugar:', error);
    const link = document.createElement('a');
    link.href = item.dataUrl;
    link.download = item.fileName || `${item.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

function formatShortDate(value, withYear = true) {
  if (!value) return '';
  let iso = String(value);
  if (iso.includes('T')) {
    const parsed = new Date(iso);
    if (Number.isNaN(parsed.getTime())) return '';
    iso = `${parsed.getFullYear()}-${pad2(parsed.getMonth() + 1)}-${pad2(parsed.getDate())}`;
  }
  const [year, month, day] = iso.slice(0, 10).split('-');
  if (!year || !month || !day) return '';
  return withYear ? `${day}/${month}/${year}` : `${day}/${month}`;
}

// Materiales de una unidad que se muestran en "Contenido del curso": todo
// menos los videos, que van a "Clases grabadas".
function unitDocuments(unit) {
  return unit.items.filter(item => item.type !== 'video');
}

const RECORDED_TITLE_COLLATOR = new Intl.Collator('es', { numeric: true, sensitivity: 'base' });

// Junta las clases grabadas de una materia: los videos cargados como material
// de una unidad + las de RECORDED_CLASSES, ordenadas por nombre con orden
// natural ("Clase 2" antes que "Clase 10"); a igual nombre, por fecha.
function getRecordedClasses(subject) {
  const fromUnits = subject.units.flatMap(unit => unit.items
    .filter(item => item.type === 'video')
    .map(item => ({ id: item.id, title: item.title, date: item.createdAt || '', duration: '', unit: unit.title, unitId: unit.id, embedUrl: item.body })));
  const manual = (RECORDED_CLASSES[subject.code] || []).map((entry, index) => ({
    id: `rec-${subject.code}-${index}`,
    title: entry.title,
    date: entry.date || '',
    duration: entry.duration || '',
    unit: entry.unit || '',
    embedUrl: driveEmbedUrl(entry.url)
  }));
  return [...fromUnits, ...manual].sort((a, b) =>
    RECORDED_TITLE_COLLATOR.compare(a.title || '', b.title || '')
    || String(a.date).slice(0, 10).localeCompare(String(b.date).slice(0, 10)));
}

const CONTENT_TYPE_INFO = {
  pdf: { icon: 'icon-file-text', label: 'PDF', action: 'Abrir' },
  video: { icon: 'icon-video', label: 'Video', action: 'Ver video' },
  clase: { icon: 'icon-graduation-cap', label: 'Clase', action: 'Ver clase' }
};

function renderContentItemBody(item) {
  const info = CONTENT_TYPE_INFO[item.type] || CONTENT_TYPE_INFO.clase;
  const meta = [info.label, item.uploadedBy ? `Subido por ${item.uploadedBy}` : '', formatShortDate(item.createdAt)].filter(Boolean).join(' · ');
  const pdfSrc = item.url || item.dataUrl;
  const isMobile = window.innerWidth <= 900;
  const downloadLink = `<a class="download-link" href="${pdfSrc}" download="${item.fileName || ''}"><span class="icon icon-download"></span> Descargar</a>`;

  let actions = '';
  let body;
  if (item.type === 'pdf' && isMobile) {
    body = `<div class="pdf-mobile-open">
      <p>En el celular, los PDFs se abren en una pestaña nueva.</p>
      <div class="pdf-toolbar">
        <button type="button" class="download-link primary" data-pdf-open="${item.id}"><span class="icon icon-external-link"></span> Abrir PDF</button>
        ${downloadLink}
      </div>
    </div>`;
  } else if (item.type === 'pdf') {
    actions = `<button type="button" class="download-link primary" data-pdf-expand="${item.id}"><span class="icon icon-maximize"></span> Expandir</button>${downloadLink}`;
    body = `<iframe class="pdf-preview" src="${pdfSrc}" title="${item.title}"></iframe>`;
  } else if (item.type === 'video') {
    body = `<iframe class="video-preview" src="${item.body}" title="${item.title}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  } else {
    body = `<div class="clase-body">${/^\s*</.test(item.body || '') ? item.body : parseClaseBody(item.body)}</div>`;
  }

  return `
    <article class="content-item viewer">
      <header class="viewer-head">
        <div class="viewer-title"><h3>${item.title}</h3><span class="content-item-meta">${meta}</span></div>
        ${actions ? `<div class="viewer-actions">${actions}</div>` : ''}
      </header>
      ${body}
    </article>
  `;
}

function refreshContentUnitSelect(subject) {
  const select = document.getElementById('contentUnitSelect');
  if (!select) return;
  select.innerHTML = subject.units.map(unit => `<option value="${unit.id}">${unit.title}</option>`).join('');
}

// Barra interna de la materia: unidades, clases grabadas y secciones.
function renderSubjectNav(subject) {
  const navTarget = document.getElementById('unitNavList');
  if (!navTarget) return;

  const section = state.subjectSection;
  const recorded = getRecordedClasses(subject);

  // Recordamos qué botón tenía el foco para devolvérselo después de redibujar.
  const focused = navTarget.contains(document.activeElement) ? document.activeElement : null;
  const focusSelector = !focused ? null
    : focused.dataset.navUnit ? `[data-nav-unit="${focused.dataset.navUnit}"]`
    : focused.dataset.navRecorded ? `[data-nav-recorded="${focused.dataset.navRecorded}"]`
    : focused.dataset.navSection ? `[data-nav-section="${focused.dataset.navSection}"]`
    : focused.dataset.navGroup ? `[data-nav-group="${focused.dataset.navGroup}"]`
    : null;

  const current = isActive => (isActive ? 'aria-current="page"' : '');

  const unitLinks = subject.units.length
    ? subject.units.map(unit => {
        const isActive = section === 'contenido' && unit.id === state.currentUnitId;
        return `<li><button type="button" class="snav-sublink ${isActive ? 'active' : ''}" ${current(isActive)} data-nav-unit="${unit.id}"><span class="snav-label">${unit.title}</span><span class="snav-count">${unitDocuments(unit).length}</span></button></li>`;
      }).join('')
    : '<li class="snav-empty">Sin unidades cargadas</li>';

  const recordedLinks = recorded.length
    ? recorded.map(rec => {
        const isActive = section === 'grabadas' && rec.id === state.currentRecordedId;
        return `<li><button type="button" class="snav-sublink ${isActive ? 'active' : ''}" ${current(isActive)} data-nav-recorded="${rec.id}"><span class="snav-label">${rec.title}</span></button></li>`;
      }).join('')
    : '<li class="snav-empty">Sin clases grabadas</li>';

  const group = (id, icon, label, links, isActive) => {
    const isOpen = !!state.navGroupsOpen[id];
    return `
      <div class="snav-group">
        <button type="button" class="snav-link ${isActive ? 'active' : ''} ${section === id ? 'in-section' : ''}" ${current(isActive)} aria-expanded="${isOpen}" data-nav-group="${id}">
          <span class="icon ${icon}"></span><span class="snav-label">${label}</span><span class="snav-arrow" aria-hidden="true">▾</span>
        </button>
        <ul class="snav-sub ${isOpen ? 'open' : ''}">${links}</ul>
      </div>
    `;
  };
  const link = (id, icon, label) => `
    <button type="button" class="snav-link ${section === id ? 'active' : ''}" ${current(section === id)} data-nav-section="${id}">
      <span class="icon ${icon}"></span><span class="snav-label">${label}</span>
    </button>
  `;

  navTarget.innerHTML = [
    group('contenido', 'icon-book-open', 'Contenido del curso', unitLinks, false),
    group('grabadas', 'icon-video', 'Clases grabadas', recordedLinks, section === 'grabadas' && !state.currentRecordedId),
    link('evaluaciones', 'icon-check-circle', 'Evaluaciones'),
    link('resumenes', 'icon-file-text', 'Resúmenes'),
    link('foro', 'icon-chat', 'Foro de la materia'),
    link('opiniones', 'icon-bar-chart', 'Opiniones y encuestas')
  ].join('');

  // Al elegir un destino en celular/tablet se cierra el drawer y se lleva la
  // vista al contenido.
  const goTo = (tab, changes) => {
    if (tab !== 'evaluaciones' && !confirmLeaveExam()) return;
    Object.assign(state, changes);
    const wasDrawerOpen = closeSubjectNavDrawer();
    setSubjectTab(tab);
    if (wasDrawerOpen) {
      const main = document.querySelector('.materia-main');
      if (main) main.scrollIntoView({ block: 'start' });
    }
  };

  navTarget.querySelectorAll('[data-nav-group]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.navGroup;
      const atRecordedList = section === 'grabadas' && !state.currentRecordedId;
      if (id === 'grabadas' && !atRecordedList) {
        state.navGroupsOpen.grabadas = true;
        goTo('grabadas', { currentRecordedId: null });
        return;
      }
      state.navGroupsOpen[id] = !state.navGroupsOpen[id];
      renderSubjectNav(subject);
    });
  });
  navTarget.querySelectorAll('[data-nav-unit]').forEach(button => {
    button.addEventListener('click', () => goTo('contenido', { currentUnitId: button.dataset.navUnit, currentItemId: null }));
  });
  navTarget.querySelectorAll('[data-nav-recorded]').forEach(button => {
    button.addEventListener('click', () => goTo('grabadas', { currentRecordedId: button.dataset.navRecorded }));
  });
  navTarget.querySelectorAll('[data-nav-section]').forEach(button => {
    button.addEventListener('click', () => goTo(button.dataset.navSection, {}));
  });

  if (focusSelector) {
    const next = navTarget.querySelector(focusSelector);
    if (next) next.focus();
  }
}

function renderSubjectContent(subject) {
  const mainTarget = document.getElementById('subjectContent');
  if (!mainTarget) return;

  renderSubjectNav(subject);

  const section = state.subjectSection;
  if (section !== 'contenido' && section !== 'grabadas') return;

  const rerender = () => renderSubjectContent(subject);

  // Un visor ya abierto no se vuelve a dibujar, para no recargar el iframe
  // del PDF o del video cada vez que se toca la barra lateral.
  const showViewer = (key, html) => {
    if (mainTarget.dataset.itemId === key) return false;
    mainTarget.dataset.itemId = key;
    mainTarget.innerHTML = html;
    return true;
  };
  const showList = html => {
    mainTarget.dataset.itemId = '';
    mainTarget.innerHTML = html;
  };

  if (section === 'grabadas') {
    const recorded = getRecordedClasses(subject);
    const metaOf = rec => [formatShortDate(rec.date), rec.duration, rec.unit].filter(Boolean).join(' · ');
    const selected = recorded.find(rec => rec.id === state.currentRecordedId);

    if (selected) {
      const drawn = showViewer(`recorded:${selected.id}`, `
        <button type="button" class="ghost-btn small-btn back-to-unit" data-back-to-list>&larr; Clases grabadas</button>
        <article class="content-item viewer">
          <header class="viewer-head">
            <div class="viewer-title"><h3>${selected.title}</h3><span class="content-item-meta">${metaOf(selected) || 'Clase grabada'}</span></div>
          </header>
          <iframe class="video-preview" src="${selected.embedUrl}" title="${selected.title}" allow="autoplay; fullscreen" allowfullscreen></iframe>
        </article>
      `);
      if (drawn) {
        mainTarget.querySelector('[data-back-to-list]').addEventListener('click', () => {
          state.currentRecordedId = null;
          rerender();
        });
      }
      return;
    }

    const cards = recorded.map(rec => contentCardHtml(rec.id, 'video', rec.title, metaOf(rec) || 'Clase grabada')).join('');
    showList(`
      <div class="section-head unit-list-head"><h3>Clases grabadas</h3><span class="content-item-meta">${recorded.length} ${recorded.length === 1 ? 'clase' : 'clases'}</span></div>
      ${recorded.length
        ? `${CONTENT_MENU_HINT}<ul class="material-list">${cards}</ul>`
        : createItemCard('Sin clases grabadas', 'Todavía no se cargaron grabaciones para esta materia.', '')}
    `);
    return;
  }

  if (!subject.units.length) {
    showList(createItemCard('Sin contenido todavía', 'El equipo docente todavía no cargó unidades para esta materia.', ''));
    return;
  }

  const selectedItem = state.currentItemId
    ? subject.units.flatMap(unit => unit.items).find(item => item.id === state.currentItemId)
    : null;

  if (selectedItem) {
    const parentUnit = subject.units.find(unit => unit.items.some(item => item.id === selectedItem.id));
    const drawn = showViewer(`item:${selectedItem.id}`, `
      <button type="button" class="ghost-btn small-btn back-to-unit" data-back-to-list>&larr; ${parentUnit ? parentUnit.title : 'Materiales'}</button>
      ${renderContentItemBody(selectedItem)}
    `);
    if (drawn) {
      mainTarget.querySelector('[data-back-to-list]').addEventListener('click', () => {
        if (parentUnit) state.currentUnitId = parentUnit.id;
        state.currentItemId = null;
        rerender();
      });
      const openBtn = mainTarget.querySelector('[data-pdf-open]');
      if (openBtn) openBtn.addEventListener('click', () => openPdfForItem(selectedItem));
      const expandBtn = mainTarget.querySelector('[data-pdf-expand]');
      if (expandBtn) expandBtn.addEventListener('click', () => openPdfModal(selectedItem, expandBtn));
    }
    return;
  }

  const openUnit = subject.units.find(unit => unit.id === state.currentUnitId) || null;
  if (!openUnit) {
    showList(createItemCard('Elegí una unidad', 'Abrí una unidad en "Contenido del curso" para ver sus materiales acá.', ''));
    return;
  }

  const admin = isAdminView();
  const documents = unitDocuments(openUnit);
  const cards = documents.map(item => {
    const info = CONTENT_TYPE_INFO[item.type] || CONTENT_TYPE_INFO.clase;
    const meta = [info.label, formatShortDate(item.createdAt), item.uploadedBy ? `Subido por ${item.uploadedBy}` : ''].filter(Boolean).join(' · ');
    return contentCardHtml(item.id, item.type, item.title, meta);
  }).join('');

  const unitDeleteControl = !admin ? ''
    : state.confirmDeleteUnitId === openUnit.id
    ? `<button type="button" class="ghost-btn small-btn danger-btn" data-confirm-delete-unit>Confirmar eliminación</button>
       <button type="button" class="ghost-btn small-btn" data-cancel-delete-unit>Cancelar</button>`
    : `<button type="button" class="ghost-btn small-btn danger-btn" data-delete-unit-trigger><span class="icon icon-trash"></span> Eliminar unidad</button>`;

  showList(`
    <div class="section-head unit-list-head">
      <h3>${openUnit.title}</h3>
      <span class="content-item-meta">${documents.length} ${documents.length === 1 ? 'material' : 'materiales'}</span>
      ${unitDeleteControl ? `<div class="unit-admin-actions">${unitDeleteControl}</div>` : ''}
    </div>
    ${documents.length
      ? `${CONTENT_MENU_HINT}<ul class="material-list">${cards}</ul>`
      : createItemCard('Unidad sin materiales', 'Todavía no se cargó contenido en esta unidad.', '')}
  `);

  const on = (selector, handler) => {
    mainTarget.querySelectorAll(selector).forEach(button => button.addEventListener('click', () => handler(button)));
  };
  on('[data-delete-unit-trigger]', () => {
    state.confirmDeleteUnitId = openUnit.id;
    rerender();
  });
  on('[data-cancel-delete-unit]', () => {
    state.confirmDeleteUnitId = null;
    rerender();
  });
  on('[data-confirm-delete-unit]', () => deleteUnit(subject, openUnit.id));
}

// =========================================================
// Tarjetas de material con menú contextual: clic derecho, mantener apretado
// en el celular, o tecla de menú / Shift+F10 con la tarjeta enfocada. Un clic
// o Enter abre el material.
// =========================================================

const CONTENT_MENU_HINT = '<p class="content-hint">Clic derecho (o mantené apretado) sobre un material para ver más opciones.</p>';

function contentCardHtml(id, type, title, meta) {
  const info = CONTENT_TYPE_INFO[type] || CONTENT_TYPE_INFO.clase;
  return `
    <li class="material-card content-card" tabindex="0" role="button" aria-keyshortcuts="Shift+F10" data-content-id="${id}" title="Clic derecho para más opciones">
      <span class="material-icon type-${type}"><span class="icon ${info.icon}"></span></span>
      <div class="material-info">
        <strong>${title}</strong>
        <span>${meta}</span>
      </div>
    </li>
  `;
}

// Material de una unidad (editable) o clase de RECORDED_CLASSES (solo lectura).
function findContentEntry(subject, id) {
  for (const unit of subject.units) {
    const item = unit.items.find(entry => entry.id === id);
    if (item) return { item, unit, editable: true };
  }
  const rec = getRecordedClasses(subject).find(entry => entry.id === id);
  return rec ? { item: { id: rec.id, type: 'video', title: rec.title, body: rec.embedUrl }, unit: null, editable: false } : null;
}

function driveFileId(url) {
  const match = String(url || '').match(/drive\.google\.com\/.*?([-\w]{25,})/);
  return match ? match[1] : null;
}

function contentDownload(item) {
  if (item.type === 'pdf') {
    const href = item.url || item.dataUrl;
    return href ? { href, fileName: item.fileName || `${item.title}.pdf` } : null;
  }
  const id = item.type === 'video' ? driveFileId(item.body) : null;
  return id ? { href: `https://drive.google.com/uc?export=download&id=${id}`, fileName: '' } : null;
}

function openContentEntry(subject, entry) {
  if (entry.item.type === 'video') {
    state.currentRecordedId = entry.item.id;
    state.navGroupsOpen.grabadas = true;
  } else {
    state.currentItemId = entry.item.id;
  }
  renderSubjectContent(subject);
}

function openContentInNewWindow(item) {
  if (item.type === 'pdf') {
    openPdfForItem(item);
    return;
  }
  if (item.type === 'video') {
    const id = driveFileId(item.body);
    window.open(id ? `https://drive.google.com/file/d/${id}/view` : item.body, '_blank', 'noopener');
    return;
  }
  const body = /^\s*</.test(item.body || '') ? item.body : parseClaseBody(item.body);
  const page = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(item.title)}</title>`
    + '<style>body{font-family:system-ui,sans-serif;max-width:860px;margin:32px auto;padding:0 16px;line-height:1.6;color:#142033}img{max-width:100%;height:auto}</style>'
    + `</head><body><h1>${escapeHtml(item.title)}</h1>${body}</body></html>`;
  const blobUrl = URL.createObjectURL(new Blob([page], { type: 'text/html' }));
  window.open(blobUrl, '_blank');
  setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
}

function downloadContent(download) {
  const link = document.createElement('a');
  link.href = download.href;
  if (download.fileName) link.download = download.fileName;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// Ventana modal chica para cambiar nombre / organizar. onSubmit devuelve un
// mensaje de error (se muestra y la ventana queda abierta) o null.
function openContentDialog({ title, fieldsHtml, submitLabel, onReady, onSubmit }) {
  const dialog = document.createElement('dialog');
  dialog.className = 'content-dialog';
  dialog.innerHTML = `
    <form class="stack">
      <h3>${title}</h3>
      ${fieldsHtml}
      <div class="notice" data-dialog-notice></div>
      <div class="content-dialog-actions">
        <button type="button" class="ghost-btn" data-dialog-cancel>Cancelar</button>
        <button type="submit">${submitLabel}</button>
      </div>
    </form>
  `;
  document.body.appendChild(dialog);
  const form = dialog.querySelector('form');
  const notice = dialog.querySelector('[data-dialog-notice]');
  const submitBtn = form.querySelector('button[type="submit"]');
  dialog.addEventListener('close', () => dialog.remove());
  dialog.querySelector('[data-dialog-cancel]').addEventListener('click', () => dialog.close());
  form.addEventListener('submit', async event => {
    event.preventDefault();
    submitBtn.disabled = true;
    const error = await onSubmit(form);
    submitBtn.disabled = false;
    if (error) {
      notice.className = 'notice show error';
      notice.textContent = error;
      return;
    }
    dialog.close();
  });
  dialog.showModal();
  if (onReady) onReady(form);
}

function promptRenameContent(subject, entry) {
  openContentDialog({
    title: 'Cambiar nombre',
    fieldsHtml: `<div class="field"><input id="contentDialogTitle" name="title" type="text" placeholder=" " required value="${escapeHtml(entry.item.title)}" /><label for="contentDialogTitle">Nombre</label></div>`,
    submitLabel: 'Guardar',
    onReady: form => {
      form.elements.title.focus();
      form.elements.title.select();
    },
    onSubmit: form => {
      const title = form.elements.title.value.trim();
      if (!title) return 'El nombre no puede quedar vacío.';
      return renameContentItem(subject, entry.item.id, title);
    }
  });
}

function promptOrganizeContent(subject, entry) {
  const isVideo = entry.item.type === 'video';
  const unitOptions = subject.units
    .map(unit => `<option value="${unit.id}" ${unit.id === entry.unit.id ? 'selected' : ''}>${escapeHtml(unit.title)}</option>`)
    .join('');
  openContentDialog({
    title: `Organizar "${escapeHtml(entry.item.title)}"`,
    fieldsHtml: `
      <label class="dialog-field">Unidad<select name="unit">${unitOptions}</select></label>
      ${isVideo
        ? '<p class="form-hint">Las clases grabadas se ordenan solas por nombre; acá solo cambia la unidad.</p>'
        : '<label class="dialog-field">Lugar dentro de la unidad<select name="position"></select></label>'}
    `,
    submitLabel: 'Mover',
    onReady: form => {
      form.elements.unit.focus();
      if (isVideo) return;
      const fillPositions = () => {
        const unit = subject.units.find(item => item.id === form.elements.unit.value);
        const others = unitDocuments(unit).filter(doc => doc.id !== entry.item.id);
        const currentIndex = unit.id === entry.unit.id
          ? unitDocuments(unit).findIndex(doc => doc.id === entry.item.id)
          : others.length;
        form.elements.position.innerHTML = Array.from({ length: others.length + 1 }, (_, index) => {
          const label = index === 0 ? 'Al principio' : `Después de "${others[index - 1].title}"`;
          return `<option value="${index}" ${index === currentIndex ? 'selected' : ''}>${index + 1}. ${escapeHtml(label)}</option>`;
        }).join('');
      };
      form.elements.unit.addEventListener('change', fillPositions);
      fillPositions();
    },
    onSubmit: form => organizeContentItem(subject, entry.item.id, form.elements.unit.value, isVideo ? null : Number(form.elements.position.value))
  });
}

let contentMenuState = null;

function closeContentMenu(restoreFocus) {
  if (!contentMenuState) return;
  const { el, card } = contentMenuState;
  contentMenuState = null;
  el.remove();
  if (restoreFocus && card.isConnected) card.focus();
}

function openContentMenu(subject, card, x, y) {
  closeContentMenu(false);
  const entry = findContentEntry(subject, card.dataset.contentId);
  if (!entry) return;
  const { item } = entry;
  const download = contentDownload(item);
  const actions = [
    { label: 'Ver', run: () => openContentEntry(subject, entry) },
    { label: 'Ver en otra ventana', run: () => openContentInNewWindow(item) },
    download && { label: 'Descargar', run: () => downloadContent(download) }
  ];
  if (isAdminView() && entry.editable) {
    actions.push(
      { separator: true },
      { label: 'Cambiar nombre', run: () => promptRenameContent(subject, entry) },
      { label: 'Organizar', run: () => promptOrganizeContent(subject, entry) },
      {
        label: 'Eliminar',
        danger: true,
        run: () => {
          if (window.confirm(`¿Eliminar "${item.title}"? Esta acción no se puede deshacer.`)) deleteContentItem(subject, entry.unit.id, item.id);
        }
      }
    );
  }
  const visible = actions.filter(Boolean);

  const el = document.createElement('div');
  el.className = 'context-menu';
  el.setAttribute('role', 'menu');
  el.setAttribute('aria-label', `Opciones de ${item.title}`);
  el.innerHTML = visible.map((action, index) => action.separator
    ? '<div class="context-menu-sep" role="separator"></div>'
    : `<button type="button" role="menuitem" tabindex="-1" class="context-menu-item ${action.danger ? 'danger' : ''}" data-menu-index="${index}">${action.label}</button>`
  ).join('');
  document.body.appendChild(el);

  const rect = el.getBoundingClientRect();
  el.style.left = `${Math.max(8, Math.min(x, window.innerWidth - rect.width - 8))}px`;
  el.style.top = `${Math.max(8, Math.min(y, window.innerHeight - rect.height - 8))}px`;
  contentMenuState = { el, card };

  const items = [...el.querySelectorAll('[role="menuitem"]')];
  items[0].focus();
  el.addEventListener('click', event => {
    const button = event.target.closest('[data-menu-index]');
    if (!button) return;
    closeContentMenu(true);
    visible[Number(button.dataset.menuIndex)].run();
  });
  el.addEventListener('keydown', event => {
    const index = items.indexOf(document.activeElement);
    const focusAt = next => {
      event.preventDefault();
      items[(next + items.length) % items.length].focus();
    };
    if (event.key === 'ArrowDown') focusAt(index + 1);
    else if (event.key === 'ArrowUp') focusAt(index - 1);
    else if (event.key === 'Home') focusAt(0);
    else if (event.key === 'End') focusAt(items.length - 1);
    else if (event.key === 'Escape') {
      event.preventDefault();
      closeContentMenu(true);
    } else if (event.key === 'Tab') closeContentMenu(false);
  });
}

function setupContentCards() {
  const target = document.getElementById('subjectContent');
  if (!target) return;
  const currentSubjectNow = () => state.data.subjects.find(item => item.id === state.currentSubjectId);
  const cardFrom = event => event.target.closest('.content-card');
  let longPress = null;
  let suppressClick = false;

  target.addEventListener('click', event => {
    const card = cardFrom(event);
    if (!card) return;
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    const subject = currentSubjectNow();
    const entry = subject && findContentEntry(subject, card.dataset.contentId);
    if (entry) openContentEntry(subject, entry);
  });

  target.addEventListener('keydown', event => {
    const card = cardFrom(event);
    if (!card || event.target !== card) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      card.click();
    }
  });

  target.addEventListener('contextmenu', event => {
    const card = cardFrom(event);
    if (!card) return;
    event.preventDefault();
    const subject = currentSubjectNow();
    if (!subject) return;
    // Abierto desde el teclado no hay puntero sobre la tarjeta: se ubica sobre ella.
    const rect = card.getBoundingClientRect();
    const onCard = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    openContentMenu(subject, card, onCard ? event.clientX : rect.left + 16, onCard ? event.clientY : rect.top + rect.height / 2);
  });

  // iOS no dispara "contextmenu" al mantener apretado; Android sí (ahí el
  // timer encuentra el menú ya abierto y no hace nada).
  target.addEventListener('touchstart', event => {
    suppressClick = false;
    const card = cardFrom(event);
    if (!card || event.touches.length !== 1) return;
    const start = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    if (longPress) clearTimeout(longPress.timer);
    longPress = {
      start,
      timer: setTimeout(() => {
        longPress = null;
        suppressClick = true;
        const subject = currentSubjectNow();
        if (subject && !contentMenuState) openContentMenu(subject, card, start.x, start.y);
      }, 550)
    };
  }, { passive: true });
  target.addEventListener('touchmove', event => {
    if (!longPress) return;
    const touch = event.touches[0];
    if (Math.hypot(touch.clientX - longPress.start.x, touch.clientY - longPress.start.y) > 10) {
      clearTimeout(longPress.timer);
      longPress = null;
    }
  }, { passive: true });
  target.addEventListener('touchend', () => {
    if (!longPress) return;
    clearTimeout(longPress.timer);
    longPress = null;
  });

  document.addEventListener('pointerdown', event => {
    if (contentMenuState && !contentMenuState.el.contains(event.target)) closeContentMenu(false);
  }, true);
  document.addEventListener('scroll', () => closeContentMenu(false), true);
  // Solo si cambia el ancho: en el celular la barra de direcciones cambia el
  // alto al aparecer/ocultarse y cerraría el menú recién abierto.
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    closeContentMenu(false);
  });
}

// Visor amplio de PDF (botón "Expandir").
let pdfModalReturnFocus = null;

function openPdfModal(item, trigger) {
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfModalFrame');
  if (!modal || !frame) return;
  const src = item.url || item.dataUrl;
  const download = document.getElementById('pdfModalDownload');
  document.getElementById('pdfModalTitle').textContent = item.title;
  frame.title = item.title;
  frame.src = src;
  if (download) {
    download.href = src;
    download.setAttribute('download', item.fileName || '');
  }
  pdfModalReturnFocus = trigger || null;
  modal.classList.remove('hidden');
  const close = document.getElementById('pdfModalClose');
  if (close) close.focus();
}

function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  if (!modal || modal.classList.contains('hidden')) return false;
  modal.classList.add('hidden');
  document.getElementById('pdfModalFrame').src = 'about:blank';
  if (pdfModalReturnFocus && document.contains(pdfModalReturnFocus)) pdfModalReturnFocus.focus();
  pdfModalReturnFocus = null;
  return true;
}

// Barra interna de la materia: hasta 1024px es un drawer con overlay; en
// escritorio el mismo par de botones la pliega y la vuelve a mostrar.
function isSubjectNavDrawer() {
  return window.matchMedia('(max-width: 1024px)').matches;
}

// Cierra el drawer sin mover el foco. Devuelve true si estaba abierto.
function closeSubjectNavDrawer() {
  const view = document.getElementById('materiaView');
  const toggle = document.getElementById('subjectNavToggle');
  if (!view || !view.classList.contains('subject-nav-open')) return false;
  view.classList.remove('subject-nav-open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  return true;
}

function setupSubjectNav() {
  const view = document.getElementById('materiaView');
  const nav = document.getElementById('subjectNav');
  const toggle = document.getElementById('subjectNavToggle');
  const close = document.getElementById('subjectNavClose');
  const backdrop = document.getElementById('subjectNavBackdrop');
  if (!view || !nav || !toggle) return;

  const show = () => {
    if (isSubjectNavDrawer()) {
      view.classList.add('subject-nav-open');
    } else {
      view.classList.remove('subject-nav-collapsed');
    }
    toggle.setAttribute('aria-expanded', 'true');
    if (close) close.focus();
  };
  const hide = () => {
    if (isSubjectNavDrawer()) {
      closeSubjectNavDrawer();
    } else {
      view.classList.add('subject-nav-collapsed');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.focus();
  };

  toggle.addEventListener('click', show);
  if (close) close.addEventListener('click', hide);
  if (backdrop) backdrop.addEventListener('click', hide);

  // Mientras el drawer está abierto, Tab no sale de él.
  nav.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !view.classList.contains('subject-nav-open')) return;
    const focusable = [...nav.querySelectorAll('button:not([disabled])')].filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (closePdfModal()) return;
    if (view.classList.contains('subject-nav-open')) hide();
  });

  const pdfModal = document.getElementById('pdfModal');
  const pdfModalClose = document.getElementById('pdfModalClose');
  if (pdfModalClose) pdfModalClose.addEventListener('click', closePdfModal);
  if (pdfModal) {
    pdfModal.addEventListener('click', event => {
      if (event.target === pdfModal) closePdfModal();
    });
  }
}

// Cambia el nombre de un material (solo admin). Devuelve un mensaje de error,
// o null si se guardó.
async function renameContentItem(subject, itemId, title) {
  if (!isAdminView()) return 'Solo los admins pueden cambiar el nombre.';
  const item = subject.units.flatMap(unit => unit.items).find(entry => entry.id === itemId);
  if (!item) return 'No se encontró el material.';
  if (supabaseClient) {
    const { error } = await supabaseClient.from('subject_content_items').update({ title }).eq('id', itemId);
    if (error) return 'No se pudo cambiar el nombre: ' + error.message;
  }
  item.title = title;
  renderSubjectLists(subject);
  return null;
}

// Mueve un material a otra unidad y/o a otro lugar entre los documentos de la
// unidad (solo admin). targetIndex es el lugar entre los documentos de la
// unidad destino sin contar al que se mueve. Los videos van al final de la
// unidad: "Clases grabadas" se ordena sola por nombre. Las unidades tocadas
// quedan con posiciones 0..n-1.
async function organizeContentItem(subject, itemId, targetUnitId, targetIndex) {
  if (!isAdminView()) return 'Solo los admins pueden organizar el contenido.';
  const sourceUnit = subject.units.find(unit => unit.items.some(entry => entry.id === itemId));
  const targetUnit = subject.units.find(unit => unit.id === targetUnitId);
  if (!sourceUnit || !targetUnit) return 'No se encontró la unidad.';
  const item = sourceUnit.items.find(entry => entry.id === itemId);

  sourceUnit.items.splice(sourceUnit.items.indexOf(item), 1);
  const before = item.type === 'video' ? null : unitDocuments(targetUnit)[targetIndex];
  targetUnit.items.splice(before ? targetUnit.items.indexOf(before) : targetUnit.items.length, 0, item);

  const changed = [];
  new Set([sourceUnit, targetUnit]).forEach(unit => unit.items.forEach((entry, index) => {
    if (entry.position !== index || entry === item) {
      entry.position = index;
      changed.push(entry);
    }
  }));
  if (item.type !== 'video') state.currentUnitId = targetUnit.id;
  renderSubjectLists(subject);

  if (!supabaseClient) return null;
  const results = await Promise.all(changed.map(entry => supabaseClient
    .from('subject_content_items')
    .update(entry === item ? { position: entry.position, unit_id: targetUnit.id } : { position: entry.position })
    .eq('id', entry.id)));
  const failed = results.find(result => result.error);
  if (!failed) return null;
  console.error('No se pudo guardar el nuevo orden:', failed.error);
  return 'No se pudo guardar el cambio: ' + failed.error.message;
}

async function deleteContentItem(subject, unitId, itemId) {
  if (!isAdminView()) return;
  const unit = subject.units.find(item => item.id === unitId);
  if (!unit) return;
  const index = unit.items.findIndex(item => item.id === itemId);
  if (index === -1) return;

  const [removed] = unit.items.splice(index, 1);
  if (removed.type === 'pdf' && removed.storagePath && supabaseClient) {
    await supabaseClient.storage.from('subject-content').remove([removed.storagePath]);
  }
  if (state.currentItemId === itemId) state.currentItemId = null;
  if (state.currentRecordedId === itemId) state.currentRecordedId = null;
  if (supabaseClient) {
    const { error } = await supabaseClient.from('subject_content_items').delete().eq('id', itemId);
    if (error) console.error('No se pudo borrar el contenido:', error);
  }
  renderSubjectLists(subject);
}

async function deleteUnit(subject, unitId) {
  if (!isAdminView()) return;
  const index = subject.units.findIndex(item => item.id === unitId);
  if (index === -1) return;

  const [removed] = subject.units.splice(index, 1);
  const pdfPaths = removed.items.filter(item => item.type === 'pdf' && item.storagePath).map(item => item.storagePath);
  if (pdfPaths.length && supabaseClient) {
    await supabaseClient.storage.from('subject-content').remove(pdfPaths);
  }
  if (state.currentUnitId === unitId) state.currentUnitId = null;
  if (removed.items.some(item => item.id === state.currentItemId)) state.currentItemId = null;
  state.confirmDeleteUnitId = null;
  if (supabaseClient) {
    // Borra también los items de la unidad por la FK "on delete cascade".
    const { error } = await supabaseClient.from('subject_units').delete().eq('id', unitId);
    if (error) console.error('No se pudo borrar la unidad:', error);
  }
  renderSubjectLists(subject);
  refreshContentUnitSelect(subject);
}

function renderPolls(subject) {
  const target = document.getElementById('subjectPolls');
  if (!target) return;

  if (!subject.polls.length) {
    target.innerHTML = createItemCard('Sin encuestas todavía', 'Sé el primero en crear una encuesta para esta materia.', '');
    return;
  }

  target.innerHTML = subject.polls.map(poll => {
    const totalVotes = poll.options.reduce((sum, option) => sum + option.votes.length, 0);
    const myVoteOptionId = state.currentUser
      ? (poll.options.find(option => option.votes.includes(state.currentUser.id)) || {}).id
      : null;

    const optionsHtml = poll.options.map(option => {
      const pct = totalVotes ? Math.round((option.votes.length / totalVotes) * 100) : 0;
      const selected = option.id === myVoteOptionId;
      return `
        <button type="button" class="poll-option ${selected ? 'selected' : ''}" data-poll-id="${poll.id}" data-option-id="${option.id}">
          <span class="poll-option-fill" style="width:${pct}%"></span>
          <span class="poll-option-label">${option.label}${selected ? ' ✓' : ''}</span>
          <span class="poll-option-pct">${pct}% · ${option.votes.length}</span>
        </button>
      `;
    }).join('');

    return `
      <article class="item-card poll-card">
        <strong>${poll.question}</strong>
        <div class="poll-options">${optionsHtml}</div>
        <span>${totalVotes} voto${totalVotes === 1 ? '' : 's'} · Creada por ${poll.createdBy}</span>
      </article>
    `;
  }).join('');

  target.querySelectorAll('.poll-option').forEach(button => {
    button.addEventListener('click', async () => {
      if (!state.currentUser || !supabaseClient) return;
      const poll = subject.polls.find(item => item.id === button.dataset.pollId);
      if (!poll) return;
      const optionId = button.dataset.optionId;

      const { error } = await supabaseClient
        .from('subject_poll_votes')
        .upsert({ poll_id: poll.id, option_id: optionId, user_id: state.currentUser.id }, { onConflict: 'poll_id,user_id' });
      if (error) { console.error('No se pudo registrar el voto:', error); return; }

      poll.options.forEach(option => {
        option.votes = option.votes.filter(userId => userId !== state.currentUser.id);
      });
      const chosen = poll.options.find(option => option.id === optionId);
      if (chosen) chosen.votes.push(state.currentUser.id);
      renderPolls(subject);
    });
  });
}

function opinionCard(opinion) {
  const stars = '★'.repeat(opinion.rating) + '☆'.repeat(5 - opinion.rating);
  return `
    <article class="item-card opinion-card">
      <div class="opinion-card-head">
        <strong>${opinion.professor}</strong>
        <span class="opinion-stars">${stars}</span>
      </div>
      ${opinion.content ? `<p>${opinion.content}</p>` : ''}
      <span>Por ${opinion.author}</span>
    </article>
  `;
}

function renderOpinions(subject) {
  const listTarget = document.getElementById('subjectOpinions');
  const professorSelect = document.getElementById('opinionProfessorFilter');
  if (!listTarget) return;

  const professors = [...new Set(subject.opinions.map(item => item.professor).filter(Boolean))].sort();

  if (professorSelect) {
    professorSelect.innerHTML = '<option value="all">Todos los profesores</option>'
      + professors.map(name => `<option value="${name}" ${state.opinionProfessorFilter === name ? 'selected' : ''}>${name}</option>`).join('');
  }

  const filtered = subject.opinions.filter(item => {
    if (state.opinionProfessorFilter !== 'all' && item.professor !== state.opinionProfessorFilter) return false;
    if (state.opinionStarFilter !== 'all' && String(item.rating) !== state.opinionStarFilter) return false;
    return true;
  });

  listTarget.innerHTML = filtered.length
    ? filtered.map(opinionCard).join('')
    : createItemCard('Sin opiniones', 'No hay opiniones que coincidan con el filtro.', '');
}

function summaryCard(subject, summary) {
  const canDelete = state.currentUser && (state.currentUser.id === summary.authorId || isAdminView());
  const deleteBtn = canDelete
    ? `<button type="button" class="icon-btn tiny-btn ghost-btn" data-delete-summary="${summary.id}" title="Eliminar resumen"><span class="icon icon-trash"></span></button>`
    : '';
  return `
    <article class="material-card">
      <span class="material-icon type-pdf"><span class="icon icon-file-text"></span></span>
      <div class="material-info">
        <strong>${summary.title}</strong>
        <span>${['Por ' + summary.author, formatShortDate(summary.createdAt), summary.fileName].filter(Boolean).join(' · ')}</span>
      </div>
      <div class="material-actions">
        <a class="download-link primary" href="${summary.url}" target="_blank" rel="noopener"><span class="icon icon-external-link"></span> Abrir</a>
        ${deleteBtn}
      </div>
    </article>
  `;
}

function renderSummaries(subject) {
  const target = document.getElementById('subjectSummaries');
  if (!target) return;

  target.innerHTML = subject.summaries.length
    ? subject.summaries.map(summary => summaryCard(subject, summary)).join('')
    : createItemCard('Sin resúmenes todavía', 'Sé el primero en compartir un resumen de esta materia.', '');

  target.querySelectorAll('[data-delete-summary]').forEach(button => {
    button.addEventListener('click', () => deleteSummary(subject, button.dataset.deleteSummary));
  });
}

async function deleteSummary(subject, summaryId) {
  const summary = subject.summaries.find(item => item.id === summaryId);
  if (!summary || !supabaseClient || !state.currentUser) return;
  if (state.currentUser.id !== summary.authorId && !isAdminView()) return;
  if (!confirm('¿Eliminar este resumen?')) return;

  if (summary.storagePath) {
    await supabaseClient.storage.from('subject-content').remove([summary.storagePath]);
  }
  const { error } = await supabaseClient.from('subject_summaries').delete().eq('id', summaryId);
  if (error) { alert('No se pudo borrar el resumen: ' + error.message); return; }

  subject.summaries = subject.summaries.filter(item => item.id !== summaryId);
  renderSummaries(subject);
}

// =========================================================
// Preguntas Frecuentes: lectura para todos los alumnos (index.html) +
// carga/edición solo para admins (admin.html).
// =========================================================

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Convierte texto plano en HTML seguro, soportando negrita/cursiva y links en
// formato Markdown (**negrita**, *cursiva*, [texto](https://...), los que
// insertan los botones del admin) y también URLs sueltas escritas directo.
function renderRichText(text) {
  const escaped = escapeHtml(text);
  const withBold = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const withItalic = withBold.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  const withMdLinks = withItalic.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (match, label, url) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`
  );
  const withBareLinks = withMdLinks.replace(
    /(^|[^"'>])(https?:\/\/[^\s<]+)/g,
    (match, prefix, url) => `${prefix}<a href="${url}" target="_blank" rel="noopener">${url}</a>`
  );
  return withBareLinks.replace(/\n/g, '<br>');
}

function renderFaqList() {
  const target = document.getElementById('faqList');
  if (!target) return;

  if (!state.data.faq.length) {
    target.innerHTML = createItemCard('Todavía no hay preguntas cargadas', 'Esta sección se está preparando.', '');
    return;
  }

  target.innerHTML = state.data.faq.map(item => {
    const open = state.openFaqId === item.id;
    return `
      <article class="item-card faq-item">
        <button type="button" class="faq-question" data-faq-toggle="${item.id}">
          <span>${escapeHtml(item.question)}</span>
          <span class="faq-arrow">${open ? '▾' : '▸'}</span>
        </button>
        ${open ? `<div class="faq-answer">${renderRichText(item.answer)}</div>` : ''}
      </article>
    `;
  }).join('');

  target.querySelectorAll('[data-faq-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.faqToggle;
      state.openFaqId = state.openFaqId === id ? null : id;
      renderFaqList();
    });
  });
}

function buildFaqAdminCard(item) {
  return `
    <article class="item-card">
      <strong>${escapeHtml(item.question)}</strong>
      <p class="faq-answer-preview">${renderRichText(item.answer)}</p>
      <div class="stack-row">
        <button type="button" class="ghost-btn small-btn" data-faq-edit="${item.id}">Editar</button>
        <button type="button" class="ghost-btn small-btn danger-btn" data-faq-delete="${item.id}">Eliminar</button>
      </div>
    </article>
  `;
}

function renderFaqAdminList() {
  const target = document.getElementById('faqAdminList');
  if (!target) return;

  target.innerHTML = state.data.faq.length
    ? state.data.faq.map(buildFaqAdminCard).join('')
    : createItemCard('Sin preguntas cargadas', 'Agregá la primera con el formulario de arriba.', '');

  target.querySelectorAll('[data-faq-edit]').forEach(button => {
    button.addEventListener('click', () => startEditFaq(button.dataset.faqEdit));
  });
  target.querySelectorAll('[data-faq-delete]').forEach(button => {
    button.addEventListener('click', () => deleteFaqItem(button.dataset.faqDelete));
  });
}

function resetFaqForm() {
  const form = document.getElementById('faqForm');
  const notice = document.getElementById('faqFormNotice');
  const submitBtn = document.getElementById('faqFormSubmit');
  const cancelBtn = document.getElementById('faqFormCancel');
  const editId = document.getElementById('faqEditId');

  if (form) form.reset();
  if (notice) notice.className = 'notice';
  if (editId) editId.value = '';
  if (submitBtn) submitBtn.textContent = 'Agregar pregunta';
  if (cancelBtn) cancelBtn.classList.add('hidden');
}

function startEditFaq(faqId) {
  const item = state.data.faq.find(entry => entry.id === faqId);
  if (!item) return;

  document.getElementById('faqEditId').value = item.id;
  document.getElementById('faqQuestionInput').value = item.question;
  document.getElementById('faqAnswerInput').value = item.answer;
  const submitBtn = document.getElementById('faqFormSubmit');
  const cancelBtn = document.getElementById('faqFormCancel');
  if (submitBtn) submitBtn.textContent = 'Guardar cambios';
  if (cancelBtn) cancelBtn.classList.remove('hidden');
  document.getElementById('faqQuestionInput').focus();
}

async function deleteFaqItem(faqId) {
  if (!supabaseClient) return;
  if (!confirm('¿Eliminar esta pregunta frecuente?')) return;

  const { error } = await supabaseClient.from('faq_items').delete().eq('id', faqId);
  if (error) { alert('No se pudo borrar: ' + error.message); return; }

  state.data.faq = state.data.faq.filter(item => item.id !== faqId);
  renderFaqAdminList();
}

function renderSubjectLists(subject) {
  renderSubjectContent(subject);
  renderList('subjectForum', subject.forum, item => createItemCard(item.author, 'Comentario en el foro', item.content));
  renderOpinions(subject);
  renderPolls(subject);
  renderSummaries(subject);
}

// Muestra una sección de la materia. "Contenido" y "Clases grabadas" comparten
// el mismo panel (el área de materiales).
function setSubjectTab(tab) {
  state.subjectSection = tab;
  const panelId = tab === 'grabadas' ? 'contenido' : tab;
  document.querySelectorAll('[data-subject-panel]').forEach(panel => {
    panel.classList.toggle('hidden', panel.dataset.subjectPanel !== panelId);
  });
  const contentAddCard = document.getElementById('subjectContentAdmin');
  if (contentAddCard) contentAddCard.classList.toggle('hidden', !isAdminView() || panelId !== 'contenido');
  const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
  if (subject) renderSubjectContent(subject);
  if (subject && tab === 'evaluaciones') renderExamsSection(subject);
}

function openSubject(subjectId) {
  const subject = state.data.subjects.find(item => item.id === subjectId);
  if (!subject) return;
  if (!confirmLeaveExam()) return;
  stopExamTimer();
  state.examView = { mode: 'list', examId: null };
  state.confirmDeleteExamId = null;

  state.currentSubjectId = subject.id;
  state.currentUnitId = subject.units.length ? subject.units[0].id : null;
  state.currentItemId = null;
  state.currentRecordedId = null;
  state.subjectSection = 'contenido';
  state.navGroupsOpen = { contenido: true, grabadas: false };
  state.opinionProfessorFilter = 'all';
  state.opinionStarFilter = 'all';

  const title = document.getElementById('subjectTitle');
  const summary = document.getElementById('subjectSummary');
  const navTitle = document.getElementById('subjectNavTitle');
  const mainTarget = document.getElementById('subjectContent');

  if (title) title.textContent = subject.name;
  if (navTitle) navTitle.textContent = subject.name;
  if (mainTarget) mainTarget.dataset.itemId = '';
  closeSubjectNavDrawer();
  if (summary) {
    const chips = [
      `<span class="materia-chip">#${subject.code}</span>`,
      `<span class="materia-chip">${subject.year}° año</span>`,
      `<span class="materia-chip">${subject.semester}° cuatrimestre</span>`
    ];
    if (state.currentUser) {
      const progress = getSubjectProgress(state.currentUser.email, subject.id);
      chips.push(`<span class="subject-status-badge ${STATUS_CLASSES[progress.status] || ''}">${progress.status}</span>`);
      if (progress.grades.notaFinal) chips.push(`<span class="materia-chip">Nota final: ${progress.grades.notaFinal}</span>`);
    }
    chips.push(`<span class="materia-chip">${subject.correlatives.length ? `Correlativas: ${correlativeCodes(subject)}` : 'Sin correlativas'}</span>`);
    summary.innerHTML = chips.join('');
  }

  renderSubjectLists(subject);
  refreshContentUnitSelect(subject);
  setSubjectTab('contenido');

  const backBtn = document.getElementById('backToMaterias');
  if (backBtn) backBtn.onclick = () => { if (confirmLeaveExam()) openYear(subject.year); };

  setView('materia');
}

function setView(view) {
  const map = {
    inicio: 'inicioView',
    calendario: 'calendarioView',
    planificacion: 'planificacionView',
    foro: 'foroView',
    alumnos: 'alumnosView',
    faq: 'faqView',
    contacto: 'contactoView',
    materias: 'materiasView',
    materia: 'materiaView'
  };

  Object.values(map).forEach(id => {
    const section = document.getElementById(id);
    if (section) section.classList.add('hidden');
  });

  if (map[view] && document.getElementById(map[view])) {
    document.getElementById(map[view]).classList.remove('hidden');
  }

  document.querySelectorAll('.nav-link[data-view]').forEach(link => {
    link.classList.toggle('active', link.dataset.view === view);
  });

  if (view !== 'materias' && view !== 'materia') {
    document.querySelectorAll('.year-btn').forEach(btn => btn.classList.remove('active'));
  }

  if (view === 'alumnos') loadStudentDirectory();
  if (view === 'faq') renderFaqList();
}

// "jUAN  pablo" → "Juan Pablo". También después de guion y apóstrofo
// (Pérez-García, O'Connor). La base aplica la misma regla con initcap().
function formatPersonName(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('es')
    .replace(/(^|[\s'’-])(\p{L})/gu, (match, sep, letter) => sep + letter.toLocaleUpperCase('es'));
}

function getFullName(user) {
  if (!user) return '';
  return [user.name, user.lastName].filter(Boolean).join(' ').trim() || user.name || '';
}

function renderAvatarInto(el, user) {
  if (!el) return;
  if (user.avatarUrl) {
    el.innerHTML = `<img src="${user.avatarUrl}" alt="${user.name}" />`;
  } else {
    el.textContent = user.avatar;
  }
}

function updatePortalHeader(user) {
  const name = document.getElementById('userName');
  const role = document.getElementById('userRole');
  const avatar = document.getElementById('userAvatar');
  const sidebarName = document.getElementById('sidebarUserName');
  const sidebarAvatar = document.getElementById('sidebarUserAvatar');

  if (name) name.textContent = getFullName(user);
  if (role) role.textContent = state.viewMode === 'user' && user.role === 'admin' ? 'Estudiante (vista previa)' : (user.role === 'admin' ? 'Administrador' : 'Estudiante');
  renderAvatarInto(avatar, user);
  if (sidebarName) sidebarName.textContent = getFullName(user);
  renderAvatarInto(sidebarAvatar, user);
  applyViewMode();
}

function updateAdminHeader(user) {
  const name = document.getElementById('adminName');
  const avatar = document.getElementById('adminAvatar');
  const events = document.getElementById('adminEventsCount');
  const posts = document.getElementById('adminPostsCount');
  const subjects = document.getElementById('adminSubjectsCount');

  if (name) name.textContent = getFullName(user);
  renderAvatarInto(avatar, user);
  if (events) events.textContent = state.data.calendar.length;
  if (posts) posts.textContent = state.data.forum.length;
  if (subjects) subjects.textContent = state.data.subjects.length;
}

function setAdminView(view) {
  const map = { panel: 'adminPanelView', materias: 'adminMateriasView', usuarios: 'adminUsuariosView', discord: 'adminDiscordView' };

  Object.values(map).forEach(id => {
    const section = document.getElementById(id);
    if (section) section.classList.add('hidden');
  });

  if (map[view] && document.getElementById(map[view])) {
    document.getElementById(map[view]).classList.remove('hidden');
  }

  document.querySelectorAll('.nav-link[data-admin-view]').forEach(link => {
    link.classList.toggle('active', link.dataset.adminView === view);
  });

  if (view === 'usuarios') loadAndRenderAdminUsers();
  if (view === 'discord') {
    setDiscordTab('mensajes');
    loadDiscordChannels().then(() => {
      loadOutboxHistory();
      loadScheduledMessages();
    });
    loadBulkPostHistory();
    loadClearChannelHistory();
  }
}

function setDiscordTab(tab) {
  document.querySelectorAll('[data-discord-tab]').forEach(button => {
    button.classList.toggle('active', button.dataset.discordTab === tab);
  });
  document.querySelectorAll('[data-discord-panel]').forEach(panel => {
    panel.classList.toggle('hidden', panel.dataset.discordPanel !== tab);
  });
  if (tab === 'faq') renderFaqAdminList();
}

function showAuthForm(mode) {
  const landingScreen = document.getElementById('landingScreen');
  const authScreen = document.getElementById('authScreen');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const verifyForm = document.getElementById('verifyForm');
  const forgotForm = document.getElementById('forgotForm');
  const resetForm = document.getElementById('resetForm');
  const codeResetForm = document.getElementById('codeResetForm');
  const indicator = document.querySelector('.auth-tab-indicator');

  if (landingScreen) landingScreen.classList.add('hidden');
  if (authScreen) authScreen.classList.remove('hidden');
  if (loginForm) loginForm.classList.toggle('hidden', mode !== 'login');
  if (registerForm) registerForm.classList.toggle('hidden', mode !== 'register');
  if (verifyForm) verifyForm.classList.add('hidden');
  if (forgotForm) forgotForm.classList.add('hidden');
  if (resetForm) resetForm.classList.add('hidden');
  if (codeResetForm) codeResetForm.classList.add('hidden');
  state.pendingConfirmEmail = null;
  state.pendingConfirmUserId = null;
  state.pendingConfirmName = '';
  if (indicator) indicator.classList.toggle('to-register', mode === 'register');

  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.auth === mode);
  });
}

function showLanding() {
  const landingScreen = document.getElementById('landingScreen');
  const authScreen = document.getElementById('authScreen');
  if (authScreen) authScreen.classList.add('hidden');
  if (landingScreen) landingScreen.classList.remove('hidden');
}

function setupSidebarToggle(shellId) {
  const shell = document.getElementById(shellId);
  const toggle = document.getElementById('sidebarToggle');
  const backdrop = document.getElementById('sidebarBackdrop');
  const sidebar = shell ? shell.querySelector('.sidebar') : null;
  if (!shell || !toggle) return;

  const stored = localStorage.getItem('sidebarCollapsed');
  if (stored === 'true' || (stored === null && window.innerWidth <= 1100)) {
    shell.classList.add('sidebar-collapsed');
  }

  const setCollapsed = collapsed => {
    shell.classList.toggle('sidebar-collapsed', collapsed);
    localStorage.setItem('sidebarCollapsed', collapsed ? 'true' : 'false');
  };

  toggle.addEventListener('click', () => setCollapsed(!shell.classList.contains('sidebar-collapsed')));
  if (backdrop) backdrop.addEventListener('click', () => setCollapsed(true));

  if (sidebar) {
    sidebar.addEventListener('click', event => {
      if (window.innerWidth > 1100) return;
      if (event.target.closest('.nav-link, .year-btn')) setCollapsed(true);
    });
  }
}

function setupDrawerToggle({ layoutId, toggleId, closeId, backdropId, openClass, autoCloseItemSelector }) {
  const layout = document.getElementById(layoutId);
  const toggle = document.getElementById(toggleId);
  const close = document.getElementById(closeId);
  const backdrop = document.getElementById(backdropId);
  if (!layout || !toggle) return;

  const setOpen = open => layout.classList.toggle(openClass, open);

  toggle.addEventListener('click', () => setOpen(!layout.classList.contains(openClass)));
  if (close) close.addEventListener('click', () => setOpen(false));
  if (backdrop) backdrop.addEventListener('click', () => setOpen(false));

  if (autoCloseItemSelector) {
    layout.addEventListener('click', event => {
      if (window.innerWidth > 900) return;
      if (event.target.closest(autoCloseItemSelector)) setOpen(false);
    });
  }
}

function setupCalendarNavToggle() {
  setupDrawerToggle({
    layoutId: 'calendarLayout',
    toggleId: 'calendarNavToggle',
    closeId: 'calendarNavClose',
    backdropId: 'calendarNavBackdrop',
    openClass: 'units-nav-open'
  });
}

// =========================================================
// Alumnos: directorio de compañeros + perfil público
// =========================================================

async function loadStudentDirectory() {
  if (!supabaseClient || !state.currentUser) return;
  const list = document.getElementById('alumnosList');
  const notice = document.getElementById('alumnosNotice');
  if (list) list.innerHTML = '<p class="table-empty">Cargando alumnos...</p>';

  const [{ data: students, error: studentsError }, { data: subjectRows, error: subjectsError }] = await Promise.all([
    supabaseClient.from('student_directory').select('*').neq('id', state.currentUser.id).order('name'),
    supabaseClient.from('student_current_subjects').select('*')
  ]);

  if (studentsError || subjectsError) {
    if (notice) {
      notice.className = 'notice show error';
      notice.textContent = 'No se pudo cargar el directorio: ' + (studentsError || subjectsError).message;
    }
    if (list) list.innerHTML = '';
    return;
  }

  if (notice) notice.className = 'notice';
  state.data.students = students || [];

  const subjectMap = {};
  (subjectRows || []).forEach(row => {
    if (!subjectMap[row.user_id]) subjectMap[row.user_id] = [];
    subjectMap[row.user_id].push({ id: row.subject_id, code: row.code, name: row.name });
  });
  state.data.studentSubjects = subjectMap;

  const subjectFilter = document.getElementById('alumnosSubjectFilter');
  if (subjectFilter && subjectFilter.options.length <= 1) {
    const uniqueSubjects = {};
    (subjectRows || []).forEach(row => { uniqueSubjects[row.subject_id] = row; });
    Object.values(uniqueSubjects)
      .sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }))
      .forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.subject_id;
        option.textContent = `${subject.code} · ${subject.name}`;
        subjectFilter.appendChild(option);
      });
  }

  renderAlumnosList();
}

function studentFullName(student) {
  return [student.name, student.last_name].filter(Boolean).join(' ').trim() || student.name || 'Alumno';
}

function renderStudentAvatar(student) {
  return student.avatar_url ? `<img src="${student.avatar_url}" alt="${studentFullName(student)}" />` : (student.avatar || 'U');
}

function renderAlumnosList() {
  const list = document.getElementById('alumnosList');
  if (!list) return;

  const search = state.alumnosSearch.trim().toLowerCase();
  const subjectFilter = state.alumnosSubjectFilter;

  const filtered = state.data.students.filter(student => {
    const matchesSearch = !search || studentFullName(student).toLowerCase().includes(search);
    const subjects = state.data.studentSubjects[student.id] || [];
    const matchesSubject = subjectFilter === 'all' || subjects.some(subject => subject.id === subjectFilter);
    return matchesSearch && matchesSubject;
  });

  if (!filtered.length) {
    list.innerHTML = '<p class="table-empty">No se encontraron alumnos con ese filtro.</p>';
    return;
  }

  list.innerHTML = filtered.map(student => {
    const subjects = student.current_subjects_visible ? (state.data.studentSubjects[student.id] || []) : [];
    const subjectsHtml = student.current_subjects_visible
      ? (subjects.length
        ? `<div class="student-card-subjects">${subjects.map(s => `<span class="pill blue">${s.code}</span>`).join('')}</div>`
        : '<span class="student-card-empty">No está cursando materias actualmente.</span>')
      : '<span class="student-card-empty">No comparte sus materias actuales.</span>';
    return `
      <div class="item-card student-card" data-open-student="${student.id}">
        <div class="avatar">${renderStudentAvatar(student)}</div>
        <div class="student-card-info">
          <strong>${studentFullName(student)}</strong>
          ${subjectsHtml}
        </div>
      </div>
    `;
  }).join('');
}

function openStudentProfile(studentId) {
  const student = state.data.students.find(item => item.id === studentId);
  const modal = document.getElementById('studentProfileModal');
  const content = document.getElementById('studentProfileContent');
  if (!student || !modal || !content) return;

  state.openStudentProfileId = studentId;
  const subjects = student.current_subjects_visible ? (state.data.studentSubjects[student.id] || []) : [];

  const mainFields = [['Fecha de nacimiento', student.birth_date]].filter(([, value]) => value);
  const mainFieldsHtml = mainFields.length
    ? `<div class="student-profile-fields">${mainFields.map(([label, value]) => `<div class="student-profile-field"><span>${label}</span><span>${value}</span></div>`).join('')}</div>`
    : '';

  const extraFields = [
    ['Dirección domiciliaria', student.address],
    ['DNI', student.dni],
    ['Fecha de ingreso a la facultad', student.join_date]
  ].filter(([, value]) => value);

  const extraFieldsHtml = extraFields.length
    ? `<div class="student-profile-fields">${extraFields.map(([label, value]) => `<div class="student-profile-field"><span>${label}</span><span>${value}</span></div>`).join('')}</div>`
    : '<p class="student-profile-empty">Este alumno no compartió datos adicionales.</p>';

  const subjectsHtml = student.current_subjects_visible
    ? (subjects.length
      ? `<div class="student-card-subjects">${subjects.map(s => `<span class="pill blue">${s.code} · ${s.name}</span>`).join('')}</div>`
      : '<p class="student-profile-empty">No está cursando materias actualmente.</p>')
    : '<p class="student-profile-empty">No comparte sus materias actuales.</p>';

  const contactFields = student.contact_visible
    ? [['Teléfono', student.phone], ['Instagram', student.instagram], ['LinkedIn', student.linkedin]].filter(([, value]) => value)
    : [];
  const contactFieldsHtml = student.contact_visible
    ? (contactFields.length
      ? `<div class="student-profile-fields">${contactFields.map(([label, value]) => `<div class="student-profile-field"><span>${label}</span><span>${value}</span></div>`).join('')}</div>`
      : '<p class="student-profile-empty">Este alumno no cargó datos de contacto.</p>')
    : '<p class="student-profile-empty">Este alumno no comparte sus datos de contacto.</p>';

  const whatsappHtml = student.contact_visible && student.phone
    ? `<a class="whatsapp-btn" target="_blank" rel="noopener" href="https://wa.me/${student.phone.replace(/[^0-9]/g, '')}"><span class="icon icon-chat"></span> Contactar por WhatsApp</a>`
    : '';

  content.innerHTML = `
    <div class="student-profile-head">
      <div class="avatar large">${renderStudentAvatar(student)}</div>
      <strong>${studentFullName(student)}</strong>
    </div>
    ${mainFieldsHtml}
    <div class="section-head" style="margin-top:16px"><h4>Materias que cursa actualmente</h4></div>
    ${subjectsHtml}
    <div class="section-head" style="margin-top:16px"><h4>Contacto</h4></div>
    ${contactFieldsHtml}
    <div class="section-head" style="margin-top:16px"><h4>Datos adicionales</h4></div>
    ${extraFieldsHtml}
    <div class="student-profile-actions">
      ${whatsappHtml}
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeStudentProfile() {
  const modal = document.getElementById('studentProfileModal');
  if (modal) modal.classList.add('hidden');
  state.openStudentProfileId = null;
}

function attachPortalEvents() {
  setupSidebarToggle('portalScreen');
  setupCalendarNavToggle();
  setupSubjectNav();
  setupContentCards();
  setupExamEvents();
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const forumForm = document.getElementById('forumForm');
  const notice = document.getElementById('notice');
  const registerNotice = document.getElementById('registerNotice');
  const backToLanding = document.getElementById('backToLanding');
  const calPrevMonth = document.getElementById('calPrevMonth');
  const calNextMonth = document.getElementById('calNextMonth');
  const calToday = document.getElementById('calToday');
  const planningSearch = document.getElementById('planningSearch');
  const planningYearFilter = document.getElementById('planningYearFilter');
  const planningStatusFilter = document.getElementById('planningStatusFilter');

  if (calPrevMonth) calPrevMonth.addEventListener('click', () => changeCalendarMonth(-1));
  if (calNextMonth) calNextMonth.addEventListener('click', () => changeCalendarMonth(1));

  const toggleHolidaysBtn = document.getElementById('toggleHolidaysBtn');
  if (toggleHolidaysBtn) {
    toggleHolidaysBtn.addEventListener('click', () => {
      state.calendarView.holidaysListOpen = !state.calendarView.holidaysListOpen;
      toggleHolidaysBtn.classList.toggle('active-toggle', state.calendarView.holidaysListOpen);
      toggleHolidaysBtn.title = state.calendarView.holidaysListOpen ? 'Volver al calendario' : 'Ver todos los feriados';
      renderCalendarList();
    });
  }

  if (calToday) {
    calToday.addEventListener('click', () => {
      const today = new Date();
      state.calendarView.year = today.getFullYear();
      state.calendarView.month = today.getMonth();
      state.calendarView.selectedDate = null;
      renderCalendarMonth();
      renderCalendarList();
    });
  }

  if (planningSearch) {
    planningSearch.addEventListener('input', event => {
      state.planningSearch = event.target.value;
      renderPlanningTable();
    });
  }

  if (planningYearFilter) {
    planningYearFilter.addEventListener('change', event => {
      state.planningYearFilter = event.target.value;
      renderPlanningTable();
    });
  }

  if (planningStatusFilter) {
    planningStatusFilter.addEventListener('change', event => {
      state.planningStatusFilter = event.target.value;
      renderPlanningTable();
    });
  }

  document.querySelectorAll('[data-auth]').forEach(button => {
    button.addEventListener('click', () => showAuthForm(button.dataset.auth));
  });

  if (backToLanding) backToLanding.addEventListener('click', showLanding);

  if (loginForm) {
    loginForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient) return;
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.textContent = 'Ingresando...';

      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

      if (error) {
        if (notice) {
          notice.className = 'notice show error';
          const message = error.message.toLowerCase();
          notice.textContent = message.includes('confirm')
            ? 'Confirmá tu correo antes de iniciar sesión (revisá tu bandeja de entrada).'
            : message.includes('banned')
              ? 'Tu cuenta fue suspendida por un administrador.'
              : 'Correo o contraseña incorrectos.';
        }
        if (submitBtn) submitBtn.textContent = 'Entrar';
        return;
      }

      window.location.reload();
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient) return;
      const name = formatPersonName(document.getElementById('registerName').value);
      const lastName = formatPersonName(document.getElementById('registerLastName').value);
      const email = document.getElementById('registerEmail').value.trim();
      const password = document.getElementById('registerPassword').value.trim();
      const passwordConfirm = document.getElementById('registerPasswordConfirm').value.trim();

      if (password !== passwordConfirm) {
        if (registerNotice) {
          registerNotice.className = 'notice show error';
          registerNotice.textContent = 'Las contraseñas no coinciden.';
        }
        return;
      }

      const submitBtn = registerForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.textContent = 'Creando cuenta...';

      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: { data: { name, last_name: lastName } }
      });

      if (submitBtn) submitBtn.textContent = 'Crear cuenta';

      if (error) {
        if (registerNotice) {
          registerNotice.className = 'notice show error';
          registerNotice.textContent = error.message.toLowerCase().includes('already registered')
            ? 'Ya existe una cuenta con ese correo.'
            : error.message;
        }
        return;
      }

      state.pendingConfirmEmail = email;
      state.pendingConfirmUserId = data.user ? data.user.id : null;
      state.pendingConfirmName = name;
      registerForm.classList.add('hidden');
      registerForm.reset();
      const verifyForm = document.getElementById('verifyForm');
      const verifyEmailLabel = document.getElementById('verifyEmailLabel');
      if (verifyEmailLabel) verifyEmailLabel.textContent = email;
      if (verifyForm) verifyForm.classList.remove('hidden');

      if (state.pendingConfirmUserId) {
        const result = await issueVerificationCode(state.pendingConfirmUserId, email, name);
        const notice = document.getElementById('verifyNotice');
        if (notice && !result.ok) {
          notice.className = 'notice show error';
          notice.textContent = result.message || 'No se pudo enviar el código.';
        }
      }
    });
  }

  const verifyForm = document.getElementById('verifyForm');
  const verifyNotice = document.getElementById('verifyNotice');
  const resendConfirmationBtn = document.getElementById('resendConfirmationBtn');
  const verifyBackToLogin = document.getElementById('verifyBackToLogin');

  if (verifyForm) {
    verifyForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient || !state.pendingConfirmUserId) return;
      const code = document.getElementById('verifyCode').value.trim();
      const submitBtn = verifyForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.textContent = 'Verificando...';

      const { data: profile, error } = await supabaseClient
        .from('profiles')
        .select('verification_code, verification_expires')
        .eq('id', state.pendingConfirmUserId)
        .single();

      if (submitBtn) submitBtn.textContent = 'Verificar';

      if (error || !profile || !profile.verification_code || profile.verification_code !== code) {
        if (verifyNotice) {
          verifyNotice.className = 'notice show error';
          verifyNotice.textContent = 'Código incorrecto.';
        }
        return;
      }

      if (new Date(profile.verification_expires) < new Date()) {
        if (verifyNotice) {
          verifyNotice.className = 'notice show error';
          verifyNotice.textContent = 'El código expiró. Pedí uno nuevo.';
        }
        return;
      }

      const { error: updateError } = await supabaseClient
        .from('profiles')
        .update({ email_verified: true, verification_code: null, verification_expires: null })
        .eq('id', state.pendingConfirmUserId);

      if (updateError) {
        if (verifyNotice) {
          verifyNotice.className = 'notice show error';
          verifyNotice.textContent = 'No se pudo verificar la cuenta. Intentá de nuevo.';
        }
        return;
      }

      window.location.reload();
    });
  }

  if (resendConfirmationBtn) {
    resendConfirmationBtn.addEventListener('click', async () => {
      if (!supabaseClient || !state.pendingConfirmUserId || !state.pendingConfirmEmail) return;
      resendConfirmationBtn.textContent = 'Enviando...';
      const result = await issueVerificationCode(state.pendingConfirmUserId, state.pendingConfirmEmail, state.pendingConfirmName);
      resendConfirmationBtn.textContent = 'Reenviar código';
      if (verifyNotice) {
        verifyNotice.className = result.ok ? 'notice show' : 'notice show error';
        verifyNotice.textContent = result.ok ? 'Te reenviamos el código.' : (result.message || 'No se pudo reenviar el código.');
      }
    });
  }

  if (verifyBackToLogin) {
    verifyBackToLogin.addEventListener('click', () => showAuthForm('login'));
  }

  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
  const backToLoginFromForgot = document.getElementById('backToLoginFromForgot');
  const forgotForm = document.getElementById('forgotForm');
  const forgotNotice = document.getElementById('forgotNotice');
  const resetForm = document.getElementById('resetForm');
  const resetNotice = document.getElementById('resetNotice');

  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', () => {
      if (loginForm) loginForm.classList.add('hidden');
      if (forgotForm) forgotForm.classList.remove('hidden');
      if (forgotNotice) forgotNotice.className = 'notice';
    });
  }

  if (backToLoginFromForgot) {
    backToLoginFromForgot.addEventListener('click', () => {
      if (forgotForm) forgotForm.classList.add('hidden');
      if (loginForm) loginForm.classList.remove('hidden');
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient) return;
      const email = document.getElementById('forgotEmail').value.trim();
      const submitBtn = forgotForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.textContent = 'Enviando...';

      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.href.split('#')[0].split('?')[0]
      });

      if (submitBtn) submitBtn.textContent = 'Enviar enlace';

      if (error) {
        if (forgotNotice) {
          forgotNotice.className = 'notice show error';
          forgotNotice.textContent = 'No se pudo enviar el correo. Intentá de nuevo.';
        }
        return;
      }

      forgotNotice.className = 'notice show';
      forgotNotice.textContent = 'Si el correo existe, te enviamos un enlace para restablecer tu contraseña.';
    });
  }

  if (resetForm) {
    resetForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient) return;
      const newPassword = document.getElementById('resetPassword').value.trim();
      const newPasswordConfirm = document.getElementById('resetPasswordConfirm').value.trim();

      if (newPassword !== newPasswordConfirm) {
        if (resetNotice) {
          resetNotice.className = 'notice show error';
          resetNotice.textContent = 'Las contraseñas no coinciden.';
        }
        return;
      }

      const { error } = await supabaseClient.auth.updateUser({ password: newPassword });

      if (error) {
        if (resetNotice) {
          resetNotice.className = 'notice show error';
          resetNotice.textContent = 'No se pudo actualizar la contraseña. Pedí un nuevo enlace.';
        }
        return;
      }

      await supabaseClient.auth.signOut();
      window.location.reload();
    });
  }

  const haveCodeBtn = document.getElementById('haveCodeBtn');
  const codeResetBackToLogin = document.getElementById('codeResetBackToLogin');
  const codeResetForm = document.getElementById('codeResetForm');
  const codeResetNotice = document.getElementById('codeResetNotice');

  if (haveCodeBtn) {
    haveCodeBtn.addEventListener('click', () => {
      if (loginForm) loginForm.classList.add('hidden');
      if (codeResetForm) codeResetForm.classList.remove('hidden');
      if (codeResetNotice) codeResetNotice.className = 'notice';
    });
  }

  if (codeResetBackToLogin) {
    codeResetBackToLogin.addEventListener('click', () => {
      if (codeResetForm) codeResetForm.classList.add('hidden');
      if (loginForm) loginForm.classList.remove('hidden');
    });
  }

  if (codeResetForm) {
    codeResetForm.addEventListener('submit', async event => {
      event.preventDefault();
      const email = document.getElementById('codeResetEmail').value.trim();
      const code = document.getElementById('codeResetCode').value.trim();
      const newPassword = document.getElementById('codeResetPassword').value.trim();
      const newPasswordConfirm = document.getElementById('codeResetPasswordConfirm').value.trim();

      if (newPassword !== newPasswordConfirm) {
        if (codeResetNotice) {
          codeResetNotice.className = 'notice show error';
          codeResetNotice.textContent = 'Las contraseñas no coinciden.';
        }
        return;
      }

      const submitBtn = codeResetForm.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Guardando...'; }

      const result = await confirmPasswordReset(email, code, newPassword);

      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Guardar nueva contraseña'; }

      if (!result.ok) {
        if (codeResetNotice) {
          codeResetNotice.className = 'notice show error';
          codeResetNotice.textContent = result.message;
        }
        return;
      }

      if (codeResetNotice) {
        codeResetNotice.className = 'notice show';
        codeResetNotice.textContent = 'Contraseña actualizada. Ya podés iniciar sesión.';
      }
      codeResetForm.reset();
      setTimeout(() => showAuthForm('login'), 1200);
    });
  }

  if (logoutBtn) logoutBtn.addEventListener('click', performLogout);

  const viewModeToggle = document.getElementById('viewModeToggle');
  if (viewModeToggle) viewModeToggle.addEventListener('click', toggleViewMode);

  const sidebarViewModeToggle = document.getElementById('sidebarViewModeToggle');
  if (sidebarViewModeToggle) sidebarViewModeToggle.addEventListener('click', toggleViewMode);

  const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');
  if (sidebarLogoutBtn) sidebarLogoutBtn.addEventListener('click', performLogout);

  document.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => setView(button.dataset.view));
  });

  document.querySelectorAll('[data-jump]').forEach(button => {
    button.addEventListener('click', () => setView(button.dataset.jump));
  });

  const alumnosSearch = document.getElementById('alumnosSearch');
  const alumnosSubjectFilter = document.getElementById('alumnosSubjectFilter');
  if (alumnosSearch) {
    alumnosSearch.addEventListener('input', event => {
      state.alumnosSearch = event.target.value;
      renderAlumnosList();
    });
  }
  if (alumnosSubjectFilter) {
    alumnosSubjectFilter.addEventListener('change', event => {
      state.alumnosSubjectFilter = event.target.value;
      renderAlumnosList();
    });
  }

  const alumnosList = document.getElementById('alumnosList');
  if (alumnosList) {
    alumnosList.addEventListener('click', event => {
      const card = event.target.closest('[data-open-student]');
      if (card) openStudentProfile(card.dataset.openStudent);
    });
  }

  const studentProfileModal = document.getElementById('studentProfileModal');
  const closeStudentModal = document.getElementById('closeStudentModal');
  if (closeStudentModal) closeStudentModal.addEventListener('click', closeStudentProfile);
  if (studentProfileModal) {
    studentProfileModal.addEventListener('click', event => {
      if (event.target === studentProfileModal) closeStudentProfile();
    });
  }

  const roadmapBtn = document.getElementById('roadmapBtn');
  const roadmapModal = document.getElementById('roadmapModal');
  const closeRoadmapModal = document.getElementById('closeRoadmapModal');
  const roadmapForm = document.getElementById('roadmapForm');

  if (roadmapBtn && roadmapModal) {
    roadmapBtn.addEventListener('click', () => roadmapModal.classList.remove('hidden'));
  }
  if (closeRoadmapModal && roadmapModal) {
    closeRoadmapModal.addEventListener('click', () => roadmapModal.classList.add('hidden'));
  }
  if (roadmapModal) {
    roadmapModal.addEventListener('click', event => {
      if (event.target === roadmapModal) roadmapModal.classList.add('hidden');
    });
  }
  if (roadmapForm) {
    roadmapForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!state.currentUser) return;
      const maxSubjects = Math.max(1, Number(document.getElementById('roadmapMaxSubjects').value) || 1);
      const maxPresenciales = Math.max(0, Number(document.getElementById('roadmapMaxPresenciales').value) || 0);
      const plan = computeRoadmap(state.currentUser.email, maxSubjects, maxPresenciales);
      renderRoadmapResult(plan);
    });
  }

  if (forumForm) {
    forumForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!state.currentUser) return;
      const title = document.getElementById('forumTitle').value.trim();
      const content = document.getElementById('forumContent').value.trim();
      if (!title || !content) return;
      const result = await createForumPost({ title, content });
      if (!result.ok) { alert('No se pudo publicar: ' + result.message); return; }
      forumForm.reset();
      renderForumViews();
      if (document.getElementById('adminPostsCount')) document.getElementById('adminPostsCount').textContent = state.data.forum.length;
    });
  }

  const addCalendarEventBtn = document.getElementById('addCalendarEventBtn');
  const newCalendarEventForm = document.getElementById('newCalendarEventForm');
  const cancelNewCalendarEvent = document.getElementById('cancelNewCalendarEvent');
  function wireRoomCodeToggle(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    if (!toggle || !input) return;
    toggle.addEventListener('change', () => {
      input.classList.toggle('hidden', !toggle.checked);
      if (!toggle.checked) input.value = '';
    });
  }
  wireRoomCodeToggle('newCalendarEventRoomToggle', 'newCalendarEventRoom');
  wireRoomCodeToggle('newCalendarEventCodeToggle', 'newCalendarEventCode');
  wireRoomCodeToggle('recurringRoomToggle', 'recurringRoom');
  wireRoomCodeToggle('recurringCodeToggle', 'recurringCode');

  if (addCalendarEventBtn && newCalendarEventForm) {
    addCalendarEventBtn.addEventListener('click', () => {
      if (!isAdminView()) return;
      const recurringForm = document.getElementById('recurringClassForm');
      if (recurringForm) recurringForm.classList.add('hidden');
      newCalendarEventForm.classList.toggle('hidden');
      if (!newCalendarEventForm.classList.contains('hidden')) {
        populateCalendarSubjectSelect(document.getElementById('newCalendarEventSubject'), '');
        document.getElementById('newCalendarEventTitle').focus();
      }
    });
  }

  function resetRoomCodeFields(form) {
    form.querySelectorAll('.room-toggle, .code-toggle').forEach(toggle => { toggle.checked = false; });
    form.querySelectorAll('[id$="Room"], [id$="Code"]').forEach(input => input.classList.add('hidden'));
  }

  if (cancelNewCalendarEvent && newCalendarEventForm) {
    cancelNewCalendarEvent.addEventListener('click', () => {
      newCalendarEventForm.reset();
      resetRoomCodeFields(newCalendarEventForm);
      newCalendarEventForm.classList.add('hidden');
    });
  }

  if (newCalendarEventForm) {
    newCalendarEventForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!isAdminView()) return;
      const title = document.getElementById('newCalendarEventTitle').value.trim();
      const date = document.getElementById('newCalendarEventDate').value;
      const type = document.getElementById('newCalendarEventType').value;
      const endDate = document.getElementById('newCalendarEventEndDate').value;
      const startTime = document.getElementById('newCalendarEventStartTime').value;
      const endTime = document.getElementById('newCalendarEventEndTime').value;
      const subjectId = document.getElementById('newCalendarEventSubject').value;
      const modality = document.getElementById('newCalendarEventModality').value;
      const room = document.getElementById('newCalendarEventRoom').value.trim();
      const classCode = document.getElementById('newCalendarEventCode').value.trim();
      if (!title || !date) return;
      await createCalendarEvent({ title, date, type, endDate, startTime, endTime, subjectId, modality, room, classCode });
      newCalendarEventForm.reset();
      resetRoomCodeFields(newCalendarEventForm);
      newCalendarEventForm.classList.add('hidden');
      renderCalendarViews();
    });
  }

  const addRecurringClassBtn = document.getElementById('addRecurringClassBtn');
  const recurringClassForm = document.getElementById('recurringClassForm');
  const cancelRecurringClass = document.getElementById('cancelRecurringClass');
  const recurringNotice = document.getElementById('recurringNotice');

  if (addRecurringClassBtn && recurringClassForm) {
    addRecurringClassBtn.addEventListener('click', () => {
      if (!isAdminView()) return;
      if (newCalendarEventForm) newCalendarEventForm.classList.add('hidden');
      recurringClassForm.classList.toggle('hidden');
      if (!recurringClassForm.classList.contains('hidden')) {
        populateCalendarSubjectSelect(document.getElementById('recurringSubjectSelect'), '');
      }
    });
  }

  if (cancelRecurringClass && recurringClassForm) {
    cancelRecurringClass.addEventListener('click', () => {
      recurringClassForm.reset();
      resetRoomCodeFields(recurringClassForm);
      recurringClassForm.classList.add('hidden');
      if (recurringNotice) recurringNotice.className = 'notice';
    });
  }

  if (recurringClassForm) {
    recurringClassForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!isAdminView()) return;
      const subjectId = document.getElementById('recurringSubjectSelect').value;
      const weekday = Number(document.getElementById('recurringWeekday').value);
      const startTime = document.getElementById('recurringStartTime').value;
      const endTime = document.getElementById('recurringEndTime').value;
      const presencialCount = Number(document.getElementById('recurringPresencialCount').value) || 0;
      const virtualCount = Number(document.getElementById('recurringVirtualCount').value) || 0;
      const room = document.getElementById('recurringRoom').value.trim();
      const classCode = document.getElementById('recurringCode').value.trim();
      if (!subjectId || !startTime || !endTime) return;

      const submitBtn = recurringClassForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      const result = await generateRecurringClasses({ subjectId, weekday, startTime, endTime, presencialCount, virtualCount, room, classCode });
      if (submitBtn) submitBtn.disabled = false;

      if (!result.ok) {
        if (recurringNotice) { recurringNotice.className = 'notice show error'; recurringNotice.textContent = result.message; }
        return;
      }
      recurringClassForm.reset();
      resetRoomCodeFields(recurringClassForm);
      recurringClassForm.classList.add('hidden');
      if (recurringNotice) recurringNotice.className = 'notice';
      renderCalendarViews();
      alert(`Se generaron ${result.count} clases para el cuatrimestre activo.`);
    });
  }

  const importHolidaysBtn = document.getElementById('importHolidaysBtn');
  const importHolidaysForm = document.getElementById('importHolidaysForm');
  const cancelImportHolidays = document.getElementById('cancelImportHolidays');
  const importHolidaysNotice = document.getElementById('importHolidaysNotice');

  if (importHolidaysBtn && importHolidaysForm) {
    importHolidaysBtn.addEventListener('click', () => {
      if (!isAdminView()) return;
      if (newCalendarEventForm) newCalendarEventForm.classList.add('hidden');
      if (recurringClassForm) recurringClassForm.classList.add('hidden');
      importHolidaysForm.classList.toggle('hidden');
      if (!importHolidaysForm.classList.contains('hidden')) {
        const yearInput = document.getElementById('importHolidaysYear');
        if (yearInput && !yearInput.value) yearInput.value = new Date().getFullYear();
      }
    });
  }

  if (cancelImportHolidays && importHolidaysForm) {
    cancelImportHolidays.addEventListener('click', () => {
      importHolidaysForm.classList.add('hidden');
      if (importHolidaysNotice) importHolidaysNotice.className = 'notice';
    });
  }

  if (importHolidaysForm) {
    importHolidaysForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!isAdminView()) return;
      const year = Number(document.getElementById('importHolidaysYear').value);
      if (!year) return;

      const submitBtn = importHolidaysForm.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Importando...'; }
      const result = await importArgentinaHolidays(year);
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Importar'; }

      if (!result.ok) {
        if (importHolidaysNotice) { importHolidaysNotice.className = 'notice show error'; importHolidaysNotice.textContent = result.message; }
        return;
      }
      if (importHolidaysNotice) {
        importHolidaysNotice.className = 'notice show';
        importHolidaysNotice.textContent = `Se agregaron ${result.added} feriados${result.skipped ? ` (${result.skipped} ya estaban cargados)` : ''}.`;
      }
      renderCalendarViews();
    });
  }

  function wireCalendarListContainer(container) {
    if (!container) return;
    container.addEventListener('click', event => {
      if (!isAdminView()) return;
      const editBtn = event.target.closest('[data-calendar-edit]');
      if (editBtn) {
        state.editingCalendarId = editBtn.dataset.calendarEdit;
        renderCalendarList();
        return;
      }
      const cancelBtn = event.target.closest('[data-calendar-cancel]');
      if (cancelBtn) {
        state.editingCalendarId = null;
        renderCalendarList();
        return;
      }
      const deleteBtn = event.target.closest('[data-calendar-delete]');
      if (deleteBtn) {
        deleteCalendarEvent(deleteBtn.dataset.calendarDelete).then(renderCalendarViews);
        return;
      }
      const deleteSeriesBtn = event.target.closest('[data-calendar-delete-series]');
      if (deleteSeriesBtn) {
        if (!confirm('¿Borrar todas las clases de esta serie recurrente?')) return;
        state.editingCalendarId = null;
        state.editingClassSeriesId = null;
        deleteCalendarSeries(deleteSeriesBtn.dataset.calendarDeleteSeries).then(renderCalendarViews);
        return;
      }
      const seriesEditBtn = event.target.closest('[data-class-series-edit]');
      if (seriesEditBtn) {
        state.editingClassSeriesId = seriesEditBtn.dataset.classSeriesEdit;
        renderCalendarList();
        return;
      }
      const seriesCancelBtn = event.target.closest('[data-class-series-cancel]');
      if (seriesCancelBtn) {
        state.editingClassSeriesId = null;
        renderCalendarList();
      }
    });

    container.addEventListener('change', event => {
      const toggle = event.target.closest('.room-toggle, .code-toggle');
      if (!toggle) return;
      const inputName = toggle.classList.contains('room-toggle') ? 'room' : 'classCode';
      const input = toggle.closest('form').querySelector(`input[name="${inputName}"]`);
      if (!input) return;
      input.classList.toggle('hidden', !toggle.checked);
      if (!toggle.checked) input.value = '';
    });

    container.addEventListener('submit', async event => {
      const form = event.target.closest('[data-calendar-edit-form]');
      if (!form || !isAdminView()) return;
      event.preventDefault();
      const id = form.dataset.calendarEditForm;
      await updateCalendarEvent(id, {
        title: form.title.value.trim(),
        date: form.date.value,
        type: form.type.value,
        endDate: form.endDate.value,
        startTime: form.startTime.value,
        endTime: form.endTime.value,
        subjectId: form.subjectId.value,
        modality: form.modality.value,
        room: form.room.value.trim(),
        classCode: form.classCode.value.trim()
      });
      state.editingCalendarId = null;
      renderCalendarViews();
    });

    container.addEventListener('submit', async event => {
      const seriesForm = event.target.closest('[data-class-series-edit-form]');
      if (!seriesForm || !isAdminView()) return;
      event.preventDefault();
      const seriesId = seriesForm.dataset.classSeriesEditForm;
      await updateCalendarSeriesRoomAndCode(seriesId, seriesForm.room.value.trim(), seriesForm.classCode.value.trim());

      const presencialRaw = seriesForm.presencialCount.value.trim();
      const virtualRaw = seriesForm.virtualCount.value.trim();
      const anchorDate = seriesForm.anchorDate.value;
      if (presencialRaw !== '' || virtualRaw !== '') {
        await recalculateSeriesModality(seriesId, Number(presencialRaw) || 0, Number(virtualRaw) || 0, anchorDate);
      }

      state.editingClassSeriesId = null;
      renderCalendarViews();
    });
  }

  wireCalendarListContainer(document.getElementById('calendarFull'));
  wireCalendarListContainer(document.getElementById('calendarClasesList'));

  const forumListEl = document.getElementById('forumList');
  if (forumListEl) {
    forumListEl.addEventListener('click', event => {
      if (!isAdminView()) return;
      const editBtn = event.target.closest('[data-forum-edit]');
      if (editBtn) {
        state.editingForumId = editBtn.dataset.forumEdit;
        renderForumList();
        return;
      }
      const cancelBtn = event.target.closest('[data-forum-cancel]');
      if (cancelBtn) {
        state.editingForumId = null;
        renderForumList();
        return;
      }
      const deleteBtn = event.target.closest('[data-forum-delete]');
      if (deleteBtn) {
        deleteForumPost(deleteBtn.dataset.forumDelete).then(renderForumViews);
      }
    });

    forumListEl.addEventListener('submit', async event => {
      const form = event.target.closest('[data-forum-edit-form]');
      if (!form || !isAdminView()) return;
      event.preventDefault();
      const id = form.dataset.forumEditForm;
      await updateForumPost(id, {
        title: form.title.value.trim(),
        content: form.content.value.trim()
      });
      state.editingForumId = null;
      renderForumViews();
    });
  }

  const subjectForumForm = document.getElementById('subjectForumForm');
  const subjectOpinionForm = document.getElementById('subjectOpinionForm');
  const opinionFilterToggle = document.getElementById('opinionFilterToggle');
  const opinionAddToggle = document.getElementById('opinionAddToggle');
  const opinionFilters = document.getElementById('opinionFilters');

  if (opinionFilterToggle && opinionFilters) {
    opinionFilterToggle.addEventListener('click', () => {
      opinionFilters.classList.toggle('hidden');
    });
  }

  if (opinionAddToggle && subjectOpinionForm) {
    opinionAddToggle.addEventListener('click', () => {
      subjectOpinionForm.classList.toggle('hidden');
    });
  }
  const unitForm = document.getElementById('unitForm');
  const contentItemForm = document.getElementById('contentItemForm');
  const contentTypeSelect = document.getElementById('contentTypeSelect');
  const contentItemNotice = document.getElementById('contentItemNotice');
  const pollForm = document.getElementById('pollForm');
  const MAX_FILE_SIZE = 15 * 1024 * 1024;

  if (contentTypeSelect) {
    contentTypeSelect.addEventListener('change', () => {
      const type = contentTypeSelect.value;
      document.getElementById('contentFileInput').classList.toggle('hidden', type !== 'pdf');
      document.getElementById('contentBodyWrapper').classList.toggle('hidden', type !== 'clase');
      document.getElementById('contentVideoWrapper').classList.toggle('hidden', type !== 'video');
      if (type === 'clase') initClaseEditor();
    });
  }

  const claseImportFillBtn = document.getElementById('claseImportFillBtn');
  if (claseImportFillBtn) {
    claseImportFillBtn.addEventListener('click', async () => {
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      const notice = document.getElementById('claseImportNotice');
      if (!subject || !isAdminView() || !supabaseClient) return;

      const htmlFile = document.getElementById('claseImportHtmlInput').files[0];
      if (!htmlFile) {
        notice.className = 'notice show error';
        notice.textContent = 'Elegí primero el archivo "Clase N.html".';
        return;
      }

      claseImportFillBtn.disabled = true;
      claseImportFillBtn.textContent = 'Importando…';
      notice.className = 'notice show';
      notice.textContent = 'Leyendo el archivo…';

      try {
        const html = await decodeHtmlFile(htmlFile);
        const extracted = extractClaseFromHtml(html);
        if (!extracted) {
          notice.className = 'notice show error';
          notice.textContent = 'No se pudo encontrar el contenido de la clase en ese archivo.';
          return;
        }

        const assetFiles = Array.from(document.getElementById('claseImportAssetsInput').files || []);
        const assetsByName = new Map(assetFiles.map(file => [file.name, file]));
        const imgEls = [...extracted.bodyEl.querySelectorAll('img[src^="./"]')];
        let uploaded = 0;
        for (const img of imgEls) {
          const ref = img.getAttribute('src').replace(/^\.\//, '');
          const basename = ref.split('/').pop();
          const assetFile = assetsByName.get(basename);
          if (!assetFile) continue;
          const url = await uploadClaseImage(subject.id, assetFile);
          if (url) { img.setAttribute('src', url); uploaded += 1; }
        }

        const titleInput = document.getElementById('contentTitleInput');
        if (extracted.title) titleInput.value = extracted.title;

        const bodyHtml = extracted.bodyEl.innerHTML.trim();
        const editor = getClaseEditorContent();
        if (editor) editor.setContent(bodyHtml);
        else document.getElementById('contentBodyInput').value = bodyHtml;

        notice.className = 'notice show';
        notice.textContent = `Listo: se completó el título y el contenido (${uploaded}/${imgEls.length} imágenes subidas). Revisá y guardá con "Agregar contenido".`;
      } catch (error) {
        notice.className = 'notice show error';
        notice.textContent = 'Error al importar: ' + error.message;
      }

      claseImportFillBtn.disabled = false;
      claseImportFillBtn.textContent = 'Completar título y contenido desde el HTML';
    });
  }

  if (unitForm) {
    unitForm.addEventListener('submit', async event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      if (!subject || !isAdminView() || !supabaseClient) return;
      const input = document.getElementById('unitTitleInput');
      const title = input.value.trim();
      if (!title) return;

      const submitBtn = unitForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      const { data, error } = await supabaseClient
        .from('subject_units')
        .insert({ subject_id: subject.id, title })
        .select().single();
      if (submitBtn) submitBtn.disabled = false;

      if (error) {
        alert('No se pudo crear la unidad: ' + error.message);
        return;
      }
      const newUnit = { id: data.id, title: data.title, items: [] };
      subject.units.push(newUnit);
      state.currentUnitId = newUnit.id;
      renderSubjectLists(subject);
      refreshContentUnitSelect(subject);
      unitForm.reset();
    });
  }

  if (contentItemForm) {
    contentItemForm.addEventListener('submit', async event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      if (!subject || !isAdminView() || !supabaseClient) return;

      const unitId = document.getElementById('contentUnitSelect').value;
      const unit = subject.units.find(item => item.id === unitId);
      const type = document.getElementById('contentTypeSelect').value;
      const title = document.getElementById('contentTitleInput').value.trim();

      if (unit) state.currentUnitId = unit.id;

      if (!unit) {
        if (contentItemNotice) {
          contentItemNotice.className = 'notice show error';
          contentItemNotice.textContent = 'Primero creá una unidad para poder agregar contenido.';
        }
        return;
      }
      if (!title) return;

      if (type === 'pdf') {
        const file = document.getElementById('contentFileInput').files[0];
        if (!file) return;
        if (file.size > MAX_FILE_SIZE) {
          if (contentItemNotice) {
            contentItemNotice.className = 'notice show error';
            contentItemNotice.textContent = 'El archivo supera el tamaño máximo permitido (15 MB).';
          }
          return;
        }

        const submitBtn = contentItemForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Subiendo...';

        const path = `${subject.id}/${generateLocalId('pdf')}_${sanitizeStorageFilename(file.name)}`;
        const { error: uploadError } = await supabaseClient.storage
          .from('subject-content')
          .upload(path, file, { contentType: file.type || 'application/pdf' });

        if (uploadError) {
          if (submitBtn) submitBtn.textContent = 'Agregar contenido';
          if (contentItemNotice) {
            contentItemNotice.className = 'notice show error';
            contentItemNotice.textContent = 'No se pudo subir el PDF: ' + uploadError.message;
          }
          return;
        }

        const { data: urlData } = supabaseClient.storage.from('subject-content').getPublicUrl(path);
        const uploadedBy = getFullName(state.currentUser);
        const { data, error } = await supabaseClient
          .from('subject_content_items')
          .insert({
            unit_id: unit.id, subject_id: subject.id, type: 'pdf', title,
            file_name: file.name, url: urlData.publicUrl, storage_path: path, uploaded_by: uploadedBy,
            position: unit.items.length
          })
          .select().single();

        if (submitBtn) submitBtn.textContent = 'Agregar contenido';

        if (error) {
          await supabaseClient.storage.from('subject-content').remove([path]);
          if (contentItemNotice) {
            contentItemNotice.className = 'notice show error';
            contentItemNotice.textContent = 'El PDF se subió pero no se pudo guardar la referencia: ' + error.message;
          }
          return;
        }

        const newItem = mapContentItemRow(data);
        unit.items.push(newItem);
        state.currentItemId = newItem.id;
        renderSubjectLists(subject);
        contentItemForm.reset();
        if (contentItemNotice) contentItemNotice.className = 'notice';
      } else if (type === 'video') {
        const rawUrl = document.getElementById('contentVideoUrlInput').value.trim();
        if (!rawUrl) return;
        const body = driveEmbedUrl(rawUrl);

        const uploadedBy = getFullName(state.currentUser);
        const { data, error } = await supabaseClient
          .from('subject_content_items')
          .insert({ unit_id: unit.id, subject_id: subject.id, type: 'video', title, body, uploaded_by: uploadedBy, position: unit.items.length })
          .select().single();

        if (error) {
          if (contentItemNotice) {
            contentItemNotice.className = 'notice show error';
            contentItemNotice.textContent = 'No se pudo guardar el video: ' + error.message;
          }
          return;
        }

        const newItem = mapContentItemRow(data);
        unit.items.push(newItem);
        state.currentRecordedId = newItem.id;
        state.navGroupsOpen.grabadas = true;
        renderSubjectLists(subject);
        setSubjectTab('grabadas');
        contentItemForm.reset();
        document.getElementById('contentFileInput').classList.remove('hidden');
        document.getElementById('contentVideoWrapper').classList.add('hidden');
        if (contentItemNotice) contentItemNotice.className = 'notice';
      } else {
        const editor = getClaseEditorContent();
        const body = (editor ? editor.getContent() : document.getElementById('contentBodyInput').value).trim();
        if (!body) return;

        const uploadedBy = getFullName(state.currentUser);
        const { data, error } = await supabaseClient
          .from('subject_content_items')
          .insert({ unit_id: unit.id, subject_id: subject.id, type: 'clase', title, body, uploaded_by: uploadedBy, position: unit.items.length })
          .select().single();

        if (error) {
          if (contentItemNotice) {
            contentItemNotice.className = 'notice show error';
            contentItemNotice.textContent = 'No se pudo guardar la clase: ' + error.message;
          }
          return;
        }

        const newItem = mapContentItemRow(data);
        unit.items.push(newItem);
        state.currentItemId = newItem.id;
        renderSubjectLists(subject);
        contentItemForm.reset();
        if (editor) editor.setContent('');
        document.getElementById('contentFileInput').classList.remove('hidden');
        document.getElementById('contentBodyWrapper').classList.add('hidden');
        if (contentItemNotice) contentItemNotice.className = 'notice';
      }
    });
  }

  if (pollForm) {
    pollForm.addEventListener('submit', async event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      if (!subject || !state.currentUser || !supabaseClient) return;

      const question = document.getElementById('pollQuestionInput').value.trim();
      const optionsRaw = document.getElementById('pollOptionsInput').value.trim();
      const optionLabels = optionsRaw.split(',').map(value => value.trim()).filter(Boolean);
      if (!question || optionLabels.length < 2) return;

      const submitBtn = pollForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const createdByName = getFullName(state.currentUser);
      const { data: pollRow, error: pollError } = await supabaseClient
        .from('subject_polls')
        .insert({ subject_id: subject.id, created_by_id: state.currentUser.id, created_by_name: createdByName, question })
        .select().single();

      if (pollError) {
        if (submitBtn) submitBtn.disabled = false;
        alert('No se pudo crear la encuesta: ' + pollError.message);
        return;
      }

      const { data: optionRows, error: optionsError } = await supabaseClient
        .from('subject_poll_options')
        .insert(optionLabels.map((label, index) => ({ poll_id: pollRow.id, label, position: index })))
        .select();

      if (submitBtn) submitBtn.disabled = false;

      if (optionsError) {
        await supabaseClient.from('subject_polls').delete().eq('id', pollRow.id);
        alert('No se pudo crear la encuesta: ' + optionsError.message);
        return;
      }

      subject.polls.unshift({
        id: pollRow.id,
        question: pollRow.question,
        createdBy: pollRow.created_by_name,
        options: [...optionRows].sort((a, b) => a.position - b.position).map(row => ({ id: row.id, label: row.label, votes: [] }))
      });
      renderPolls(subject);
      pollForm.reset();
    });
  }

  if (subjectForumForm) {
    subjectForumForm.addEventListener('submit', async event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      const input = document.getElementById('subjectForumInput');
      const content = input.value.trim();
      if (!subject || !state.currentUser || !content || !supabaseClient) return;

      const { data, error } = await supabaseClient
        .from('subject_forum_posts')
        .insert({ subject_id: subject.id, author_id: state.currentUser.id, author_name: getFullName(state.currentUser), content })
        .select().single();
      if (error) { alert('No se pudo publicar: ' + error.message); return; }

      subject.forum.unshift({ id: data.id, author: data.author_name, authorId: data.author_id, content: data.content });
      renderSubjectLists(subject);
      subjectForumForm.reset();
    });
  }

  const subjectSummaryForm = document.getElementById('subjectSummaryForm');
  const subjectSummaryNotice = document.getElementById('subjectSummaryNotice');

  if (subjectSummaryForm) {
    subjectSummaryForm.addEventListener('submit', async event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      if (!subject || !state.currentUser || !supabaseClient) return;

      const title = document.getElementById('summaryTitleInput').value.trim();
      const file = document.getElementById('summaryFileInput').files[0];
      if (!title || !file) return;

      if (file.size > MAX_FILE_SIZE) {
        if (subjectSummaryNotice) {
          subjectSummaryNotice.className = 'notice show error';
          subjectSummaryNotice.textContent = 'El archivo supera el tamaño máximo permitido (15 MB).';
        }
        return;
      }

      const submitBtn = subjectSummaryForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.textContent = 'Subiendo...';

      const path = `summaries/${subject.id}/${state.currentUser.id}/${generateLocalId('summary')}_${sanitizeStorageFilename(file.name)}`;
      const { error: uploadError } = await supabaseClient.storage
        .from('subject-content')
        .upload(path, file, { contentType: file.type || 'application/pdf' });

      if (uploadError) {
        if (submitBtn) submitBtn.textContent = 'Subir resumen';
        if (subjectSummaryNotice) {
          subjectSummaryNotice.className = 'notice show error';
          subjectSummaryNotice.textContent = 'No se pudo subir el archivo: ' + uploadError.message;
        }
        return;
      }

      const { data: urlData } = supabaseClient.storage.from('subject-content').getPublicUrl(path);
      const authorName = getFullName(state.currentUser);
      const { data, error } = await supabaseClient
        .from('subject_summaries')
        .insert({
          subject_id: subject.id, author_id: state.currentUser.id, author_name: authorName,
          title, file_name: file.name, url: urlData.publicUrl, storage_path: path
        })
        .select().single();

      if (submitBtn) submitBtn.textContent = 'Subir resumen';

      if (error) {
        await supabaseClient.storage.from('subject-content').remove([path]);
        if (subjectSummaryNotice) {
          subjectSummaryNotice.className = 'notice show error';
          subjectSummaryNotice.textContent = 'El archivo se subió pero no se pudo guardar la referencia: ' + error.message;
        }
        return;
      }

      subject.summaries.unshift(mapSummaryRow(data));
      renderSummaries(subject);
      subjectSummaryForm.reset();
      if (subjectSummaryNotice) subjectSummaryNotice.className = 'notice';
    });
  }

  const subjectOpinionStars = document.getElementById('subjectOpinionStars');
  const subjectOpinionNotice = document.getElementById('subjectOpinionNotice');

  if (subjectOpinionStars) {
    subjectOpinionStars.querySelectorAll('.star-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rating = Number(btn.dataset.star);
        subjectOpinionStars.dataset.rating = String(rating);
        subjectOpinionStars.querySelectorAll('.star-btn').forEach(other => {
          other.classList.toggle('active', Number(other.dataset.star) <= rating);
        });
      });
    });
  }

  if (subjectOpinionForm) {
    subjectOpinionForm.addEventListener('submit', async event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      const professorInput = document.getElementById('subjectOpinionProfessor');
      const professor = professorInput.value.trim();
      const contentInput = document.getElementById('subjectOpinionInput');
      const content = contentInput.value.trim();
      const rating = Number(subjectOpinionStars ? subjectOpinionStars.dataset.rating : 0);
      if (!subject || !state.currentUser || !supabaseClient) return;

      if (!professor || !rating) {
        if (subjectOpinionNotice) {
          subjectOpinionNotice.className = 'notice show error';
          subjectOpinionNotice.textContent = 'Completá el nombre del profesor/a y elegí de 1 a 5 estrellas.';
        }
        return;
      }

      const authorName = getFullName(state.currentUser);
      const { data, error } = await supabaseClient
        .from('subject_opinions')
        .insert({ subject_id: subject.id, author_id: state.currentUser.id, author_name: authorName, professor, rating, content })
        .select().single();

      if (error) {
        if (subjectOpinionNotice) {
          subjectOpinionNotice.className = 'notice show error';
          subjectOpinionNotice.textContent = 'No se pudo publicar la opinión: ' + error.message;
        }
        return;
      }

      subject.opinions.unshift({ id: data.id, professor: data.professor, rating: data.rating, content: data.content, author: data.author_name, authorId: data.author_id });
      renderSubjectLists(subject);
      subjectOpinionForm.reset();
      subjectOpinionForm.classList.add('hidden');
      if (subjectOpinionNotice) subjectOpinionNotice.className = 'notice';
      if (subjectOpinionStars) {
        subjectOpinionStars.dataset.rating = '0';
        subjectOpinionStars.querySelectorAll('.star-btn').forEach(btn => btn.classList.remove('active'));
      }
    });
  }

  const opinionProfessorFilter = document.getElementById('opinionProfessorFilter');
  const opinionStarFilter = document.getElementById('opinionStarFilter');

  if (opinionProfessorFilter) {
    opinionProfessorFilter.addEventListener('change', event => {
      state.opinionProfessorFilter = event.target.value;
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      if (subject) renderOpinions(subject);
    });
  }

  if (opinionStarFilter) {
    opinionStarFilter.addEventListener('change', event => {
      state.opinionStarFilter = event.target.value;
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      if (subject) renderOpinions(subject);
    });
  }
}

function renderAdminSubjectsTable() {
  const target = document.getElementById('adminSubjectsTable');
  if (!target) return;

  const subjects = state.data.subjects.slice().sort((a, b) => Number(a.code) - Number(b.code));

  const rows = subjects.map(subject => `
    <tr data-subject-id="${subject.id}">
      <td>${subject.code}</td>
      <td>${subject.name}</td>
      <td>${subject.year}° año · ${subject.semester}° cuatrimestre</td>
      <td>${subject.correlatives.length ? correlativeCodes(subject) : 'Sin correlativas'}</td>
      <td>
        <button type="button" class="ghost-btn small-btn" data-edit-subject="${subject.id}">Editar</button>
        <button type="button" class="ghost-btn small-btn danger-btn" data-delete-subject="${subject.id}">Eliminar</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="5" class="table-empty">Todavía no hay materias cargadas.</td></tr>';

  target.innerHTML = `
    <div class="table-scroll">
      <table class="admin-table">
        <thead>
          <tr><th>Código</th><th>Materia</th><th>Año</th><th>Correlativas</th><th>Acciones</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  target.querySelectorAll('[data-edit-subject]').forEach(button => {
    button.addEventListener('click', () => startEditSubject(button.dataset.editSubject));
  });

  target.querySelectorAll('[data-delete-subject]').forEach(button => {
    button.addEventListener('click', () => deleteSubject(button.dataset.deleteSubject));
  });
}

async function loadAndRenderAdminUsers() {
  const target = document.getElementById('adminUsersTable');
  const notice = document.getElementById('usersNotice');
  if (!target || !supabaseClient) return;

  target.innerHTML = '<p class="table-empty">Cargando usuarios...</p>';

  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .order('last_name', { nullsFirst: true })
    .order('name');

  if (error) {
    target.innerHTML = '';
    if (notice) {
      notice.className = 'notice show error';
      notice.textContent = 'No se pudieron cargar los usuarios: ' + error.message;
    }
    return;
  }

  if (notice) notice.className = 'notice';
  renderAdminUsersTable(data || []);
}

async function callAdminUsersFunction(action, userId) {
  const { data: sessionData } = await supabaseClient.auth.getSession();
  const token = sessionData && sessionData.session ? sessionData.session.access_token : null;
  if (!token) return { ok: false, message: 'Sesión inválida.' };
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ action, userId })
    });
    const result = await response.json();
    if (!response.ok) return { ok: false, message: result.error || 'No se pudo completar la acción.' };
    return { ok: true, ...result };
  } catch (error) {
    return { ok: false, message: 'No se pudo contactar la función de administración (¿está desplegada?).' };
  }
}

function renderAdminUsersTable(users) {
  const target = document.getElementById('adminUsersTable');
  if (!target) return;

  const rows = users.map(profile => {
    const isSelf = state.currentUser && profile.id === state.currentUser.id;
    const isAdmin = profile.role === 'admin';
    const isBanned = !!profile.banned;
    const toggleLabel = isAdmin ? 'Quitar admin' : 'Hacer admin';
    const selfAttrs = isSelf ? 'disabled title="No podés aplicarte esta acción a vos mismo"' : '';
    return `
      <tr data-user-id="${profile.id}">
        <td data-cell="name">${escapeHtml(profile.name || '')}</td>
        <td data-cell="last-name">${escapeHtml(profile.last_name || '')}</td>
        <td>${profile.email}</td>
        <td><span class="subject-status-badge ${isAdmin ? 'status-aprobada' : 'status-cursable'}">${isAdmin ? 'Administrador' : 'Estudiante'}</span></td>
        <td>${profile.email_verified ? 'Verificado' : 'Pendiente'}${isBanned ? ' · <span class="subject-status-badge status-no-cursable">Suspendido</span>' : ''}</td>
        <td class="stack-row">
          <button type="button" class="ghost-btn small-btn" data-edit-name="${profile.id}">Editar nombre</button>
          <button type="button" class="ghost-btn small-btn" data-toggle-role="${profile.id}" data-current-role="${profile.role}" ${selfAttrs}>${toggleLabel}</button>
          <button type="button" class="ghost-btn small-btn" data-toggle-ban="${profile.id}" data-current-banned="${isBanned}" ${selfAttrs}>${isBanned ? 'Desbanear' : 'Banear'}</button>
          <button type="button" class="ghost-btn small-btn" data-reset-password="${profile.id}" data-email="${profile.email}" data-name="${escapeHtml(profile.name || '')}">Cambiar contraseña</button>
          <button type="button" class="ghost-btn small-btn danger-btn" data-delete-user="${profile.id}" data-name="${escapeHtml([profile.name, profile.last_name].filter(Boolean).join(' '))}" ${selfAttrs}>Eliminar</button>
        </td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="6" class="table-empty">Todavía no hay usuarios registrados.</td></tr>';

  target.innerHTML = `
    <div class="table-scroll">
      <table class="admin-table">
        <thead>
          <tr><th>Nombre/s</th><th>Apellido/s</th><th>Correo</th><th>Rol</th><th>Correo verificado</th><th>Acciones</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  function setNotice(text, isError) {
    const notice = document.getElementById('usersNotice');
    if (!notice) return;
    notice.className = isError ? 'notice show error' : 'notice show';
    notice.textContent = text;
  }

  target.querySelectorAll('[data-toggle-role]').forEach(button => {
    button.addEventListener('click', async () => {
      const userId = button.dataset.toggleRole;
      const newRole = button.dataset.currentRole === 'admin' ? 'student' : 'admin';
      button.disabled = true;
      const { error } = await supabaseClient.from('profiles').update({ role: newRole }).eq('id', userId);
      if (error) {
        setNotice('No se pudo actualizar el rol: ' + error.message, true);
        button.disabled = false;
        return;
      }
      setNotice('Rol actualizado.', false);
      loadAndRenderAdminUsers();
    });
  });

  target.querySelectorAll('[data-edit-name]').forEach(button => {
    button.addEventListener('click', () => {
      const userId = button.dataset.editName;
      const profile = users.find(item => item.id === userId);
      const row = button.closest('tr');
      if (!profile || !row || row.querySelector('[data-name-input]')) return;
      const nameCell = row.querySelector('[data-cell="name"]');
      const lastNameCell = row.querySelector('[data-cell="last-name"]');
      nameCell.innerHTML = `<input type="text" class="admin-name-input" data-name-input aria-label="Nombre/s" value="${escapeHtml(profile.name || '')}" />`;
      lastNameCell.innerHTML = `
        <input type="text" class="admin-name-input" aria-label="Apellido/s" value="${escapeHtml(profile.last_name || '')}" />
        <div class="stack-row admin-name-actions">
          <button type="button" class="small-btn" data-save-name>Guardar</button>
          <button type="button" class="ghost-btn small-btn" data-cancel-name>Cancelar</button>
        </div>
      `;
      const nameInput = nameCell.querySelector('input');
      const lastNameInput = lastNameCell.querySelector('input');
      const saveBtn = lastNameCell.querySelector('[data-save-name]');
      const cancel = () => renderAdminUsersTable(users);
      nameInput.focus();

      const save = async () => {
        const name = formatPersonName(nameInput.value);
        const lastName = formatPersonName(lastNameInput.value);
        if (!name || !lastName) {
          setNotice('Completá nombre y apellido.', true);
          return;
        }
        saveBtn.disabled = true;
        const { error } = await supabaseClient
          .from('profiles')
          .update({ name, last_name: lastName, avatar: name.charAt(0).toUpperCase() })
          .eq('id', userId);
        if (error) {
          setNotice('No se pudo actualizar el nombre: ' + error.message, true);
          saveBtn.disabled = false;
          return;
        }
        setNotice('Nombre actualizado.', false);
        loadAndRenderAdminUsers();
      };

      saveBtn.addEventListener('click', save);
      lastNameCell.querySelector('[data-cancel-name]').addEventListener('click', cancel);
      [nameInput, lastNameInput].forEach(input => input.addEventListener('keydown', event => {
        if (event.key === 'Enter') save();
        if (event.key === 'Escape') cancel();
      }));
    });
  });

  target.querySelectorAll('[data-toggle-ban]').forEach(button => {
    button.addEventListener('click', async () => {
      const userId = button.dataset.toggleBan;
      const isBanned = button.dataset.currentBanned === 'true';
      const action = isBanned ? 'unban' : 'ban';
      if (!isBanned && !window.confirm('¿Suspender a este usuario? No va a poder iniciar sesión hasta que lo desbanees.')) return;
      button.disabled = true;
      const result = await callAdminUsersFunction(action, userId);
      if (!result.ok) {
        setNotice(result.message, true);
        button.disabled = false;
        return;
      }
      setNotice(isBanned ? 'Usuario desbaneado.' : 'Usuario suspendido.', false);
      loadAndRenderAdminUsers();
    });
  });

  target.querySelectorAll('[data-delete-user]').forEach(button => {
    button.addEventListener('click', async () => {
      const userId = button.dataset.deleteUser;
      const name = button.dataset.name;
      if (!window.confirm(`¿Eliminar definitivamente la cuenta de ${name}? Esta acción no se puede deshacer.`)) return;
      button.disabled = true;
      const result = await callAdminUsersFunction('delete', userId);
      if (!result.ok) {
        setNotice(result.message, true);
        button.disabled = false;
        return;
      }
      setNotice('Usuario eliminado.', false);
      loadAndRenderAdminUsers();
    });
  });

  target.querySelectorAll('[data-reset-password]').forEach(button => {
    button.addEventListener('click', async () => {
      const userId = button.dataset.resetPassword;
      const email = button.dataset.email;
      const name = button.dataset.name;
      if (!window.confirm(`¿Enviarle a ${name} un código de un solo uso para que elija una contraseña nueva?`)) return;
      button.disabled = true;
      const result = await callAdminUsersFunction('reset_password', userId);
      if (!result.ok) {
        setNotice(result.message, true);
        button.disabled = false;
        return;
      }
      const emailResult = await sendVerificationEmail(email, name, result.code, '30 minutos');
      if (!emailResult.ok) {
        setNotice('Se generó el código pero no se pudo enviar el correo: ' + emailResult.message, true);
        button.disabled = false;
        return;
      }
      setNotice('Código enviado a ' + email + '. Válido por 30 minutos.', false);
      button.disabled = false;
    });
  });
}

function resetSubjectForm() {
  const form = document.getElementById('subjectForm');
  const notice = document.getElementById('subjectFormNotice');
  const title = document.getElementById('subjectFormTitle');
  const submitBtn = document.getElementById('subjectFormSubmit');
  const cancelBtn = document.getElementById('subjectFormCancel');
  const editId = document.getElementById('subjectEditId');

  if (form) form.reset();
  if (notice) notice.className = 'notice';
  if (editId) editId.value = '';
  if (title) title.textContent = 'Agregar materia';
  if (submitBtn) submitBtn.textContent = 'Agregar materia';
  if (cancelBtn) cancelBtn.classList.add('hidden');
}

function startEditSubject(subjectId) {
  const subject = state.data.subjects.find(item => item.id === subjectId);
  if (!subject) return;

  document.getElementById('subjectEditId').value = subject.id;
  document.getElementById('subjectCode').value = subject.code;
  document.getElementById('subjectYearInput').value = subject.year;
  document.getElementById('subjectSemester').value = subject.semester;
  document.getElementById('subjectName').value = subject.name;
  document.getElementById('subjectHours').value = subject.hours;
  document.getElementById('subjectModality').value = subject.modality;
  document.getElementById('subjectCorrelatives').value = correlativeCodes(subject) === 'Sin correlativas' ? '' : correlativeCodes(subject);
  document.getElementById('subjectLibre').value = subject.libre;
  document.getElementById('subjectExamFinal').value = subject.examFinal;
  document.getElementById('subjectAnySemester').checked = !!subject.anySemester;

  document.getElementById('subjectFormTitle').textContent = `Editar materia (código ${subject.code})`;
  document.getElementById('subjectFormSubmit').textContent = 'Guardar cambios';
  document.getElementById('subjectFormCancel').classList.remove('hidden');
  document.getElementById('subjectForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function deleteSubject(subjectId) {
  const subject = state.data.subjects.find(item => item.id === subjectId);
  if (!subject) return;
  if (!window.confirm(`¿Eliminar la materia "${subject.name}"? Esta acción no se puede deshacer.`)) return;

  if (supabaseClient) {
    const { error } = await supabaseClient.from('subjects').delete().eq('id', subjectId);
    if (error) {
      window.alert('No se pudo eliminar la materia en Supabase: ' + error.message);
      return;
    }
  }

  state.data.subjects = state.data.subjects.filter(item => item.id !== subjectId);
  state.data.subjects.forEach(item => {
    item.correlatives = item.correlatives.filter(id => id !== subjectId);
  });

  if (state.currentUser) enforceCorrelativityAndPersist(state.currentUser.email);
  renderAdminSubjectsTable();
  updateAdminHeader(state.currentUser);
  resetSubjectForm();
}

// ---- Sección "Discord" del panel de admin: mensajes puntuales,
// programados y plantilla de PDFs por materia. Todo pasa por Supabase
// (nunca el token del bot) — el bot de Discord hace polling de estas
// tablas y ejecuta las acciones. Ver iupfa-bot/src/outbox.js, scheduler.js
// y autopost.js.
function populateTemplateSubjectSelect() {
  const select = document.getElementById('templateSubjectSelect');
  if (!select) return;
  select.innerHTML = state.data.subjects.map(s => `<option value="${s.id}">${s.code} — ${s.name}</option>`).join('');
}

// Espejo de discord_channels (sincronizado por el bot cada 5 min) para
// mostrar un <select> con nombres reales de canal en vez de pedir el ID a mano.
let discordChannelsCache = [];

async function loadDiscordChannels() {
  if (!supabaseClient) return;
  const { data, error } = await supabaseClient.from('discord_channels').select('id, name').order('name');
  if (error) return;
  discordChannelsCache = data || [];

  const options = ['<option value="">Elegí un canal…</option>']
    .concat(discordChannelsCache.map(c => `<option value="${c.id}">#${c.name}</option>`))
    .join('');

  ['outboxChannelId', 'scheduledChannelId'].forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;
    const current = select.value;
    select.innerHTML = options;
    if (current) select.value = current;
  });
}

function channelLabel(channelId) {
  const found = discordChannelsCache.find(c => c.id === channelId);
  return found ? `#${found.name}` : `Canal #${channelId}`;
}

// ---- Barra de Markdown para el textarea del mensaje (Discord usa su propio
// Markdown, no HTML, así que no se reutiliza el editor TinyMCE de las clases).
function applyMarkdown(textarea, action) {
  const wraps = { bold: '**', italic: '*', strike: '~~', code: '`' };
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const selected = value.slice(start, end);

  let before = '', after = '', placeholder = 'texto';
  if (wraps[action]) {
    before = after = wraps[action];
  } else if (action === 'link') {
    before = '['; after = '](https://)'; placeholder = 'texto del enlace';
  } else if (action === 'quote') {
    before = '> '; placeholder = '';
  } else if (action === 'list') {
    before = '- '; placeholder = '';
  } else {
    return;
  }

  const text = selected || placeholder;
  textarea.value = value.slice(0, start) + before + text + after + value.slice(end);
  textarea.focus();
  textarea.selectionStart = start + before.length;
  textarea.selectionEnd = start + before.length + text.length;
}

function setupMarkdownToolbar(prefix) {
  const toolbar = document.getElementById(`${prefix}MdToolbar`);
  const textarea = document.getElementById(`${prefix}Content`);
  if (!toolbar || !textarea) return;
  toolbar.addEventListener('click', event => {
    const btn = event.target.closest('.md-btn');
    if (!btn) return;
    applyMarkdown(textarea, btn.dataset.md);
  });
}

// ---- Constructor de embeds (autor, título, descripción, color, imagen,
// miniatura, campos y footer). Arma el mismo JSON que espera buildEmbed() del
// lado del bot (iupfa-bot/src/utils/embed.js).
function createEmbedFieldRow() {
  const row = document.createElement('div');
  row.className = 'embed-field-row';

  const name = document.createElement('input');
  name.type = 'text'; name.placeholder = 'Nombre'; name.className = 'embed-field-name';

  const value = document.createElement('input');
  value.type = 'text'; value.placeholder = 'Valor'; value.className = 'embed-field-value';

  const inlineLabel = document.createElement('label');
  inlineLabel.className = 'checkbox-row small';
  const inlineCb = document.createElement('input');
  inlineCb.type = 'checkbox'; inlineCb.className = 'embed-field-inline';
  inlineLabel.append(inlineCb, document.createTextNode(' En línea'));

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'ghost-btn icon-btn tiny-btn';
  removeBtn.textContent = '✕';
  removeBtn.addEventListener('click', () => row.remove());

  row.append(name, value, inlineLabel, removeBtn);
  return row;
}

function renderEmbedBuilder(prefix) {
  const container = document.getElementById(`${prefix}EmbedFields`);
  if (!container) return;
  container.innerHTML = `
    <div class="two-cols">
      <input id="${prefix}EmbedAuthorName" type="text" placeholder="Autor: nombre" />
      <input id="${prefix}EmbedAuthorIcon" type="url" placeholder="Autor: URL del ícono" />
    </div>
    <input id="${prefix}EmbedTitle" type="text" placeholder="Título" />
    <textarea id="${prefix}EmbedDescription" placeholder="Descripción (admite Markdown de Discord)" rows="3"></textarea>
    <div class="embed-color-row">
      <input id="${prefix}EmbedColor" type="color" value="#5865f2" />
      <span class="form-hint">Color de la barra lateral</span>
    </div>
    <div class="two-cols">
      <input id="${prefix}EmbedImage" type="url" placeholder="URL de imagen grande" />
      <input id="${prefix}EmbedThumbnail" type="url" placeholder="URL de miniatura" />
    </div>
    <div class="field-group-title">Campos</div>
    <div id="${prefix}EmbedFieldsList" class="stack"></div>
    <button type="button" id="${prefix}AddFieldBtn" class="ghost-btn small-btn">+ Añadir campo</button>
    <div class="two-cols">
      <input id="${prefix}EmbedFooterText" type="text" placeholder="Footer: texto" />
      <input id="${prefix}EmbedFooterIcon" type="url" placeholder="Footer: URL del ícono" />
    </div>
  `;
  const addFieldBtn = document.getElementById(`${prefix}AddFieldBtn`);
  if (addFieldBtn) {
    addFieldBtn.addEventListener('click', () => {
      document.getElementById(`${prefix}EmbedFieldsList`).appendChild(createEmbedFieldRow());
    });
  }
}

function setupEmbedBuilder(prefix) {
  renderEmbedBuilder(prefix);
  const toggle = document.getElementById(`${prefix}EmbedToggle`);
  const fieldsWrap = document.getElementById(`${prefix}EmbedFields`);
  if (toggle && fieldsWrap) {
    toggle.addEventListener('change', () => fieldsWrap.classList.toggle('hidden', !toggle.checked));
  }
}

function resetEmbedBuilder(prefix) {
  const toggle = document.getElementById(`${prefix}EmbedToggle`);
  const fieldsWrap = document.getElementById(`${prefix}EmbedFields`);
  if (toggle) toggle.checked = false;
  if (fieldsWrap) fieldsWrap.classList.add('hidden');
  renderEmbedBuilder(prefix);
}

function collectEmbedData(prefix) {
  const toggle = document.getElementById(`${prefix}EmbedToggle`);
  if (!toggle || !toggle.checked) return null;

  const val = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
  const fields = [...document.querySelectorAll(`#${prefix}EmbedFieldsList .embed-field-row`)].map(row => ({
    name: row.querySelector('.embed-field-name').value.trim(),
    value: row.querySelector('.embed-field-value').value.trim(),
    inline: row.querySelector('.embed-field-inline').checked
  })).filter(f => f.name && f.value);

  const data = {};
  const title = val(`${prefix}EmbedTitle`); if (title) data.title = title;
  const description = val(`${prefix}EmbedDescription`); if (description) data.description = description;
  const color = val(`${prefix}EmbedColor`); if (color) data.color = color;
  const authorName = val(`${prefix}EmbedAuthorName`);
  if (authorName) data.author = { name: authorName, icon_url: val(`${prefix}EmbedAuthorIcon`) || undefined };
  const imageUrl = val(`${prefix}EmbedImage`); if (imageUrl) data.image = { url: imageUrl };
  const thumbUrl = val(`${prefix}EmbedThumbnail`); if (thumbUrl) data.thumbnail = { url: thumbUrl };
  const footerText = val(`${prefix}EmbedFooterText`);
  if (footerText) data.footer = { text: footerText, icon_url: val(`${prefix}EmbedFooterIcon`) || undefined };
  if (fields.length) data.fields = fields;

  return Object.keys(data).length ? data : null;
}

async function loadTemplateForSubject(subjectId) {
  const textarea = document.getElementById('templateContent');
  if (!textarea || !supabaseClient || !subjectId) return;
  const { data } = await supabaseClient.from('subject_message_templates').select('template').eq('subject_id', subjectId).maybeSingle();
  textarea.value = data ? data.template : '';
}

function buildCronFromRecurringForm() {
  const days = Array.from(document.querySelectorAll('.scheduledDay:checked')).map(cb => cb.value);
  if (!days.length) return null;
  const time = (document.getElementById('scheduledTime').value || '09:00').split(':');
  return `${parseInt(time[1], 10)} ${parseInt(time[0], 10)} * * ${days.join(',')}`;
}

function buildScheduledMessageCard(row) {
  const when = row.schedule_type === 'once'
    ? `Una vez · ${new Date(row.run_at).toLocaleString('es-AR')}${row.last_run_at ? ' (ya enviado)' : ''}`
    : `Recurrente · cron "${row.cron_expression}"${row.last_run_at ? ' · último envío ' + new Date(row.last_run_at).toLocaleString('es-AR') : ''}`;
  return `<article class="item-card">
    <strong>${channelLabel(row.channel_id)}</strong>
    <span>${when}${row.enabled ? '' : ' · desactivado'}</span>
    <p>${row.content || ''}${row.embed ? ' <span class="pill">embed</span>' : ''}</p>
    <div class="stack-row">
      <button type="button" class="ghost-btn small-btn" data-scheduled-toggle="${row.id}" data-enabled="${row.enabled}">${row.enabled ? 'Desactivar' : 'Activar'}</button>
      <button type="button" class="ghost-btn small-btn danger-btn" data-scheduled-delete="${row.id}">Eliminar</button>
    </div>
  </article>`;
}

async function loadScheduledMessages() {
  const target = document.getElementById('scheduledList');
  if (!target || !supabaseClient) return;
  const { data, error } = await supabaseClient.from('scheduled_messages').select('*').order('created_at', { ascending: false });
  target.innerHTML = (!error && data && data.length)
    ? data.map(buildScheduledMessageCard).join('')
    : createItemCard('Sin mensajes programados', '', '');
}

async function loadOutboxHistory() {
  const target = document.getElementById('outboxHistory');
  if (!target || !supabaseClient) return;
  const { data, error } = await supabaseClient.from('bot_outbox').select('*').order('created_at', { ascending: false }).limit(10);
  if (error || !data || !data.length) { target.innerHTML = ''; return; }
  target.innerHTML = data.map(row => {
    const status = row.error ? `Error: ${row.error}` : row.sent_at ? 'Enviado ✔' : 'Pendiente...';
    return `<article class="item-card"><strong>${channelLabel(row.channel_id)}</strong><span>${status}</span><p>${row.content || ''}${row.embed ? ' <span class="pill">embed</span>' : ''}</p></article>`;
  }).join('');
}

// Sondea una fila de una tabla de "solicitudes al bot" (bot_outbox,
// pdf_bulk_post_requests, pdf_channel_clear_requests) hasta que el bot la
// marque como terminada (processedField no nulo), o hasta agotar los
// intentos. Evita que la UI se quede pegada en "Procesando..." si el
// refresco de una sola vez no llega a tiempo.
async function pollRequestUntilDone(table, id, processedField, { intervalMs = 2000, maxAttempts = 15 } = {}) {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(resolve => setTimeout(resolve, intervalMs));
    const { data } = await supabaseClient.from(table).select('*').eq('id', id).maybeSingle();
    if (data && data[processedField]) return data;
  }
  return null;
}

function initDiscordAdminSection() {
  loadDiscordChannels();
  setupMarkdownToolbar('outbox');
  setupMarkdownToolbar('scheduled');
  setupEmbedBuilder('outbox');
  setupEmbedBuilder('scheduled');

  const outboxForm = document.getElementById('outboxForm');
  const outboxNotice = document.getElementById('outboxNotice');
  if (outboxForm) {
    outboxForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient || !state.currentUser) return;
      const channelId = document.getElementById('outboxChannelId').value.trim();
      const content = document.getElementById('outboxContent').value.trim();
      const embed = collectEmbedData('outbox');
      if (!channelId || (!content && !embed)) {
        if (outboxNotice) {
          outboxNotice.className = 'notice show error';
          outboxNotice.textContent = 'Elegí un canal y escribí un mensaje o un embed.';
        }
        return;
      }

      const { data, error } = await supabaseClient.from('bot_outbox')
        .insert({ channel_id: channelId, content: content || null, embed, created_by: state.currentUser.id })
        .select().single();
      if (outboxNotice) {
        outboxNotice.className = error ? 'notice show error' : 'notice show';
        outboxNotice.textContent = error ? 'No se pudo encolar el mensaje: ' + error.message : 'Enviando...';
      }
      if (error) return;

      outboxForm.reset();
      resetEmbedBuilder('outbox');
      loadOutboxHistory();

      const result = await pollRequestUntilDone('bot_outbox', data.id, 'sent_at');
      loadOutboxHistory();
      if (outboxNotice) {
        if (!result) {
          outboxNotice.className = 'notice show error';
          outboxNotice.textContent = 'El bot está tardando en procesarlo — revisá el historial abajo en unos segundos, o si el bot está corriendo.';
        } else if (result.error) {
          outboxNotice.className = 'notice show error';
          outboxNotice.textContent = 'El bot no pudo mandarlo: ' + result.error;
        } else {
          outboxNotice.className = 'notice show';
          outboxNotice.textContent = 'Enviado ✔';
        }
      }
    });
  }

  const scheduledType = document.getElementById('scheduledType');
  const scheduledRecurringFields = document.getElementById('scheduledRecurringFields');
  const scheduledOnceAt = document.getElementById('scheduledOnceAt');
  if (scheduledType) {
    scheduledType.addEventListener('change', () => {
      const isRecurring = scheduledType.value === 'recurring';
      if (scheduledRecurringFields) scheduledRecurringFields.classList.toggle('hidden', !isRecurring);
      if (scheduledOnceAt) scheduledOnceAt.classList.toggle('hidden', isRecurring);
    });
  }

  const scheduledForm = document.getElementById('scheduledForm');
  const scheduledNotice = document.getElementById('scheduledNotice');
  if (scheduledForm) {
    scheduledForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient || !state.currentUser) return;
      const channelId = document.getElementById('scheduledChannelId').value.trim();
      const content = document.getElementById('scheduledContent').value.trim();
      const embed = collectEmbedData('scheduled');
      const type = scheduledType.value;
      if (!channelId || (!content && !embed)) {
        if (scheduledNotice) { scheduledNotice.className = 'notice show error'; scheduledNotice.textContent = 'Elegí un canal y escribí un mensaje o un embed.'; }
        return;
      }

      const payload = { channel_id: channelId, content: content || null, embed, schedule_type: type, created_by: state.currentUser.id };

      if (type === 'once') {
        if (!scheduledOnceAt.value) {
          if (scheduledNotice) { scheduledNotice.className = 'notice show error'; scheduledNotice.textContent = 'Elegí una fecha y hora.'; }
          return;
        }
        payload.run_at = new Date(scheduledOnceAt.value).toISOString();
      } else {
        const cronExpr = buildCronFromRecurringForm();
        if (!cronExpr) {
          if (scheduledNotice) { scheduledNotice.className = 'notice show error'; scheduledNotice.textContent = 'Elegí al menos un día de la semana.'; }
          return;
        }
        payload.cron_expression = cronExpr;
      }

      const { error } = await supabaseClient.from('scheduled_messages').insert(payload);
      if (scheduledNotice) {
        scheduledNotice.className = error ? 'notice show error' : 'notice show';
        scheduledNotice.textContent = error ? 'No se pudo programar: ' + error.message : 'Mensaje programado.';
      }
      if (!error) {
        scheduledForm.reset();
        resetEmbedBuilder('scheduled');
        document.querySelectorAll('.scheduledDay').forEach(cb => { cb.checked = false; });
        loadScheduledMessages();
      }
    });
  }

  const scheduledList = document.getElementById('scheduledList');
  if (scheduledList) {
    scheduledList.addEventListener('click', async event => {
      const toggleBtn = event.target.closest('[data-scheduled-toggle]');
      if (toggleBtn) {
        const enabled = toggleBtn.dataset.enabled === 'true';
        await supabaseClient.from('scheduled_messages').update({ enabled: !enabled }).eq('id', toggleBtn.dataset.scheduledToggle);
        loadScheduledMessages();
        return;
      }
      const deleteBtn = event.target.closest('[data-scheduled-delete]');
      if (deleteBtn) {
        await supabaseClient.from('scheduled_messages').delete().eq('id', deleteBtn.dataset.scheduledDelete);
        loadScheduledMessages();
      }
    });
  }

  const autopostEnabledToggle = document.getElementById('autopostEnabledToggle');
  const autopostNotice = document.getElementById('autopostNotice');
  if (autopostEnabledToggle && supabaseClient) {
    supabaseClient.from('bot_settings').select('autopost_enabled').eq('id', 1).maybeSingle()
      .then(({ data }) => { autopostEnabledToggle.checked = !!(data && data.autopost_enabled); });

    autopostEnabledToggle.addEventListener('change', async () => {
      const enabled = autopostEnabledToggle.checked;
      autopostEnabledToggle.disabled = true;
      const { error } = await supabaseClient.from('bot_settings').upsert({ id: 1, autopost_enabled: enabled, updated_at: new Date().toISOString() });
      autopostEnabledToggle.disabled = false;

      if (error) {
        autopostEnabledToggle.checked = !enabled;
        if (autopostNotice) { autopostNotice.className = 'notice show error'; autopostNotice.textContent = 'No se pudo guardar: ' + error.message; }
        return;
      }
      if (autopostNotice) {
        autopostNotice.className = 'notice show';
        autopostNotice.textContent = enabled ? 'Publicación automática activada.' : 'Publicación automática desactivada.';
      }
    });
  }

  const defaultTemplateForm = document.getElementById('defaultTemplateForm');
  const defaultTemplateContent = document.getElementById('defaultTemplateContent');
  const defaultTemplateNotice = document.getElementById('defaultTemplateNotice');
  if (defaultTemplateContent && supabaseClient) {
    supabaseClient.from('pdf_message_template_default').select('template').eq('id', 1).maybeSingle()
      .then(({ data }) => { defaultTemplateContent.value = data ? data.template : ''; });
  }
  if (defaultTemplateForm) {
    defaultTemplateForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient) return;
      const template = defaultTemplateContent.value.trim();
      if (!template) return;

      const { error } = await supabaseClient.from('pdf_message_template_default').upsert({ id: 1, template, updated_at: new Date().toISOString() });
      if (defaultTemplateNotice) {
        defaultTemplateNotice.className = error ? 'notice show error' : 'notice show';
        defaultTemplateNotice.textContent = error ? 'No se pudo guardar: ' + error.message : 'Plantilla general guardada.';
      }
    });
  }

  const templateSubjectSelect = document.getElementById('templateSubjectSelect');
  const templateForm = document.getElementById('templateForm');
  const templateNotice = document.getElementById('templateNotice');
  if (templateSubjectSelect) {
    populateTemplateSubjectSelect();
    templateSubjectSelect.addEventListener('change', () => loadTemplateForSubject(templateSubjectSelect.value));
    loadTemplateForSubject(templateSubjectSelect.value);
  }
  if (templateForm) {
    templateForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient) return;
      const subjectId = templateSubjectSelect.value;
      const template = document.getElementById('templateContent').value.trim();
      if (!subjectId || !template) return;

      const { error } = await supabaseClient.from('subject_message_templates').upsert({ subject_id: subjectId, template, updated_at: new Date().toISOString() });
      if (templateNotice) {
        templateNotice.className = error ? 'notice show error' : 'notice show';
        templateNotice.textContent = error ? 'No se pudo guardar: ' + error.message : 'Plantilla guardada.';
      }
    });
  }

  const bulkPostBtn = document.getElementById('bulkPostBtn');
  const bulkPostAllBtn = document.getElementById('bulkPostAllBtn');
  const bulkPostNotice = document.getElementById('bulkPostNotice');

  async function requestBulkPost(subjectId, triggerBtn, busyLabel) {
    if (!supabaseClient || !state.currentUser) return;

    bulkPostBtn.disabled = true;
    bulkPostAllBtn.disabled = true;
    const { data, error } = await supabaseClient.from('pdf_bulk_post_requests')
      .insert({ subject_id: subjectId, requested_by: state.currentUser.id })
      .select().single();

    if (bulkPostNotice) {
      bulkPostNotice.className = error ? 'notice show error' : 'notice show';
      bulkPostNotice.textContent = error ? 'No se pudo solicitar la publicación: ' + error.message : busyLabel;
    }
    if (error) {
      bulkPostBtn.disabled = false;
      bulkPostAllBtn.disabled = false;
      return;
    }

    loadBulkPostHistory();
    const result = await pollRequestUntilDone('pdf_bulk_post_requests', data.id, 'processed_at', {
      maxAttempts: subjectId ? 15 : 60 // "todas las materias" puede tardar bastante más
    });
    bulkPostBtn.disabled = false;
    bulkPostAllBtn.disabled = false;
    loadBulkPostHistory();

    if (bulkPostNotice) {
      if (!result) {
        bulkPostNotice.className = 'notice show error';
        bulkPostNotice.textContent = 'El bot está tardando en procesarlo — revisá el historial abajo en unos segundos, o si el bot está corriendo.';
      } else if (result.error) {
        bulkPostNotice.className = 'notice show error';
        bulkPostNotice.textContent = 'Terminó con problemas: ' + result.error;
      } else {
        bulkPostNotice.className = 'notice show';
        bulkPostNotice.textContent = result.posted_count > 0
          ? `Listo. Publicados: ${result.posted_count}.`
          : 'Listo. No había nada nuevo para publicar (ya estaba todo posteado).';
      }
    }
  }

  if (bulkPostBtn) {
    bulkPostBtn.addEventListener('click', () => {
      const subjectId = templateSubjectSelect.value;
      if (!subjectId) return;
      requestBulkPost(subjectId, bulkPostBtn, 'Publicando...');
    });
  }

  if (bulkPostAllBtn) {
    bulkPostAllBtn.addEventListener('click', () => {
      requestBulkPost(null, bulkPostAllBtn, 'Publicando en todas las materias...');
    });
  }

  const clearChannelBtn = document.getElementById('clearChannelBtn');
  const clearChannelAllBtn = document.getElementById('clearChannelAllBtn');
  const clearChannelNotice = document.getElementById('clearChannelNotice');

  async function requestClearChannel(subjectId, busyLabel) {
    if (!supabaseClient || !state.currentUser) return;

    clearChannelBtn.disabled = true;
    clearChannelAllBtn.disabled = true;
    const { data, error } = await supabaseClient.from('pdf_channel_clear_requests')
      .insert({ subject_id: subjectId, requested_by: state.currentUser.id })
      .select().single();

    if (clearChannelNotice) {
      clearChannelNotice.className = error ? 'notice show error' : 'notice show';
      clearChannelNotice.textContent = error ? 'No se pudo solicitar el borrado: ' + error.message : busyLabel;
    }
    if (error) {
      clearChannelBtn.disabled = false;
      clearChannelAllBtn.disabled = false;
      return;
    }

    loadClearChannelHistory();
    const result = await pollRequestUntilDone('pdf_channel_clear_requests', data.id, 'processed_at', {
      maxAttempts: subjectId ? 15 : 60 // "todas las materias" puede tardar bastante más
    });
    clearChannelBtn.disabled = false;
    clearChannelAllBtn.disabled = false;
    loadClearChannelHistory();

    if (clearChannelNotice) {
      if (!result) {
        clearChannelNotice.className = 'notice show error';
        clearChannelNotice.textContent = 'El bot está tardando en procesarlo — revisá el historial abajo en unos segundos, o si el bot está corriendo.';
      } else if (result.error) {
        clearChannelNotice.className = 'notice show error';
        clearChannelNotice.textContent = 'Terminó con problemas: ' + result.error;
      } else {
        clearChannelNotice.className = 'notice show';
        clearChannelNotice.textContent = `Listo. Mensajes borrados: ${result.deleted_count}.`;
      }
    }
  }

  if (clearChannelBtn) {
    clearChannelBtn.addEventListener('click', () => {
      const subjectId = templateSubjectSelect.value;
      if (!subjectId) return;
      const subjectLabel = templateSubjectSelect.options[templateSubjectSelect.selectedIndex].text;
      if (!confirm(`¿Borrar todas las publicaciones del bot para "${subjectLabel}"? Esta acción no se puede deshacer.`)) return;
      requestClearChannel(subjectId, 'Borrando...');
    });
  }

  if (clearChannelAllBtn) {
    clearChannelAllBtn.addEventListener('click', () => {
      if (!confirm('¿Borrar TODAS las publicaciones del bot en TODAS las materias? Esta acción no se puede deshacer.')) return;
      requestClearChannel(null, 'Borrando en todas las materias...');
    });
  }

  loadBulkPostHistory();
  loadClearChannelHistory();
}

async function loadClearChannelHistory() {
  const target = document.getElementById('clearChannelHistory');
  if (!target || !supabaseClient) return;
  const { data, error } = await supabaseClient
    .from('pdf_channel_clear_requests')
    .select('*, subjects(code, name)')
    .order('requested_at', { ascending: false })
    .limit(5);
  if (error || !data || !data.length) { target.innerHTML = ''; return; }

  target.innerHTML = data.map(row => {
    const subjectLabel = row.subjects ? `${row.subjects.code} — ${row.subjects.name}` : (row.subject_id || 'Todas las materias');
    let status;
    if (row.error) status = `Error: ${row.error}`;
    else if (row.processed_at) status = `Borrados: ${row.deleted_count}`;
    else status = 'Procesando...';
    return `<article class="item-card"><strong>${subjectLabel}</strong><span>${status}</span></article>`;
  }).join('');
}

async function loadBulkPostHistory() {
  const target = document.getElementById('bulkPostHistory');
  if (!target || !supabaseClient) return;
  const { data, error } = await supabaseClient
    .from('pdf_bulk_post_requests')
    .select('*, subjects(code, name)')
    .order('requested_at', { ascending: false })
    .limit(5);
  if (error || !data || !data.length) { target.innerHTML = ''; return; }

  target.innerHTML = data.map(row => {
    const subjectLabel = row.subjects ? `${row.subjects.code} — ${row.subjects.name}` : (row.subject_id || 'Todas las materias');
    let status;
    if (row.error) status = `Error: ${row.error}`;
    else if (row.processed_at) {
      status = row.posted_count > 0
        ? `Publicados: ${row.posted_count}`
        : 'No había nada nuevo para publicar (ya estaba todo posteado).';
    } else status = 'Procesando...';
    return `<article class="item-card"><strong>${subjectLabel}</strong><span>${status}</span></article>`;
  }).join('');
}

function attachAdminEvents() {
  setupSidebarToggle('adminScreen');
  initDiscordAdminSection();
  const logoutBtn = document.getElementById('adminLogoutBtn');
  const subjectForm = document.getElementById('subjectForm');
  const subjectFormCancel = document.getElementById('subjectFormCancel');

  document.querySelectorAll('.nav-link[data-admin-view]').forEach(button => {
    button.addEventListener('click', () => setAdminView(button.dataset.adminView));
  });

  document.querySelectorAll('[data-discord-tab]').forEach(button => {
    button.addEventListener('click', () => setDiscordTab(button.dataset.discordTab));
  });

  if (subjectFormCancel) subjectFormCancel.addEventListener('click', resetSubjectForm);

  const faqForm = document.getElementById('faqForm');
  const faqFormCancel = document.getElementById('faqFormCancel');
  const faqFormNotice = document.getElementById('faqFormNotice');
  const faqMdToolbar = document.getElementById('faqMdToolbar');
  const faqAnswerInput = document.getElementById('faqAnswerInput');

  if (faqFormCancel) faqFormCancel.addEventListener('click', resetFaqForm);

  if (faqMdToolbar && faqAnswerInput) {
    faqMdToolbar.addEventListener('click', event => {
      const btn = event.target.closest('.md-btn');
      if (!btn) return;
      applyMarkdown(faqAnswerInput, btn.dataset.md);
    });
  }

  if (faqForm) {
    faqForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient) return;
      const editId = document.getElementById('faqEditId').value;
      const question = document.getElementById('faqQuestionInput').value.trim();
      const answer = document.getElementById('faqAnswerInput').value.trim();
      if (!question || !answer) return;

      const submitBtn = document.getElementById('faqFormSubmit');
      if (submitBtn) submitBtn.disabled = true;

      if (editId) {
        const { error } = await supabaseClient.from('faq_items').update({ question, answer }).eq('id', editId);
        if (submitBtn) submitBtn.disabled = false;
        if (error) {
          if (faqFormNotice) { faqFormNotice.className = 'notice show error'; faqFormNotice.textContent = 'No se pudo guardar: ' + error.message; }
          return;
        }
        const item = state.data.faq.find(entry => entry.id === editId);
        if (item) { item.question = question; item.answer = answer; }
      } else {
        const position = state.data.faq.length;
        const { data, error } = await supabaseClient.from('faq_items').insert({ question, answer, position }).select().single();
        if (submitBtn) submitBtn.disabled = false;
        if (error) {
          if (faqFormNotice) { faqFormNotice.className = 'notice show error'; faqFormNotice.textContent = 'No se pudo agregar: ' + error.message; }
          return;
        }
        state.data.faq.push(mapFaqRow(data));
      }

      resetFaqForm();
      renderFaqAdminList();
    });
  }

  const exportLocalDataBtn = document.getElementById('exportLocalDataBtn');
  const importLocalDataInput = document.getElementById('importLocalDataInput');
  const clearImportedDataBtn = document.getElementById('clearImportedDataBtn');
  const clearBeforeImportCheckbox = document.getElementById('clearBeforeImportCheckbox');
  const dataTransferNotice = document.getElementById('dataTransferNotice');

  if (exportLocalDataBtn) {
    exportLocalDataBtn.addEventListener('click', () => {
      exportLocalData();
      if (dataTransferNotice) {
        dataTransferNotice.className = 'notice show';
        dataTransferNotice.textContent = 'Se descargó el archivo con el calendario, el foro y el contenido de materias.';
      }
    });
  }

  if (clearImportedDataBtn) {
    clearImportedDataBtn.addEventListener('click', async () => {
      if (!confirm('¿Vaciar el calendario, el foro general y todo el contenido de materias (unidades, PDFs, clases, foro, opiniones, encuestas)? Esta acción no se puede deshacer.')) return;
      try {
        await clearAllImportableData();
        alert('Datos vaciados. La página se va a recargar.');
        window.location.reload();
      } catch (error) {
        if (dataTransferNotice) {
          dataTransferNotice.className = 'notice show error';
          dataTransferNotice.textContent = 'No se pudo vaciar: ' + error.message;
        }
      }
    });
  }

  if (importLocalDataInput) {
    importLocalDataInput.addEventListener('change', event => {
      const file = event.target.files[0];
      if (!file) return;
      const clearFirst = !!(clearBeforeImportCheckbox && clearBeforeImportCheckbox.checked);
      importLocalData(file, error => {
        if (error) {
          if (dataTransferNotice) {
            dataTransferNotice.className = 'notice show error';
            dataTransferNotice.textContent = 'El archivo no es válido: ' + error.message;
          }
          return;
        }
        alert('Datos importados. La página se va a recargar.');
        window.location.reload();
      }, { clearFirst });
    });
  }

  if (subjectForm) {
    subjectForm.addEventListener('submit', async event => {
      event.preventDefault();
      const notice = document.getElementById('subjectFormNotice');
      const editId = document.getElementById('subjectEditId').value;
      const code = document.getElementById('subjectCode').value.trim();
      const year = Number(document.getElementById('subjectYearInput').value);
      const semester = document.getElementById('subjectSemester').value;
      const name = document.getElementById('subjectName').value.trim();
      const hours = document.getElementById('subjectHours').value.trim();
      const modality = document.getElementById('subjectModality').value;
      const libre = document.getElementById('subjectLibre').value;
      const examFinal = document.getElementById('subjectExamFinal').value;
      const anySemester = document.getElementById('subjectAnySemester').checked;
      const correlativeInput = document.getElementById('subjectCorrelatives').value.trim();

      const duplicate = state.data.subjects.find(item => item.code === code && item.id !== editId);
      if (duplicate) {
        if (notice) {
          notice.className = 'notice show error';
          notice.textContent = `Ya existe una materia con el código ${code}.`;
        }
        return;
      }

      const correlativeCodesList = correlativeInput ? correlativeInput.split(',').map(value => value.trim()).filter(Boolean) : [];
      const correlativeIds = correlativeCodesList
        .map(codeValue => {
          const match = state.data.subjects.find(item => item.code === codeValue && item.id !== editId);
          return match ? match.id : null;
        })
        .filter(Boolean);

      const id = editId || `mat_${code}_${Date.now()}`;
      const row = {
        id, code, name, year, semester, hours, modality, libre,
        exam_final: examFinal,
        correlatives: correlativeIds,
        any_semester: anySemester
      };

      if (supabaseClient) {
        const { error } = await supabaseClient.from('subjects').upsert(row);
        if (error) {
          if (notice) {
            notice.className = 'notice show error';
            notice.textContent = 'No se pudo guardar en Supabase: ' + error.message;
          }
          return;
        }
      }

      if (editId) {
        const subject = state.data.subjects.find(item => item.id === editId);
        if (subject) {
          subject.code = code;
          subject.year = year;
          subject.semester = semester;
          subject.name = name;
          subject.hours = hours;
          subject.modality = modality;
          subject.libre = libre;
          subject.examFinal = examFinal;
          subject.correlatives = correlativeIds;
          subject.anySemester = anySemester;
        }
      } else {
        state.data.subjects.push({
          id, code, year, semester, name, hours, modality, libre, examFinal,
          correlatives: correlativeIds,
          anySemester,
          units: [], dates: [], forum: [], opinions: [], polls: [], exams: []
        });
      }

      if (state.currentUser) enforceCorrelativityAndPersist(state.currentUser.email);

      renderAdminSubjectsTable();
      updateAdminHeader(state.currentUser);
      resetSubjectForm();
    });
  }

  const importClasesStart = document.getElementById('importClasesStart');
  if (importClasesStart) {
    importClasesStart.addEventListener('click', async () => {
      const input = document.getElementById('importClasesInput');
      const force = document.getElementById('importClasesForce').checked;
      const notice = document.getElementById('importClasesNotice');
      const log = document.getElementById('importClasesLog');
      if (!input.files || !input.files.length) {
        notice.className = 'notice show error';
        notice.textContent = 'Elegí primero la carpeta "Clases".';
        return;
      }
      importClasesStart.disabled = true;
      importClasesStart.textContent = 'Importando…';
      notice.className = 'notice show';
      notice.textContent = 'Importando, puede tardar unos minutos si hay muchas imágenes…';
      try {
        await runClasesImport(input.files, force, log, notice);
      } catch (error) {
        notice.className = 'notice show error';
        notice.textContent = 'Error inesperado: ' + error.message;
      }
      importClasesStart.disabled = false;
      importClasesStart.textContent = 'Iniciar importación';
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (supabaseClient) await supabaseClient.auth.signOut();
      window.location.href = 'index.html';
    });
  }

}

function initPortalPage() {
  const landingScreen = document.getElementById('landingScreen');
  const authScreen = document.getElementById('authScreen');
  const portalScreen = document.getElementById('portalScreen');
  const user = state.currentUser;

  attachPortalEvents();
  renderYears();
  renderCalendarViews();
  renderForumViews();
  renderPlanningTable();
  renderHomeStats();

  if (state.passwordRecovery) {
    if (landingScreen) landingScreen.classList.add('hidden');
    if (portalScreen) portalScreen.classList.add('hidden');
    if (authScreen) authScreen.classList.remove('hidden');
    document.querySelectorAll('#authScreen .auth-card, #verifyForm, #forgotForm').forEach(el => el.classList.add('hidden'));
    const resetForm = document.getElementById('resetForm');
    if (resetForm) resetForm.classList.remove('hidden');
    return;
  }

  if (state.pendingVerification) {
    if (landingScreen) landingScreen.classList.add('hidden');
    if (portalScreen) portalScreen.classList.add('hidden');
    if (authScreen) authScreen.classList.remove('hidden');
    document.querySelectorAll('#authScreen .auth-card, #forgotForm, #resetForm').forEach(el => el.classList.add('hidden'));
    const verifyForm = document.getElementById('verifyForm');
    const verifyEmailLabel = document.getElementById('verifyEmailLabel');
    if (verifyEmailLabel) verifyEmailLabel.textContent = state.pendingConfirmEmail || '';
    if (verifyForm) verifyForm.classList.remove('hidden');
    return;
  }

  if (user) {
    if (landingScreen) landingScreen.classList.add('hidden');
    if (authScreen) authScreen.classList.add('hidden');
    if (portalScreen) portalScreen.classList.remove('hidden');
    updatePortalHeader(user);
    setView('inicio');
  } else if (state.authError) {
    showAuthForm('login');
    const notice = document.getElementById('notice');
    if (notice) {
      notice.className = 'notice show error';
      notice.textContent = 'No se pudo cargar tu perfil: ' + state.authError;
    }
  } else {
    if (landingScreen) landingScreen.classList.remove('hidden');
    if (authScreen) authScreen.classList.add('hidden');
    if (portalScreen) portalScreen.classList.add('hidden');
  }
}

function initAdminPage() {
  const adminScreen = document.getElementById('adminScreen');
  const user = state.currentUser;

  if (!user || user.role !== 'admin') {
    window.location.href = 'index.html';
    return;
  }

  if (adminScreen) adminScreen.classList.remove('hidden');
  renderCalendarViews();
  renderForumViews();
  renderAdminSubjectsTable();
  updateAdminHeader(user);
  attachAdminEvents();
  setAdminView('panel');
}

document.addEventListener('click', event => {
  if (event.target.closest('#profilePillBtn')) {
    window.location.href = 'user.html';
  }
});

function renderCurrentSubjectsPreview() {
  const target = document.getElementById('currentSubjectsPreview');
  if (!target || !state.currentUser) return;
  const current = state.data.subjects.filter(subject => getSubjectProgress(state.currentUser.email, subject.id).status === 'Cursando');
  target.innerHTML = current.length
    ? current.map(subject => `<span class="pill blue">${subject.code} · ${subject.name}</span>`).join('')
    : '<span class="current-subjects-empty">No estás cursando ninguna materia actualmente.</span>';
}

function fillUserProfileForm(user) {
  const accountName = document.getElementById('accountName');
  const accountLastName = document.getElementById('accountLastName');
  const accountBirthDate = document.getElementById('accountBirthDate');
  const accountEmail = document.getElementById('accountEmail');
  if (accountName) accountName.value = user.name || '';
  if (accountLastName) accountLastName.value = user.lastName || '';
  if (accountBirthDate) accountBirthDate.value = user.birthDate || '';
  if (accountEmail) accountEmail.value = '••••••••••••';

  const contactPhone = document.getElementById('contactPhone');
  const contactInstagram = document.getElementById('contactInstagram');
  const contactLinkedin = document.getElementById('contactLinkedin');
  const contactVisible = document.getElementById('contactVisible');
  if (contactPhone) contactPhone.value = user.phone || '';
  if (contactInstagram) contactInstagram.value = user.instagram || '';
  if (contactLinkedin) contactLinkedin.value = user.linkedin || '';
  if (contactVisible) contactVisible.checked = !!user.contactVisible;

  renderAvatarInto(document.getElementById('profileAvatarPreview'), user);

  const extra = user.extraInfo || {};
  const setValue = (id, value) => { const el = document.getElementById(id); if (el) el.value = value || ''; };
  const setChecked = (id, value) => { const el = document.getElementById(id); if (el) el.checked = !!value; };
  setValue('extraAddress', extra.address);
  setChecked('extraAddressVisible', extra.address_visible);
  setValue('extraDni', extra.dni);
  setChecked('extraDniVisible', extra.dni_visible);
  setValue('extraJoinDate', extra.join_date);
  setChecked('extraJoinDateVisible', extra.join_date_visible);
  setChecked('extraCurrentSubjectsVisible', extra.current_subjects_visible);

  renderCurrentSubjectsPreview();
}

function attachUserPageEvents() {
  setupSidebarToggle('userScreen');

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (supabaseClient) await supabaseClient.auth.signOut();
      window.location.href = 'index.html';
    });
  }

  const avatarInput = document.getElementById('avatarInput');
  const avatarNotice = document.getElementById('avatarNotice');
  if (avatarInput) {
    avatarInput.addEventListener('change', async () => {
      const file = avatarInput.files && avatarInput.files[0];
      if (!file || !supabaseClient || !state.currentUser) return;
      if (avatarNotice) avatarNotice.className = 'notice';

      const path = `${state.currentUser.id}/avatar_${Date.now()}_${sanitizeStorageFilename(file.name)}`;
      const { error: uploadError } = await supabaseClient.storage
        .from('avatars')
        .upload(path, file, { contentType: file.type || 'image/jpeg' });

      if (uploadError) {
        if (avatarNotice) {
          avatarNotice.className = 'notice show error';
          avatarNotice.textContent = 'No se pudo subir la foto: ' + uploadError.message;
        }
        return;
      }

      const { data: urlData } = supabaseClient.storage.from('avatars').getPublicUrl(path);
      const { error: dbError } = await supabaseClient
        .from('profiles')
        .update({ avatar_url: urlData.publicUrl })
        .eq('id', state.currentUser.id);

      if (dbError) {
        if (avatarNotice) {
          avatarNotice.className = 'notice show error';
          avatarNotice.textContent = 'No se pudo guardar la foto: ' + dbError.message;
        }
        return;
      }

      state.currentUser.avatarUrl = urlData.publicUrl;
      renderAvatarInto(document.getElementById('profileAvatarPreview'), state.currentUser);
      if (avatarNotice) { avatarNotice.className = 'notice show'; avatarNotice.textContent = 'Foto actualizada.'; }
      avatarInput.value = '';
    });
  }

  const removeAvatarBtn = document.getElementById('removeAvatarBtn');
  if (removeAvatarBtn) {
    removeAvatarBtn.addEventListener('click', async () => {
      if (!supabaseClient || !state.currentUser) return;
      const { error } = await supabaseClient.from('profiles').update({ avatar_url: null }).eq('id', state.currentUser.id);
      if (avatarNotice) {
        if (error) {
          avatarNotice.className = 'notice show error';
          avatarNotice.textContent = 'No se pudo quitar la foto: ' + error.message;
          return;
        }
        avatarNotice.className = 'notice show';
        avatarNotice.textContent = 'Foto eliminada.';
      }
      state.currentUser.avatarUrl = null;
      renderAvatarInto(document.getElementById('profileAvatarPreview'), state.currentUser);
    });
  }

  const toggleEmailBtn = document.getElementById('toggleEmailBtn');
  if (toggleEmailBtn) {
    toggleEmailBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('accountEmail');
      if (!emailInput || !state.currentUser) return;
      const isHidden = toggleEmailBtn.textContent.trim() === 'Ver';
      emailInput.value = isHidden ? state.currentUser.email : '••••••••••••';
      toggleEmailBtn.textContent = isHidden ? 'Ocultar' : 'Ver';
    });
  }

  const togglePasswordChange = document.getElementById('togglePasswordChange');
  const passwordForm = document.getElementById('passwordForm');
  if (togglePasswordChange && passwordForm) {
    togglePasswordChange.addEventListener('click', () => {
      passwordForm.classList.toggle('hidden');
    });
  }

  const accountForm = document.getElementById('accountForm');
  const accountNotice = document.getElementById('accountNotice');
  if (accountForm) {
    accountForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient || !state.currentUser) return;
      const name = formatPersonName(document.getElementById('accountName').value);
      const lastName = formatPersonName(document.getElementById('accountLastName').value);
      const birthDate = document.getElementById('accountBirthDate').value;
      const submitBtn = accountForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const { error } = await supabaseClient
        .from('profiles')
        .update({
          name,
          last_name: lastName,
          birth_date: birthDate || null,
          avatar: name.charAt(0).toUpperCase() || state.currentUser.avatar
        })
        .eq('id', state.currentUser.id);

      if (submitBtn) submitBtn.disabled = false;

      if (accountNotice) {
        if (error) {
          accountNotice.className = 'notice show error';
          accountNotice.textContent = 'No se pudieron guardar los datos: ' + error.message;
          return;
        }
        accountNotice.className = 'notice show';
        accountNotice.textContent = 'Datos actualizados.';
      }
      document.getElementById('accountName').value = name;
      document.getElementById('accountLastName').value = lastName;
      state.currentUser.name = name;
      state.currentUser.lastName = lastName;
      state.currentUser.birthDate = birthDate;
    });
  }

  const passwordNotice = document.getElementById('passwordNotice');
  if (passwordForm) {
    passwordForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient || !state.currentUser) return;
      const currentPassword = document.getElementById('currentPassword').value;
      const newPassword = document.getElementById('newPassword').value.trim();
      const newPasswordConfirm = document.getElementById('newPasswordConfirm').value.trim();

      if (newPassword !== newPasswordConfirm) {
        if (passwordNotice) {
          passwordNotice.className = 'notice show error';
          passwordNotice.textContent = 'Las contraseñas nuevas no coinciden.';
        }
        return;
      }

      const submitBtn = passwordForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const { error: reauthError } = await supabaseClient.auth.signInWithPassword({
        email: state.currentUser.email,
        password: currentPassword
      });

      if (reauthError) {
        if (submitBtn) submitBtn.disabled = false;
        if (passwordNotice) {
          passwordNotice.className = 'notice show error';
          passwordNotice.textContent = 'La contraseña actual es incorrecta.';
        }
        return;
      }

      const { error } = await supabaseClient.auth.updateUser({ password: newPassword });
      if (submitBtn) submitBtn.disabled = false;

      if (passwordNotice) {
        if (error) {
          passwordNotice.className = 'notice show error';
          passwordNotice.textContent = 'No se pudo actualizar la contraseña: ' + error.message;
          return;
        }
        passwordNotice.className = 'notice show';
        passwordNotice.textContent = 'Contraseña actualizada.';
      }
      passwordForm.reset();
    });
  }

  const contactForm = document.getElementById('contactForm');
  const contactNotice = document.getElementById('contactNotice');
  if (contactForm) {
    contactForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient || !state.currentUser) return;

      const phone = document.getElementById('contactPhone').value.trim();
      const instagram = document.getElementById('contactInstagram').value.trim();
      const linkedin = document.getElementById('contactLinkedin').value.trim();
      const contactVisible = document.getElementById('contactVisible').checked;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      const { error } = await supabaseClient
        .from('profiles')
        .update({ phone, instagram, linkedin, contact_visible: contactVisible })
        .eq('id', state.currentUser.id);
      if (submitBtn) submitBtn.disabled = false;

      if (contactNotice) {
        if (error) {
          contactNotice.className = 'notice show error';
          contactNotice.textContent = 'No se pudo guardar el contacto: ' + error.message;
          return;
        }
        contactNotice.className = 'notice show';
        contactNotice.textContent = 'Datos de contacto guardados.';
      }
      state.currentUser.phone = phone;
      state.currentUser.instagram = instagram;
      state.currentUser.linkedin = linkedin;
      state.currentUser.contactVisible = contactVisible;
    });
  }

  initDiscordLinkSection();

  const extraForm = document.getElementById('extraForm');
  const extraNotice = document.getElementById('extraNotice');
  if (extraForm) {
    extraForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!supabaseClient || !state.currentUser) return;

      const extraInfo = {
        address: document.getElementById('extraAddress').value.trim(),
        address_visible: document.getElementById('extraAddressVisible').checked,
        dni: document.getElementById('extraDni').value.trim(),
        dni_visible: document.getElementById('extraDniVisible').checked,
        join_date: document.getElementById('extraJoinDate').value,
        join_date_visible: document.getElementById('extraJoinDateVisible').checked,
        current_subjects_visible: document.getElementById('extraCurrentSubjectsVisible').checked
      };

      const submitBtn = extraForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      const { error } = await supabaseClient.from('profiles').update({ extra_info: extraInfo }).eq('id', state.currentUser.id);
      if (submitBtn) submitBtn.disabled = false;

      if (extraNotice) {
        if (error) {
          extraNotice.className = 'notice show error';
          extraNotice.textContent = 'No se pudieron guardar los datos adicionales: ' + error.message;
          return;
        }
        extraNotice.className = 'notice show';
        extraNotice.textContent = 'Datos adicionales guardados.';
      }
      state.currentUser.extraInfo = extraInfo;
    });
  }
}

function initUserPage() {
  const userScreen = document.getElementById('userScreen');
  const user = state.currentUser;

  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  if (userScreen) userScreen.classList.remove('hidden');
  fillUserProfileForm(user);
  attachUserPageEvents();
}

function setupThemeToggle() {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;
  const isDark = localStorage.getItem('theme') === 'dark';
  toggle.checked = isDark;
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  });
}

function setupSidebarAutoCollapse() {
  document.addEventListener('click', event => {
    const trigger = event.target.closest('.sidebar .nav-link, .sidebar .year-btn, .sidebar .sidebar-label');
    if (trigger) trigger.blur();
  });
}

function setupSidebarUserMenu() {
  const btn = document.getElementById('sidebarUserBtn');
  const menu = document.getElementById('sidebarUserMenu');
  const profileBtn = document.getElementById('sidebarUserProfileBtn');
  if (!btn || !menu) return;

  btn.addEventListener('click', event => {
    event.stopPropagation();
    const isOpen = !menu.classList.contains('hidden');
    if (isOpen) {
      menu.classList.add('hidden');
      btn.classList.remove('open');
      return;
    }
    const rect = btn.getBoundingClientRect();
    menu.style.left = `${Math.round(rect.left)}px`;
    menu.style.bottom = `${Math.round(window.innerHeight - rect.top + 10)}px`;
    menu.classList.remove('hidden');
    btn.classList.add('open');
  });

  document.addEventListener('click', event => {
    if (menu.classList.contains('hidden')) return;
    if (event.target.closest('#sidebarUserMenu') || event.target.closest('#sidebarUserBtn')) return;
    menu.classList.add('hidden');
    btn.classList.remove('open');
  });

  if (profileBtn) {
    profileBtn.addEventListener('click', () => { window.location.href = 'user.html'; });
  }
}

async function init() {
  setupThemeToggle();
  setupSidebarUserMenu();
  setupSidebarAutoCollapse();
  if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange(event => {
      if (event === 'PASSWORD_RECOVERY') state.passwordRecovery = true;
    });
  }

  await loadSubjectsFromSupabase();
  await loadCalendarFromSupabase();
  await loadForumFromSupabase();
  await loadSubjectContentFromSupabase();
  await loadFaqFromSupabase();
  await restoreSession();
  await cleanupExpiredCalendarEvents();

  const page = document.body.dataset.page;
  if (page === 'portal') initPortalPage();
  if (page === 'admin') initAdminPage();
  if (page === 'user') initUserPage();

  const loader = document.getElementById('pageLoader');
  if (loader) loader.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', init);