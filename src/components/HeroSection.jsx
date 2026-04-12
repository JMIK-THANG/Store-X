const HeroSection = () => {
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full">
      {/* Background Image */}
     <img
  src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?w=1200"
  alt="Hero"
  className="absolute inset-0 w-full h-full object-cover"
/>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 md:px-8 lg:px-16">
        <div className="max-w-xl text-white">
          <p className="uppercase text-sm tracking-widest mb-3">
            New Arrivals
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Find Your
            <br />
            Everyday Style
          </h2>

          <p className="text-gray-200 mb-6">
            Simple, clean products made for daily life.
          </p>

          <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;