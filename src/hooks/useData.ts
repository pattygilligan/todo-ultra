import { useState, useEffect } from "react";
import type { Todo } from "~/lib/types";

interface ApiResponse {
  todos: Todo[];
}

export function useData() {
  const [todoList, setTodoList] = useState<Todo[]>();
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    try {
      setDataLoading(true);
      fetch("api/todo", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          setTodoList(data.todos);
        })
        .catch((error) =>
          console.log("theres been an error fetching the data"),
        );
    } catch (error) {
      throw new Error("Error fetching data");
    }
    setDataLoading(false);
  }, []);

  return { todoList, dataLoading };
}
