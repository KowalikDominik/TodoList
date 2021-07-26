import React from "react";

import { TodoList } from "./components/TodoList/TodoList";
import "./App.css";
import { Header } from "./components/Header/Header";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <TodoList />
        Testing App
      </div>
    </div>
  );
};
export default App;
