import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
/**
 * location
 * includes: pathname, search, hash, state, key
 */
export const useQueryString = () => {
  const location = useLocation();
  const [queryString, setQueryString] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const result = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key of params.keys()) {
      result[key] = params.get(key);
    }
    setQueryString(result);
  }, [location]);

  return { ...location, queryString };
};
