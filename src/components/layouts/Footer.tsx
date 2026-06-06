const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">PokeStore</h3>
          <p className="text-gray-400 text-sm">
            Your one-stop shop for all things Pokémon.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Twitter</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Instagram</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} PokeStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;