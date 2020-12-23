import { ReactComponent as Tick } from '../../img/tick.svg';
import Button from '../Button';
import { StyledColumn, StyledItem } from './styles';

const Item = ({ 
  id,
  title,
  url,
  author,
  num_comments,
  points,
  onRemoveItem
}) => {
  return (
    <StyledItem>
      <StyledColumn width='40%'>
        <a href={url}>{title} </a>
      </StyledColumn>
      <StyledColumn width='20%'>{author}</StyledColumn>
      <StyledColumn width='10%'>{num_comments}</StyledColumn>
      <StyledColumn width='10%'>{points}</StyledColumn>
      
      <StyledColumn width='10%'>
        <Button 
          padding ='5px' 
          type='button'
          onClickEvent={onRemoveItem}
          eventParam={id}
        >
         <Tick height='18px' width='18px' fill='#ffffff'/>
        </Button>
      </StyledColumn>
    </StyledItem>
  );
};

export default Item;