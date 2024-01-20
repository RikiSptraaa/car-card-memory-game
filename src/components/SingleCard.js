import React from 'react'
import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
      <div className='card'>
        <div className={flipped ? "flipped" : ""}> 
          <img width="200px" height="200px" className='front' src={card.src}></img>
          <img onClick={handleClick} width="200px" height="200px" className='back' src="/img/bg.jpg"></img> 
        </div>
      </div>
  )
}
