import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api';

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [newCard, setNewCard] = useState({
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

  const handleChange = (event) => {
    setNewCard({
      ...newCard,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createAdd = await createCard(deckId, newCard);
    history.push(`/decks/${deckId}`);
  };
  

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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Front
          </label>
          <textarea
            type="text"
            className="form-control"
            id="front"
            name="front"
            onChange={handleChange}
            value={newCard.front}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="4"
            onChange={handleChange}
            value={newCard.back}
            required
          />
        </div>
        <Link to="/" className="btn btn-secondary mr-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCard;