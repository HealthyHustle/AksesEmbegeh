const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

const repoDir = process.cwd();
const remoteUrl = 'https://github.com/HealthyHustle/MindBridgeGlobal12.git';

async function getAllFiles(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const relativePath = path.join(base, entry.name).replace(/\\/g, '/');
    
    // Ignore node_modules, .git, dist, .env
    if (
      entry.name === 'node_modules' ||
      entry.name === '.git' ||
      entry.name === 'dist' ||
      entry.name === '.env' ||
      entry.name === '.agents' ||
      entry.name.startsWith('.env.')
    ) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await getAllFiles(fullPath, relativePath);
      files = files.concat(subFiles);
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

async function run() {
  console.log('📦 Step 1: Initializing git repository...');
  await git.init({ fs, dir: repoDir, defaultBranch: 'main' });

  console.log('📂 Step 2: Collecting files...');
  const files = await getAllFiles(repoDir);
  console.log(`Found ${files.length} project files to stage.`);

  console.log('➕ Step 3: Staging files...');
  for (const file of files) {
    await git.add({ fs, dir: repoDir, filepath: file });
  }

  console.log('💾 Step 4: Creating commit...');
  const sha = await git.commit({
    fs,
    dir: repoDir,
    message: 'Initial release: Mind Bridge Global EdTech Platform with Socratic AI & Live Thematic Chat Rooms',
    author: {
      name: 'Faisal (Mind Bridge Global)',
      email: 'faisal.edukasi@gmail.com'
    }
  });
  console.log('Commit created with SHA:', sha);

  console.log('🔗 Step 5: Setting remote origin to:', remoteUrl);
  try {
    await git.addRemote({
      fs,
      dir: repoDir,
      remote: 'origin',
      url: remoteUrl,
      force: true
    });
  } catch (err) {
    console.log('Remote note:', err.message);
  }

  console.log('🚀 Step 6: Pushing to branch main...');
  try {
    const pushResult = await git.push({
      fs,
      http,
      dir: repoDir,
      remote: 'origin',
      ref: 'main',
      force: true
    });
    console.log('Push result:', pushResult);
    console.log('✅ Repository successfully pushed to GitHub!');
  } catch (pushErr) {
    console.log('⚠️ Push authentication note:', pushErr.message);
    if (pushErr.data) {
      console.log('Details:', pushErr.data);
    }
  }
}

run().catch(console.error);
