"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const reference = searchParams.get("reference");
    const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");

    useEffect(() => {
        if (!reference) {
            setStatus("failed");
            return;
        }

        const verifyPayment = async () => {
            try {
                const res = await fetch("/api/paystack/verifyTransaction", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ reference }),
                });

                const data = await res.json();

                if (data.success) {
                    setStatus("success");
                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 2000);
                } else {
                    setStatus("failed");
                }
            } catch (error) {
                console.error("Verification error", error);
                setStatus("failed");
            }
        };

        verifyPayment();
    }, [reference, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                {status === "verifying" && (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Verifying Payment...</h2>
                        <p className="text-gray-500 mt-2">Please wait while we confirm your deposit.</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="text-green-500 text-5xl mb-4">✅</div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Successful!</h2>
                        <p className="text-gray-500 mt-2">Your account has been credited.</p>
                        <p className="text-sm text-gray-400 mt-4">Redirecting to dashboard...</p>
                    </>
                )}

                {status === "failed" && (
                    <>
                        <div className="text-red-500 text-5xl mb-4">❌</div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Verification Failed</h2>
                        <p className="text-gray-500 mt-2">We couldn't verify your payment. If you have been debited, please contact support.</p>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                        >
                            Return to Dashboard
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function VerifyPaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
}
