import React, {useState, useEffect} from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  // Add the handlesubmit code here
  function handleSubmit(e) {
    e.preventDefault();//prevents the refreshing of page after you click submit

    let todo = document.getElementById('todoAdd').value 
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    // console.log(new Date().getTime())
   
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
    } else {

        alert("Enter Valid Task");
    }
    // console.log(document.getElementById('todoAdd').value)
    console.log("New comparison")
    console.log(todos)//this is an array
  
    document.getElementById('todoAdd').value = ""//this is to reset the field of input
    
  }


  
  // Add the deleteToDo code here
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  
  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {//map will iterate over the array and 
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  
  // Add the submitEdits code here  
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      console.log(todo.id)
      console.log(newtodo.id)
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }



    useEffect(() => {//this is how you load element from local storage
      const json = localStorage.getItem("todos");// this will read the json format which is a string currently
      const loadedTodos = JSON.parse(json);//this will parse the string variable to an array
      if (loadedTodos) {//if there is any file loaded
        setTodos(loadedTodos);//load the contents to variable todos using the hook function
      }
    }, []);

    useEffect(() => {//this is how you save elements in local storage
      if(todos.length > 0) {
          const json = JSON.stringify(todos);//to turn data to storable json content, you must have it saved as a string
          localStorage.setItem("todos", json);//this will store the array in the local storage
      }
    }, [todos]);

return (
<div id="todo-list">
  <h1>Todo List</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id = 'todoAdd'
      />
      <button type="submit">Add Todo</button>
    </form>
    {todos.map((todo) =>(
      <div className="todo" key={todo.id}> 
      <div className="todo-text">
        <input 
          type="checkbox" 
          id="completed" 
          checked={todo.completed} 
          onChange={() => toggleComplete(todo.id)}
        />
        {todo.id === todoEditing ? //this is how you do a conditional rendering statement in react, { condition ?  (A):(B)}
                (<input
                  type="text"
                  id = {todo.id}
                  defaultValue={todo.text}
                />) :
                (<div>{todo.text}</div>)
              }
      </div>

      <div className="todo-actions">
        {todo.id === todoEditing? 
          (<button onClick={() => submitEdits(todo)}>Submit Edits</button>):
          (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>)
        }
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>

      </div>
    </div>))}
</div>
);
};
export default App;
