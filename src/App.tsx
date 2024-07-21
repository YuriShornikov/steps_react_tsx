import './App.css'
import React, { useState } from 'react';
import { EntryForm } from './components/EntryForm';
import { EntryList } from './components/EntryList';

interface Entry {
  date: string;
  distance: number;
}

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editMode, setEditMode] = useState<Entry | null>(null);

  const addOrUpdateEntry = (date: string, distance: number) => {
    setEntries((prevEntries) => {
      const entryIndex = prevEntries.findIndex((entry) => entry.date === date);
      if (entryIndex !== -1) {
        const updatedEntries = [...prevEntries];
        updatedEntries[entryIndex].distance += distance;
        return updatedEntries;
      }
      return [...prevEntries, { date, distance }].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  };

  const deleteEntry = (date: string) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.date !== date));
  };

  const editEntry = (entry: Entry) => {
    setEditMode(entry);
  };

  const handleSubmit = (date: string, distance: number) => {
    addOrUpdateEntry(date, distance);
    setEditMode(null);
  };

  return (
    <div className='block'>
      <h1>Тренировки и Прогулки</h1>
      <EntryForm onSubmit={handleSubmit} editMode={editMode} />
      <EntryList entries={entries} onDelete={deleteEntry} onEdit={editEntry} />
    </div>
  );
};

export default App;

