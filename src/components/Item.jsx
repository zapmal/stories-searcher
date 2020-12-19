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
      <li>
        <span>
          <a href={url}>{title} </a>
        </span>
        <span>{author} </span>
        <span>{num_comments} </span>
        <span>{points}</span>
        <span>
          <button onClick={() => onRemoveItem(id)}>Delete</button>
        </span> 
      </li>
    </>
  );
};

export default Item;