import { useState } from "react";
import { Todo } from "~/lib/types";
type OnSuccess = (id: string) => void;

export function useDeleteTodo(onSuccess: OnSuccess) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteTodo = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/todo", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(id),
      });
      if (!response.ok) {
        throw new Error("Error adding response to database from useAdd Todo");
      }
      console.log("successfully deleted todo");
      onSuccess(id);
      setIsLoading(false);
    } catch (error) {
      throw new Error("Error adding response to database from useAdd Todo");
    }
  };

  return { deleteTodo, isLoading };
}
