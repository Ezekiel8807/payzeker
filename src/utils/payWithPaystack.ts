// import axios from "axios"

export const payWithPaystack = async (email: string, amount: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler = (window as any).PaystackPop.setup({
    key: "pk_test_3822fcf2427d322dff6aeda676648a48bd4fdfab", // your public key
    email,
    amount: amount * 100, // in kobo
    currency: "NGN",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: function (response: any) {
      // Called after successful payment
      const reference = response.reference;
      // Send to backend for verification and updating UI
      fetch("/api/paystack/verifyTransaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Update your UI with the new balance or status
            alert("Payment Successful");
          } else {
            alert("Verification failed");
          }
        });
    },
    onClose: function () {
      alert("Payment window closed.");
    },
  });

  handler.openIframe();
};
