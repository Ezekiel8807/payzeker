import Footer from "@/shared/components/layout/Footer";
import Header from "@/shared/components/layout/Header";

export default function page() {
  return (
    <>
      <Header />

      <div className="page-container py-5 sm:py-10 text-gray-800 leading-relaxed">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Effective Date: October 2025
        </p>

        <p className="mb-4">
          Welcome to <strong>Payzeker</strong>. By accessing or using our
          platform, you agree to comply with and be bound by these Terms of
          Service. Please read them carefully before using our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
        <p className="mb-4">
          You must be at least 18 years old or have parental/guardian permission
          to use Payzeker. By creating an account, you confirm that the
          information you provide is accurate and truthful.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. User Responsibilities
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Provide accurate registration details.</li>
          <li>
            Do not misuse the platform (fraud, spam, fake task completion).
          </li>
          <li>Respect other users and maintain ethical use of Payzeker.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Earnings & Payments
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Earnings are based on valid task completions and platform rules.
          </li>
          <li>
            Withdrawals may be subject to verification and processing timelines.
          </li>
          <li>
            Payzeker is not responsible for delays caused by third-party payment
            providers.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Account Suspension
        </h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate accounts involved in
          fraudulent activity, misuse of services, or violations of these terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          5. Limitation of Liability
        </h2>
        <p className="mb-4">
          Payzeker provides services on an &quot;as-is&quot; basis. We are not
          liable for any indirect, incidental, or consequential damages
          resulting from your use of the platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms of Service from time to time. Continued use
          of Payzeker after updates means you accept the revised terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at:
          <br />
          <a
            href="mailto:support@payzeker.com"
            className="text-blue-600 underline"
          >
            support@payzeker.com
          </a>
        </p>

        <p className="text-sm text-gray-600 mt-8">
          By using Payzeker, you agree to abide by these Terms of Service.
        </p>
      </div>

      <Footer />
    </>
  );
}
