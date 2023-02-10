import { useState, useEffect } from 'react';

const defaultSettings = {
  enableHighAccuracy: true,
  timeout: Infinity,
  maximumAge: 0,
};

export const usePosition = (watch = false) => {
  const [position, setPosition] = useState();
  const [rest, setRest] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords, timestamp }) => {
    const newPosition = { lat: coords.latitude, lng: coords.longitude };
    setRest({
      accuracy: coords.accuracy,
      timestamp,
    });
    setPosition(newPosition);
  };

  const onError = err => {
    if (err) {
      const message =
        'Đã có lỗi xảy ra!. Không có quyền truy cập vị trí hoặc trình duyệt không hỗ trợ.';
      setError(message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const geo = navigator.geolocation;
      let watcher = null;
      if (geo) {
        if (watch) {
          watcher = geo.watchPosition(onChange, onError, defaultSettings);
        } else {
          geo.getCurrentPosition(onChange, onError, defaultSettings);
        }
      } else {
        setError('Geolocation is not supported');
      }

      return () => geo && watcher && geo.clearWatch(watcher);
    }, 1000);
  }, []);

  return { position, ...rest, error };
};
