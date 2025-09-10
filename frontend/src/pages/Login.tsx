// src/pages/Login.tsx
import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', form);
      const { token, user } = res.data;
      login(token, user);
      nav('/');
    } catch (err: any) {
      alert(err.response?.data?.msg || err.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <input name="email" value={form.email} onChange={handle} placeholder="Email" className="w-full p-3 rounded-lg" />
          <input type="password" name="password" value={form.password} onChange={handle} placeholder="Password" className="w-full p-3 rounded-lg" />
          <button type="submit" className="w-full py-3 bg-yellow-400 font-bold rounded-lg">Login</button>
        </form>
      </div>
    </div>
  );
}
