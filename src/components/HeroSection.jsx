import img from "../assets/hero-img.jpg";

const HeroSection = () => {
  return (
    <section className="relative rounded-2xl overflow-hidden h-[38vh] md:h-[45vh] w-full">
      
      {/* Background */}
      <img
        src={img}
        alt="Store-X hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-10">
        <div className="max-w-xl text-white">

          <p className="text-xs uppercase tracking-widest text-gray-300 mb-2">
            Trending Now
          </p>

          <h1 className="text-2xl md:text-4xl font-semibold leading-tight">
            Shop fashion, tech, and jewelry
          </h1>

          <p className="text-sm text-gray-200 mt-2 mb-4">
            Discover products made for everyday life.
          </p>

          <button className="bg-white text-black px-5 py-2 text-sm rounded-full hover:opacity-90 transition">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;