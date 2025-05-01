import { ApiError } from "@/zz_testUtils/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Input = {
  email: string;
  name: string;
  phone: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Input | ApiError>,
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }
  if (req.body.name === "error") {
    res.status(400).json({ message: "Invalid name" });
  }
  res.status(200).json(req.body);
}
