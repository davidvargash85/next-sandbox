import Link from "next/link";
import React, { useEffect, useState } from "react";

export const AccountsTask = () => {
  type BankAccount = {
    accountNumber: string;
    name: string;
    balance: number;
  };

  type Profile = {
    name: string;
    accounts: BankAccount[];
  } | null;
  const [data, setData] = useState<Profile>(null);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    fetch("api/accounts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoaded(true);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!isLoaded) {
    return <>Accounts data loading Please continue wait...</>;
  }
  return (
    <>
      <div className="bg-blue-200 flex flex-col items-center justify-center h-80 w-100">
        <h2 className="text-5xl text-black font-serif">
          Welcome, {data?.name}
        </h2>
        <span className="text-lg text-gray-400">View your accounts below</span>
      </div>

      <div className="grid gap-6 grid-flow-row">
        {data?.accounts.map((account, index) => (
          <div
            key={index}
            className="mx-10 rounded shadow-lg bg-white p-2 flex"
          >
            <img src="images/placeholder.jpg" />
            <div className="mx-2 flex flex-col">
              <h3 className="text-lg text-black">
                {account.name} - {account.accountNumber.slice(-4)}
              </h3>
              <span className="text-sm text-gray-400">${account.balance}</span>
              <Link href={`accountsdetails/${account.accountNumber}`}>
                <button className="px-5 py-2 bg-blue-600 text-white rounded">
                  View Transactions
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
