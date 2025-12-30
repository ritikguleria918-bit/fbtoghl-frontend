import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Fetch user dashboard data
export const fetchUserDashboard = createAsyncThunk(
    "userDashboard/fetchUserDashboard",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/api/facebook/dashboard");
            return res.data;  // Assuming this returns the structure you provided

        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to load user dashboard");
        }
    }
);

const userDashboardSlice = createSlice({
    name: "userDashboard",
    initialState: {
        totalAccounts: 0,
        errorAccounts: [],
        newMessageAccounts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserDashboard.fulfilled, (state, action) => {
                state.loading = false;
                const { total_accounts, error_accounts, new_message_accounts } = action.payload;
                state.totalAccounts = total_accounts;
                state.errorAccounts = error_accounts;
                state.newMessageAccounts = new_message_accounts;
            })
            .addCase(fetchUserDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default userDashboardSlice.reducer;
