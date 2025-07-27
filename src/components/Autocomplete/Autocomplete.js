// src/components/Autocomplete/Autocomplete.js
import React, { useEffect, useRef } from 'react';

const Autocomplete = ({ onPlaceChanged, onLoad }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error('Google Maps JavaScript API or Places library not loaded');
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onPlaceChanged(place);
    });

    if (onLoad) onLoad(autocomplete);
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search..."
      style={{ padding: '10px', width: '100%' }}
    />
  );
};

export default Autocomplete;
