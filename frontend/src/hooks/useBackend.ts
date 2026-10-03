import { createActor } from "@/backend";
import type { CreateOrderPayload } from "@/backend.d";
import type {
  CreateCropPayload,
  CropId,
  Language,
  PlaceBidPayload,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CropStatus } from "@/types";

const MOCK_CROPS: any[] = [
  {
    crop_id: BigInt(101),
    user_id: { id: "system" },
    crop_type: "Soybean",
    quantity_kg: BigInt(500),
    base_price: BigInt(42),
    harvest_date: "2026-09-15",
    created_at: BigInt(0),
    status: CropStatus.listed,
  },
  {
    crop_id: BigInt(102),
    user_id: { id: "system" },
    crop_type: "Cotton",
    quantity_kg: BigInt(300),
    base_price: BigInt(65),
    harvest_date: "2026-11-20",
    created_at: BigInt(0),
    status: CropStatus.listed,
  },
];

export function useGetCrops() {
  return useQuery({
    queryKey: ["crops"],
    queryFn: async () => {
      return [...MOCK_CROPS];
    },
  });
}

const MOCK_BIDS: Record<string, any[]> = {};

export function useGetBidsForCrop(cropId: CropId | null) {
  return useQuery({
    queryKey: ["bids", cropId?.toString()],
    queryFn: async () => {
      if (cropId === null) return [];
      const idStr = cropId.toString();
      return MOCK_BIDS[idStr] || [];
    },
    enabled: cropId !== null,
  });
}

export function useGetAlerts() {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      return [
        {
          alert_id: BigInt(1),
          alert_type: "weather",
          message: "Heavy rain expected tomorrow. Delay pesticide spraying.",
          read_status: false,
          timestamp: BigInt(Date.now()),
        },
        {
          alert_id: BigInt(2),
          alert_type: "crop",
          message: "High risk of Fall Armyworm in your region. Inspect crops.",
          read_status: false,
          timestamp: BigInt(Date.now()),
        }
      ];
    },
  });
}

export function useGetSoilData(location: string | null) {
  return useQuery({
    queryKey: ["soil", location],
    queryFn: async () => {
      if (!location) return null;
      // Mock soil data depending on location
      const isMaharashtra = location.toLowerCase().includes("maharashtra");
      return {
        nitrogen: BigInt(isMaharashtra ? 45 : 60),
        phosphorus: BigInt(isMaharashtra ? 30 : 40),
        potassium: BigInt(isMaharashtra ? 25 : 35),
        ph_level: isMaharashtra ? "6.8" : "7.2",
        moisture: BigInt(isMaharashtra ? 40 : 55),
        fertility_score: BigInt(isMaharashtra ? 78 : 85),
        last_updated: BigInt(Date.now()),
      };
    },
    enabled: !!location,
  });
}

export function useCreateCrop() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateCropPayload) => {
      const newCrop = {
        crop_id: BigInt(Date.now()),
        user_id: { id: "mock_user" } as any,
        crop_type: payload.crop_type,
        quantity_kg: payload.quantity_kg,
        base_price: payload.base_price,
        harvest_date: payload.harvest_date,
        created_at: BigInt(Date.now()),
        status: CropStatus.listed,
      };
      MOCK_CROPS.push(newCrop);
      return newCrop;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["crops"] });
    },
  });
}

export function usePlaceBid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PlaceBidPayload) => {
      const idStr = payload.crop_id.toString();
      if (!MOCK_BIDS[idStr]) {
        MOCK_BIDS[idStr] = [];
      }
      MOCK_BIDS[idStr].push({
        bid_amount: payload.bid_amount,
        bidder: "User",
        timestamp: BigInt(Date.now()),
      });
      return true;
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["bids", variables.crop_id.toString()],
      });
    },
  });
}

export function useMarkAlertRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (alertId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.markAlertRead(alertId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alerts"] });
    },
  });
}

export function useRegisterUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      phoneNumber: string;
      name: string;
      location: string;
      preferredLanguage: string;
      password: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.registerUser(
        params.phoneNumber,
        params.name,
        params.location,
        params.preferredLanguage,
        params.password,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (data) => {
      qc.setQueryData(["userProfile", data.phoneNumber], data);
    },
  });
}

export function useLoginUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { phoneNumber: string; password: string }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.loginUser(params.phoneNumber, params.password);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (data) => {
      qc.setQueryData(["userProfile", data.phoneNumber], data);
    },
  });
}

export function useGetUserProfile(phoneNumber: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["userProfile", phoneNumber],
    queryFn: async () => {
      if (!actor || !phoneNumber) return null;
      return actor.getUserProfile(phoneNumber);
    },
    enabled: !!actor && !isFetching && !!phoneNumber,
  });
}

export function useUpdateUserLanguage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      phoneNumber: string;
      preferredLanguage: Language;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.updateUserLanguage(
        params.phoneNumber,
        params.preferredLanguage,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["userProfile", variables.phoneNumber],
      });
    },
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createCheckoutSession(payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
