import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: "light" | "dark";
}

// ✅ Load saved theme from localStorage or fallback to 'light'
const savedTheme =
  (localStorage.getItem("theme") as "light" | "dark") || "light";

const initialState: ThemeState = {
  theme: savedTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme); // persist to localStorage
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload); // persist to localStorage
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
