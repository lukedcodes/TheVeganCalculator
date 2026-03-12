const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const classesToRemove = [
    'text-white', 'text-green', 'text-brand-red', 'text-green-light', 'text-muted',
    'text-sm', 'h1-style', 'h2-style', 'hover:text-brand-light', 'text-brand-light'
];

html = html.replace(/class="([^"]+)"/g, (match, p1) => {
    let classes = p1.split(/\s+/);
    classes = classes.filter(c => !classesToRemove.includes(c));
    if (classes.length === 0) return '';
    return 'class="' + classes.join(' ') + '"';
});

// Remove empty class attributes
html = html.replace(/\s*class=""/g, '');

fs.writeFileSync('index.html', html);
console.log('Stripped classes successfully');
