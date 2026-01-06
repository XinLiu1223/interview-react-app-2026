import { type CSSProperties, type FC } from 'react';
import MovieInfo from '../atoms/MovieInfo';
import MovieLabel from '../atoms/MovieLabel';
import MoviePoster from '../atoms/MoviePoster';

const moviePreviewStyle: CSSProperties = {
  padding: '0.75em',
  paddingTop: '1em',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

export type MoviePreviewProps = {
  movieTitle: string;
  posterUrl: string;
  releaseYear: string;
  director: string;
  casts: string;
  genre: string;
};

const MoviePreview: FC<MoviePreviewProps> = ({
  movieTitle,
  posterUrl,
  releaseYear,
  director,
  casts,
  genre,
}) => {
  return (
    <div style={moviePreviewStyle}>
      <MoviePoster movieTitle={movieTitle} posterUrl={posterUrl} />
      <MovieLabel title={movieTitle} year={releaseYear} />
      <MovieInfo label={'Director'} value={director} />
      <MovieInfo label={'Casts'} value={casts} />
      <MovieInfo label={'Genre'} value={genre} />
    </div>
  );
};

export default MoviePreview;
