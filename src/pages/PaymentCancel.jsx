import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCcw } from 'lucide-react';

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-6">
      <div className="bg-white p-12 rounded-sm shadow-sm border border-stone-200 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="text-red-600 w-12 h-12" />
        </div>
        <h1 className="serif text-3xl mb-4">Payment Cancelled</h1>
        <p className="text-stone-500 text-sm mb-8">
          The transaction was not completed. If this was a mistake, you can try again from your checkout page.
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full brand-bg text-white py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" /> Try Again
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full border border-stone-200 text-stone-600 py-4 text-xs font-bold uppercase tracking-widest"
          >
            Return to Store
          </button>
        </div>
      </div>
    </div>
  );
}