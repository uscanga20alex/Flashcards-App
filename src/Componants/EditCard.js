import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck, readCard } from '../utils/api';
import Form from './Form';

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({ front: '', back: '', });

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeckAndCards(){
      try{
        const loadedDeck = await readDeck(deckId);
        const loadedCard = await readCard(cardId);
        setDeck(loadedDeck);
        setCard(loadedCard);
      }
      catch (error){
        if(error.name === "Abort Error"){
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
      loadDeckAndCards();
      return() => abortController.abort();
    }, [deckId, cardId]);


  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h4>Edit Card</h4>
        <Form />
    </div>
  );
}

export default EditCard;