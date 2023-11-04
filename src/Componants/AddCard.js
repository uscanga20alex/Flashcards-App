import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api';
import Form from '/From';

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({
    front: '',
    back: '',
  });
  
  useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      async function loadCard(){
        try{
          const loadedDeck = await readDeck(deckId);
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
        loadCard();
        return() => abortController.abort();
      }, [deckId]);

  

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">
          {deck && (
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            )}
          </li>
          <li className='breadcrumb-item active' aria-aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h4>Create Card</h4>
          <Form />
    </div>
  );
}

export default AddCard;