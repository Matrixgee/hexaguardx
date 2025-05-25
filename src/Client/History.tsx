import React, { useEffect, useMemo } from "react";
import { useTable, Column } from "react-table";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserTransactions } from "../Function/Slice";

interface Transaction {
  _id: string;
  amount: string;
  mode: string;
  status: string;
  createdAt: string;
  transationType: string;
}

const History: React.FC = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.user.token);
  const transactions =
    useSelector((state: any) => state.user.userTransactions) || [];

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          "https://hexg.onrender.com/api/user/history",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );

        if (Array.isArray(response.data.data)) {
          dispatch(setUserTransactions(response.data.data));
        } else {
          console.error("Unexpected data format:", response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (userToken) getHistory();
  }, [dispatch, userToken]);

  const columns: Column<Transaction>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
        Cell: ({ value }) => <span>{value.slice(0, 5)}</span>,
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Payment Mode",
        accessor: "mode",
      },
      {
        Header: "Type",
        accessor: "transationType",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              value === "approved"
                ? "bg-green-600 text-white"
                : value === "declined"
                ? "bg-red-600 text-white"
                : "bg-yellow-500 text-black"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: transactions,
    });

  return (
    <div className="relative w-full h-full overflow-x-hidden overflow-y-scroll bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-16 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-24 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-52 h-52 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-10 py-10 space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h1l1-2h13l1 2h1m-6 0v10m-4-10v10M3 10l2 10h14l2-10"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Transaction History
            </h1>
            <p className="text-sm text-gray-400">
              Review all your transactions
            </p>
          </div>
        </div>

        <div className="overflow-x-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg shadow-purple-500/10">
          <table
            {...getTableProps()}
            className="min-w-[800px] w-full text-sm text-left text-gray-300"
          >
            <thead className="bg-white/10 border-b border-white/10 text-gray-200">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-4 font-semibold tracking-wide"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="divide-y divide-white/10"
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="hover:bg-white/5 transition duration-200"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
