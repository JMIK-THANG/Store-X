const HeroSection = () => {
  return (
    <section className="rounded-3xl bg-[#dfe8dd] overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[320px]">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            New Collection 2024
          </p>

          <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
            Curated for the
            <br />
            Essentialist.
          </h2>

          <p className="text-gray-600 max-w-md mb-6">
            Thoughtfully selected pieces that blend timeless design with modern
            utility.
          </p>

          <div className="flex gap-3">
            <button className="bg-[#4f6f52] text-white px-5 py-3 rounded-full text-sm">
              Explore Collection
            </button>
            <button className="bg-white px-5 py-3 rounded-full text-sm border">
              Our Story
            </button>
          </div>
        </div>

        <div className="hidden md:block bg-gradient-to-br from-[#cfd8cc] to-[#f2eadf]" />
      </div>
    </section>
  );
};

export default HeroSection;