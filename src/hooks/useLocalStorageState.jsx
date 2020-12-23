import { useEffect, useState, useRef } from 'react';

const useLocalStorageState = (key, initialState = '')=> {
  const isRendered = useRef(false);
  const [value, setValue] = useState(() => (
    localStorage.getItem(key) || initialState 
  ));

  useEffect(() => {
    if (!isRendered.current) {
      isRendered.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorageState;