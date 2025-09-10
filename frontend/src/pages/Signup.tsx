// src/pages/Signup.tsx
import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/signup', form);
      const { token, user } = res.data;
      login(token, user);
      nav('/');
    } catch (err: any) {
      alert(err.response?.data?.msg || err.message || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Create account</h2>
        <form onSubmit={submit} className="space-y-4">
          <input name="name" value={form.name} onChange={handle} placeholder="Full name" className="w-full p-3 rounded-lg" />
          <input name="email" value={form.email} onChange={handle} placeholder="Email" className="w-full p-3 rounded-lg" />
          <input type="password" name="password" value={form.password} onChange={handle} placeholder="Password" className="w-full p-3 rounded-lg" />
          <select name="role" value={form.role} onChange={handle} className="w-full p-3 rounded-lg">
            <option value="student">Student</option>
            <option value="organizer">Organizer</option>
          </select>
          <button type="submit" className="w-full py-3 bg-pink-400 text-white rounded-lg">Signup</button>
        </form>
      </div>
    </div>
  );
}
