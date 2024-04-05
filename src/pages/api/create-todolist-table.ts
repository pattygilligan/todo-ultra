import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result =
        await sql`CREATE TABLE TodoList (Id SERIAL PRIMARY KEY , Text varchar(255), Done boolean);`;
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating todo table", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
