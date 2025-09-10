// src/pages/EventList.tsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

type EventItem = {
  _id: string;
  title: string;
  description?: string;
  date: string;
  category?: string;
  attendees?: string[] | any[];
};

export default function EventList() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');

  const fetchEvents = async () => {
    try {
      const res = await api.get('/api/events', { params: { q, category, upcoming: 'true' } });
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 mb-4">
          <input placeholder="Search events" value={q} onChange={e => setQ(e.target.value)} className="p-2 rounded flex-1" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 rounded">
            <option value="">All</option>
            <option value="tech">tech</option>
            <option value="cultural">cultural</option>
            <option value="sports">sports</option>
          </select>
          <button onClick={fetchEvents} className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
        </div>

        <div className="grid gap-4">
          {events.map(ev => (
            <div key={ev._id} className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{ev.title}</h3>
              <p className="text-sm">{new Date(ev.date).toLocaleString()}</p>
              <p className="mt-2">{ev.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <Link to={`/events/${ev._id}`} className="text-yellow-300 font-semibold">View</Link>
                <div>{(ev.attendees?.length || 0)} attending</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
