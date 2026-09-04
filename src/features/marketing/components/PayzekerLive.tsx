export default function PayzekerLive() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-[var(--green)] text-white">
      <div className="max-w-2xl px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          🎉 We Are Officially Live!
        </h1>

        <p className="text-lg md:text-xl mb-8">
          Payzeker is now open to everyone! Start performing tasks, earn
          rewards, and be part of a growing community that values transparency
          and opportunity.
        </p>

        <a
          href="/register"
          className="w-[50%] inline-block btn btn-ghost"
        >
          Get Started
        </a>

        <div className="mt-10 text-sm opacity-90">
          🚀 Launched on{" "}
          <span className="font-semibold">October 1st, 2025</span>
        </div>
      </div>
    </section>
  );
}
