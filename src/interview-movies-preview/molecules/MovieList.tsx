import { type CSSProperties, type FC } from 'react';
import MovieItem, { type MovieItemProps } from '../atoms/MovieItem';

const movieListStyles: CSSProperties = {
  backgroundColor: '#ececec',
  height: '100%',
  paddingTop: '1em',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

type MovieListProps = {
  movieItemList: Omit<MovieItemProps, 'onItemClicked'>[];
  selectedMovieId: string;
  onMovieClick?: (id: string) => void;
};

const MovieList: FC<MovieListProps> = ({
  movieItemList,
  selectedMovieId,
  onMovieClick,
}) => {
  return (
    <div style={movieListStyles}>
      {movieItemList.map(({ id, title }) => {
        return (
          <MovieItem
            key={id}
            id={id}
            title={title}
            selected={id === selectedMovieId}
            onSelect={() => onMovieClick?.(id)}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
