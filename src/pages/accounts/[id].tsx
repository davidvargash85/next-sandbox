import type { AccountInfo, ApiError } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

async function fetchData(id: number): Promise<AccountInfo | ApiError> {
  try {
    const response = await fetch(`http://localhost:3000/api/fetch/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(">> error while fetching account-info", error);
    return {
      message: ">> error while fetching account-info",
    };
  }
}

const useFetchAccountInfo = (id: number | undefined) => {
  const [data, setData] = useState<AccountInfo | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setIsLoading(true);
      const response = await fetchData(id);
      if ("message" in response) {
        setIsError(true);
      } else {
        setData(response);
      }
      setIsLoading(false);
    };

    load();
  }, [id]);

  return {
    data,
    isLoading,
    isError,
  };
};

const AccountInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, data } = useFetchAccountInfo(
    typeof id === "string" ? +id : undefined
  );

  console.log(">> data", data);

  if (isLoading) {
    return (
      <div>
        <p>loading ... </p>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <p>oops something bad happened</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {data?.accountName}
        </h2>
        <p className="text-2xl text-gray-600">${data?.balance.toFixed(2)}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.transactions.map((tx, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2">{tx.date}</td>
                <td className="px-4 py-2">{tx.description}</td>
                <td
                  className={`px-4 py-2 text-right font-medium ${
                    tx.amount >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.amount >= 0 ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountInfo;
