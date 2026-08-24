import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SERVICES, CATEGORIES } from '../src/data/services';
import { ServicePackage, ServiceItem } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom exact package configurations from the Google Doc
const EXACT_PRICE_MAP: Record<string, { startingPrice: number; packages: ServicePackage[] }> = {
  // --- Ads Accounts ---
  'Buy Facebook Ads Account': {
    startingPrice: 150,
    packages: [
      { id: 'fb-50', name: '50$ Spending Account', quantity: 1, unit: 'account', price: 150, deliveryTime: '1-3 Hours', features: ['50$ Daily spending limit', 'Pre-warmed business manager', 'Active pixel setup included', 'Full replacement warranty'] },
      { id: 'fb-250', name: '250$ Spending Account', quantity: 1, unit: 'account', price: 220, popular: true, deliveryTime: '1-3 Hours', features: ['250$ Daily spending limit', 'Aged 6+ months account history', 'High-trust advertising profile', 'Ready for scaling'] },
      { id: 'fb-unlimited', name: 'Unlimited Spending Account', quantity: 1, unit: 'account', price: 300, deliveryTime: '1-3 Hours', features: ['Unlimited daily spending limit', 'Fully verified business entity', 'Priority support & replacement', 'Zero spending throttles'] }
    ]
  },
  'Buy Google Ads Account': {
    startingPrice: 120,
    packages: [
      { id: 'gads-350', name: '350$ Spendable Google Ads Account', quantity: 1, unit: 'account', price: 120, deliveryTime: '1-3 Hours', features: ['350$ Spendable ad threshold', 'Billing method verified & active', 'Search & display enabled', 'Fast delivery with credentials'] },
      { id: 'gads-500', name: '500$ Spendable Google Ads Account', quantity: 1, unit: 'account', price: 220, popular: true, deliveryTime: '1-3 Hours', features: ['500$ Spendable ad credit/threshold', 'Aged account profile', 'Approved campaign readiness', 'Full billing access provided'] },
      { id: 'gads-1000', name: '1000$ Spendable Google Ads Account', quantity: 1, unit: 'account', price: 350, deliveryTime: '1-3 Hours', features: ['1,000$ High spendable threshold', 'Enterprise aged Google Ads manager', 'Multi-country targeting allowed', 'VIP support & replacement guarantee'] }
    ]
  },
  'Buy TikTok Ads Account': {
    startingPrice: 55,
    packages: [
      { id: 'tt-1', name: '01 TikTok Ads Account', quantity: 1, unit: 'account', price: 55, deliveryTime: '1-3 Hours', features: ['01 Verified TikTok Ads Account', 'Worldwide targeting enabled', 'Pre-activated business center', 'Instant login delivery'] },
      { id: 'tt-2', name: '02 TikTok Ads Account', quantity: 2, unit: 'accounts', price: 95, popular: true, deliveryTime: '1-3 Hours', features: ['02 Verified TikTok Ads Accounts', 'Save on multi-pack', 'Worldwide targeting', 'Full replacement warranty'] }
    ]
  },
  'Buy Twitter (X) Ads Account': {
    startingPrice: 50,
    packages: [
      { id: 'tw-1', name: '01 Twitter (X) Ads Account', quantity: 1, unit: 'account', price: 50, deliveryTime: '1-3 Hours', features: ['01 Verified X / Twitter Ads Manager', 'Credit line active', 'Global promotion enabled', 'Instant credentials'] },
      { id: 'tw-2', name: '02 Twitter (X) Ads Account', quantity: 2, unit: 'accounts', price: 95, popular: true, deliveryTime: '1-3 Hours', features: ['02 Verified X / Twitter Ads Accounts', 'Bulk discount included', 'Full replacement guarantee'] }
    ]
  },
  'Buy LinkedIn Ads Account': {
    startingPrice: 70,
    packages: [
      { id: 'li-1', name: '01 LinkedIn Ads Account', quantity: 1, unit: 'account', price: 70, deliveryTime: '1-3 Hours', features: ['01 Verified LinkedIn Campaign Manager', 'B2B high-trust ad account', 'Enterprise targeting enabled'] },
      { id: 'li-2', name: '02 LinkedIn Ads Account', quantity: 2, unit: 'accounts', price: 120, popular: true, deliveryTime: '1-3 Hours', features: ['02 Verified LinkedIn Ads Accounts', 'Multi-campaign scaling', 'Full access guarantee'] }
    ]
  },
  'Buy Snapchat Ads Account': {
    startingPrice: 45,
    packages: [
      { id: 'sc-1', name: '01 Snapchat Ads Account', quantity: 1, unit: 'account', price: 45, deliveryTime: '1-3 Hours', features: ['01 Verified Snapchat Ads Account', 'Ready to run campaigns', 'Instant delivery'] },
      { id: 'sc-2', name: '02 Snapchat Ads Account', quantity: 2, unit: 'accounts', price: 80, popular: true, deliveryTime: '1-3 Hours', features: ['02 Verified Snapchat Ads Accounts', 'Dual scaling accounts', 'Replacement guarantee'] }
    ]
  },
  'Buy Pinterest Ads Account': {
    startingPrice: 45,
    packages: [
      { id: 'pin-1', name: '01 Pinterest Ads Account', quantity: 1, unit: 'account', price: 45, deliveryTime: '1-3 Hours', features: ['01 Verified Pinterest Ads Account', 'eCommerce campaign ready', 'Instant delivery'] },
      { id: 'pin-2', name: '02 Pinterest Ads Account', quantity: 2, unit: 'accounts', price: 80, popular: true, deliveryTime: '1-3 Hours', features: ['02 Verified Pinterest Ads Accounts', 'Bulk bundle saving', 'Replacement warranty'] }
    ]
  },
  'Buy Bing Ads Account': {
    startingPrice: 45,
    packages: [
      { id: 'bing-1', name: '01 Bing Ads Account', quantity: 1, unit: 'account', price: 45, deliveryTime: '1-3 Hours', features: ['01 Microsoft Advertising / Bing Ads Account', 'Search network enabled', 'Instant access'] },
      { id: 'bing-2', name: '02 Bing Ads Account', quantity: 2, unit: 'accounts', price: 80, popular: true, deliveryTime: '1-3 Hours', features: ['02 Microsoft / Bing Ads Accounts', 'Multi-campaign readiness', 'Full replacement guarantee'] }
    ]
  },
  'Buy Reddit Ads Account': {
    startingPrice: 50,
    packages: [
      { id: 'rd-1', name: '01 Reddit Ads Account', quantity: 1, unit: 'account', price: 50, deliveryTime: '1-3 Hours', features: ['01 Verified Reddit Ads Account', 'Subreddit campaign ready', 'Instant delivery'] },
      { id: 'rd-2', name: '02 Reddit Ads Account', quantity: 2, unit: 'accounts', price: 95, popular: true, deliveryTime: '1-3 Hours', features: ['02 Verified Reddit Ads Accounts', 'Package savings', 'Full warranty'] }
    ]
  },
  'Buy Quora Ads Account': {
    startingPrice: 50,
    packages: [
      { id: 'qa-1', name: '01 Quora Ads Account', quantity: 1, unit: 'account', price: 50, deliveryTime: '1-3 Hours', features: ['01 Verified Quora Ads Account', 'High-intent audience ready', 'Instant delivery'] },
      { id: 'qa-2', name: '02 Quora Ads Account', quantity: 2, unit: 'accounts', price: 95, popular: true, deliveryTime: '1-3 Hours', features: ['02 Verified Quora Ads Accounts', 'Dual accounts bundle', 'Replacement warranty'] }
    ]
  },
  'Buy Amazon Ads Account': {
    startingPrice: 100,
    packages: [
      { id: 'amz-1', name: '01 Amazon Ads Account', quantity: 1, unit: 'account', price: 100, deliveryTime: '1-3 Hours', features: ['01 Verified Amazon Ads Account', 'Sponsored products enabled', 'High threshold access'] },
      { id: 'amz-2', name: '02 Amazon Ads Account', quantity: 2, unit: 'accounts', price: 190, popular: true, deliveryTime: '1-3 Hours', features: ['02 Verified Amazon Ads Accounts', 'Multi-brand management', 'Full guarantee'] }
    ]
  },

  // --- Payment & Business Accounts ---
  'Buy Verified PayPal Account': {
    startingPrice: 80,
    packages: [
      { id: 'pp-pers', name: 'Personal account', quantity: 1, unit: 'account', price: 80, deliveryTime: '1-3 Hours', features: ['Personal account price 80$', 'Full KYC verified with documents', 'Bank & card linked', 'Instant login delivery'] },
      { id: 'pp-biz', name: 'Business Accounts', quantity: 1, unit: 'account', price: 120, popular: true, deliveryTime: '1-3 Hours', features: ['Business Accounts price 120$', 'High limits processing', 'EIN / Business documentation verified', 'Full replacement warranty'] }
    ]
  },
  'Buy Verified Stripe Account': {
    startingPrice: 350,
    packages: [
      { id: 'str-new', name: 'New Stripe Account', quantity: 1, unit: 'account', price: 350, deliveryTime: '1-3 Hours', features: ['New Stripe Account price 350$', 'KYC verified with business identity', 'Integrated bank routing', 'Instant card processing ready'] },
      { id: 'str-old', name: 'Old Stripe Account', quantity: 1, unit: 'account', price: 550, popular: true, deliveryTime: '1-3 Hours', features: ['Old Stripe Account Price 550$', 'Aged 6+ to 12+ months history', 'High volume tolerance & lower reserve risk', 'Full documentation & backup codes'] }
    ]
  },
  'Buy Verified Square Account': {
    startingPrice: 450,
    packages: [
      { id: 'sq-new', name: 'New Business Verified account', quantity: 1, unit: 'account', price: 450, deliveryTime: '1-3 Hours', features: ['New Business Verified account price 450$', 'POS & virtual terminal activated', 'Instant payouts enabled'] },
      { id: 'sq-old', name: 'Old Business Verified account', quantity: 1, unit: 'account', price: 660, popular: true, deliveryTime: '1-3 Hours', features: ['Old Business Verified account price 660$', 'Aged account with history', 'High processing volume limits'] }
    ]
  },
  'Buy Verified Adyen Account': {
    startingPrice: 550,
    packages: [
      { id: 'ad-new', name: 'New Verified Adyen Account', quantity: 1, unit: 'account', price: 550, deliveryTime: '1-3 Hours', features: ['New Verified Adyen Account price 550$', 'Global payment gateway active', 'Full API credentials'] },
      { id: 'ad-old', name: 'Old Verified Adyen Account', quantity: 1, unit: 'account', price: 850, popular: true, deliveryTime: '1-3 Hours', features: ['Old Verified Adyen Account Price 850$', 'Aged account with history', 'Enterprise processing limits'] }
    ]
  },
  'Buy Verified Authorize.Net Account': {
    startingPrice: 450,
    packages: [
      { id: 'auth-new', name: 'New Verified Authorize.Net Account', quantity: 1, unit: 'account', price: 450, deliveryTime: '1-3 Hours', features: ['New Verified Authorize.Net Account price 450$', 'Merchant gateway & virtual terminal', 'Full credentials'] },
      { id: 'auth-aged', name: 'Aged Verified Authorize.Net Account', quantity: 1, unit: 'account', price: 550, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Verified Authorize.Net Account price 550$', 'Aged clean history', 'High volume thresholds'] }
    ]
  },
  'Buy Verified 2Checkout Account': {
    startingPrice: 550,
    packages: [
      { id: '2co-new', name: 'LLC Verified 2Checkout New Account', quantity: 1, unit: 'account', price: 550, deliveryTime: '1-3 Hours', features: ['LLC Verified 2Checkout New Account price 550$', 'Global multi-currency checkout', 'Instant setup'] },
      { id: '2co-aged', name: 'LLC Verified 2Checkout Aged Account', quantity: 1, unit: 'account', price: 750, popular: true, deliveryTime: '1-3 Hours', features: ['LLC Verified 2Checkout Aged Account price 750$', 'Aged LLC account', 'Zero reserve hold status'] }
    ]
  },
  'Buy Verified Skrill Account': {
    startingPrice: 170,
    packages: [
      { id: 'skrill-sa', name: 'South Asia Country Verified Skrill Account', quantity: 1, unit: 'account', price: 170, deliveryTime: '1-3 Hours', features: ['South Asia Country Verified Skrill Account price 170$', 'Full KYC verified with ID & proof of address', 'Instant send and receive'] },
      { id: 'skrill-eu', name: 'European country Verified Skrill Account', quantity: 1, unit: 'account', price: 230, deliveryTime: '1-3 Hours', features: ['European country Verified Skrill Account price 230$', 'SEPA payment enabled', 'High transfer limits'] },
      { id: 'skrill-usa', name: 'USA Country Verified Skrill Account', quantity: 1, unit: 'account', price: 300, popular: true, deliveryTime: '1-3 Hours', features: ['USA Country Verified Skrill Account price 300$', 'US verified identity & bank link', 'Full clean IP history'] },
      { id: 'skrill-biz', name: 'Business Verified Skrill Account', quantity: 1, unit: 'account', price: 520, deliveryTime: '1-3 Hours', features: ['Business Verified Skrill Account price 520$', 'Commercial merchant gateway', 'Unlimited volume'] }
    ]
  },
  'Buy Verified Payoneer Account': {
    startingPrice: 150,
    packages: [
      { id: 'payo-sa', name: 'South Asia Country Verified Payoneer Account', quantity: 1, unit: 'account', price: 150, deliveryTime: '1-3 Hours', features: ['South Asia Country Verified Payoneer Account price 150$', 'Global receiving bank accounts (USD, EUR, GBP)', 'Instant access'] },
      { id: 'payo-eu', name: 'European country Verified Payoneer Account', quantity: 1, unit: 'account', price: 200, deliveryTime: '1-3 Hours', features: ['European country Verified Payoneer Account price 200$', 'EU IBAN & UK sort code active', 'Direct marketplace payout ready'] },
      { id: 'payo-usa', name: 'USA Country Verified Payoneer Account', quantity: 1, unit: 'account', price: 260, popular: true, deliveryTime: '1-3 Hours', features: ['USA Country Verified Payoneer Account price 260$', 'US receiving account + routing', 'High threshold balance'] },
      { id: 'payo-llc', name: 'LLC Business Verified Payoneer Account', quantity: 1, unit: 'account', price: 450, deliveryTime: '1-3 Hours', features: ['LLC Business Verified Payoneer Account price 450$', 'Corporate LLC verified', 'Unlimited incoming wire transfers'] }
    ]
  },
  'Buy Verified Remitly Accounts': {
    startingPrice: 220,
    packages: [
      { id: 'remit-new', name: 'New Remitly Account', quantity: 1, unit: 'account', price: 220, deliveryTime: '1-3 Hours', features: ['New Remitly Account price 220$', 'KYC verified profile', 'Instant transfer ready'] },
      { id: 'remit-old', name: 'Old Remitly Account', quantity: 1, unit: 'account', price: 320, popular: true, deliveryTime: '1-3 Hours', features: ['Old Remitly Account Price 320$', 'Aged profile with history', 'Higher monthly sending limit'] }
    ]
  },
  'Buy Verified Worldremit Accounts': {
    startingPrice: 250,
    packages: [
      { id: 'wremit-new', name: 'New Worldremit Account', quantity: 1, unit: 'account', price: 250, deliveryTime: '1-3 Hours', features: ['New Worldremit Account price 250$', 'KYC verified remittance account'] },
      { id: 'wremit-old', name: 'Old Worldremit Account', quantity: 1, unit: 'account', price: 320, popular: true, deliveryTime: '1-3 Hours', features: ['Old Worldremit Account Price 320$', 'Aged account with transfer history', 'Full warranty'] }
    ]
  },
  'Buy Verified Worldfirst Accounts': {
    startingPrice: 250,
    packages: [
      { id: 'wfirst-new', name: 'New Worldfirst Account', quantity: 1, unit: 'account', price: 250, deliveryTime: '1-3 Hours', features: ['New Worldfirst Account price 250$', 'Multi-currency collection details'] },
      { id: 'wfirst-old', name: 'Old Worldfirst Account', quantity: 1, unit: 'account', price: 320, popular: true, deliveryTime: '1-3 Hours', features: ['Old Worldfirst Account Price 320$', 'Aged Worldfirst account', 'High limit cross-border transfer'] }
    ]
  },
  'Buy Verified Rizon Accounts': {
    startingPrice: 300,
    packages: [
      { id: 'rizon-new', name: 'New Rizon Account', quantity: 1, unit: 'account', price: 300, deliveryTime: '1-3 Hours', features: ['New Rizon Account price 300$', 'KYC verified Rizon account'] },
      { id: 'rizon-old', name: 'Old Rizon Account', quantity: 1, unit: 'account', price: 450, popular: true, deliveryTime: '1-3 Hours', features: ['Old Rizon Account Price 450$', 'Aged Rizon account', 'Higher processing limit'] }
    ]
  },
  'Buy Verified RedotPay Accounts': {
    startingPrice: 200,
    packages: [
      { id: 'redot-new', name: 'New RedotPay Account', quantity: 1, unit: 'account', price: 200, deliveryTime: '1-3 Hours', features: ['New RedotPay Account price 200$', 'KYC verified RedotPay', 'Virtual crypto card enabled'] },
      { id: 'redot-old', name: 'Old RedotPay Account', quantity: 1, unit: 'account', price: 250, popular: true, deliveryTime: '1-3 Hours', features: ['Old RedotPay Account Price 250$', 'Aged RedotPay account with card history'] }
    ]
  },
  'Buy Verified Wise Account': {
    startingPrice: 300,
    packages: [
      { id: 'wise-pers', name: 'Personal wise account', quantity: 1, unit: 'account', price: 300, deliveryTime: '1-3 Hours', features: ['Personal wise account price 300$', 'Full KYC verified with international bank details (USD, EUR, GBP)'] },
      { id: 'wise-biz', name: 'Business wise Account', quantity: 1, unit: 'account', price: 420, popular: true, deliveryTime: '1-3 Hours', features: ['Business wise Account Price 420$', 'Fully verified Business Wise entity', 'Corporate IBAN & batch payments'] }
    ]
  },
  'Buy Verified Neteller Account': {
    startingPrice: 250,
    packages: [
      { id: 'net-pers', name: 'Personal neteller Account', quantity: 1, unit: 'account', price: 250, deliveryTime: '1-3 Hours', features: ['Personal neteller Account price 250$', 'KYC verified Neteller wallet'] },
      { id: 'net-biz', name: 'Business neteler account', quantity: 1, unit: 'account', price: 350, popular: true, deliveryTime: '1-3 Hours', features: ['Business neteler account price 350$', 'Corporate merchant verified', 'High limits'] }
    ]
  },
  'Buy Verified Apple Pay Account': {
    startingPrice: 280,
    packages: [
      { id: 'ap-new', name: 'New Apple Pay Account', quantity: 1, unit: 'account', price: 280, deliveryTime: '1-3 Hours', features: ['New Apple Pay Account price 280$', 'KYC verified Apple Pay Cash'] },
      { id: 'ap-old', name: 'Old Apple Pay Account', quantity: 1, unit: 'account', price: 370, popular: true, deliveryTime: '1-3 Hours', features: ['Old Apple Pay Account Price 370$', 'Aged Apple Pay Cash account', 'Established history'] }
    ]
  },
  'Buy Verified Google Pay Account': {
    startingPrice: 300,
    packages: [
      { id: 'gp-new', name: 'New Google Pay Account', quantity: 1, unit: 'account', price: 300, deliveryTime: '1-3 Hours', features: ['New Google Pay Account price 300$', 'Verified Google Pay profile'] },
      { id: 'gp-old', name: 'Old Google Pay Account', quantity: 1, unit: 'account', price: 350, popular: true, deliveryTime: '1-3 Hours', features: ['Old Google Pay Account Price 350$', 'Aged Google Pay profile', 'Higher transaction limit'] }
    ]
  },

  // --- Marketplace & Ecommerce Accounts ---
  'Buy Shopify Accounts': {
    startingPrice: 40,
    packages: [
      { id: 'shop-1', name: 'Per Shopify Account', quantity: 1, unit: 'account', price: 40, deliveryTime: '1-3 Hours', features: ['Per Shopify Account price 40$', 'Aged Shopify Store Account', 'Clean billing setup', 'Instant store ownership transfer'] }
    ]
  },
  'Buy Amazon Buyer Accounts': {
    startingPrice: 45,
    packages: [
      { id: 'amzb-1', name: 'Aged Amazon buyer account', quantity: 1, unit: 'account', price: 45, deliveryTime: '1-3 Hours', features: ['Aged Amazon buyer account price 45$', 'Aged 1+ Year Amazon Buyer Profile', 'Order history & active cookies'] }
    ]
  },
  'Buy Ticketmaster Accounts': {
    startingPrice: 35,
    packages: [
      { id: 'tm-1', name: 'Aged Ticketmaster account', quantity: 1, unit: 'account', price: 35, deliveryTime: '1-3 Hours', features: ['Aged Ticketmaster account price 35$', 'Aged verified Ticketmaster account', 'Queue & ticket purchase ready'] }
    ]
  },
  'Buy Craigslist Account': {
    startingPrice: 10,
    packages: [
      { id: 'cl-1', name: 'Aged Craigslist per account', quantity: 1, unit: 'account', price: 10, deliveryTime: '1-3 Hours', features: ['Aged Craigslist per account price 10$', 'Aged Craigslist PVA account', 'Active posting capability'] }
    ]
  },
  'Buy Blackhatworld Accounts': {
    startingPrice: 50,
    packages: [
      { id: 'bhw-aged', name: 'Just Aged Blackhatworld account', quantity: 1, unit: 'account', price: 50, deliveryTime: '1-3 Hours', features: ['Just Aged Blackhatworld account price 50$', 'Aged 2+ years BHW account', 'Organic posts and reputation'] },
      { id: 'bhw-jrvip', name: 'Jr VIP Blackhatworld Account', quantity: 1, unit: 'account', price: 300, popular: true, deliveryTime: '1-3 Hours', features: ['Jr VIP Blackhatworld Account price 300$', 'Official Jr VIP membership status', 'BST marketplace sales thread enabled'] },
      { id: 'bhw-prem', name: 'Premium Member Blackhatworld Account', quantity: 1, unit: 'account', price: 800, deliveryTime: '1-3 Hours', features: ['Premium Member Blackhatworld Account price 800$', 'Top-tier Premium Member badge', 'Full marketplace privileges'] }
    ]
  },

  // --- Bank Accounts ---
  'Buy Verified JPMorgan Chase Bank Account': { startingPrice: 550, packages: [{ id: 'chase-1', name: 'JPMorgan Chase Bank Account', quantity: 1, unit: 'account', price: 550, deliveryTime: '1-3 Hours', features: ['JPMorgan Chase Bank Account Price 550$', 'Full online banking credentials', 'Checking & routing number', 'Zelle & wire transfer enabled'] }] },
  'Buy Verified Bank of America Account': { startingPrice: 480, packages: [{ id: 'bofa-1', name: 'Bank of America Account', quantity: 1, unit: 'account', price: 480, deliveryTime: '1-3 Hours', features: ['Bank of America Account price 480$', 'Complete online access', 'Routing & account numbers', 'Zelle active'] }] },
  'Buy Verified Wells Fargo Account': { startingPrice: 530, packages: [{ id: 'wf-1', name: 'Verified Wells Fargo Account', quantity: 1, unit: 'account', price: 530, deliveryTime: '1-3 Hours', features: ['Verified Wells Fargo Account price 530$', 'Verified Wells Fargo checking account', 'Online banking login & email access'] }] },
  'Buy Verified Citibank Account': { startingPrice: 580, packages: [{ id: 'citi-1', name: 'Verified Citibank Account', quantity: 1, unit: 'account', price: 580, deliveryTime: '1-3 Hours', features: ['Verified Citibank Account price 580$', 'Verified Citibank checking/savings', 'Direct deposit & wire active'] }] },
  'Buy Verified HSBC Account': { startingPrice: 590, packages: [{ id: 'hsbc-1', name: 'Verified HSBC Account', quantity: 1, unit: 'account', price: 590, deliveryTime: '1-3 Hours', features: ['Verified HSBC Account price 590$', 'Verified Global HSBC account', 'Multi-currency capabilities'] }] },
  'Buy Verified Barclays Bank Account': { startingPrice: 620, packages: [{ id: 'barclays-1', name: 'Verified Barclays Bank Account', quantity: 1, unit: 'account', price: 620, deliveryTime: '1-3 Hours', features: ['Verified Barclays Bank Account price 620$', 'UK Sort Code & Account Number', 'Full Barclays online & app access'] }] },
  'Buy Verified Santander Bank Account': { startingPrice: 630, packages: [{ id: 'santander-1', name: 'Verified Santander Bank Account', quantity: 1, unit: 'account', price: 630, deliveryTime: '1-3 Hours', features: ['Verified Santander Bank Account price 630$', 'Verified Santander account', 'SEPA/Faster payments ready'] }] },
  'Buy Verified Standard Chartered Bank Account': { startingPrice: 570, packages: [{ id: 'scb-1', name: 'Verified Standard Chartered Bank Account', quantity: 1, unit: 'account', price: 570, deliveryTime: '1-3 Hours', features: ['Verified Standard Chartered Bank Account price 570$', 'International banking portal', 'Full documents'] }] },
  'Buy Verified Deutsche Bank Account': { startingPrice: 620, packages: [{ id: 'db-1', name: 'Verified Deutsche Bank Account', quantity: 1, unit: 'account', price: 620, deliveryTime: '1-3 Hours', features: ['Verified Deutsche Bank Account price 620$', 'German IBAN & online access', 'SEPA transfer ready'] }] },
  'Buy Verified UBS Bank Account': { startingPrice: 560, packages: [{ id: 'ubs-1', name: 'Verified UBS Bank Account', quantity: 1, unit: 'account', price: 560, deliveryTime: '1-3 Hours', features: ['Verified UBS Bank Account price 560$', 'Swiss UBS verified account', 'Private/business online banking'] }] },
  'Buy Verified Revolut Business Account': { startingPrice: 550, packages: [{ id: 'rev-biz-1', name: 'Verified Revolut Business Account', quantity: 1, unit: 'account', price: 550, deliveryTime: '1-3 Hours', features: ['Verified Revolut Business Account price 550$', 'Corporate KYC approved Revolut', 'Multi-currency IBAN & cards'] }] },
  'Buy Verified Wise Business Account': { startingPrice: 450, packages: [{ id: 'wise-biz-1', name: 'Verified Wise Business Account', quantity: 1, unit: 'account', price: 450, deliveryTime: '1-3 Hours', features: ['Verified Wise Business Account price 450$', 'Global bank account numbers', 'Direct batch payouts'] }] },
  'Buy Verified Mercury Bank Account': { startingPrice: 720, packages: [{ id: 'merc-1', name: 'Verified Mercury Bank Account', quantity: 1, unit: 'account', price: 720, deliveryTime: '1-3 Hours', features: ['Verified Mercury Bank Account price 720$', 'US Tech Startup Mercury checking', 'Virtual debit cards & wire API'] }] },
  'Buy Verified BlueVine Bank Account': { startingPrice: 520, packages: [{ id: 'bv-1', name: 'Verified BlueVine Bank Account', quantity: 1, unit: 'account', price: 520, deliveryTime: '1-3 Hours', features: ['Verified BlueVine Bank Account price 520$', 'US Business checking account', 'High APY & zero monthly fees'] }] },
  'Buy Verified Axos Bank Account': { startingPrice: 520, packages: [{ id: 'axos-1', name: 'Verified Axos Bank Account', quantity: 1, unit: 'account', price: 520, deliveryTime: '1-3 Hours', features: ['Verified Axos Bank Account price 520$', 'Unlimited domestic ATM fee reimbursements'] }] },
  'Buy Verified Novo Bank Account': { startingPrice: 440, packages: [{ id: 'novo-1', name: 'Verified Novo Bank Account', quantity: 1, unit: 'account', price: 440, deliveryTime: '1-3 Hours', features: ['Verified Novo Bank Account price 440$', 'US small business online banking', 'Free invoicing & Stripe integration'] }] },
  'Buy Verified Monzo Business Account': { startingPrice: 550, packages: [{ id: 'monzo-1', name: 'Verified Monzo Business Account', quantity: 1, unit: 'account', price: 550, deliveryTime: '1-3 Hours', features: ['Verified Monzo Business Account price 550$', 'UK Monzo Business account', 'Instant mobile banking access'] }] },
  'Buy Verified Starling Bank Account': { startingPrice: 750, packages: [{ id: 'starling-1', name: 'Verified Starling Bank Account', quantity: 1, unit: 'account', price: 750, deliveryTime: '1-3 Hours', features: ['Verified Starling Bank Account price 750$', 'Top-rated UK Starling Business account', 'No fees overseas'] }] },
  'Buy Verified N26 Bank Account': { startingPrice: 550, packages: [{ id: 'n26-1', name: 'Verified N26 Bank Account', quantity: 1, unit: 'account', price: 550, deliveryTime: '1-3 Hours', features: ['Verified N26 Bank Account price 550$', 'European N26 German IBAN account', 'Virtual card ready'] }] },
  'Buy Verified First Direct Bank Account': { startingPrice: 530, packages: [{ id: 'fd-1', name: 'Verified First Direct Bank Account', quantity: 1, unit: 'account', price: 530, deliveryTime: '1-3 Hours', features: ['Verified First Direct Bank Account price 530$', 'UK First Direct checking account', 'Sort code & account number'] }] },

  // --- Crypto Exchanges (Specific special ones) ---
  'Buy Verified Binance Account': {
    startingPrice: 200,
    packages: [
      { id: 'bin-l2', name: 'Level 2 verified Binance account', quantity: 1, unit: 'account', price: 200, deliveryTime: '1-3 Hours', features: ['Level 2 verified Binance account price 200$', '50,000$ daily withdrawal limit', 'P2P trading enabled', 'Original email + 2FA backup codes'] },
      { id: 'bin-l3', name: 'Level 3 Verified Binance Account', quantity: 1, unit: 'account', price: 300, popular: true, deliveryTime: '1-3 Hours', features: ['Level 3 Verified Binance Account price 300$', 'Unlimited daily crypto & fiat withdrawals', 'Sub-accounts enabled'] }
    ]
  },
  'Buy Verified Coinbase Account': {
    startingPrice: 250,
    packages: [
      { id: 'cb-eu', name: 'European Verified Coinbase', quantity: 1, unit: 'account', price: 250, deliveryTime: '1-3 Hours', features: ['European Verified Coinbase price 250$', 'EU ID & Proof of Address KYC', 'SEPA deposit/withdrawal ready'] },
      { id: 'cb-usa', name: 'USA Verified Coinbase', quantity: 1, unit: 'account', price: 300, popular: true, deliveryTime: '1-3 Hours', features: ['USA Verified Coinbase price 300$', 'US SSN + State ID verified', 'ACH bank linking capability'] }
    ]
  },
  'Buy Verified Binance.US Account': {
    startingPrice: 300,
    packages: [
      { id: 'binus-new', name: 'New Verified Binance.US Account', quantity: 1, unit: 'account', price: 300, deliveryTime: '1-3 Hours', features: ['New Verified Binance.US Account price 300$', 'US KYC verified profile', 'ACH & wire deposit active'] },
      { id: 'binus-aged', name: 'Aged Verified Binance.US Account', quantity: 1, unit: 'account', price: 400, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Verified Binance.US Account price 400$', 'Aged account with trade history', 'Maximum withdrawal limits'] }
    ]
  },
  'Buy Verified Paxful Account': {
    startingPrice: 200,
    packages: [
      { id: 'pax-l2', name: 'Level 2 Paxful Account', quantity: 1, unit: 'account', price: 200, deliveryTime: '1-3 Hours', features: ['Level 2 Paxful Account price 200$', 'ID & Phone verified Level 2', 'Trade up to 10,000$ limit'] },
      { id: 'pax-l3', name: 'Level 3 Paxful Account', quantity: 1, unit: 'account', price: 280, popular: true, deliveryTime: '1-3 Hours', features: ['Level 3 Paxful Account price 280$', 'Address verified Level 3', 'Unlimited trading volume'] }
    ]
  },
  'Buy Verified FTX Account': {
    startingPrice: 250,
    packages: [
      { id: 'ftx-new', name: 'New Verified FTX Account', quantity: 1, unit: 'account', price: 250, deliveryTime: '1-3 Hours', features: ['New Verified FTX Account price 250$', 'KYC Level 2 verified', 'Instant access'] },
      { id: 'ftx-aged', name: 'Aged Verified FTX Account', quantity: 1, unit: 'account', price: 330, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Verified FTX Account price 330$', 'Aged verified account with trade records'] }
    ]
  },

  // --- Email Accounts ---
  'Buy USA Gmail Accounts': {
    startingPrice: 6,
    packages: [
      { id: 'gmail-2', name: '2 Gmail Accounts', quantity: 2, unit: 'accounts', price: 6, deliveryTime: '1-3 Hours', features: ['2 Gmail Accounts Price 6$', 'USA Phone Verified Gmails', 'Recovery email attached'] },
      { id: 'gmail-5', name: '5 Gmail Accounts', quantity: 5, unit: 'accounts', price: 15, deliveryTime: '1-3 Hours', features: ['5 Gmail Accounts Price 15$', '100% active and tested', 'Pop3/IMAP enabled'] },
      { id: 'gmail-20', name: '20 Gmail Accounts', quantity: 20, unit: 'accounts', price: 55, popular: true, deliveryTime: '1-3 Hours', features: ['20 Gmail Accounts Price 55$', 'USA PVA Gmails', 'Fast delivery'] },
      { id: 'gmail-50', name: '50 Gmail Accounts', quantity: 50, unit: 'accounts', price: 130, deliveryTime: '1-3 Hours', features: ['50 Gmail Accounts Price 130$', 'Bulk discount rate', 'High reliability'] },
      { id: 'gmail-100', name: '100 Gmail Accounts', quantity: 100, unit: 'accounts', price: 220, deliveryTime: '1-3 Hours', features: ['100 Gmail Accounts Price 220$', 'Best bulk rate ($2.20/ea)', 'Full replacement warranty'] }
    ]
  },
  'Buy PVA Gmail Accounts': {
    startingPrice: 6,
    packages: [
      { id: 'pvagmail-2', name: '2 Gmail Accounts', quantity: 2, unit: 'accounts', price: 6, deliveryTime: '1-3 Hours', features: ['2 Gmail Accounts Price 6$', 'Real Phone Verified Gmails'] },
      { id: 'pvagmail-5', name: '5 Gmail Accounts', quantity: 5, unit: 'accounts', price: 15, deliveryTime: '1-3 Hours', features: ['5 Gmail Accounts Price 15$', 'Real PVA Gmails', 'Secure format'] },
      { id: 'pvagmail-20', name: '20 Gmail Accounts', quantity: 20, unit: 'accounts', price: 55, popular: true, deliveryTime: '1-3 Hours', features: ['20 Gmail Accounts Price 55$', '20 PVA Gmails', 'Ready for outreach'] },
      { id: 'pvagmail-50', name: '50 Gmail Accounts', quantity: 50, unit: 'accounts', price: 130, deliveryTime: '1-3 Hours', features: ['50 Gmail Accounts Price 130$', '50 PVA Gmails', 'Bulk savings'] },
      { id: 'pvagmail-100', name: '100 Gmail Accounts', quantity: 100, unit: 'accounts', price: 220, deliveryTime: '1-3 Hours', features: ['100 Gmail Accounts Price 220$', '100 PVA Gmails', 'Full warranty'] }
    ]
  },
  'Buy Aged Mix Country Gmail Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'mixgmail-2', name: '2 Gmail Accounts', quantity: 2, unit: 'accounts', price: 5, deliveryTime: '1-3 Hours', features: ['2 Gmail Accounts Price 5$', 'Aged Mix Country Gmails'] },
      { id: 'mixgmail-5', name: '5 Gmail Accounts', quantity: 5, unit: 'accounts', price: 10, deliveryTime: '1-3 Hours', features: ['5 Gmail Accounts Price 10$', '5 Aged Mix Country Gmails'] },
      { id: 'mixgmail-20', name: '20 Gmail Accounts', quantity: 20, unit: 'accounts', price: 40, popular: true, deliveryTime: '1-3 Hours', features: ['20 Gmail Accounts Price 40$', '20 Aged Mix Country Gmails'] },
      { id: 'mixgmail-50', name: '50 Gmail Accounts', quantity: 50, unit: 'accounts', price: 95, deliveryTime: '1-3 Hours', features: ['50 Gmail Accounts Price 95$', '50 Aged Mix Country Gmails'] },
      { id: 'mixgmail-100', name: '100 Gmail Accounts', quantity: 100, unit: 'accounts', price: 180, deliveryTime: '1-3 Hours', features: ['100 Gmail Accounts Price 180$', '100 Aged Mix Country Gmails'] }
    ]
  },
  'Buy Outlook Accounts': {
    startingPrice: 80,
    packages: [
      { id: 'out-new', name: 'New 100 Accounts', quantity: 100, unit: 'accounts', price: 80, deliveryTime: '1-3 Hours', features: ['New 100 Accounts Price 80$', 'Fresh Outlook PVA accounts', 'IMAP/POP3 active'] },
      { id: 'out-aged', name: 'Aged 100 Accounts', quantity: 100, unit: 'accounts', price: 150, popular: true, deliveryTime: '1-3 Hours', features: ['Aged 100 Accounts Price 150$', 'Aged Outlook accounts (1+ year)', 'High inbox placement'] }
    ]
  },
  'Buy Hotmail Accounts': {
    startingPrice: 80,
    packages: [
      { id: 'hot-new', name: 'New 100 Accounts', quantity: 100, unit: 'accounts', price: 80, deliveryTime: '1-3 Hours', features: ['New 100 Accounts Price 80$', 'Fresh Hotmail PVA accounts', 'Instant delivery format'] },
      { id: 'hot-aged', name: 'Aged 100 Accounts', quantity: 100, unit: 'accounts', price: 150, popular: true, deliveryTime: '1-3 Hours', features: ['Aged 100 Accounts Price 150$', 'Aged Hotmail accounts', 'Warm inbox score'] }
    ]
  },
  'Buy Edu Mail Accounts': {
    startingPrice: 10,
    packages: [
      { id: 'edu-1', name: '1 edu mail', quantity: 1, unit: 'account', price: 10, deliveryTime: '1-3 Hours', features: ['1 edu mail price 10$', 'Active .edu student email', 'Student discounts eligible (Spotify, Prime, GitHub)'] },
      { id: 'edu-2', name: '2 edu mail', quantity: 2, unit: 'accounts', price: 18, popular: true, deliveryTime: '1-3 Hours', features: ['2 edu mail price 18$', '2 Active .edu emails', 'Save on pair'] },
      { id: 'edu-3', name: '3 edu mail', quantity: 3, unit: 'accounts', price: 27, deliveryTime: '1-3 Hours', features: ['3 edu mail price 27$', '3 Active .edu emails', 'Full replacement warranty'] }
    ]
  },

  // --- Virtual Numbers ---
  'Buy Google Voice Accounts': {
    startingPrice: 10,
    packages: [
      { id: 'gv-1', name: 'Per Google Voice account', quantity: 1, unit: 'account', price: 10, deliveryTime: '1-3 Hours', features: ['Per Google Voice account price 10$', 'Real US Phone Number', 'Free US calls & SMS', 'Linked to Gmail'] }
    ]
  },
  'Buy Talkatone Accounts': {
    startingPrice: 7,
    packages: [
      { id: 'talk-norm', name: 'Normal Talkatone Account', quantity: 1, unit: 'account', price: 7, deliveryTime: '1-3 Hours', features: ['Normal Talkatone Account price 7$', 'Fresh USA Talkatone account', 'Active US number'] },
      { id: 'talk-sub', name: '1-month subscription active Talkatone account', quantity: 1, unit: 'account', price: 25, popular: true, deliveryTime: '1-3 Hours', features: ['1-month subscription active Talkatone account price 25$', 'Ad-free experience', 'Permanent number retention'] }
    ]
  },
  'Buy Textplus Accounts': {
    startingPrice: 7,
    packages: [
      { id: 'tp-norm', name: 'Normal Textplus Account', quantity: 1, unit: 'account', price: 7, deliveryTime: '1-3 Hours', features: ['Normal Textplus Account price 7$', 'Fresh Textplus US number'] },
      { id: 'tp-sub', name: '1-month subscription active Textplus account', quantity: 1, unit: 'account', price: 25, popular: true, deliveryTime: '1-3 Hours', features: ['1-month subscription active Textplus account price 25$', 'Permanent retention'] }
    ]
  },
  'Buy Textnow Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'tn-new', name: 'New Per Textnow Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Per Textnow Account price 5$', 'New verified TextNow account with US number'] },
      { id: 'tn-old', name: 'Old Textnow Account', quantity: 1, unit: 'account', price: 8, popular: true, deliveryTime: '1-3 Hours', features: ['Old Textnow Account price 8$', 'Aged TextNow account', 'Stable VoIP number'] }
    ]
  },
  'Buy Freetone Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'ft-new', name: 'New Per Freetone Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Per Freetone Account price 5$', 'New Freetone VoIP account'] },
      { id: 'ft-old', name: 'Old Freetone Account', quantity: 1, unit: 'account', price: 8, popular: true, deliveryTime: '1-3 Hours', features: ['Old Freetone Account price 8$', 'Aged Freetone account'] }
    ]
  },
  'Buy Textme Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'tm-new', name: 'New Per Textme Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Per Textme Account price 5$', 'New TextMe US number account'] },
      { id: 'tm-sub', name: '1-month subscription active Textme account', quantity: 1, unit: 'account', price: 25, popular: true, deliveryTime: '1-3 Hours', features: ['1-month subscription active Textme account price 25$', 'Ad-free premium'] }
    ]
  },
  'Buy Hushed Accounts': {
    startingPrice: 25,
    packages: [
      { id: 'hush-1m', name: '1-month premium active Hushed account', quantity: 1, unit: 'account', price: 25, deliveryTime: '1-3 Hours', features: ['1-month premium active Hushed account price 25$', 'Dedicated private US/UK number', 'Unlimited calls & texts'] }
    ]
  },
  'Buy Slynumber Accounts': {
    startingPrice: 25,
    packages: [
      { id: 'sly-1m', name: '1-month premium active Slynumber account', quantity: 1, unit: 'account', price: 25, deliveryTime: '1-3 Hours', features: ['1-month premium active Slynumber account price 25$', 'Real mobile number profile', 'Instant SMS receipt'] }
    ]
  },
  'Buy Sideline Accounts': {
    startingPrice: 25,
    packages: [
      { id: 'side-1m', name: '1-month premium active Sideline account', quantity: 1, unit: 'account', price: 25, deliveryTime: '1-3 Hours', features: ['1-month premium active Sideline account price 25$', 'Carrier-grade US phone number', 'Auto-reply & business features'] }
    ]
  },
  'Buy Hitmess Accounts': {
    startingPrice: 25,
    packages: [
      { id: 'hit-1m', name: '1-month premium active Hitmess account', quantity: 1, unit: 'account', price: 25, deliveryTime: '1-3 Hours', features: ['1-month premium active Hitmess account price 25$', 'Virtual SMS & calling activated'] }
    ]
  },
  'Buy Textfree Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'tf-new', name: 'New Per Textfree Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Per Textfree Account price 5$', 'New Textfree account with US number'] },
      { id: 'tf-old', name: 'Old Textfree Account', quantity: 1, unit: 'account', price: 8, popular: true, deliveryTime: '1-3 Hours', features: ['Old Textfree Account price 8$', 'Aged Textfree account', 'Stable number'] }
    ]
  },
  'Buy Openphone Accounts': {
    startingPrice: 25,
    packages: [
      { id: 'op-1m', name: '1-month premium active Openphone account', quantity: 1, unit: 'account', price: 25, deliveryTime: '1-3 Hours', features: ['1-month premium active Openphone account price 25$', 'Dedicated US local/toll-free number', 'Team messaging & recording'] }
    ]
  },
  'Buy Nextplus Accounts': {
    startingPrice: 7,
    packages: [
      { id: 'np-norm', name: 'Normal Nextplus Account', quantity: 1, unit: 'account', price: 7, deliveryTime: '1-3 Hours', features: ['Normal Nextplus Account price 7$', 'Normal Nextplus VoIP account with US number'] },
      { id: 'np-sub', name: '1-month subscription active Nextplus account', quantity: 1, unit: 'account', price: 25, popular: true, deliveryTime: '1-3 Hours', features: ['1-month subscription active Nextplus account price 25$', 'Permanent retention'] }
    ]
  },
  'Buy Index Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'idx-new', name: 'New Per Index Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Per Index Account price 5$', 'New Index VoIP account'] },
      { id: 'idx-old', name: 'Old Index Account', quantity: 1, unit: 'account', price: 8, popular: true, deliveryTime: '1-3 Hours', features: ['Old Index Account price 8$', 'Aged Index account'] }
    ]
  },
  'Buy Ring4 Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'ring-new', name: 'New Per Ring4 Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Per Ring4 Account price 5$', 'New Ring4 account with US number'] },
      { id: 'ring-old', name: 'Old Ring4 Account', quantity: 1, unit: 'account', price: 8, popular: true, deliveryTime: '1-3 Hours', features: ['Old Ring4 Account price 8$', 'Aged Ring4 account'] }
    ]
  },
  'Buy WhatsApp Accounts USA Number': {
    startingPrice: 8,
    packages: [
      { id: 'wa-1', name: 'Per usa number for WhatsApp', quantity: 1, unit: 'account', price: 8, deliveryTime: '1-3 Hours', features: ['Per usa number for WhatsApp price 8$', 'Active WhatsApp USA Number Account', 'Instant session login', 'Full warranty'] }
    ]
  },

  // --- Aged & Review Accounts ---
  'Buy Aged Yelp Accounts': {
    startingPrice: 60,
    packages: [
      { id: 'yelp-pers', name: 'Personal Aged Yelp Account', quantity: 1, unit: 'account', price: 60, deliveryTime: '1-3 Hours', features: ['Personal Aged Yelp Account 60$', 'Aged personal Yelp profile', 'Review history & friends'] },
      { id: 'yelp-biz', name: 'Business Aged yelp Account', quantity: 1, unit: 'account', price: 120, popular: true, deliveryTime: '1-3 Hours', features: ['Business Aged yelp Account 120$', 'Aged Business Yelp account', 'Claimed business listing ready'] }
    ]
  },
  'Buy Aged Trustpilot Accounts': {
    startingPrice: 30,
    packages: [
      { id: 'tp-norm', name: 'Normal aged Trustpilot account', quantity: 1, unit: 'account', price: 30, deliveryTime: '1-3 Hours', features: ['Normal aged Trustpilot account price 30$', 'Aged 1+ year user profile', 'Non-drop review capability'] },
      { id: 'tp-verif', name: 'Verified Aged Trustpilot Account', quantity: 1, unit: 'account', price: 45, popular: true, deliveryTime: '1-3 Hours', features: ['Verified Aged Trustpilot Account price 45$', 'ID Verified Aged profile', 'Highest review weight'] }
    ]
  },
  'Buy Aged Reddit Accounts': {
    startingPrice: 35,
    packages: [
      { id: 'rd-1k', name: 'Aged Reddit account with 1k karma', quantity: 1, unit: 'account', price: 35, deliveryTime: '1-3 Hours', features: ['Aged Reddit account with 1k karma account price 35$', '1,000+ Organic post/comment karma', 'Bypass all subreddit limits'] },
      { id: 'rd-5k', name: 'Aged Reddit account with 5k karma', quantity: 1, unit: 'account', price: 70, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Reddit account with 5k karma account price 70$', '5,000+ Organic karma', 'High authority profile'] }
    ]
  },
  'Buy Aged TripAdvisor Accounts': {
    startingPrice: 30,
    packages: [
      { id: 'ta-aged', name: 'Aged TripAdvisor per account', quantity: 1, unit: 'account', price: 30, deliveryTime: '1-3 Hours', features: ['Aged TripAdvisor per account price 30$', 'Aged traveler profile', 'Level 2+ contributor'] }
    ]
  },
  'Buy Aged Medium Accounts': {
    startingPrice: 10,
    packages: [
      { id: 'med-aged', name: 'Per aged Medium account', quantity: 1, unit: 'account', price: 10, deliveryTime: '1-3 Hours', features: ['Per aged Medium account price 10$', 'Aged author profile', 'Publishing ready'] }
    ]
  },
  'Buy Aged Quora Accounts': {
    startingPrice: 10,
    packages: [
      { id: 'qa-aged', name: 'Per Aged Quora Account', quantity: 1, unit: 'account', price: 10, deliveryTime: '1-3 Hours', features: ['Per Aged Quora Account price 10$', 'Aged contributor profile', 'Answer posting ready'] }
    ]
  },

  // --- Social Media Accounts ---
  'Buy Instagram Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'ig-new', name: 'New Instagram Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Instagram Account price 5$', 'Fresh PVA Instagram account', 'Email verified'] },
      { id: 'ig-aged', name: 'Aged Instagram Account', quantity: 1, unit: 'account', price: 15, deliveryTime: '1-3 Hours', features: ['Aged Instagram Account price 15$', 'Aged 1-2 years profile', 'Natural posts'] },
      { id: 'ig-1k', name: 'Aged account with 1k followers Instagram account', quantity: 1, unit: 'account', price: 30, popular: true, deliveryTime: '1-3 Hours', features: ['Aged account with 1k followers Instagram account price 30$', '1,000+ Real followers', 'High engagement'] }
    ]
  },
  'Buy LinkedIn Accounts': {
    startingPrice: 50,
    packages: [
      { id: 'li-100', name: '100+ Connections LinkedIn Account', quantity: 1, unit: 'account', price: 50, deliveryTime: '1-3 Hours', features: ['100+ Connections LinkedIn Account price 50$', '100+ Real connections', 'Complete profile history'] },
      { id: 'li-300', name: '300+ Connections LinkedIn Account', quantity: 1, unit: 'account', price: 70, deliveryTime: '1-3 Hours', features: ['300+ Connections LinkedIn Account price 70$', '300+ Active connections', 'High SSI score'] },
      { id: 'li-500', name: '500+ Connections LinkedIn Account', quantity: 1, unit: 'account', price: 99, popular: true, deliveryTime: '1-3 Hours', features: ['500+ Connections LinkedIn Account price 99$', '500+ Top connections', 'Sales navigator ready'] },
      { id: 'li-nfc', name: 'NFC blue badge verified LinkedIn account', quantity: 1, unit: 'account', price: 150, deliveryTime: '1-3 Hours', features: ['NFC blue badge verified LinkedIn account price 150$', 'Official passport verified checkmark', 'Zero ban risk'] }
    ]
  },
  'Buy GitHub Accounts': {
    startingPrice: 35,
    packages: [
      { id: 'gh-5y', name: '5 years or older with Repository History Account', quantity: 1, unit: 'account', price: 35, deliveryTime: '1-3 Hours', features: ['5 years or older with Repository History Account price 35$', 'Green commit history', 'Public repos'] },
      { id: 'gh-7y', name: '7 years or older with Repository History Account', quantity: 1, unit: 'account', price: 50, popular: true, deliveryTime: '1-3 Hours', features: ['7 years or older with Repository History Account price 50$', '7+ Years veteran developer account', 'Stars and commits'] },
      { id: 'gh-legion', name: 'Buy GitHub for LEGION account', quantity: 1, unit: 'account', price: 55, deliveryTime: '1-3 Hours', features: ['Buy GitHub for LEGION account price 55$', 'LEGION integration ready', 'Full token & API access'] },
      { id: 'gh-authena', name: 'Buy GitHub for AUTHENA account', quantity: 1, unit: 'account', price: 55, deliveryTime: '1-3 Hours', features: ['Buy GitHub for AUTHENA account price 55$', 'AUTHENA integration ready', 'Full credentials'] }
    ]
  },
  'Buy Old Facebook Accounts': {
    startingPrice: 10,
    packages: [
      { id: 'fb-new', name: 'New Facebook Accounts', quantity: 1, unit: 'account', price: 10, deliveryTime: '1-3 Hours', features: ['New Facebook Accounts price 10$', 'Fresh PVA Facebook account'] },
      { id: 'fb-aged', name: 'Aged Facebook Account', quantity: 1, unit: 'account', price: 25, deliveryTime: '1-3 Hours', features: ['Aged Facebook Account price 25$', 'Aged 2+ years profile with history'] },
      { id: 'fb-5k', name: 'Aged Facebook Account with 5000 Friends Account', quantity: 1, unit: 'account', price: 45, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Facebook Account with 5000 Friends Account price 45$', '5,000 Friends profile', 'High engagement'] },
      { id: 'fb-mkt', name: 'USA Marketplace Enable Facebook Account', quantity: 1, unit: 'account', price: 50, deliveryTime: '1-3 Hours', features: ['USA Marketplace Enable Facebook Account Price 50$', 'US Facebook Marketplace tab active'] }
    ]
  },
  'Buy Old Twitter Accounts': {
    startingPrice: 10,
    packages: [
      { id: 'tw-new', name: 'New Accounts', quantity: 1, unit: 'account', price: 10, deliveryTime: '1-3 Hours', features: ['New Accounts Price 10$', 'Fresh X / Twitter account'] },
      { id: 'tw-aged', name: 'Aged Account', quantity: 1, unit: 'account', price: 25, deliveryTime: '1-3 Hours', features: ['Aged Account Price 25$', 'Aged 2+ years account with tweets'] },
      { id: 'tw-2k', name: 'Aged Account with 2k Followers', quantity: 1, unit: 'account', price: 50, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Account with 2k Followers Price $50', '2,000+ Real followers', 'Full warranty'] }
    ]
  },
  'Buy Snapchat Accounts': {
    startingPrice: 30,
    packages: [
      { id: 'sc-10k', name: '10k snap score Snapchat account', quantity: 1, unit: 'account', price: 30, deliveryTime: '1-3 Hours', features: ['10k snap score Snapchat account price 30$', '10,000+ Snap score established'] },
      { id: 'sc-100k', name: '100k Snap Score Snapchat account', quantity: 1, unit: 'account', price: 50, popular: true, deliveryTime: '1-3 Hours', features: ['100k Snap Score Snapchat account price 50$', '100,000+ Snap score high authority'] }
    ]
  },
  'Buy SoundCloud Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'sc-new', name: 'New Soundcloud Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Soundcloud Account price 5$', 'Fresh SoundCloud account'] },
      { id: 'sc-aged', name: 'Aged SoundCloud Account', quantity: 1, unit: 'account', price: 10, popular: true, deliveryTime: '1-3 Hours', features: ['Aged SoundCloud Account price 10$', 'Aged artist profile'] }
    ]
  },
  'Buy YouTube Channel': {
    startingPrice: 80,
    packages: [
      { id: 'yt-mon', name: 'Monetized youtube account', quantity: 1, unit: 'channel', price: 80, deliveryTime: '1-3 Hours', features: ['Monitized youtube account price 80$', '1,000+ Subs & 4,000+ Watch hours met', 'YPP Monetization approved & active'] }
    ]
  },
  'Buy Pinterest Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'pin-new', name: 'New Pinterest Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Pinterest Account price 5$', 'Fresh Pinterest profile'] },
      { id: 'pin-aged', name: 'Aged Pinterest Account', quantity: 1, unit: 'account', price: 10, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Pinterest Account price 10$', 'Aged creator profile with pins'] }
    ]
  },
  'Buy Discord Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'dc-new', name: 'New Discord Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Discord Account price 5$', 'Fresh Discord account'] },
      { id: 'dc-aged', name: 'Aged Discord Account', quantity: 1, unit: 'account', price: 10, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Discord Account price 10$', 'Aged 1+ year Discord account'] }
    ]
  },
  'Buy Telegram Accounts': {
    startingPrice: 10,
    packages: [
      { id: 'tg-new', name: 'New Telegram Account', quantity: 1, unit: 'account', price: 10, deliveryTime: '1-3 Hours', features: ['New Telegram Account price 10$', 'Fresh Telegram session account'] },
      { id: 'tg-aged', name: 'Aged Telegram Account', quantity: 1, unit: 'account', price: 20, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Telegram Account price 20$', 'Aged Telegram account', 'Outreach ready'] }
    ]
  },
  'Buy Nextdoor Accounts': {
    startingPrice: 10,
    packages: [
      { id: 'nd-new', name: 'New Nextdoor Account', quantity: 1, unit: 'account', price: 10, deliveryTime: '1-3 Hours', features: ['New Nextdoor Account price 10$', 'Fresh neighborhood account'] },
      { id: 'nd-aged', name: 'Aged Nextdoor Account', quantity: 1, unit: 'account', price: 20, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Nextdoor Account price 20$', 'Aged Nextdoor profile'] }
    ]
  },
  'Buy Bumble Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'bm-new', name: 'New Bumble Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Bumble Account price 5$', 'Fresh Bumble profile'] },
      { id: 'bm-aged', name: 'Aged Bumble Account', quantity: 1, unit: 'account', price: 10, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Bumble Account price 10$', 'Aged Bumble profile with history'] }
    ]
  },
  'Buy Aged Twitch Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'tw-new', name: 'New Twitch Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Twitch Account price 5$', 'Fresh Twitch viewer account'] },
      { id: 'tw-aged', name: 'Aged Twitch Account', quantity: 1, unit: 'account', price: 10, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Twitch Account price 10$', 'Aged Twitch account'] }
    ]
  },
  'Buy Aged Behance Accounts': {
    startingPrice: 5,
    packages: [
      { id: 'beh-new', name: 'New Behance Account', quantity: 1, unit: 'account', price: 5, deliveryTime: '1-3 Hours', features: ['New Behance Account price 5$', 'Fresh Behance profile'] },
      { id: 'beh-aged', name: 'Aged Behance Account', quantity: 1, unit: 'account', price: 10, popular: true, deliveryTime: '1-3 Hours', features: ['Aged Behance Account price 10$', 'Aged portfolio profile'] }
    ]
  },

  // --- Reviews Services ---
  'Buy Google Reviews': {
    startingPrice: 7,
    packages: [
      { id: 'gr-7d', name: '$7/ Review - 7 Days Warranty', quantity: 1, unit: 'review', price: 7, deliveryTime: '24-48 Hours', features: ['$7/ Review-7 Days Warranty', '100% Non-drop sticky reviews', 'If any drop during warranty, replaced once'] },
      { id: 'gr-15d', name: '$10/ Review - 15 Days Warranty', quantity: 1, unit: 'review', price: 10, popular: true, deliveryTime: '24-48 Hours', features: ['$10/ Review-15 Days Warranty', 'Aged local IP Google profiles', 'One-time replacement policy'] },
      { id: 'gr-30d', name: '$15/ Review - 30 Days Warranty', quantity: 1, unit: 'review', price: 15, deliveryTime: '24-48 Hours', features: ['$15/ Review-30 Days Warranty', 'Local Guide Level 4+ accounts', 'Maximum ranking impact'] }
    ]
  },
  'Buy Google Local Guide Reviews': {
    startingPrice: 20,
    packages: [
      { id: 'glg-1', name: '01 Local Guide Review ($20/ per Review)', quantity: 1, unit: 'review', price: 20, deliveryTime: '24-48 Hours', features: ['Buy Google Local Guide Reviews $20/ per Review', 'Level 5+ Local Guide badge', 'Real photos & detailed feedback', 'One-time replacement warranty'] }
    ]
  },
  'Buy TrustPilot Reviews': {
    startingPrice: 10,
    packages: [
      { id: 'tp-1', name: '01 Trustpilot Review ($10/ per Review)', quantity: 1, unit: 'review', price: 10, deliveryTime: '24-48 Hours', features: ['Buy TrustPilot Reviews $10/ per Review', 'Organic aged reviewer profile', 'Non-drop sticky posting'] }
    ]
  },
  'Buy Google GPS Reviews': {
    startingPrice: 25,
    packages: [
      { id: 'gps-1', name: '01 Google GPS Review ($25/ per Review)', quantity: 1, unit: 'review', price: 25, deliveryTime: '24-48 Hours', features: ['Buy Google GPS Reviews $25/ per Review', 'Real physical GPS location check-in', 'Simulated in-store visit proof'] }
    ]
  },
  'Buy Glassdoor Reviews': {
    startingPrice: 20,
    packages: [
      { id: 'gd-1', name: '01 Glassdoor Review ($20/ per Review)', quantity: 1, unit: 'review', price: 20, deliveryTime: '24-48 Hours', features: ['Buy Glassdoor Reviews $20/ per Review', 'Aged employee Glassdoor profile', 'Custom pros, cons, and advice'] }
    ]
  },
  'Buy Facebook Reviews': {
    startingPrice: 5,
    packages: [
      { id: 'fbr-1', name: '01 Facebook Review ($5/ per Review)', quantity: 1, unit: 'review', price: 5, deliveryTime: '24-48 Hours', features: ['Buy Facebook Reviews $5/ per Review', 'Real active Facebook user recommendation', 'Custom positive feedback'] }
    ]
  },
  'Buy Zillow Reviews': {
    startingPrice: 15,
    packages: [
      { id: 'zlw-1', name: '01 Zillow Review ($15/ per Review)', quantity: 1, unit: 'review', price: 15, deliveryTime: '24-48 Hours', features: ['Buy Zillow Reviews $15/ per Review', 'Real estate client verified profile', 'Local buyer/seller review'] }
    ]
  },
  'Buy Thumbtack Reviews': {
    startingPrice: 15,
    packages: [
      { id: 'tt-1', name: '01 Thumbtack Review ($15/ per Review)', quantity: 1, unit: 'review', price: 15, deliveryTime: '24-48 Hours', features: ['Buy Thumbtack Reviews $15/ per Review', 'Verified customer job review', 'Boosts Top Pro placement'] }
    ]
  },
  'Buy Google LSA Reviews': {
    startingPrice: 20,
    packages: [
      { id: 'lsa-1', name: '01 Google LSA Review ($20/ per Review)', quantity: 1, unit: 'review', price: 20, deliveryTime: '24-48 Hours', features: ['Buy Google LSA Reviews $20/ per Review', 'Google Local Services Ads verified job lead', 'Google Guaranteed badge impact'] }
    ]
  },
  'Buy Trustpilot Verified Reviews': {
    startingPrice: 12,
    packages: [
      { id: 'tpv-1', name: '01 Trustpilot Verified Review ($12/ per Review)', quantity: 1, unit: 'review', price: 12, deliveryTime: '24-48 Hours', features: ['Buy Trustpilot Verified Reviews $12/ per Review', 'Official Verified Order / Verified Buyer Badge', 'Highest TrustScore weight'] }
    ]
  },
  'Buy Houzz Reviews': {
    startingPrice: 15,
    packages: [
      { id: 'hz-1', name: '01 Houzz Review ($15/ per Review)', quantity: 1, unit: 'review', price: 15, deliveryTime: '24-48 Hours', features: ['Buy Houzz Reviews $15/ per Review', 'Homeowner project review', 'Design & renovation feedback'] }
    ]
  },
  'Buy BBB Reviews': {
    startingPrice: 12,
    packages: [
      { id: 'bbb-1', name: '01 BBB Review ($12/ per Review)', quantity: 1, unit: 'review', price: 12, deliveryTime: '24-48 Hours', features: ['Buy BBB Reviews $12/ per Review', 'Better Business Bureau verified consumer review', 'A+ trust booster'] }
    ]
  },
  'Buy Google Play Store Reviews': {
    startingPrice: 12,
    packages: [
      { id: 'gp-1', name: '01 Google Play Store Review ($12/ per Review)', quantity: 1, unit: 'review', price: 12, deliveryTime: '24-48 Hours', features: ['Buy Google Play Store Reviews $12/ per Review', 'Real Android device app install + 5-star rating'] }
    ]
  },
  'Buy HomeAdvisor Reviews': {
    startingPrice: 12,
    packages: [
      { id: 'ha-1', name: '01 HomeAdvisor Review ($12/ per Review)', quantity: 1, unit: 'review', price: 12, deliveryTime: '24-48 Hours', features: ['Buy HomeAdvisor Reviews $12/ per Review', 'Verified homeowner project feedback', 'Angi / HomeAdvisor rating'] }
    ]
  },
  'Buy Booking Reviews': {
    startingPrice: 25,
    packages: [
      { id: 'bk-1', name: '01 Booking Review ($25/ per Review)', quantity: 1, unit: 'review', price: 25, deliveryTime: '24-48 Hours', features: ['Buy Booking Reviews $25/ per Review', 'Verified hotel/apartment guest stay review'] }
    ]
  },
  'Buy Website Product Reviews': {
    startingPrice: 5,
    packages: [
      { id: 'wpr-1', name: '01 Website Product Review ($5/ per Review)', quantity: 1, unit: 'review', price: 5, deliveryTime: '24-48 Hours', features: ['Buy Website Product Reviews $5/ per Review', 'eCommerce on-site product review'] }
    ]
  },
  'Buy Home Star Reviews': {
    startingPrice: 15,
    packages: [
      { id: 'hs-1', name: '01 Home Star Review ($15/ per Review)', quantity: 1, unit: 'review', price: 15, deliveryTime: '24-48 Hours', features: ['Buy Home Star Reviews $15/ per Review', 'Verified Canadian homeowner review'] }
    ]
  },
  'Buy Chrome Extension Reviews': {
    startingPrice: 12,
    packages: [
      { id: 'ce-1', name: '01 Chrome Extension Review ($12/ per Review)', quantity: 1, unit: 'review', price: 12, deliveryTime: '24-48 Hours', features: ['Buy Chrome Extension Reviews $12/ per Review', 'Real Chrome user install + 5-star rating'] }
    ]
  },
  'Buy WeddingWire Reviews': {
    startingPrice: 12,
    packages: [
      { id: 'ww-1', name: '01 WeddingWire Review ($12/ per Review)', quantity: 1, unit: 'review', price: 12, deliveryTime: '24-48 Hours', features: ['Buy WeddingWire Reviews $12/ per Review', 'Verified vendor feedback'] }
    ]
  },
  'Buy Reviews.io Reviews': {
    startingPrice: 10,
    packages: [
      { id: 'rio-1', name: '01 Reviews.io Review ($10/ per Review)', quantity: 1, unit: 'review', price: 10, deliveryTime: '24-48 Hours', features: ['Buy Reviews.io Reviews $10/ per Review', 'Verified merchant Reviews.io rating'] }
    ]
  },
  'Buy Hotels Reviews': {
    startingPrice: 25,
    packages: [
      { id: 'hr-1', name: '01 Hotels Review ($25/ per Review)', quantity: 1, unit: 'review', price: 25, deliveryTime: '24-48 Hours', features: ['Buy Hotels Reviews$25/ per Review', 'Verified traveler stay rating'] }
    ]
  },
  'Buy QuickBooks Review': {
    startingPrice: 12,
    packages: [
      { id: 'qb-1', name: '01 QuickBooks Review ($12/ per Review)', quantity: 1, unit: 'review', price: 12, deliveryTime: '24-48 Hours', features: ['Buy QuickBooks Review $12/ per Review', 'Intuit App store review'] }
    ]
  },
  'Buy Yelp Reviews': {
    startingPrice: 75,
    packages: [
      { id: 'yelp-1', name: '01 Yelp Review ($75/ per Review)', quantity: 1, unit: 'review', price: 75, deliveryTime: '24-48 Hours', features: ['Buy Yelp Reviews $75/ per Review', 'Aged US Yelp profile', 'Bypasses the "Not Recommended" filter'] }
    ]
  },
  'Buy Elite Yelp Reviews': {
    startingPrice: 275,
    packages: [
      { id: 'yelpe-1', name: '01 Elite Yelp Review ($275/ per Review)', quantity: 1, unit: 'review', price: 275, deliveryTime: '24-48 Hours', features: ['Buy Elite Yelp Reviews $275/ per Review', 'Official Yelp Elite Squad Member Badge', 'Highest non-drop rate'] }
    ]
  },
  'Buy IMDb Reviews': {
    startingPrice: 7,
    packages: [
      { id: 'imdb-1', name: '01 IMDb Review ($7/ per Review)', quantity: 1, unit: 'review', price: 7, deliveryTime: '24-48 Hours', features: ['Buy IMDb Reviews$7/ per Review', 'Aged IMDb user profile rating + review'] }
    ]
  },
  'Buy RealEstateAgents Reviews': {
    startingPrice: 15,
    packages: [
      { id: 'rea-1', name: '01 RealEstateAgents Review ($15/ per Review)', quantity: 1, unit: 'review', price: 15, deliveryTime: '24-48 Hours', features: ['Buy RealEstateAgents Reviews $15/ per Review', 'Verified buyer/seller review'] }
    ]
  },
  'Google Negative Reviews Removal Services': {
    startingPrice: 50,
    packages: [
      { id: 'gnr-1-2m', name: '1-2 months plus older Reviews removal', quantity: 1, unit: 'removal', price: 50, deliveryTime: '3-7 Days', features: ['1-2 months plus older Reviews removal $50/ per Review', 'Policy dispute filing', 'Guaranteed removal or refund'] },
      { id: 'gnr-3mp', name: '3 months plus older Reviews removal', quantity: 1, unit: 'removal', price: 50, popular: true, deliveryTime: '5-10 Days', features: ['3 months plus older Reviews removal $50/ per Review', 'Deep policy audit & escalation'] }
    ]
  }
};

