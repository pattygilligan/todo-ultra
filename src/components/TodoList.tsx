import { useEffect, useState } from "react";
import type { Todo } from "~/lib/types";
import { useAddTodo } from "~/hooks/useAddTodo";
import todo from "~/pages/api/todo";
import { useData } from "~/hooks/useData";
import { useDeleteTodo } from "~/hooks/useDeleteTodo";
import { useToggleTodo } from "~/hooks/useToggleTodo";

export default function TodoList() {
  const [inputText, setInputText] = useState("");
  const { todoList: fetchedTodoList, dataLoading } = useData();
  const [todoList, setTodoList] = useState<Todo[]>([]);

  function generateId() {
    // This is NOT recommended for production use
    return Date.now().toString().slice(-4);
  }

  const onAddSuccess = (newTodo: Todo) => {
    setTodoList([...todoList, newTodo]);
  };

  const onDeleteSuccess = (id: string) => {
    setTodoList(todoList.filter((item) => id !== item.id));
  };

  const onToggleSuccess = (id: string) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const { addTodo, isLoading } = useAddTodo(onAddSuccess);
  const { deleteTodo } = useDeleteTodo(onDeleteSuccess);
  const { toggleTodo } = useToggleTodo(onToggleSuccess);

  const handleAddTodo = async () => {
    const newTodo = { id: generateId(), text: inputText, done: false };
    await addTodo(newTodo);
    setInputText("");
  };

  const handleTodoChange = async (id: string) => {
    const updatedTodoList = todoList.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item,
    );
    const changeTodo = updatedTodoList.find((item) => item.id === id);
    //todo to update in the databse
    if (changeTodo) {
      await toggleTodo(changeTodo);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
  };

  useEffect(() => {
    setTodoList(fetchedTodoList);
  }, [fetchedTodoList]);

  return (
    <div className="flex min-h-96 min-w-96 flex-col gap-4 rounded-xl border bg-white p-4">
      <h1 className="text-2xl font-bold">TodoList</h1>
      <div>
        {todoList.map((item) => {
          return (
            <div
              className="flex gap-2"
              style={
                item.done
                  ? { textDecoration: "line-through", color: "grey" }
                  : {}
              }
              key={item.id}
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => handleTodoChange(item.id)}
              />
              <p>{item.text}</p>
              <button
                type="button"
                onClick={() => handleDeleteTodo(item.id)}
                className="flex-grow text-red-400"
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
      <form className="flex flex-grow flex-col justify-end gap-2">
        <h1 className="text-xl ">Create Todo</h1>
        <input
          type="text"
          value={inputText}
          placeholder="enter todo"
          onChange={(e) => setInputText(e.target.value)}
          className="rounded border p-2"
        />
        <button
          className="rounded bg-black p-2 text-white"
          type="button"
          onClick={handleAddTodo}
        >
          Create Todo
        </button>
      </form>
    </div>
  );
}
