import Link from "next/link";

export default function SubscriptionPrompt() {
    return (
        <div className="bg-[#e6fff7] p-5 rounded-2xl shadow-md mt-6 w-full mx-auto">
            <div className="flex items-start justify-between">
                <h2 className="w-[90%] text-2xl font-bold text-[#29cd9c] mb-3 flex items-center gap-2">
                    🔓 Unlock Your Daily Earnings! 🚀
                </h2>
            </div>
            <p className="text-gray-700 mb-6">
                Your tasks are waiting for you! Subscribe a plan today to start earning real cash for every task you complete. Don't let your potential wait!
            </p>
            <div className="flex flex-wrap gap-4">
                <Link
                    href="/subscription"
                    className="bg-[#29cd9c] hover:bg-[#22b891] text-white font-medium px-6 py-2 rounded-xl transition-all duration-200"
                >
                    Subscribe
                </Link>
                <Link
                    href="/subscription"
                    className="border border-[#29cd9c] text-[#29cd9c] hover:bg-[#f0fffa] font-medium px-6 py-2 rounded-xl transition-all duration-200"
                >
                    View Plans
                </Link>
            </div>
        </div>
    );
}