// Process each service
const updatedServices: ServiceItem[] = SERVICES.map(service => {
  const title = service.title;
  
  // Check exact map first
  if (EXACT_PRICE_MAP[title]) {
    const override = EXACT_PRICE_MAP[title];
    return {
      ...service,
      startingPrice: override.startingPrice,
      packages: override.packages
    };
  }

  // Category based exact matching
  if (service.categorySlug === 'crypto-exchange-accounts') {
    return {
      ...service,
      startingPrice: 250,
      packages: [
        {
          id: `${service.slug}-new`,
          name: `New Verified ${service.title.replace('Buy Verified ', '').replace(' Account', '')} Account`,
          quantity: 1,
          unit: 'account',
          price: 250,
          deliveryTime: '1-3 Hours',
          features: [
            `New Verified ${service.title.replace('Buy Verified ', '')} price 250$`,
            'Level 2 / Full KYC Identity Verified',
            'Original email + 2FA backup codes',
            'Full replacement warranty'
          ]
        },
        {
          id: `${service.slug}-aged`,
          name: `Aged Verified ${service.title.replace('Buy Verified ', '').replace(' Account', '')} Account`,
          quantity: 1,
          unit: 'account',
          price: 350,
          popular: true,
          deliveryTime: '1-3 Hours',
          features: [
            `Aged Verified ${service.title.replace('Buy Verified ', '')} price 350$`,
            'Aged 6+ to 12+ months account history',
            'Higher daily withdrawal limits',
            '24/7 Replacement guarantee'
          ]
        }
      ]
    };
  }

  if (service.categorySlug === 'smtp-email-delivery-accounts') {
    return {
      ...service,
      startingPrice: 150,
      packages: [
        {
          id: `${service.slug}-50k`,
          name: '50K sending Limit Account',
          quantity: 1,
          unit: 'account',
          price: 150,
          deliveryTime: '1-3 Hours',
          features: [
            '50K sending Limit Account price 150$',
            'Pre-warmed domain & dedicated IP',
            'SPF, DKIM, DMARC configured',
            'High inbox placement'
          ]
        },
        {
          id: `${service.slug}-100k`,
          name: '100K sending Limit Account',
          quantity: 1,
          unit: 'account',
          price: 220,
          popular: true,
          deliveryTime: '1-3 Hours',
          features: [
            '100K sending Limit Account price 220$',
            'Aged SMTP sender reputation',
            'API & SMTP relay credentials',
            'Zero throttle speed'
          ]
        },
        {
          id: `${service.slug}-300k`,
          name: '300K Sending Limit Account',
          quantity: 1,
          unit: 'account',
          price: 350,
          deliveryTime: '1-3 Hours',
          features: [
            '300K Sending Limit Account Price 350$',
            'Enterprise high-volume sending quota',
            'Dedicated account manager',
            'Full replacement warranty'
          ]
        }
      ]
    };
  }

  if (service.categorySlug === 'payment-business-accounts') {
    return {
      ...service,
      startingPrice: 350,
      packages: [
        {
          id: `${service.slug}-new`,
          name: `New ${service.title.replace('Buy Verified ', '')}`,
          quantity: 1,
          unit: 'account',
          price: 350,
          deliveryTime: '1-3 Hours',
          features: [
            `New ${service.title.replace('Buy Verified ', '')} price 350$`,
            'KYC Verified Profile with documents',
            'Bank & Card details attached',
            'Instant transfer readiness'
          ]
        },
        {
          id: `${service.slug}-old`,
          name: `Old ${service.title.replace('Buy Verified ', '')}`,
          quantity: 1,
          unit: 'account',
          price: 550,
          popular: true,
          deliveryTime: '1-3 Hours',
          features: [
            `Old ${service.title.replace('Buy Verified ', '')} Price 550$`,
            'Aged 6+ months history',
            'High volume transaction limit',
            'Full documentation & support'
          ]
        }
      ]
    };
  }

  if (service.categorySlug === 'social-media-accounts') {
    return {
      ...service,
      startingPrice: 5,
      packages: [
        {
          id: `${service.slug}-new`,
          name: `New ${service.title.replace('Buy ', '')}`,
          quantity: 1,
          unit: 'account',
          price: 5,
          deliveryTime: '1-3 Hours',
          features: [
            `New ${service.title.replace('Buy ', '')} price 5$`,
            'Fresh verified account',
            'Email attached'
          ]
        },
        {
          id: `${service.slug}-aged`,
          name: `Aged ${service.title.replace('Buy ', '')}`,
          quantity: 1,
          unit: 'account',
          price: 10,
          popular: true,
          deliveryTime: '1-3 Hours',
          features: [
            `Aged ${service.title.replace('Buy ', '')} price 10$`,
            'Aged profile with history',
            'Full warranty'
          ]
        }
      ]
    };
  }

  if (service.categorySlug === 'off-page-seo-backlink-service') {
    return {
      ...service,
      startingPrice: 25,
      packages: [
        {
          id: `${service.slug}-starter`,
          name: '25 Submissions / Links',
          quantity: 25,
          unit: 'links',
          price: 25,
          deliveryTime: '2-3 Days',
          features: [
            '25 High DA manual submissions',
            '100% Do-Follow permanent links',
            'Excel report with login details'
          ]
        },
        {
          id: `${service.slug}-growth`,
          name: '75 Submissions / Links',
          quantity: 75,
          unit: 'links',
          price: 65,
          popular: true,
          deliveryTime: '4-6 Days',
          features: [
            '75 High DA natural backlinks',
            'Drip-fed indexing',
            'Detailed transparent report'
          ]
        },
        {
          id: `${service.slug}-pro`,
          name: '200 Submissions / Links',
          quantity: 200,
          unit: 'links',
          price: 150,
          deliveryTime: '7-10 Days',
          features: [
            '200 Authority backlinks',
            'Maximum link juice & diversity',
            'Permanent live guarantee'
          ]
        }
      ]
    };
  }

  // Default fallback keeping existing
  return service;
});

// Update category service counts and categories JSON
const categoryCounts: Record<string, number> = {};
updatedServices.forEach(s => {
  categoryCounts[s.categorySlug] = (categoryCounts[s.categorySlug] || 0) + 1;
});

const updatedCategories = CATEGORIES.map(c => ({
  ...c,
  serviceCount: categoryCounts[c.slug] || c.serviceCount
}));

// Output to src/data/services.ts
const fileContent = `import { Category, ServiceItem } from '../types';

export const CATEGORIES: Category[] = ${JSON.stringify(updatedCategories, null, 2)};

export const SERVICES: ServiceItem[] = ${JSON.stringify(updatedServices, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/services.ts'), fileContent, 'utf8');
console.log('Successfully updated all 250 services and categories in src/data/services.ts!');
