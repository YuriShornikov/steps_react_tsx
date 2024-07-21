import React from 'react';

interface Entry {
    date: string;
    distance: number;
}

interface EntryListProps {
    entries: Entry[];
    onDelete: (date: string) => void;
    onEdit: (entry: Entry) => void;
}

export const EntryList: React.FC<EntryListProps> = ({ entries, onDelete, onEdit }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Дата (ДД.ММ.ГГ)</th>
                    <th>Пройдено км</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry) => (
                    <tr key={entry.date}>
                        <td>{entry.date}</td>
                        <td>{entry.distance}</td>
                        <td>
                            <button onClick={() => onEdit(entry)}>✎</button>
                            <button onClick={() => onDelete(entry.date)}>✘</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

