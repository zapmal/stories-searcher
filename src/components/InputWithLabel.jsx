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
    <div>
      <label htmlFor={id} className='label'>{children}</label>
      &nbsp;
      <input 
        ref={inputRef}
        type={type}
        id={id} 
        value={value}
        onChange={onInputChange}
        className='input'
       />
       {value ? (
        <p className='currently-searching'>
          Currently searching: <strong>{value}</strong>
        </p>
       ) : (
         <p className="currently-searching">
           Start searching!
         </p>
       )}
    </div>
  ); 
};

export default InputWithLabel;