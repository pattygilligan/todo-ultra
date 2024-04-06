import { useState } from "react";
import type { Todo } from "~/lib/types";
type OnSuccess = (id: number) => void;

export function useDeleteTodo(onSuccess: OnSuccess) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteTodo = async (todo: Todo) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/todo", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("Error adding response to database from useAdd Todo");
      }
      console.log(response);
      onSuccess(todo.id);
      setIsLoading(false);
    } catch (error) {
      throw new Error("Error adding response to database from useAdd Todo");
    }
  };

  return { deleteTodo, isLoading };
}
