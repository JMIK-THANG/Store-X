const Footer = () => {
  return (
    <footer className="border-t mt-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 text-sm text-gray-600">
        
        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold text-black">Store-X</h2>
          <p className="mt-2">
            Your one-stop shop for everything. Quality products, fast delivery,
            and great prices.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-black mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">Shop</li>
            <li className="hover:text-black cursor-pointer">About</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-black mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-black">Facebook</span>
            <span className="cursor-pointer hover:text-black">Instagram</span>
            <span className="cursor-pointer hover:text-black">Twitter</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t py-4 text-center text-xs text-gray-500">
        © 2026 Store-X. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;