'use client';

import React, { useState, useEffect } from 'react';
import { classNames } from '@/utils/classNames';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface DatePickerProps {
  id?: string;
  name?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  dateFormat?: string;
  placeholderText?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  name,
  selected,
  onChange,
  dateFormat = 'MM/dd/yyyy',
  placeholderText = 'Select a date',
  className = '',
  required = false,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());

  // Update input value when selected date changes
  useEffect(() => {
    if (selected) {
      setInputValue(formatDate(selected, dateFormat));
    } else {
      setInputValue('');
    }
  }, [selected, dateFormat]);

  // Format date according to dateFormat
  const formatDate = (date: Date, format: string): string => {
    // This is a simple implementation - in a real app, use a library like date-fns
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return format
      .replace('dd', day)
      .replace('MM', month)
      .replace('yyyy', year.toString());
  };

  // Parse date from string
  const parseDate = (dateStr: string): Date | null => {
    // This is a simple implementation - in a real app, use a library like date-fns
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;

    const month = parseInt(parts[0], 10) - 1;
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(month) || isNaN(day) || isNaN(year)) return null;

    const date = new Date(year, month, day);
    return date;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === '') {
      onChange(null);
    } else {
      const date = parseDate(value);
      if (date) {
        onChange(date);
      }
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleDateClick = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Add previous month's days
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`prev-${i}`} className="text-gray-400 p-2"></div>);
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isSelected = selected &&
        date.getDate() === selected.getDate() &&
        date.getMonth() === selected.getMonth() &&
        date.getFullYear() === selected.getFullYear();

      days.push(
        <button
          key={`day-${i}`}
          type="button"
          className={classNames(
            'p-2 text-sm rounded-full hover:bg-gray-100',
            isSelected ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-700'
          )}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-2 w-64">
        <div className="flex justify-between items-center mb-2">
          <button
            type="button"
            className="p-1 hover:bg-gray-100 rounded"
            onClick={() => setCurrentMonth(new Date(year, month - 1))}
          >
            &lt;
          </button>
          <div className="text-sm font-medium">
            {monthNames[month]} {year}
          </div>
          <button
            type="button"
            className="p-1 hover:bg-gray-100 rounded"
            onClick={() => setCurrentMonth(new Date(year, month + 1))}
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-xs font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          id={id}
          name={name}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholderText}
          required={required}
          disabled={disabled}
          className={classNames(
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
            disabled ? 'bg-gray-100 cursor-not-allowed' : '',
            className
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
      {isOpen && renderCalendar()}
    </div>
  );
};
