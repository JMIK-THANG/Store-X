import img from "../assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-green-50 rounded-3xl overflow-hidden min-h-[260px] md:min-h-[340px] flex items-center justify-between mb-10 shadow-sm">
      {/* Left Content */}
      <div className="z-10 px-6 md:px-16 py-12 max-w-xl">
        <p className="text-xs uppercase tracking-[0.25em] text-green-700 mb-3">
          Trending Now
        </p>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-green-900">
          Shop fashion, tech, <br /> and jewelry
        </h1>

        <p className="text-sm md:text-base text-gray-600 mt-4 mb-7">
          Discover products made for everyday life.
        </p>

        <button className="bg-green-900 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-green-800 transition">
          Buy Now
        </button>
      </div>

      {/* Right Image */}
      <div className="hidden md:block h-full w-[48%] absolute right-0 bottom-0">
        <img
          src={img}
          alt="Store-X hero"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Soft divider between text and image */}
      <div className="hidden md:block absolute right-[48%] top-0 h-full w-24 bg-gradient-to-r from-green-50 to-transparent" />
    </section>
  );
};

export default HeroSection;