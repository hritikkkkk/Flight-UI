import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      className="input-field w-full"
      placeholderText="Select Date"
    />
  );
};

export default DatePicker;
