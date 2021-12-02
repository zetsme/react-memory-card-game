const shuffle = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[r]] = [newArr[r], newArr[i]];
  }
  return newArr;
};

const imageArr = [
  '/dog.svg',
  '/giraffe.svg',
  '/monkey.svg',
  '/owl.svg',
  '/penguin.svg',
  '/seal.svg',
  '/sheep.svg',
  '/turkey.svg',
];
export const shuffleCards = (dispatch) => {
  const cardsArr = shuffle([...imageArr, ...imageArr]).map((card, idx) => ({
    src: card,
    id: idx,
    matched: false,
  }));
  dispatch({ type: 'shuffle', payload: cardsArr });
};
