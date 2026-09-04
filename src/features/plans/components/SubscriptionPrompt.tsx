import Link from "next/link";

export default function SubscriptionPrompt() {
    return (
        <div className="card mt-6 w-full mx-auto">
            <div className="flex items-start justify-between">
                <h2 className="w-[90%] text-2xl font-bold text-[var(--green)] mb-3 flex items-center gap-2">
                    🔓 Unlock Your Daily Earnings! 🚀
                </h2>
            </div>
            <p className="text-ink-soft mb-6">
                Your tasks are waiting for you! Subscribe a plan today to start earning real cash for every task you complete. Don't let your potential wait!
            </p>
            <div className="flex flex-wrap gap-4">
                <Link
                    href="/subscription"
                    className="btn btn-primary"
                >
                    Subscribe
                </Link>
                <Link
                    href="/subscription"
                    className="btn btn-ghost"
                >
                    View Plans
                </Link>
            </div>
        </div>
    );
}
