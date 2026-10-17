/**
 * Fixed, synthetic search corpus.
 *
 * Never import from ../../recetas or generate this fixture from the live recipe
 * collection. These tests protect search semantics, not a particular menu.
 * Changing, adding or deleting production recipes must not affect them.
 */
const samples = [
  { title: 'Albóndigas', ingredients: ['800 g de tomate triturado', 'Carne picada'], tags: ['plato principal', 'carne'] },
  { title: 'Arroz meloso', ingredients: ['2 contramuslos de pollo', '200 g de arroz', 'Cebolla'], tags: ['plato principal', 'arroz'] },
  { title: 'Risotto', ingredients: ['Arroz para risotto', 'Caldo de pollo'], tags: ['plato principal', 'arroz'] },
  { title: 'Pollo asado y noodles', ingredients: ['Pollo', 'Pasta de miso', '400 g de champiñones'], tags: ['plato principal'] },
  { title: 'Pollo tikka masala', ingredients: ['Pollo', 'Tomate triturado'], tags: ['plato principal'] },
  { title: 'Rodaballo salvaje al horno', ingredients: ['Aceite', 'Sal'], tags: ['pescado'] },
  { title: 'Lasaña', ingredients: ['Tomate triturado', 'Queso parmesano'], tags: ['plato principal'] },
  { title: 'Caldo de verduras', ingredients: ['2 tomates', 'Zanahorias'], tags: ['entrante'] },
  { title: 'Flan de huevo', ingredients: ['4 huevos', 'Leche'], tags: ['postre'] },
  { title: 'Crepes dulces', ingredients: ['1 huevo', 'Leche'], tags: ['desayuno'] },
  { title: 'Cookies de chocolate', ingredients: ['Chocolate', 'Harina'], tags: ['postre'] },
  { title: 'Bizcocho de plátano y dátiles', ingredients: ['Plátano', 'Huevos'], tags: ['postre'] },
  { title: 'Crème brûlée', ingredients: ['Yemas de huevo', 'Nata'], tags: ['postre'] },
  { title: 'Tortilla de patata', ingredients: ['Patatas', 'Huevos'], tags: ['plato principal'] },
  { title: 'Pizza', ingredients: ['Harina', 'Masa madre'], tags: ['pan'] },
  { title: 'Chapata y focaccia', ingredients: ['Harina', 'Masa madre'], tags: ['pan'] },
  { title: 'Muesli -o granola- casero 1.0', ingredients: ['Copos de avena'], tags: ['desayuno'] },
  { title: 'Crema de calabacín', ingredients: ['Calabacín', 'Sal'], tags: ['entrante'] },
  { title: 'Hummus sin tahini', ingredients: ['Garbanzos', 'Limón'], tags: ['entrante'] },
  { title: 'Cocido', ingredients: ['Garbanzos'], tags: ['plato principal'] },
  { title: 'Falafel', ingredients: ['Garbanzos'], tags: ['entrante'] },
  { title: 'Shoyu ramen', ingredients: ['Muslos de pollo'], tags: ['plato principal'] },
];

export const ingredientIndex = samples.map(({ title, ingredients }) => ({
  title,
  ingredients: ingredients.map(value => '- ' + value).join('\n'),
}));

export const recipes = samples.map(({ title, tags }) => ({
  content: {
    metadata: {
      title,
      permalink: '/' + encodeURIComponent(title),
      frontMatter: { tags },
    },
  },
}));
