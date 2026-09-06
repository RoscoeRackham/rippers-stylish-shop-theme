// PUSH SANITY — cheap repo checks on every push (no test suite in a look-only module).
// 1) module.json parses, id matches, version present; 2) every declared style/esmodule file
// exists on disk, plus the preset and the four register faces; 3) NO third-party (Stylish Shop /
// glitchsmith-lib) code or assets anywhere in the tree — recommends-only is the law.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const fails = [];
const check = (ok, msg) => { console.log(`${ok ? 'ok ' : 'FAIL'}  ${msg}`); if (!ok) fails.push(msg); };
const m = JSON.parse(readFileSync('module.json', 'utf8'));
check(m.id === 'rippers-stylish-shop-theme', `module id ${m.id}`);
check(/^\d+\.\d+\.\d+$/.test(m.version), `version ${m.version}`);
for (const f of [...(m.styles ?? []), ...(m.esmodules ?? []), 'presets/rippers-guild.json', 'LICENSE', 'README.md']) {
	check(existsSync(f), `declared/required file exists: ${f}`);
}
const fonts = readdirSync('fonts').filter((f) => f.endsWith('.woff2'));
check(fonts.length >= 4, `bundled woff2 fonts present (${fonts.length})`);
const deps = (m.relationships?.requires ?? []);
check(deps.length === 0, 'no hard requires — recommends-only relationships');
const walk = (d) => readdirSync(d).flatMap((f) => {
	if (['node_modules', '.git', '.github'].includes(f)) return [];
	const p = join(d, f);
	return statSync(p).isDirectory() ? walk(p) : [p];
});
const thirdParty = walk('.').filter((p) => /(^|\/)(stylish-shop|glitchsmith)/i.test(p)); // our own files carry the rippers- prefix
check(thirdParty.length === 0, `no third-party Stylish Shop / glitchsmith files in tree (${thirdParty.join(', ') || 'clean'})`);
if (fails.length) { console.error(`\nPUSH SANITY FAILED — ${fails.length}`); process.exit(1); }
console.log('\npush sanity: all checks passed');
