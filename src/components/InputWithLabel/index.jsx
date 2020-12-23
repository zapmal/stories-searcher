import React, { useRef, useEffect } from 'react';
import { StyledLabel, StyledInput, StyledCurrentSearchTerm } from './styles';

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
      <StyledLabel htmlFor={id}>{children}</StyledLabel>
      &nbsp;
      <StyledInput
        ref={inputRef}
        type={type}
        id={id} 
        value={value}
        onChange={onInputChange}
       />
       {value ? (
        <StyledCurrentSearchTerm>
          Currently searching: <strong>{value}</strong>
        </StyledCurrentSearchTerm>
       ) : (
         <StyledCurrentSearchTerm>
           Start searching!
         </StyledCurrentSearchTerm>
       )}
    </div>
  ); 
};

export default InputWithLabel;