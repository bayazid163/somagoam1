import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { initiatePayment } from '../services/payment'; 

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [loading, setLoading] = useState(false);

  // 1. STATE FOR USER DETAILS
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: ''
  });

  // Mock Cart Data
  const [cartItems] = useState([
    { id: 1, name: "Traditional Roshmalai", price: 650, qty: 2, type: "food", shelfLife: "perishable", region: "Cumilla" },
    { id: 2, name: "Patisapta Pitha", price: 150, qty: 4, type: "food", shelfLife: "ultra-perishable", region: "Dhaka" },
    { id: 3, name: "Dhakai Jamdani", price: 25500, qty: 1, type: "fashion", shelfLife: "stable", region: "Narayanganj" }
  ]);

  // 2. LOGISTICS LOGIC: Grouping items by delivery track
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
  const shippingFees = Object.keys(deliveryGroups).length * 120; 
  const total = subtotal + shippingFees;

  // 3. SSLCOMMERZ PAYMENT HANDLER
  const handlePayment = async (e) => {
    if (e) e.preventDefault();
    if (loading) return; 
    setLoading(true);

    const orderData = {
      total_amount: total,
      currency: 'BDT',
      cus_name: formData.fullName,
      cus_phone: formData.phone,
      cus_add1: formData.address,
      cus_city: formData.city,
      payment_method: paymentMethod,
      items: cartItems.map(item => ({ 
        name: item.name, 
        price: item.price, 
        qty: item.qty 
      }))
    };

    try {
      await initiatePayment(orderData);
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Failed to connect to payment gateway. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.phone) {
      setStep(2);
    } else {
      alert("Please fill in the required fields.");
    }
  };

  return (
    <div className="bg-[#F9F7F2] min-h-screen py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Checkout Process */}
        <div className="lg:col-span-8">
          <div className="flex gap-8 mb-10 border-b border-stone-200 pb-4">
            <button 
              type="button"
              onClick={() => setStep(1)}
              className={`text-xs font-bold uppercase tracking-widest ${step === 1 ? 'brand-color border-b-2 border-[#A33B26]' : 'text-stone-400'}`}
            >
              01 Shipping
            </button>
            <button 
              type="button"
              disabled={!formData.fullName}
              className={`text-xs font-bold uppercase tracking-widest ${step === 2 ? 'brand-color border-b-2 border-[#A33B26]' : 'text-stone-400'}`}
            >
              02 Payment
            </button>
          </div>

          {step === 1 ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h2 className="serif text-3xl">Shipping Address</h2>
              <form className="grid grid-cols-2 gap-4" onSubmit={nextStep}>
                <input 
                  required
                  className="col-span-2 p-4 border border-stone-200 focus:outline-none focus:border-[#A33B26]" 
                  placeholder="Full Name" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
                <input 
                  required
                  className="p-4 border border-stone-200 focus:outline-none focus:border-[#A33B26]" 
                  placeholder="Mobile (+880)" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <input 
                  className="p-4 border border-stone-200 focus:outline-none focus:border-[#A33B26]" 
                  placeholder="City" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
                <textarea 
                  className="col-span-2 p-4 border border-stone-200 h-32 focus:outline-none focus:border-[#A33B26]" 
                  placeholder="Street Address / Village Details"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                ></textarea>
                <button 
                  type="submit"
                  className="col-span-2 brand-bg text-white py-4 text-xs font-bold uppercase tracking-widest mt-4 disabled:opacity-50"
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
                  type="button"
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full brand-bg text-white py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {loading ? "Redirecting..." : `Pay ৳${total.toLocaleString()}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-10 space-y-6">
            <div className="bg-white border border-stone-200 p-8 shadow-sm">
              <h3 className="serif text-xl mb-6">Your Heritage Box</h3>
              
              {/* Delivery Group Mapping */}
              {Object.entries(deliveryGroups).map(([groupName, items]) => (
                <div key={groupName} className="mb-8 last:mb-0">
                  <div className="flex items-center gap-2 mb-4">
                    <Truck className="w-4 h-4 brand-color" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A33B26]">
                      {groupName}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex flex-col">
                          <span className="text-stone-800">
                            {item.name} <span className="text-stone-400 text-xs">x{item.qty}</span>
                          </span>
                          <span className="text-[10px] text-stone-400 italic">From {item.region}</span>
                        </div>
                        <span className="font-bold">৳{(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Final Totals */}
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

            {/* Quality Badge */}
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