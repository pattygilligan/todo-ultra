import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from "next";
import { Todo } from "~/lib/types";
import { z } from "zod";
import { TodoSchema } from "~/lib/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await sql`SELECT * FROM TodoList;`;
      const todos = result.rows;
      const validatedTodos = TodoSchema.array().parse(todos);
      res.status(200).json({ todos: validatedTodos });
    } catch (error) {
      console.log(error);

      if (error instanceof z.ZodError) {
        res
          .status(400)
          .json({ message: "data validation error", errors: error.errors });
        return;
      }
      res
        .status(500)
        .json({ message: "Error getting data from database", error });
    }
  } else if (req.method === "POST") {
    try {
      const newTodo = TodoSchema.parse(req.body);
      console.log(newTodo);
      const { id, text, done } = newTodo;
      const result =
        await sql`INSERT INTO TodoList (Id, Text, Done) VALUES (${id}, ${text}, ${done}) ON CONFLICT (Id) DO UPDATE SET Text = EXCLUDED.Text, Done = EXCLUDED.Done`;
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        res
          .status(400)
          .json({ message: "Invalid todo data", error: error.errors });
      }
      res.status(500).json({ message: "Error adding Todo to database", error });
    }
  } else if (req.method === "DELETE") {
    try {
      const id = req.body;
      const result = await sql`DELETE FROM TodoList WHERE Id = ${id};`;
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);

      if (error instanceof z.ZodError) {
        res
          .status(400)
          .json({ message: "type error when deleting", error: error.errors });
      }
      res
        .status(500)
        .json({ message: "Error deleting todo from database", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
