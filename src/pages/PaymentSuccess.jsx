import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-6">
      <div className="bg-white p-12 rounded-sm shadow-sm border border-stone-200 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-600 w-12 h-12" />
        </div>
        <h1 className="serif text-3xl mb-4">Payment Successful!</h1>
        <p className="text-stone-500 text-sm mb-8">
          Thank you for supporting Bangladeshi heritage. Your order has been placed successfully and the artisans are being notified.
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/orders')}
            className="w-full brand-bg text-white py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
          >
            Track My Order
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full border border-stone-200 text-stone-600 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-50"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}