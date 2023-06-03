# solitaire
document.addEventListener('DOMContentLoaded', () => {
  const deck = [
    'A♥', '2♥', '3♥', '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥', 'J♥', 'Q♥', 'K♥',
    'A♦', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦', 'J♦', 'Q♦', 'K♦',
    'A♠', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠',
    'A♣', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', 'J♣', 'Q♣', 'K♣'
  ];

  const columns = Array.from(document.querySelectorAll('.column'));
  const foundations = Array.from(document.querySelectorAll('.foundation'));
  const stock = document.querySelector('.stock');
  const waste = document.querySelector('.waste');

  let stockCards = [];
  let wasteCards = [];
  let foundationCards = [[], [], [], []];
  let columnCards = columns.map(() => []);

  function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.textContent = card;
    return cardElement;
  }

  function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  function dealCards() {
    columns.forEach((column, columnIndex) => {
      for (let i = 0; i <= columnIndex; i++) {
        const card = deck.pop();
        const cardElement = createCardElement(card);
        if (i === columnIndex) {
          cardElement.classList.add('face-up');
        } else {
          cardElement.classList.add('face-down');
        }
        column.appendChild(cardElement);
        columnCards[columnIndex].push(cardElement);
      }
    });

    deck.forEach((card, index) => {
      const cardElement = createCardElement(card);
      cardElement.classList.add('face-down');
      stock.appendChild(cardElement);
      stockCards.push(cardElement);
      if (index === deck.length - 1) {
        cardElement.classList.remove('face-down');
        cardElement.classList.add('face-up');
      }
    });
  }

  function moveCard(source, target) {
    const card = source.pop();
    target.push(card);
    const cardElement = source === stockCards ? wasteCards.pop() : source.pop();
    target.appendChild(cardElement);
  }

  function checkMove(source, target) {
    const sourceCard = source[source.length - 1];
    const targetCard = target[target.length - 1];

    if (source === stockCards) {
      return targetCard.value === 'K';
    }

    if (source === wasteCards) {
     
