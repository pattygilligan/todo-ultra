import { useState } from "react";
import { Todo } from "~/lib/types";
type OnSuccess = (todo: Todo) => void;

export function useAddTodo(onSuccess: OnSuccess) {
  const [isLoading, setIsLoading] = useState(false);

  const addTodo = async (newTodo: Todo) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error("Error adding response to database from useAdd Todo");
      }

      onSuccess(newTodo);
      setIsLoading(false);
    } catch (error) {
      throw new Error(
        "Error adding response to database from useAdd Todo" + error,
      );
    }
  };

  return { addTodo, isLoading };
}
