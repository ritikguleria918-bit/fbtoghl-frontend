// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     fetchProductsByFBAccount,
//     updateAutomatedMessage
// } from "../redux/slices/fbAccountsSlice";

// export default function AutomatedMessageModal({ isOpen, onClose, account }) {
//     const dispatch = useDispatch();
//     const [selectedProduct, setSelectedProduct] = useState("");
//     const [message, setMessage] = useState("");
//     const products = useSelector(
//         (state) => state.fbAccounts.productsByAccount[account?.id] || []
//     );
//     console.log(products)

//     useEffect(() => {
//         if (isOpen && account) {
//             dispatch(fetchProductsByFBAccount(account.id));
//         }
//     }, [isOpen, account, dispatch]);

//     const handleSubmit = () => {
//         dispatch(
//             updateAutomatedMessage({
//                 id: selectedProduct,
//                 message: message
//             })
//         );
//         onClose();
//     };
//     useEffect(() => {
//         if (!selectedProduct) {
//             setMessage("");
//             return;
//         }

//         const product = products.find(p => p.id === selectedProduct);
//         setMessage(product?.message || "");
//     }, [selectedProduct, products]);

//     if (!isOpen || !account) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-gray-800 p-6 rounded-xl w-[400px] text-gray-200">
//                 <h2 className="text-xl mb-4 font-semibold">Automated Message</h2>

//                 {/* Product Select */}
//                 <label className="block mb-2">Select Product</label>
//                 <select
//                     className="w-full p-2 mb-4 bg-gray-900 rounded"
//                     value={selectedProduct}
//                     onChange={(e) => setSelectedProduct(e.target.value)}
//                 >
//                     <option value="">-- Select Product --</option>
//                     {products.map((p) => (
//                         <option key={p.id} value={p.id}>
//                             {p.product}
//                         </option>
//                     ))}
//                 </select>

//                 {/* Message Input */}
//                 <label className="block mb-2">Message</label>
//                 <textarea
//                     className="w-full h-28 p-2 bg-gray-900 rounded"
//                     // value={products.map((p) => p.id === selectedProduct ? p.message : message)}
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />

//                 <div className="flex justify-end gap-3 mt-4">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 bg-gray-600 rounded"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         disabled={!selectedProduct}
//                         onClick={handleSubmit}
//                         className="px-4 py-2 bg-green-600 rounded"
//                     >
//                         Save Message
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProductsByFBAccount,
    updateAutomatedMessage
} from "../redux/slices/fbAccountsSlice";

export default function AutomatedMessageModal({ isOpen, onClose, account }) {
    const dispatch = useDispatch();

    const [selectedProduct, setSelectedProduct] = useState("");
    const [message, setMessage] = useState("");

    const products = useSelector(
        (state) => state.fbAccounts.productsByAccount[account?.id] || []
    );

    // Fetch products when modal opens
    useEffect(() => {
        if (isOpen && account?.id) {
            dispatch(fetchProductsByFBAccount(account.id));
        }
    }, [isOpen, account?.id, dispatch]);

    // Handle product change and auto-fill message
    const handleProductChange = (e) => {
        const productId = Number(e.target.value);
        setSelectedProduct(productId);

        if (!productId) {
            setMessage("");
            return;
        }

        const product = products.find(p => p.id === productId);
        setMessage(product?.message || "");
    };

    const handleSubmit = () => {
        if (!selectedProduct) return;

        dispatch(
            updateAutomatedMessage({
                id: selectedProduct,
                message
            })
        );

        onClose();
    };

    if (!isOpen || !account) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl w-[400px] text-gray-200">
                <h2 className="text-xl mb-4 font-semibold">
                    Automated Message
                </h2>

                {/* Product Select */}
                <label className="block mb-2">Select Product</label>
                <select
                    className="w-full p-2 mb-4 bg-gray-900 rounded"
                    value={selectedProduct}
                    onChange={handleProductChange}
                >
                    <option value="">-- Select Product --</option>
                    {products.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.product}
                        </option>
                    ))}
                </select>

                {/* Message Input */}
                <label className="block mb-2">Message</label>
                <textarea
                    className="w-full h-28 p-2 bg-gray-900 rounded"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter automated reply..."
                />

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={!selectedProduct}
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-600 rounded disabled:opacity-50"
                    >
                        Save Message
                    </button>
                </div>
            </div>
        </div>
    );
}
