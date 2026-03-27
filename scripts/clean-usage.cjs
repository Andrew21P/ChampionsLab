const fs = require('fs');
const lines = fs.readFileSync('src/lib/usage-data.ts', 'utf-8').split('\n');
const toRemove = new Set([18,308,310,319,323,354,362,473,670,706,709,713,861]);
const result = [];
let skip = false;
for (let i = 0; i < lines.length; i++) {
  const commentMatch = lines[i].match(/^\s*\/\/ .+\(id: (\d+)\)/);
  if (commentMatch && toRemove.has(Number(commentMatch[1]))) {
    skip = true;
    continue;
  }
  const keyMatch = lines[i].match(/^\s*(\d+): \[/);
  if (keyMatch && toRemove.has(Number(keyMatch[1]))) {
    skip = true;
    continue;
  }
  if (skip) {
    if (lines[i].match(/^\s*\],?\s*$/)) {
      skip = false;
      continue;
    }
    continue;
  }
  result.push(lines[i]);
}
fs.writeFileSync('src/lib/usage-data.ts', result.join('\n'));
console.log('Lines: ' + lines.length + ' -> ' + result.length);
