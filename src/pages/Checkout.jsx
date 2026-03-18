import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  // Mock Cart Data - In a real app, this comes from a Global State/Context
  const [cartItems] = useState([
    { id: 1, name: "Traditional Roshmalai", price: 650, qty: 2, type: "food", shelfLife: "perishable", region: "Cumilla" },
    { id: 2, name: "Patisapta Pitha", price: 150, qty: 4, type: "food", shelfLife: "ultra-perishable", region: "Dhaka" },
    { id: 3, name: "Dhakai Jamdani", price: 25500, qty: 1, type: "fashion", shelfLife: "stable", region: "Narayanganj" }
  ]);

  // DELIVERY LOGIC: Group items by shelf-life for logistics
  const deliveryGroups = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      let group = "Global Express";
      if (item.shelfLife === "ultra-perishable") group = "Flash Delivery (Same-Day)";
      else if (item.shelfLife === "perishable") group = "Next-Day Chilled";
      
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {});
  }, [cartItems]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shippingFees = Object.keys(deliveryGroups).length * 120; // Charge per logistics track
  const total = subtotal + shippingFees;

  const handlePayment = (e) => {
    e.preventDefault();
    setStep(3); // Move to confirmation
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-sm shadow-sm border border-stone-200 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-600 w-12 h-12" />
          </div>
          <h1 className="serif text-3xl mb-4">Order Confirmed</h1>
          <p className="text-stone-500 text-sm mb-8">Your heritage items are being prepared by our master artisans. You will receive a tracking link via SMS.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full brand-bg text-white py-4 text-xs font-bold uppercase tracking-widest"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F7F2] min-h-screen py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Checkout Process */}
        <div className="lg:col-span-8">
          <div className="flex gap-8 mb-10 border-b border-stone-200 pb-4">
            <button className={`text-xs font-bold uppercase tracking-widest ${step === 1 ? 'brand-color border-b-2 border-[#A33B26]' : 'text-stone-400'}`}>01 Shipping</button>
            <button className={`text-xs font-bold uppercase tracking-widest ${step === 2 ? 'brand-color border-b-2 border-[#A33B26]' : 'text-stone-400'}`}>02 Payment</button>
          </div>

          {step === 1 ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h2 className="serif text-3xl">Shipping Address</h2>
              <form className="grid grid-cols-2 gap-4">
                <input className="col-span-2 p-4 border border-stone-200 focus:outline-none focus:border-[#A33B26]" placeholder="Full Name" />
                <input className="p-4 border border-stone-200 focus:outline-none focus:border-[#A33B26]" placeholder="Mobile (+880)" />
                <input className="p-4 border border-stone-200 focus:outline-none focus:border-[#A33B26]" placeholder="City" />
                <textarea className="col-span-2 p-4 border border-stone-200 h-32 focus:outline-none focus:border-[#A33B26]" placeholder="Street Address / Village Details"></textarea>
                <button 
                  onClick={() => setStep(2)}
                  className="col-span-2 brand-bg text-white py-4 text-xs font-bold uppercase tracking-widest mt-4"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h2 className="serif text-3xl">Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['bkash', 'nagad', 'card'].map((method) => (
                  <div 
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-6 border cursor-pointer transition-all ${paymentMethod === method ? 'border-[#A33B26] bg-white shadow-md' : 'border-stone-200 grayscale opacity-60'}`}
                  >
                    <div className="h-8 mb-4 flex items-center justify-center">
                      {method === 'bkash' && <span className="font-bold text-pink-600">bKash</span>}
                      {method === 'nagad' && <span className="font-bold text-orange-500">Nagad</span>}
                      {method === 'card' && <CreditCard className="text-stone-600" />}
                    </div>
                    <p className="text-[10px] uppercase tracking-tighter text-center font-bold">{method}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-8 border border-stone-200">
                <h4 className="font-bold text-sm mb-4">Pay via {paymentMethod.toUpperCase()}</h4>
                <p className="text-stone-500 text-xs mb-6">You will be redirected to the secure gateway to complete your ৳{total.toLocaleString()} payment.</p>
                <button 
                  onClick={handlePayment}
                  className="w-full brand-bg text-white py-4 text-xs font-bold uppercase tracking-widest"
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary & Logistics Grouping */}
        <div className="lg:col-span-4">
          <div className="sticky top-10 space-y-6">
            <div className="bg-white border border-stone-200 p-8 shadow-sm">
              <h3 className="serif text-xl mb-6">Your Heritage Box</h3>
              
              {/* LOGISTICS GROUPS */}
              {Object.entries(deliveryGroups).map(([groupName, items]) => (
                <div key={groupName} className="mb-8 last:mb-0">
                  <div className="flex items-center gap-2 mb-4">
                    <Truck className="w-4 h-4 brand-color" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A33B26]">{groupName}</span>
                  </div>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex flex-col">
                          <span className="text-stone-800">{item.name} <span className="text-stone-400 text-xs">x{item.qty}</span></span>
                          <span className="text-[10px] text-stone-400 italic">From {item.region}</span>
                        </div>
                        <span className="font-bold">৳{(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="border-t border-stone-100 mt-8 pt-6 space-y-3">
                <div className="flex justify-between text-sm text-stone-500">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-stone-500">
                  <span>Logistics Fee ({Object.keys(deliveryGroups).length} tracks)</span>
                  <span>৳{shippingFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-stone-900 mt-4">
                  <span>Total</span>
                  <span className="brand-color">৳{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-stone-100 text-[10px] text-stone-500 uppercase tracking-widest font-bold">
              <ShieldCheck className="w-5 h-5 text-[#A33B26]" />
              Authenticity & GI Protection Guaranteed
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}