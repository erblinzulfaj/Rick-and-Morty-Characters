import React from "react";
import CharacterList from "./pages/CharacterList";
import Footer from "./components/Footer";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Rick and Morty Characters</h1>
      <CharacterList />
      <Footer />
    </div>
  );
};

export default App;
