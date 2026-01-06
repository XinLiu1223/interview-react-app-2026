import { type FC } from 'react';
import './styles.css';

import Header from './atoms/Header';
import MovieCatalogue from './organisms/MovieCatalogue';
import data from './static/movie-data.json';

const App: FC = () => {
  // const App: React.FC = () => {
  // const App: FC<{}> = () => {
  return (
    <div className="App">
      <Header />
      <MovieCatalogue movieListData={data} />
    </div>
  );
};

export default App;
