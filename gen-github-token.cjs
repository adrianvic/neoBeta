require('dotenv').config();
const http = require('http');
const { URL } = require('url');
const fetch = require('node-fetch');
const open = (...args) => import('open').then(m => m.default(...args));
const fs = require('fs');
const path = require('path');

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_OAUTH_SCOPES = 'repo,user',
} = process.env;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  console.error('Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env');
  process.exit(1);
}

const PORT = 9876;
const REDIRECT_URI = `http://localhost:${PORT}/`;
const STATE = String(Math.random()).slice(2);

function appendEnv(key, value) {
  const envPath = path.resolve(process.cwd(), '.env');
  const line = `\n${key}=${value}\n`;
  fs.appendFileSync(envPath, line, { encoding: 'utf8' });
  console.log(`${key} appended to .env`);
}

async function exchangeCodeForToken(code) {
  const tokenUrl = 'https://github.com/login/oauth/access_token';
  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      state: STATE,
    }),
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(`Token error: ${data.error_description || data.error}`);
  return data.access_token;
}

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url, `http://localhost:${PORT}`);
    const code = reqUrl.searchParams.get('code');
    const state = reqUrl.searchParams.get('state');

    if (!code || state !== STATE) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid request');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Authorization received. You can close this window.');

    console.log('Received code, exchanging for token...');
    const token = await exchangeCodeForToken(code);
    console.log('Access token received:', token);

    // Append token to .env (BE CAREFUL)
    appendEnv('GITHUB_ACCESS_TOKEN', token);
  } catch (err) {
    console.error('Error handling OAuth callback:', err);
  } finally {
    server.close();
  }
});

server.listen(PORT, async () => {
  const authUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${encodeURIComponent(GITHUB_CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(GITHUB_OAUTH_SCOPES)}` +
    `&state=${encodeURIComponent(STATE)}`;

  console.log('Opening browser for GitHub authorization...');
  await open(authUrl);
  console.log(`Listening for OAuth callback at ${REDIRECT_URI}`);
});
