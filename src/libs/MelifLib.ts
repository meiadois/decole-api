const M = require('melif')

export interface SellerReputation {
  power_seller_status?: any;
}

export interface Seller {
  id: number;
  nickname: string;
  permalink: string;
  seller_reputation: SellerReputation;
  real_estate_agency: boolean;
  car_dealer: boolean;
  tags: any[];
  eshop?: any;
}

export interface Paging {
  total: number;
  offset: number;
  limit: number;
  primary_results: number;
}

export interface Seller2 {
  id: number;
  permalink: string;
  power_seller_status?: any;
  car_dealer: boolean;
  real_estate_agency: boolean;
  tags: any[];
  nickname: string;
}

export interface Installments {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
}

export interface Address {
  state_id: string;
  state_name: string;
  city_id: string;
  city_name: string;
}

export interface Shipping {
  free_shipping: boolean;
  mode: string;
  tags: any[];
  logistic_type: string;
  store_pick_up: boolean;
}

export interface Country {
  id: string;
  name: string;
}

export interface State {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
}

export interface SellerAddress {
  id: string;
  comment: string;
  address_line: string;
  zip_code: string;
  country: Country;
  state: State;
  city: City;
  latitude: string;
  longitude: string;
}

export interface Value {
  source: any;
  id: string;
  name: string;
  struct?: any;
}

export interface Attribute {
  value_struct?: any;
  values: Value[];
  value_name: string;
  name: string;
  value_id: string;
  attribute_group_id: string;
  attribute_group_name: string;
  source: any;
  id: string;
}

export interface DifferentialPricing {
  id: number;
}

export interface Result {
  id: string;
  site_id: string;
  title: string;
  seller: Seller2;
  price: number;
  currency_id: string;
  available_quantity: number;
  sold_quantity: number;
  buying_mode: string;
  listing_type_id: string;
  stop_time: Date;
  condition: string;
  permalink: string;
  thumbnail: string;
  accepts_mercadopago: boolean;
  installments: Installments;
  address: Address;
  shipping: Shipping;
  seller_address: SellerAddress;
  attributes: Attribute[];
  original_price?: any;
  category_id: string;
  official_store_id?: any;
  catalog_product_id?: any;
  tags: string[];
  differential_pricing: DifferentialPricing;
}

export interface Sort {
  id: string;
  name: string;
}

export interface AvailableSort {
  id: string;
  name: string;
}

export interface Value2 {
  id: string;
  name: string;
  results: number;
}

export interface AvailableFilter {
  id: string;
  name: string;
  type: string;
  values: Value2[];
}

export interface UserByNicknameInfos {
  site_id: string;
  seller: Seller;
  paging: Paging;
  results: Result[];
  secondary_results: any[];
  related_results: any[];
  sort: Sort;
  available_sorts: AvailableSort[];
  filters: any[];
  available_filters: AvailableFilter[];
}

export interface Address {
  city: string;
  state: string;
}

export interface Ratings {
  negative: number;
  neutral: number;
  positive: number;
}

export interface Transactions {
  canceled: number;
  completed: number;
  period: string;
  ratings: Ratings;
  total: number;
}

export interface SellerReputation {
  level_id: string;
  power_seller_status?: any;
  transactions: Transactions;
}

export interface BuyerReputation {
  tags: string[];
}

export interface Status {
  site_status: string;
}

export interface UserReputation {
  id: number;
  nickname: string;
  registration_date: Date;
  country_id: string;
  address: Address;
  user_type: string;
  tags: string[];
  logo?: any;
  points: number;
  site_id: string;
  permalink: string;
  seller_reputation: SellerReputation;
  buyer_reputation: BuyerReputation;
  status: Status;
}

// Fill in the required information
const Melif = new M({
  api_root_url: 'https://api.mercadolibre.com',
  auth_url: 'https://auth.mercadolibre.com/authorization',
  oauth_url: 'https://api.mercadolibre.com/oauth/token',
  client_id: process.env.ML_CLIENT_ID,
  client_secret: process.env.ML_CLIENT_SECRET
})

export default Melif
