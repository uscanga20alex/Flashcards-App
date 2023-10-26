import React from "react";
import { Switch, Route  } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import AddDeck from "./Componants/AddDeck";
import CreateDeck from "./Componants/CreateDeck";
import Deck from "./Componants/Deck";
import EditCard from "./Componants/EditCard";
import EditDeck from "./Componants/EditDeck";
import Home from "./Componants/Home";
import Study from "./Componants/Study";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Layout />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route exact path="/decks/new">
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId">
          <Deck />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddDeck />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
      </Switch>
    </div>
  );
}

export default App; //
