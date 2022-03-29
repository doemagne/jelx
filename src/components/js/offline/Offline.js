import React from 'react';
import Main from "./Main";
import "./Offline.module.css";

function Offline() {
  return (
    <div className="App">
      <header>
        <div>
          <h1>React Dexie</h1>
          <p>Powered by React Hooks and Dexiejs</p>
       </div>
      </header>
      <main>
        <Main/>
      </main>
    </div>
  );
}

export default Offline;
