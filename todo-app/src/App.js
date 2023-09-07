
import "./App.css";
import { useState } from "react";
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';






function App() {
  const [isComp,setIsComp] = useState(false); //false means todo page
  return (
    <div className="App">
      <h1>Get things done!!</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" placeholder="Task title" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" placeholder="Task description" />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primary-Btn">
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
          <div className="todo-list-item">
            <div>
            <h3>Task 1</h3>
            <p>Description is about task 1</p>
            </div>
            <div>
            <AiOutlineDelete className="icon" title="delete?"/>
            <BsCheckLg className="check-icon" title="Completed?"/>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
