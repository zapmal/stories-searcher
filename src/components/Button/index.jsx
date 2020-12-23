import StyledButton from './styles';

const Button = ({
  padding,
  type,
  disabled = false,
  onClickEvent = (param) => {},
  eventParam = null,
  children
}) => {
  return (
    <StyledButton 
      padding={padding}
      type={type}
      disabled={disabled}
      onClick={() => onClickEvent(eventParam)}
    >
      {children}
    </StyledButton>
  );
};

export default Button;