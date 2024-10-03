import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [viewPort, setViewPort] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [tasks, setTasks] = useState(() => {
    // Initializing tasks from localStorage, or an empty array if none exist
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  // Initializing completedTasksCount from localStorage, or 0 if none exist
  useEffect(() => {
    const count = localStorage.getItem("completedTasksCount");
    setCompletedTasksCount(count ? Number(count) : 0);
  }, []);

  // Updating localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Updating localStorage whenever completedTasksCount changes
  useEffect(() => {
    localStorage.setItem("completedTasksCount", completedTasksCount);
  }, [completedTasksCount]);

  // Updating the viewport size when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setViewPort({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        viewPort,
        tasks,
        setTasks,
        completedTasksCount,
        setCompletedTasksCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
