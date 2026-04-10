import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2 } from 'lucide-react';

export default function Cart({ isOpen, onClose, cartItems = [] }) {
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Cart Sidebar */}
      <div className="relative w-full max-w-md bg-[#F9F7F2] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-white">
          <h2 className="serif text-2xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 brand-color" /> Your Collection
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 text-stone-400">
              <p className="serif text-xl mb-2">Your box is empty</p>
              <p className="text-xs uppercase tracking-widest">Add some heritage items to start</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-stone-100 pb-4">
                <div className="w-20 h-20 bg-stone-200 flex-shrink-0" />
                <div className="flex-grow">
                  <h4 className="font-bold text-sm text-stone-800">{item.name}</h4>
                  <p className="text-[10px] text-stone-500 uppercase">{item.region}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">৳ {item.price.toLocaleString()}</span>
                    <button className="text-stone-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-stone-200 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 text-sm italic">Subtotal</span>
              <span className="text-xl font-bold brand-color">৳ {total.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => { onClose(); navigate('/checkout'); }}
              className="w-full brand-bg text-white py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}