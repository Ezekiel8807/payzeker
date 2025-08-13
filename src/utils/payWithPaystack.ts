import { getToken } from "@/actions/action";
import { redirect } from "next/navigation";

//public key
const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

export const payWithPaystack = async (
  email: string,
  amount: number,
  setErrmsg: React.Dispatch<React.SetStateAction<string>>,
  setIserr: React.Dispatch<React.SetStateAction<boolean>>,
  setIssuc: React.Dispatch<React.SetStateAction<boolean>>,
  setSucmsg: React.Dispatch<React.SetStateAction<string>>,
  setBalance: React.Dispatch<React.SetStateAction<number>>
) => {
  const userToken = await getToken();
  if (!userToken) redirect("/login");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler = (window as any).PaystackPop.setup({
    key: publicKey, // your public key
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
            setBalance((e) => (e += amount));

            setSucmsg("Payment Successful");
            setIssuc(true);

            //
          } else {
            setErrmsg("Payment verification failed");
            setIserr(true);
          }
        });
    },
    onClose: function () {
      setErrmsg("Payment window closed.");
      setIserr(true);
    },
  });

  handler.openIframe();
};
