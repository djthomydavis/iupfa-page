import collections
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import generar  # noqa: E402
from preguntas import TOPICS  # noqa: E402


class BancoTest(unittest.TestCase):
    def test_cada_tema_alcanza_justo_para_las_evaluaciones(self):
        for topic, bank, per_exam in TOPICS:
            self.assertEqual(len(bank), per_exam * generar.EXAM_COUNT, topic)

    def test_cada_pregunta_tiene_tres_incorrectas_distintas_de_la_correcta(self):
        for topic, bank, _ in TOPICS:
            for prompt, correct, wrong in bank:
                self.assertEqual(len(wrong), 3, prompt)
                options = [correct] + wrong
                self.assertEqual(len(set(options)), 4, prompt)
                for text in options + [prompt]:
                    self.assertTrue(text.strip(), prompt)
                    # "$" abre una fórmula en el portal.
                    self.assertNotIn('$', text, prompt)

    def test_no_hay_enunciados_repetidos(self):
        prompts = [prompt for _, bank, _ in TOPICS for prompt, _, _ in bank]
        self.assertEqual(len(prompts), len(set(prompts)))


class EvaluacionesTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.exams = generar.build_exams()

    def test_cinco_evaluaciones_de_veinte_preguntas_y_diez_puntos(self):
        self.assertEqual(len(self.exams), 5)
        for exam in self.exams:
            self.assertEqual(len(exam['questions']), 20)
            self.assertEqual(exam['config']['pointsPerQuestion'] * len(exam['questions']), 10)
            self.assertFalse(exam['config']['fpPenaltyEnabled'])
            self.assertFalse(exam['config']['fnPenaltyEnabled'])

    def test_preguntas_de_opcion_multiple_con_una_correcta(self):
        bank = {prompt: correct for _, items, _ in TOPICS for prompt, correct, _ in items}
        for exam in self.exams:
            for question in exam['questions']:
                self.assertEqual(question['type'], 'multiple_choice')
                self.assertEqual(len(question['options']), 4)
                self.assertIn(question['correct'], range(4))
                self.assertEqual(question['options'][question['correct']]['text'], bank[question['prompt']])

    def test_ninguna_pregunta_se_repite_entre_evaluaciones(self):
        prompts = [q['prompt'] for exam in self.exams for q in exam['questions']]
        self.assertEqual(len(prompts), 100)
        self.assertEqual(len(set(prompts)), 100)

    def test_ids_unicos(self):
        ids = [q['id'] for exam in self.exams for q in exam['questions']]
        self.assertEqual(len(ids), len(set(ids)))

    def test_cada_evaluacion_cubre_todos_los_temas(self):
        expected = {topic: per_exam for topic, _, per_exam in TOPICS}
        for exam in self.exams:
            self.assertEqual(dict(collections.Counter(q['topic'] for q in exam['questions'])), expected)

    def test_la_correcta_queda_pareja_entre_las_cuatro_letras(self):
        for exam in self.exams:
            counts = collections.Counter(q['correct'] for q in exam['questions'])
            self.assertEqual(sorted(counts.values()), [5, 5, 5, 5])
            letters = [q['correct'] for q in exam['questions']]
            self.assertNotEqual(letters, [i % 4 for i in range(20)], 'el orden no debe ser a, b, c, d, a, ...')

    def test_es_determinista(self):
        self.assertEqual(generar.build_exams(), self.exams)

    def test_sql_idempotente_y_con_comillas_escapadas(self):
        sql = generar.build_sql(self.exams)
        self.assertIn("delete from public.subject_exams where subject_id = 'mat7' and title like 'Evaluación de práctica %';", sql)
        self.assertEqual(sql.count("('mat7', 'Evaluación de práctica "), 5)
        self.assertTrue(sql.strip().endswith('commit;'))
        # Comillas simples de las consultas SQL del banco, duplicadas para el literal.
        self.assertIn("LIKE ''_o%''", sql)


if __name__ == '__main__':
    unittest.main()
