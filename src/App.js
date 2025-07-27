import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api/travelAdvisorAPI';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get user coordinates on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      // // console.log('User Location:', { latitude, longitude });
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  // Filter places based on rating
  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);
    // // console.log('Filtered Places (rating >', rating, '):', filtered);
    setFilteredPlaces(filtered);
  }, [rating]);

  // Fetch data when map bounds or type changes
  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      // // console.log('Fetching places for:', type);
      // console.log('Fetching data with bounds:', bounds, 'and type:', type);

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          // console.log('Fetched data:', data);
          // console.log('Raw Places Data:', data);
          if (Array.isArray(data)) {
            const filtered = data.filter((place) => place.name && place.num_reviews > 0);
            // console.log('Filtered Places:', filtered);
            setPlaces(filtered);
          } else {
            // console.warn('getPlacesData did not return array:', data);
            setPlaces([]);
          }
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [bounds, type]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        // console.log('Autocomplete Location Changed:', { lat, lng });

        setCoords({ lat, lng });
      } else {
        // console.warn('Place or geometry not available:', place);
      }
    } else {
      // console.warn('Autocomplete is not loaded yet.');
    }
  };

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}

          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
