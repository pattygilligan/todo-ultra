import { useState, useEffect } from "react";
import type { Todo } from "~/lib/types";

export function useData() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    try {
      setDataLoading(true);
      fetch("api/todo", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setTodoList(data.result.rows);
        })
        .catch((error) =>
          console.log("theres been an error fetching the data"),
        );
    } catch (error) {
      throw new Error("Error fetching data" + error);
    }
    setDataLoading(false);
  }, []);

  return { todoList, dataLoading };
}
