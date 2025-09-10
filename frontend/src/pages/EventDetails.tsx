// src/pages/EventDetails.tsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [ev, setEv] = useState<any>(null);

  const load = async () => {
    try {
      const res = await api.get(`/api/events/${id}`);
      setEv(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, [id]);

  const handleRegister = async () => {
    try {
      const res = await api.post(`/api/events/${id}/register`);
      alert('Registered — ticket id: ' + res.data.ticketId);
      load();
    } catch (err: any) { alert(err.response?.data?.msg || err.message); }
  };

  const handleUnregister = async () => {
    try {
      await api.post(`/api/events/${id}/unregister`);
      alert('Unregistered');
      load();
    } catch (err: any) { alert(err.response?.data?.msg || err.message); }
  };

  if (!ev) return <div>Loading...</div>;

  const isRegistered = ev.attendees?.some((a: any) => (user && (a._id === user.id || a === user.id || a._id === user?.id)));

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold">{ev.title}</h2>
      <p className="text-sm text-gray-200">{new Date(ev.date).toLocaleString()} • {ev.category}</p>
      <p className="mt-4">{ev.description}</p>
      <div className="mt-6">
        <strong>{ev.attendees?.length || 0}</strong> attending
      </div>
      <div className="mt-4">
        {user ? (
          isRegistered ? (
            <button onClick={handleUnregister} className="px-4 py-2 bg-red-500 text-white rounded">Unregister</button>
          ) : (
            <button onClick={handleRegister} className="px-4 py-2 bg-green-600 text-white rounded">Register</button>
          )
        ) : (
          <div className="text-sm text-gray-300">Please login to register</div>
        )}
      </div>
    </div>
  );
}
