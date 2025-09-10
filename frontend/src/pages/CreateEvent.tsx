// src/pages/CreateEvent.tsx
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
  const [form, setForm] = useState({ title: '', description: '', date: '', category: 'tech', location: '' });
  const nav = useNavigate();

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/events', form);
      alert('Event created');
      nav('/');
    } catch (err: any) {
      alert(err.response?.data?.msg || err.message || 'Create event failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Create Event</h2>
        <form onSubmit={submit} className="space-y-4">
          <input name="title" value={form.title} onChange={handle} placeholder="Title" className="w-full p-3 rounded-lg" />
          <textarea name="description" value={form.description} onChange={handle} placeholder="Description" className="w-full p-3 rounded-lg" />
          <input name="date" type="datetime-local" value={form.date} onChange={handle} className="w-full p-3 rounded-lg" />
          <input name="location" value={form.location} onChange={handle} placeholder="Location" className="w-full p-3 rounded-lg" />
          <select name="category" value={form.category} onChange={handle} className="w-full p-3 rounded-lg">
            <option value="tech">tech</option>
            <option value="cultural">cultural</option>
            <option value="sports">sports</option>
          </select>
          <button className="w-full py-3 bg-green-500 text-white rounded-lg">Create</button>
        </form>
      </div>
    </div>
  );
}
