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
    <>
      <li className='item'>
        <span style={{ width: '40%' }}>
          <a href={url}>{title} </a>
        </span>
        <span style={{ width: '20%' }}>{author} </span>
        <span style={{ width: '10%' }}>{num_comments} </span>
        <span style={{ width: '10%' }}>{points}</span>
        <span style={{ width: '10%' }}>
          <button 
            type='button' 
            className='button button_small' 
            onClick={() => onRemoveItem(id)}
          >
            Delete
          </button>
        </span> 
      </li>
    </>
  );
};

export default Item;