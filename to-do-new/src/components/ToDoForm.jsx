import { useState } from "react";

const ToDoForm = ({addToDo}) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value || !category) return;
    addToDo(value, category);
    setValue("");
    setCategory("");
  };

  return (
    <div className="to-do-form">
      <h2>Activities</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type an activity..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
        <button type="submit">Add activity</button>
      </form>
    </div>
  );
};

export default ToDoForm;
