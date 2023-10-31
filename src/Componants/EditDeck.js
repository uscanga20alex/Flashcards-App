import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function loadDeck(){
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
      loadDeck();
      return() => abortController.abort();
    }, [deckId]);

  const handleChange = (event) => {
    setDeck({
      ...deck,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    history.push(`/decks/${deckId}`);
  };

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
            Edit Deck
          </li>
        </ol>
      </nav>
      <h4>Edit Deck</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            value={deck.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            onChange={handleChange}
            value={deck.description}
            required
          />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
