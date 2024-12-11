
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2">Featured Content</h3>
            <p className="hover:text-blue-400 transition duration-300 cursor-pointer">Featured Blogs</p>
            <p className="hover:text-blue-400 transition duration-300 cursor-pointer">Most viewed</p>
            <p className="hover:text-blue-400 transition duration-300 cursor-pointer">Readers Choice</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <p className="hover:text-blue-400 transition duration-300 cursor-pointer">Forum</p>
            <p className="hover:text-blue-400 transition duration-300 cursor-pointer">Support</p>
            <p className="hover:text-blue-400 transition duration-300 cursor-pointer">Recent Posts</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2">Legal</h3>
            <p className="hover:text-blue-400 transition duration-300 cursor-pointer">Privacy Policy</p>
            <p className="hover:text-blue-400 transition duration-300 cursor-pointer">About Us</p>
            <p className="hover:text-blue-400 transition duration-300 cursor-pointer">Terms & Conditions</p>
            <p className="hover:text-blue-400 transition duration-300 cursor-pointer">Terms of Service</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py-4">
        <p className="text-center text-sm">All rights reserved @BlogItAll 2024</p>
      </div>
    </footer>
  )
}

export default Footer