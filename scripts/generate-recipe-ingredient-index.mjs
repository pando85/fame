import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function getRecipeTitle(filename, source) {
  const frontMatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? '';
  const title = frontMatter.match(/^title:\s*(.*?)\s*$/m)?.[1];
  return title ? title.replace(/^(?:"(.*)"|'(.*)')$/, '$1$2') : filename.slice(0, -extname(filename).length);
}

export function extractIngredients(source) {
  const lines = source.split(/\r?\n/);
  const start = lines.findIndex(line => /^##\s+Ingredientes(?:\s.*)?$/i.test(line.trim()));
  if (start < 0) return '';

  const ingredients = [];
  for (const line of lines.slice(start + 1)) {
    if (/^#{1,2}\s+/.test(line)) break;
    ingredients.push(line);
  }
  return ingredients.join('\n').trim();
}

export function buildRecipeIngredientIndex(recipesDirectory) {
  return readdirSync(recipesDirectory)
    .filter(filename => /\.mdx?$/.test(filename))
    .sort()
    .map(filename => {
      const source = readFileSync(join(recipesDirectory, filename), 'utf8');
      const ingredients = extractIngredients(source);
      if (!ingredients) throw new Error('Missing ingredient section in ' + filename);
      return { title: getRecipeTitle(filename, source), ingredients };
    });
}

export function generateRecipeIngredientIndex(projectRoot = root) {
  const index = buildRecipeIngredientIndex(join(projectRoot, 'recetas'));
  const output = join(projectRoot, 'src', 'generated', 'recipe-ingredients.json');
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, JSON.stringify(index, null, 2) + '\n');
  return index.length;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log('Indexed ingredients from ' + generateRecipeIngredientIndex() + ' recipes.');
}
