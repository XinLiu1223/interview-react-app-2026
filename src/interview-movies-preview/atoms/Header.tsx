import { type CSSProperties, type FC } from 'react';

export const headerHeight = '60px';

const HeaderStyle: CSSProperties = {
  height: headerHeight,
  backgroundColor: '#20232a',
  color: '#fff',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};

// const Header: React.FC = () => {
const Header: FC = () => {
  return (
    <div className="header" style={HeaderStyle}>
      <h1>{'🎥 Movie Catalogue'}</h1>
    </div>
  );
};

export default Header;
