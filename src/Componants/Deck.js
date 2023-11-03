import React, { useEffect, useState} from "react";
import { readDeck, deleteDeck } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Deck(){
    const { deckId } = useParams();
    const [deck, setDeck] = useState();
    //const [card, setCard] = useState({});
    const history = useHistory();

    useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      async function loadDeck(){
        try{
          const loadedDeck = await readDeck(deckId);
          setDeck(loadedDeck);
          /* setCard(loadedDeck.card[0]) why did I need to add this if it does nothing*/
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

    const handleDelete = async () => {
        if(window.confirm("Are you sure you want to delete?")){
            try{
                await deleteDeck(deckId);
                history.push('/');      
            } catch (error){
                console.error('Error deleting deck.', error);
            }
        }       
    };
    

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{deck && deck.name}</li>
                </ol>
            </nav>
            <h4>{deck && deck.name}</h4>
            <p>{deck && deck.description}</p>
            <div>
                <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
                    Edit
                </Link>
                <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
                    Study
                </Link>
                <Link to={`/decks${deckId}/cards/new`} className="btn btn-primary">
                    Add Cards
                </Link>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
            <h2>Cards</h2>
            <ul className="list-group">
                {deck && deck.cards.map((card) => (
                    <li className="list-group-item" key={card.id}>
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">
                        Edit Card
                    </Link>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </li>
                ))} 
            </ul>
        </div>
    );
}

export default Deck;