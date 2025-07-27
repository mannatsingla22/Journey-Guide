// src/components/Autocomplete/Autocomplete.js
import React, { useRef } from 'react';
import { Autocomplete as GoogleAutocomplete } from '@react-google-maps/api';

const Autocomplete = ({ onLoad, onPlaceChanged }) => {
  const inputRef = useRef(null);

  return (
    <GoogleAutocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        placeholder="Search..."
        ref={inputRef}
        style={{
          width: '100%',
          height: '40px',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
    </GoogleAutocomplete>
  );
};

export default Autocomplete;
