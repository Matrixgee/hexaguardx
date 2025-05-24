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

  const getHistory = async () => {
    const url = "https://hexg.onrender.com/api/user/history";
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    try {
      const response = await axios.get(url, { headers });
      // Ensure response.data.data is an array
      if (Array.isArray(response.data.data)) {
        dispatch(setUserTransactions(response.data.data));
      } else {
        console.error("Unexpected data format:", response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userToken) {
      getHistory();
    }
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
            className={
              value === "approved"
                ? "bg-green-500 text-white px-2 py-1 rounded"
                : value === "declined"
                ? "bg-red-500 text-white px-2 py-1 rounded"
                : "bg-yellow-500 text-white px-2 py-1 rounded"
            }
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Date Created",
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
    <div className="w-full h-full bg-[#101829] scroll scrollbar-thin overflow-y-scroll">
      <div className="w-[100%] h-[20%] flex justify-center items-center">
        <p className="text-2xl text-gray-200">Transaction History</p>
      </div>
      <div className="w-full h-[80%] bg-[#1a2236] p-4 overflow-x-auto">
        <table
          {...getTableProps()}
          className="w-full text-left border-collapse min-w-[800px]"
        >
          <thead className="bg-gray-700 text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="p-3 border">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-gray-800 text-gray-200"
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-3 border">
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
  );
};

export default History;
