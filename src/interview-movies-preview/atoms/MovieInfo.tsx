import { type FC } from 'react';

export type MovieInfoProps = {
  label: string;
  value: string;
};

const MovieInfo: FC<MovieInfoProps> = ({ label, value }) => {
  return (
    <div>
      <span>
        <strong>{`${label}: `}</strong>
      </span>
      <span>{value}</span>
    </div>
  );
};

export default MovieInfo;
