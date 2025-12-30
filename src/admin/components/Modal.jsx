export default function Modal({ title, isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md p-6 relative">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                    ✕
                </button>

                {children}
            </div>
        </div>
    );
}
