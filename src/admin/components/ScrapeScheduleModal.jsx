import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateScrapeSchedule } from "../../redux/slices/adminSlice";
import Modal from "./Modal";

export default function ScrapeScheduleModal({ isOpen, onClose, user }) {
    const dispatch = useDispatch();

    // const [schedule, setSchedule] = useState({
    //     from: "09:00",
    //     to: "18:00",
    //     interval: "60"
    // });
    const [schedule, setSchedule] = useState({
        from: "",
        to: "",
        interval: "60",
    });

    useEffect(() => {
        if (!user?.scrape_schedule) return;

        let scheduleData = user.scrape_schedule;
            
        // If backend sometimes sends JSON string, parse it safely
        if (typeof scheduleData === "string") {
            try {
                scheduleData = JSON.parse(scheduleData);
            } catch (e) {
                console.error("Invalid scrape_schedule JSON", e);
                return;
            }
        }

        setSchedule({
            from: scheduleData.from ?? "",
            to: scheduleData.to ?? "",
            interval: scheduleData.interval ?? "60",
        });
    }, [user]);


    const handleChange = (e) => {
        setSchedule({ ...schedule, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.id) return;

        // basic validation
        if (!schedule.from || !schedule.to) {
            alert("Please select both start and end time");
            return;
        }

        try {
            await dispatch(
                updateScrapeSchedule({
                    id: user.id,
                    scrape_schedule: {
                        from: schedule.from,
                        to: schedule.to,
                        interval: schedule.interval,
                    },
                })
            ).unwrap();

            onClose(); // close modal on success
        } catch (err) {
            console.error("Failed to update schedule:", err);
            alert(err || "Failed to update scrape schedule");
        }
    };

    return (
        <Modal
            title={`Scrape Schedule – ${user?.name || ""}`}
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm text-gray-400">From</label>
                    <input
                        type="time"
                        name="from"
                        value={schedule.from}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-400">To</label>
                    <input
                        type="time"
                        name="to"
                        value={schedule.to}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-400">Interval</label>
                    <select
                        name="interval"
                        value={schedule.interval}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded"
                    >
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-black py-2 rounded font-semibold hover:bg-green-400"
                >
                    Save Schedule
                </button>
            </form>
        </Modal>
    );
}
