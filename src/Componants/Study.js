import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../utils/api";

function Study() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState();
    const [currentCardIndex, setCurrentCardIndex] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const loadDeck = async () => {
            const loadedDeck = await readDeck(deckId);
            setDeck(loadedDeck);
        }
        loadDeck();
    }, [deckId]);

    const cards = deck?.cards || [];

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
            <h1>Study: {deck.name}</h1>
            <div>
                {cards[currentCardIndex] && (
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                        Card {currentCardIndex + 1} of {cards.length}
                        </h5>
                        <p className="card-text">
                        {isFlipped ? cards[currentCardIndex].back : cards[currentCardIndex].front}
                        </p>
                        <button className="btn btn-secondary" onClick={handleFlip}>
                        {isFlipped ? 'Flip Back' : 'Flip'}
                        </button>
                        <button className="btn btn-primary" onClick={handleNext}>
                        Next
                        </button>
                    </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Study;