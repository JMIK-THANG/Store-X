const NewsletterSection = () => {
  return (
    <section className="bg-[#eef1ed] rounded-3xl px-6 py-14 text-center">
      <div className="max-w-xl mx-auto">
        <div className="w-10 h-10 rounded-full bg-[#d7e5d6] mx-auto mb-4 flex items-center justify-center">
          ✉️
        </div>

        <h3 className="text-2xl font-semibold mb-3">Curated Inbox</h3>

        <p className="text-gray-600 mb-6">
          Receive weekly collections, exclusive member pricing, and insights
          into our design process.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Your email address"
            className="border rounded-full px-4 py-3 w-full sm:w-72 bg-white"
          />
          <button className="bg-[#4f6f52] text-white px-5 py-3 rounded-full">
            Join Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;