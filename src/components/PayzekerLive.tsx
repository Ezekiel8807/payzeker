export default function PayzekerLive() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-[#29cd9c] text-white">
      <div className="max-w-2xl px-6">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          🎉 We Are Officially Live!
        </h1>

        {/* Sub text */}
        <p className="text-lg md:text-xl mb-8">
          Payzeker is now open to everyone! Start performing tasks, earn
          rewards, and be part of a growing community that values transparency
          and opportunity.
        </p>

        {/* Call to action */}
        <a
          href="/register"
          className="inline-block bg-white text-[#29cd9c] font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </a>

        {/* Launch date */}
        <div className="mt-10 text-sm opacity-90">
          🚀 Launched on{" "}
          <span className="font-semibold">October 1st, 2025</span>
        </div>
      </div>
    </section>
  );
}
