import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGhlAccount,
  createGhlAccount,
  deleteGhlAccount,
  updateGhlAccount,
} from "../redux/slices/ghlAccountSlice";
import { Edit2, Trash2, Plus, Check, X } from "lucide-react";

const GHLAccounts = () => {
  const dispatch = useDispatch();
  const [showTutorial, setShowTutorial] = useState(false);

  // Redux state
  const account = useSelector((state) => state.ghlAccount.account);
  const loading = useSelector((state) => state.ghlAccount.loading);
  const error = useSelector((state) => state.ghlAccount.error);
  const user = useSelector((state) => state.auth.user);
  const [addError, setAddError] = useState("");
  const [updateError, setUpdateError] = useState("");
  console.log(updateError)
  // Local state for editing and adding
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [addForm, setAddForm] = useState({
    name: "",
    privateIntegrationKey: "",
    locationId: "",
  });
  const requiredScopes = [
    "contacts.readonly",
    "contacts.write",
    "conversations.readonly",
    "conversations.write",
    "conversations/message.readonly",
    "conversations/message.write",
    "locations.readonly",
    "locations/customFields.readonly",
    "locations/customFields.write"
  ];
  // Fetch account on mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchGhlAccount());
    }
  }, [dispatch, user]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      dispatch(deleteGhlAccount(account.id));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...account });
  };

  const handleSave = async () => {
    if (
      !editForm.name ||
      !editForm.private_integration_key ||
      !editForm.location_id
    ) {
      alert("All fields are required!");
      return;
    }

    // dispatch(updateGhlAccount(editForm));
    // setIsEditing(false);
    // setEditForm({});
    // dispatch(fetchGhlAccount());
    try {
      await dispatch(updateGhlAccount(editForm)).unwrap(); // ← success only
      await dispatch(fetchGhlAccount());                   // ← runs only if update was successful

      setIsEditing(false);
      setEditForm({});
    } catch (err) {
      console.error("Update failed:", err);
      // optional: show error to UI
      setUpdateError(err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({});
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCreateAccount = async () => {
    if (
      !addForm.name ||
      !addForm.privateIntegrationKey ||
      !addForm.locationId
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      await dispatch(createGhlAccount(addForm)).unwrap();
      // Fetch the newly created account
      await dispatch(fetchGhlAccount());
      // Reset form and close
      setAddForm({
        name: "",
        privateIntegrationKey: "",
        locationId: "",
      });
      setIsAdding(false);
    } catch (err) {
      console.log(err)
      setAddError(err);
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setAddForm({
      name: "",
      privateIntegrationKey: "",
      locationId: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading account...</div>
      </div>
    );
  }

  if (error && !isAdding && error !== "Account not found") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-red-400 text-lg">Error: {error}</div>
      </div>
    );
  }

  // Show add form when no account exists or user clicks "Add Account"
  if ((!account || Object.keys(account).length === 0) && !isAdding) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Add Account
        </button>
      </div>
    );
  }

  // Add Account Form
  if (isAdding) {
    return (

      <div className="min-h-screen bg-gray-950 p-8">

        <div className="mb-4">
          <p className="text-gray-400 text-sm">
            Don’t know how to get your Location ID or Private Integration Key?
          </p>
          <button
            onClick={() => setShowTutorial(!showTutorial)}
            className="mt-1 text-green-500 hover:text-green-400 text-sm underline"
          >
            {showTutorial ? "Hide Tutorial" : "Check Here"}
          </button>
        </div>

        {showTutorial && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6 text-gray-200 text-sm space-y-4">

            {/* Section 1: Subaccount Notice */}
            <div>
              <h2 className="font-semibold text-gray-100 mb-1">1. IMPORTANT</h2>
              <p className="text-gray-300">
                Please use a <strong>Sub-Account</strong> instead of an Agency Account.
              </p>
            </div>

            {/* Section 2: Location ID */}
            <div>
              <h2 className="font-semibold text-gray-100 mb-1">2. How to Get Your Location ID</h2>
              <ol className="list-decimal ml-5 text-gray-300 space-y-1">
                <li>Log into your GHL Sub-Account.</li>
                <li>Go to <strong>Settings</strong>.</li>
                <li>Find the <strong>Location ID</strong> </li>
              </ol>
            </div>

            {/* Section 3: Private Integration Key */}
            <div>
              <h2 className="font-semibold text-gray-100 mb-1">3. How to Get Your Private Integration Key</h2>
              <ol className="list-decimal ml-5 text-gray-300 space-y-1">
                <li>Go to <strong>Settings → Private Integrations</strong>.</li>
                <li>Click <strong>Create New Integration</strong>.</li>
                <li>Name it and add a description (Description is optional).</li>
                <li>Select the required scopes
                  <div className="ml-5 text-gray-300 space-y-1">
                    {requiredScopes.map((scope, index) => (
                      <div key={index}><b>{scope}</b></div>
                    ))}
                  </div>
                </li>
                <li>Click <strong>Create</strong>.</li>
              </ol>
            </div>

          </div>
        )}


        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-100">
              Add GHL Account
            </h1>
          </div>
          {addError && <div className="error">
            <p className="text-red-500">{addError?.message}</p>
            {addError.scopes && <p className="text-red-500">Missing scope:
              {addError.scopes.map((scope, index) => (
                <div key={index}><b>{scope}</b></div>
              ))}</p>}
          </div>}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Account Name *
                </label>
                <input
                  type="text"
                  required
                  value={addForm.name}
                  onChange={(e) =>
                    setAddForm({ ...addForm, name: e.target.value })
                  }
                  placeholder="Enter account name"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Private Integration Key *
                </label>
                <input
                  type="text"
                  required
                  value={addForm.privateIntegrationKey}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      privateIntegrationKey: e.target.value,
                    })
                  }
                  placeholder="Enter your private integration key"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Location ID *
                </label>
                <input
                  type="text"
                  required
                  value={addForm.locationId}
                  onChange={(e) =>
                    setAddForm({ ...addForm, locationId: e.target.value })
                  }
                  placeholder="Enter location ID"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-green-600"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleCreateAccount}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  <Check size={16} />
                  {loading ? "Creating..." : "Create Account"}
                </button>
                <button
                  onClick={handleCancelAdd}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">  
          <h1 className="text-2xl font-bold text-gray-100">GHL Account</h1>
        </div>

        <div className="bg-gray-900 border border-gray-800 text-red-400 text-lg rounded-lg p-6">
          {updateError?.scopes && (
            <div className="mt-1 text-sm">
              <p className="font-semibold text-xl">Error:{updateError.message}</p>
              Missing scopes:
              {updateError.scopes.map((scope) => (
                <div key={scope} className="font-semibold">{scope}</div>
              ))}
            </div>
          )}

          {isEditing ? (
            // Edit Mode
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Account Name *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  API Key *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.private_integration_key || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      private_integration_key: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Location ID *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.location_id || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location_id: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-green-600"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Check size={16} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <>
              <div className="flex justify-between items-start mb-4">


                <h3 className="text-lg font-semibold text-gray-100">
                  {account.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${account.status === "active"
                    ? "bg-green-600 text-white "
                    : "bg-gray-700 text-gray-300"
                    }`}
                >
                  {account.status || "Unknown"}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-gray-400">API Key</p>  
                  <p className="text-sm text-gray-200 font-mono break-all">
                    {account.private_integration_key}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location ID</p>
                  <p className="text-sm text-gray-200 font-mono">
                    {account.location_id}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-800">
                <button
                  onClick={handleEdit}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg font-medium transition-colors"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-900 hover:bg-red-800 text-red-200 rounded-lg font-medium transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GHLAccounts;