// Publishes ./dist to the gh-pages branch (GitHub Pages serves it as a static site).
import { execSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const remote = execSync('git remote get-url origin').toString().trim();
const sha = execSync('git rev-parse --short HEAD').toString().trim();
const dir = mkdtempSync(join(tmpdir(), 'gh-pages-'));
const run = (cmd) => execSync(cmd, { cwd: dir, stdio: 'inherit' });

cpSync('dist', dir, { recursive: true });
run('git init -q -b gh-pages');
run('git add -A');
run(`git -c user.name="Timur-alt2008" -c user.email="Timur-alt2008@users.noreply.github.com" commit -qm "Deploy ${sha}"`);
run(`git push -q -f ${remote} gh-pages`);
rmSync(dir, { recursive: true, force: true });
console.log(`Deployed ${sha} to gh-pages`);
