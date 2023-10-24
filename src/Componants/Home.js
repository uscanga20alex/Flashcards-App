import { useEffect, useParams, useRouteMatch, useState } from "react";
import React from "react";
import { Link, Route } from "react-router-dom";

function Home (){
    const [deck, setDeck] = useState();

    useEffect(() => {
        async function loadDecks () => {
            try {
              const decks = await fetch;
            setDeck(loadDecks);  //
            }
            
        }
        loadDecks;
    }, []);

    handleDelete = async (deckId) => {
        if (window.confirm("Are you sure you want to delete?")){
            await deleteDeck(deckId);
            setDeck(decks.filte((desk) => desk.id !== deskId));
        }
    };

    return (
        <div>
            <h1>Decks</h1>
            {desks.map((deck) => (
                <div key={deck.id}>
                    <h2>{deck.name}</h2>
                    <p>{desk.description}</p>
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