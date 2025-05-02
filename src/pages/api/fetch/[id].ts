import { AccountInfo, ApiError } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const accounts = [
  {
    id: 1,
    accountName: "Checking account",
    balance: 123.45,
    transactions: [
      { date: "2021-01-01", description: "Deposit", amount: 100.0 },
      { date: "2021-01-02", description: "ATM withdrawl", amount: -50.0 },
      { date: "2021-01-03", description: "Zelle to friend", amount: -25.0 },
    ],
  },
  {
    id: 1,
    accountName: "Checking account",
    balance: 123.45,
    transactions: [
      { date: "2021-01-01", description: "Deposit", amount: 100.0 },
      { date: "2021-01-02", description: "ATM withdrawl", amount: -50.0 },
      { date: "2021-01-03", description: "Zelle to friend", amount: -25.0 },
    ],
  },
  {
    id: 2,
    accountName: "Checking account",
    balance: 123.45,
    transactions: [
      { date: "2021-01-01", description: "Deposit", amount: 100.0 },
      { date: "2021-01-02", description: "ATM withdrawl", amount: -50.0 },
      { date: "2021-01-03", description: "Zelle to friend", amount: -25.0 },
    ],
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountInfo | ApiError>
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) {
    // todo: validate on validation layer
    return res.status(400).json({ message: "invalid or missing ID" });
  }
  
  const account = accounts.find((f) => f.id === +id) || accounts[0];
  res.status(200).json(account);
}
