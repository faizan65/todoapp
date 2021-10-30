import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Badge } from "react-bootstrap";


export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  
  function handleEditInputChange(e) {
   
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }

    setTodo("");
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  
  function handleUpdateTodo(id, updatedTodo) {
    
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    
    setIsEditing(false);
   
    setTodos(updatedItem);
  }

  
  function handleEditClick(todo) {
   
    setIsEditing(true);
    
    setCurrentTodo({ ...todo });
  }

  return (
    <>
       <section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">

        <div class="card">
          <div class="card-body p-5">

          {isEditing ? (
                            
                            <form onSubmit={handleEditFormSubmit}>
                              
                              <h2>Edit Todo</h2>
                              
                              
                            
                              <input
                                name="editTodo"
                                type="text"
                                placeholder="Edit todo"
                                value={currentTodo.text}
                                onChange={handleEditInputChange}
                                style = {{ height: "42px", width: "360px", paddingLeft: "10px", fontFamily: "monospace",
                                 borderRadius: "10px", border: "1px solid #dbb13d", marginTop:"5px"}}
                              />
                            
                              <button type="submit" className="btn btn-warning" style = {{marginLeft:"10px", height: "45px", color: "black"}}>Update</button>
                              
                              <button onClick={() => setIsEditing(false)} className="btn btn-warning" style = {{marginLeft:"10px", height: "45px", color: "black"}}>Cancel</button>
                            </form>
                          ) : (
                          
                            <form onSubmit={handleFormSubmit}>
                              
                              <h2 style = {{fontFamily: "monospace"}}>Add Todo</h2>
                            
                              
                              
                              <input
                                name="todo"
                                type="text"
                                placeholder="Create a new todo"
                                value={todo}
                                onChange={handleInputChange}
                                style = {{ height: "42px", width: "360px", paddingLeft: "10px", fontFamily: "monospace",
                                 borderRadius: "10px", border: "1px solid #dbb13d", marginTop:"5px"}}
                                
                              />
                            
                              <button type="submit" className="btn btn-warning" style = {{marginLeft:"10px", height: "45px",}}>Add</button>
                            </form>
                          )}

 
      
     
            <ul className="todo-list">
               {todos.map((todo) => (
                 <li key={todo.id} style = {{listStyle: "none", magin: "0"}} className = "p-2">
                 <Badge style = {{marginRight: "10px", backgroundColor: "black",}}>{todo.id}</Badge>
                 {todo.text}
                                  
                  <button onClick={() => handleDeleteClick(todo.id)} style = {{ float: "right", marginLeft:"5px"}} className="btn btn-danger">Delete</button>
                  <button onClick={() => handleEditClick(todo)} style = {{ float: "right"}} className="btn btn-primary">Edit</button>
                                    
                   </li>
                  ))}
             </ul>
         

           
           
              
              
            </div>

          </div>
        </div>

      </div>
    </div>
  
</section> 
                            

                        


    </>


  );
}


