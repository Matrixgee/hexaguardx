/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define TypeScript interfaces
export interface UserData {
  data: any[];
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  nationality: string;
  accountBalance: number;
  totalProfit: number;
  totalDeposit: number;
  totalBonus: number;
  totalWithdrawn: number;
  isAdmin: boolean;
  login: boolean;
  suspended: boolean;
  isVerified: boolean;
  status: string;
  deposits: any[];
  createdAt: string;
  updatedAt: string;
  activePlan: number;
  investmentPlan: number;
  referralBonus: number;
  investments: any[];
}

interface PaymentGateway {
  id: number;
  walletAddress: string;
  walletType: string;
  qrCodeFile: File | null;
  qrCodePreview: string | null;
}

interface UserState {
  user: UserData | null;
  token: string | null;
  adminToken: string | null;
  allAdminUsers: UserData[];
  adminTransactions: any[];
  adminInvestments: any[];
  userTransactions: any[];
  adminData: any | null;
  oneUser: UserData | null;
  paymentGateways: PaymentGateway[];
  plans: Plans[];
}

export interface Investment {
  _id: string;
  userId: string;
  amount: number;
  planName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  duration: string;
  status: string;
}

export interface Plans {
  _id: string; // Use _id if that's the unique identifier
  planName: string;
  planPrice: string; // Adjusted to string based on your data example
  planMinimumPrice: string;
  planMaximumPrice: string;
  minimumReturn: number;
  maximumReturn: number;
  giftBonus: number;
}

// Initial state
export const initialState: UserState = {
  user: null,
  token: null,
  adminToken: null,
  allAdminUsers: [],
  adminTransactions: [],
  adminInvestments: [],
  userTransactions: [],
  adminData: null,
  oneUser: null,
  paymentGateways: [],
  plans: [],
};

// Create userSlice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Userdata(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
    },
    userToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    adminToken(state, action: PayloadAction<string>) {
      state.adminToken = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.adminToken = null;
      state.allAdminUsers = [];
      state.adminTransactions = [];
      state.userTransactions = [];
      state.adminData = null;
      state.oneUser = null;
      state.paymentGateways = [];
      state.plans = [];
      state.adminInvestments = [];
    },
    userDeposit(state, action: PayloadAction<any>) {
      if (state.user) {
        state.user.deposits.push(action.payload);
      }
    },
    setAllUsers(state, action: PayloadAction<UserData[]>) {
      state.allAdminUsers = action.payload;
    },
    adminTransactionView(state, action: PayloadAction<any[]>) {
      state.adminTransactions = action.payload;
    },
    updateInvestmentPlan(state, action: PayloadAction<number>) {
      if (state.user) {
        state.user.investmentPlan = action.payload;
      }
    },
    AdminInvestmentPlan(state, action: PayloadAction<any[]>) {
      state.adminInvestments = action.payload;
    },
    setUserTransactions(state, action: PayloadAction<any[]>) {
      state.userTransactions = action.payload;
    },
    setAdminData(state, action: PayloadAction<any>) {
      state.adminData = action.payload;
    },
    setOneUser(state, action: PayloadAction<UserData>) {
      state.oneUser = action.payload;
    },
    setInvestments(state, action: PayloadAction<any[]>) {
      if (state.user) {
        state.user.investments = action.payload;
      }
    },
    setPaymentGateways(state, action: PayloadAction<PaymentGateway[]>) {
      state.paymentGateways = action.payload;
    },
    setPlan(state, action: PayloadAction<Plans[]>) {
      state.plans = action.payload;
    },
  },
});

// Export actions
export const {
  Userdata,
  userToken,
  adminToken,
  clearUser,
  userDeposit,
  setAllUsers,
  adminTransactionView,
  updateInvestmentPlan,
  setUserTransactions,
  setAdminData,
  setOneUser,
  setInvestments,
  setPaymentGateways,
  setPlan,
  AdminInvestmentPlan,
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
