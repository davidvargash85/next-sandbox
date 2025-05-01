import { ApiError } from "@/zz_testUtils/types";
import { NextApiRequest, NextApiResponse } from "next";

type BankAccount = {
  accountNumber: string;
  name: string;
  balance: number;
};

type Profile = {
  name: string;
  accounts: BankAccount[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profile | ApiError>,
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  res.status(200).json({
    name: "Jonathan Doe",
    accounts: [
      {
        accountNumber: "1234567890",
        name: "Checking",
        balance: 100.0,
      },
      {
        accountNumber: "0987654321",
        name: "Savings",
        balance: 1000.0,
      },
      { accountNumber: "1111111111", name: "CD", balance: -50 },
    ],
  });
}
