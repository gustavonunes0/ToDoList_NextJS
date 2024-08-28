"use client";

import { useState, useEffect } from 'react';

interface Task {
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="h-[90vh] max-w-[40vw] mx-auto my-[5vh] p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl text-black font-bold text-center mb-4">To-Do List</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="text-black w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Adicione uma nova tarefa"
        />
        <button
          onClick={addTask}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Adicionar Tarefa
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 my-2 rounded ${
              task.completed ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <span
              onClick={() => toggleTaskCompletion(index)}
              className={`text-black cursor-pointer max-w-[80%] break-words ${task.completed ? 'line-through' : ''}`}
            >
              {task.text}
            </span>
            <button
              onClick={() => removeTask(index)}
              className="bg-red-500 rounded-md p-1 border-2 font-[600] hover:text-red-500 hover:bg-white hover:border-red-500"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
