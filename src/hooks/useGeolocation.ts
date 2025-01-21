import { useState, useCallback, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 0,
    longitude: 0,
  });

  const updateLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setLocation({
            latitude: 0,
            longitude: 0,
          });
        }
      );
    } else {
      setLocation({
        latitude: 0,
        longitude: 0,
      });
    }
  }, []);

  useEffect(() => {
    updateLocation();
  }, [updateLocation]);

  return {
    latitude: location.latitude,
    longitude: location.longitude,
    refreshLocation: updateLocation,
  };
};

export default useGeolocation;
