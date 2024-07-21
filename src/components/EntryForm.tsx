import React, { useState, useEffect } from 'react';
import './EntryForm.css'

interface EntryFormProps {
    onSubmit: (date: string, distance: number) => void;
    editMode?: { date: string; distance: number } | null;
}

export const EntryForm: React.FC<EntryFormProps> = ({ onSubmit, editMode }) => {
    const [date, setDate] = useState('');
    const [distance, setDistance] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editMode) {
            setDate(editMode.date);
            setDistance(editMode.distance);
        }
    }, [editMode]);

    const formatDatePart = (value: number) => {
        return value.toString().padStart(2, '0');
    };

    // проверка дня от 1 до 31 и месяца от 1 до 12
    const validateDate = (date: string) => {
        const datePattern = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;;
        const match = date.match(datePattern);

        if (!match) {
          return 'Дата должна быть в формате ДД.ММ.ГГГГ';
        }

        const [_, dayStr, monthStr] = match;
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10);
        if (day < 1 || day > 31) {
            return 'День должен быть в диапазоне от 01 до 31';
        }
        if (month < 1 || month > 12) {
            return 'Месяц должен быть в диапазоне от 01 до 12';
        }
        return '';
    };

    // проверка расстояния > 0
    const validateDistance = (distance: number) => {
        if (distance < 0) {
            return 'Пройденное расстояние не может быть меньше 0';
        }
        return '';
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const dateError = validateDate(date);
        const distanceError = validateDistance(distance);
        if (dateError || distanceError) {
            setError(dateError || distanceError);
            return;
        }
        setError('');
        onSubmit(date, distance);
        setDate('');
        setDistance(0);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputDate = event.target.value;
        const parts = inputDate.split('.');
        if (parts.length === 3) {
          const day = formatDatePart(parseInt(parts[0], 10));
          const month = formatDatePart(parseInt(parts[1], 10));
          const year = parts[2];
          setDate(`${day}.${month}.${year}`);
        } else {
          setDate(inputDate);
        }
      };
    
    
    return (
        <form onSubmit={handleSubmit}>
            <div className='trainig'>
                <div className='date'>
                    <label>Дата (ДД.ММ.ГГ):</label>
                    <input 
                        type="text" 
                        value={date} 
                        onChange={handleDateChange} 
                    />
                </div>
                <div className='range'>
                    <label>Пройдено км:</label>
                    <input 
                        type="number"
                        min="0"
                        value={distance} 
                        onChange={(e) => setDistance(parseFloat(e.target.value))} 
                    />
                </div>
                <button className='btn' type="submit">OK</button>
            </div>
            {error && <div className='error-message'>{error}</div>}    
        </form>
    );
};

