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
    studentProgress: {}
  },
  currentUser: null,
  currentSubjectId: null,
  currentUnitId: null,
  currentItemId: null,
  confirmDeleteUnitId: null,
  confirmDeleteItemId: null,
  viewMode: 'admin',
  calendarView: { year: new Date().getFullYear(), month: new Date().getMonth(), selectedDate: null },
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
  state.data.subjects = data.map(mapSubjectRow);
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
    return;
  }

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
    role: profile.role,
    avatar: profile.avatar
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
  const newCalendarEventForm = document.getElementById('newCalendarEventForm');
  const isAdminAccount = !!(state.currentUser && state.currentUser.role === 'admin');

  if (adminShortcut) adminShortcut.classList.toggle('hidden', !isAdminView());
  if (contentAddCard && state.currentSubjectId) contentAddCard.classList.toggle('hidden', !isAdminView());
  if (addCalendarEventBtn) addCalendarEventBtn.classList.toggle('hidden', !isAdminView());
  if (newCalendarEventForm && !isAdminView()) newCalendarEventForm.classList.add('hidden');

  if (toggleBtn) {
    toggleBtn.classList.toggle('hidden', !isAdminAccount);
    toggleBtn.textContent = state.viewMode === 'user' ? 'Ver como admin' : 'Ver como usuario';
  }
}

const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const PORTAL_DATA_VERSION = '11';

// El curriculum (subjects) y el progreso por alumno viven en Supabase.
// Acá solo persistimos localmente lo que todavía no migramos: calendario,
// foro general, y el contenido propio de cada materia (unidades, fechas,
// foro de materia, opiniones, encuestas).
function extractSubjectContent() {
  const map = {};
  state.data.subjects.forEach(subject => {
    map[subject.id] = {
      units: subject.units,
      dates: subject.dates,
      forum: subject.forum,
      opinions: subject.opinions,
      polls: subject.polls
    };
  });
  return map;
}

function savePortalData() {
  try {
    localStorage.setItem('portalCalendar', JSON.stringify(state.data.calendar));
    localStorage.setItem('portalForum', JSON.stringify(state.data.forum));
    localStorage.setItem('portalSubjectContent', JSON.stringify(extractSubjectContent()));
    localStorage.setItem('portalDataVersion', PORTAL_DATA_VERSION);
    return true;
  } catch (error) {
    console.error('No se pudo guardar en localStorage (¿almacenamiento lleno?):', error);
    return false;
  }
}

function loadLocalContent() {
  const version = localStorage.getItem('portalDataVersion');
  if (version !== PORTAL_DATA_VERSION) {
    savePortalData();
    return;
  }
  try {
    const calendar = localStorage.getItem('portalCalendar');
    const forum = localStorage.getItem('portalForum');
    if (calendar) state.data.calendar = JSON.parse(calendar);
    if (forum) state.data.forum = JSON.parse(forum);
  } catch (error) {
    // keep seed defaults
  }
}

function mergeLocalSubjectContent() {
  const raw = localStorage.getItem('portalSubjectContent');
  if (!raw) return;
  try {
    const map = JSON.parse(raw);
    state.data.subjects.forEach(subject => {
      const saved = map[subject.id];
      if (!saved) return;
      subject.units = saved.units || [];
      subject.dates = saved.dates || [];
      subject.forum = saved.forum || [];
      subject.opinions = saved.opinions || [];
      subject.polls = saved.polls || [];
    });
  } catch (error) {
    // ignore malformed cache
  }
}

// Calendario, foro general y contenido de materias viven en localStorage
// (por ahora), así que no se comparten solos entre dominios (ej. tu prueba
// local vs. el sitio ya publicado). Este export/import los mueve a mano.
function exportLocalData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    version: PORTAL_DATA_VERSION,
    calendar: JSON.parse(localStorage.getItem('portalCalendar') || JSON.stringify(state.data.calendar)),
    forum: JSON.parse(localStorage.getItem('portalForum') || JSON.stringify(state.data.forum)),
    subjectContent: JSON.parse(localStorage.getItem('portalSubjectContent') || JSON.stringify(extractSubjectContent()))
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

