import React, { useEffect, useState} from "react";
import { readDeck, deleteDeck } from "../utils/api";
import { useParams, Link } from "react-router-dom/cjs/react-router-dom.min";

function Deck(){
    const { deckId } = useParams();
    const [deck, setDeck] = useState();

    useEffect(() => {
        const loadDeck = async () => {
            const loadedDeck = await readDeck(deckId);
            setDeck(loadedDeck);
        }
        loadDeck()
    }, [deckId]);

    const handleDelete = async () => {
        if(window.confirm("Are you sure you want to delete?")){
            await deleteDeck(deckId);
        }
    }
    if (!deck){
        return <p>Loading...</p>
    }
    const {name, description, cards} = deck;

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{name}</li>
                </ol>
            </nav>
            <h4>{name}</h4>
            <p>{description}</p>
            <div>
                <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
                    Edit
                </Link>
                <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
                    Study
                </Link>
                <Link to={`/decks/new`} className="btn btn-primary">
                    Add Cards
                </Link>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
            <h2>Cards</h2>
            <ul className="list-group">
                {cards.map((card) => (
                    <li className="list-group-item" key={card.id}>
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">
                        Edit
                    </Link>
                    <button className="btn btn-danger">Delete</button>
                </li>
                ))} 
            </ul>
        </div>
    );
}

export default Deck;