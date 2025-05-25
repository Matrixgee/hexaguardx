import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { MdModeEdit, MdOutlineClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Modal, Button } from "antd";
import { setPlan } from "../Function/Slice";

interface Plan {
  _id: string;
  planName: string;
  planPrice: number;
  planMinimumPrice: number;
  planMaximumPrice: number;
  minimumReturn: number;
  maximumReturn: number;
  giftBonus: number;
  duration: string;
}

interface RootState {
  user: {
    token: string;
    plans: Plan[];
  };
}

const InvestmentPack: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const planList = useSelector((state: RootState) => state.user.plans);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const getAllPlans = async () => {
    try {
      const response = await axios.get(
        "https://hexg.onrender.com/api/admin/getAllPlans",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      dispatch(setPlan(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  const showModal = (plan?: Plan) => {
    if (plan) {
      setIsEditing(true);
      setEditingPlanId(plan._id);
      form.setFieldsValue({
        planName: plan.planName,
        planPrice: plan.planPrice,
        planMinimumPrice: plan.planMinimumPrice,
        planMaximumPrice: plan.planMaximumPrice,
        minimumReturn: plan.minimumReturn,
        maximumReturn: plan.maximumReturn,
        giftBonus: plan.giftBonus,
        duration: plan.duration,
      });
    } else {
      setIsEditing(false);
      setEditingPlanId(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    try {
      const values = form.getFieldsValue();
      if (isEditing && editingPlanId) {
        await axios.put(
          `https://hexg.onrender.com/api/admin/editPlan/${editingPlanId}`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          "https://hexg.onrender.com/api/admin/postPlan",
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      getAllPlans();
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleteModal = (planId: string) => {
    setDeletingPlanId(planId);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setDeletingPlanId(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deletingPlanId) {
        await axios.delete(
          `https://hexg.onrender.com/api/admin/deletePlan/${deletingPlanId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        getAllPlans();
      }
      setIsDeleteModalVisible(false);
      setDeletingPlanId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full scrollbar overflow-y-scroll">
      <div className="w-full h-[28%] flex justify-start items-center">
        <div className="w-[30%] h-[80%] flex justify-center gap-4 flex-col items-start px-4 max-md:w-[90%]">
          <p className="font-semibold text-2xl">System Plans</p>
          <button
            className="w-[40%] h-[40%] bg-[#050C1B] rounded-md text-white flex font-semibold justify-center items-center gap-2"
            onClick={() => showModal()}
          >
            <IoMdAdd /> New Plan
          </button>
        </div>
      </div>
      <div className="w-[100%] h-[70rem] flex justify-around flex-wrap items-center">
        {planList &&
          planList.length > 0 &&
          planList.map((plan, index) => (
            <div
              key={index}
              className="w-[30%] h-[45%] bg-white shadow-lg rounded-md flex justify-around items-center flex-col mb-5 max-md:w-[90%]"
            >
              <div className="w-full h-[15%] flex justify-start px-5 items-center">
                <p className="text-2xl">{plan.planName}</p>
              </div>
              <div className="w-full h-[17%] flex justify-center items-center">
                <p className="text-5xl ">${plan.planPrice}</p>
              </div>
              <div className="w-full h-[43%] flex-col justify-around items-center flex">
                <div className="w-full h-[14%] px-3 flex justify-between items-center">
                  <p>Minimum Possible Deposit:</p>
                  <p>${plan.planMinimumPrice}</p>
                </div>
                <div className="w-full h-[14%] px-3 flex justify-between items-center">
                  <p>Maximum Possible Deposit:</p>
                  <p>${plan.planMaximumPrice}</p>
                </div>
                <div className="w-full h-[14%] px-3 flex justify-between items-center">
                  <p>Minimum Return:</p>
                  <p>${plan.minimumReturn}</p>
                </div>
                <div className="w-full h-[14%] px-3 flex justify-between items-center">
                  <p>Maximum Return:</p>
                  <p>${plan.maximumReturn}</p>
                </div>
                <div className="w-full h-[14%] px-3 flex justify-between items-center">
                  <p>Gift Bonus:</p>
                  <p>${plan.giftBonus}</p>
                </div>
                <div className="w-full h-[14%] px-3 flex justify-between items-center">
                  <p>Duration:</p>
                  <p>{plan.duration}</p>
                </div>
              </div>
              <div className="w-full h-[15%] flex justify-center gap-2 items-center">
                <button
                  className="w-[20%] text-white rounded-md h-[60%] bg-blue-500 flex justify-center items-center text-2xl"
                  onClick={() => showModal(plan)}
                >
                  <MdModeEdit />
                </button>
                <button
                  className="w-[20%] text-white rounded-md h-[60%] bg-red-500 flex justify-center items-center text-2xl"
                  onClick={() => showDeleteModal(plan._id)}
                >
                  <MdOutlineClear />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modal for Adding/Editing Plans */}
      <Modal
        title={isEditing ? "Edit Plan" : "New Plan"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            {isEditing ? "Save Changes" : "Create Plan"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="planName"
            label="Plan Name"
            rules={[{ required: true, message: "Please input the plan name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="planPrice"
            label="Total Amount"
            rules={[
              { required: true, message: "Please input the total amount!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="planMinimumPrice"
            label="Minimum Deposit"
            rules={[
              { required: true, message: "Please input the minimum deposit!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="planMaximumPrice"
            label="Maximum Deposit"
            rules={[
              { required: true, message: "Please input the maximum deposit!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="minimumReturn"
            label="Minimum Return"
            rules={[
              { required: true, message: "Please input the minimum return!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="maximumReturn"
            label="Maximum Return"
            rules={[
              { required: true, message: "Please input the maximum return!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="giftBonus"
            label="Gift Bonus"
            rules={[
              { required: true, message: "Please input the gift bonus!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Deleting Plans */}
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        footer={[
          <Button key="cancel" onClick={handleDeleteCancel}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            danger
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this plan?</p>
      </Modal>
    </div>
  );
};

export default InvestmentPack;
