
import "./App.css";
import { useEffect, useState } from "react";
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';






function App() {
  const [isComp,setIsComp] = useState(false);  //false means todo page and true means completed page
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title:newTitle,
      description:newDescription,
    }
      
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
    setNewTitle("");
    setNewDescription("");
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if(savedTodo)
    {
     setTodos(savedTodo);
    }
 },[])

   

  const handleDelete = (index) => {
    
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index,1);
    // localStorage.removeItem(index);
    localStorage.setItem('todolist',JSON.stringify(reduceTodo));
    setTodos(reduceTodo);
    

  }

  //completedtodos
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedon = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;
    let filteredItem = {
      ...allTodos[index],
      completedOn:completedon
    }
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDelete(index);      
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))
   }

   //completed todos delete function
   const handleCompDelete = (index) => {
    let reduceTodo = [...completedTodos];
    reduceTodo.splice(index,1);
    // localStorage.removeItem(index);
    localStorage.setItem('completedTodos',JSON.stringify(reduceTodo));
    setCompletedTodos(reduceTodo);
   } 

   useEffect(()=>{
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedCompletedTodo)
    {
      setCompletedTodos(savedCompletedTodo);
    }
   },[])


 //return for app components
  return (
    <div className="App">
      <h1>Get things done!!</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} 
            onChange={(e)=>setNewTitle(e.target.value)} placeholder="Task title" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Task description" />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primary-Btn" onClick={handleAddTodo}>
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button className = {`secondary-btn 
           ${isComp===false && 'active'}`} onClick={()=>setIsComp(false)}>Todos</button>
          <button className={`secondary-btn 
           ${isComp===true && 'active'}`} onClick={()=>{setIsComp(true)}}>Completed</button>
        </div>

        <div className="todo-list">
          {isComp===false && allTodos.map((item,index)=>{
            return(
            <div className="todo-list-item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>
            <div>
            <AiOutlineDelete className="icon" title="delete?" onClick={()=>handleDelete(index)}/>
            <BsCheckLg className="check-icon" title="Completed?" onClick={()=>handleComplete(index)}/>
            </div>
            
          </div>
            )
          })}

       {/* //completed todo */}
       {isComp===true && completedTodos.map((item,index)=>{
            return(
            <div className="todo-list-item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Completed On: {item.completedOn}</p>
            </div>
            <div>
            <AiOutlineDelete className="icon" title="delete?" onClick={()=>handleCompDelete(index)}/>
            </div>
            
          </div>
            )
          })}


        </div>
      </div>
    </div>
  );
}

export default App;
