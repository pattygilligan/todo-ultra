import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await sql`SELECT * FROM TodoList;`;
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error getting data from database", error });
    }
  } else if (req.method === "POST") {
    try {
      console.log("Postin");
      const { id, text, done } = req.body;
      const result =
        await sql`INSERT INTO TodoList (Id, Text, Done) VALUES (${id}, ${text}, ${done}) ON CONFLICT (Id) DO UPDATE SET Text = EXCLUDED.Text, Done = EXCLUDED.Done`;
      console.log(result);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding Todo to database", error });
    }
  } else if (req.method === "DELETE") {
    try {
      const id = req.body;
      console.log(id);
      const result = await sql`DELETE FROM TodoList WHERE Id = ${id};`;
      console.log(result);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error deleting todo from database", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};