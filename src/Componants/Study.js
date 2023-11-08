import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [currentCardIndex, setCurrentCardIndex] = useState(1);
    const [isFlipped, setIsFlipped] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        async function loadDeck(){
          try{
            const loadedDeck = await readDeck(deckId, signal);
            setDeck(loadedDeck);
            setCards(loadedDeck.cards);
          } catch (error){
            if(error.name === "Abort Error"){
              console.log("Aborted");
            }
          }
        }
          loadDeck();
          return() => abortController.abort();
        }, [deckId]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = (index, total) => {
        if (index < total){
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(false);
        } else {
            const restart = window.confirm("Restart the deck?");
            if(restart){
                setCurrentCardIndex(1);
                setIsFlipped(false);
            } else {
                history.push('/');
            }
        }
    };
  
  function showNextButton(cards, index){
    if (!isFlipped){
      return null;
    }else {
      return ( 
         <button
            onClick={() => handleNext(index + 1, cards.length)}
            className="btn btn-primary mx-1"
          >
                    Next
                </button>
          );
       }
    }

    function notEnoughCards() {
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>
                    You need at least 3 cards to study. There are {cards.length}{" "}
                    cards in this deck.
                </p>
                <Link
                    to={`/decks/${deck.id}/cards/new`}
                    className="btn btn-primary mx-1"
                >
                    Add Cards
                </Link>
            </div>
        );
    }
  
  function enoughCards() {
    return (
      <div className="card">
        {cards.map((card, index) => {
                    if (index === currentCardIndex - 1) {
                        return (
                            <div className="card-body" key={card.id}>
                                <div className="card-title">
                                    {`Card ${index + 1} of ${cards.length}`}
                                </div>
                                <div className="card-text">
                                    {isFlipped ? card.back : card.front}
                                </div>
                                <button onClick={handleFlip} className="btn btn-secondary mx-1">Flip</button>
                                {showNextButton(cards, index)}
                            </div>
                        );
                    }
                })}
      </div>
    );
  }
    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Study</li>
            </ol>
            <div>
                <h2>{`${deck.name}: Study`}</h2>
                <div>
                    {cards.length === 0
                        ? notEnoughCards()
                        : cards.length > 2
                        ? enoughCards()
                        : notEnoughCards()}
                </div>
            </div>
        </div>
  );
}

export default Study;