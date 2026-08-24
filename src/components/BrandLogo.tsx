import React from 'react';

interface BrandLogoProps {
  name: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ name, className = '', size = 'md' }) => {
  const lower = name.toLowerCase();

  const sizeClasses = {
    xs: 'w-4 h-4 text-[8px] rounded-md',
    sm: 'w-6 h-6 text-[10px] rounded-lg',
    md: 'w-9 h-9 text-xs rounded-xl',
    lg: 'w-13 h-13 text-sm rounded-2xl',
    xl: 'w-16 h-16 text-base rounded-2xl'
  }[size];

  // =========================================================================
  // 1. PAYMENT GATEWAYS, FINTECH & MERCHANT PROVIDERS
  // =========================================================================

  // PayPal
  if (lower.includes('paypal')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#003087]/10 text-[#003087] border border-[#003087]/20 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[62%] h-[62%]">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.641.641 0 0 1 .632-.542h7.397c3.924 0 6.645 1.94 6.13 5.405-.443 2.973-2.613 4.67-5.59 4.67H9.897l-1.48 7.553a.641.641 0 0 1-.632.531h-.71zm1.758-9.056h3.17c2.196 0 3.754-.954 4.072-3.089.309-2.074-1.077-3.175-3.535-3.175H8.257l-1.39 9.352 1.967-3.088z" fill="#0079C1"/>
          <path d="M9.103 14.862h2.247c2.977 0 5.147-1.697 5.59-4.67.515-3.465-2.206-5.405-6.13-5.405H4.944a.641.641 0 0 0-.632.542L1.837 20.597a.641.641 0 0 0 .633.74h4.606l1.155-7.348.872-.127z" fill="#00457C" opacity="0.85"/>
        </svg>
      </div>
    );
  }

  // Stripe
  if (lower.includes('stripe')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[58%] h-[58%]">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C17.652.697 15.343 0 12.378 0 6.643 0 2.663 3.033 2.663 8.016c0 5.485 5.578 6.425 8.796 7.593 2.37.863 3.19 1.54 3.19 2.502 0 .979-.86 1.488-2.248 1.488-2.144 0-5.18-1.077-7.147-2.185l-.946 5.613C6.309 23.955 9.158 24.5 12.44 24.5c5.96 0 10.057-2.923 10.057-8.082 0-5.69-5.61-6.666-8.521-7.268z" />
        </svg>
      </div>
    );
  }

  // Cash App
  if (lower.includes('cash app') || lower.includes('cashapp')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00D632]/15 text-[#00D632] border border-[#00D632]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.75 18.25v1.25h-3.5v-1.25c-2.45-.4-4-2.15-4-4.5 0-2.8 2.2-4.1 4.5-4.8 1.7-.5 2.5-.9 2.5-1.7 0-.7-.6-1.3-1.8-1.3-1.4 0-2.2.6-2.5 1.7l-2.4-.6c.5-1.8 2-3.1 4.2-3.4V2.5h3.5v1.25c2.3.4 3.8 2 3.8 4.2 0 2.6-2.1 3.9-4.4 4.6-1.8.5-2.6 1-2.6 1.9 0 .9.8 1.5 2 1.5 1.6 0 2.5-.7 2.8-2l2.4.6c-.6 2.1-2.2 3.4-4.5 3.7z"/>
        </svg>
      </div>
    );
  }

  // Wise / TransferWise
  if (lower.includes('wise')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#9FE870]/20 text-[#163300] border border-[#9FE870]/40 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%] text-[#163300]">
          <path d="M4.6 20.4L10 7.2l3.4 4.5h5.8L12.4 20.4H4.6zm6.8-16.8h8l-3.2 4.2H8.2L11.4 3.6z"/>
        </svg>
      </div>
    );
  }

  // Square
  if (lower.includes('square')) {
    return (
      <div className={`inline-flex items-center justify-center bg-black text-white border border-slate-700 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[55%] h-[55%]">
          <path d="M4.2 0h15.6C22.1 0 24 1.9 24 4.2v15.6c0 2.3-1.9 4.2-4.2 4.2H4.2C1.9 24 0 22.1 0 19.8V4.2C0 1.9 1.9 0 4.2 0zm14.4 18.6V5.4H5.4v13.2h13.2zm-4.2-4.2H9.6V9.6h4.8v4.8z"/>
        </svg>
      </div>
    );
  }

  // Payoneer
  if (lower.includes('payoneer')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FF4800]/10 text-[#FF4800] border border-[#FF4800]/25 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" className="w-[60%] h-[60%]">
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      </div>
    );
  }

  // Revolut
  if (lower.includes('revolut')) {
    return (
      <div className={`inline-flex items-center justify-center bg-black text-white border border-slate-800 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-sm tracking-tighter font-mono">R</span>
      </div>
    );
  }

  // Skrill
  if (lower.includes('skrill')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#811245]/15 text-[#811245] border border-[#811245]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs font-serif tracking-tight text-[#811245]">Skrill</span>
      </div>
    );
  }

  // Adyen / Ayden
  if (lower.includes('adyen') || lower.includes('ayden')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#0ABF53]/15 text-[#0ABF53] border border-[#0ABF53]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs tracking-tight">adyen</span>
      </div>
    );
  }

  // Klarna
  if (lower.includes('klarna')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FFB3C7]/30 text-[#0A0A0A] border border-[#FFB3C7] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-extrabold text-[11px] tracking-tight">Klarna.</span>
      </div>
    );
  }

  // Apple Pay / Apple
  if (lower.includes('apple pay') || lower.includes('apple')) {
    return (
      <div className={`inline-flex items-center justify-center bg-black text-white shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[55%] h-[55%]">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.59.69-1.12 1.84-.98 2.95 1.07.08 2.16-.54 2.79-1.29z"/>
        </svg>
      </div>
    );
  }

  // Google Pay
  if (lower.includes('google pay') || lower.includes('gpay')) {
    return (
      <div className={`inline-flex items-center justify-center bg-slate-900 text-white border border-slate-700 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-[10px] tracking-tight text-white flex items-center gap-0.5">
          <span className="text-[#4285F4]">G</span>Pay
        </span>
      </div>
    );
  }

  // Authorize.Net
  if (lower.includes('authorize')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#002C6C] text-white border border-[#002C6C] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-[10px] tracking-tighter">Auth.Net</span>
      </div>
    );
  }

  // 2Checkout / Verifone
  if (lower.includes('2checkout') || lower.includes('verifone')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00A859] text-white border border-[#00A859] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-[10px] tracking-tighter">2CO</span>
      </div>
    );
  }

  // Braintree
  if (lower.includes('braintree')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#1B2733] text-[#40E0D0] border border-[#40E0D0]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-[10px] tracking-tighter">BrainTree</span>
      </div>
    );
  }

  // PayU
  if (lower.includes('payu')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#A5C800] text-slate-950 font-black border border-[#A5C800] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-[11px] tracking-tight">PayU</span>
      </div>
    );
  }

  // GoCardless
  if (lower.includes('gocardless')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00B976]/15 text-[#00B976] border border-[#00B976]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-[10px] tracking-tighter">GC</span>
      </div>
    );
  }

  // Razorpay
  if (lower.includes('razorpay')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#0C2340] text-[#0089FF] border border-[#0089FF]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[58%] h-[58%]">
          <path d="M14.5 2L5 15h6l-2.5 7L20 9h-6l2.5-7z"/>
        </svg>
      </div>
    );
  }

  // Paytm
  if (lower.includes('paytm')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#002E6E] text-white border border-[#00BAF2] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-[9px] text-[#00BAF2]">Paytm</span>
      </div>
    );
  }

  // Alipay
  if (lower.includes('alipay')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00A0E9] text-white border border-[#00A0E9] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs font-sans">支</span>
      </div>
    );
  }

  // Paystack
  if (lower.includes('paystack')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00C3F7]/15 text-[#00C3F7] border border-[#00C3F7]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-[10px] tracking-tight">PS</span>
      </div>
    );
  }

  // Paddle
  if (lower.includes('paddle')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#0D1117] text-[#FB651E] border border-[#FB651E]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-[10px]">Paddle</span>
      </div>
    );
  }

  // Fiserv / CyberSource / Payza / Instamojo / Ebanx / Worldfirst / Rizon / RedotPay / Neteller / Worldpay / Checkout.com / BlueSnap / WePay / Dwolla / Mollie / Rapyd / Paysera / Remitly / Worldremit
  if (lower.includes('checkout.com') || lower.includes('neteller') || lower.includes('worldpay') || lower.includes('bluesnap') || lower.includes('wepay') || lower.includes('dwolla') || lower.includes('mollie') || lower.includes('rapyd') || lower.includes('paysera') || lower.includes('remitly') || lower.includes('worldremit') || lower.includes('redotpay') || lower.includes('fiserv') || lower.includes('cybersource') || lower.includes('payza') || lower.includes('instamojo') || lower.includes('ebanx') || lower.includes('worldfirst') || lower.includes('rizon')) {
    return (
      <div className={`inline-flex items-center justify-center bg-slate-900 text-emerald-400 border border-emerald-500/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[58%] h-[58%]">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 2. CRYPTOCURRENCY EXCHANGES, PLATFORMS & TOKENS
  // =========================================================================

  // Binance / Binance.US
  if (lower.includes('binance')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#F3BA2F]/15 text-[#F3BA2F] border border-[#F3BA2F]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M16.624 13.92l2.715 2.715-7.34 7.34-7.34-7.34 2.715-2.715 4.625 4.625 4.626-4.625zm-4.625-7.34l4.626 4.625 2.715-2.715-7.34-7.34-7.34 7.34 2.715 2.715 4.624-4.625zm-7.34 4.625L1.944 12l2.715 2.715L7.374 12 4.659 11.205zm14.68 0L16.624 12l2.715.795L22.056 12l-2.715-.795zm-7.34.795l2.715 2.715-2.715 2.715-2.715-2.715 2.715-2.715z"/>
        </svg>
      </div>
    );
  }

  // Coinbase
  if (lower.includes('coinbase')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/20 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm-3.5-15.5h7a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 14v-4a1.5 1.5 0 0 1 1.5-1.5z"/>
        </svg>
      </div>
    );
  }

  // Kraken
  if (lower.includes('kraken')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#5741D9]/10 text-[#5741D9] border border-[#5741D9]/20 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 4.991 3.053 9.27 7.375 11.08v-4.103c-2.18-.76-3.75-2.83-3.75-5.267 0-3.093 2.507-5.6 5.6-5.6h5.55c3.093 0 5.6 2.507 5.6 5.6 0 2.437-1.57 4.507-3.75 5.267v4.103C20.947 21.27 24 16.991 24 12 24 5.373 18.627 0 12 0z"/>
        </svg>
      </div>
    );
  }

  // OKX
  if (lower.includes('okx')) {
    return (
      <div className={`inline-flex items-center justify-center bg-black text-white border border-slate-700 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs tracking-tighter">OKX</span>
      </div>
    );
  }

  // KuCoin
  if (lower.includes('kucoin')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#24AE8F]/15 text-[#24AE8F] border border-[#24AE8F]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs tracking-tight text-[#24AE8F]">KuCoin</span>
      </div>
    );
  }

  // Bybit
  if (lower.includes('bybit')) {
    return (
      <div className={`inline-flex items-center justify-center bg-slate-950 text-[#F7A600] border border-[#F7A600]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs tracking-tighter text-[#F7A600]">BYBIT</span>
      </div>
    );
  }

  // Crypto.com
  if (lower.includes('crypto.com')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#061B3A] text-white border border-[#113B7A] shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[55%] h-[55%] text-[#0082FF]">
          <path d="M12 0L2 6v12l10 6 10-6V6L12 0zm0 4.2l6.5 3.9v7.8L12 19.8 5.5 15.9V8.1L12 4.2z"/>
        </svg>
      </div>
    );
  }

  // Robinhood
  if (lower.includes('robinhood')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00C805]/15 text-[#00C805] border border-[#00C805]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%] text-[#00C805]">
          <path d="M8 2.2c3.5 0 6.4 2.8 6.5 6.3.1 3-1.8 5.6-4.7 6.3l-.3 7H6V8.5C6 5 6.9 2.2 8 2.2z"/>
        </svg>
      </div>
    );
  }

  // Bitfinex, Gate.io, Huobi, Bitstamp, Gemini, Bittrex, Upbit, BitMart, HitBTC, BitMEX, Coinmama, CEX.io, WazirX, CoinDCX, Liquid, Abra, BitFlyer, Poloniex, Luno, Bitso, Paxful, WhiteBIT, Bisq, Changelly, CoinJar, BTC Markets, ZebPay, Unocoin, Coins.ph, Coinsbit, CoinSwitch, LocalBitcoins, Swapzone, Independent Reserve, CoinSpot, CoinFalcon, CoinEx, Bitbns, Bithumb, Deribit, BitMax, ZB.com, Coinone, Noones, FTX, Payeer, Perfect Money, Mexc, Moonpay, Bitget, Digifinex, Bitpay, Blockchain, Wirex, AdvCash
  if (lower.includes('paxful') || lower.includes('mexc') || lower.includes('bitget') || lower.includes('moonpay') || lower.includes('bitpay') || lower.includes('blockchain') || lower.includes('gate.io') || lower.includes('bitfinex') || lower.includes('gemini') || lower.includes('upbit') || lower.includes('bitmart') || lower.includes('bitmex') || lower.includes('poloniex') || lower.includes('whitebit') || lower.includes('bisq') || lower.includes('changelly') || lower.includes('noones') || lower.includes('payeer') || lower.includes('perfect money') || lower.includes('advcash') || lower.includes('wirex') || lower.includes('huobi') || lower.includes('bitstamp') || lower.includes('bittrex') || lower.includes('coinmama') || lower.includes('cex.io') || lower.includes('wazirx') || lower.includes('coindcx') || lower.includes('liquid') || lower.includes('abra') || lower.includes('bitflyer') || lower.includes('luno') || lower.includes('bitso') || lower.includes('coinjar') || lower.includes('zebpay') || lower.includes('unocoin') || lower.includes('coins.ph') || lower.includes('coinsbit') || lower.includes('coinswitch') || lower.includes('swapzone') || lower.includes('independent reserve') || lower.includes('coinspot') || lower.includes('coinfalcon') || lower.includes('coinex') || lower.includes('bitbns') || lower.includes('bithumb') || lower.includes('deribit') || lower.includes('bitmax') || lower.includes('zb.com') || lower.includes('coinone') || lower.includes('ftx') || lower.includes('digifinex') || lower.includes('localbitcoins')) {
    return (
      <div className={`inline-flex items-center justify-center bg-slate-900 text-amber-400 border border-amber-500/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[58%] h-[58%]">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l-10-5v6l10 5 10-5v-6l-10 5zm0 7l-10-5v6l10 5 10-5v-6l-10 5z"/>
        </svg>
      </div>
    );
  }

  // Bitcoin (BTC)
  if (lower.includes('bitcoin') || lower.includes('btc')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#F7931A]/15 text-[#F7931A] border border-[#F7931A]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M23.638 14.904c-1.602 6.43-8.09 10.34-14.52 8.736C2.686 22.038-1.224 15.55.38 9.12 1.984 2.69 8.47-1.22 14.9 0.384c6.432 1.604 10.342 8.09 8.738 14.52zM15.42 10.51c.214-1.43-.876-2.2-2.368-2.712l.484-1.94-1.18-.295-.472 1.89c-.31-.077-.63-.15-.947-.222l.475-1.903-1.18-.295-.484 1.94c-.256-.058-.507-.116-.749-.177l.001-.006-1.628-.406-.314 1.26s.876.2.858.213c.478.12.565.438.55.69l-.552 2.215c.033.008.076.02.123.038l-.126-.03-.773 3.1c-.058.145-.208.363-.543.28.012.018-.858-.214-.858-.214l-.587 1.353 1.536.383c.286.072.566.147.842.218l-.49 1.968 1.18.294.484-1.942c.322.087.635.168.94.246l-.482 1.933 1.18.295.49-1.964c2.012.38 3.525.227 4.162-1.593.513-1.464-.025-2.31-1.085-2.86.772-.178 1.353-.686 1.508-1.737zm-2.697 3.79c-.365 1.465-2.834.673-3.635.474l.648-2.6c.8.2 3.364.597 2.987 2.126zm.365-3.81c-.333 1.334-2.39.657-3.056.49l.587-2.355c.667.166 2.812.477 2.47 1.865z"/>
        </svg>
      </div>
    );
  }

  // Ethereum (ETH)
  if (lower.includes('ethereum') || lower.includes('eth')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#627EEA]/15 text-[#627EEA] border border-[#627EEA]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[55%] h-[55%]">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm.056 3.68l5.244 8.7L12 15.42 6.7 12.38 12 3.68zm0 12.78l5.25-3.04-5.25 7.4-5.25-7.4 5.25 3.04z"/>
        </svg>
      </div>
    );
  }

  // USDT / Tether
  if (lower.includes('usdt') || lower.includes('tether')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#26A17B]/15 text-[#26A17B] border border-[#26A17B]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[58%] h-[58%]">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.385 6.942v1.543c3.08.148 5.412.77 5.412 1.515 0 .744-2.332 1.367-5.412 1.515v4.542h-2.77V11.51c-3.076-.148-5.405-.77-5.405-1.51 0-.745 2.329-1.367 5.405-1.515V6.942H4.5v-2.5h15v2.5h-6.115z"/>
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 3. ADVERTISING NETWORKS & SOCIAL MEDIA
  // =========================================================================

  // Google Ads / Google / Gmail / Play Store / Workspace / News
  if (lower.includes('google') || lower.includes('gmail') || lower.includes('gmb') || lower.includes('workspace')) {
    return (
      <div className={`inline-flex items-center justify-center bg-white border border-slate-200 shadow-2xs shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" className="w-[60%] h-[60%]">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
      </div>
    );
  }

  // Facebook / Meta
  if (lower.includes('facebook') || lower.includes('meta')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/20 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </div>
    );
  }

  // TikTok
  if (lower.includes('tiktok')) {
    return (
      <div className={`inline-flex items-center justify-center bg-black text-white shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.83c0 1.63-.44 3.23-1.32 4.59-1.44 2.25-3.9 3.65-6.57 3.57-2.68-.08-5.07-1.63-6.35-3.97-1.28-2.34-1.13-5.24.37-7.46 1.49-2.22 4.02-3.48 6.69-3.27.02.93-.02 1.86-.02 2.79-1.39-.14-2.81.25-3.88 1.15-1.07.9-1.62 2.29-1.47 3.69.15 1.4 1.01 2.61 2.29 3.19 1.28.58 2.82.44 3.97-.37 1.15-.81 1.74-2.19 1.74-3.61V.02h.71z"/>
        </svg>
      </div>
    );
  }

  // Twitter (X)
  if (lower.includes('twitter') || lower.includes(' x ') || lower.endsWith(' x') || lower.startsWith('x ') || lower.includes('(x)')) {
    return (
      <div className={`inline-flex items-center justify-center bg-black text-white shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[55%] h-[55%]">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    );
  }

  // LinkedIn
  if (lower.includes('linkedin')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#0A66C2]/10 text-[#0A66C2] border border-[#0A66C2]/20 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </div>
    );
  }

  // Instagram
  if (lower.includes('instagram')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#E4405F]/10 text-[#E4405F] border border-[#E4405F]/20 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </div>
    );
  }

  // YouTube
  if (lower.includes('youtube')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FF0000]/10 text-[#FF0000] border border-[#FF0000]/20 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </div>
    );
  }

  // Pinterest
  if (lower.includes('pinterest')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#E60023]/10 text-[#E60023] border border-[#E60023]/20 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[58%] h-[58%]">
          <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.99-.1-2.52.02-3.61l1.45-6.14s-.37-.74-.37-1.84c0-1.73 1-3.02 2.25-3.02 1.06 0 1.57.8 1.57 1.75 0 1.07-.68 2.66-1.04 4.14-.3 1.24.63 2.26 1.85 2.26 2.22 0 3.93-2.34 3.93-5.72 0-2.99-2.15-5.08-5.22-5.08-3.56 0-5.64 2.67-5.64 5.42 0 1.07.41 2.22.93 2.85a.37.37 0 0 1 .09.35l-.35 1.42c-.06.23-.19.28-.43.17-1.63-.76-2.65-3.14-2.65-5.05 0-4.11 2.99-7.89 8.62-7.89 4.53 0 8.05 3.23 8.05 7.54 0 4.5-2.84 8.12-6.78 8.12-1.32 0-2.57-.69-3-1.51l-.82 3.12c-.3 1.15-1.1 2.59-1.64 3.46A12 12 0 1 0 12 0z"/>
        </svg>
      </div>
    );
  }

  // Snapchat
  if (lower.includes('snapchat')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FFFC00]/30 text-slate-950 border border-[#FFFC00] shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M12.007 0C6.082 0 4.55 3.975 4.55 6.302c0 1.21.367 2.66 1.01 3.737.15.25.137.49-.037.662-.485.474-1.393.99-2.392 1.348-.377.135-.55.437-.474.78.136.623.864.887 1.77.925.264.01.464.137.525.374.312 1.22 1.51 2.146 3.148 2.397.35.05.587.262.587.612 0 .723-.538 1.486-1.573 2.247-.463.337-.363.81.163.924 1.385.3 2.946.337 4.73.337 1.785 0 3.346-.037 4.73-.337.526-.114.626-.587.163-.924-1.035-.76-1.573-1.524-1.573-2.247 0-.35.237-.562.587-.612 1.637-.25 2.835-1.176 3.148-2.397.06-.237.26-.364.524-.374.907-.038 1.635-.302 1.77-.925.076-.343-.097-.645-.474-.78-.999-.358-1.907-.874-2.392-1.348-.174-.172-.187-.412-.037-.662.643-1.077 1.01-2.527 1.01-3.737C19.463 3.975 17.932 0 12.007 0z"/>
        </svg>
      </div>
    );
  }

  // Bing / Microsoft / Outlook / Hotmail
  if (lower.includes('bing') || lower.includes('microsoft') || lower.includes('outlook') || lower.includes('hotmail')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#0078D4]/15 text-[#0078D4] border border-[#0078D4]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[58%] h-[58%]">
          <path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z"/>
        </svg>
      </div>
    );
  }

  // Reddit
  if (lower.includes('reddit')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/20 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.703zM9.25 12C8.56 12 8 12.56 8 13.25c0 .688.56 1.25 1.25 1.25.688 0 1.25-.56 1.25-1.25 0-.688-.56-1.25-1.25-1.25zm5.5 0c-.688 0-1.25.56-1.25 1.25 0 .688.56 1.25 1.25 1.25.688 0 1.25-.56 1.25-1.25 0-.688-.56-1.25-1.25-1.25z"/>
        </svg>
      </div>
    );
  }

  // Quora
  if (lower.includes('quora')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#B92B27]/10 text-[#B92B27] border border-[#B92B27]/20 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-sm font-serif">Q</span>
      </div>
    );
  }

  // Discord
  if (lower.includes('discord')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      </div>
    );
  }

  // Telegram
  if (lower.includes('telegram')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#26A5E4]/15 text-[#26A5E4] border border-[#26A5E4]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.941z"/>
        </svg>
      </div>
    );
  }

  // WhatsApp
  if (lower.includes('whatsapp')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
        </svg>
      </div>
    );
  }

  // GitHub
  if (lower.includes('github')) {
    return (
      <div className={`inline-flex items-center justify-center bg-black text-white shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </div>
    );
  }

  // SoundCloud
  if (lower.includes('soundcloud')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M1.175 12.225c-.066 0-.12.053-.13.12l-.37 3.385.37 3.335c.01.066.064.118.13.118.067 0 .12-.052.13-.118l.42-3.335-.42-3.385c-.01-.067-.063-.12-.13-.12zm2.14-1.285c-.085 0-.154.068-.163.153l-.327 4.64.327 4.542c.01.085.078.15.163.15.086 0 .155-.065.164-.15l.37-4.542-.37-4.64c-.01-.085-.078-.153-.164-.153zm2.253-1.077c-.104 0-.19.083-.198.188l-.273 5.717.273 5.567c.008.105.094.188.198.188.105 0 .19-.083.2-.188l.31-5.567-.31-5.717c-.01-.105-.095-.188-.2-.188zm18.432 4.137h-1.5c-.2 0-.36.16-.36.36v5.27c0 .2.16.36.36.36h1.5c1.47 0 2.67-1.2 2.67-2.67 0-1.47-1.2-2.67-2.67-2.67z"/>
        </svg>
      </div>
    );
  }

  // Nextdoor
  if (lower.includes('nextdoor')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00B246]/15 text-[#00B246] border border-[#00B246]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs font-serif">N</span>
      </div>
    );
  }

  // Bumble
  if (lower.includes('bumble')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FFC629]/25 text-[#222] border border-[#FFC629] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs">🐝</span>
      </div>
    );
  }

  // Twitch
  if (lower.includes('twitch')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#9146FF]/15 text-[#9146FF] border border-[#9146FF]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[58%] h-[58%]">
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
        </svg>
      </div>
    );
  }

  // Behance
  if (lower.includes('behance')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#0057FF]/15 text-[#0057FF] border border-[#0057FF]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs font-sans">Bē</span>
      </div>
    );
  }

  // Medium
  if (lower.includes('medium')) {
    return (
      <div className={`inline-flex items-center justify-center bg-black text-white shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs font-serif">M</span>
      </div>
    );
  }

  // =========================================================================
  // 4. REVIEWS & TRUST PLATFORMS
  // =========================================================================

  // Trustpilot
  if (lower.includes('trustpilot')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00B67A]/15 text-[#00B67A] border border-[#00B67A]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M12 0l3.708 7.514L24 8.729l-6 5.849 1.416 8.258L12 18.932 4.584 22.836 6 14.578 0 8.729l8.292-1.215z"/>
        </svg>
      </div>
    );
  }

  // Yelp
  if (lower.includes('yelp')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#D32323]/15 text-[#D32323] border border-[#D32323]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M21.284 16.716a2.128 2.128 0 0 0-.916-1.547l-4.52-2.983c-.347-.23-.794-.254-1.164-.066-.37.189-.607.574-.619.992l-.146 5.412a2.128 2.128 0 0 0 .977 1.956c.712.43 1.62.33 2.223-.243l3.633-3.447c.365-.347.532-.862.532-2.074zm-9.358-4.225l-4.52 2.983a2.128 2.128 0 0 0-.916 1.547c0 1.212.167 1.727.532 2.074l3.633 3.447c.603.573 1.511.673 2.223.243a2.128 2.128 0 0 0 .977-1.956l-.146-5.412a1.135 1.135 0 0 0-.619-.992 1.135 1.135 0 0 0-1.164.066zM12 2.128C11.455 2.128 10.978 2.5 10.84 3.028L9.27 9.07a1.134 1.134 0 0 0 .347 1.127c.31.256.742.32 1.116.166l5.228-2.158a2.128 2.128 0 0 0 1.34-1.737c.076-.826-.35-1.615-1.043-1.947L12.984 2.37A2.128 2.128 0 0 0 12 2.128z"/>
        </svg>
      </div>
    );
  }

  // TripAdvisor
  if (lower.includes('tripadvisor')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#34E0A1]/15 text-[#00AA6C] border border-[#34E0A1]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm10 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
        </svg>
      </div>
    );
  }

  // Sitejabber
  if (lower.includes('sitejabber')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00BF6F]/15 text-[#00BF6F] border border-[#00BF6F]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs">SJ</span>
      </div>
    );
  }

  // Better Business Bureau (BBB)
  if (lower.includes('bbb') || lower.includes('better business bureau')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#005A9C] text-white border border-[#005A9C] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-[10px] tracking-tight">BBB</span>
      </div>
    );
  }

  // Clutch.co
  if (lower.includes('clutch')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#163042] text-[#FF4C38] border border-[#FF4C38]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs font-serif">C</span>
      </div>
    );
  }

  // G2 Crowd
  if (lower.includes('g2')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FF492C] text-white border border-[#FF492C] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs font-mono">G2</span>
      </div>
    );
  }

  // Capterra
  if (lower.includes('capterra')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00828A]/15 text-[#00828A] border border-[#00828A]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs">Cap</span>
      </div>
    );
  }

  // TrustRadius
  if (lower.includes('trustradius')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#005072] text-[#00C8AF] border border-[#00C8AF]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs">TR</span>
      </div>
    );
  }

  // YellowPages
  if (lower.includes('yellowpages') || lower.includes('yellow pages')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FFCC00] text-slate-950 border border-[#FFCC00] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs">YP</span>
      </div>
    );
  }

  // Healthgrades
  if (lower.includes('healthgrades')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#0072CE]/15 text-[#0072CE] border border-[#0072CE]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs">HG</span>
      </div>
    );
  }

  // Avvo
  if (lower.includes('avvo')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#002D62] text-[#FFB600] border border-[#FFB600]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs font-serif">Avvo</span>
      </div>
    );
  }

  // ProductHunt
  if (lower.includes('producthunt') || lower.includes('product hunt')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#DA552F] text-white border border-[#DA552F] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs font-serif">P</span>
      </div>
    );
  }

  // iOS App Store / Apple Store
  if (lower.includes('ios') || lower.includes('app store')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#007AFF] text-white border border-[#007AFF] shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[55%] h-[55%]">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.59.69-1.12 1.84-.98 2.95 1.07.08 2.16-.54 2.79-1.29z"/>
        </svg>
      </div>
    );
  }

  // Google Play Store
  if (lower.includes('play store')) {
    return (
      <div className={`inline-flex items-center justify-center bg-white border border-slate-200 shadow-2xs shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" className="w-[60%] h-[60%]">
          <path fill="#4285F4" d="M3.6 1.8l11.4 10.2L3.6 22.2z"/>
          <path fill="#FBBC05" d="M15 12l3.4-3-3.4-3.1L3.6 1.8z"/>
          <path fill="#EA4335" d="M15 12l3.4 3-3.4 3.1L3.6 22.2z"/>
          <path fill="#34A853" d="M18.4 9l3.2 1.8c.8.5.8 1.9 0 2.4L18.4 15l-3.4-3z"/>
        </svg>
      </div>
    );
  }

  // Angi (Angie's List) / Edmunds / Cars.com / GoodFirms / Bark.com / UpCity / Glassdoor / Zillow / Thumbtack / Houzz / Booking / Homestars / Homeadvisor / Weddingwire / Reviews.io / IMDB
  if (lower.includes('angi') || lower.includes('edmunds') || lower.includes('cars.com') || lower.includes('goodfirms') || lower.includes('bark') || lower.includes('upcity') || lower.includes('glassdoor') || lower.includes('zillow') || lower.includes('thumbtack') || lower.includes('houzz') || lower.includes('booking') || lower.includes('homestars') || lower.includes('homeadvisor') || lower.includes('weddingwire') || lower.includes('reviews.io') || lower.includes('imdb')) {
    return (
      <div className={`inline-flex items-center justify-center bg-amber-50 text-amber-600 border border-amber-200 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[58%] h-[58%]">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 5. E-COMMERCE & MARKETPLACES
  // =========================================================================

  // Shopify
  if (lower.includes('shopify')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#96BF48]/15 text-[#96BF48] border border-[#96BF48]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
          <path d="M19.345 5.567c-.06-.44-.457-.723-.872-.733l-3.328-.08a.723.723 0 0 0-.25.045c-.07.03-.13.07-.17.13-.04.05-.06.12-.06.19l.74 3.535-4.43-1.63a.81.81 0 0 0-.27-.05c-.17 0-.34.07-.46.19l-4.52 4.41a.81.81 0 0 0-.23.57c0 .22.09.43.24.58l9.64 9.42c.16.15.37.24.59.24.22 0 .43-.09.59-.24l6.09-5.96a.82.82 0 0 0 .24-.58V6.267c0-.28-.14-.54-.38-.69a.83.83 0 0 0-.77-.01l-.23.12-.42-1.99z"/>
        </svg>
      </div>
    );
  }

  // Amazon / Amazon SES / Buyer / Ads / Assistant
  if (lower.includes('amazon') || lower.includes('ses')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FF9900]/15 text-[#FF9900] border border-[#FF9900]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%] text-[#FF9900]">
          <path d="M13.916 17.62c-3.14 2.26-7.75 3.48-11.67 1.25-.56-.32-.1-.99.41-.75 3.73 1.76 8.35.79 11.23-1.24.47-.33.91.41.03.74zm1.5-1.3c-.4-.51-2.67-.24-3.69-.12-.31.04-.36-.23-.08-.42 1.83-1.29 4.82-.92 5.17-.48.36.45-.09 3.47-1.83 4.9-.27.22-.52.1-.4-.2.4-1.02 1.23-3.17.83-3.68zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.62 10.82c-.88.66-1.57.91-2.45.91-1.39 0-2.13-.88-2.13-2.22 0-1.8 1.15-3.05 3.01-3.05.51 0 .97.08 1.57.24v4.12zm1.51 2.38v-8.2h-1.33v1.17c-.57-.85-1.46-1.34-2.58-1.34-2.6 0-4.48 2.02-4.48 4.79 0 2.26 1.44 3.77 3.52 3.77 1.26 0 2.22-.54 2.87-1.51v1.32h1.4l.6-8.2z"/>
        </svg>
      </div>
    );
  }

  // Ticketmaster
  if (lower.includes('ticketmaster')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#026CDF] text-white border border-[#026CDF] shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs font-serif italic">t</span>
      </div>
    );
  }

  // Craigslist
  if (lower.includes('craigslist')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#551A8B]/15 text-[#551A8B] border border-[#551A8B]/30 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-xs font-sans">CL</span>
      </div>
    );
  }

  // BlackHatWorld
  if (lower.includes('blackhatworld') || lower.includes('bhw')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#1E1E1E] text-[#FF8C00] border border-[#FF8C00]/40 shrink-0 ${sizeClasses} ${className}`}>
        <span className="font-black text-[10px] tracking-tight">BHW</span>
      </div>
    );
  }

  // =========================================================================
  // 6. BANKS & FINANCIAL INSTITUTIONS
  // =========================================================================
  if (lower.includes('chase') || lower.includes('bank of america') || lower.includes('wells fargo') || lower.includes('citibank') || lower.includes('hsbc') || lower.includes('barclays') || lower.includes('santander') || lower.includes('standard chartered') || lower.includes('deutsche bank') || lower.includes('ubs') || lower.includes('mercury') || lower.includes('bluevine') || lower.includes('axos') || lower.includes('novo') || lower.includes('monzo') || lower.includes('starling') || lower.includes('n26') || lower.includes('first direct') || lower.includes('bank')) {
    return (
      <div className={`inline-flex items-center justify-center bg-slate-900 text-emerald-400 border border-slate-700 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[58%] h-[58%]">
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <polyline points="5 6 12 3 19 6" />
          <line x1="4" y1="10" x2="4" y2="21" />
          <line x1="20" y1="10" x2="20" y2="21" />
          <line x1="8" y1="14" x2="8" y2="17" />
          <line x1="12" y1="14" x2="12" y2="17" />
          <line x1="16" y1="14" x2="16" y2="17" />
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 7. VIRTUAL NUMBERS & VOIP (Google Voice, Talkatone, TextNow, etc.)
  // =========================================================================
  if (lower.includes('google voice') || lower.includes('talkatone') || lower.includes('textnow') || lower.includes('textplus') || lower.includes('freetone') || lower.includes('textme') || lower.includes('hushed') || lower.includes('slynumber') || lower.includes('sideline') || lower.includes('openphone') || lower.includes('textfree') || lower.includes('ring4') || lower.includes('nextplus') || lower.includes('hitmess') || lower.includes('index') || lower.includes('voice')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#34A853]/15 text-[#34A853] border border-[#34A853]/30 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[58%] h-[58%]">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 8. SMTP, EMAIL ACCOUNTS & RELAY (SendGrid, Mailgun, Brevo, SMTP2GO, Edu)
  // =========================================================================
  if (lower.includes('sendgrid') || lower.includes('mailgun') || lower.includes('brevo') || lower.includes('smtp') || lower.includes('postmark') || lower.includes('mailjet') || lower.includes('sparkpost') || lower.includes('elastic email') || lower.includes('edu mail') || lower.includes('business email') || lower.includes('email')) {
    return (
      <div className={`inline-flex items-center justify-center bg-sky-50 text-sky-600 border border-sky-200 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[58%] h-[58%]">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 9. SEO, BACKLINKS, CITATIONS & DIGITAL GROWTH
  // =========================================================================
  if (lower.includes('seo') || lower.includes('backlink') || lower.includes('traffic') || lower.includes('ranking') || lower.includes('article') || lower.includes('content writing') || lower.includes('guest blog') || lower.includes('citation') || lower.includes('speed') || lower.includes('vitals') || lower.includes('schema') || lower.includes('retainer') || lower.includes('programmatic') || lower.includes('news')) {
    return (
      <div className={`inline-flex items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0 ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[58%] h-[58%]">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      </div>
    );
  }

  // Generic fallback with refined clean initials badge
  const initial = name.replace(/^Buy\s+/i, '').replace(/^Verified\s+/i, '').charAt(0).toUpperCase() || 'S';
  return (
    <div className={`inline-flex items-center justify-center bg-slate-900 text-white font-black tracking-tighter shrink-0 border border-slate-700 ${sizeClasses} ${className}`}>
      {initial}
    </div>
  );
};
