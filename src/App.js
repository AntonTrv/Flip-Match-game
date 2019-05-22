import React from 'react';
import './scss/app.scss';
import Field from './Components/Field';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tiles: [],
      classes: ['teal', 'red', 'navy', 'green', 'silver', 'wheat', 'fuchsia', 'aqua'],
      guesses: [],
      processing: [],
      foundTiles: 0,
      seconds: 0,
      inGame: false,
    };

    this.initGame = this.initGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkResults = this.checkResults.bind(this);
    this.timer = this.timer.bind(this);
    this.pad = this.pad.bind(this);
    this.timeInterval = this.timeInterval.bind(this);
    this.result = this.result.bind(this);
  }

  /*
    initiates game by doubling and shuffling classes array
  */
  initGame() {
    const arr = [];
    this.state.classes.map((el, i) => arr.push(el, el));
    arr.sort(() => Math.random() - 0.5);
    this.setState({ tiles: arr });
    this.timeInterval();
    this.setState({ inGame: true });
  }

  /*
    controls flip of tiles,
    gathers info about tile in the guess array,

  */
  handleClick(e) {
    const guess = e.target;
    guess.classList.contains('flipped')
      ? guess.classList.remove('flipped') : guess.classList.add('flipped');
    this.setState({ guesses: [...this.state.guesses, guess.classList[1], guess.id] });
    this.setState({ processing: [...this.state.processing, guess] });
  }

  /*
  trigger
*/
  componentDidUpdate() {
    if (this.state.guesses.length === 4) {
      this.checkResults();
    }
  }

  /*
  compares two elements and flips back or leaves flipped
*/
  checkResults() {
    const firstId = this.state.guesses[1];
    const secondId = this.state.guesses[3];
    const firstColor = this.state.guesses[0];
    const secondColor = this.state.guesses[2];

    if (firstId === secondId || firstColor !== secondColor) {
      const storageArr = this.state.processing;
      setTimeout(() => storageArr.map(el => el.classList.add('flipped')),
        300);
    } else {
      this.setState({ foundTiles: this.state.foundTiles + 1 });
    }
    this.setState({ guesses: [] });
    this.setState({ processing: [] });
  }

  /*
  timer interface and logic
*/
  timer() {
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    this.setState({ seconds: this.state.seconds + 1 });
    seconds.innerHTML = this.pad(`${this.state.seconds % 60}`);
    minutes.innerHTML = this.pad(parseInt(this.state.seconds / 60));
    if (this.state.foundTiles === 8) {
      clearInterval(this.interval);
      this.result(minutes, seconds);
    }
  }

  /*
  pads a zero to a value if needed
  */
  pad(val) {
    const valString = `${val}`;
    if (valString.length < 2) {
      return `0${valString}`;
    }
    return valString;
  }

  timeInterval() {
    this.interval = window.setInterval(this.timer, 1000);
  }

  /*
  outputs game time
  restores initial state
*/
  result(minutes, seconds) {
    alert(`You won! your time ${minutes.innerHTML}:${seconds.innerHTML}`);
    this.setState({ guesses: [] });
    this.setState({ processing: [] });
    this.setState({ foundTiles: 0 });
    this.setState({ seconds: 0 });
    minutes.innerHTML = '00';
    seconds.innerHTML = '00';
    this.setState({ tiles: [] });
    this.setState({ inGame: false });
  }

  render() {
    return (
      <div className="app">
        <Field data={this.state.tiles} handleClick={this.handleClick} game={this.state.inGame} starter={this.initGame} />
      </div>

    );
  }
}
export default App;
