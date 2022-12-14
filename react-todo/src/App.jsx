import { useState } from "react";
import "./App.css";
import CustomForm from "./components/CustomForm";
import EditForm from "./components/EditForm";
import TaskList from "./components/TaskList";
import ThemeSwitcher from "./components/ThemeSwitcher";
import useLocalStorage from './Hooks/useLocalStorage'

function App() {
  const [tasks, setTasks] = useLocalStorage('myTasks',[]);
  const [editedTasks, setEditedTasks] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFocus, setPreviousFocus] = useState(null);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((task) => task.id != id));
  };

  const toggleTask = (id) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const updateTask = (task) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
    closeEditMode();
  };

  const enterEditMode = (task) => {
    setEditedTasks(task);
    setIsEditing(true)
    setPreviousFocus(document.activeElement)
  };

  const closeEditMode = () => {
   setIsEditing(false)
   previousFocus.focus()

  }

  return (
    <div className="container">
      <header>
        <h1> My tasks</h1>
      </header>
      {isEditing && (
        <EditForm 
        editedTask={editedTasks} 
        updateTask={updateTask} 
        closeEditMode={closeEditMode}
        />
      )}

      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}

      <ThemeSwitcher/>
    </div>
  );
}

export default App;
