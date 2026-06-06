export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-12 shadow-inner">
      <div className="container mx-auto px-4 text-center text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="/catalog" className="hover:text-poke-yellow transition-colors duration-200">All Products</a></li>
              <li><a href="/categories/pokemon" className="hover:text-poke-yellow transition-colors duration-200">Pokemon</a></li>
              <li><a href="/categories/items" className="hover:text-poke-yellow transition-colors duration-200">Items</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-poke-yellow transition-colors duration-200">Our Story</a></li>
              <li><a href="/contact" className="hover:text-poke-yellow transition-colors duration-200">Contact</a></li>
              <li><a href="/careers" className="hover:text-poke-yellow transition-colors duration-200">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="/faq" className="hover:text-poke-yellow transition-colors duration-200">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-poke-yellow transition-colors duration-200">Shipping & Returns</a></li>
              <li><a href="/privacy" className="hover:text-poke-yellow transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 mt-8">
          <p>&copy; {new Date().getFullYear()} PokeStore. All rights reserved.</p>
          <p className="mt-2">Built with ❤️ by Your Name/Team</p>
        </div>
      </div>
    </footer>
  );
}