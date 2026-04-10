import func2url from '../../backend/func2url.json'

const URLS = func2url as Record<string, string>

function getToken() {
  return localStorage.getItem('muse_token')
}

function setToken(token: string) {
  localStorage.setItem('muse_token', token)
}

function removeToken() {
  localStorage.removeItem('muse_token')
}

async function request(fn: string, options: RequestInit = {}) {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(URLS[fn], { ...options, headers })
  const data = await res.json()
  return { ok: res.ok, status: res.status, data }
}

export const api = {
  register: (email: string, password: string, name: string) =>
    request('auth-register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email: string, password: string) =>
    request('auth-login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request('auth-me', { method: 'GET' }),

  createTrack: (data: { title?: string; prompt: string; genre?: string; mood?: string }) =>
    request('track-create', { method: 'POST', body: JSON.stringify(data) }),

  listTracks: () => request('track-list', { method: 'GET' }),

  setToken,
  getToken,
  removeToken,
}