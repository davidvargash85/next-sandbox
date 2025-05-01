'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Transaction = {
  date: string;
  description: string;
  amount: number;
};

type AccountInfo = {
  accountName: string;
  balance: number;
  transactions: Transaction[];
};

const useFetchAccountData = (accountNumber: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AccountInfo | undefined>(undefined);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // todo: use later accNumber
    const fetchAccountData = async (accNumber: string | undefined) => {
      try {
        const res = await fetch(`http://localhost:3000/api/fetch`);
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log('there has been an error retrieving acounts', error);
      }
    };
    fetchAccountData(accountNumber);
  }, []);

  return {
    isLoading,
    data,
    isError
  };
};

const AccountDetailsPage = () => {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : undefined;

  const { isLoading, data, isError } = useFetchAccountData(id);

  console.log('>> data', isLoading, data);

  if (isLoading) return <p className='text-center mt-10'>Loading...</p>;
  if (isError)
    return (
      <p className='text-center text-red-500 mt-10'>
        Error fetching account data.
      </p>
    );
  if (!data) return <p className='text-center mt-10'>No account data found.</p>;

  return (
    <div className='max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow'>
      <h1 className='text-2xl font-bold mb-2'>{data.accountName}</h1>
      <p className='mb-4 text-lg'>Balance: ${data.balance.toFixed(2)}</p>

      <h2 className='text-xl font-semibold mb-2'>Transactions</h2>
      <table className='w-full table-auto border'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-left'>Date</th>
            <th className='px-4 py-2 text-left'>Description</th>
            <th className='px-4 py-2 text-left'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.transactions.map((txn, idx) => (
            <tr key={idx} className='border-t'>
              <td className='px-4 py-2'>{txn.date}</td>
              <td className='px-4 py-2'>{txn.description}</td>
              <td
                className={`px-4 py-2 ${txn.amount < 0 ? 'text-red-500' : 'text-green-600'}`}
              >
                ${txn.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountDetailsPage;
