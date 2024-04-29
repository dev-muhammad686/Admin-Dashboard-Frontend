import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { format, parse, isValid } from "date-fns";

function DateRangeComponent({ handleDateAccept }) {
  const inputRef = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (date) => {
    if (!startDate || endDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date >= startDate) {
        setEndDate(date);
        setIsOpen(false);
        handleDateAccept([startDate, date]); // Call handleDateAccept with the selected dates
      } else {
        setEndDate(startDate);
        setStartDate(date);
      }
    }
  };

  const handleInputChange = (e) => {
    const [startStr, endStr] = e.target.value.split(" - ");
    if (startStr && endStr) {
      const start = parse(startStr, "MMM dd,yyyy", new Date());
      const end = parse(endStr, "MMM dd,yyyy", new Date());
      if (isValid(start) && isValid(end)) {
        setStartDate(start);
        setEndDate(end);
        setIsOpen(false);
      } else {
        console.error("Invalid date format. Please use MMM DD,YYYY");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    width: "300px",
    display: "inline-block",
    position: "relative",
  };

  const iconStyle = {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  };

  const datePickerStyle = {
    position: "absolute",
    zIndex: "1000",
    border: "none", // Add this line to remove the border
  };

  const handleClickInsideDatePicker = (e) => {
    e.stopPropagation();
  };

  return (
    <div style={inputStyle} onClick={toggleOpen}>
      <input
        type="text"
        style={inputStyle}
        placeholder="MM DD,YYYY - MM DD,YYYY"
        value={
          startDate && endDate
            ? `${format(startDate, "MMM dd,yyyy")} - ${format(
                endDate,
                "MMM dd,yyyy"
              )}`
            : ""
        }
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Add key down event handler
        ref={inputRef}
      />
      <FaCalendarAlt style={iconStyle} />
      {isOpen && (
        <div
          style={datePickerStyle}
          ref={datePickerRef}
          onClick={handleClickInsideDatePicker}
        >
          <DatePicker
            selected={startDate}
            onSelect={handleSelect}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
      )}
    </div>
  );
}

export default DateRangeComponent;
