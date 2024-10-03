import PropTypes from "prop-types";
import { useState, useContext, useRef } from "react";
import { Context } from "../store/Context";

const Task = ({ id, label, isTaskDone = false }) => {
  const { tasks, setTasks } = useContext(Context);
  const [longPress, setLongPress] = useState(false); // State to track long press
  const timeoutRef = useRef(null); // Ref to store timeout ID

  // Handling checkbox toggle
  const toggleTaskDone = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  // Handling delete task on long press (mobile) and double click (desktop)
  const handleDelete = () => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handling touch events for long press
  const handleTouchStart = () => {
    timeoutRef.current = setTimeout(() => {
      setLongPress(true); // long press state to true
      handleDelete();
    }, 500); //  Long press Duration as needed (500 = 0.5s)
  };

  // Clearing timeout on touch end
  const handleTouchEnd = () => {
    clearTimeout(timeoutRef.current); // Clearing the timeout on touch end
    if (!longPress) {
      setLongPress(false); // Resetting long press state
    }
  };

  return (
    <div
      className="p-2.5 m-0.5 bg-white rounded text-lg font-semibold space-x-5 hover:bg-gray-100"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDelete}
    >
      <input
        type="checkbox"
        checked={isTaskDone}
        onChange={toggleTaskDone}
        className="cursor-pointer focus:ring-1 ring-cyan-500 rounded-xl"
      />
      <label
        className={isTaskDone ? "line-through text-gray-500 font-normal" : ""}
      >
        {label}
      </label>
    </div>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  isTaskDone: PropTypes.bool,
};

export default Task;
