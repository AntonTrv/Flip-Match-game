import React from 'react';
import '../scss/tile.scss';
// a tile for a flip-match game
const Tile = ({ data, handleClick, id }) => (
  <div id={id} className={'flipped' ? `flip-tile flipped ${data}` : 'flip-tile'} onClick={handleClick} />
);

export default Tile;

// <div className={`tile ${data}`} />;
