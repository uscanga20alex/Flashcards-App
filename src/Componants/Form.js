
import { Link, useHistory, useParams, useEffect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { readDeck, readCard, updateCard } from '../utils/api';
//a problem is occuring here and I am not sure what it is.

function Form(){
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
    const handleChange = (event) => {
        setCard({
        ...card,
        [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCard = await updateCard({...card, id:cardId});
    history.push(`/decks/${deckId}`);
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label htmlFor="front" className="form-label">
            Front
        </label>
        <textarea
            className="form-control"
            id="front"
            name="front"
            rows="4"
            onChange={handleChange}
            value={card.front}
            required
        />
        </div>
        <div className="mb-3">
        <label htmlFor="back" className="form-label">
            Back
        </label>
        <textarea
            className="form-control"
            id="back"
            name="back"
            rows="4"
            onChange={handleChange}
            value={card.back}
            required
        />
        </div>
        <Link to="/" className="btn btn-secondary mr-2">
        Cancel
        </Link>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
        Done
        </Link>
        <button type="submit" className="btn btn-primary">
        Submit
        </button>
    </form>
    )
    }

    export default Form;