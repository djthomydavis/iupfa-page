# Simulador de evaluaciones por materia

Fecha: 2026-10-21

## Objetivo

Los alumnos practican con simulacros de examen dentro de cada materia, corregidos con los mismos criterios que se usan en el examen real. Sirve para cualquier materia: Matemática Aplicada es el primer caso, no el único.

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Quién crea las evaluaciones | Solo admins (vista admin). Los alumnos solo las rinden. |
| Tipos de pregunta en esta versión | Solo "afirmaciones V/F": un enunciado y N afirmaciones, cada una verdadera o falsa. Cada pregunta guarda un campo `type` para poder sumar otros formatos después. |
| Resultados | Se muestran al entregar y no se guardan. |
| Enunciados | Texto con fórmulas opcionales en LaTeX entre `$...$` (en línea) o `$$...$$` (en bloque), renderizadas con KaTeX. Sin `$`, es texto común. |
| Almacenamiento | Una tabla `subject_exams`; las preguntas van como JSON dentro de cada fila. |
| Seguridad | La corrección se hace en el navegador, así que un alumno con conocimientos técnicos puede leer las respuestas. Es aceptable para un simulador; si alguna vez cuenta para la nota, la corrección tiene que pasar al servidor. |

## Regla de corrección

Valores por evaluación: `pointsPerQuestion` (P), `fpPenalty` y `fnPenalty` (montos), `fpPenaltyEnabled` y `fnPenaltyEnabled`.

Para cada afirmación de una pregunta:

- **Acierto:** el alumno marcó lo mismo que la respuesta correcta.
- **Falso positivo (FP):** marcó V y era F, o la dejó en blanco y era F.
- **Falso negativo (FN):** marcó F y era V, o la dejó en blanco y era V.

Puntaje de la pregunta:

1. Si no hay errores, la pregunta vale P.
2. Si hay algún error de un tipo cuyo descuento está **desactivado**, la pregunta vale 0 (todo o nada para ese tipo de error).
3. Si no, vale `P − (cantidad de FP × fpPenalty) − (cantidad de FN × fnPenalty)`. Puede quedar negativa, y el excedente resta del total.

El orden importa: si hay un error de un tipo desactivado (regla 2), la pregunta vale 0 aunque también tenga errores del tipo activado.

Total del examen = suma de los puntajes de las preguntas. Puede ser negativo.
Máximo = P × cantidad de preguntas.
Porcentaje = total ÷ máximo × 100.

Aprobación:

- `passMode: 'percent'`: aprueba si porcentaje ≥ `passValue`.
- `passMode: 'points'`: aprueba si total ≥ `passValue`.

Los cálculos se redondean a 2 decimales al final, para evitar errores de coma flotante (0,5 − 0,2 − 0,1 tiene que dar 0,2).

### Casos de prueba

Todos con P = 0,5, fpPenalty = 0,2, fnPenalty = 0,1 y ambos descuentos activados, salvo que se indique otra cosa.

| Correctas | Marcadas | Resultado |
|---|---|---|
| V F F V F | V F F V F | 0,5 |
| V F F V F | V V F F F | 0,5 − 0,2 − 0,1 = 0,2 (el ejemplo del usuario) |
| F F F F F | V V V F F | 0,5 − 0,6 = −0,1 |
| V F F V F | V _ F V F (en blanco, era F) | 0,5 − 0,2 = 0,3 |
| V F F V F | V F F _ F (en blanco, era V) | 0,5 − 0,1 = 0,4 |
| V F F V F | V V F V F, con FP desactivado | 0 |
| V F F V F | V F F F F, con FP desactivado | 0,5 − 0,1 = 0,4 |

## Modelo de datos

Tabla nueva en `supabase_schema.sql`:

```sql
create table if not exists public.subject_exams (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null references public.subjects(id) on delete cascade,
  title text not null,
  description text not null default '',
  duration_minutes integer,               -- null = sin límite
  config jsonb not null,                  -- criterios de corrección y aprobación
  questions jsonb not null default '[]',  -- lista de preguntas
  created_by_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- RLS: select para authenticated; insert/update/delete solo public.is_admin().
```

`config`:

```json
{ "pointsPerQuestion": 0.5,
  "fpPenaltyEnabled": true, "fpPenalty": 0.2,
  "fnPenaltyEnabled": true, "fnPenalty": 0.1,
  "passMode": "percent", "passValue": 60 }
```

Cada elemento de `questions`:

```json
{ "id": "q_…", "type": "true_false_statements",
  "prompt": "Sea $f(x) = x^2 - 4$. Indicar V o F:",
  "statements": [ { "text": "$f(2) = 0$", "answer": true }, … ] }
```

En el JS, `mapExamRow` convierte la fila al formato de la app (`durationMinutes`, `config`, `questions`) y los exámenes se cargan junto con el resto de los datos de las materias en `subject.exams`.

## Interfaz

### Navegación

Una entrada nueva en la barra interna de la materia: **"Evaluaciones"**, entre "Clases grabadas" y "Resúmenes", con el ícono `icon-check-circle`. Usa su propio panel, `data-subject-panel="evaluaciones"`.

