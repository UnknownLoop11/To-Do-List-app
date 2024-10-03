import { todoIcon, addIcon } from "./assets";
import { useState, useContext } from "react";
import { Context } from "./store/Context";

import AddNewTask from "./components/AddNewTask";
import Task from "./components/Task";

export default function App() {
  const { viewPort, tasks, setTasks } = useContext(Context);

  const [addNewTask, setAddNewTask] = useState(false); // State to toggle the Add New Task Component

  // Adding New Task handler
  const addNewTaskHandler = (taskName) => {
    const newTask = {
      id: new Date().getTime(),
      label: taskName,
      isDone: false,
    };

    // Updating tasks in context
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Task Completion Handler
  const completeTaskHandler = (taskId) => {
    // Updating task's completion status directly in the context
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  // Separating tasks into completed and incomplete
  const incompleteTasks = tasks.filter((task) => !task.isDone);
  const completedTasks = tasks.filter((task) => task.isDone);

  return (
    <>
      <div className="md:h-screen flex flex-col items-center justify-start md:justify-center ">
        <div className="relative m-1.5 flex flex-col bg-gray-200 rounded-xl">
          {/* HEADER */}
          <div className="p-3 bg-cyan-500 flex items-center rounded-t-xl">
            <img src={todoIcon} alt="To-Do Icon" />
            <div className="leading-none">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                To-Do List
              </h1>
              <span className="text-xs ">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="ml-auto p-1.5 shadow-xl text-center space-y-2 text-xs text-white font-semibold rounded-lg">
              <span>Tasks Completed:</span>
              <br />
              <p className="bg-white w-1/2 mx-auto text-cyan-500 px-2 py-1 rounded-md">
                {tasks.filter((task) => task?.isDone).length}
              </p>
            </div>
          </div>

          {/* BODY */}
          <div
            className="p-2 flex flex-col gap-y-1.5 overflow-y-auto"
            style={{
              height:
                viewPort.width < 768
                  ? viewPort.height - 100 // Adjusting height for mobile view
                  : viewPort.height - 150, // Adjusting height for desktop view
              width: viewPort.width < 768 ? viewPort.width - 15 : "720px",
            }}
          >
            {/* Tasks List */}

            {/* Incomplete/New Tasks  */}
            {incompleteTasks.length > 0 ? (
              <>
                <h2 className="text-xl font-bold text-cyan-500">Tasks</h2>
                {incompleteTasks.map((task) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    label={task.label}
                    isTaskDone={task.isDone}
                    onComplete={() => completeTaskHandler(task.id)}
                  />
                ))}
              </>
            ) : (
              // No Tasks Added Message
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold text-cyan-500">
                  No Tasks Added
                </h1>
              </div>
            )}

            {/* Completed Tasks List */}
            {completedTasks.length > 0 && incompleteTasks.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-bold text-cyan-500">
                  Completed Tasks
                </h2>
                {completedTasks.map((task) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    label={task.label}
                    isTaskDone={task.isDone}
                    onComplete={() => completeTaskHandler(task.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Floating Button */}
          <button
            type="button"
            className="absolute z-10 bottom-10 right-8 rounded-full shadow-lg hover:opacity-80 hover:scale-110 duration-150 transition-all"
            onClick={() => setAddNewTask(!addNewTask)}
          >
            <img src={addIcon} alt="add-icon" width={60} />
          </button>
        </div>
      </div>

      {/* Add New Task Component */}
      {addNewTask && (
        <AddNewTask
          onClose={() => setAddNewTask(!addNewTask)} // Closing the AddNewTask component
          handleNewTask={addNewTaskHandler} // Passing the handler to AddNewTask component
        />
      )}
    </>
  );
}
