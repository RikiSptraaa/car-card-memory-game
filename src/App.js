import { useEffect, useState } from 'react';
import './App.css';
import './components/SingleCard'
import SingleCard from './components/SingleCard';

const cardImages = [
  {src: "/img/car-1.jpeg", match: false},
  {src: "/img/car-2.jpeg", match: false},
  {src: "/img/car-3.jpeg", match: false},
  {src: "/img/car-4.jpeg", match: false},
  {src: "/img/car-5.jpeg", match: false},
  {src: "/img/car-6.jpeg", match: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  // shuffle card
  const shuffleCard = () => {
    const shuffledCard = [...cardImages, ...cardImages]
          .sort(() => Math.random() - 0.5)
          .map((card) => ({...card, id: Math.random()}))

    setCards(shuffledCard);
    setTurns(0)
    resetTurn( )
  }

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare choice 
  const compareChoice = () => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.id === choiceTwo.id) {
        console.log("cant select same card");
        console.log(turns);
      }
      else if (choiceOne.src == choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src == choiceOne.src) {
              return {...card, match: true}    
            }else{
              return card
            }

          })
        })
        resetTurn()
        console.log(turns);
        
      }else{
        console.log('Wrong')
        setTurns(turns)
        setTimeout(() => resetTurn(), 1000)
        console.log(turns);
      }
    } 
  }
  
  // reset turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false) 
  }

  useEffect(() => {
    compareChoice()
  }, [choiceOne, choiceTwo])


  console.log(cards);

  return (
    <div className="App">
      <h1>Car Memory Game</h1>
      <button onClick={() => shuffleCard()}>New Game</button>

      <h3>Turns: {turns}</h3>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            handleChoice={handleChoice} 
            flipped={ card === choiceOne || card === choiceTwo || card.match} 
            card={card}
            disabled={disabled}> 
          </SingleCard>
        ))}
      </div>
    </div>
  );
}

export default App;
