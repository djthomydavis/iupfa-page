"""Pruebas del generador de finales de práctica de Matemática Aplicada.

Correr con:  python -m unittest discover -s tools/finales_matematica -p "test_*.py"

Las afirmaciones calculadas traen un `check`; acá se recalculan con
implementaciones independientes (sympy, networkx, numpy y fuerza bruta),
no con las funciones del generador.
"""
import itertools
import json
import math
import re
import unittest
from collections import Counter
from fractions import Fraction

import networkx as nx
import numpy as np
import sympy
from sympy.logic.inference import satisfiable

import generar


EXAMS = generar.build_exams(with_checks=True)


def verify(check):
    """Devuelve el valor de verdad recalculado para una afirmación con check."""
    kind = check['kind']
    c = check

    if kind == 'setop':
        A, B, U = set(c['A']), set(c['B']), set(c['U'])
        value = {
            'union': A | B, 'inter': A & B, 'diff': A - B,
            'complement_union': U - (A | B),
        }[c['op']]
        return value == set(c['claimed'])
    if kind == 'card':
        A, B = set(c['A']), set(c['B'])
        real = {'powerset': 2 ** len(A), 'product': len(A) * len(B)}[c['op']]
        return real == c['claimed']
    if kind == 'logic_class':
        expr = sympy.sympify(c['expr'])
        taut = not satisfiable(sympy.Not(expr))
        contra = not satisfiable(expr)
        real = 'tautologia' if taut else 'contradiccion' if contra else 'contingencia'
        return real == c['claimed']
    if kind == 'logic_equiv':
        a, b = sympy.sympify(c['a']), sympy.sympify(c['b'])
        return (not satisfiable(sympy.Xor(a, b))) == c['claimed']
    if kind == 'count':
        n, r = c.get('n'), c.get('r')
        real = {
            'perm': lambda: math.perm(n, r),
            'comb': lambda: math.comb(n, r),
            'power': lambda: n ** r,
            'circular': lambda: math.factorial(n - 1),
            'multiset': lambda: math.factorial(len(c['word'])) // math.prod(math.factorial(v) for v in Counter(c['word']).values()),
        }[c['op']]()
        return real == c['claimed']
    if kind == 'pigeon':
        return (c['items'] > c['boxes']) == c['claimed']
    if kind == 'relation':
        X, R = c['X'], {tuple(p) for p in c['R']}
        refl = all((x, x) in R for x in X)
        sym = all((b, a) in R for a, b in R)
        anti = all(not ((a, b) in R and (b, a) in R and a != b) for a in X for b in X)
        trans = all((a, d) in R for a, b in R for cc, d in R if b == cc)
        real = {'reflexiva': refl, 'simetrica': sym, 'antisimetrica': anti, 'transitiva': trans,
                'equivalencia': refl and sym and trans, 'orden': refl and anti and trans}[c['prop']]
        return real == c['claimed']
    if kind == 'function':
        f, codomain = c['f'], c['codomain']
        images = list(f.values())
        inj = len(set(images)) == len(images)
        sur = set(images) == set(codomain)
        real = {'inyectiva': inj, 'sobreyectiva': sur, 'biyectiva': inj and sur}[c['prop']]
        return real == c['claimed']
    if kind == 'mod':
        return sympy.Mod(c['a'], c['n']) == c['claimed']
    if kind == 'divmod':
        return (c['a'] // c['n'], c['a'] % c['n']) == tuple(c['claimed'])
    if kind == 'gcd':
        return sympy.gcd(c['a'], c['b']) == c['claimed']
    if kind == 'lcm':
        return sympy.lcm(c['a'], c['b']) == c['claimed']
    if kind == 'bezout':
        return c['s'] * c['a'] + c['t'] * c['b'] == sympy.gcd(c['a'], c['b'])
    if kind == 'coprime':
        return (sympy.gcd(c['a'], c['b']) == 1) == c['claimed']
    if kind == 'inverse':
        try:
            real = int(sympy.mod_inverse(c['a'], c['n']))
        except ValueError:
            real = None
        return real == c['claimed']
    if kind == 'totient':
        return sympy.totient(c['n']) == c['claimed']
    if kind == 'powmod':
        return pow(c['a'], c['e'], c['n']) == c['claimed']
    if kind == 'order':
        return sympy.n_order(c['a'], c['n']) == c['claimed']
    if kind == 'primitive':
        return sympy.is_primitive_root(c['a'], c['n']) == c['claimed']
    if kind == 'crt':
        real = sympy.ntheory.modular.crt(c['moduli'], c['residues'])[0]
        return int(real) == c['claimed']
    if kind == 'crt_member':
        return all(c['value'] % m == r for m, r in zip(c['moduli'], c['residues'])) == c['claimed']
    if kind == 'order_divides':
        return ((c['n'] - 1) % sympy.n_order(c['a'], c['n']) == 0) == c['claimed']
    if kind == 'isprime':
        return sympy.isprime(c['n']) == c['claimed']
    if kind == 'ndiv':
        return sympy.divisor_count(c['n']) == c['claimed']
    if kind == 'binop':
        n, table = c['n'], c['table']
        op = lambda a, b: table[a][b]
        els = range(n)
        comm = all(op(a, b) == op(b, a) for a in els for b in els)
        assoc = all(op(op(a, b), d) == op(a, op(b, d)) for a in els for b in els for d in els)
        ids = [e for e in els if all(op(e, a) == a and op(a, e) == a for a in els)]
        group = assoc and bool(ids) and all(any(op(a, b) == ids[0] and op(b, a) == ids[0] for b in els) for a in els)
        real = {
            'conmutativa': comm, 'asociativa': assoc, 'neutro': bool(ids) and ids[0] == c.get('e'),
            'sin_neutro': not ids, 'semigrupo': assoc, 'monoide': assoc and bool(ids), 'grupo': group,
        }[c['prop']]
        return real == c['claimed']
    if kind == 'add_order':
        return c['n'] // math.gcd(c['k'], c['n']) == c['claimed']
    if kind == 'divides':
        return (c['n'] % c['d'] == 0) == c['claimed']
    if kind == 'zero_product':
        return (c['a'] * c['b']) % c['n'] == c['claimed']
    if kind == 'hamming':
        return sum(x != y for x, y in zip(c['u'], c['v'])) == c['claimed']
    if kind == 'min_distance':
        d = min(sum(x != y for x, y in zip(u, v)) for u, v in itertools.combinations(c['code'], 2))
        real = {'d': d, 'detecta': d - 1, 'corrige': (d - 1) // 2}[c['op']]
        return real == c['claimed']
    if kind == 'gf2rem':
        x = sympy.symbols('x')
        p = sympy.Poly(list(reversed(c['p'])), x, modulus=2)
        q = sympy.Poly(list(reversed(c['q'])), x, modulus=2)
        r = p.rem(q)
        coeffs = [int(v) % 2 for v in reversed(r.all_coeffs())]
        while len(coeffs) > 1 and coeffs[-1] == 0:
            coeffs.pop()
        claimed = list(c['claimed'])
        while len(claimed) > 1 and claimed[-1] == 0:
            claimed.pop()
        return coeffs == claimed
    if kind == 'gf2irred':
        x = sympy.symbols('x')
        p = sympy.Poly(list(reversed(c['p'])), x, modulus=2)
        return p.is_irreducible == c['claimed']
    if kind == 'perceptron':
        z = sum(Fraction(w) * x for w, x in zip(c['w'], c['x'])) + Fraction(c['b'])
        real = {'z': z == Fraction(c['claimed']) if c['op'] == 'z' else None,
                'y': (1 if z >= 0 else 0) == c['claimed'] if c['op'] == 'y' else None}[c['op']]
        return real
    if kind == 'perceptron_gate':
        outputs = tuple(1 if sum(Fraction(w) * x for w, x in zip(c['w'], xs)) + Fraction(c['b']) >= 0 else 0
                        for xs in [(0, 0), (0, 1), (1, 0), (1, 1)])
        gate = {'AND': (0, 0, 0, 1), 'OR': (0, 1, 1, 1), 'NAND': (1, 1, 1, 0)}[c['gate']]
        return (outputs == gate) == c['claimed']
    if kind == 'activation':
        z = float(c['z'])
        real = {'relu': max(0.0, z), 'leaky': max(0.01 * z, z), 'sigmoid': 1 / (1 + math.exp(-z)), 'tanh': math.tanh(z)}[c['f']]
        return abs(real - float(c['claimed'])) < 0.005
    if kind == 'gd':
        w, cc, eta = Fraction(c['w0']), Fraction(c['c']), Fraction(c['eta'])
        for _ in range(c['steps']):
            w = w - eta * 2 * (w - cc)
        return w == Fraction(c['claimed'])
    if kind == 'gd_deriv':
        w = sympy.symbols('w')
        return sympy.diff((w - c['c']) ** 2, w).subs(w, c['w0']) == c['claimed']
    if kind == 'gd_min':
        w = sympy.symbols('w')
        return sympy.solve(sympy.diff((w - c['c']) ** 2, w), w) == [c['claimed']]
    if kind == 'convout':
        return (c['N'] - c['F'] + 2 * c['P']) // c['S'] + 1 == c['claimed']
    if kind == 'convparams':
        return c['F'] * c['F'] * c['C'] * c['K'] + c['K'] == c['claimed']
    if kind == 'det':
        M = sympy.Matrix(c['M'])
        if c.get('k'):
            M = c['k'] * M
        if c.get('power'):
            M = M ** c['power']
        if c.get('transpose'):
            M = M.T
        return M.det() == c['claimed']
    if kind == 'invertible':
        return (sympy.Matrix(c['M']).det() != 0) == c['claimed']
    if kind == 'matmul':
        return (sympy.Matrix(c['A']) * sympy.Matrix(c['B'])) == sympy.Matrix(c['claimed'])
    if kind == 'commute':
        A, B = sympy.Matrix(c['A']), sympy.Matrix(c['B'])
        return (A * B == B * A) == c['claimed']
    if kind == 'eigenvalues':
        real = sorted(sympy.Matrix(c['M']).eigenvals().keys())
        return [int(v) for v in real] == sorted(c['claimed'])
    if kind == 'eigvec':
        M, v = sympy.Matrix(c['M']), sympy.Matrix(c['v'])
        return (M * v == c['lam'] * v) == c['claimed']
    if kind == 'trace':
        return sympy.Matrix(c['M']).trace() == c['claimed']
    if kind == 'dot':
        return int(np.dot(c['u'], c['v'])) == c['claimed']
    if kind == 'cross':
        return list(np.cross(c['u'], c['v'])) == list(c['claimed'])
    if kind == 'norm':
        return math.isclose(float(np.linalg.norm(c['u'])), c['claimed'])
    if kind == 'solve':
        sol = sympy.Matrix(c['A']).LUsolve(sympy.Matrix(c['b']))
        return list(sol) == list(c['claimed'])
    if kind == 'rank':
        return sympy.Matrix(c['M']).rank() == c['claimed']
    if kind == 'detmod':
        return int(sympy.Matrix(c['M']).det()) % c['m'] == c['claimed']
    if kind == 'invertible_mod':
        return (math.gcd(int(sympy.Matrix(c['M']).det()) % c['m'], c['m']) == 1) == c['claimed']
    if kind == 'matpowmod':
        M = sympy.Matrix(c['M']) ** c['e']
        return M.applyfunc(lambda v: v % c['m']) == sympy.Matrix(c['claimed'])
    if kind == 'urn_compare':
        with_r = prob_bruteforce({'op': 'urn_two', 'white': c['white'], 'black': c['black'], 'replace': True})
        without = prob_bruteforce({'op': 'urn_two', 'white': c['white'], 'black': c['black'], 'replace': False})
        return (with_r < without) == c['claimed']
    if kind == 'prob':
        return Fraction(c['claimed']) == prob_bruteforce(c)
    if kind == 'stat':
        data = c['data']
        real = {
            'mean': Fraction(sum(data), len(data)),
            'median': Fraction(sorted(data)[len(data) // 2]) if len(data) % 2 else Fraction(sum(sorted(data)[len(data) // 2 - 1:len(data) // 2 + 1]), 2),
            'mode': Counter(data).most_common(1)[0][0],
            'range': max(data) - min(data),
            'pvar': Fraction(sum((Fraction(x) - Fraction(sum(data), len(data))) ** 2 for x in data), len(data)),
        }[c['op']]
        return Fraction(real) == Fraction(c['claimed'])
    if kind == 'entropy':
        probs = [Fraction(p) for p in c['probs']]
        h = -sum(float(p) * math.log2(float(p)) for p in probs if p > 0)
        return abs(h - float(c['claimed'])) < 0.0005
    if kind == 'kraft':
        return (sum(Fraction(1, 2 ** l) for l in c['lengths']) <= 1) == c['claimed']
    if kind == 'prefix':
        words = c['words']
        free = not any(a != b and b.startswith(a) for a in words for b in words)
        return free == c['claimed']
    if kind == 'avglen':
        return sum(Fraction(p) * len(w) for p, w in zip(c['probs'], c['words'])) == Fraction(c['claimed'])
    if kind == 'capacity':
        if c['channel'] == 'bsc':
            p = float(c['p'])
            hb = 0.0 if p in (0.0, 1.0) else -p * math.log2(p) - (1 - p) * math.log2(1 - p)
            return abs((1 - hb) - float(c['claimed'])) < 0.0005
        return abs(c['B'] * math.log2(1 + c['snr']) - float(c['claimed'])) < 0.5
    if kind == 'growth':
        n = sympy.symbols('n', positive=True)
        fa, fb = sympy.sympify(c['fa'], locals={'n': n}), sympy.sympify(c['fb'], locals={'n': n})
        smaller = sympy.limit(fa / fb, n, sympy.oo) == 0
        return smaller == c['claimed']
    if kind == 'turing':
        return c['field_value'] == c['claimed']
    if kind == 'graph':
        G = nx.Graph()
        G.add_nodes_from(c['nodes'])
        G.add_edges_from(c['edges'])
        real = {
            'edges': G.number_of_edges(),
            'degree_sum': sum(d for _, d in G.degree()),
            'odd': sum(1 for _, d in G.degree() if d % 2),
            'euler_circuit': nx.is_eulerian(G),
            'euler_path': nx.has_eulerian_path(G),
            'connected': nx.is_connected(G),
            'bipartite': nx.is_bipartite(G),
            'degree': G.degree(c.get('v')) if c.get('v') is not None else None,
        }[c['op']]
        return real == c['claimed']
    if kind == 'complete':
        n = c['n']
        real = {'edges': n * (n - 1) // 2, 'euler': n % 2 == 1, 'chromatic': n, 'planar': n <= 4,
                'bip_edges': c.get('m', 0) * n}[c['op']]
        return real == c['claimed']
    if kind == 'weighted':
        G = nx.Graph()
        for u, v, w in c['edges']:
            G.add_edge(u, v, weight=w)
        if c['op'] == 'mst':
            real = int(sum(d['weight'] for _, _, d in nx.minimum_spanning_tree(G).edges(data=True)))
        elif c['op'] == 'mst_edges':
            real = nx.minimum_spanning_tree(G).number_of_edges()
        else:
            real = nx.dijkstra_path_length(G, c['s'], c['t'])
        return real == c['claimed']
    if kind == 'lwe':
        A, S, E = np.array(c['A']), np.array(c['S']), np.array(c['E'])
        B = (A @ S + E) % c['q']
        return int(B[c['i']]) == c['claimed']
    if kind == 'encode':
        return c['k'] * (c['q'] // 4) == c['claimed']
    if kind == 'decode':
        return round(Fraction(c['x'] * 4, c['q'])) % 4 == c['claimed']
    raise AssertionError(f'check desconocido: {kind}')


def prob_bruteforce(c):
    """Probabilidades recalculadas por enumeración."""
    op = c['op']
    if op == 'dice_sum':
        outcomes = list(itertools.product(range(1, 7), repeat=2))
        return Fraction(sum(1 for a, b in outcomes if a + b in c['sums']), len(outcomes))
    if op == 'coins_k':
        outcomes = list(itertools.product('CX', repeat=c['n']))
        return Fraction(sum(1 for o in outcomes if o.count('C') == c['k']), len(outcomes))
    if op == 'urn_two':
        balls = ['b'] * c['white'] + ['n'] * c['black']
        if c['replace']:
            pairs = list(itertools.product(range(len(balls)), repeat=2))
        else:
            pairs = list(itertools.permutations(range(len(balls)), 2))
        hits = sum(1 for i, j in pairs if balls[i] == 'b' and balls[j] == 'b')
        return Fraction(hits, len(pairs))
    if op in ('bayes_total', 'bayes_post'):
        shares = [Fraction(s, 100) for s in c['shares']]
        rates = [Fraction(r, 100) for r in c['rates']]
        total = sum(s * r for s, r in zip(shares, rates))
        if op == 'bayes_total':
            return total
        return shares[c['i']] * rates[c['i']] / total
    raise AssertionError(op)


class EstructuraTest(unittest.TestCase):
    def test_diez_examenes_de_20_preguntas(self):
        self.assertEqual(len(EXAMS), 10)
        for exam in EXAMS:
            self.assertEqual(len(exam['questions']), 20, exam['title'])
            self.assertEqual(exam['duration_minutes'], 120)

    def test_reparto_por_unidad(self):
        for exam in EXAMS:
            counts = Counter(question['topic'] for question in exam['questions'])
            expected = {generar.TOPICS[u]: (3 if u in (1, 2) else 2) for u in range(1, 10)}
            self.assertEqual(dict(counts), expected, exam['title'])

    def test_cada_pregunta_tiene_5_afirmaciones_mezcladas_y_sin_repetir(self):
        for exam in EXAMS:
            for question in exam['questions']:
                statements = question['statements']
                self.assertEqual(len(statements), 5, question['prompt'])
                answers = [s['answer'] for s in statements]
                self.assertIn(True, answers, question['prompt'])
                self.assertIn(False, answers, question['prompt'])
                texts = [s['text'] for s in statements]
                self.assertEqual(len(set(texts)), 5, texts)

    def test_ids_y_titulos_unicos(self):
        ids = [q['id'] for exam in EXAMS for q in exam['questions']]
        self.assertEqual(len(ids), len(set(ids)))
        self.assertEqual(len({exam['title'] for exam in EXAMS}), 10)

    def test_es_determinista(self):
        again = generar.build_exams(with_checks=True)
        self.assertEqual(json.dumps(EXAMS, sort_keys=True, default=str), json.dumps(again, sort_keys=True, default=str))

    def test_examenes_distintos_entre_si(self):
        sets = [{s['text'] for q in exam['questions'] for s in q['statements']} for exam in EXAMS]
        for a, b in itertools.combinations(range(len(sets)), 2):
            overlap = len(sets[a] & sets[b]) / len(sets[a])
            self.assertLess(overlap, 0.35, f'examen {a + 1} y {b + 1} comparten {overlap:.0%}')


class RespuestasTest(unittest.TestCase):
    def test_respuestas_calculadas_verificadas_de_forma_independiente(self):
        checked = 0
        total = 0
        for exam in EXAMS:
            for question in exam['questions']:
                for statement in question['statements']:
                    total += 1
                    check = statement.get('check')
                    if not check:
                        continue
                    checked += 1
                    self.assertEqual(verify(check), statement['answer'],
                                     f"{exam['title']} · {question['prompt']} · {statement['text']} · {check}")
        self.assertGreater(checked / total, 0.6, f'solo {checked} de {total} afirmaciones tienen verificación')

    def test_afirmaciones_conceptuales_vienen_del_banco_revisado(self):
        bank_texts = {text for bank in generar.CONCEPT_BANKS.values() for text, _ in bank}
        for exam in EXAMS:
            for question in exam['questions']:
                for statement in question['statements']:
                    if not statement.get('check'):
                        self.assertIn(statement['text'], bank_texts, statement['text'])


class FormatoTest(unittest.TestCase):
    def test_latex_balanceado(self):
        for exam in EXAMS:
            for question in exam['questions']:
                for text in [question['prompt']] + [s['text'] for s in question['statements']]:
                    unescaped = re.sub(r'\\\$', '', text)
                    self.assertEqual(unescaped.count('$') % 2, 0, text)
                    for math_part in re.findall(r'\$([^$]+)\$', unescaped):
                        self.assertEqual(math_part.count('{'), math_part.count('}'), text)

    def test_sql_contiene_json_valido(self):
        sql = generar.build_sql(generar.build_exams(with_checks=False))
        self.assertIn("delete from public.subject_exams where subject_id = 'mat5'", sql)
        literals = re.findall(r"'((?:[^']|'')*)'::jsonb", sql)
        self.assertEqual(len(literals), 20)  # config + questions por examen
        for literal in literals:
            data = json.loads(literal.replace("''", "'"))
            self.assertTrue(data)
        self.assertNotIn('"check"', sql)


if __name__ == '__main__':
    unittest.main()
