import { flyTo, removePolygon } from './';

require('isomorphic-fetch');


export const storeAllLocations = (locations) => {
  return {
    type: 'STORE_LOCATIONS',
    data: locations.locations,
  };
};

export const saveLocation = (location) => {
  return {
    type: 'SAVE_LOCATION',
    data: location,
  };
};

export const removeLocation = (location) => {
  return {
    type: 'REMOVE_LOCATION',
    data: location,
  };
};

export const fetchAllLocations = () => {
  return (dispatch) => {
    return fetch('/locations', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(locations => locations.json())
      .then(json => dispatch(storeAllLocations(json)))
      .catch(error => console.error(error));
  };
};

export const postLocation = (location) => {
  return (dispatch) => {
    return fetch('/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(location),
    })
      .then(response => response.json())
      .then((json) => {
        dispatch(saveLocation(json));
        dispatch(flyTo(json));
      })
      .catch(error => console.error(error));
  };
};

export const deleteLocation = (location) => {
  return (dispatch) => {
    return fetch(`/locations/${location._id}`, {
      method: 'DELETE',
    })
      .then(() => {
        dispatch(removeLocation(location));
        dispatch(removePolygon([
          location.lat,
          location.lng,
        ]));
      })
      .catch(error => console.error(error));
  };
};
