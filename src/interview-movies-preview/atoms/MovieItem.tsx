import { type CSSProperties, type FC } from 'react';

const movieItemStyle = (selected?: boolean): CSSProperties => {
  return {
    backgroundColor: selected ? '#a9b3c4' : '#ececec',
    fontWeight: selected ? 'bold' : 'normal',
    cursor: 'pointer',
    paddingLeft: '0.75em',
    paddingRight: '0.75em',
    paddingTop: '0.2em',
    paddingBottom: '0.2em',
    color: '##1a1a1a',
  };
};

export type MovieItemProps = {
  id: string;
  title: string;
  selected?: boolean;
  onSelect?: () => void;
};

const MovieItem: FC<MovieItemProps> = ({ title, selected, id, onSelect }) => {
  return (
    <div
      style={movieItemStyle(selected)}
      onClick={() => {
        console.log(id);
        /* 
          remove unnecessary passed in id at bottom atom component 
          because the bottom component only trigger the callback 
          and you can get the pass in id at any upper level compoents 
          as long as the upper component gets the id from props 
        */
        onSelect?.();
      }}
    >
      {title}
    </div>
  );
};

export default MovieItem;
