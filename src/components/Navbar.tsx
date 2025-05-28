import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-yellow-500 font-semibold text-xl">BNB Chain</span>
          </div>
          <div className="hidden lg:flex  items-center space-x-6">
            <a href="/"  rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500 transition-colors">
              Documentation
            </a>
            <a href="/"  rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500 transition-colors">
              Explorer
            </a>
          </div>
          <div className="lg:hidden text-gray-300 hover:text-yellow-500 transition-colors">
          <button >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 