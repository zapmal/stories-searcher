import StyledButton from './styles';

const Button = ({
  padding,
  type,
  disabled = false,
  onClickEvent = (param) => {},
  eventParam = null,
  active,
  children
}) => {
  return (
    <StyledButton 
      padding={padding}
      type={type}
      disabled={disabled}
      active={active}
      onClick={() => onClickEvent(eventParam)}
    >
      {children}
    </StyledButton>
  );
};

export default Button;