### Lista de evaluaciones (todos)

Tarjetas con título, descripción, cantidad de preguntas, duración ("Sin límite" si no tiene), criterio de aprobación ("Aprueba con 60 %" o "Aprueba con 6 puntos") y un resumen de los descuentos ("FP −0,2 · FN −0,1" o "Sin descuentos"). Botón "Comenzar".

En vista admin cada tarjeta suma "Editar" y "Eliminar" (con confirmación), y arriba aparece "Nueva evaluación". Las evaluaciones sin preguntas se muestran solo a admins.

### Editor (solo admins)

En el área principal, en lugar de la lista:

- Datos: título, descripción, duración en minutos (vacío = sin límite).
- Criterios: puntaje por pregunta; "Los falsos positivos restan" (casilla + monto); "Los falsos negativos restan" (casilla + monto); aprobación por porcentaje o por puntaje + valor. Un texto de ayuda explica la regla de corrección, incluido que un descuento desactivado deja la pregunta en 0 ante ese error.
- Preguntas: una lista. Cada pregunta tiene enunciado (textarea) con vista previa renderizada debajo, y sus afirmaciones, cada una con texto, selector V/F y botón para quitarla. "Agregar afirmación" agrega una más; las preguntas nuevas arrancan con 5. Cada pregunta se puede subir, bajar o eliminar. "Agregar pregunta" al final.
- "Guardar" valida antes de guardar: título no vacío, al menos 1 pregunta, cada pregunta con enunciado y al menos 2 afirmaciones con texto, y montos y valor de aprobación ≥ 0. Si algo falla, marca el error junto al campo. "Cancelar" vuelve a la lista sin guardar.

### Rendir

- Barra fija arriba del área: título, reloj en cuenta regresiva (si hay duración), "N de M preguntas completas" y "Entregar".
- Cada pregunta muestra enunciado y afirmaciones renderizados. Cada afirmación tiene un grupo V/F de dos botones (`role="radiogroup"`, 44px). Tocar el marcado lo desmarca y deja la afirmación en blanco.
- "Entregar" pide confirmación si quedan afirmaciones en blanco y avisa que cuentan como error.
- Con el reloj en 0, la evaluación se entrega sola.
- Salir de la evaluación (otra sección, otra materia, "Volver") con respuestas marcadas pide confirmación. El intento no se guarda.

### Resultado

- Resumen: total con 2 decimales sobre el máximo, porcentaje, "Aprobado" o "No aprobado" y tiempo usado.
- Corrección por pregunta: enunciado; cada afirmación con lo marcado, la respuesta correcta y la etiqueta Acierto / Falso positivo / Falso negativo / En blanco; puntaje de la pregunta con el cálculo ("0,5 − 0,2 − 0,1 = 0,2").
- Botones "Volver a intentar" y "Volver a evaluaciones".

## Organización del código

- `app.js`:
  - `scoreQuestion(question, answers, config)` y `scoreExam(exam, answers)`: funciones puras, sin DOM, con la regla de arriba.
  - `renderMath(element)`: aplica KaTeX auto-render, y si KaTeX no cargó deja el texto tal cual.
  - `renderExamsSection(subject)` con sus subvistas (lista, editor, intento, resultado) y el estado `state.examView`.
  - Carga, guardado y borrado contra Supabase.
- `index.html`: panel nuevo, más los `<link>`/`<script>` de KaTeX desde jsDelivr con versión fija.
- `styles.css`: estilos de las cuatro subvistas, mobile-first, sin scroll horizontal a 360px, áreas táctiles de 44px y modo oscuro.
- `supabase_schema.sql`: tabla y políticas nuevas. El usuario las corre en el editor SQL de Supabase.

Antes de integrar KaTeX hay que consultar su documentación actual (Context7): versión, auto-render, delimitadores y manejo de errores.

Como la herramienta es para cualquier materia, un `$` común (por ejemplo, un monto "$1500" en una materia no matemática) no debe romper el texto. El editor tiene que permitir escribir un `$` literal como `\$`, y el texto de ayuda lo tiene que explicar. Hay que verificar en la documentación de KaTeX que su auto-render respete ese escape; si no lo hace, se resuelve antes de pasar el texto a KaTeX.

## Pruebas

- Corrección: un archivo de pruebas en Node (`tests/exam-scoring.test.js`, con `node --test`) que cubre todos los casos de la tabla, aprobación por porcentaje y por puntos, y redondeo. Para importarlas, las funciones puras van en `exam-scoring.js`, cargado como script normal antes de `app.js` y exportado con `module.exports` cuando corre en Node.
- Interfaz: el método ya usado (index.html real + datos inyectados + Chrome headless) a 375, 768 y 1440px, en vista admin y alumno: editor, rendir, entrega automática por tiempo, resultado, sin desbordes y con áreas táctiles de 44px.

## Fuera de alcance

- Otros tipos de pregunta (opción múltiple, desarrollo).
- Guardar intentos o historial.
- Mezclar el orden de preguntas o afirmaciones.
- Subir imágenes a los enunciados.
- Corregir del lado del servidor.
