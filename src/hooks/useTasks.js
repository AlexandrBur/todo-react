import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
  const {
    savedTasks,
    saveTasks,
  } = useTasksLocalStorage()

  const [tasks, setTasks] = useState(savedTasks ?? [
    {
      id: '3e724e46-1412-4e01-a6d8-2ec24dc575a5',
      title: 'Купить молоко!',
      isDone: true,
    },
    {
      id: 'f488dcc0-a542-496a-9d20-c0f8ae5ef78c',
      title: 'Погладить кота!',
      isDone: true,
    },
    {
      id: '82cfd5bb-2de8-4854-aad6-76a962086021',
      title: 'Постирать вещи!',
      isDone: true,
    },
    {
      id: '851505a4-b39b-4cbc-b9ce-144441022be1',
      title: 'Выкинуть мусор!',
      isDone: true,
    },
    {
      id: 'adce29ee-3419-4106-88eb-4353dbaad25b',
      title: 'Позвонить Михаилу!',
      isDone: true,
    },
    {
      id: 'ab2d4be7-cf3b-44f5-8b62-8b95335b8aa1',
      title: 'Заплатить за ЖКХ!',
      isDone: true,
    },
    {
      id: '11e3da19-7fb8-4ccb-8df5-afafc3389c85',
      title: 'Оплатить интернет!',
      isDone: true,
    },
    {
      id: 'f7935ff5-51c1-4ac0-a56d-65dd6906a8dc',
      title: 'Поздравить Настю с ДР!',
      isDone: true,
    },
    {
      id: '0fec9d2d-7e7e-413f-8a7f-2238dfd3a1ca',
      title: 'Покормить кролика!',
      isDone: true,
    },
    {
      id: 'e20bc6fb-1b66-4d69-9c89-25b03574bcd5',
      title: 'Помыть машину!',
      isDone: false,
    },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all?');
    if (isConfirmed) {
      setTasks([]);
    }
  }, []);

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone };
          }
          return task;
        }),
      );
    },
    [tasks],
  );

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle('');
      setSearchQuery('');
      newTaskInputRef.current.focus();
    }
  }, [newTaskTitle]);

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks]);

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, []);

  /* Количество ререндеров*/
  // const renderCount = useRef(0);
  // useEffect(() => {
  //   renderCount.current++;
  //   console.log(`Компонент Todo отрендерился ${renderCount.current} раз(а)`);
  // });

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
      : null;
  }, [searchQuery, tasks]);

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  }

}

export default useTasks;