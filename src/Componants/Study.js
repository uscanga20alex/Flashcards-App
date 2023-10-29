import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../utils/api";

function Study() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState();
    const [currentCardIndex, setCurrentCardIndex] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [card, setCard] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        async function loadDeck(){
          try{
            const loadedDeck = await fetch (readDeck(deckId), {signal});
            setDeck(loadedDeck);
            setCard(loadedDeck.card)
          }
          catch (error){
            if(error.name === "Abort Error"){
              console.log("Aborted");
            } else {
              throw error;
            }
          }
        }
          loadDeck();
          return() => abortController.abort();
        }, [deckId]);

        let cards;
        if (deck) {
          cards = deck.cards || [];
        } else {
          cards = [];
  }

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (currentCardIndex < cards.length - 1){
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(false);
        } else {
            const restart = window.confirm("Restart the deck?");
            if(restart){
                setCurrentCardIndex(0);
                setIsFlipped(false);
            } else {
                history.push('/');
            }
        }
    };

    if (!deck || cards.length === 0){
        return(
            <div>
                <h1>Not enough cards</h1>
                <Link to="/decks/new" className="btn btn-primary">
                Add Cards
                </Link>
                <Link to="/" className="btn btn-secondary">
                Home
                </Link>
            </div>
        );
    }
    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        { deck.name }
                    </li>
                    <li className="breadcrubm-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <h2>Study: {deck.name}</h2>
                    </div>
                </div>
                {cards.length > 0 ? (
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Card {currentCardIndex + 1} of {cards.length}
                                    </h5>
                                    <p className="card-text">
                                        {isFlipped ? cards[currentCardIndex].back : cards[currentCardIndex].front}
                                    </p>
                                    <button className="btn btn-secondary" onClick={handleFlip}>
                                        {isFlipped ? "Flip Back" : "Flip"}
                                    </button>
                                    <button className="btn btn-primary" onClick={handleNext}>
                                        {currentCardIndex === cards.length - 1 ? "Restart" : "Next"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-12">
                            <p>There are no cards in this deck.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Study;