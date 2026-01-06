import { type FC } from 'react';

export type MovieLabelProps = {
  title: string;
  year: string;
};

const MovieLabel: FC<MovieLabelProps> = ({ title, year }) => {
  return <h3>{`${title} (${year})`}</h3>;
};

export default MovieLabel;
