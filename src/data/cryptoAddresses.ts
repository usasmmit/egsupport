import { CryptoPaymentOption } from '../types';

export const CONTACT_INFO = {
  domain: 'smmservice.co.uk',
  brandName: 'Smmservice.co.uk',
  tagline: 'Premium Verified Accounts & SMM Growth Infrastructure',
  telegram: '@EgSupport24',
  telegramUrl: 'https://t.me/EgSupport24',
  whatsapp: '+1 (929) 216-5606',
  whatsappUrl: 'https://wa.me/19292165606',
  whatsappRaw: '+19292165606',
  email: 'usasmmit@gmail.com',
  businessHours: '24/7/365 Live Support Desk & Instant Dispatch',
  averageResponseTime: '< 2 Minutes',
  location: 'Global Digital Fulfillment'
};

export const CRYPTO_WALLETS: CryptoPaymentOption[] = [
  {
    currency: 'USDT (TRC20)',
    network: 'TRON (TRC20)',
    symbol: 'USDT-TRC20',
    address: 'TQkGnoSN5EaKnNpbXCV7cBdzTG7zYJT6rL',
    instruction: 'Send exact USDT amount over TRON (TRC20) network. Instant confirmation.'
  },
  {
    currency: 'USDT (BEP20)',
    network: 'BNB Smart Chain (BEP20)',
    symbol: 'USDT-BEP20',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    instruction: 'Send USDT via BNB Smart Chain (BEP-20) network.'
  },
  {
    currency: 'USDT (ERC20)',
    network: 'Ethereum (ERC20)',
    symbol: 'USDT-ERC20',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    instruction: 'Send USDT via Ethereum network (ERC-20).'
  },
  {
    currency: 'Bitcoin',
    network: 'BTC Mainnet',
    symbol: 'BTC',
    address: '1FcThSprBdA4RQ6bZegw4UyYZMys1NbD9w',
    instruction: 'Send BTC to the dedicated Bitcoin address above.'
  },
  {
    currency: 'Litecoin',
    network: 'LTC Mainnet',
    symbol: 'LTC',
    address: 'LcoRbiEKpYDxEHQrtUsiP2RU1MLQmNYnGy',
    instruction: 'Low fee, lightning fast Litecoin transaction.'
  },
  {
    currency: 'Ethereum',
    network: 'ETH Mainnet',
    symbol: 'ETH',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    instruction: 'Send ETH directly to the Ethereum address.'
  },
  {
    currency: 'BNB (Binance Coin)',
    network: 'BNB Smart Chain (BEP20)',
    symbol: 'BNB',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    instruction: 'Send Native BNB (BEP20) to this address.'
  },
  {
    currency: 'Solana',
    network: 'Solana Mainnet',
    symbol: 'SOL',
    address: '3iPS8xWurfFL6PPSR1czKN6mcAZSAhBa5Bny9TXZYmfg',
    instruction: 'Send SOL directly via Solana network for 5-second confirmation.'
  },
  {
    currency: 'USDC (ERC20)',
    network: 'Ethereum (ERC20)',
    symbol: 'USDC-ERC20',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    instruction: 'Send USD Coin via Ethereum network (ERC-20).'
  },
  {
    currency: 'USDC (BEP20)',
    network: 'BNB Smart Chain (BEP20)',
    symbol: 'USDC-BEP20',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    instruction: 'Send USD Coin via BNB Smart Chain (BEP-20).'
  },
  {
    currency: 'TRON',
    network: 'TRON (TRX)',
    symbol: 'TRX',
    address: 'TQkGnoSN5EaKnNpbXCV7cBdzTG7zYJT6rL',
    instruction: 'Send TRX directly via TRON network.'
  },
  {
    currency: 'Dogecoin',
    network: 'Dogecoin Mainnet',
    symbol: 'DOGE',
    address: 'D8Az7EYHRMvvtGM1X44eVFyrmEayt3H6h7',
    instruction: 'Send DOGE to the address shown above.'
  }
];

export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  USDT: 1
};
