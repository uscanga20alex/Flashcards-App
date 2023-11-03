import React, { useState } from "react";
import { Link ,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createDeck } from "../utils/api";

function CreateDeck(){
    const history = useHistory();
    const [deck, setDeck] = useState({
        name:'',
        description:'',
    });

    const handleChange = (event) => {
        setDeck({
            ...deck,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newDeck = await createDeck(deck);
        history.push(`/decks/${newDeck.id}`);
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                     <Link to="/">Home</Link>   
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
            </nav>
            <h4>Create Deck</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
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
                    <label htmlFor="description" className="form-label">Description</label>
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
                <button type="button" className="btn btn-secondary" onClick={() => history.push('/')}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}

export default CreateDeck;