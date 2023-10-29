import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home (){
    const [decks, setDeck] = useState([]);

    useEffect(() => {
        const loadDecks = async () => {
            const loadedDecks = await listDecks();
            setDeck(loadedDecks);
        }
        loadDecks();
    }, []);

    const handleDelete = async (deckId) => {
        if (window.confirm("Are you sure you want to delete?")){
            await deleteDeck(deckId);
            setDeck(decks.filter((deck) => deck.id !== deckId));
        }
    };

    return (
        <div>
            <Link to="/decks/new" className="btn btn-primary">
                Create Deck
            </Link>
            <h1>Decks</h1>
            {decks.map((deck) => (
                <div key={deck.id}>
                    <h2>{deck.name}</h2>
                    <p>{deck.description}</p>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary">
                        View
                    </Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                        Study
                    </Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(deck.id)}>
                        Delete
                    </button>
                    </div>
            ))}
            
        </div>
    )
}

export default Home;