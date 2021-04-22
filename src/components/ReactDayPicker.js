import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from 'date-fns/format';

export default function ReactDayPicker(props) {
  const [date, setDate] = useState(typeof props.defaultDate !== 'undefined' ? new Date(props.defaultDate * 1000) : new Date());
  const FORMAT = 'MM/dd/yyyy';

  function onChange(date) {
    setDate(date);
    props.onChange(date);
  }

  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }

  return <DayPickerInput formatDate={formatDate} placeholder={`${dateFnsFormat(date,FORMAT)}`} format={FORMAT} inputProps={{readOnly:true}} onDayChange={onChange} />;
}