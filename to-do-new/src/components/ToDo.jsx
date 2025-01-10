import React from "react";

const ToDo = ({toDo, removeToDo, completeToDo}) => {
  return (
    <div className="to-do" style={{ textDecoration: toDo.isCompleted ? "line-through" : "" }}
    >
        <div className="content">
        <p>{toDo.text}</p>
        <p className="category">({toDo.category})</p>
        </div>
        <div>
            <button className="complete" onClick={() => completeToDo(toDo.id)}>Change Complete</button>
            <button className="remove" onClick={() => removeToDo(toDo.id)}>X</button>
            </div>    
    </div>
  )
}

export default ToDo