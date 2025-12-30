

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../api/axiosInstance";

// // ───────────────────────────────
// // Async Thunks
// // ───────────────────────────────
// export const fetchGhlAccount = createAsyncThunk(
//   "ghl-account/fetch",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const user = state.auth.user;
//       if (!user) {
//         return rejectWithValue("User not logged in");
//       }

//       const res = await axiosInstance.get(`/api/ghl/get/${user.id}`);
//       return res.data.data; // a single object
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.error || "Failed to load account");
//     }
//   }
// );

// export const deleteGhlAccount = createAsyncThunk(
//   "ghl-account/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.delete(`/api/ghl/delete/${id}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.error || "Failed to delete account");
//     }
//   }
// );

// export const updateGhlAccount = createAsyncThunk(
//   "ghl-account/update",
//   async (data, { rejectWithValue }) => {
//     console.log(data)
//     try {
//       const res = await axiosInstance.put(`/api/ghl/update/${data.id}`, data);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.error || "Failed to update account");
//     }
//   }
// );

// // ───────────────────────────────
// // Slice
// // ───────────────────────────────
// const ghlAccountSlice = createSlice({
//   name: "ghl-account",
//   initialState: {
//     account: null,  // only one account now
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchGhlAccount.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchGhlAccount.fulfilled, (state, action) => {
//         state.account = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(fetchGhlAccount.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteGhlAccount.fulfilled, (state) => {
//         state.account = null; // cleared when deleted
//       })
//       .addCase(updateGhlAccount.fulfilled, (state, action) => {
//         state.account = action.payload; // replace with updated data
//       });
//   },
// });

// export default ghlAccountSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// ───────────────────────────────
// Async Thunks
// ───────────────────────────────
export const fetchGhlAccount = createAsyncThunk(
  "ghl-account/fetch",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const user = state.auth.user;
      if (!user) {
        return rejectWithValue("User not logged in");
      }

      const res = await axiosInstance.get(`/api/ghl/get/${user.id}`);
      return res.data.data; // a single object
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load account");
    }
  }
);

export const createGhlAccount = createAsyncThunk(
  "ghl-account/create",
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const user = state.auth.user;
      if (!user) {
        return rejectWithValue("User not logged in");
      }

      const payload = {
        userId: user.id,
        name: data.name,
        locationId: data.locationId,
        privateIntegrationKey: data.privateIntegrationKey,
      };

      const res = await axiosInstance.post("/api/ghl/create", payload);
      return res.data;
    } catch (err) {

      return rejectWithValue(err.response?.data || "Failed to create account");
    }
  }
);

export const deleteGhlAccount = createAsyncThunk(
  "ghl-account/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/api/ghl/delete/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to delete account");
    }
  }
);

export const updateGhlAccount = createAsyncThunk(
  "ghl-account/update",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/api/ghl/update/${data.id}`, data);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response?.data || "Failed to update account");
    }
  }
);

// ───────────────────────────────
// Slice
// ───────────────────────────────
const ghlAccountSlice = createSlice({
  name: "ghl-account",
  initialState: {
    account: null, // only one account now
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGhlAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGhlAccount.fulfilled, (state, action) => {
        state.account = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchGhlAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGhlAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGhlAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Account will be fetched again to get full details
      })
      .addCase(createGhlAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteGhlAccount.fulfilled, (state) => {
        state.account = null; // cleared when deleted
      })
      .addCase(updateGhlAccount.fulfilled, (state, action) => {
        state.account = action.payload; // replace with updated data
      });
  },
});

export default ghlAccountSlice.reducer;


