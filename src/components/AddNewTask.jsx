import ProTypes from "prop-types";
import { closeIcon } from "../assets";
import { useState, useRef, useEffect } from "react";

const AddNewTask = ({ onClose, handleNewTask }) => {
  const [taskName, setTaskName] = useState("");

  const inputRef = useRef(null);

  // Focusing on input when the component is opened
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Add New Task Handler
  const addTask = () => {
    if (taskName.trim() !== "") {
      handleNewTask(taskName); // Passing the task name to the parent component
      setTaskName("");
      onClose();
    }
  };
  return (
    <div className="absolute top-0 z-20 w-screen h-screen bg-black bg-opacity-40  flex flex-col justify-normal md:justify-center items-center">
      <div className="w-80 bg-white p-5 rounded-lg shadow-xl flex flex-col space-y-5 mt-40 md:mt-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-500">Add New Task</h1>
          <button type="button" onClick={onClose} className="text-red-500">
            <img src={closeIcon} alt="close-icon" width={20} />
          </button>
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Task Name"
          className="p-2 border-b focus:border-b-2 border-cyan-500 focus:outline-none"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />

        <button
          className="bg-cyan-500 text-white p-2 rounded-lg"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

AddNewTask.propTypes = {
  onClose: ProTypes.func.isRequired,
  handleNewTask: ProTypes.func.isRequired,
};

export default AddNewTask;
