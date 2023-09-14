import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Fetching code here to set our todos
        const response = await fetch("http://localhost:3000/api/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.log("Error occured: " + error);
      }
    };

    fetchData();
  }, []);

  // This function fetches the todos from the backend
  const fetchAndSetTodos = async () => {
    //Fetching code here to set our todos
    const response = await fetch("http://localhost:3000/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  // This function helps to add the todo task to the list of todos
  const handleAddTodoSubmit = async (event) => {
    event.preventDefault();

    if (task == "") {
      throw new Error("Sorry, you can not create empty todo");
    }

    try {
      const response = await fetch("http://localhost:3000/api/todos2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: task,
          is_completed: false,
        }),
      });

      // get response in json
      const data = await response.json();

      // Set the todos after it had been returned
      setTodos((oldTodos) => [...oldTodos, ...data]);
      //console.log(data);
      // setting data
    } catch (error) {
      console.log("Adding to todo error occured: " + error);
    }
  };

  // This function helps to add the todo task to the list of todos
  const handleTodoDelete = async (todoId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todos/delete/${todoId}`,
        {
          method: "DELETE",
        }
      );

      if (response) {
        // Set fetch and set the remaining todos
        fetchAndSetTodos();
      }
    } catch (error) {
      console.log("Adding to todo error occured: " + error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-green-500 font-semibold text-2xl mt-4 mb-3">
          To-do list
        </h1>
        <form onSubmit={handleAddTodoSubmit}>
          <input
            type="text"
            placeholder="Enter todo"
            onChange={(event) => setTask(event.target.value)}
            value={task}
            className="bg-slate-500 text-white font-bold placeholder:text-green-200 border-2 rounded-xl p-2 border-solid border-black"
          />
          <button
            type="submit"
            className="font-bold ml-1 bg-slate-500 rounded-lg p-2 text-white"
          >
            Add
          </button>
        </form>
        <ul className="mt-2">
          {todos.length > 0 ? (
            todos.map((todo, i) => (
              <li key={i} className="m-2 p-2 border border-t-2">
                <input type="checkbox" className="mr-1" />
                Id-{todo.id} {todo.task}
                <button
                  onClick={() => handleTodoDelete(todo.id)}
                  type="button"
                  className="ml-2 font-bold  bg-red-500 rounded-lg p-2 text-white"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <h1>Nothing found yet</h1>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
