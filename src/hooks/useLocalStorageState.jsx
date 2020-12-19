import { useEffect, useState } from 'react';

const useLocalStorageState = (key, initialState = '')=> {
  const [value, setValue] = useState(() => (
    localStorage.getItem(key) || initialState 
  ));

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorageState;