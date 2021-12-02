import { useEffect, useReducer } from 'react';
import { shuffleCards } from './utils';
import Card from './components/Card';

const initialState = {
  disabled: false,
  firstChoice: null,
  secondChoice: null,
  turns: 0,
  cards: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'shuffle':
      return {
        ...state,
        cards: payload,
      };
    case 'reset':
      return { ...initialState };
    case 'card-click':
      if (state.firstChoice && state.firstChoice !== payload) {
        return { ...state, secondChoice: payload };
      } else {
        return { ...state, firstChoice: payload };
      }
    case 'disable-clicks':
      return { ...state, disabled: true };
    case 'reset-turns':
      return {
        ...state,
        disabled: false,
        firstChoice: null,
        secondChoice: null,
        turns: state.turns + 1,
      };
    case 'check-match':
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.src === state.firstChoice.src ? { ...card, matched: true } : card
        ),
      };

    default:
      return state;
  }
};

const App = () => {
  const [{ cards, disabled, firstChoice, secondChoice, turns }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleChoice = (card) => dispatch({ type: 'card-click', payload: card });

  useEffect(() => {
    if (firstChoice && secondChoice) {
      dispatch({ type: 'disable-clicks' });
      if (firstChoice.src === secondChoice.src) {
        dispatch({ type: 'check-match' });
        dispatch({ type: 'reset-turns' });
      } else {
        setTimeout(() => dispatch({ type: 'reset-turns' }), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    shuffleCards(dispatch);
  }, []);

  return (
    <div className='container'>
      <header className='header'>
        <h1>Memory Card Game</h1>
        <h2>Turns: {turns}</h2>
        <button
          onClick={() => {
            dispatch({ type: 'reset' });
            setTimeout(() => shuffleCards(dispatch), 100);
          }}
          className='start-btn'
        >
          New Game
        </button>
      </header>
      <div className='grid'>
        {cards.map((card) => (
          <Card
            key={card.id}
            flipped={card === firstChoice || card === secondChoice || card.matched}
            handleChoice={handleChoice}
            card={card}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
