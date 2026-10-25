const barajar = (a) => [...a].sort(() => Math.random() - 0.5);
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const de = (t) => (t.startsWith('el ') ? 'del ' + t.slice(3) : 'de ' + t);

const adentroAfuera = [
    ['⚽', 'La pelota'], ['🐶', 'El perro'], ['🍎', 'La manzana'],
    ['🧸', 'El oso'], ['🐱', 'El gato'],
].map(([item, n], i) => ({
    texto: `¿${n} está adentro o afuera del cuadro?`,
    escena: { caja: true, item, dentro: i % 2 === 0 },
    opciones: ['Adentro', 'Afuera'],
    correcta: i % 2 === 0 ? 'Adentro' : 'Afuera',
}));

const arribaAbajo = [
    { a: '☁️', na: 'La nube', b: '🏠', nb: 'La casa' },
    { a: '🐦', na: 'El pájaro', b: '🌳', nb: 'El árbol' },
    { a: '🌞', na: 'El sol', b: '🏔️', nb: 'La montaña' },
    { a: '🎈', na: 'El globo', b: '🧒', nb: 'El niño' },
    { a: '✈️', na: 'El avión', b: '🚗', nb: 'El carro' },
].map((d, i) => ({
    texto: `¿${i % 2 === 0 ? d.na : d.nb} está arriba o abajo?`,
    escena: { texto: `${d.a}\n${d.b}` },
    opciones: ['Arriba', 'Abajo'],
    correcta: i % 2 === 0 ? 'Arriba' : 'Abajo',
}));

const encimaDebajo = [
    { a: '🐱', na: 'el gato', b: '🪑', nb: 'la silla'},
    { a: '🍎', na: 'la manzana', b: '🍽️', nb: 'el plato'},
    { a: '🧸', na: 'el oso', b: '🛏️', nb: 'la cama'},
    { a: '🎩', na: 'el sombrero', b: '🧑', nb: 'el señor'},
    { a: '🐸', na: 'la rana', b: '🪷', nb: 'la flor'},
].map((d, i) => ({
    texto: `¿${cap(i % 2 === 0 ? d.na : d.nb)} está encima o debajo ${de(i % 2 === 0 ? d.nb : d.na)}?`,
    escena: { texto: `${d.a}\n${d.b}` },
    opciones: ['Encima', 'Debajo'],
    correcta: i % 2 === 0 ? 'Encima' : 'Debajo',
}));

const cercaLejos = [
    { a: '🐶', na: 'el perro', b: '🦴', nb: 'el hueso'},
    { a: '🐰', na: 'el conejo', b: '🥕', nb: 'la zanahoria'},
    { a: '🐝', na: 'la abeja', b: '🌻', nb: 'la flor'},
    { a: '👧', na: 'la niña', b: '⚽', nb: 'la pelota'},
    { a: '🐱', na: 'el gato', b: '🥛', nb: 'la leche'},
].map((d, i) => ({
    texto: `¿${cap(d.nb)} está cerca o lejos ${de(d.na)}?`,
    escena: { texto: i % 2 === 0 ? `${d.a} ${d.b}` : `${d.a} ⋯⋯⋯⋯⋯ ${d.b}` },
    opciones: ['Cerca', 'Lejos'],
    correcta: i % 2 === 0 ? 'Cerca' : 'Lejos',
}));

const BANCO = {
    'Adentro y Afuera': adentroAfuera,
    'Arriba y Abajo': arribaAbajo,
    'Encima y Debajo': encimaDebajo,
    'Cerca y Lejos': cercaLejos,
};

const FIGURAS = ['Círculo', 'Cuadrado', 'Triángulo', 'Rectángulo'];

const preguntasFiguras = () =>
    barajar([...FIGURAS, ...FIGURAS]).map((nombre) => ({
        texto: `Toca el ${nombre.toLowerCase()}`,
        opciones: barajar(FIGURAS),
        correcta: nombre,
    }));

const azar = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const fmt = (n) => String(Math.round(n * 100) / 100);
const mcd = (a, b) => (b === 0 ? a : mcd(b, a % b));

const mezclarOpciones = (correcta, candidatos) => {
    const malas = [...new Set(candidatos)].filter((c) => c !== correcta);
    return barajar([correcta, ...barajar(malas).slice(0, 3)]);
};

const numOpciones = (r, cands) =>
    mezclarOpciones(fmt(r), cands.map(fmt).filter((c) => Number(c) > 0));

const tablas = () =>
    Array.from({ length: 8 }, () => {
        const a = azar(2, 10);
        const b = azar(2, 10);
        const r = a * b;
        return {
            texto: `¿Cuál es el resultado de ${a} * ${b}?`,
            opciones: numOpciones(r, [r + a, r - a, r + b, r - b, r + 1, r - 1, r + 10]),
            correcta: fmt(r),
        };
    });

const quebrados = () =>
    Array.from({ length: 8 }, () => {
        let q;
        do {
            const d = [2, 3, 4, 5, 6][azar(0, 4)];
            const k = azar(1, 2);
            const d2 = d * k;
            const a = azar(1, d -1);
            const b = azar(1, d2 - 1);
            const n = a * k + b;
            if (n < d2 && mcd(n, d2) === 1) q = { a, d, b, d2, n };
        } while (!q);
        const { a, d, b, d2, n } = q;
        const cands = [
            `${a + b}/${d + d2}`, `${n + 1}/${d2}`, `${n - 1}/${d2}`,
            `${n + 2}/${d2}`, `${a + b}/${d2}`,
        ].filter((c) => !c.startsWith('0/'));
        return {
            texto: `¿Cuál es el resultado de ${a}/${d} + ${b}/${d2}?`,
            opciones: mezclarOpciones(`${n}/${d2}`, cands),
            correcta: `${n}/${d2}`,
        };
    });

const decimales = () =>
    Array.from({ length: 8 }, (_, i) => {
        let x, y;
        if (i < 4) {
            x = azar(11, 59) / 10;
            y = azar(2, 9);
        } else {
            x = azar(2, 9) / 10;
            y = azar(2, 9) / 10;
        }
        const r = x * y;
        return {
            texto: `¿Cuál es el resultado de ${fmt(x)} × ${fmt(y)}?`,
            opciones: numOpciones(r, [r * 10, r / 10, r * 100, r + 1, r - 1, r + 0.1]),
            correcta: fmt(r),
        };
    });

const MATE = {
    'Tablas de Multiplicar': tablas,
    'Suma de Quebrados': quebrados,
    'Multiplicación con Decimales': decimales,
};

export function generarPreguntas(actividad) {
    if (actividad.tema === 'figuras') return preguntasFiguras();
    if (actividad.tema === 'matematicas') return (MATE[actividad.nombre] || tablas)();
    return barajar(BANCO[actividad.nombre] || []);
}
