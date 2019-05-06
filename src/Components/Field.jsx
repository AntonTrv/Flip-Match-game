import React from 'react';
import '../scss/field.scss';
import Tile from './Tile';
// Field for flip-match game 400x400 (4 tiles in a row)
const Field = ({ data, starter, handleClick }) => (
  <div className="field-wrapper">
    <div className="field">
      {data.map((el, i) => <Tile key={i} id={i} handleClick={handleClick} data={el} />)}
    </div>
    <button onClick={starter}>Start</button>
    <div className="timer">
      <h3>Game duration</h3>
      <span id="minutes">00</span>
      <span>:</span>
      <span id="seconds">00</span>
    </div>
  </div>
);

export default Field;
