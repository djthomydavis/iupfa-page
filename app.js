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
    units: [], dates: [], forum: [], opinions: [], polls: []
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
  confirmDeleteUnitId: null,
  confirmDeleteItemId: null,
  viewMode: 'admin',
  calendarView: { year: new Date().getFullYear(), month: new Date().getMonth(), selectedDate: null, holidaysListOpen: false },
  planningSearch: '',
  planningYearFilter: 'all',
  planningStatusFilter: 'all',
  opinionProfessorFilter: 'all',
  opinionStarFilter: 'all',
  editingCalendarId: null,
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
    units: [], dates: [], forum: [], opinions: [], polls: []
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
    room: row.room || ''
  };
}

async function loadCalendarFromSupabase() {
  if (!supabaseClient) return;
  const { data, error } = await supabaseClient.from('calendar_events').select('*').order('date');
  if (error || !data) return;
  state.data.calendar = data.map(mapCalendarRow);
}

async function createCalendarEvent({ title, date, type, endDate, startTime, endTime, subjectId, modality, room }) {
  if (!supabaseClient) {
    state.data.calendar.unshift({ id: generateLocalId('event'), title, date, type, endDate, startTime, endTime, subjectId: subjectId || '', modality: modality || '', seriesId: '', room: room || '' });
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
    created_by: state.currentUser ? state.currentUser.id : null
  }).select().single();
  if (error) { console.error('No se pudo crear el evento:', error); return; }
  state.data.calendar.unshift(mapCalendarRow(data));
}

