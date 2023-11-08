import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home (){
    const [decks, setDeck] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck(){
          try{
            const loadedDeck = await listDecks();
            setDeck(loadedDeck);
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
        }, []);

    const handleDelete = async (deckId) => {
        if (window.confirm("Are you sure you want to delete?")){
            await deleteDeck(deckId);
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
                    <p>{deck.cards.length} cards</p>
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
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