import {  withdrawPaystackServer } from "@/actions/paystackAction";

//public key - accessed on client side
const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

// Client-side function for Paystack payment
export const payWithPaystack = (
  email: string,
  amount: number,
  onSuccess: (message: string) => void,
  onError: (message: string) => void
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler = (window as any).PaystackPop.setup({
    key: publicKey,
    email,
    amount: amount * 100, // in kobo
    currency: "NGN",
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

// Client-side wrapper function for withdrawal
export async function withdrawPaystack(amount: number) {
  try {
    const result = await withdrawPaystackServer(amount);
    return result;
  } catch (error) {
    console.error("Withdrawal error:", error);
    return {
      error: true,
      message: "An unexpected error occurred during withdrawal",
    };
  }
}

