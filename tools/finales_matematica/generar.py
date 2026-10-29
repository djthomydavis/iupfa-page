"""Generador de finales de práctica de Matemática Aplicada (materia mat5).

Arma 10 simulacros de final de 20 preguntas de 5 afirmaciones V/F con el
contenido de las unidades 1 a 9 del curso (Prof. Dr. Juan Pedro Hecht) y
escribe el SQL para cargarlos en la tabla public.subject_exams.

Uso:
    python tools/finales_matematica/generar.py            # escribe el SQL
    python tools/finales_matematica/generar.py --json x   # además, un JSON

- Las afirmaciones de cálculo se generan con valores distintos en cada final
  y su valor de verdad se calcula acá. Cada una lleva un `check` que las
  pruebas (test_generar.py) recalculan con sympy/networkx/numpy.
- Las afirmaciones conceptuales salen de CONCEPT_BANKS, escritas a partir de
  los PDF de cada unidad.
"""
import argparse
import itertools
import json
import math
import os
import random
from collections import Counter
from fractions import Fraction

SUBJECT_ID = 'mat5'
TITLE_PREFIX = 'Final de práctica'
EXAM_COUNT = 10
DURATION_MINUTES = 120
CONFIG = {
    'pointsPerQuestion': 0.5,
    'fpPenaltyEnabled': True,
    'fpPenalty': 0.2,
    'fnPenaltyEnabled': True,
    'fnPenalty': 0.1,
    'passMode': 'percent',
    'passValue': 60,
}

TOPICS = {
    1: 'Unidad 1 · Estructuras discretas y lógica',
    2: 'Unidad 2 · Teoría de números y aritmética modular',
    3: 'Unidad 3 · Estructuras algebraicas',
    4: 'Unidad 4 · Redes neuronales e IA',
    5: 'Unidad 5 · Álgebra lineal',
    6: 'Unidad 6 · Probabilidad y estadística',
    7: 'Unidad 7 · Teoría de la información y complejidad',
    8: 'Unidad 8 · Teoría de grafos',
    9: 'Unidad 9 · Álgebra no conmutativa (FrodoKEM)',
}
QUESTIONS_PER_UNIT = {1: 3, 2: 3, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2}


# ---------------------------------------------------------------------------
# Utilidades
# ---------------------------------------------------------------------------

def S(text, answer, check=None):
    return {'text': text, 'answer': bool(answer), 'check': check}


def pick(rng, candidates, n=5):
    """Elige n afirmaciones sin repetir texto, con al menos una V y una F."""
    seen, unique = set(), []
    for cand in candidates:
        if cand['text'] not in seen:
            seen.add(cand['text'])
            unique.append(cand)
    trues = [c for c in unique if c['answer']]
    falses = [c for c in unique if not c['answer']]
    if not trues or not falses or len(unique) < n:
        raise ValueError(f'candidatos insuficientes: {len(trues)} V, {len(falses)} F')
    k = rng.randint(max(1, n - len(falses)), min(n - 1, len(trues)))
    chosen = rng.sample(trues, k) + rng.sample(falses, n - k)
    rng.shuffle(chosen)
    return chosen


def Q(unit, prompt, statements):
    return {'topic': TOPICS[unit], 'prompt': prompt, 'statements': statements}


def setstr(values):
    values = sorted(values)
    return r'\{' + ', '.join(str(v) for v in values) + r'\}' if values else r'\varnothing'


def frac(value):
    value = Fraction(value)
    if value.denominator == 1:
        return str(value.numerator)
    sign = '-' if value < 0 else ''
    return f'{sign}\\frac{{{abs(value.numerator)}}}{{{value.denominator}}}'


def dec(value, digits=2):
    """Decimal con coma para LaTeX: 0.25 -> 0{,}25."""
    text = f'{float(value):.{digits}f}'.rstrip('0').rstrip('.')
    return text.replace('.', '{,}')


def mat(rows):
    body = r' \\ '.join(' & '.join(str(v) for v in row) for row in rows)
    return r'\begin{pmatrix} ' + body + r' \end{pmatrix}'


def vec(values):
    return '(' + ', '.join(str(v) for v in values) + ')'


def other_than(rng, value, options):
    choices = [o for o in options if o != value]
    return rng.choice(choices)


def concept_question(rng, unit, bank_key, prompt='Indicar V o F:'):
    bank = CONCEPT_BANKS[bank_key]
    return Q(unit, prompt, pick(rng, [S(text, answer) for text, answer in bank]))


# ---------------------------------------------------------------------------
# Unidad 1 · Estructuras discretas y lógica
# ---------------------------------------------------------------------------

def u1_conjuntos(rng):
    U = list(range(1, 11))
    A = sorted(rng.sample(U, rng.randint(4, 6)))
    B = sorted(rng.sample(U, rng.randint(3, 5)))
    while not (set(A) & set(B)) or set(A) <= set(B):
        B = sorted(rng.sample(U, rng.randint(3, 5)))
    sA, sB = set(A), set(B)
    base = {'A': A, 'B': B, 'U': U}

    def setop(op, claimed):
        return {'kind': 'setop', **base, 'op': op, 'claimed': sorted(claimed)}

    union, inter, diff = sA | sB, sA & sB, sA - sB
    wrong_union = union - {max(union)}
    comp = set(U) - union
    wrong_comp = (set(U) - sA) | (set(U) - sB)
    cands = [
        S(f'$A \\cup B = {setstr(union)}$', True, setop('union', union)),
        S(f'$A \\cup B = {setstr(wrong_union)}$', False, setop('union', wrong_union)),
        S(f'$A \\cap B = {setstr(inter)}$', True, setop('inter', inter)),
        S(f'$A \\cap B = {setstr(diff)}$', diff == inter, setop('inter', diff)),
        S(f'$A - B = {setstr(diff)}$', True, setop('diff', diff)),
        S(f'$A - B = {setstr(sB - sA)}$', (sB - sA) == diff, setop('diff', sB - sA)),
        S(f'$(A \\cup B)^c = {setstr(comp)}$', True, setop('complement_union', comp)),
        S(f'$(A \\cup B)^c = {setstr(wrong_comp)}$', wrong_comp == comp, setop('complement_union', wrong_comp)),
        S(f'$|\\mathcal{{P}}(A)| = {2 ** len(A)}$', True, {'kind': 'card', **base, 'op': 'powerset', 'claimed': 2 ** len(A)}),
        S(f'$|\\mathcal{{P}}(A)| = {2 * len(A)}$', False, {'kind': 'card', **base, 'op': 'powerset', 'claimed': 2 * len(A)}),
        S(f'$|A \\times B| = {len(A) * len(B)}$', True, {'kind': 'card', **base, 'op': 'product', 'claimed': len(A) * len(B)}),
        S(f'$|A \\times B| = {len(A) + len(B)}$', False, {'kind': 'card', **base, 'op': 'product', 'claimed': len(A) + len(B)}),
    ]
    prompt = (f'Sean $U = {setstr(U)}$ el universo, $A = {setstr(A)}$ y $B = {setstr(B)}$. '
              'Indicar V o F:')
    return Q(1, prompt, pick(rng, cands))


LOGIC_FORMULAS = [
    (r'p \lor \lnot p', 'Or(p, Not(p))'),
    (r'p \land \lnot p', 'And(p, Not(p))'),
    (r'\big((p \to q) \land (q \to r)\big) \to (p \to r)', 'Implies(And(Implies(p, q), Implies(q, r)), Implies(p, r))'),
    (r'(p \to q) \to (q \to p)', 'Implies(Implies(p, q), Implies(q, p))'),
    (r'\big(p \land (p \to q)\big) \to q', 'Implies(And(p, Implies(p, q)), q)'),
    (r'\big(\lnot q \land (p \to q)\big) \to \lnot p', 'Implies(And(Not(q), Implies(p, q)), Not(p))'),
    (r'(p \to q) \land \lnot q \land p', 'And(Implies(p, q), Not(q), p)'),
    (r'(p \lor q) \to (p \land q)', 'Implies(Or(p, q), And(p, q))'),
    (r'\big((p \lor q) \land \lnot p\big) \to q', 'Implies(And(Or(p, q), Not(p)), q)'),
    (r'p \to (q \to p)', 'Implies(p, Implies(q, p))'),
    (r'(p \land q) \to r', 'Implies(And(p, q), r)'),
    (r'(p \leftrightarrow q) \land (p \leftrightarrow \lnot q)', 'And(Equivalent(p, q), Equivalent(p, Not(q)))'),
    (r'(p \to q) \lor (q \to p)', 'Or(Implies(p, q), Implies(q, p))'),
    (r'(p \lor q) \land (\lnot p \lor r) \to (q \lor r)', 'Implies(And(Or(p, q), Or(Not(p), r)), Or(q, r))'),
]


def _logic_class(expr):
    def ev(e, env):
        return eval(e, {'Or': lambda *a: any(a), 'And': lambda *a: all(a), 'Not': lambda a: not a,
                        'Implies': lambda a, b: (not a) or b, 'Equivalent': lambda a, b: a == b}, env)
    values = [ev(expr, {'p': p, 'q': q, 'r': r}) for p, q, r in itertools.product([True, False], repeat=3)]
    return 'tautologia' if all(values) else 'contradiccion' if not any(values) else 'contingencia'


CLASS_LABEL = {'tautologia': 'una tautología', 'contradiccion': 'una contradicción', 'contingencia': 'una contingencia'}


def u1_logica(rng):
    cands = []
    for latex, expr in rng.sample(LOGIC_FORMULAS, 7):
        real = _logic_class(expr)
        claimed = real if rng.random() < 0.5 else other_than(rng, real, list(CLASS_LABEL))
        cands.append(S(f'${latex}$ es {CLASS_LABEL[claimed]}.', claimed == real,
                       {'kind': 'logic_class', 'expr': expr, 'claimed': claimed}))
    return Q(1, 'Clasificar cada fórmula proposicional (tautología, contradicción o contingencia):', pick(rng, cands))


LOGIC_EQUIVALENCES = [
    (r'p \to q', 'Implies(p, q)', r'\lnot q \to \lnot p', 'Implies(Not(q), Not(p))'),
    (r'p \to q', 'Implies(p, q)', r'q \to p', 'Implies(q, p)'),
    (r'p \to q', 'Implies(p, q)', r'\lnot p \lor q', 'Or(Not(p), q)'),
    (r'p \to q', 'Implies(p, q)', r'\lnot p \to \lnot q', 'Implies(Not(p), Not(q))'),
    (r'\lnot (p \land q)', 'Not(And(p, q))', r'\lnot p \lor \lnot q', 'Or(Not(p), Not(q))'),
    (r'\lnot (p \lor q)', 'Not(Or(p, q))', r'\lnot p \lor \lnot q', 'Or(Not(p), Not(q))'),
    (r'\lnot (p \lor q)', 'Not(Or(p, q))', r'\lnot p \land \lnot q', 'And(Not(p), Not(q))'),
    (r'p \land (q \lor r)', 'And(p, Or(q, r))', r'(p \land q) \lor (p \land r)', 'Or(And(p, q), And(p, r))'),
    (r'p \lor (q \land r)', 'Or(p, And(q, r))', r'(p \lor q) \land r', 'And(Or(p, q), r)'),
    (r'p \leftrightarrow q', 'Equivalent(p, q)', r'(p \to q) \land (q \to p)', 'And(Implies(p, q), Implies(q, p))'),
    (r'\lnot (p \to q)', 'Not(Implies(p, q))', r'p \land \lnot q', 'And(p, Not(q))'),
    (r'\lnot (p \to q)', 'Not(Implies(p, q))', r'\lnot p \to \lnot q', 'Implies(Not(p), Not(q))'),
]


def u1_equivalencias(rng):
    def equivalent(a, b):
        env_values = itertools.product([True, False], repeat=3)
        funcs = {'Or': lambda *x: any(x), 'And': lambda *x: all(x), 'Not': lambda x: not x,
                 'Implies': lambda x, y: (not x) or y, 'Equivalent': lambda x, y: x == y}
        return all(eval(a, funcs, {'p': p, 'q': q, 'r': r}) == eval(b, funcs, {'p': p, 'q': q, 'r': r})
                   for p, q, r in env_values)

    cands = [S(f'${la}$ es lógicamente equivalente a ${lb}$.', equivalent(ea, eb),
               {'kind': 'logic_equiv', 'a': ea, 'b': eb, 'claimed': True})
             for la, ea, lb, eb in LOGIC_EQUIVALENCES]
    return Q(1, 'Equivalencias lógicas. Indicar V o F:', pick(rng, cands))


