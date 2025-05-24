/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from "react";
import { useTable, Column } from "react-table";
import { IoAddCircleOutline } from "react-icons/io5";
import { Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllUsers, setOneUser } from "../Function/Slice";

interface User {
  clientName: string;
  accountBalance: string;
  email: string;
  status: string;
  dateReg: string;
  action: string;
  _id: string;
}

const AllUsers: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching route parameters
  // const { _id } = useParams<{ _id: string }>();

  const users = useSelector((state: any) => state.user.allAdminUsers);
  const token = useSelector((state: any) => state.user.userToken);

  const url = "https://hexg.onrender.com/api/admin/getAllUser";

  const fetchUsers = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setAllUsers(response.data.data));
      dispatch(setOneUser(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token, dispatch]);

  const data: User[] = useMemo(
    () =>
      Array.isArray(users)
        ? users.map((user: any) => ({
            clientName: `${user.firstName} ${user.lastName}`,
            accountBalance: `$${user.accountBalance}`,
            email: user.email,
            status: user.status ? "Active" : "Inactive",
            dateReg: new Date(user.createdAt).toLocaleDateString(),
            action: "manage",
            _id: user._id,
          }))
        : ([] as User[]), // Return an empty array if users is not an array
    [users]
  );

  const columns: Column<User>[] = useMemo(
    () => [
      {
        Header: "Client Name",
        accessor: "clientName",
      },
      {
        Header: "Account Balance",
        accessor: "accountBalance",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Date Reg",
        accessor: "dateReg",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-md"
            onClick={() => navigate(`/admin/userdetails/${row.original._id}`)}
          >
            Manage
          </button>
        ),
      },
    ],
    [navigate]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalVisible(false);
        console.log("Form Values:", values);
        // Add user logic here, such as dispatching an action to add the user to the store or making an API call
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    console.log("hello");
  };

  return (
    <div className="w-full h-full overflow-y-scroll phone:scroll-hidden">
      <div className="w-1/3 h-20 mt-5 flex justify-start px-7 items-center phone:w-[90%]">
        <p className="text-2xl">DefiskySpace users list</p>
      </div>
      <div className="UserAction w-full h-20 flex justify-between items-center px-10">
        <button className="w-[12%] h-1/2 text-white rounded-md bg-green-400 phone:w-[30%]">
          Message All
        </button>
        <button
          className="w-[10%] h-1/2 bg-red-500 rounded-md flex justify-center gap-1 items-center text-white phone:w-[30%]"
          onClick={showModal}
        >
          <IoAddCircleOutline /> Add User
        </button>
      </div>
      <div className="w-full h-4/5 flex justify-center items-center">
        <div className="w-11/12 h-full bg-white shadow-lg overflow-y-scroll scrollbar-thin">
          <div className="w-[50%] h-[15%] flex justify-between px-5 items-center phone:w-[100%] phone:gap-2">
            <select
              name=""
              id=""
              className="w-[30%] h-3/5 rounded-md border px-3 phone:w-[40%]"
            >
              <option value="">Ascending</option>
              <option value="">Descending</option>
            </select>
            <div className="w-[50%] h-[60%] phone:w-[60%]">
              <input
                type="text"
                placeholder="Search by name or email"
                className="w-full bg-slate-200 h-full rounded-md outline-none px-4"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="w-full border-collapse">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="bg-gray-100"
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="border p-2 text-left"
                      >
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
                    <tr {...row.getRowProps()} className="hover:bg-gray-50">
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="border p-2">
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
      <Modal
        title="Add User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="userForm">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="Firstname"
            rules={[{ required: true, message: "Please input the firstname!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="lastname"
            rules={[{ required: true, message: "Please input the lastname!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input the email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm the password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllUsers;
