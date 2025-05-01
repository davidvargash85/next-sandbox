import { ApiError } from "@/zz_testUtils/types";
import { NextApiRequest, NextApiResponse } from "next";

type BankAccount = {
  accountNumber: string;
  balance: number;
  name: string;
};

type Loan = {
  accountNumber: string;
  name: string;
  nextPaymentDue: string;
  paymentAmount: number;
};

type Account = BankAccount | Loan;

type Profile = {
  name: string;
  accounts: Account[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profile | ApiError>,
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  res.status(200).json({
    name: "Jonathan",
    accounts: [
      { accountNumber: "1", balance: 100.0, name: "Checking" },
      { accountNumber: "2", balance: 1000.0, name: "Savings" },
      {
        accountNumber: "3",
        name: "Mortgage",
        nextPaymentDue: "01-01-2025",
        paymentAmount: 1000,
      },
    ],
  });
}
