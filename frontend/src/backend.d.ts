import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SoilData {
    potassium: bigint;
    phosphorus: bigint;
    last_updated: Timestamp;
    fertility_score: bigint;
    location: string;
    nitrogen: bigint;
}
export interface PlaceBidPayload {
    bid_amount: bigint;
    crop_id: CropId;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type AlertId = bigint;
export type BidId = bigint;
export interface Bid {
    timestamp: Timestamp;
    bid_amount: bigint;
    crop_id: CropId;
    bidder_id: UserId;
    bid_id: BidId;
}
export interface Crop {
    status: CropStatus;
    quantity_kg: bigint;
    base_price: bigint;
    created_at: Timestamp;
    user_id: UserId;
    crop_type: string;
    crop_id: CropId;
    harvest_date: string;
}
export type CreateOrderResult = {
    __kind__: "ok";
    ok: {
        order: Order;
        checkout_url: string;
    };
} | {
    __kind__: "err";
    err: string;
};
export interface Order {
    status: OrderStatus;
    quantity_kg: bigint;
    stripe_checkout_url?: string;
    seller_id: UserId;
    total_amount_paise: bigint;
    timestamp: Timestamp;
    stripe_session_id?: string;
    buyer_id: UserId;
    order_id: OrderId;
    crop_id: CropId;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UpdateSoilPayload {
    potassium: bigint;
    phosphorus: bigint;
    fertility_score: bigint;
    location: string;
    nitrogen: bigint;
}
export type UserId = Principal;
export interface CreateCropPayload {
    quantity_kg: bigint;
    base_price: bigint;
    crop_type: string;
    harvest_date: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type CropId = bigint;
export interface CreateOrderPayload {
    quantity_kg: bigint;
    success_url: string;
    seller_id: UserId;
    total_amount_paise: bigint;
    cancel_url: string;
    crop_name: string;
    crop_id: CropId;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface Alert {
    alert_type: AlertType;
    created_at: Timestamp;
    user_id: UserId;
    alert_id: AlertId;
    message: string;
    read_status: boolean;
}
export type OrderId = bigint;
export interface UserProfile {
    preferredLanguage: string;
    name: string;
    phoneNumber: string;
    location: string;
}
export enum AlertType {
    task = "task",
    weather = "weather"
}
export enum CropStatus {
    closed = "closed",
    sold = "sold",
    listed = "listed"
}
export enum OrderStatus {
    pending = "pending",
    paid = "paid",
    failed = "failed"
}
export interface backendInterface {
    createCheckoutSession(payload: CreateOrderPayload): Promise<CreateOrderResult>;
    createCrop(payload: CreateCropPayload): Promise<Crop>;
    getAlerts(): Promise<Array<Alert>>;
    getBidsForCrop(crop_id: CropId): Promise<Array<Bid>>;
    getCrops(): Promise<Array<Crop>>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(order_id: OrderId): Promise<Order | null>;
    getSoilData(location: string): Promise<SoilData | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(phoneNumber: string): Promise<UserProfile | null>;
    isStripeConfigured(): Promise<boolean>;
    loginUser(phoneNumber: string, password: string): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    markAlertRead(alert_id: AlertId): Promise<boolean>;
    placeBid(payload: PlaceBidPayload): Promise<{
        __kind__: "ok";
        ok: Bid;
    } | {
        __kind__: "err";
        err: string;
    }>;
    registerUser(phoneNumber: string, name: string, location: string, preferredLanguage: string, password: string): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setStripeConfiguration(secretKey: string, allowedCountries: Array<string>): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateSoilData(payload: UpdateSoilPayload): Promise<SoilData>;
    updateUserLanguage(phoneNumber: string, preferredLanguage: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
