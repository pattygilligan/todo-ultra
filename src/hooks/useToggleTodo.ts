import { useState } from "react";
import { Todo } from "~/lib/types";
type OnSuccess = (id: string) => void;

export function useToggleTodo(onSuccess: OnSuccess) {
  const [isLoading, setIsLoading] = useState(false);

  const toggleTodo = async (changeTodo: Todo) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(changeTodo),
      });
      if (!response.ok) {
        throw new Error("Error adding response to database from useAdd Todo");
      }
      onSuccess(changeTodo.id);
      setIsLoading(false);
    } catch (error) {
      throw new Error(
        "Error adding response to database from useAdd Todo" + error,
      );
    }
  };

  return { toggleTodo, isLoading };
}
