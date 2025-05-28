const BnbChainInfo = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-transparent to-black/20 backdrop-blur-sm border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-yellow-500 mb-12 text-center">Why Choose BNB Chain?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-black/30 p-8 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-colors">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">High Performance</h3>
            <p className="text-gray-300">
              Process up to 300 transactions per second with minimal fees, making it one of the fastest and most cost-effective blockchain networks.
            </p>
          </div>
          
          <div className="bg-black/30 p-8 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-colors">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">Cross-Chain Compatibility</h3>
            <p className="text-gray-300">
              Seamlessly interact with multiple blockchain networks through the BNB Chain ecosystem, enabling diverse DeFi opportunities.
            </p>
          </div>
          
          <div className="bg-black/30 p-8 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-colors">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">Robust Security</h3>
            <p className="text-gray-300">
              Built on a proof-of-staked-authority consensus mechanism, ensuring high security and decentralization while maintaining efficiency.
            </p>
          </div>
          
          <div className="bg-black/30 p-8 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-colors">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">Thriving Ecosystem</h3>
            <p className="text-gray-300">
              Access a vast ecosystem of DApps, DeFi protocols, and Web3 services, all powered by the innovative BNB Chain technology.
            </p>
          </div>
        </div>

        {/* <div className="mt-12 text-center">
          <a 
            href="https://www.bnbchain.org/en/developers" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 transition-colors px-8 py-4 rounded-full text-black font-semibold"
          >
            <span>Start Building on BNB Chain</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div> */}
      </div>
    </section>
  )
}

export default BnbChainInfo 