def u1_conteo(rng):
    n, r = rng.randint(6, 12), rng.randint(2, 4)
    k, L = rng.choice([(10, 4), (26, 3), (16, 2), (36, 3)])
    m = rng.randint(4, 7)
    word = rng.choice(['BANANA', 'PAPAYA', 'ANANA', 'CARACAS', 'ALABAMA'])
    multiset = math.factorial(len(word)) // math.prod(math.factorial(v) for v in Counter(word).values())
    people = rng.choice([12, 13, 25])
    cands = [
        S(f'Hay ${math.perm(n, r)}$ formas de ordenar ${r}$ elementos elegidos entre ${n}$ (sin repetición).', True,
          {'kind': 'count', 'op': 'perm', 'n': n, 'r': r, 'claimed': math.perm(n, r)}),
        S(f'Hay ${math.comb(n, r)}$ formas de ordenar ${r}$ elementos elegidos entre ${n}$ (sin repetición).', False,
          {'kind': 'count', 'op': 'perm', 'n': n, 'r': r, 'claimed': math.comb(n, r)}),
        S(f'Se pueden formar ${math.comb(n, r)}$ comités distintos de ${r}$ personas con un grupo de ${n}$.', True,
          {'kind': 'count', 'op': 'comb', 'n': n, 'r': r, 'claimed': math.comb(n, r)}),
        S(f'Se pueden formar ${math.perm(n, r)}$ comités distintos de ${r}$ personas con un grupo de ${n}$.', False,
          {'kind': 'count', 'op': 'comb', 'n': n, 'r': r, 'claimed': math.perm(n, r)}),
        S(f'Con un alfabeto de ${k}$ símbolos hay ${k ** L}$ claves posibles de longitud ${L}$ (con repetición).', True,
          {'kind': 'count', 'op': 'power', 'n': k, 'r': L, 'claimed': k ** L}),
        S(f'Con un alfabeto de ${k}$ símbolos hay ${math.perm(k, L)}$ claves posibles de longitud ${L}$ (con repetición).',
          math.perm(k, L) == k ** L, {'kind': 'count', 'op': 'power', 'n': k, 'r': L, 'claimed': math.perm(k, L)}),
        S(f'${m}$ personas se pueden sentar alrededor de una mesa circular de ${math.factorial(m - 1)}$ formas (sin contar rotaciones).', True,
          {'kind': 'count', 'op': 'circular', 'n': m, 'claimed': math.factorial(m - 1)}),
        S(f'${m}$ personas se pueden sentar alrededor de una mesa circular de ${math.factorial(m)}$ formas (sin contar rotaciones).', False,
          {'kind': 'count', 'op': 'circular', 'n': m, 'claimed': math.factorial(m)}),
        S(f'La palabra {word} tiene ${multiset}$ anagramas distintos.', True,
          {'kind': 'count', 'op': 'multiset', 'word': word, 'claimed': multiset}),
        S(f'La palabra {word} tiene ${math.factorial(len(word))}$ anagramas distintos.', False,
          {'kind': 'count', 'op': 'multiset', 'word': word, 'claimed': math.factorial(len(word))}),
        S(f'Por el principio del palomar, entre ${people}$ personas al menos dos cumplen años el mismo mes.', people > 12,
          {'kind': 'pigeon', 'items': people, 'boxes': 12, 'claimed': True}),
    ]
    return Q(1, 'Técnicas de conteo. Indicar V o F:', pick(rng, cands))


def _relation_props(X, R):
    refl = all((x, x) in R for x in X)
    sym = all((b, a) in R for a, b in R)
    anti = all(not ((a, b) in R and (b, a) in R and a != b) for a in X for b in X)
    trans = all((a, d) in R for a, b in R for c, d in R if b == c)
    return {'reflexiva': refl, 'simetrica': sym, 'antisimetrica': anti, 'transitiva': trans,
            'equivalencia': refl and sym and trans, 'orden': refl and anti and trans}


PROP_LABEL = {'reflexiva': 'reflexiva', 'simetrica': 'simétrica', 'antisimetrica': 'antisimétrica',
              'transitiva': 'transitiva', 'equivalencia': 'una relación de equivalencia', 'orden': 'una relación de orden parcial'}


def u1_relaciones(rng):
    X = [1, 2, 3, 4]
    kind = rng.choice(['particion', 'divisibilidad', 'aleatoria', 'menor'])
    if kind == 'particion':
        blocks = rng.choice([[[1, 2], [3, 4]], [[1, 3], [2], [4]], [[1, 2, 3], [4]]])
        R = {(a, b) for block in blocks for a in block for b in block}
    elif kind == 'divisibilidad':
        R = {(a, b) for a in X for b in X if b % a == 0}
    elif kind == 'menor':
        R = {(a, b) for a in X for b in X if a < b}
    else:
        R = {(x, x) for x in X if rng.random() < 0.6} | {tuple(rng.sample(X, 2)) for _ in range(4)}
    props = _relation_props(X, R)
    cands = []
    for prop, value in props.items():
        label = PROP_LABEL[prop]
        cands.append(S(f'$R$ es {label}.', value, {'kind': 'relation', 'X': X, 'R': sorted(R), 'prop': prop, 'claimed': True}))
        cands.append(S(f'$R$ no es {label}.', not value, {'kind': 'relation', 'X': X, 'R': sorted(R), 'prop': prop, 'claimed': False}))
    pairs = ', '.join(f'({a},{b})' for a, b in sorted(R))
    prompt = f'Sea $X = {setstr(X)}$ y la relación $R = \\{{{pairs}\\}}$ sobre $X$. Indicar V o F:'
    return Q(1, prompt, pick(rng, cands))


# ---------------------------------------------------------------------------
# Unidad 2 · Teoría de números y aritmética modular
# ---------------------------------------------------------------------------

def u2_modulo(rng):
    a, n = rng.randint(150, 999), rng.randint(7, 31)
    q, r = divmod(a, n)
    b = rng.randint(30, 120)
    neg = (-b) % n
    cands = [
        S(f'$\\lfloor {a}/{n} \\rfloor = {q}$ y el resto es ${r}$.', True, {'kind': 'divmod', 'a': a, 'n': n, 'claimed': [q, r]}),
        S(f'$\\lfloor {a}/{n} \\rfloor = {q}$ y el resto es ${(r + 1) % n}$.', False, {'kind': 'divmod', 'a': a, 'n': n, 'claimed': [q, (r + 1) % n]}),
        S(f'${a} \\bmod {n} = {r}$', True, {'kind': 'mod', 'a': a, 'n': n, 'claimed': r}),
        S(f'${a} \\bmod {n} = {(r + 2) % n}$', False, {'kind': 'mod', 'a': a, 'n': n, 'claimed': (r + 2) % n}),
        S(f'$-{b} \\bmod {n} = {neg}$', True, {'kind': 'mod', 'a': -b, 'n': n, 'claimed': neg}),
        S(f'$-{b} \\bmod {n} = {b % n}$', (b % n) == neg, {'kind': 'mod', 'a': -b, 'n': n, 'claimed': b % n}),
        S(f'${a} \\equiv {r + n} \\pmod{{{n}}}$', True, {'kind': 'mod', 'a': a - (r + n), 'n': n, 'claimed': 0}),
        S(f'${a} \\equiv {r + 1} \\pmod{{{n}}}$', False, {'kind': 'mod', 'a': a - (r + 1), 'n': n, 'claimed': 0}),
    ]
    return Q(2, 'División entera y congruencias. Indicar V o F:', pick(rng, cands))


