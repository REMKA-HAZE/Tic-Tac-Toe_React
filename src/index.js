import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//El componente Square renderiza un boton

//Cambios se cambio el metodo render {/*TODO */} por this.props.value
//Interaccion con botones mediante funciones <button className="square" onClick={function() { console.log('click'); }}>

  
  //En las clases de JavaScript, necesitas siempre llamar super cuando defines el constructor de una subclase. Todas las clases de componentes de React que tienen un constructor deben empezar con una llamada a super(props)
  function Square(props) {
   return (
      <button
        className="square"
        onClick={() => props.onClick()}
      >
        {props.value}
      </button>
    );
  }


//El componente Board renderiza 9 cuadros
class Board extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext:true
    };
  }

    
  renderSquare(i) {
    //return <Square value={i} />;
    //se agrego el value para pasarle una prop i , se volvio a modificar y quedo asi  return <Square value={this.state.squares[i]} />;
      
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );

}

    render() {
    return (
      <div>
        <div className="board-row">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
      </div>
    );
  }
}


//El componente Game renderiza un table con valores de posición por defecto que modificaremos luego.
class Game extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  handleClick(i) {//Cada vez que el jugador haga un movimiento, xIsNext (un booleano) será invertido para determinar qué jugador sigue y el estado del juego será guardado. Actualizaremos la función handleClick del componente Board para invertir el valor de xIsNext:
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    
    const current = history[history.length - 1];
    const squares = current.squares.slice();
     if (calculateWinner(squares) || squares[i]) {
      return;
    } 
    squares[i] = this.state.xIsNext ? 'X' : 'O';
   
    this.setState({
         history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
    });
    
  }
   jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li  key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
//funcion para declarar el ganador en el array de lines son las lineas que se pueden trazar en la matriz
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}