async function updateCalendarEvent(id, { title, date, type, endDate, startTime, endTime, subjectId, modality, room }) {
  const item = state.data.calendar.find(entry => entry.id === id);
  if (item) Object.assign(item, { title, date, type, endDate, startTime, endTime, subjectId: subjectId || '', modality: modality || '', room: room || '' });
  if (!supabaseClient) return;
  const { error } = await supabaseClient.from('calendar_events').update({
    title, date, type,
    end_date: endDate || null,
    start_time: startTime || null,
    end_time: endTime || null,
    subject_id: subjectId || null,
    modality: modality || null,
    room: room || null
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

// Genera una tanda de "Clase" para una materia, una por cada día de la semana
// elegido dentro del rango del cuatrimestre activo, alternando modalidad según
// el patrón (ej. 1 presencial + 2 virtuales => P, V, V, P, V, V...). Todas
// comparten un series_id para poder borrarlas juntas después.
async function generateRecurringClasses({ subjectId, weekday, startTime, endTime, presencialCount, virtualCount, room }) {
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

  const dates = [];
  let cursor = rangeStart;
  while (cursor <= rangeEnd) {
    const [y, m, d] = cursor.split('-').map(Number);
    if (new Date(y, m - 1, d).getDay() === weekday) dates.push(cursor);
    cursor = addDaysISO(cursor, 1);
  }
  if (!dates.length) return { ok: false, message: 'No hay ninguna fecha con ese día de la semana dentro del cuatrimestre activo.' };

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
    created_by: state.currentUser ? state.currentUser.id : null
  }));

  if (!supabaseClient) {
    rows.forEach(row => state.data.calendar.unshift({
      id: generateLocalId('event'), title: row.title, type: row.type, date: row.date,
      endDate: '', startTime, endTime, subjectId: row.subject_id, modality: row.modality, seriesId, room: room || ''
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
  const examAddCard = document.getElementById('subjectExamAdmin');
  const toggleBtn = document.getElementById('viewModeToggle');
  const addCalendarEventBtn = document.getElementById('addCalendarEventBtn');
  const addRecurringClassBtn = document.getElementById('addRecurringClassBtn');
  const importHolidaysBtn = document.getElementById('importHolidaysBtn');
  const newCalendarEventForm = document.getElementById('newCalendarEventForm');
  const recurringClassForm = document.getElementById('recurringClassForm');
  const importHolidaysForm = document.getElementById('importHolidaysForm');
  const isAdminAccount = !!(state.currentUser && state.currentUser.role === 'admin');

  if (adminShortcut) adminShortcut.classList.toggle('hidden', !isAdminView());
  if (contentAddCard && state.currentSubjectId) contentAddCard.classList.toggle('hidden', !isAdminView());
  if (examAddCard && state.currentSubjectId) examAddCard.classList.toggle('hidden', !isAdminView());
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
  const base = { id: row.id, type: row.type, title: row.title, uploadedBy: row.uploaded_by };
  return row.type === 'pdf'
    ? { ...base, fileName: row.file_name, url: row.url, storagePath: row.storage_path }
    : { ...base, body: row.body };
}

// Carga en bloque (pocas queries en vez de una por materia) todo el
// contenido propio de cada materia y lo cuelga de state.data.subjects.
function mapSummaryRow(row) {
  return { id: row.id, title: row.title, fileName: row.file_name, url: row.url, storagePath: row.storage_path, author: row.author_name, authorId: row.author_id };
}

async function loadSubjectContentFromSupabase() {
  state.data.subjects.forEach(subject => {
    subject.units = [];
    subject.dates = subject.dates || [];
    subject.forum = [];
    subject.opinions = [];
    subject.polls = [];
    subject.summaries = [];
  });
  if (!supabaseClient) return;

  const [unitsRes, itemsRes, forumRes, opinionsRes, pollsRes, optionsRes, votesRes, summariesRes] = await Promise.all([
    supabaseClient.from('subject_units').select('*').order('created_at', { ascending: true }),
    supabaseClient.from('subject_content_items').select('*').order('created_at', { ascending: false }),
    supabaseClient.from('subject_forum_posts').select('*').order('created_at', { ascending: false }),
    supabaseClient.from('subject_opinions').select('*').order('created_at', { ascending: false }),
    supabaseClient.from('subject_polls').select('*').order('created_at', { ascending: false }),
    supabaseClient.from('subject_poll_options').select('*').order('position', { ascending: true }),
    supabaseClient.from('subject_poll_votes').select('*'),
    supabaseClient.from('subject_summaries').select('*').order('created_at', { ascending: false })
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

function renderYears() {
  const container = document.getElementById('yearList');
  if (!container) return;
  const grouped = groupSubjects();
  container.innerHTML = '';

  Object.keys(grouped).sort((a, b) => Number(a) - Number(b)).forEach(year => {
    const button = document.createElement('button');
    button.className = 'nav-link year-btn';
    button.dataset.year = year;
    button.textContent = `${year}° año`;
    button.addEventListener('click', () => openYear(year));
    container.appendChild(button);
  });
}

function openYear(year) {
  if (state.currentUser) enforceCorrelativityAndPersist(state.currentUser.email);

  const grouped = groupSubjects();
  const subjects = (grouped[year] || []).slice().sort((a, b) => Number(a.code) - Number(b.code));

  const label = document.getElementById('materiasYearLabel');
  if (label) label.textContent = `${year}° año`;

  renderList('subjectsGrid', subjects, subject => {
    const status = state.currentUser ? getSubjectProgress(state.currentUser.email, subject.id).status : 'No cursable';
    const statusClass = STATUS_CLASSES[status] || '';
    const modalityIcon = subject.modality === 'Presencial' ? '🏫' : '💻';
    return `
      <button class="subject-card" data-subject-id="${subject.id}">
        <div class="subject-card-top">
          <span class="subject-code">#${subject.code}</span>
          <span class="subject-status-badge ${statusClass}">${status}</span>
        </div>
        <strong class="subject-card-name">${subject.name}</strong>
        <div class="subject-card-meta">
          <span>⏱ ${subject.hours}</span>
          <span>${modalityIcon} ${subject.modality}</span>
        </div>
      </button>
    `;
  });

  document.querySelectorAll('#subjectsGrid .subject-card').forEach(card => {
    card.addEventListener('click', () => openSubject(card.dataset.subjectId));
  });

  document.querySelectorAll('.year-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.year === year));
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

  for (let i = 0; i < startOffset; i += 1) {
    const empty = document.createElement('span');
    empty.className = 'calendar-cell empty';
    grid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = toISODate(year, month, day);
    const dayEvents = state.data.calendar.filter(event => eventCoversDate(event, iso));
    const semesterEvents = dayEvents.filter(event => event.type === 'Cuatrimestre');
    const dotEvents = dayEvents.filter(event => event.type !== 'Cuatrimestre');
    const isHoliday = dayEvents.some(event => event.type === 'Feriado');
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'calendar-cell';
    if (isHoliday) cell.classList.add('holiday');
    if (iso === todayISO) cell.classList.add('today');
    if (iso === selectedDate) cell.classList.add('selected');
    if (semesterEvents.length) {
      const weekdayIndex = (startOffset + day - 1) % 7;
      const isRowFirst = weekdayIndex === 0;
      const isRowLast = weekdayIndex === 6;
      const runStart = isRowFirst || !isSemesterDay(addDaysISO(iso, -1));
      const runEnd = isRowLast || !isSemesterDay(addDaysISO(iso, 1));
      cell.classList.add('semester-range');
      if (runStart) cell.classList.add('semester-run-start'); else cell.classList.add('semester-bridge-left');
      if (runEnd) cell.classList.add('semester-run-end'); else cell.classList.add('semester-bridge-right');
    }
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
      <input type="text" name="room" value="${item.room || ''}" placeholder="${item.modality === 'Virtual' ? 'Código de clase (opcional)' : 'Aula (opcional)'}" />
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
  const roomBadge = item.room ? `<span class="event-room-badge">📍 ${item.room}</span>` : '';
  const isHoliday = item.type !== 'Feriado' && item.type !== 'Cuatrimestre' && isHolidayDate(item.date);
  const holidayBadge = isHoliday ? '<span class="event-holiday-badge">⚠ Feriado: no hay clase</span>' : '';
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
  const modalityBadge = item.modality ? `<span class="event-modality-badge ${item.modality === 'Presencial' ? 'presencial' : 'virtual'}">${item.modality} esta semana</span>` : '';
  const roomBadge = item.room ? `<span class="event-room-badge">📍 ${item.room}</span>` : '';
  const isHoliday = isHolidayDate(item.date);
  const holidayBadge = isHoliday ? '<span class="event-holiday-badge">⚠ Feriado: no hay clase</span>' : '';
  const adminControls = (isAdminView() && item.seriesId) ? `<div class="stack-row">
      <button type="button" class="ghost-btn small-btn danger-btn" data-calendar-delete-series="${item.seriesId}">Borrar serie</button>
    </div>` : '';
  return `<article class="item-card"><strong>${name}</strong><span><i class="event-dot" style="background:${EVENT_TYPE_COLORS.Clase}"></i>${item.weekdayLabel} · ${timeLabel} · Clase</span>${modalityBadge}${roomBadge}${holidayBadge}${adminControls}</article>`;
}

function renderCalendarList() {
  const { selectedDate, holidaysListOpen } = state.calendarView;
  const target = document.getElementById('calendarFull');
  if (!target) return;

  let html;
  if (holidaysListOpen) {
    // Todos los feriados cargados, del más reciente al más antiguo.
    const holidays = state.data.calendar
      .filter(event => event.type === 'Feriado')
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    html = holidays.map(buildCalendarCard).join('');
  } else if (selectedDate) {
    // Un día puntual: se ve tal cual, incluido el feriado o la clase específica de ese día si la hay.
    const events = state.data.calendar.filter(event => eventCoversDate(event, selectedDate));
    const sorted = sortEventsForDisplay(events);
    html = sorted.map(buildCalendarCard).join('');
  } else {
    // Vista general: ni los feriados ni las "Clase" se listan uno por uno (serían
    // decenas); las clases se resumen por serie y los feriados se ven con el
    // botón dedicado. Igual siguen coloreados en la grilla del mes.
    const classEvents = state.data.calendar.filter(event => event.type === 'Clase');
    const otherEvents = state.data.calendar.filter(event => event.type !== 'Clase' && event.type !== 'Feriado');
    const summaries = summarizeRecurringClasses(classEvents);
    const sorted = sortEventsForDisplay(otherEvents);
    html = summaries.map(buildRecurringClassSummaryCard).join('') + sorted.map(buildCalendarCard).join('');
  }

  target.innerHTML = html || createItemCard('Sin datos', 'No hay información cargada.', '');

  if (state.editingCalendarId) {
    const editingItem = state.data.calendar.find(item => item.id === state.editingCalendarId);
    const select = target.querySelector('.calendar-edit-subject-select');
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
      .filter(subject => String(subject.semester) === parity)
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

function renderContentItemBody(item) {
  const meta = item.type === 'pdf' ? `PDF · Subido por ${item.uploadedBy}` : `Clase · Publicada por ${item.uploadedBy}`;
  const pdfSrc = item.url || item.dataUrl;
  const isMobile = window.innerWidth <= 900;
  const body = item.type === 'pdf'
    ? (isMobile
        ? `<div class="pdf-mobile-open">
             <p>En el celular, los PDFs se abren en una pestaña nueva.</p>
             <div class="pdf-toolbar">
               <button type="button" class="download-link" data-pdf-open="${item.id}">↗ Abrir PDF</button>
               <a class="download-link" href="${pdfSrc}" download="${item.fileName}">⬇ Descargar PDF</a>
             </div>
           </div>`
        : `<iframe id="pdfPreviewFrame" class="pdf-preview" src="${pdfSrc}" title="${item.title}"></iframe>
       <div class="pdf-toolbar">
         <button type="button" class="download-link" data-pdf-fullscreen>⛶ Pantalla completa</button>
         <a class="download-link" href="${pdfSrc}" target="_blank" rel="noopener">↗ Abrir en pestaña nueva</a>
         <a class="download-link" href="${pdfSrc}" download="${item.fileName}">⬇ Descargar PDF</a>
       </div>`)
    : `<div class="clase-body">${/^\s*</.test(item.body || '') ? item.body : parseClaseBody(item.body)}</div>`;

  return `
    <div class="content-item">
      <div class="section-head"><h3>${item.title}</h3><span class="content-item-meta">${meta}</span></div>
      ${body}
    </div>
  `;
}

function refreshContentUnitSelect(subject) {
  const select = document.getElementById('contentUnitSelect');
  if (!select) return;
  select.innerHTML = subject.units.map(unit => `<option value="${unit.id}">${unit.title}</option>`).join('');
}

function renderSubjectContent(subject) {
  const mainTarget = document.getElementById('subjectContent');
  const navTarget = document.getElementById('unitNavList');
  if (!mainTarget || !navTarget) return;

  if (!subject.units.length) {
    navTarget.innerHTML = createItemCard('Sin unidades', 'Todavía no se cargaron unidades.', '');
    mainTarget.innerHTML = createItemCard('Sin contenido todavía', 'El equipo docente todavía no cargó unidades para esta materia.', '');
    return;
  }

  navTarget.innerHTML = subject.units.map(unit => {
    const isOpen = unit.id === state.currentUnitId;
    const icon = itemType => (itemType === 'pdf' ? '📄' : '🎓');

    const itemsHtml = unit.items.length
      ? unit.items.map(item => {
          const itemDeleteControl = isAdminView()
            ? (state.confirmDeleteItemId === item.id
                ? `<span class="unit-nav-confirm">
                     <button type="button" class="icon-btn tiny-btn danger-btn" data-confirm-delete-item="${item.id}" data-unit-id="${unit.id}" title="Confirmar eliminación">✓</button>
                     <button type="button" class="icon-btn tiny-btn" data-cancel-delete-item="${item.id}" title="Cancelar">✕</button>
                   </span>`
                : `<button type="button" class="icon-btn tiny-btn ghost-btn" data-delete-item-trigger="${item.id}" title="Eliminar contenido">🗑</button>`)
            : '';
          return `
            <div class="unit-nav-item-row">
              <button type="button" class="unit-nav-item ${item.id === state.currentItemId ? 'active' : ''}" data-unit-id="${unit.id}" data-item-id="${item.id}">
                ${icon(item.type)} ${item.title}
              </button>
              ${itemDeleteControl}
            </div>
          `;
        }).join('')
      : '<span class="unit-nav-empty">Sin contenido</span>';

    const unitDeleteControl = isAdminView()
      ? (state.confirmDeleteUnitId === unit.id
          ? `<span class="unit-nav-confirm">
               <button type="button" class="icon-btn tiny-btn danger-btn" data-confirm-delete-unit="${unit.id}" title="Confirmar eliminación de la unidad">✓</button>
               <button type="button" class="icon-btn tiny-btn" data-cancel-delete-unit="${unit.id}" title="Cancelar">✕</button>
             </span>`
          : `<button type="button" class="icon-btn tiny-btn ghost-btn" data-delete-unit-trigger="${unit.id}" title="Eliminar unidad">🗑</button>`)
      : '';

    return `
      <div class="unit-nav-block">
        <div class="unit-nav-header">
          <button type="button" class="unit-nav-btn ${isOpen ? 'open' : ''}" data-unit-id="${unit.id}">
            <span>${unit.title}</span>
            <span class="unit-nav-count">${unit.items.length}</span>
            <span class="unit-nav-arrow">▾</span>
          </button>
          ${unitDeleteControl}
        </div>
        <div class="unit-nav-items ${isOpen ? 'open' : ''}">${itemsHtml}</div>
      </div>
    `;
  }).join('');

  navTarget.querySelectorAll('.unit-nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      state.currentUnitId = state.currentUnitId === button.dataset.unitId ? null : button.dataset.unitId;
      renderSubjectContent(subject);
    });
  });

  navTarget.querySelectorAll('.unit-nav-item').forEach(button => {
    button.addEventListener('click', () => {
      const unit = subject.units.find(item => item.id === button.dataset.unitId);
      const item = unit ? unit.items.find(entry => entry.id === button.dataset.itemId) : null;

      if (item && item.type === 'pdf' && window.innerWidth <= 900) {
        openPdfForItem(item);
        state.currentUnitId = button.dataset.unitId;
        renderSubjectContent(subject);
        return;
      }

      state.currentUnitId = button.dataset.unitId;
      state.currentItemId = button.dataset.itemId;
      renderSubjectContent(subject);
    });
  });

  navTarget.querySelectorAll('[data-delete-unit-trigger]').forEach(button => {
    button.addEventListener('click', () => {
      state.confirmDeleteUnitId = button.dataset.deleteUnitTrigger;
      renderSubjectContent(subject);
    });
  });
  navTarget.querySelectorAll('[data-cancel-delete-unit]').forEach(button => {
    button.addEventListener('click', () => {
      state.confirmDeleteUnitId = null;
      renderSubjectContent(subject);
    });
  });
  navTarget.querySelectorAll('[data-confirm-delete-unit]').forEach(button => {
    button.addEventListener('click', () => deleteUnit(subject, button.dataset.confirmDeleteUnit));
  });

  navTarget.querySelectorAll('[data-delete-item-trigger]').forEach(button => {
    button.addEventListener('click', () => {
      state.confirmDeleteItemId = button.dataset.deleteItemTrigger;
      renderSubjectContent(subject);
    });
  });
  navTarget.querySelectorAll('[data-cancel-delete-item]').forEach(button => {
    button.addEventListener('click', () => {
      state.confirmDeleteItemId = null;
      renderSubjectContent(subject);
    });
  });
  navTarget.querySelectorAll('[data-confirm-delete-item]').forEach(button => {
    button.addEventListener('click', () => deleteContentItem(subject, button.dataset.unitId, button.dataset.confirmDeleteItem));
  });

  const selectedItem = state.currentItemId
    ? subject.units.flatMap(unit => unit.items).find(item => item.id === state.currentItemId)
    : null;
  const targetItemId = selectedItem ? selectedItem.id : '';

  // Solo re-renderizamos el contenido central si cambió el ítem seleccionado,
  // para no recargar el iframe del PDF cada vez que se abre/cierra una unidad.
  if (mainTarget.dataset.itemId !== targetItemId) {
    mainTarget.innerHTML = selectedItem
      ? renderContentItemBody(selectedItem)
      : createItemCard('Seleccioná un contenido', 'Elegí una unidad y un PDF o clase desde el menú de la derecha para verlo acá.', '');
    mainTarget.dataset.itemId = targetItemId;
    const openBtn = mainTarget.querySelector('[data-pdf-open]');
    if (openBtn && selectedItem) {
      openBtn.addEventListener('click', () => openPdfForItem(selectedItem));
    }
  }
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
  state.confirmDeleteItemId = null;
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
    ? `<button type="button" class="icon-btn tiny-btn ghost-btn" data-delete-summary="${summary.id}" title="Eliminar resumen">🗑</button>`
    : '';
  return `
    <article class="item-card summary-card">
      <div class="summary-card-head">
        <a href="${summary.url}" target="_blank" rel="noopener"><strong>${summary.title}</strong></a>
        ${deleteBtn}
      </div>
      <span>Por ${summary.author}${summary.fileName ? ` · ${summary.fileName}` : ''}</span>
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
    .replace(/>/g, '&gt;');
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

function buildSubjectExamCard(item) {
  const timeLabel = item.startTime ? ` · ${item.startTime}` : '';
  const adminControls = isAdminView()
    ? `<button type="button" class="ghost-btn small-btn danger-btn" data-subject-exam-delete="${item.id}">Eliminar</button>`
    : '';
  return `<article class="item-card"><strong>${item.title}</strong><span>${item.date}${timeLabel}</span>${adminControls}</article>`;
}

function renderSubjectDates(subject) {
  const target = document.getElementById('subjectDates');
  if (!target) return;
  const exams = state.data.calendar
    .filter(event => event.type === 'Examen' && event.subjectId === subject.id)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));

  target.innerHTML = exams.length
    ? exams.map(buildSubjectExamCard).join('')
    : createItemCard('Sin fechas de examen cargadas', 'Todavía no hay fechas de examen para esta materia.', '');
}

function renderSubjectLists(subject) {
  renderSubjectContent(subject);
  renderSubjectDates(subject);
  renderList('subjectForum', subject.forum, item => createItemCard(item.author, 'Comentario en el foro', item.content));
  renderOpinions(subject);
  renderPolls(subject);
  renderSummaries(subject);
}

function setSubjectTab(tab) {
  document.querySelectorAll('.subject-tab').forEach(button => {
    button.classList.toggle('active', button.dataset.subjectTab === tab);
  });
  document.querySelectorAll('.subject-panel').forEach(panel => {
    panel.classList.toggle('hidden', panel.dataset.subjectPanel !== tab);
  });
}

function openSubject(subjectId) {
  const subject = state.data.subjects.find(item => item.id === subjectId);
  if (!subject) return;

  state.currentSubjectId = subject.id;
  state.currentUnitId = null;
  state.currentItemId = null;
  state.opinionProfessorFilter = 'all';
  state.opinionStarFilter = 'all';

  const year = document.getElementById('subjectYear');
  const title = document.getElementById('subjectTitle');
  const summary = document.getElementById('subjectSummary');
  const contentAddCard = document.getElementById('subjectContentAdmin');
  const examAddCard = document.getElementById('subjectExamAdmin');

  if (year) year.textContent = `${subject.year}° año · ${subject.semester}° cuatrimestre`;
  if (title) title.textContent = subject.name;
  if (summary && state.currentUser) {
    const progress = getSubjectProgress(state.currentUser.email, subject.id);
    summary.textContent = `Estado: ${progress.status} · Nota final: ${progress.grades.notaFinal || '-'} · Correlativas: ${correlativeCodes(subject)}`;
  }
  if (contentAddCard) contentAddCard.classList.toggle('hidden', !isAdminView());
  if (examAddCard) examAddCard.classList.toggle('hidden', !isAdminView());

  renderSubjectLists(subject);
  refreshContentUnitSelect(subject);
  setSubjectTab('contenido');

  const backBtn = document.getElementById('backToMaterias');
  if (backBtn) backBtn.onclick = () => openYear(subject.year);

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

  if (name) name.textContent = getFullName(user);
  if (role) role.textContent = state.viewMode === 'user' && user.role === 'admin' ? 'Estudiante (vista previa)' : (user.role === 'admin' ? 'Administrador' : 'Estudiante');
  renderAvatarInto(avatar, user);
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

function setupUnitsNavToggle() {
  setupDrawerToggle({
    layoutId: 'contentLayout',
    toggleId: 'unitsNavToggle',
    closeId: 'unitsNavClose',
    backdropId: 'unitsNavBackdrop',
    openClass: 'units-nav-open',
    autoCloseItemSelector: '.unit-nav-item'
  });
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
    ? `<a class="whatsapp-btn" target="_blank" rel="noopener" href="https://wa.me/${student.phone.replace(/[^0-9]/g, '')}">💬 Contactar por WhatsApp</a>`
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
  setupUnitsNavToggle();
  setupCalendarNavToggle();
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
      const name = document.getElementById('registerName').value.trim();
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
        options: { data: { name } }
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

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (supabaseClient) await supabaseClient.auth.signOut();
      window.location.reload();
    });
  }

  const viewModeToggle = document.getElementById('viewModeToggle');
  if (viewModeToggle) {
    viewModeToggle.addEventListener('click', () => {
      if (!state.currentUser || state.currentUser.role !== 'admin') return;
      state.viewMode = state.viewMode === 'user' ? 'admin' : 'user';
      state.editingCalendarId = null;
      state.editingForumId = null;
      updatePortalHeader(state.currentUser);
      renderCalendarList();
      renderForumList();
    });
  }

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
  const newCalendarEventModality = document.getElementById('newCalendarEventModality');
  const newCalendarEventRoom = document.getElementById('newCalendarEventRoom');
  if (newCalendarEventModality && newCalendarEventRoom) {
    newCalendarEventModality.addEventListener('change', () => {
      newCalendarEventRoom.placeholder = newCalendarEventModality.value === 'Virtual' ? 'Código de clase (opcional)' : 'Aula (opcional)';
    });
  }

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

  if (cancelNewCalendarEvent && newCalendarEventForm) {
    cancelNewCalendarEvent.addEventListener('click', () => {
      newCalendarEventForm.reset();
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
      if (!title || !date) return;
      await createCalendarEvent({ title, date, type, endDate, startTime, endTime, subjectId, modality, room });
      newCalendarEventForm.reset();
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
      if (!subjectId || !startTime || !endTime) return;

      const submitBtn = recurringClassForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      const result = await generateRecurringClasses({ subjectId, weekday, startTime, endTime, presencialCount, virtualCount, room });
      if (submitBtn) submitBtn.disabled = false;

      if (!result.ok) {
        if (recurringNotice) { recurringNotice.className = 'notice show error'; recurringNotice.textContent = result.message; }
        return;
      }
      recurringClassForm.reset();
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

  const calendarFullEl = document.getElementById('calendarFull');
  if (calendarFullEl) {
    calendarFullEl.addEventListener('click', event => {
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
        deleteCalendarSeries(deleteSeriesBtn.dataset.calendarDeleteSeries).then(renderCalendarViews);
      }
    });

    calendarFullEl.addEventListener('change', event => {
      const modalitySelect = event.target.closest('[data-calendar-edit-form] select[name="modality"]');
      if (!modalitySelect) return;
      const roomInput = modalitySelect.closest('form').querySelector('input[name="room"]');
      if (roomInput) roomInput.placeholder = modalitySelect.value === 'Virtual' ? 'Código de clase (opcional)' : 'Aula (opcional)';
    });

    calendarFullEl.addEventListener('submit', async event => {
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
        room: form.room.value.trim()
      });
      state.editingCalendarId = null;
      renderCalendarViews();
    });
  }

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

  document.querySelectorAll('.subject-tab').forEach(button => {
    button.addEventListener('click', () => setSubjectTab(button.dataset.subjectTab));
  });

  if (contentTypeSelect) {
    contentTypeSelect.addEventListener('change', () => {
      const isPdf = contentTypeSelect.value === 'pdf';
      document.getElementById('contentFileInput').classList.toggle('hidden', !isPdf);
      document.getElementById('contentBodyWrapper').classList.toggle('hidden', isPdf);
      if (!isPdf) initClaseEditor();
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
            file_name: file.name, url: urlData.publicUrl, storage_path: path, uploaded_by: uploadedBy
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
        unit.items.unshift(newItem);
        state.currentItemId = newItem.id;
        renderSubjectLists(subject);
        contentItemForm.reset();
        if (contentItemNotice) contentItemNotice.className = 'notice';
      } else {
        const editor = getClaseEditorContent();
        const body = (editor ? editor.getContent() : document.getElementById('contentBodyInput').value).trim();
        if (!body) return;

        const uploadedBy = getFullName(state.currentUser);
        const { data, error } = await supabaseClient
          .from('subject_content_items')
          .insert({ unit_id: unit.id, subject_id: subject.id, type: 'clase', title, body, uploaded_by: uploadedBy })
          .select().single();

        if (error) {
          if (contentItemNotice) {
            contentItemNotice.className = 'notice show error';
            contentItemNotice.textContent = 'No se pudo guardar la clase: ' + error.message;
          }
          return;
        }

        const newItem = mapContentItemRow(data);
        unit.items.unshift(newItem);
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

  const subjectExamForm = document.getElementById('subjectExamForm');
  if (subjectExamForm) {
    subjectExamForm.addEventListener('submit', async event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      if (!subject || !isAdminView()) return;

      const title = document.getElementById('subjectExamTitle').value.trim() || `Examen · ${subject.name}`;
      const date = document.getElementById('subjectExamDate').value;
      const startTime = document.getElementById('subjectExamTime').value;
      if (!date) return;

      await createCalendarEvent({ title, date, type: 'Examen', endDate: '', startTime, endTime: '', subjectId: subject.id });
      subjectExamForm.reset();
      renderSubjectDates(subject);
    });
  }

  const subjectDatesEl = document.getElementById('subjectDates');
  if (subjectDatesEl) {
    subjectDatesEl.addEventListener('click', event => {
      const deleteBtn = event.target.closest('[data-subject-exam-delete]');
      if (!deleteBtn || !isAdminView()) return;
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      if (!subject) return;
      deleteCalendarEvent(deleteBtn.dataset.subjectExamDelete).then(() => renderSubjectDates(subject));
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
        <td>${profile.name}</td>
        <td>${profile.email}</td>
        <td><span class="subject-status-badge ${isAdmin ? 'status-aprobada' : 'status-cursable'}">${isAdmin ? 'Administrador' : 'Estudiante'}</span></td>
        <td>${profile.email_verified ? 'Verificado' : 'Pendiente'}${isBanned ? ' · <span class="subject-status-badge status-no-cursable">Suspendido</span>' : ''}</td>
        <td class="stack-row">
          <button type="button" class="ghost-btn small-btn" data-toggle-role="${profile.id}" data-current-role="${profile.role}" ${selfAttrs}>${toggleLabel}</button>
          <button type="button" class="ghost-btn small-btn" data-toggle-ban="${profile.id}" data-current-banned="${isBanned}" ${selfAttrs}>${isBanned ? 'Desbanear' : 'Banear'}</button>
          <button type="button" class="ghost-btn small-btn" data-reset-password="${profile.id}" data-email="${profile.email}" data-name="${profile.name}">Cambiar contraseña</button>
          <button type="button" class="ghost-btn small-btn danger-btn" data-delete-user="${profile.id}" data-name="${profile.name}" ${selfAttrs}>Eliminar</button>
        </td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="5" class="table-empty">Todavía no hay usuarios registrados.</td></tr>';

  target.innerHTML = `
    <div class="table-scroll">
      <table class="admin-table">
        <thead>
          <tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Correo verificado</th><th>Acciones</th></tr>
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
        correlatives: correlativeIds
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
        }
      } else {
        state.data.subjects.push({
          id, code, year, semester, name, hours, modality, libre, examFinal,
          correlatives: correlativeIds,
          units: [], dates: [], forum: [], opinions: [], polls: []
        });
      }

      if (state.currentUser) enforceCorrelativityAndPersist(state.currentUser.email);

      renderAdminSubjectsTable();
      updateAdminHeader(state.currentUser);
      resetSubjectForm();
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

document.addEventListener('click', event => {
  const btn = event.target.closest('[data-pdf-fullscreen]');
  if (!btn) return;
  const frame = document.getElementById('pdfPreviewFrame');
  if (!frame) return;
  const isVisible = frame.offsetParent !== null;
  if (isVisible && frame.requestFullscreen) {
    frame.requestFullscreen().catch(() => window.open(frame.src, '_blank'));
  } else {
    window.open(frame.src, '_blank');
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
      const name = document.getElementById('accountName').value.trim();
      const lastName = document.getElementById('accountLastName').value.trim();
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

async function init() {
  setupThemeToggle();
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