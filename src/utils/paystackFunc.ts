// Commented out - will be used when Paystack account is upgraded
// import { withdrawPaystackServer } from "@/actions/paystackAction";

//public key - accessed on client side
const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

// Client-side function for Paystack payment
export const payWithPaystack = (
  email: string,
  amount: number,
  onSuccess: (message: string) => void,
  onError: (message: string) => void,
  onRefresh?: () => void,
  callbackUrl?: string
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler = (window as any).PaystackPop.setup({
    key: publicKey,
    email,
    amount: amount * 100, // in kobo
    currency: "NGN",
    callback_url: callbackUrl, // Redirect to this URL on completion
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: function (response: any) {
      const reference = response.reference;
      // Send to backend for verification
      fetch("/api/paystack/verifyTransaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Refresh the UI to show updated balance
            if (onRefresh) {
              onRefresh();
            }
            onSuccess("Payment Successful");
          } else {
            onError("Payment verification failed");
          }
        })
        .catch(() => {
          onError("Failed to verify payment");
        });
    },
    onClose: function () {
      onError("Payment window closed");
    },
  });

  handler.openIframe();
};

/* ============================================
   AUTOMATIC PAYSTACK WITHDRAWAL (COMMENTED OUT)
   Uncomment this when Paystack account is upgraded
   ============================================ */

// export async function withdrawPaystack(amount: number) {
//   try {
//     const { withdrawPaystackServer } = await import("@/actions/paystackAction");
//     const result = await withdrawPaystackServer(amount);
//     return result;
//   } catch (error) {
//     console.error("Withdrawal error:", error);
//     return {
//       error: true,
//       message: "An unexpected error occurred during withdrawal",
//     };
//   }
// }

/* ============================================
   MANUAL WITHDRAWAL REQUEST (ACTIVE)
   Used until Paystack account is upgraded
   ============================================ */

export async function withdrawPaystack(amount: number) {
  try {
    const { createWithdrawalRequest } = await import(
      "@/actions/paystackAction"
    );
    const result = await createWithdrawalRequest(amount);
    return result;
  } catch (error) {
    console.error("Withdrawal error:", error);
    return {
      error: true,
      message: "An unexpected error occurred during withdrawal",
    };
  }
}
