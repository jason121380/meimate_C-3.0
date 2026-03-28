const fs = require('fs');
const glob = require('glob'); // Not available by default, I'll use native fs approach

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git')) { 
      results = results.concat(walkDir(file));
    } else { 
      if (file.endsWith('.vue')) results.push(file);
    }
  });
  return results;
}

const vueFiles = walkDir('.');

let changedFiles = 0;
vueFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/rose-400/g, 'gmb-orange-500')
    .replace(/rose-500/g, 'gmb-orange-600')
    .replace(/rose-300/g, 'gmb-orange-400')
    .replace(/rose-200/g, 'gmb-orange-200')
    .replace(/rose-50/g, 'gmb-orange-100');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedFiles++;
    console.log('Updated:', file);
  }
});

console.log(`Replaced colors in ${changedFiles} files.`);
