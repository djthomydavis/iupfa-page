"""Genera 5 evaluaciones de práctica de Informática II (opción múltiple).

Cada evaluación tiene 20 preguntas con una sola opción correcta, 0,5 puntos
por pregunta (10 en total) y las incorrectas no restan. Las preguntas salen
de preguntas.py sin repetirse entre evaluaciones. Escribe un SQL idempotente
para cargar en Supabase:

    python -I tools/evaluaciones_informatica2/generar.py
"""
import argparse
import json
import os
import random
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from preguntas import TOPICS  # noqa: E402

SUBJECT_ID = 'mat7'
TITLE_PREFIX = 'Evaluación de práctica'
EXAM_COUNT = 5
OPTIONS_PER_QUESTION = 4
DURATION_MINUTES = 40
CONFIG = {
    'pointsPerQuestion': 0.5,
    'fpPenaltyEnabled': False,
    'fpPenalty': 0.2,
    'fnPenaltyEnabled': False,
    'fnPenalty': 0.1,
    'passMode': 'percent',
    'passValue': 60,
}
DESCRIPTION = (
    'Simulacro con contenidos de las unidades 1 (nube y virtualización), 2 (bases de datos y SQL) '
    'y 5 (redes y direccionamiento IP): 20 preguntas de opción múltiple con una sola respuesta correcta. '
    'Cada respuesta correcta suma 0,5 y las incorrectas no restan.'
)


def build_exams():
    exams = []
    for number in range(1, EXAM_COUNT + 1):
        rng = random.Random(f'inf2-evaluacion-{number}')
        picked = []
        for topic, bank, per_exam in TOPICS:
            start = (number - 1) * per_exam
            picked += [(topic, item) for item in bank[start:start + per_exam]]

        # La correcta queda la misma cantidad de veces en cada letra, en un orden al azar.
        positions = [index % OPTIONS_PER_QUESTION for index in range(len(picked))]
        rng.shuffle(positions)

        questions = []
        for index, ((topic, (prompt, correct, wrong)), position) in enumerate(zip(picked, positions), start=1):
            others = wrong[:]
            rng.shuffle(others)
            options = others[:position] + [correct] + others[position:]
            questions.append({
                'id': f'inf2-ev-{number:02d}-q{index:02d}',
                'type': 'multiple_choice',
                'topic': topic,
                'prompt': prompt,
                'options': [{'text': text} for text in options],
                'correct': position,
            })

        exams.append({
            'title': f'{TITLE_PREFIX} {number}',
            'description': DESCRIPTION,
            'duration_minutes': DURATION_MINUTES,
            'config': CONFIG,
            'questions': questions,
        })
    return exams


def _sql_text(value):
    return "'" + str(value).replace("'", "''") + "'"


def build_sql(exams):
    lines = [
        '-- Evaluaciones de práctica de Informática II (mat7), generadas con',
        '-- tools/evaluaciones_informatica2/generar.py. Correr en el editor SQL de Supabase',
        '-- DESPUÉS de crear la tabla public.subject_exams (supabase_schema.sql).',
        f'-- Es idempotente: borra y vuelve a crear solo estas {len(exams)} evaluaciones.',
        'begin;',
        f"delete from public.subject_exams where subject_id = '{SUBJECT_ID}' and title like '{TITLE_PREFIX} %';",
        'insert into public.subject_exams (subject_id, title, description, duration_minutes, config, questions, created_by_name) values',
    ]
    rows = []
    for exam in exams:
        rows.append('  (' + ', '.join([
            _sql_text(SUBJECT_ID),
            _sql_text(exam['title']),
            _sql_text(exam['description']),
            str(exam['duration_minutes']),
            _sql_text(json.dumps(exam['config'], ensure_ascii=False)) + '::jsonb',
            _sql_text(json.dumps(exam['questions'], ensure_ascii=False)) + '::jsonb',
            _sql_text('Generador de evaluaciones'),
        ]) + ')')
    lines.append(',\n'.join(rows) + ';')
    lines.append('commit;')
    return '\n'.join(lines) + '\n'


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    parser.add_argument('--sql', default=os.path.join(root, 'supabase', 'seed_informatica2_evaluaciones.sql'))
    parser.add_argument('--json', default=None, help='también escribe las evaluaciones en este archivo JSON')
    args = parser.parse_args()
    exams = build_exams()
    with open(args.sql, 'w', encoding='utf-8', newline='\n') as fh:
        fh.write(build_sql(exams))
    if args.json:
        with open(args.json, 'w', encoding='utf-8') as fh:
            json.dump(exams, fh, ensure_ascii=False, indent=2)
    total = sum(len(exam['questions']) for exam in exams)
    print(f'{len(exams)} evaluaciones, {total} preguntas -> {args.sql}')


if __name__ == '__main__':
    main()
