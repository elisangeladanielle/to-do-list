import { useState, useEffect } from "react";
import "./App.css";
import ToDoForm from "./components/ToDoForm";
import ToDo from "./components/ToDo";
import Search from "./components/Search";
import Filter from "./components/Filter";

function App() {
  const [toDos, setToDos] = useState(() => {
    const savedToDos = localStorage.getItem("toDos");
    return savedToDos ? JSON.parse(savedToDos) : [];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  const addToDo = (text, category) => {
    const newToDo = { text, category, isCompleted: false };

    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToDo),
    })
      .then((res) => res.json())
      .then((data) => {
        setToDos((prevToDos) => [...prevToDos, data]);
      })
      .catch((error) => console.error("Failed to add to do:", error));
  };

  const removeToDo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.id !== id));
      })
      .catch((error) => console.error("Failed to remove to do:", error));
  };

  const completeToDo = (id) => {
    const toDoToComplete = toDos.find((toDo) => toDo.id === id);
    if (!toDoToComplete) return;

    const updatedToDo = {
      ...toDoToComplete,
      isCompleted: !toDoToComplete.isCompleted,
    };

    setToDos((prevToDos) =>
      prevToDos.map((toDo) => (toDo.id === id ? updatedToDo : toDo))
    );
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedToDo),
    }).catch((error) => console.error("Failed to complete to do:", error));
  };

  //  useEffect(() => {
  //    localStorage.setItem("toDos", JSON.stringify(toDos));
  //  }, [toDos]);

  useEffect(() => {
    fetch(`http://localhost:5000/todos?filter=${filter}&sort=${sort}`)
      .then((res) => res.json())
      .then((data) => setToDos(data))
      .catch((error) => console.error("Failed to fetch to dos:", error));
  }, []);

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="app">
      <h1>To Do List</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="to-do-list">
        {toDos
          .filter((toDo) =>
            filter === "All"
              ? true
              : filter === "Completed"
              ? toDo.isCompleted
              : !toDo.isCompleted
          )
          .filter((toDo) =>
            toDo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .map((toDo) => (
            <ToDo
              key={toDo.id}
              toDo={{ ...toDo, text: capitalizeFirstLetter(toDo.text) }}
              removeToDo={removeToDo}
              completeToDo={completeToDo}
            />
          ))}
      </div>
      <ToDoForm addToDo={addToDo} />
    </div>
  );
}

export default App;
