import { useState } from "react";
type OnSuccess = (id: number) => void;

export function useDeleteTodo(onSuccess: OnSuccess) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteTodo = async (id: number) => {
    try {
      console.log("entering deleted todo");
      console.log(id);
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
      console.log(response);
      onSuccess(id);
      setIsLoading(false);
    } catch (error) {
      throw new Error("Error adding response to database from useAdd Todo");
    }
  };

  return { deleteTodo, isLoading };
}
