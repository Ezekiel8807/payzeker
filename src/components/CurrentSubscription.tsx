import React from "react";

type CurrentSubscriptionProps = {
    subInfo: {
        planName: string;
        subStartDate: Date | null;
        subEndDate: Date | null;
        subDuration: string;
    };
};

export default function CurrentSubscription({ subInfo }: CurrentSubscriptionProps) {
    const { planName, subStartDate, subEndDate, subDuration } = subInfo;

    const isExpired = subEndDate ? new Date(subEndDate).getTime() < Date.now() : true;
    const isActive = planName && !isExpired;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Current Subscription
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <p className="text-gray-500 text-sm mb-1">Plan</p>
                    <p className="font-bold text-lg text-[#29cd9c]">
                        {planName || "No Active Plan"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm mb-1">Status</p>
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                        {isActive ? "Active" : "Inactive / Expired"}
                    </div>
                </div>

                <div>
                    <p className="text-gray-500 text-sm mb-1">Start Date</p>
                    <p className="font-medium">
                        {subStartDate ? new Date(subStartDate).toLocaleDateString() : "-"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm mb-1">End Date</p>
                    <p className="font-medium">
                        {subEndDate ? new Date(subEndDate).toLocaleDateString() : "-"}
                    </p>
                </div>
            </div>

            {subDuration && (
                <div className="mt-4 pt-4 border-t border-dashed">
                    <p className="text-gray-500 text-sm">Duration: <span className="text-gray-800 font-medium">{subDuration}</span></p>
                </div>
            )}
        </div>
    );
}
