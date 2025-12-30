import { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/slices/adminSlice";
export default function AddUserModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.admin);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        fbAccountsLimit: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: form.name,
            email: form.email,
            password: form.password,
            limit: Number(form.fbAccountsLimit),
        };

        const result = await dispatch(addUser(payload));

        if (addUser.fulfilled.match(result)) {
            // reset form + close modal
            setForm({
                name: "",
                email: "",
                password: "",
                fbAccountsLimit: "",
            });
            onClose();
        }
    };


    return (
        <Modal title="Add User" isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded"
                />

                <input
                    name="fbAccountsLimit"
                    type="number"
                    placeholder="FB Accounts Limit"
                    value={form.fbAccountsLimit}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-green-500 text-black py-2 rounded font-semibold hover:bg-green-400"
                >
                    Create User
                </button>
            </form>
        </Modal>
    );
}
