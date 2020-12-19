import React, { useRef, useEffect } from 'react';

const InputWithLabel = ({ 
  id, 
  value, 
  type='text',
  onInputChange,
  isFocused, 
  children 
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input 
        ref={inputRef}
        type={type}
        id={id} 
        value={value}
        onChange={onInputChange}
       />
      <p>Currently searching: <strong>{value}</strong></p>
    </>
  ); 
};

export default InputWithLabel;