function importLocalData(file, onDone) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      if (payload.calendar) localStorage.setItem('portalCalendar', JSON.stringify(payload.calendar));
      if (payload.forum) localStorage.setItem('portalForum', JSON.stringify(payload.forum));
      if (payload.subjectContent) localStorage.setItem('portalSubjectContent', JSON.stringify(payload.subjectContent));
      localStorage.setItem('portalDataVersion', PORTAL_DATA_VERSION);
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
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'calendar-cell';
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
      renderCalendarMonth();
      renderCalendarList();
    });
    grid.appendChild(cell);
  }
}

const CALENDAR_EVENT_TYPES = ['Académico', 'Examen', 'Inscripción', 'Feriado', 'Entrega', 'Cuatrimestre'];
const EVENT_TYPE_COLORS = {
  'Académico': '#0d6efd',
  'Examen': '#dc2626',
  'Inscripción': '#7c3aed',
  'Feriado': '#16a34a',
  'Entrega': '#f59e0b',
  'Cuatrimestre': '#38bdf8'
};

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
      <label class="field-label">Fecha fin<input type="date" name="endDate" value="${item.endDate || ''}" /></label>
      <div class="two-cols">
        <label class="field-label">Hora inicio<input type="time" name="startTime" value="${item.startTime || ''}" /></label>
        <label class="field-label">Hora fin<input type="time" name="endTime" value="${item.endTime || ''}" /></label>
      </div>
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
  return `<article class="item-card${stickyClass}"><strong>${item.title}</strong><span><i class="event-dot" style="background:${color}"></i>${formatEventSchedule(item)}</span>${adminControls}</article>`;
}

function renderCalendarList() {
  const { selectedDate } = state.calendarView;
  const events = selectedDate ? state.data.calendar.filter(event => eventCoversDate(event, selectedDate)) : state.data.calendar;
  const sorted = sortEventsForDisplay(events);
  const target = document.getElementById('calendarFull');
  if (!target) return;
  target.innerHTML = sorted.length ? sorted.map(buildCalendarCard).join('') : createItemCard('Sin datos', 'No hay información cargada.', '');
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
  const aprobadas = document.getElementById('statAprobadas');
  if (!state.currentUser) return;

  const email = state.currentUser.email;
  const statuses = state.data.subjects.map(subject => getSubjectProgress(email, subject.id).status);
  if (cursables) cursables.textContent = statuses.filter(status => status === 'Cursable').length;
  if (aprobadas) aprobadas.textContent = statuses.filter(status => status === 'Aprobada').length;
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
      const met = correlativesMet(subject, email);
      const progress = getSubjectProgress(email, subject.id);
      if (!met && progress.status !== 'No cursable') {
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
    const met = correlativesMet(subject, email);
    const availableStatusOptions = met ? STATUS_OPTIONS.filter(option => option !== 'No cursable') : ['No cursable'];

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
        <select class="table-select status-select" data-field="status" ${met ? '' : 'disabled'}>${statusOptions}</select>
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
      savePortalData();
      renderPlanningTable();
      renderHomeStats();
    });
  });

  target.querySelectorAll('.table-input').forEach(input => {
    input.addEventListener('change', event => {
      const subjectId = event.target.closest('[data-subject-id]').dataset.subjectId;
      getSubjectProgress(email, subjectId).grades[event.target.dataset.field] = event.target.value.trim();
      persistProgress(subjectId);
      savePortalData();
    });
  });
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
    : `<div class="clase-body">${parseClaseBody(item.body)}</div>`;

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
  savePortalData();
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
  savePortalData();
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
      ? (poll.options.find(option => option.votes.includes(state.currentUser.email)) || {}).id
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
    button.addEventListener('click', () => {
      if (!state.currentUser) return;
      const poll = subject.polls.find(item => item.id === button.dataset.pollId);
      if (!poll) return;
      poll.options.forEach(option => {
        option.votes = option.votes.filter(email => email !== state.currentUser.email);
      });
      const chosen = poll.options.find(option => option.id === button.dataset.optionId);
      if (chosen) chosen.votes.push(state.currentUser.email);
      savePortalData();
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

function renderSubjectLists(subject) {
  renderSubjectContent(subject);
  renderList('subjectDates', subject.dates, item => createItemCard(item, 'Fecha relevante', ''));
  renderList('subjectForum', subject.forum, item => createItemCard(item.author, 'Comentario en el foro', item.content));
  renderOpinions(subject);
  renderPolls(subject);
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

  if (year) year.textContent = `${subject.year}° año · ${subject.semester}° cuatrimestre`;
  if (title) title.textContent = subject.name;
  if (summary && state.currentUser) {
    const progress = getSubjectProgress(state.currentUser.email, subject.id);
    summary.textContent = `Estado: ${progress.status} · Nota final: ${progress.grades.notaFinal || '-'} · Correlativas: ${correlativeCodes(subject)}`;
  }
  if (contentAddCard) contentAddCard.classList.toggle('hidden', !isAdminView());

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
}

function updatePortalHeader(user) {
  const name = document.getElementById('userName');
  const role = document.getElementById('userRole');
  const avatar = document.getElementById('userAvatar');

  if (name) name.textContent = user.name;
  if (role) role.textContent = state.viewMode === 'user' && user.role === 'admin' ? 'Estudiante (vista previa)' : (user.role === 'admin' ? 'Administrador' : 'Estudiante');
  if (avatar) avatar.textContent = user.avatar;
  applyViewMode();
}

function updateAdminHeader(user) {
  const name = document.getElementById('adminName');
  const avatar = document.getElementById('adminAvatar');
  const events = document.getElementById('adminEventsCount');
  const posts = document.getElementById('adminPostsCount');
  const subjects = document.getElementById('adminSubjectsCount');

  if (name) name.textContent = user.name;
  if (avatar) avatar.textContent = user.avatar;
  if (events) events.textContent = state.data.calendar.length;
  if (posts) posts.textContent = state.data.forum.length;
  if (subjects) subjects.textContent = state.data.subjects.length;
}

function setAdminView(view) {
  const map = { panel: 'adminPanelView', materias: 'adminMateriasView', usuarios: 'adminUsuariosView' };

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

function setupUnitsNavToggle() {
  const layout = document.querySelector('.content-layout');
  const toggle = document.getElementById('unitsNavToggle');
  const close = document.getElementById('unitsNavClose');
  const backdrop = document.getElementById('unitsNavBackdrop');
  if (!layout || !toggle) return;

  const setOpen = open => layout.classList.toggle('units-nav-open', open);

  toggle.addEventListener('click', () => setOpen(!layout.classList.contains('units-nav-open')));
  if (close) close.addEventListener('click', () => setOpen(false));
  if (backdrop) backdrop.addEventListener('click', () => setOpen(false));

  const unitNavList = document.getElementById('unitNavList');
  if (unitNavList) {
    unitNavList.addEventListener('click', event => {
      if (window.innerWidth > 900) return;
      if (event.target.closest('.unit-nav-item')) setOpen(false);
    });
  }
}

function attachPortalEvents() {
  setupSidebarToggle('portalScreen');
  setupUnitsNavToggle();
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

  if (forumForm) {
    forumForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!state.currentUser) return;
      const title = document.getElementById('forumTitle').value.trim();
      const content = document.getElementById('forumContent').value.trim();
      if (!title || !content) return;
      state.data.forum.unshift({ id: generateLocalId('post'), title, content, author: state.currentUser.name });
      savePortalData();
      forumForm.reset();
      renderForumViews();
      if (document.getElementById('adminPostsCount')) document.getElementById('adminPostsCount').textContent = state.data.forum.length;
    });
  }

  const addCalendarEventBtn = document.getElementById('addCalendarEventBtn');
  const newCalendarEventForm = document.getElementById('newCalendarEventForm');
  const cancelNewCalendarEvent = document.getElementById('cancelNewCalendarEvent');

  if (addCalendarEventBtn && newCalendarEventForm) {
    addCalendarEventBtn.addEventListener('click', () => {
      if (!isAdminView()) return;
      newCalendarEventForm.classList.toggle('hidden');
      if (!newCalendarEventForm.classList.contains('hidden')) {
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
    newCalendarEventForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!isAdminView()) return;
      const title = document.getElementById('newCalendarEventTitle').value.trim();
      const date = document.getElementById('newCalendarEventDate').value;
      const type = document.getElementById('newCalendarEventType').value;
      const endDate = document.getElementById('newCalendarEventEndDate').value;
      const startTime = document.getElementById('newCalendarEventStartTime').value;
      const endTime = document.getElementById('newCalendarEventEndTime').value;
      if (!title || !date) return;
      state.data.calendar.unshift({ id: generateLocalId('event'), title, date, type, endDate, startTime, endTime });
      savePortalData();
      newCalendarEventForm.reset();
      newCalendarEventForm.classList.add('hidden');
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
        state.data.calendar = state.data.calendar.filter(item => item.id !== deleteBtn.dataset.calendarDelete);
        savePortalData();
        renderCalendarViews();
      }
    });

    calendarFullEl.addEventListener('submit', event => {
      const form = event.target.closest('[data-calendar-edit-form]');
      if (!form || !isAdminView()) return;
      event.preventDefault();
      const id = form.dataset.calendarEditForm;
      const item = state.data.calendar.find(entry => entry.id === id);
      if (!item) return;
      item.title = form.title.value.trim();
      item.date = form.date.value;
      item.type = form.type.value;
      item.endDate = form.endDate.value;
      item.startTime = form.startTime.value;
      item.endTime = form.endTime.value;
      state.editingCalendarId = null;
      savePortalData();
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
        state.data.forum = state.data.forum.filter(item => item.id !== deleteBtn.dataset.forumDelete);
        savePortalData();
        renderForumViews();
      }
    });

    forumListEl.addEventListener('submit', event => {
      const form = event.target.closest('[data-forum-edit-form]');
      if (!form || !isAdminView()) return;
      event.preventDefault();
      const id = form.dataset.forumEditForm;
      const item = state.data.forum.find(entry => entry.id === id);
      if (!item) return;
      item.title = form.title.value.trim();
      item.content = form.content.value.trim();
      state.editingForumId = null;
      savePortalData();
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
      document.getElementById('contentBodyInput').classList.toggle('hidden', isPdf);
    });
  }

  if (unitForm) {
    unitForm.addEventListener('submit', event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      if (!subject || !isAdminView()) return;
      const input = document.getElementById('unitTitleInput');
      const title = input.value.trim();
      if (!title) return;

      const newUnit = { id: generateLocalId('unit'), title, items: [] };
      subject.units.push(newUnit);
      state.currentUnitId = newUnit.id;
      if (!savePortalData()) {
        subject.units.pop();
        state.currentUnitId = null;
        alert('No se pudo guardar la unidad: el almacenamiento local del navegador está lleno. Borrá algún PDF viejo o liberá espacio e intentá de nuevo.');
        return;
      }
      renderSubjectLists(subject);
      refreshContentUnitSelect(subject);
      unitForm.reset();
    });
  }

  if (contentItemForm) {
    contentItemForm.addEventListener('submit', async event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      if (!subject || !isAdminView()) return;

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
        if (!supabaseClient) return;

        const submitBtn = contentItemForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Subiendo...';

        const path = `${subject.id}/${generateLocalId('pdf')}_${sanitizeStorageFilename(file.name)}`;
        const { error: uploadError } = await supabaseClient.storage
          .from('subject-content')
          .upload(path, file, { contentType: file.type || 'application/pdf' });

        if (submitBtn) submitBtn.textContent = 'Agregar contenido';

        if (uploadError) {
          if (contentItemNotice) {
            contentItemNotice.className = 'notice show error';
            contentItemNotice.textContent = 'No se pudo subir el PDF: ' + uploadError.message;
          }
          return;
        }

        const { data: urlData } = supabaseClient.storage.from('subject-content').getPublicUrl(path);
        const newItem = { id: generateLocalId('item'), type: 'pdf', title, fileName: file.name, url: urlData.publicUrl, storagePath: path, uploadedBy: state.currentUser.name };
        unit.items.unshift(newItem);
        state.currentItemId = newItem.id;
        if (!savePortalData()) {
          unit.items.shift();
          state.currentItemId = null;
          if (contentItemNotice) {
            contentItemNotice.className = 'notice show error';
            contentItemNotice.textContent = 'El PDF se subió pero no se pudo guardar la referencia localmente. Intentá de nuevo.';
          }
          return;
        }
        renderSubjectLists(subject);
        contentItemForm.reset();
        if (contentItemNotice) contentItemNotice.className = 'notice';
      } else {
        const body = document.getElementById('contentBodyInput').value.trim();
        if (!body) return;
        const newItem = { id: generateLocalId('item'), type: 'clase', title, body, uploadedBy: state.currentUser.name };
        unit.items.unshift(newItem);
        state.currentItemId = newItem.id;
        if (!savePortalData()) {
          unit.items.shift();
          state.currentItemId = null;
          if (contentItemNotice) {
            contentItemNotice.className = 'notice show error';
            contentItemNotice.textContent = 'No se pudo guardar la clase: el almacenamiento local del navegador está lleno. Borrá contenido viejo (por ejemplo, algún PDF) e intentá de nuevo.';
          }
          return;
        }
        renderSubjectLists(subject);
        contentItemForm.reset();
        document.getElementById('contentFileInput').classList.remove('hidden');
        document.getElementById('contentBodyInput').classList.add('hidden');
        if (contentItemNotice) contentItemNotice.className = 'notice';
      }
    });
  }

  if (pollForm) {
    pollForm.addEventListener('submit', event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      if (!subject || !state.currentUser) return;

      const question = document.getElementById('pollQuestionInput').value.trim();
      const optionsRaw = document.getElementById('pollOptionsInput').value.trim();
      const optionLabels = optionsRaw.split(',').map(value => value.trim()).filter(Boolean);
      if (!question || optionLabels.length < 2) return;

      subject.polls.unshift({
        id: generateLocalId('poll'),
        question,
        createdBy: state.currentUser.name,
        options: optionLabels.map(label => ({ id: generateLocalId('opt'), label, votes: [] }))
      });
      savePortalData();
      renderPolls(subject);
      pollForm.reset();
    });
  }

  if (subjectForumForm) {
    subjectForumForm.addEventListener('submit', event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      const input = document.getElementById('subjectForumInput');
      const content = input.value.trim();
      if (!subject || !state.currentUser || !content) return;

      subject.forum.unshift({ author: state.currentUser.name, content });
      savePortalData();
      renderSubjectLists(subject);
      subjectForumForm.reset();
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
    subjectOpinionForm.addEventListener('submit', event => {
      event.preventDefault();
      const subject = state.data.subjects.find(item => item.id === state.currentSubjectId);
      const professorInput = document.getElementById('subjectOpinionProfessor');
      const professor = professorInput.value.trim();
      const contentInput = document.getElementById('subjectOpinionInput');
      const content = contentInput.value.trim();
      const rating = Number(subjectOpinionStars ? subjectOpinionStars.dataset.rating : 0);
      if (!subject || !state.currentUser) return;

      if (!professor || !rating) {
        if (subjectOpinionNotice) {
          subjectOpinionNotice.className = 'notice show error';
          subjectOpinionNotice.textContent = 'Completá el nombre del profesor/a y elegí de 1 a 5 estrellas.';
        }
        return;
      }

      subject.opinions.unshift({ id: generateLocalId('opinion'), professor, rating, content, author: state.currentUser.name });
      savePortalData();
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
  savePortalData();
  renderAdminSubjectsTable();
  updateAdminHeader(state.currentUser);
  resetSubjectForm();
}

function attachAdminEvents() {
  setupSidebarToggle('adminScreen');
  const logoutBtn = document.getElementById('adminLogoutBtn');
  const subjectForm = document.getElementById('subjectForm');
  const subjectFormCancel = document.getElementById('subjectFormCancel');

  document.querySelectorAll('.nav-link[data-admin-view]').forEach(button => {
    button.addEventListener('click', () => setAdminView(button.dataset.adminView));
  });

  if (subjectFormCancel) subjectFormCancel.addEventListener('click', resetSubjectForm);

  const exportLocalDataBtn = document.getElementById('exportLocalDataBtn');
  const importLocalDataInput = document.getElementById('importLocalDataInput');
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

  if (importLocalDataInput) {
    importLocalDataInput.addEventListener('change', event => {
      const file = event.target.files[0];
      if (!file) return;
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
      });
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

      savePortalData();
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

async function init() {
  if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange(event => {
      if (event === 'PASSWORD_RECOVERY') state.passwordRecovery = true;
    });
  }

  await loadSubjectsFromSupabase();
  loadLocalContent();
  mergeLocalSubjectContent();
  await restoreSession();

  const page = document.body.dataset.page;
  if (page === 'portal') initPortalPage();
  if (page === 'admin') initAdminPage();
}

document.addEventListener('DOMContentLoaded', init);