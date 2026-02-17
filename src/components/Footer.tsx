const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 pt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Auction System 🏸
        </div>

        <div className="text-gray-500 text-xs mt-4 md:mt-0">
          Built with ❤️ by Deendayal Dhakad
        </div>
      </div>
    </footer>
  );
};

export default Footer;
