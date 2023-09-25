import React from "react";
import "./App.css";
import { Feed } from "./components/Feed";
import { SearchAndFilter } from "./components/SearchAndFilter";

function App() {
  return (
    <div className="App">
      <div className="flex">
        <a href="https://marsbarnes.github.io/Portfolio/" className="links">
          To Mars' Portfolio
        </a>
        <a href="https://github.com/MarsBarnes/RedditClient" className="links">
          To GitHub Repository
        </a>
      </div>
      <SearchAndFilter />
      <Feed />
    </div>
  );
}

export default App;