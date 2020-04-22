import babel from '@babel/core';
import fs from 'fs';

// const TAG_NAME = 'cc-tile-requests';
const TAG_NAME = 'cc-tile-instances';

async function run () {

  const { ast } = babel.transformFileSync('src/translations/translations.en.js', { ast: true });

  const translationsNode = ast.program.body.find((node) => {
    return node.type === 'ExportNamedDeclaration'
      && node.declaration.type === 'VariableDeclaration'
      && node.declaration.declarations[0].type === 'VariableDeclarator'
      && node.declaration.declarations[0].id.type === 'Identifier'
      && node.declaration.declarations[0].id.name === 'translations';
  });

  const translations = translationsNode.declaration.declarations[0].init.properties;

  const newTranslations = translations.filter((a) => {
    const key = a.key.name || a.key.value;
    return key.startsWith(TAG_NAME + '.');
  });

  translationsNode.declaration.declarations[0].init.properties = newTranslations;

  const foo = babel.transformFromAstSync(ast);
  fs.writeFileSync('src/translations/translations.en.' + TAG_NAME + '.js', foo.code);
}

run()
  .then(console.log)
  .catch(console.error);
