import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Send, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CONTACT_INFO } from '../data/cryptoAddresses';
import { BrandLogo } from './BrandLogo';

interface CartDrawerProps {
  onCheckout: () => void;
  onNavigateToService: (slug: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onNavigateToService }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    updateItemDetails,
    cartTotalUSD,
    formatPrice
  } = useCart();

  const [activeNotesIndex, setActiveNotesIndex] = useState<string | null>(null);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-bold text-slate-900">Your Shopping Cart</h2>
              <span className="bg-slate-200 text-slate-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Browse our verified accounts, 5-star reviews, and growth packages to boost your business today.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-slate-950 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Explore All Services
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemKey = `${item.serviceId}-${item.packageId}`;
                const isNotesOpen = activeNotesIndex === itemKey;

                return (
                  <div
                    key={itemKey}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-3"
                  >
                    <div className="flex justify-between items-start gap-2.5">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <BrandLogo name={item.serviceTitle} size="sm" />
                        <div className="min-w-0">
                          <button
                            onClick={() => {
                              setIsCartOpen(false);
                              onNavigateToService(item.serviceSlug);
                            }}
                            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-emerald-700 text-left transition-colors truncate block"
                          >
                            {item.serviceTitle}
                          </button>
                          <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                            {item.packageName} ({item.quantityLabel})
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.serviceId, item.packageId)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity & Price row */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-slate-300 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.serviceId, item.packageId, item.quantity - 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-sm font-medium"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold text-slate-900 border-x border-slate-200 min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.serviceId, item.packageId, item.quantity + 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-sm font-medium"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-slate-950">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-slate-500">
                            {formatPrice(item.unitPrice)} each
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Target link / Custom details input */}
                    <div className="pt-2 border-t border-slate-200/80">
                      <input
                        type="text"
                        placeholder="Target Link / Username / Profile URL (Optional)"
                        value={item.targetUrlOrDetails || ''}
                        onChange={(e) =>
                          updateItemDetails(
                            item.serviceId,
                            item.packageId,
                            e.target.value,
                            item.customNotes
                          )
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(cartTotalUSD)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Crypto Processing Fee</span>
                  <span className="text-emerald-600 font-semibold">0% (Free)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Replacement Warranty</span>
                  <span className="text-emerald-600 font-semibold">Included</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-bold text-slate-950">
                  <span>Total Amount</span>
                  <span className="text-emerald-700">{formatPrice(cartTotalUSD)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full bg-slate-950 text-white hover:bg-slate-800 py-3.5 px-4 rounded-md font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Proceed to Crypto Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 pt-1">
                <a
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-sky-700 hover:text-sky-900 font-medium"
                >
                  <Send className="w-3.5 h-3.5" /> Direct Telegram Order
                </a>
                <span className="text-slate-300">|</span>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-900 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Order
                </a>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure & Encrypted Instant Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
