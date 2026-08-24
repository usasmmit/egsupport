import React, { useState } from 'react';
import { X, Copy, Check, QrCode, ShieldCheck, Send, MessageCircle, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { CRYPTO_WALLETS, CONTACT_INFO } from '../data/cryptoAddresses';
import { CryptoPaymentOption, OrderRecord } from '../types';
import { BrandLogo } from './BrandLogo';

interface CryptoCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CryptoCheckoutModal: React.FC<CryptoCheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { cart, cartTotalUSD, currency, formatPrice, clearCart, addOrder } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [email, setEmail] = useState('');
  const [telegramOrWhatsapp, setTelegramOrWhatsapp] = useState('');
  const [targetDetails, setTargetDetails] = useState('');
  const [notes, setNotes] = useState('');

  // Payment Selection
  const [selectedWallet, setSelectedWallet] = useState<CryptoPaymentOption>(CRYPTO_WALLETS[0]);
  const [txHash, setTxHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedWallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setFormError('Please enter your email address to receive order updates.');
      return;
    }
    setFormError('');
    const newOrderId = `SMM-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedOrderId(newOrderId);
    setStep(2);
  };

  const handleCompleteOrder = () => {
    const finalOrder: OrderRecord = {
      orderId: generatedOrderId,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      items: [...cart],
      totalAmount: cartTotalUSD,
      currency: currency,
      paymentMethod: `${selectedWallet.currency} (${selectedWallet.network || 'Crypto'})`,
      paymentAddress: selectedWallet.address,
      txHash: txHash.trim() || undefined,
      customerEmail: email,
      customerTelegram: telegramOrWhatsapp.startsWith('@') ? telegramOrWhatsapp : undefined,
      customerWhatsapp: !telegramOrWhatsapp.startsWith('@') ? telegramOrWhatsapp : undefined,
      targetDetails: targetDetails || cart.map(i => i.targetUrlOrDetails).filter(Boolean).join(', ') || 'Direct Dispatch via Email/Chat',
      notes: notes
    };

    addOrder(finalOrder);
    clearCart();
    setStep(3);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const telegramOrderMessage = encodeURIComponent(
    `Hello Smmservice.co.uk Support! I placed order #${generatedOrderId}\nItems: ${cart.map(i => `${i.serviceTitle} (${i.packageName})`).join(', ')}\nTotal: ${formatPrice(cartTotalUSD)}\nPaid with: ${selectedWallet.currency}\nTXID: ${txHash || 'Pending confirmation'}\nEmail: ${email}`
  );

  const whatsappOrderMessage = encodeURIComponent(
    `Hello Smmservice.co.uk! I placed an order on smmservice.co.uk\nOrder ID: #${generatedOrderId}\nItems: ${cart.map(i => `${i.serviceTitle} - ${i.packageName}`).join(', ')}\nTotal: ${formatPrice(cartTotalUSD)}\nPayment: ${selectedWallet.currency}\nTXID: ${txHash || 'Paid via Crypto'}\nEmail: ${email}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
              {step === 1 ? 'Step 1 of 3: Customer Information' : step === 2 ? 'Step 2 of 3: Crypto Payment' : 'Step 3 of 3: Order Placed!'}
            </div>
            <h2 className="text-lg font-bold text-white">
              {step === 3 ? 'Order Successfully Submitted' : 'Complete Your Instant Order'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Contact Details & Service Target */}
        {step === 1 && (
          <form onSubmit={handleProceedToPayment} className="p-6 space-y-4">
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex justify-between items-center text-sm">
              <span className="text-slate-600 font-medium">Order Total ({cart.length} item{cart.length > 1 ? 's' : ''}):</span>
              <span className="text-lg font-bold text-slate-950">{formatPrice(cartTotalUSD)}</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Primary Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. yourname@gmail.com (To receive credentials & delivery report)"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formError) setFormError('');
                  }}
                  className="w-full text-sm bg-white border border-slate-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                {formError && (
                  <p className="text-xs text-rose-600 font-medium mt-1">{formError}</p>
                )}
                <p className="text-[11px] text-slate-500 mt-1">
                  Account logins, KYC scans, and tracking links are sent to this address.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Telegram Username or WhatsApp Number (Recommended for Instant Delivery)
                </label>
                <input
                  type="text"
                  placeholder="e.g. @yourtelegram or +1234567890"
                  value={telegramOrWhatsapp}
                  onChange={(e) => setTelegramOrWhatsapp(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target URL / Social Profile / Business Location Link (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. https://maps.app.goo.gl/... or @username or https://instagram.com/..."
                  value={targetDetails}
                  onChange={(e) => setTargetDetails(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Instructions / Delivery Speed Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Drip feed 5 reviews per day, specific USA state area code, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-950 text-white rounded-md text-sm font-semibold hover:bg-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Continue to Crypto Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Multi-Crypto Payment Selection & QR Address */}
        {step === 2 && (
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <div className="text-xs text-slate-500 font-mono">Order ID: #{generatedOrderId}</div>
                <div className="text-base font-bold text-slate-950">Amount Due: {formatPrice(cartTotalUSD)}</div>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-600 hover:text-slate-950 flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Edit Info
              </button>
            </div>

            {/* Select Crypto Currency */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Select Your Payment Cryptocurrency:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1 border border-slate-200 rounded-lg bg-slate-50">
                {CRYPTO_WALLETS.map((wallet) => (
                  <button
                    key={wallet.symbol}
                    type="button"
                    onClick={() => setSelectedWallet(wallet)}
                    className={`text-left p-2 rounded-xl border text-xs transition-all flex items-center gap-2 cursor-pointer ${
                      selectedWallet.symbol === wallet.symbol
                        ? 'bg-slate-900 text-white border-slate-900 font-bold'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <BrandLogo name={wallet.symbol} size="xs" />
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{wallet.currency}</div>
                      <div className={`text-[10px] truncate ${selectedWallet.symbol === wallet.symbol ? 'text-slate-300' : 'text-slate-500'}`}>
                        {wallet.network || wallet.symbol}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Address & QR Code Box */}
            <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase">
                  {selectedWallet.currency} Deposit Address:
                </span>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                  0% Fee • Instant Processing
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-3 border border-slate-200 rounded-md">
                {/* QR Code Container using Google Charts API for crisp rendering */}
                <div className="w-28 h-28 shrink-0 bg-white p-1 border border-slate-200 rounded-md flex items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(selectedWallet.address)}`}
                    alt="Crypto Deposit QR"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="text-[11px] text-slate-500 font-mono break-all p-2 bg-slate-100 rounded border border-slate-200 font-medium select-all">
                    {selectedWallet.address}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 text-white hover:bg-slate-800 rounded text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Address Copied to Clipboard!' : 'Copy Wallet Address'}</span>
                  </button>
                  <p className="text-[10px] text-slate-500 italic">
                    {selectedWallet.instruction}
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Hash / Proof Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Transaction ID / TX Hash (Optional, or message us on Telegram/WhatsApp):
              </label>
              <input
                type="text"
                placeholder="Paste transaction hash / txid here"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                className="w-full text-xs font-mono bg-white border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-600 hover:text-slate-900 font-medium"
              >
                ← Back to Information
              </button>

              <button
                type="button"
                onClick={handleCompleteOrder}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>I Have Sent the Payment (Confirm Order)</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Confirmation & Live Routing */}
        {step === 3 && (
          <div className="p-6 text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Thank You! Order Placed Successfully</h3>
              <p className="text-sm text-slate-600 mt-1">
                Your order reference is <span className="font-mono font-bold text-slate-950">#{generatedOrderId}</span>
              </p>
              <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
                A confirmation has been logged for <span className="font-semibold text-slate-800">{email}</span>. Our technical dispatch team has been notified.
              </p>
            </div>

            {/* Quick Live Contact Sync */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-lg mx-auto text-left space-y-3">
              <div className="text-xs font-bold text-slate-900">
                Want Instant 5-Minute Priority Dispatch?
              </div>
              <p className="text-xs text-slate-600">
                Send your order ID directly to our 24/7 support agents on Telegram or WhatsApp for expedited fulfillment:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <a
                  href={`https://t.me/EgSupport24?text=${telegramOrderMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white py-2 px-3 rounded-md text-xs font-semibold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Notify via Telegram</span>
                </a>
                <a
                  href={`https://wa.me/13073939979?text=${whatsappOrderMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-md text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Notify via WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOrderSuccess(generatedOrderId);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-950 text-white hover:bg-slate-800 rounded-md text-sm font-semibold transition-colors cursor-pointer"
              >
                Track This Order
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-md text-sm font-medium transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