def _ext_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, s, t = _ext_gcd(b, a % b)
    return g, t, s - (a // b) * t


def u2_mcd(rng):
    g = rng.choice([2, 3, 4, 6, 7, 9, 12])
    x, y = rng.sample([5, 7, 8, 9, 11, 13, 14, 15, 17], 2)
    while math.gcd(x, y) != 1:
        x, y = rng.sample([5, 7, 8, 9, 11, 13, 14, 15, 17], 2)
    a, b = g * x, g * y
    lcm = a * b // g
    _, s, t = _ext_gcd(a, b)
    c, d = rng.choice([(35, 64), (27, 50), (49, 90), (21, 55)])
    cands = [
        S(f'$\\gcd({a}, {b}) = {g}$', True, {'kind': 'gcd', 'a': a, 'b': b, 'claimed': g}),
        S(f'$\\gcd({a}, {b}) = {g * 2}$', False, {'kind': 'gcd', 'a': a, 'b': b, 'claimed': g * 2}),
        S(f'$\\operatorname{{mcm}}({a}, {b}) = {lcm}$', True, {'kind': 'lcm', 'a': a, 'b': b, 'claimed': lcm}),
        S(f'$\\operatorname{{mcm}}({a}, {b}) = {a * b}$', False, {'kind': 'lcm', 'a': a, 'b': b, 'claimed': a * b}),
        S(f'Por Bézout, ${s} \\cdot {a} + ({t}) \\cdot {b} = \\gcd({a}, {b})$.', True,
          {'kind': 'bezout', 'a': a, 'b': b, 's': s, 't': t}),
        S(f'Por Bézout, ${s + b // g} \\cdot {a} + ({t + 1}) \\cdot {b} = \\gcd({a}, {b})$.', False,
          {'kind': 'bezout', 'a': a, 'b': b, 's': s + b // g, 't': t + 1}),
        S(f'${c}$ y ${d}$ son coprimos.', math.gcd(c, d) == 1, {'kind': 'coprime', 'a': c, 'b': d, 'claimed': True}),
        S(f'${a}$ y ${b}$ son coprimos.', False, {'kind': 'coprime', 'a': a, 'b': b, 'claimed': True}),
    ]
    return Q(2, 'Máximo común divisor, mínimo común múltiplo y Bézout. Indicar V o F:', pick(rng, cands))


def _phi(n):
    return sum(1 for k in range(1, n + 1) if math.gcd(k, n) == 1)


def u2_inverso(rng):
    n = rng.choice([11, 13, 17, 19, 23, 26, 20, 21])
    units = [a for a in range(2, n) if math.gcd(a, n) == 1]
    a = rng.choice(units)
    inv = pow(a, -1, n)
    non_units = [a for a in range(2, n) if math.gcd(a, n) > 1]
    wrong_inv = other_than(rng, inv, [v for v in range(1, n) if v != inv])
    cands = [
        S(f'El inverso multiplicativo de ${a}$ módulo ${n}$ es ${inv}$.', True, {'kind': 'inverse', 'a': a, 'n': n, 'claimed': inv}),
        S(f'El inverso multiplicativo de ${a}$ módulo ${n}$ es ${wrong_inv}$.', False, {'kind': 'inverse', 'a': a, 'n': n, 'claimed': wrong_inv}),
        S(f'El inverso aditivo de ${a}$ módulo ${n}$ es ${n - a}$.', True, {'kind': 'mod', 'a': a + (n - a), 'n': n, 'claimed': 0}),
        S(f'En $\\mathbb{{Z}}_{{{n}}}$ hay ${_phi(n)}$ elementos con inverso multiplicativo.', True, {'kind': 'totient', 'n': n, 'claimed': _phi(n)}),
        S(f'En $\\mathbb{{Z}}_{{{n}}}$ hay ${n - 1}$ elementos con inverso multiplicativo.', _phi(n) == n - 1, {'kind': 'totient', 'n': n, 'claimed': n - 1}),
    ]
    if non_units:
        b = rng.choice(non_units)
        cands.append(S(f'${b}$ no tiene inverso multiplicativo módulo ${n}$.', True, {'kind': 'inverse', 'a': b, 'n': n, 'claimed': None}))
    else:
        b = rng.choice(units)
        cands.append(S(f'${b}$ no tiene inverso multiplicativo módulo ${n}$.', False, {'kind': 'inverse', 'a': b, 'n': n, 'claimed': None}))
    return Q(2, 'Inversos modulares. Indicar V o F:', pick(rng, cands))


def u2_euler_fermat(rng):
    p = rng.choice([11, 13, 17, 19, 23, 29])
    a = rng.randint(2, p - 2)
    e = rng.randint(100, 999)
    v = pow(a, e, p)
    n = rng.choice([30, 12, 18, 35, 36, 45, 77])
    m = rng.choice([7, 11])
    cands = [
        S(f'${a}^{{{p - 1}}} \\equiv 1 \\pmod{{{p}}}$', True, {'kind': 'powmod', 'a': a, 'e': p - 1, 'n': p, 'claimed': 1}),
        S(f'${a}^{{{e}}} \\bmod {p} = {v}$', True, {'kind': 'powmod', 'a': a, 'e': e, 'n': p, 'claimed': v}),
        S(f'${a}^{{{e}}} \\bmod {p} = {(v + 1) % p}$', False, {'kind': 'powmod', 'a': a, 'e': e, 'n': p, 'claimed': (v + 1) % p}),
        S(f'$\\varphi({n}) = {_phi(n)}$', True, {'kind': 'totient', 'n': n, 'claimed': _phi(n)}),
        S(f'$\\varphi({n}) = {n - 1}$', False, {'kind': 'totient', 'n': n, 'claimed': n - 1}),
        S(f'$\\varphi({p}) = {p - 1}$', True, {'kind': 'totient', 'n': p, 'claimed': p - 1}),
        S(f'$3^{{{_phi(m * 2) * 5}}} \\equiv 1 \\pmod{{{m * 2}}}$', math.gcd(3, m * 2) == 1,
          {'kind': 'powmod', 'a': 3, 'e': _phi(m * 2) * 5, 'n': m * 2, 'claimed': 1}),
    ]
    return Q(2, 'Teoremas de Euler y Fermat. Indicar V o F:', pick(rng, cands))


def _order(a, n):
    k, x = 1, a % n
    while x != 1:
        x = (x * a) % n
        k += 1
    return k


def u2_generadores(rng):
    p = rng.choice([7, 11, 13, 17, 19, 23])
    candidates = list(range(2, p - 1))
    rng.shuffle(candidates)
    a, b = candidates[:2]
    oa, ob = _order(a, p), _order(b, p)
    wrong_oa = other_than(rng, oa, [d for d in range(1, p) if (p - 1) % d == 0])
    cands = [
        S(f'$\\operatorname{{ord}}_{{{p}}}({a}) = {oa}$', True, {'kind': 'order', 'a': a, 'n': p, 'claimed': oa}),
        S(f'$\\operatorname{{ord}}_{{{p}}}({a}) = {wrong_oa}$', False, {'kind': 'order', 'a': a, 'n': p, 'claimed': wrong_oa}),
        S(f'${a}$ es un generador (raíz primitiva) de $\\mathbb{{Z}}_{{{p}}}^*$.', oa == p - 1, {'kind': 'primitive', 'a': a, 'n': p, 'claimed': True}),
        S(f'${b}$ es un generador (raíz primitiva) de $\\mathbb{{Z}}_{{{p}}}^*$.', ob == p - 1, {'kind': 'primitive', 'a': b, 'n': p, 'claimed': True}),
        S(f'$\\mathbb{{Z}}_{{{p}}}^*$ tiene exactamente $\\varphi({p - 1}) = {_phi(p - 1)}$ generadores.', True, {'kind': 'totient', 'n': p - 1, 'claimed': _phi(p - 1)}),
        S(f'$\\operatorname{{ord}}_{{{p}}}({b})$ divide a ${p - 1}$.', True, {'kind': 'order_divides', 'a': b, 'n': p, 'claimed': True}),
        S(f'$1$ es un generador de $\\mathbb{{Z}}_{{{p}}}^*$.', False, {'kind': 'primitive', 'a': 1, 'n': p, 'claimed': True}),
    ]
    return Q(2, f'Orden multiplicativo y generadores en $\\mathbb{{Z}}_{{{p}}}^*$. Indicar V o F:', pick(rng, cands))


def u2_tcr(rng):
    m1, m2 = rng.choice([(3, 5), (4, 5), (5, 7), (3, 7), (4, 9), (7, 9), (5, 8)])
    r1, r2 = rng.randint(1, m1 - 1), rng.randint(1, m2 - 1)
    x = next(v for v in range(1, m1 * m2 + 1) if v % m1 == r1 and v % m2 == r2)
    wrong = (x + m1) % (m1 * m2) or m1 * m2
    member = {'kind': 'crt_member', 'moduli': [m1, m2], 'residues': [r1, r2], 'claimed': True}
    cands = [
        S(f'La menor solución natural es $x = {x}$.', True, {'kind': 'crt', 'moduli': [m1, m2], 'residues': [r1, r2], 'claimed': x}),
        S(f'La menor solución natural es $x = {wrong}$.', False, {'kind': 'crt', 'moduli': [m1, m2], 'residues': [r1, r2], 'claimed': wrong}),
        S(f'La solución es única módulo ${m1 * m2}$ porque ${m1}$ y ${m2}$ son coprimos.', True,
          {'kind': 'coprime', 'a': m1, 'b': m2, 'claimed': True}),
        S(f'${x + m1 * m2}$ también es solución del sistema.', True, {**member, 'value': x + m1 * m2}),
        S(f'${x + m1}$ también es solución del sistema.', False, {**member, 'value': x + m1}),
        S(f'${x + 2 * m1 * m2}$ también es solución del sistema.', True, {**member, 'value': x + 2 * m1 * m2}),
    ]
    prompt = (f'Teorema chino del resto: sea el sistema $x \\equiv {r1} \\pmod{{{m1}}}$, $x \\equiv {r2} \\pmod{{{m2}}}$. '
              'Indicar V o F:')
    return Q(2, prompt, pick(rng, cands))


def u2_primos(rng):
    pool = [91, 97, 221, 561, 89, 143, 127, 1001, 113, 187, 211, 323]
    nums = rng.sample(pool, 4)
    cands = []
    for n in nums:
        prime = all(n % d for d in range(2, int(n ** 0.5) + 1))
        cands.append(S(f'${n}$ es primo.', prime, {'kind': 'isprime', 'n': n, 'claimed': True}))
    n = rng.choice([12, 18, 30, 36, 60, 72, 100])
    nd = sum(1 for d in range(1, n + 1) if n % d == 0)
    cands += [
        S(f'${n}$ tiene ${nd}$ divisores positivos.', True, {'kind': 'ndiv', 'n': n, 'claimed': nd}),
        S(f'${n}$ tiene ${nd + 2}$ divisores positivos.', False, {'kind': 'ndiv', 'n': n, 'claimed': nd + 2}),
        S('$2^{560} \\bmod 561 = 1$, aunque $561$ no es primo (es un número de Carmichael).', True,
          {'kind': 'powmod', 'a': 2, 'e': 560, 'n': 561, 'claimed': 1}),
    ]
    return Q(2, 'Primos y divisibilidad. Indicar V o F:', pick(rng, cands))


# ---------------------------------------------------------------------------
# Unidad 3 · Estructuras algebraicas
# ---------------------------------------------------------------------------

BINOPS = [
    ('(a + b) \\bmod N', lambda a, b, n: (a + b) % n),
    ('(a \\cdot b) \\bmod N', lambda a, b, n: (a * b) % n),
    ('(a + b + 1) \\bmod N', lambda a, b, n: (a + b + 1) % n),
    ('\\max(a, b)', lambda a, b, n: max(a, b)),
    ('(a - b) \\bmod N', lambda a, b, n: (a - b) % n),
    ('(2a + b) \\bmod N', lambda a, b, n: (2 * a + b) % n),
    ('\\min(a, b)', lambda a, b, n: min(a, b)),
]


def u3_operacion(rng):
    latex, fn = rng.choice(BINOPS)
    n = rng.randint(4, 7)
    table = [[fn(a, b, n) for b in range(n)] for a in range(n)]
    els = range(n)
    comm = all(table[a][b] == table[b][a] for a in els for b in els)
    assoc = all(table[table[a][b]][c] == table[a][table[b][c]] for a in els for b in els for c in els)
    ids = [e for e in els if all(table[e][a] == a and table[a][e] == a for a in els)]
    group = assoc and bool(ids) and all(any(table[a][b] == ids[0] and table[b][a] == ids[0] for b in els) for a in els)
    base = {'kind': 'binop', 'n': n, 'table': table}
    fake_e = rng.choice([e for e in els if not ids or e != ids[0]])
    cands = [
        S('La operación es conmutativa.', comm, {**base, 'prop': 'conmutativa', 'claimed': True}),
        S('La operación es asociativa.', assoc, {**base, 'prop': 'asociativa', 'claimed': True}),
        S(f'El elemento neutro es $e = {fake_e}$.', False, {**base, 'prop': 'neutro', 'e': fake_e, 'claimed': True}),
        S('La estructura es un semigrupo.', assoc, {**base, 'prop': 'semigrupo', 'claimed': True}),
        S('La estructura es un monoide.', assoc and bool(ids), {**base, 'prop': 'monoide', 'claimed': True}),
        S('La estructura es un grupo.', group, {**base, 'prop': 'grupo', 'claimed': True}),
    ]
    if ids:
        cands.append(S(f'El elemento neutro es $e = {ids[0]}$.', True, {**base, 'prop': 'neutro', 'e': ids[0], 'claimed': True}))
    else:
        cands.append(S('La operación no tiene elemento neutro.', True, {**base, 'prop': 'sin_neutro', 'claimed': True}))
    prompt = f'En $\\mathbb{{Z}}_{{{n}}} = {setstr(range(n))}$ se define $a \\star b = {latex.replace("N", str(n))}$. Indicar V o F:'
    return Q(3, prompt, pick(rng, cands))


def u3_zn(rng):
    n = rng.choice([6, 8, 9, 10, 12, 15, 11, 13])
    prime = all(n % d for d in range(2, n))
    k = rng.randint(2, n - 1)
    order = n // math.gcd(k, n)
    zero_pairs = [(a, b) for a in range(2, n) for b in range(a, n) if (a * b) % n == 0]
    d = rng.choice([v for v in range(2, n + 2) if v != n])
    cands = [
        S(f'$\\mathbb{{Z}}_{{{n}}}$ (con suma y producto módulo ${n}$) es un cuerpo.', prime, {'kind': 'isprime', 'n': n, 'claimed': True}),
        S(f'El orden de ${k}$ en $(\\mathbb{{Z}}_{{{n}}}, +)$ es ${order}$.', True, {'kind': 'add_order', 'k': k, 'n': n, 'claimed': order}),
        S(f'El orden de ${k}$ en $(\\mathbb{{Z}}_{{{n}}}, +)$ es ${k}$.', order == k, {'kind': 'add_order', 'k': k, 'n': n, 'claimed': k}),
        S(f'Por Lagrange, $(\\mathbb{{Z}}_{{{n}}}, +)$ puede tener un subgrupo de orden ${d}$.', n % d == 0, {'kind': 'divides', 'n': n, 'd': d, 'claimed': True}),
        S(f'$(\\mathbb{{Z}}_{{{n}}}, +)$ es un grupo cíclico generado por $1$.', True, {'kind': 'add_order', 'k': 1, 'n': n, 'claimed': n}),
    ]
    if zero_pairs:
        a, b = rng.choice(zero_pairs)
        cands.append(S(f'En $\\mathbb{{Z}}_{{{n}}}$, ${a} \\cdot {b} = 0$: hay divisores de cero.', True,
                       {'kind': 'zero_product', 'a': a, 'b': b, 'n': n, 'claimed': 0}))
    else:
        a, b = rng.sample(range(2, n), 2)
        cands.append(S(f'En $\\mathbb{{Z}}_{{{n}}}$, ${a} \\cdot {b} = 0$: hay divisores de cero.', False,
                       {'kind': 'zero_product', 'a': a, 'b': b, 'n': n, 'claimed': 0}))
    return Q(3, f'Estructura de $\\mathbb{{Z}}_{{{n}}}$. Indicar V o F:', pick(rng, cands))


def u3_hamming(rng):
    length = rng.choice([6, 7])
    while True:
        code = [''.join(rng.choice('01') for _ in range(length)) for _ in range(4)]
        if len(set(code)) == 4:
            break
    dist = lambda u, v: sum(x != y for x, y in zip(u, v))
    d = min(dist(u, v) for u, v in itertools.combinations(code, 2))
    u, v = code[0], code[1]
    duv = dist(u, v)
    base = {'kind': 'min_distance', 'code': code}
    cands = [
        S(f'$d({u}, {v}) = {duv}$', True, {'kind': 'hamming', 'u': u, 'v': v, 'claimed': duv}),
        S(f'$d({u}, {v}) = {duv + 1}$', False, {'kind': 'hamming', 'u': u, 'v': v, 'claimed': duv + 1}),
        S(f'La distancia mínima del código es ${d}$.', True, {**base, 'op': 'd', 'claimed': d}),
        S(f'La distancia mínima del código es ${d + 1}$.', False, {**base, 'op': 'd', 'claimed': d + 1}),
        S(f'El código detecta hasta ${d - 1}$ errores.', True, {**base, 'op': 'detecta', 'claimed': d - 1}),
        S(f'El código corrige hasta ${(d - 1) // 2}$ errores.', True, {**base, 'op': 'corrige', 'claimed': (d - 1) // 2}),
        S(f'El código corrige hasta ${d - 1}$ errores.', d - 1 == (d - 1) // 2, {**base, 'op': 'corrige', 'claimed': d - 1}),
    ]
    words = ', '.join(code)
    return Q(3, f'Sea el código binario $C = \\{{{words}\\}}$ con la distancia de Hamming. Indicar V o F:', pick(rng, cands))


def _poly_latex(coeffs):
    terms = []
    for power in range(len(coeffs) - 1, -1, -1):
        if coeffs[power] % 2:
            terms.append('1' if power == 0 else 'x' if power == 1 else f'x^{power}')
    return ' + '.join(terms) if terms else '0'


def _gf2_rem(p, q):
    p = p[:]
    while len(p) >= len(q) and any(p):
        while p and p[-1] == 0:
            p.pop()
        if len(p) < len(q):
            break
        shift = len(p) - len(q)
        for i, c in enumerate(q):
            p[i + shift] ^= c
        while p and p[-1] == 0:
            p.pop()
    return p or [0]


def _gf2_irreducible(p):
    deg = len(p) - 1
    for d in range(1, deg // 2 + 1):
        for tail in itertools.product([0, 1], repeat=d):
            q = list(tail) + [1]
            if _gf2_rem(p, q) == [0]:
                return False
    return True


IRRED_POOL = [[1, 1, 1], [1, 0, 1], [1, 1, 0, 1], [1, 0, 1, 1], [1, 0, 0, 1], [1, 1, 1, 1], [1, 1, 0, 0, 1], [1, 0, 0, 1, 1], [0, 1, 1]]


def u3_polinomios(rng):
    p = [rng.randint(0, 1) for _ in range(rng.randint(4, 5))] + [1]
    q = rng.choice([[1, 1, 1], [1, 1, 0, 1], [1, 0, 1, 1]])
    r = _gf2_rem(p, q)
    wrong = r[:] + [0] * (len(q) - 1 - len(r))
    wrong[0] ^= 1
    cands = [
        S(f'Con coeficientes módulo 2, $({_poly_latex(p)}) \\bmod ({_poly_latex(q)}) = {_poly_latex(r)}$.', True,
          {'kind': 'gf2rem', 'p': p, 'q': q, 'claimed': r}),
        S(f'Con coeficientes módulo 2, $({_poly_latex(p)}) \\bmod ({_poly_latex(q)}) = {_poly_latex(wrong)}$.', False,
          {'kind': 'gf2rem', 'p': p, 'q': q, 'claimed': wrong}),
    ]
    for poly in rng.sample(IRRED_POOL, 4):
        cands.append(S(f'$ {_poly_latex(poly)} $ es irreducible sobre $GF(2)$.', _gf2_irreducible(poly),
                       {'kind': 'gf2irred', 'p': poly, 'claimed': True}))
    return Q(3, 'Polinomios con coeficientes en $GF(2)$. Indicar V o F:', pick(rng, cands))


def u3_conceptos(rng):
    return concept_question(rng, 3, 'algebra', 'Estructuras algebraicas. Indicar V o F:')


# ---------------------------------------------------------------------------
# Unidad 4 · Redes neuronales e IA
# ---------------------------------------------------------------------------

def _step(z):
    return 1 if z >= 0 else 0


def u4_perceptron(rng):
    w = [Fraction(rng.choice([-1, 1, 2, '1/2', '3/2'])) for _ in range(2)]
    b = Fraction(rng.choice(['-1/2', '-1', '-3/2', '1/2', '-2']))
    x = [rng.randint(0, 3), rng.randint(0, 3)]
    z = w[0] * x[0] + w[1] * x[1] + b
    gates = [('AND', [1, 1], '-3/2'), ('OR', [1, 1], '-1/2'), ('NAND', [-1, -1], '3/2')]
    g_name, g_w, g_b = rng.choice(gates)
    claimed_gate = rng.choice(['AND', 'OR', 'NAND'])

    def show(v):
        return dec(float(Fraction(v)))

    base = {'w': [str(v) for v in w], 'b': str(b), 'x': x}
    cands = [
        S(f'La suma ponderada es $z = {show(z)}$.', True, {'kind': 'perceptron', **base, 'op': 'z', 'claimed': str(z)}),
        S(f'La suma ponderada es $z = {show(z + 1)}$.', False, {'kind': 'perceptron', **base, 'op': 'z', 'claimed': str(z + 1)}),
        S(f'La salida es $\\hat y = {_step(z)}$.', True, {'kind': 'perceptron', **base, 'op': 'y', 'claimed': _step(z)}),
        S(f'La salida es $\\hat y = {1 - _step(z)}$.', False, {'kind': 'perceptron', **base, 'op': 'y', 'claimed': 1 - _step(z)}),
        S(f'Otro perceptrón escalón, con $w = ({g_w[0]}, {g_w[1]})$ y $b = {show(g_b)}$, implementa la compuerta {claimed_gate}.',
          claimed_gate == g_name, {'kind': 'perceptron_gate', 'w': g_w, 'b': g_b, 'gate': claimed_gate, 'claimed': True}),
    ]
    prompt = (f'Perceptrón con activación escalón ($\\hat y = 1$ si $z \\ge 0$; $0$ si no), pesos $w = ({show(w[0])}, {show(w[1])})$, '
              f'sesgo $b = {show(b)}$ y entrada $x = {vec(x)}$. Indicar V o F:')
    return Q(4, prompt, pick(rng, cands))


def u4_activaciones(rng):
    z = rng.choice([-2, -1, 1, 2, 3])
    sig = 1 / (1 + math.exp(-z))
    th = math.tanh(z)
    relu = max(0, z)
    leaky = max(0.01 * z, z)
    cands = [
        S(f'$\\mathrm{{ReLU}}({z}) = {relu}$', True, {'kind': 'activation', 'f': 'relu', 'z': z, 'claimed': relu}),
        S(f'$\\mathrm{{ReLU}}({z}) = {z if z < 0 else -z}$', False, {'kind': 'activation', 'f': 'relu', 'z': z, 'claimed': z if z < 0 else -z}),
        S(f'$\\sigma({z}) \\approx {dec(sig)}$', True, {'kind': 'activation', 'f': 'sigmoid', 'z': z, 'claimed': round(sig, 2)}),
        S(f'$\\sigma({z}) \\approx {dec(1 - sig)}$', False, {'kind': 'activation', 'f': 'sigmoid', 'z': z, 'claimed': round(1 - sig, 2)}),
        S(f'$\\tanh({z}) \\approx {dec(th)}$', True, {'kind': 'activation', 'f': 'tanh', 'z': z, 'claimed': round(th, 2)}),
        S(f'$\\text{{Leaky ReLU}}({z}) = {dec(leaky)}$ (con pendiente $0{{,}}01$ para $z < 0$)', True,
          {'kind': 'activation', 'f': 'leaky', 'z': z, 'claimed': leaky}),
        S('$\\sigma(0) = 0{,}5$', True, {'kind': 'activation', 'f': 'sigmoid', 'z': 0, 'claimed': 0.5}),
        S('$\\tanh(0) = 0{,}5$', False, {'kind': 'activation', 'f': 'tanh', 'z': 0, 'claimed': 0.5}),
    ]
    return Q(4, 'Funciones de activación ($\\sigma$ es la sigmoide). Indicar V o F:', pick(rng, cands))


def u4_gradiente(rng):
    c = rng.randint(2, 6)
    w0 = rng.choice([0, 1])
    eta = Fraction(rng.choice(['1/10', '1/5', '1/4', '1/2']))
    w1 = w0 - eta * 2 * (w0 - c)
    w2 = w1 - eta * 2 * (w1 - c)
    base = {'kind': 'gd', 'w0': w0, 'c': c, 'eta': str(eta)}
    cands = [
        S(f"La derivada en $w_0$ es $L'(w_0) = {2 * (w0 - c)}$.", True, {'kind': 'gd_deriv', 'w0': w0, 'c': c, 'claimed': 2 * (w0 - c)}),
        S(f"La derivada en $w_0$ es $L'(w_0) = {w0 - c}$.", False, {'kind': 'gd_deriv', 'w0': w0, 'c': c, 'claimed': w0 - c}),
        S(f'Después de un paso, $w_1 = {dec(w1)}$.', True, {**base, 'steps': 1, 'claimed': str(w1)}),
        S(f'Después de un paso, $w_1 = {dec(w0 + eta * 2 * (w0 - c))}$.', False, {**base, 'steps': 1, 'claimed': str(w0 + eta * 2 * (w0 - c))}),
        S(f'Después de dos pasos, $w_2 = {dec(w2)}$.', True, {**base, 'steps': 2, 'claimed': str(w2)}),
        S(f'Después de dos pasos, $w_2 = {dec(w2 + Fraction(1, 2))}$.', False, {**base, 'steps': 2, 'claimed': str(w2 + Fraction(1, 2))}),
        S(f'El mínimo de $L$ está en $w = {c}$.', True, {'kind': 'gd_min', 'c': c, 'claimed': c}),
        S(f'El mínimo de $L$ está en $w = {w0}$.', False, {'kind': 'gd_min', 'c': c, 'claimed': w0}),
    ]
    prompt = (f'Descenso del gradiente sobre $L(w) = (w - {c})^2$ con $w_0 = {w0}$ y tasa de aprendizaje '
              f"$\\eta = {dec(eta)}$, usando $w \\leftarrow w - \\eta \\cdot L'(w)$. Indicar V o F:")
    return Q(4, prompt, pick(rng, cands))


def u4_cnn(rng):
    while True:
        N, F, P, St = rng.choice([28, 32, 64, 224]), rng.choice([3, 5]), rng.choice([0, 1, 2]), rng.choice([1, 2])
        if (N - F + 2 * P) % St == 0:
            break
    out = (N - F + 2 * P) // St + 1
    C, K = rng.choice([1, 3]), rng.choice([8, 16, 32])
    params = F * F * C * K + K
    base = {'kind': 'convout', 'N': N, 'F': F, 'P': P, 'S': St}
    pbase = {'kind': 'convparams', 'F': F, 'C': C, 'K': K}
    cands = [
        S(f'La salida de la convolución mide ${out} \\times {out}$.', True, {**base, 'claimed': out}),
        S(f'La salida de la convolución mide ${out + 2} \\times {out + 2}$.', False, {**base, 'claimed': out + 2}),
        S(f'Una capa con ${K}$ filtros de ${F} \\times {F}$ sobre ${C}$ canal(es) tiene ${params}$ parámetros (pesos y sesgos).', True,
          {**pbase, 'claimed': params}),
        S(f'Una capa con ${K}$ filtros de ${F} \\times {F}$ sobre ${C}$ canal(es) tiene ${F * F * K}$ parámetros (pesos y sesgos).',
          F * F * K == params, {**pbase, 'claimed': F * F * K}),
        S(f'Un max-pooling $2 \\times 2$ con paso $2$ sobre una entrada de ${N} \\times {N}$ da ${N // 2} \\times {N // 2}$.', True,
          {'kind': 'convout', 'N': N, 'F': 2, 'P': 0, 'S': 2, 'claimed': N // 2}),
        S(f'Un max-pooling $2 \\times 2$ con paso $2$ sobre una entrada de ${N} \\times {N}$ da ${N - 2} \\times {N - 2}$.', N // 2 == N - 2,
          {'kind': 'convout', 'N': N, 'F': 2, 'P': 0, 'S': 2, 'claimed': N - 2}),
    ]
    prompt = (f'Una entrada de ${N} \\times {N}$ pasa por un filtro de ${F} \\times {F}$ con padding $P = {P}$ y paso $S = {St}$ '
              '(salida $= (N - F + 2P)/S + 1$). Indicar V o F:')
    return Q(4, prompt, pick(rng, cands))


def u4_conceptos(rng):
    return concept_question(rng, 4, 'ia', 'Redes neuronales e inteligencia artificial. Indicar V o F:')


# ---------------------------------------------------------------------------
# Unidad 5 · Álgebra lineal
# ---------------------------------------------------------------------------

def _det(M):
    if len(M) == 2:
        return M[0][0] * M[1][1] - M[0][1] * M[1][0]
    return sum((-1) ** j * M[0][j] * _det([row[:j] + row[j + 1:] for row in M[1:]]) for j in range(len(M)))


def _matmul(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(len(B))) for j in range(len(B[0]))] for i in range(len(A))]


def u5_determinantes(rng):
    n = rng.choice([2, 3])
    while True:
        M = [[rng.randint(-3, 4) for _ in range(n)] for _ in range(n)]
        d = _det(M)
        if d != 0:
            break
    k = rng.choice([2, 3])
    base = {'kind': 'det', 'M': M}
    cands = [
        S(f'$\\det(A) = {d}$', True, {**base, 'claimed': d}),
        S(f'$\\det(A) = {-d}$', False, {**base, 'claimed': -d}),
        S(f'$\\det({k}A) = {k ** n * d}$', True, {**base, 'k': k, 'claimed': k ** n * d}),
        S(f'$\\det({k}A) = {k * d}$', False, {**base, 'k': k, 'claimed': k * d}),
        S(f'$\\det(A^2) = {d * d}$', True, {**base, 'power': 2, 'claimed': d * d}),
        S(f'$\\det(A^T) = {d}$', True, {**base, 'transpose': True, 'claimed': d}),
        S('$A$ es invertible.', True, {'kind': 'invertible', 'M': M, 'claimed': True}),
    ]
    return Q(5, f'Sea $A = {mat(M)}$. Indicar V o F:', pick(rng, cands))


def u5_producto(rng):
    while True:
        A = [[rng.randint(-2, 3) for _ in range(2)] for _ in range(2)]
        B = [[rng.randint(-2, 3) for _ in range(2)] for _ in range(2)]
        if _matmul(A, B) != _matmul(B, A):
            break
    AB, BA = _matmul(A, B), _matmul(B, A)
    I = [[1, 0], [0, 1]]
    cands = [
        S(f'$AB = {mat(AB)}$', True, {'kind': 'matmul', 'A': A, 'B': B, 'claimed': AB}),
        S(f'$AB = {mat(BA)}$', False, {'kind': 'matmul', 'A': A, 'B': B, 'claimed': BA}),
        S(f'$BA = {mat(BA)}$', True, {'kind': 'matmul', 'A': B, 'B': A, 'claimed': BA}),
        S('$AB = BA$', False, {'kind': 'commute', 'A': A, 'B': B, 'claimed': True}),
        S('$A \\cdot I = I \\cdot A$, con $I$ la identidad $2 \\times 2$.', True, {'kind': 'commute', 'A': A, 'B': I, 'claimed': True}),
        S(f'$\\operatorname{{tr}}(AB) = {AB[0][0] + AB[1][1]}$', True, {'kind': 'trace', 'M': AB, 'claimed': AB[0][0] + AB[1][1]}),
    ]
    return Q(5, f'Sean $A = {mat(A)}$ y $B = {mat(B)}$. Indicar V o F:', pick(rng, cands))


def u5_autovalores(rng):
    l1, l2 = rng.sample([-2, -1, 1, 2, 3, 4, 5], 2)
    P = rng.choice([[[1, 1], [1, 2]], [[2, 1], [1, 1]], [[1, 0], [1, 1]], [[1, 2], [0, 1]]])
    Pinv = [[P[1][1], -P[0][1]], [-P[1][0], P[0][0]]]  # det(P) = 1
    A = _matmul(_matmul(P, [[l1, 0], [0, l2]]), Pinv)
    v1 = [P[0][0], P[1][0]]
    cands = [
        S(f'Los autovalores de $A$ son ${l1}$ y ${l2}$.', True, {'kind': 'eigenvalues', 'M': A, 'claimed': [l1, l2]}),
        S(f'Los autovalores de $A$ son ${l1 + 1}$ y ${l2 - 1}$.', sorted([l1 + 1, l2 - 1]) == sorted([l1, l2]),
          {'kind': 'eigenvalues', 'M': A, 'claimed': [l1 + 1, l2 - 1]}),
        S(f'$\\operatorname{{tr}}(A) = {l1 + l2}$', True, {'kind': 'trace', 'M': A, 'claimed': l1 + l2}),
        S(f'$\\det(A) = {l1 * l2}$', True, {'kind': 'det', 'M': A, 'claimed': l1 * l2}),
        S(f'$\\det(A) = {l1 + l2}$', l1 * l2 == l1 + l2, {'kind': 'det', 'M': A, 'claimed': l1 + l2}),
        S(f'$v = {vec(v1)}$ es autovector de $A$ asociado a $\\lambda = {l1}$.', True, {'kind': 'eigvec', 'M': A, 'v': v1, 'lam': l1, 'claimed': True}),
        S(f'$v = {vec(v1)}$ es autovector de $A$ asociado a $\\lambda = {l2}$.', False, {'kind': 'eigvec', 'M': A, 'v': v1, 'lam': l2, 'claimed': True}),
    ]
    return Q(5, f'Sea $A = {mat(A)}$. Indicar V o F:', pick(rng, cands))


def u5_vectores(rng):
    u = rng.choice([[2, 3, 6], [1, 2, 2], [2, -1, 2], [4, 4, 7], [3, 4, 12]])
    v = [rng.randint(-3, 3) for _ in range(3)]
    while v == [0, 0, 0]:
        v = [rng.randint(-3, 3) for _ in range(3)]
    dot = sum(a * b for a, b in zip(u, v))
    norm = math.isqrt(sum(a * a for a in u))
    cross = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
    w = [u[1], -u[0], 0]  # ortogonal a u
    cands = [
        S(f'$u \\cdot v = {dot}$', True, {'kind': 'dot', 'u': u, 'v': v, 'claimed': dot}),
        S(f'$u \\cdot v = {dot + 2}$', False, {'kind': 'dot', 'u': u, 'v': v, 'claimed': dot + 2}),
        S(f'$\\|u\\| = {norm}$', True, {'kind': 'norm', 'u': u, 'claimed': norm}),
        S(f'$\\|u\\| = {sum(abs(a) for a in u)}$', False, {'kind': 'norm', 'u': u, 'claimed': sum(abs(a) for a in u)}),
        S(f'$u \\times v = {vec(cross)}$', True, {'kind': 'cross', 'u': u, 'v': v, 'claimed': cross}),
        S(f'$u \\times v = {vec([-c for c in cross])}$', cross == [0, 0, 0], {'kind': 'cross', 'u': u, 'v': v, 'claimed': [-c for c in cross]}),
        S(f'$u$ y $w = {vec(w)}$ son ortogonales.', True, {'kind': 'dot', 'u': u, 'v': w, 'claimed': 0}),
    ]
    return Q(5, f'Sean $u = {vec(u)}$ y $v = {vec(v)}$ en $\\mathbb{{R}}^3$. Indicar V o F:', pick(rng, cands))


def u5_sistemas(rng):
    while True:
        A = [[rng.randint(-3, 4) for _ in range(2)] for _ in range(2)]
        if _det(A) != 0:
            break
    x, y = rng.randint(-4, 5), rng.randint(-4, 5)
    b = [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y]
    k = rng.choice([2, 3, -1])
    Ms = [[1, 2, 3], [2, 4, 6], [1, 0, 1]]
    Mf = [[1, 2, 0], [0, 1, 1], [1, 0, 2]]
    rank_s = 2
    cands = [
        S(f'La solución del sistema es $(x, y) = ({x}, {y})$.', True, {'kind': 'solve', 'A': A, 'b': b, 'claimed': [x, y]}),
        S(f'La solución del sistema es $(x, y) = ({y}, {x})$.', x == y, {'kind': 'solve', 'A': A, 'b': b, 'claimed': [y, x]}),
        S('El sistema es compatible determinado porque $\\det(A) \\neq 0$.', True, {'kind': 'invertible', 'M': A, 'claimed': True}),
        S(f'$\\operatorname{{rango}}{mat(Ms)} = {rank_s}$', True, {'kind': 'rank', 'M': Ms, 'claimed': rank_s}),
        S(f'$\\operatorname{{rango}}{mat(Ms)} = 3$', False, {'kind': 'rank', 'M': Ms, 'claimed': 3}),
        S(f'$\\operatorname{{rango}}{mat(Mf)} = 3$', _det(Mf) != 0, {'kind': 'rank', 'M': Mf, 'claimed': 3}),
        S(f'Si multiplico la primera fila de $A$ por ${k}$, el determinante se multiplica por ${k}$.', True,
          {'kind': 'det', 'M': [[k * A[0][0], k * A[0][1]], A[1]], 'claimed': k * _det(A)}),
    ]
    prompt = (f'Se resuelve $A \\cdot (x, y)^T = b$ con $A = {mat(A)}$ y $b = {mat([[b[0]], [b[1]]])}$. Indicar V o F:')
    return Q(5, prompt, pick(rng, cands))


def u5_matrices_mod(rng):
    m = rng.choice([5, 7, 26])
    while True:
        A = [[rng.randint(0, m - 1) for _ in range(2)] for _ in range(2)]
        if _det(A) % m:
            break
    d = _det(A) % m
    A2 = [[v % m for v in row] for row in _matmul(A, A)]
    S2 = [[(A2[i][j] + (1 if i == j else 0)) % m for j in range(2)] for i in range(2)]
    cands = [
        S(f'$\\det(A) \\bmod {m} = {d}$', True, {'kind': 'detmod', 'M': A, 'm': m, 'claimed': d}),
        S(f'$\\det(A) \\bmod {m} = {(d + 1) % m}$', False, {'kind': 'detmod', 'M': A, 'm': m, 'claimed': (d + 1) % m}),
        S(f'$A$ es invertible módulo ${m}$ (sirve como clave de un cifrado de Hill).', math.gcd(d, m) == 1,
          {'kind': 'invertible_mod', 'M': A, 'm': m, 'claimed': True}),
        S(f'$A^2 \\bmod {m} = {mat(A2)}$', True, {'kind': 'matpowmod', 'M': A, 'e': 2, 'm': m, 'claimed': A2}),
        S(f'$A^2 \\bmod {m} = {mat(S2)}$', S2 == A2, {'kind': 'matpowmod', 'M': A, 'e': 2, 'm': m, 'claimed': S2}),
    ]
    return Q(5, f'Sea $A = {mat(A)}$ con aritmética módulo ${m}$. Indicar V o F:', pick(rng, cands))


# ---------------------------------------------------------------------------
# Unidad 6 · Probabilidad y estadística
# ---------------------------------------------------------------------------

def u6_dados(rng):
    s1, s2 = rng.sample(range(2, 13), 2)
    count = lambda sums: sum(1 for a in range(1, 7) for b in range(1, 7) if a + b in sums)
    n = rng.choice([3, 4, 5])
    k = rng.randint(1, n - 1)
    p_k = Fraction(math.comb(n, k), 2 ** n)
    cands = [
        S(f'Al lanzar dos dados, $P(\\text{{suma}} = {s1}) = {frac(Fraction(count([s1]), 36))}$', True,
          {'kind': 'prob', 'op': 'dice_sum', 'sums': [s1], 'claimed': str(Fraction(count([s1]), 36))}),
        S(f'Al lanzar dos dados, $P(\\text{{suma}} = {s1}) = {frac(Fraction(1, 11))}$', Fraction(count([s1]), 36) == Fraction(1, 11),
          {'kind': 'prob', 'op': 'dice_sum', 'sums': [s1], 'claimed': '1/11'}),
        S(f'Al lanzar dos dados, $P(\\text{{suma}} = {s1} \\text{{ o }} {s2}) = {frac(Fraction(count([s1, s2]), 36))}$', True,
          {'kind': 'prob', 'op': 'dice_sum', 'sums': [s1, s2], 'claimed': str(Fraction(count([s1, s2]), 36))}),
        S(f'Al lanzar ${n}$ monedas, $P(\\text{{exactamente {k} caras}}) = {frac(p_k)}$', True,
          {'kind': 'prob', 'op': 'coins_k', 'n': n, 'k': k, 'claimed': str(p_k)}),
        S(f'Al lanzar ${n}$ monedas, $P(\\text{{exactamente {k} caras}}) = {frac(Fraction(1, 2 ** n))}$', p_k == Fraction(1, 2 ** n),
          {'kind': 'prob', 'op': 'coins_k', 'n': n, 'k': k, 'claimed': str(Fraction(1, 2 ** n))}),
        S(f'Al lanzar ${n}$ monedas, $P(\\text{{todas caras}}) = {frac(Fraction(1, 2 ** n))}$', True,
          {'kind': 'prob', 'op': 'coins_k', 'n': n, 'k': n, 'claimed': str(Fraction(1, 2 ** n))}),
    ]
    return Q(6, 'Dados y monedas equilibrados. Indicar V o F:', pick(rng, cands))


def u6_urna(rng):
    white, black = rng.randint(3, 8), rng.randint(2, 7)
    total = white + black
    with_r = Fraction(white, total) ** 2
    without = Fraction(white, total) * Fraction(white - 1, total - 1)
    base = {'kind': 'prob', 'op': 'urn_two', 'white': white, 'black': black}
    cands = [
        S(f'Con reposición, $P(\\text{{dos blancas}}) = {frac(with_r)}$', True, {**base, 'replace': True, 'claimed': str(with_r)}),
        S(f'Con reposición, $P(\\text{{dos blancas}}) = {frac(without)}$', False, {**base, 'replace': True, 'claimed': str(without)}),
        S(f'Sin reposición, $P(\\text{{dos blancas}}) = {frac(without)}$', True, {**base, 'replace': False, 'claimed': str(without)}),
        S(f'Sin reposición, $P(\\text{{dos blancas}}) = {frac(with_r)}$', False, {**base, 'replace': False, 'claimed': str(with_r)}),
        S('Con reposición, la probabilidad de dos blancas es menor que sin reposición.', with_r < without,
          {'kind': 'urn_compare', 'white': white, 'black': black, 'claimed': True}),
        S('Sin reposición, la probabilidad de dos blancas es menor que con reposición.', without < with_r,
          {'kind': 'urn_compare', 'white': white, 'black': black, 'claimed': False}),
    ]
    return Q(6, f'Una urna tiene ${white}$ bolillas blancas y ${black}$ negras; se extraen dos. Indicar V o F:', pick(rng, cands))


def u6_bayes(rng):
    shares = rng.choice([[50, 30, 20], [40, 35, 25], [60, 25, 15], [45, 35, 20]])
    rates = rng.choice([[2, 5, 3], [1, 4, 2], [3, 2, 6], [2, 6, 4]])
    total = sum(Fraction(s, 100) * Fraction(r, 100) for s, r in zip(shares, rates))
    i = rng.randint(0, 2)
    post = Fraction(shares[i], 100) * Fraction(rates[i], 100) / total
    names = ['A', 'B', 'C']
    base = {'kind': 'prob', 'shares': shares, 'rates': rates}
    cands = [
        S(f'$P(\\text{{defectuoso}}) = {dec(total, 4)}$', True, {**base, 'op': 'bayes_total', 'claimed': str(total)}),
        S(f'$P(\\text{{defectuoso}}) = {dec(sum(Fraction(r, 100) for r in rates) / 3, 4)}$',
          sum(Fraction(r, 100) for r in rates) / 3 == total, {**base, 'op': 'bayes_total', 'claimed': str(sum(Fraction(r, 100) for r in rates) / 3)}),
        S(f'$P({names[i]} \\mid \\text{{defectuoso}}) = {frac(post)}$', True, {**base, 'op': 'bayes_post', 'i': i, 'claimed': str(post)}),
        S(f'$P({names[i]} \\mid \\text{{defectuoso}}) = {dec(Fraction(rates[i], 100))}$', Fraction(rates[i], 100) == post,
          {**base, 'op': 'bayes_post', 'i': i, 'claimed': str(Fraction(rates[i], 100))}),
        S(f'$P({names[i]} \\mid \\text{{defectuoso}}) = {dec(Fraction(shares[i], 100))}$', Fraction(shares[i], 100) == post,
          {**base, 'op': 'bayes_post', 'i': i, 'claimed': str(Fraction(shares[i], 100))}),
    ]
    prompt = (f'Tres plantas $A$, $B$ y $C$ fabrican el ${shares[0]}\\%$, ${shares[1]}\\%$ y ${shares[2]}\\%$ de los circuitos; '
              f'fallan el ${rates[0]}\\%$, ${rates[1]}\\%$ y ${rates[2]}\\%$ respectivamente. Indicar V o F:')
    return Q(6, prompt, pick(rng, cands))


def u6_descriptiva(rng):
    while True:
        data = [rng.randint(1, 12) for _ in range(rng.choice([5, 7]))]
        counts = Counter(data).most_common()
        if len(counts) > 1 and counts[0][1] > counts[1][1] and sum(data) % len(data) == 0:
            break
    mean = Fraction(sum(data), len(data))
    median = sorted(data)[len(data) // 2]
    mode = counts[0][0]
    pvar = sum((Fraction(x) - mean) ** 2 for x in data) / len(data)
    base = {'kind': 'stat', 'data': data}
    cands = [
        S(f'La media es ${frac(mean)}$.', True, {**base, 'op': 'mean', 'claimed': str(mean)}),
        S(f'La media es ${frac(mean + 1)}$.', False, {**base, 'op': 'mean', 'claimed': str(mean + 1)}),
        S(f'La mediana es ${median}$.', True, {**base, 'op': 'median', 'claimed': median}),
        S(f'La mediana es ${data[len(data) // 2]}$.', data[len(data) // 2] == median, {**base, 'op': 'median', 'claimed': data[len(data) // 2]}),
        S(f'La moda es ${mode}$.', True, {**base, 'op': 'mode', 'claimed': mode}),
        S(f'El rango es ${max(data) - min(data)}$.', True, {**base, 'op': 'range', 'claimed': max(data) - min(data)}),
        S(f'La varianza poblacional es ${frac(pvar)}$.', True, {**base, 'op': 'pvar', 'claimed': str(pvar)}),
        S(f'La varianza poblacional es ${frac(pvar * len(data) / (len(data) - 1))}$.', False, {**base, 'op': 'pvar', 'claimed': str(pvar * len(data) / (len(data) - 1))}),
    ]
    return Q(6, f'Para los datos ${", ".join(str(v) for v in data)}$, indicar V o F:', pick(rng, cands))


def u6_conceptos(rng):
    return concept_question(rng, 6, 'estadistica', 'Probabilidad e inferencia. Indicar V o F:')


# ---------------------------------------------------------------------------
# Unidad 7 · Teoría de la información y complejidad
# ---------------------------------------------------------------------------

DISTRIBUTIONS = [
    (['1/2', '1/4', '1/8', '1/8'], '1.75'),
    (['1/2', '1/2'], '1'),
    (['1/4', '1/4', '1/4', '1/4'], '2'),
    (['1/2', '1/4', '1/4'], '1.5'),
    (['1/8'] * 8, '3'),
    (['1/2', '1/4', '1/8', '1/16', '1/32', '1/32'], '1.9375'),
    (['1', '0', '0', '0'], '0'),
    (['1/4', '1/4', '1/2'], '1.5'),
]


def u7_entropia(rng):
    chosen = rng.sample(DISTRIBUTIONS, 4)
    cands = []
    for probs, h in chosen:
        shown = '\\{' + ', '.join(frac(Fraction(p)) for p in probs) + '\\}'
        cands.append(S(f'Una fuente con probabilidades ${shown}$ tiene entropía $H = {dec(float(h), 4)}$ bits.', True,
                       {'kind': 'entropy', 'probs': probs, 'claimed': h}))
        wrong = str(float(h) + 0.5)
        cands.append(S(f'Una fuente con probabilidades ${shown}$ tiene entropía $H = {dec(float(wrong), 4)}$ bits.', False,
                       {'kind': 'entropy', 'probs': probs, 'claimed': wrong}))
    k = rng.randint(3, 6)
    cands.append(S(f'Una fuente uniforme con entropía de ${k}$ bits tiene ${2 ** k}$ estados.', True,
                   {'kind': 'entropy', 'probs': [f'1/{2 ** k}'] * (2 ** k), 'claimed': str(k)}))
    cands.append(S(f'Una fuente uniforme con entropía de ${k}$ bits tiene ${k * 2}$ estados.', k * 2 == 2 ** k,
                   {'kind': 'entropy', 'probs': [f'1/{k * 2}'] * (k * 2), 'claimed': str(k)}))
    return Q(7, 'Entropía de Shannon ($H = -\\sum p_i \\log_2 p_i$). Indicar V o F:', pick(rng, cands))


CODES = [
    (['0', '10', '110', '111'], ['1/2', '1/4', '1/8', '1/8']),
    (['0', '01', '011', '111'], ['1/2', '1/4', '1/8', '1/8']),
    (['00', '01', '10', '11'], ['1/4', '1/4', '1/4', '1/4']),
    (['0', '10', '11'], ['1/2', '1/4', '1/4']),
    (['1', '01', '001', '000'], ['1/2', '1/4', '1/8', '1/8']),
    (['0', '1', '10', '11'], ['1/4', '1/4', '1/4', '1/4']),
]


def u7_codificacion(rng):
    cands = []
    for words, probs in rng.sample(CODES, 3):
        prefix_free = not any(a != b and b.startswith(a) for a in words for b in words)
        cands.append(S(f'El código $\\{{{", ".join(words)}\\}}$ es un código prefijo.', prefix_free,
                       {'kind': 'prefix', 'words': words, 'claimed': True}))
        lengths = [len(w) for w in words]
        kraft = sum(Fraction(1, 2 ** l) for l in lengths)
        cands.append(S(f'Las longitudes ${vec(lengths)}$ cumplen la desigualdad de Kraft ($\\sum 2^{{-l_i}} \\le 1$).', kraft <= 1,
                       {'kind': 'kraft', 'lengths': lengths, 'claimed': True}))
        avg = sum(Fraction(p) * len(w) for p, w in zip(probs, words))
        shown_p = '\\{' + ', '.join(frac(Fraction(p)) for p in probs) + '\\}'
        cands.append(S(f'Con probabilidades ${shown_p}$, la longitud media del código $\\{{{", ".join(words)}\\}}$ es $\\bar L = {dec(avg, 3)}$ bits.', True,
                       {'kind': 'avglen', 'probs': probs, 'words': words, 'claimed': str(avg)}))
        wrong = avg + Fraction(1, 4)
        cands.append(S(f'Con probabilidades ${shown_p}$, la longitud media del código $\\{{{", ".join(words)}\\}}$ es $\\bar L = {dec(wrong, 3)}$ bits.', False,
                       {'kind': 'avglen', 'probs': probs, 'words': words, 'claimed': str(wrong)}))
    return Q(7, 'Codificación de fuente. Indicar V o F:', pick(rng, cands))


def u7_canal(rng):
    B = rng.choice([1000, 2000, 3000, 4000])
    k = rng.choice([3, 4, 5, 7])
    snr = 2 ** k - 1
    cands = [
        S('Un canal binario simétrico con $p = 0{,}5$ tiene capacidad $C = 0$.', True, {'kind': 'capacity', 'channel': 'bsc', 'p': 0.5, 'claimed': 0}),
        S('Un canal binario simétrico sin errores ($p = 0$) tiene capacidad $C = 1$ bit por uso.', True, {'kind': 'capacity', 'channel': 'bsc', 'p': 0, 'claimed': 1}),
        S('Un canal binario simétrico con $p = 0{,}1$ tiene capacidad $C \\approx 0{,}531$ bits por uso.', True, {'kind': 'capacity', 'channel': 'bsc', 'p': 0.1, 'claimed': 0.531}),
        S('Un canal binario simétrico con $p = 0{,}1$ tiene capacidad $C \\approx 0{,}9$ bits por uso.', False, {'kind': 'capacity', 'channel': 'bsc', 'p': 0.1, 'claimed': 0.9}),
        S(f'Con ancho de banda $B = {B}$ Hz y $S/N = {snr}$, Shannon-Hartley da $C = {B * k}$ bit/s.', True,
          {'kind': 'capacity', 'channel': 'awgn', 'B': B, 'snr': snr, 'claimed': B * k}),
        S(f'Con ancho de banda $B = {B}$ Hz y $S/N = {snr}$, Shannon-Hartley da $C = {B * snr}$ bit/s.', False,
          {'kind': 'capacity', 'channel': 'awgn', 'B': B, 'snr': snr, 'claimed': B * snr}),
        S(f'Duplicar el ancho de banda a ${2 * B}$ Hz (con la misma $S/N$) duplica la capacidad.', True,
          {'kind': 'capacity', 'channel': 'awgn', 'B': 2 * B, 'snr': snr, 'claimed': 2 * B * k}),
    ]
    return Q(7, 'Capacidad de canal. Indicar V o F:', pick(rng, cands))


GROWTH = [('log(n)', '\\log n'), ('n', 'n'), ('n*log(n)', 'n \\log n'), ('n**2', 'n^2'), ('n**3', 'n^3'),
          ('2**n', '2^n'), ('factorial(n)', 'n!')]


def u7_complejidad(rng):
    cands = []
    for _ in range(3):
        i, j = sorted(rng.sample(range(len(GROWTH)), 2))
        (fa, la), (fb, lb) = GROWTH[i], GROWTH[j]
        if rng.random() < 0.5:
            cands.append(S(f'$O({la})$ crece más lento que $O({lb})$.', True, {'kind': 'growth', 'fa': fa, 'fb': fb, 'claimed': True}))
        else:
            cands.append(S(f'$O({lb})$ crece más lento que $O({la})$.', False, {'kind': 'growth', 'fa': fb, 'fb': fa, 'claimed': True}))
    bank = CONCEPT_BANKS['complejidad']
    for text, answer in rng.sample(bank, 5):
        cands.append(S(text, answer))
    return Q(7, 'Complejidad computacional. Indicar V o F:', pick(rng, cands))


def u7_turing(rng):
    state, read = rng.randint(1, 4), rng.randint(0, 1)
    nxt, write, move = rng.randint(1, 5), rng.randint(0, 1), rng.choice(['R', 'L'])
    move_text = {'R': 'derecha', 'L': 'izquierda'}
    other_move = 'L' if move == 'R' else 'R'
    t = (state, read, nxt, write, move)
    cands = [
        S(f'Si la máquina está en el estado ${state}$ y lee ${read}$, pasa al estado ${nxt}$.', True,
          {'kind': 'turing', 'field_value': nxt, 'claimed': nxt}),
        S(f'Si la máquina está en el estado ${state}$ y lee ${read}$, pasa al estado ${read}$.', read == nxt,
          {'kind': 'turing', 'field_value': nxt, 'claimed': read}),
        S(f'La instrucción graba el bit ${write}$ en la celda.', True, {'kind': 'turing', 'field_value': write, 'claimed': write}),
        S(f'La instrucción graba el bit ${1 - write}$ en la celda.', False, {'kind': 'turing', 'field_value': write, 'claimed': 1 - write}),
        S(f'Después de grabar, el cabezal se mueve a la {move_text[move]}.', True, {'kind': 'turing', 'field_value': move, 'claimed': move}),
        S(f'Después de grabar, el cabezal se mueve a la {move_text[other_move]}.', False, {'kind': 'turing', 'field_value': move, 'claimed': other_move}),
    ]
    prompt = (f'Una máquina de Turing tiene la instrucción $({t[0]}, {t[1]}, {t[2]}, {t[3]}, {t[4]})$ con el formato '
              '(estado actual, bit leído, estado siguiente, bit grabado, dirección). Indicar V o F:')
    return Q(7, prompt, pick(rng, cands))


def u7_informacion(rng):
    return concept_question(rng, 7, 'informacion', 'Teoría de la información. Indicar V o F:')


# ---------------------------------------------------------------------------
# Unidad 8 · Teoría de grafos
# ---------------------------------------------------------------------------

def _random_connected_graph(rng, n, extra):
    nodes = list(range(1, n + 1))
    order = nodes[:]
    rng.shuffle(order)
    edges = set()
    for i in range(1, n):
        u, v = order[i], rng.choice(order[:i])
        edges.add(tuple(sorted((u, v))))
    pairs = [tuple(sorted(p)) for p in itertools.combinations(nodes, 2) if tuple(sorted(p)) not in edges]
    for pair in rng.sample(pairs, min(extra, len(pairs))):
        edges.add(pair)
    return nodes, sorted(edges)


def u8_grados(rng):
    n = rng.randint(5, 7)
    nodes, edges = _random_connected_graph(rng, n, rng.randint(1, 4))
    degree = Counter()
    for u, v in edges:
        degree[u] += 1
        degree[v] += 1
    odd = sum(1 for v in nodes if degree[v] % 2)
    base = {'kind': 'graph', 'nodes': nodes, 'edges': edges}
    v = rng.choice(nodes)
    cands = [
        S(f'La suma de los grados es ${2 * len(edges)}$.', True, {**base, 'op': 'degree_sum', 'claimed': 2 * len(edges)}),
        S(f'La suma de los grados es ${len(edges)}$.', False, {**base, 'op': 'degree_sum', 'claimed': len(edges)}),
        S(f'El vértice ${v}$ tiene grado ${degree[v]}$.', True, {**base, 'op': 'degree', 'v': v, 'claimed': degree[v]}),
        S(f'Hay ${odd}$ vértices de grado impar.', True, {**base, 'op': 'odd', 'claimed': odd}),
        S('El grafo tiene un circuito euleriano.', odd == 0, {**base, 'op': 'euler_circuit', 'claimed': True}),
        S('El grafo tiene un camino euleriano.', odd in (0, 2), {**base, 'op': 'euler_path', 'claimed': True}),
        S('El grafo es conexo.', True, {**base, 'op': 'connected', 'claimed': True}),
    ]
    edge_text = ', '.join(f'\\{{{a},{b}\\}}' for a, b in edges)
    return Q(8, f'Sea $G$ el grafo con vértices ${setstr(nodes)}$ y aristas $E = \\{{{edge_text}\\}}$. Indicar V o F:', pick(rng, cands))


def u8_completos(rng):
    n = rng.randint(4, 9)
    m = rng.randint(2, 4)
    cands = [
        S(f'$K_{{{n}}}$ tiene ${n * (n - 1) // 2}$ aristas.', True, {'kind': 'complete', 'n': n, 'op': 'edges', 'claimed': n * (n - 1) // 2}),
        S(f'$K_{{{n}}}$ tiene ${n * (n - 1)}$ aristas.', False, {'kind': 'complete', 'n': n, 'op': 'edges', 'claimed': n * (n - 1)}),
        S(f'$K_{{{n}}}$ tiene un circuito euleriano.', n % 2 == 1, {'kind': 'complete', 'n': n, 'op': 'euler', 'claimed': True}),
        S(f'El número cromático de $K_{{{n}}}$ es ${n}$.', True, {'kind': 'complete', 'n': n, 'op': 'chromatic', 'claimed': n}),
        S(f'$K_{{{n}}}$ es un grafo plano.', n <= 4, {'kind': 'complete', 'n': n, 'op': 'planar', 'claimed': True}),
        S(f'El grafo bipartito completo $K_{{{m},{n}}}$ tiene ${m * n}$ aristas.', True, {'kind': 'complete', 'n': n, 'm': m, 'op': 'bip_edges', 'claimed': m * n}),
        S(f'El grafo bipartito completo $K_{{{m},{n}}}$ tiene ${m + n}$ aristas.', m * n == m + n, {'kind': 'complete', 'n': n, 'm': m, 'op': 'bip_edges', 'claimed': m + n}),
    ]
    return Q(8, 'Grafos completos y bipartitos. Indicar V o F:', pick(rng, cands))


def _mst_weight(nodes, wedges):
    parent = {v: v for v in nodes}

    def find(v):
        while parent[v] != v:
            parent[v] = parent[parent[v]]
            v = parent[v]
        return v

    total = 0
    for u, v, w in sorted(wedges, key=lambda e: e[2]):
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv
            total += w
    return total


def _dijkstra(nodes, wedges, s):
    dist = {v: math.inf for v in nodes}
    dist[s] = 0
    pending = set(nodes)
    while pending:
        u = min(pending, key=lambda v: dist[v])
        pending.remove(u)
        for a, b, w in wedges:
            for x, y in ((a, b), (b, a)):
                if x == u and dist[u] + w < dist[y]:
                    dist[y] = dist[u] + w
    return dist


def u8_ponderado(rng):
    labels = ['A', 'B', 'C', 'D', 'E', 'F'][:rng.randint(5, 6)]
    _, edges_i = _random_connected_graph(rng, len(labels), rng.randint(2, 4))
    wedges = [(labels[u - 1], labels[v - 1], rng.randint(1, 9)) for u, v in edges_i]
    mst = _mst_weight(labels, wedges)
    s, t = labels[0], labels[-1]
    dist = _dijkstra(labels, wedges, s)[t]
    base = {'kind': 'weighted', 'edges': wedges}
    cands = [
        S(f'El árbol generador mínimo pesa ${mst}$.', True, {**base, 'op': 'mst', 'claimed': mst}),
        S(f'El árbol generador mínimo pesa ${mst + 2}$.', False, {**base, 'op': 'mst', 'claimed': mst + 2}),
        S(f'El árbol generador mínimo tiene ${len(labels) - 1}$ aristas.', True, {**base, 'op': 'mst_edges', 'claimed': len(labels) - 1}),
        S(f'El árbol generador mínimo tiene ${len(labels)}$ aristas.', False, {**base, 'op': 'mst_edges', 'claimed': len(labels)}),
        S(f'La distancia mínima de ${s}$ a ${t}$ (Dijkstra) es ${dist}$.', True, {**base, 'op': 'sp', 's': s, 't': t, 'claimed': dist}),
        S(f'La distancia mínima de ${s}$ a ${t}$ (Dijkstra) es ${dist + 1}$.', False, {**base, 'op': 'sp', 's': s, 't': t, 'claimed': dist + 1}),
    ]
    edge_text = ', '.join(f'{u}{v}\\!:\\!{w}' for u, v, w in wedges)
    return Q(8, f'Grafo ponderado no dirigido con aristas (extremos: peso) ${edge_text}$. Indicar V o F:', pick(rng, cands))


def u8_conceptos(rng):
    return concept_question(rng, 8, 'grafos', 'Teoría de grafos y algoritmos. Indicar V o F:')


# ---------------------------------------------------------------------------
# Unidad 9 · Álgebra no conmutativa (FrodoKEM)
# ---------------------------------------------------------------------------

def u9_lwe(rng):
    q = 128
    A = [[rng.randint(0, q - 1) for _ in range(2)] for _ in range(2)]
    Svec = [rng.choice([-1, 0, 1]) for _ in range(2)]
    while Svec == [0, 0]:
        Svec = [rng.choice([-1, 0, 1]) for _ in range(2)]
    E = [rng.choice([-1, 0, 1]) for _ in range(2)]
    B = [(A[i][0] * Svec[0] + A[i][1] * Svec[1] + E[i]) % q for i in range(2)]
    noE = [(A[i][0] * Svec[0] + A[i][1] * Svec[1]) % q for i in range(2)]
    base = {'kind': 'lwe', 'A': A, 'S': Svec, 'E': E, 'q': q}
    cands = [
        S(f'$B_1 = {B[0]}$', True, {**base, 'i': 0, 'claimed': B[0]}),
        S(f'$B_1 = {(B[0] + 2) % q}$', False, {**base, 'i': 0, 'claimed': (B[0] + 2) % q}),
        S(f'$B_2 = {B[1]}$', True, {**base, 'i': 1, 'claimed': B[1]}),
        S(f'$B_2 = {noE[1]}$', noE[1] == B[1], {**base, 'i': 1, 'claimed': noE[1]}),
    ]
    for text, answer in rng.sample(CONCEPT_BANKS['frodo'], 3):
        cands.append(S(text, answer))
    prompt = (f'LWE de juguete con $q = {q}$: $A = {mat(A)}$, $S = {mat([[v] for v in Svec])}$, $E = {mat([[v] for v in E])}$ '
              'y $B = A \\cdot S + E \\pmod{128}$ (índices desde 1). Indicar V o F:')
    return Q(9, prompt, pick(rng, cands))


def u9_encode(rng):
    q = 128
    xs = rng.sample([3, 97, 66, 127, 15, 17, 47, 49, 30, 100, 60, 125], 3)
    k = rng.randint(0, 3)
    cands = [
        S(f'$\\mathrm{{Encode}}({k}) = {k * 32}$', True, {'kind': 'encode', 'k': k, 'q': q, 'claimed': k * 32}),
        S(f'$\\mathrm{{Encode}}({k}) = {k * 4}$', k * 4 == k * 32, {'kind': 'encode', 'k': k, 'q': q, 'claimed': k * 4}),
    ]
    for x in xs:
        real = round(Fraction(x * 4, q)) % 4
        cands.append(S(f'$\\mathrm{{Decode}}({x}) = {real}$', True, {'kind': 'decode', 'x': x, 'q': q, 'claimed': real}))
        wrong = (real + 1) % 4
        cands.append(S(f'$\\mathrm{{Decode}}({x}) = {wrong}$', False, {'kind': 'decode', 'x': x, 'q': q, 'claimed': wrong}))
    prompt = ('En el FrodoKEM de juguete ($q = 128$, 2 bits por entrada): $\\mathrm{Encode}(k) = 32k$ y '
              '$\\mathrm{Decode}(x) = \\mathrm{redondeo}(x \\cdot 4/128) \\bmod 4$. Indicar V o F:')
    return Q(9, prompt, pick(rng, cands))


def u9_no_conmutativa(rng):
    while True:
        A = [[rng.randint(-2, 3) for _ in range(2)] for _ in range(2)]
        B = [[rng.randint(-2, 3) for _ in range(2)] for _ in range(2)]
        if _matmul(A, B) != _matmul(B, A):
            break
    AB, BA = _matmul(A, B), _matmul(B, A)
    N1, N2 = [[1, 0], [0, 0]], [[0, 0], [0, 1]]
    cands = [
        S(f'$AB = {mat(AB)}$', True, {'kind': 'matmul', 'A': A, 'B': B, 'claimed': AB}),
        S(f'$BA = {mat(AB)}$', False, {'kind': 'matmul', 'A': B, 'B': A, 'claimed': AB}),
        S('$A$ y $B$ conmutan.', False, {'kind': 'commute', 'A': A, 'B': B, 'claimed': True}),
        S(f'Con $M = {mat(N1)}$ y $N = {mat(N2)}$ (ambas no nulas) se cumple $MN = 0$.', True,
          {'kind': 'matmul', 'A': N1, 'B': N2, 'claimed': [[0, 0], [0, 0]]}),
    ]
    for text, answer in rng.sample(CONCEPT_BANKS['frodo'], 3):
        cands.append(S(text, answer))
    return Q(9, f'Álgebra no conmutativa: sean $A = {mat(A)}$ y $B = {mat(B)}$. Indicar V o F:', pick(rng, cands))


def u9_conceptos(rng):
    return concept_question(rng, 9, 'frodo', 'FrodoKEM y criptografía poscuántica. Indicar V o F:')


# ---------------------------------------------------------------------------
# Bancos conceptuales (escritos a partir de los PDF de cada unidad)
# ---------------------------------------------------------------------------

CONCEPT_BANKS = {
    'algebra': [
        ('Todo grupo cíclico es abeliano.', True),
        ('Todo grupo abeliano es cíclico.', False),
        ('En un grupo, el elemento neutro es único.', True),
        ('Si $G$ es un grupo finito y $H \\le G$, el orden de $H$ divide al orden de $G$ (Lagrange).', True),
        ('Si $d$ divide al orden de un grupo finito $G$, entonces $G$ tiene necesariamente un elemento de orden $d$.', False),
        ('Todo cuerpo es un dominio de integridad.', True),
        ('Todo dominio de integridad es un cuerpo.', False),
        ('$(\\mathbb{Z}, +, \\cdot)$ es un dominio de integridad pero no es un cuerpo.', True),
        ('$GF(2^8)$ tiene $256$ elementos y es la base aritmética de AES.', True),
        ('Existe un cuerpo finito con $6$ elementos.', False),
        ('La característica de $GF(2^n)$ es $2$.', True),
        ('Un monoide es un semigrupo con elemento neutro.', True),
        ('Todo semigrupo tiene elemento neutro.', False),
        ('Las matrices invertibles $2 \\times 2$ con el producto forman un grupo no abeliano.', True),
        ('En todo anillo, $a \\cdot b = 0$ implica $a = 0$ o $b = 0$.', False),
        ('El núcleo de un homomorfismo de grupos es un subgrupo del dominio.', True),
        ('Un homomorfismo de grupos es inyectivo si y solo si su núcleo tiene un único elemento.', True),
        ('Todo subgrupo de un grupo cíclico es cíclico.', True),
        ('Todo grupo cíclico de orden $n$ es isomorfo a $(\\mathbb{Z}_n, +)$.', True),
        ('Un magma exige que la operación sea asociativa.', False),
    ],
    'ia': [
        ('Un perceptrón simple no puede resolver XOR porque las clases no son linealmente separables.', True),
        ('Un perceptrón simple puede aprender cualquier función booleana de dos entradas.', False),
        ('Sin funciones de activación no lineales, una red de muchas capas equivale a una sola capa lineal.', True),
        ('El dropout apaga neuronas al azar durante el entrenamiento para reducir el sobreajuste.', True),
        ('Early stopping detiene el entrenamiento cuando el error de validación empieza a subir.', True),
        ('La atención de un Transformer es $\\mathrm{softmax}(QK^T/\\sqrt{d})\\,V$.', True),
        ('Los Transformers procesan la secuencia palabra por palabra, igual que una RNN.', False),
        ('Un ejemplo adversarial es una entrada con cambios casi imperceptibles que provoca una clasificación errónea.', True),
        ('El envenenamiento de datos manipula el conjunto de entrenamiento para insertar sesgos o puertas traseras.', True),
        ('Prompt injection es un ataque que modifica los pesos del modelo durante el entrenamiento.', False),
        ('Softmax convierte un vector de puntuaciones en probabilidades que suman $1$.', True),
        ('La función sigmoide tiene rango $(-1, 1)$.', False),
        ('Rosenblatt propuso el perceptrón en 1958.', True),
        ('En descenso del gradiente los pesos se mueven en la dirección del gradiente, para que la pérdida aumente.', False),
        ('Backpropagation calcula $\\partial L/\\partial w$ aplicando la regla de la cadena capa por capa.', True),
        ('Con muchas capas sigmoides el gradiente puede desvanecerse, porque $\\sigma\'(z) \\le 0{,}25$.', True),
        ('ReLU se satura para valores grandes de $z$, igual que la sigmoide.', False),
        ('Un autoencoder entrenado con tráfico normal puede marcar como anomalía el tráfico que reconstruye mal.', True),
        ('La regla de aprendizaje del perceptrón converge aunque los datos no sean linealmente separables.', False),
        ('Con una tasa de aprendizaje demasiado grande, el descenso del gradiente puede diverger.', True),
    ],
    'estadistica': [
        ('El error de Tipo I consiste en rechazar $H_0$ cuando es verdadera.', True),
        ('El error de Tipo II consiste en rechazar $H_0$ cuando es verdadera.', False),
        ('El nivel de significación $\\alpha$ es la probabilidad de cometer un error de Tipo I.', True),
        ('Si $A$ y $B$ son independientes, $P(A \\cap B) = P(A) \\cdot P(B)$.', True),
        ('Dos eventos mutuamente excluyentes con probabilidad positiva son independientes.', False),
        ('$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ para cualesquiera eventos $A$ y $B$.', True),
        ('$P(A \\mid B) = P(B \\mid A)$ para cualesquiera eventos con probabilidad positiva.', False),
        ('La varianza muestral divide por $n - 1$ (corrección de Bessel).', True),
        ('En una distribución normal coinciden la media, la mediana y la moda.', True),
        ('La ley de los grandes números dice que la frecuencia relativa tiende a la probabilidad al repetir el experimento muchas veces.', True),
        ('El estadístico de la prueba $z$ para una media es $z = (\\bar x - \\mu_0)/(\\sigma/\\sqrt n)$.', True),
        ('Con la misma muestra, aumentar el nivel de confianza hace más angosto el intervalo de confianza.', False),
        ('El teorema de Bayes permite calcular $P(A \\mid B)$ a partir de $P(B \\mid A)$, $P(A)$ y $P(B)$.', True),
        ('Por los axiomas de Kolmogorov, una probabilidad puede ser negativa si el evento es muy improbable.', False),
        ('Estandarizar $Z = (X - \\mu)/\\sigma$ transforma una normal $N(\\mu, \\sigma^2)$ en una $N(0, 1)$.', True),
        ('Si $P(A) = 0{,}3$, entonces $P(A^c) = 0{,}3$.', False),
    ],
    'complejidad': [
        ('Se sabe que $P \\subseteq NP$.', True),
        ('NP significa "no polinómico".', False),
        ('SAT (satisfacibilidad proposicional) es un problema NP-completo.', True),
        ('Si un problema NP-completo se resolviera en tiempo polinómico, entonces $P = NP$.', True),
        ('La notación $O(\\cdot)$ da el tiempo exacto de ejecución de un algoritmo.', False),
        ('Un algoritmo $O(n^{100})$ es de tiempo polinómico.', True),
        ('Un algoritmo $O(2^n)$ es de tiempo polinómico.', False),
        ('Todo problema NP-difícil pertenece necesariamente a NP.', False),
        ('La búsqueda binaria tiene complejidad $O(\\log n)$.', True),
        ('Que no se conozca un algoritmo eficiente para un problema demuestra que no existe.', False),
        ('La seguridad de RSA se apoya en la dificultad de factorizar enteros grandes.', True),
        ('En NP están los problemas de decisión cuyas soluciones propuestas se verifican en tiempo polinómico.', True),
    ],
    'informacion': [
        ('Un suceso seguro ($p = 1$) aporta $0$ bits de información.', True),
        ('La entropía es máxima cuando la distribución es uniforme.', True),
        ('Un dado cargado tiene más entropía que un dado equilibrado.', False),
        ('La información mutua $I(X;Y)$ puede ser negativa.', False),
        ('Si $X$ e $Y$ son independientes, $I(X;Y) = 0$.', True),
        ('Si $X$ e $Y$ son independientes, $H(X,Y) = H(X) + H(Y)$.', True),
        ('El primer teorema de Shannon dice que, para el código óptimo, $H(X) \\le \\bar L < H(X) + 1$.', True),
        ('El secreto perfecto de Shannon exige $H(M \\mid C) = H(M)$.', True),
        ('El one-time pad puede tener secreto perfecto usando una clave más corta y menos entrópica que el mensaje.', False),
        ('La teoría de la información de Shannon mide el significado de los mensajes.', False),
        ('Si la tasa de transmisión $R$ es mayor que la capacidad $C$, se puede transmitir con error arbitrariamente pequeño.', False),
        ('Con logaritmo en base 2 la unidad de información es el bit.', True),
    ],
    'grafos': [
        ('El problema del viajante (TSP) busca el circuito hamiltoniano de costo mínimo.', True),
        ('Held-Karp resuelve TSP con programación dinámica en $O(2^n n^2)$.', True),
        ('Se conoce un algoritmo de tiempo polinómico que resuelve TSP en general.', False),
        ('Dijkstra no es adecuado con pesos negativos; en ese caso se usa Bellman-Ford.', True),
        ('En Ford-Fulkerson, el flujo máximo es igual a la capacidad del corte mínimo.', True),
        ('Todo grafo con un circuito euleriano tiene también un circuito hamiltoniano.', False),
        ('Un árbol con $n$ vértices tiene exactamente $n - 1$ aristas.', True),
        ('Entre dos vértices cualesquiera de un árbol existe un único camino.', True),
        ('Dos grafos conexos con el mismo orden y el mismo número de aristas son siempre isomorfos.', False),
        ('El grafo completo de orden $4$ es un subgrafo del grafo completo de orden $5$.', True),
        ('Todo grafo plano puede colorearse con $4$ colores.', True),
        ('El número cromático de un grafo bipartito con al menos una arista es $3$.', False),
        ('La programación dinámica resuelve cada subproblema superpuesto una sola vez y guarda su resultado.', True),
        ('Kruskal agrega, en cada paso, la arista de menor peso que no forme un ciclo.', True),
        ('La matriz de adyacencia de un grafo no dirigido es simétrica.', True),
        ('La suma de los grados de un grafo puede ser un número impar.', False),
    ],
    'frodo': [
        ('Un KEM se compone de tres algoritmos: KeyGen, Encaps y Decaps.', True),
        ('En KeyGen, Alice publica $B = A \\cdot S + E$ y mantiene $S$ en secreto.', True),
        ('Si no hubiera error $E$, recuperar $S$ a partir de $A$ y $B$ sería un problema de álgebra lineal.', True),
        ('La seguridad de FrodoKEM se basa en la dificultad de factorizar enteros grandes.', False),
        ('FrodoKEM es un esquema poscuántico basado en el problema LWE.', True),
        ('Con rechazo implícito (FO-IR), si el texto cifrado fue manipulado, Decaps devuelve una clave de aspecto aleatorio y no un error.', True),
        ('Con rechazo implícito, Alice le avisa a Bob con un mensaje de error cuando el texto cifrado no es válido.', False),
        ('El rechazo explícito puede servirle a un atacante como oráculo de descifrado.', True),
        ('En el ejemplo de juguete con $n = 4$ hay solo $3^8 = 6561$ posibles $S$, por eso no es seguro.', True),
        ('En FrodoKEM real la probabilidad de fallo de descifrado es exactamente cero.', False),
        ('La transformada Fujisaki–Okamoto hace determinista el cifrado derivando la aleatoriedad de $\\mu$.', True),
        ('En Decaps, Alice calcula $M = C + B\' \\cdot S$.', False),
        ('Las entradas de $S$ y $E$ son pequeñas para que el ruido total no impida decodificar.', True),
        ('FrodoKEM-640 usa el módulo $q = 128$.', False),
        ('El término $S\' \\cdot A \\cdot S$ aparece en $C$ y en $B\' \\cdot S$, y se cancela al desencapsular.', True),
        ('El producto de matrices es conmutativo: siempre $A \\cdot B = B \\cdot A$.', False),
    ],
}


BUILDERS = {
    1: [u1_conjuntos, u1_logica, u1_equivalencias, u1_conteo, u1_relaciones],
    2: [u2_modulo, u2_mcd, u2_inverso, u2_euler_fermat, u2_generadores, u2_tcr, u2_primos],
    3: [u3_operacion, u3_zn, u3_hamming, u3_polinomios, u3_conceptos],
    4: [u4_perceptron, u4_activaciones, u4_gradiente, u4_cnn, u4_conceptos],
    5: [u5_determinantes, u5_producto, u5_autovalores, u5_vectores, u5_sistemas, u5_matrices_mod],
    6: [u6_dados, u6_urna, u6_bayes, u6_descriptiva, u6_conceptos],
    7: [u7_entropia, u7_codificacion, u7_canal, u7_complejidad, u7_turing, u7_informacion],
    8: [u8_grados, u8_completos, u8_ponderado, u8_conceptos],
    9: [u9_lwe, u9_encode, u9_no_conmutativa, u9_conceptos],
}


# ---------------------------------------------------------------------------
# Armado de los exámenes y SQL
# ---------------------------------------------------------------------------

def build_exams(with_checks=False):
    exams = []
    for index in range(1, EXAM_COUNT + 1):
        rng = random.Random(f'mat5-final-{index}')
        questions = []
        for unit in range(1, 10):
            builders = BUILDERS[unit][:]
            offset = (index - 1) * QUESTIONS_PER_UNIT[unit]
            rotated = builders[offset % len(builders):] + builders[:offset % len(builders)]
            for builder in rotated[:QUESTIONS_PER_UNIT[unit]]:
                questions.append(builder(rng))
        for number, question in enumerate(questions, start=1):
            question['id'] = f'ma-final-{index:02d}-q{number:02d}'
            question['type'] = 'true_false_statements'
            if not with_checks:
                for statement in question['statements']:
                    statement.pop('check', None)
        ordered = [{'id': q['id'], 'type': q['type'], 'topic': q['topic'], 'prompt': q['prompt'], 'statements': q['statements']}
                   for q in questions]
        exams.append({
            'title': f'{TITLE_PREFIX} {index:02d}',
            'description': ('Simulacro de examen final con contenidos de las unidades 1 a 9: 20 preguntas de 5 afirmaciones '
                            'V/F. Rendilo con tiempo (120 min) o practicá sin límite.'),
            'duration_minutes': DURATION_MINUTES,
            'config': CONFIG,
            'questions': ordered,
        })
    return exams


def _sql_text(value):
    return "'" + value.replace("'", "''") + "'"


def build_sql(exams):
    lines = [
        '-- Finales de práctica de Matemática Aplicada (mat5), generados con',
        '-- tools/finales_matematica/generar.py. Correr en el editor SQL de Supabase',
        '-- DESPUÉS de crear la tabla public.subject_exams (supabase_schema.sql).',
        '-- Es idempotente: borra y vuelve a crear solo estos 10 finales.',
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
            _sql_text('Generador de finales'),
        ]) + ')')
    lines.append(',\n'.join(rows) + ';')
    lines.append('commit;')
    return '\n'.join(lines) + '\n'


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    parser.add_argument('--sql', default=os.path.join(root, 'supabase', 'seed_matematica_aplicada_finales.sql'))
    parser.add_argument('--json', default=None, help='también escribe los exámenes en este archivo JSON')
    args = parser.parse_args()
    exams = build_exams(with_checks=False)
    with open(args.sql, 'w', encoding='utf-8', newline='\n') as fh:
        fh.write(build_sql(exams))
    if args.json:
        with open(args.json, 'w', encoding='utf-8') as fh:
            json.dump(exams, fh, ensure_ascii=False, indent=2)
    total = sum(len(exam['questions']) for exam in exams)
    print(f'{len(exams)} finales, {total} preguntas -> {args.sql}')


if __name__ == '__main__':
    main()
