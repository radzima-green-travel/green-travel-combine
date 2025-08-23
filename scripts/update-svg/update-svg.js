const path = require('path');
const fs = require('fs');

const rootDirectory = path.join(
  __dirname,
  '../../src/components/atoms/Icon/icons',
);
const index = {};

const logFail = (...arg) => console.log('\x1b[31m', ...arg, '\n\x1b[0m');

const indexFiles = directoryPath => {
  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {
    const nestedFilePath = `${directoryPath}/${file}`;
    if (fs.statSync(nestedFilePath).isDirectory()) {
      return indexFiles(nestedFilePath);
    }

    if (/.svg$/.test(file)) {
      const filePath = `./${path.relative(rootDirectory, nestedFilePath)}`;
      const name = /(.+).svg/.exec(file)[1];
      if (!index[name]) {
        index[name] = filePath;
      } else {
        let suffix = 1;
        while (suffix) {
          const nextName = name + suffix;
          if (!index[nextName]) {
            logFail(
              `Name dulpication in ${filePath} and ${index[name]}, added suffix ${suffix}`,
            );
            index[nextName] = filePath;
            suffix = null;
          } else {
            suffix += 1;
          }
        }
      }
    }
  });
};

indexFiles(rootDirectory);

const names = Object.keys(index);
fs.writeFileSync(
  `${rootDirectory}/index.ts`,
  `${names
    .map(file => `export {default as ${file}} from '${index[file]}'`)
    .join(';\n')};\n`,
);
