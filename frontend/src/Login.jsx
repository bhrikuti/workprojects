import { useState } from 'react';
import { api, setToken } from './api.js';

export default function Login({ onSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogin = mode === 'login';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await api(isLogin ? '/login' : '/register', {
        method: 'POST',
        body: { email, password },
      });
      setToken(token);
      onSuccess(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>{isLogin ? 'Sign in' : 'Create account'}</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email" type="email" autoComplete="email" required
          value={email} onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password" type="password" required minLength={8}
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          value={password} onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error" role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}
        </button>

        <p className="switch">
          {isLogin ? 'New here?' : 'Already have an account?'}{' '}
          <button type="button" className="link" onClick={() => { setMode(isLogin ? 'register' : 'login'); setError(''); }}>
            {isLogin ? 'Create an account' : 'Sign in'}
          </button>
        </p>
      </form>
    </main>
  );
}
