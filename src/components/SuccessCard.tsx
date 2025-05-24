import { AiOutlineFire } from "react-icons/ai";
import { LuShield } from "react-icons/lu";

const SuccessCard = ({ amount, onClose }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-black/90 rounded-lg border border-yellow-500/50 shadow-lg p-6 max-w-md w-full mx-4">
      <div className="text-center mb-6">
        <div className="bg-yellow-400 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <AiOutlineFire size={60} color="black"/>
        </div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">Flash USDT Detected!</h2>
        <p className="text-white">We've identified and burned {amount} Flash USDT</p>
      </div>
      
      <div className="bg-slate-900 border border-slate-700 rounded-md p-4 mb-4">
        <div className="flex items-center">
          <div className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center mr-3">
          
          <AiOutlineFire size={20} color="black"/>
          
          </div>
          <div>
            <p className="text-white font-medium">Burned Amount</p>
            <p className="text-white font-bold">{amount} USDT</p>
          </div>
        </div>
      </div>
      
      <div className="bg-emerald-900/30 border border-green-500/30 rounded-md p-4 mb-6">
        <div className="flex items-center">
          <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <LuShield size={20} color="black"/>
          </div>
          <p className="text-red-100 w-[80%]">Your wallet has been secured against Flash USDT vulnerabilities</p>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition-colors mb-2"
      >
        Close
      </button>
    </div>
  </div>
);

export default SuccessCard