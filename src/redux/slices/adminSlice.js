import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/**
 * Fetch all users (admin)
 */
export const fetchUsers = createAsyncThunk(
    "adminUsers/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/api/admin/users");
            // console.log(res.data);
            return res.data.users;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to load users"
            );
        }
    }
);

/**
 * Add new user
 */
export const addUser = createAsyncThunk(
    "adminUsers/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/api/admin/users/add", userData);
            return res.data.user;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to add user"
            );
        }
    }
);

/**
 * Update FB accounts limit for a user
 */
export const updateFbAccountsLimit = createAsyncThunk(
    "adminUsers/updateFbAccountsLimit",
    async ({ id, limit }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/api/admin/user/fb-accounts-limit", {
                id,
                limit,
            });
            return { id, limit, user: res.data.user };
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update FB accounts limit"
            );
        }
    }
);

export const updateScrapeSchedule = createAsyncThunk(
    "adminUsers/updateScrapeSchedule",
    async ({ id, scrape_schedule }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.patch("/api/admin/user/scrape-schedule/update", {
                id,
                scrape_schedule,
            });
            console.log(res.data)
            return { id, scrape_schedule, user: res.data.user };
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update FB accounts limit"
            );
        }
    }
);

const adminUsersSlice = createSlice({
    name: "adminUsers",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            /**
             * Fetch users
             */
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /**
             * Add user
             */
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.unshift(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.payload;
            })

            /**
             * Update FB accounts limit
             */
            .addCase(updateFbAccountsLimit.fulfilled, (state, action) => {
                const { id, limit } = action.payload;
                const user = state.users.find((u) => u.id === id);
                if (user) {
                    user.fb_accounts_limit = limit;
                }
            })
            .addCase(updateFbAccountsLimit.rejected, (state, action) => {
                state.error = action.payload;
            })

            // update scrape schedule
            .addCase(updateScrapeSchedule.fulfilled, (state, action) => {
                const { id, scrape_schedule } = action.payload;
                const user = state.users.find((u) => u.id === id);
                if (user) {
                    user.scrape_schedule = scrape_schedule;
                }
            })

            .addCase(updateScrapeSchedule.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default adminUsersSlice.reducer;
