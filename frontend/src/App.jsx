import { useEffect, useState } from 'react';
import Login from './Login.jsx';
import { api, getToken, clearToken } from './api.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(!!getToken());

  // Restore the session if a valid token is already stored
  useEffect(() => {
    if (!getToken()) return;
    api('/me')
      .then(setUser)
      .catch(() => clearToken())
      .finally(() => setChecking(false));
  }, []);

  function logout() {
    clearToken();
    setUser(null);
  }

  if (checking) return <main className="auth"><p>Loading…</p></main>;
  if (!user) return <Login onSuccess={setUser} />;

  return (
    <main className="auth">
      <div className="auth-card">
        <h1>Signed in</h1>
        <p>You are signed in as <strong>{user.email}</strong>.</p>
        <button onClick={logout}>Sign out</button>
      </div>
    </main>
  );
}
