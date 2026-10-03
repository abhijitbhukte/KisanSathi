import type { Principal } from "@icp-sdk/core/principal";

export type UserId = Principal;
export type Timestamp = bigint;
export type CropId = bigint;
export type BidId = bigint;
export type AlertId = bigint;

export enum AlertType {
  task = "task",
  weather = "weather",
}

export enum CropStatus {
  closed = "closed",
  sold = "sold",
  listed = "listed",
}

export interface SoilData {
  location: string;
  nitrogen: bigint;
  phosphorus: bigint;
  potassium: bigint;
  fertility_score: bigint;
  last_updated: Timestamp;
}

export interface Crop {
  crop_id: CropId;
  user_id: UserId;
  crop_type: string;
  quantity_kg: bigint;
  base_price: bigint;
  harvest_date: string;
  created_at: Timestamp;
  status: CropStatus;
}

export interface Bid {
  bid_id: BidId;
  crop_id: CropId;
  bidder_id: UserId;
  bid_amount: bigint;
  timestamp: Timestamp;
}

export interface Alert {
  alert_id: AlertId;
  user_id: UserId;
  alert_type: AlertType;
  message: string;
  read_status: boolean;
  created_at: Timestamp;
}

export interface CreateCropPayload {
  crop_type: string;
  quantity_kg: bigint;
  base_price: bigint;
  harvest_date: string;
}

export interface PlaceBidPayload {
  bid_amount: bigint;
  crop_id: CropId;
}

export type Language = "en" | "hi" | "mr" | "pa" | "gu";

export type { Translations } from "@/data/translations";

export interface CropRecommendation {
  name: string;
  icon: string;
  suitability: number;
  reason: string;
  season: string;
}

export interface UserProfile {
  phoneNumber: string;
  name: string;
  location: string;
  preferredLanguage: string;
}

export interface AuthState {
  user: UserProfile | null;
  isGuest: boolean;
}

export interface CheckoutSession {
  id: string;
  url: string;
}

export type { Order } from "@/backend.d";
export { OrderStatus } from "@/backend.d";
