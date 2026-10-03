import type { Language } from "@/types";

export interface IndianState {
  value: string;
  label: string;
  defaultLang: Language;
}

/**
 * All Indian states & union territories with their default language mapping.
 * Used by SignupPage for:
 *  - State dropdown
 *  - Auto-language selection (Maharashtra → Marathi, others → Hindi)
 */
export const indianStates: IndianState[] = [
  { value: "andhra_pradesh", label: "Andhra Pradesh", defaultLang: "hi" },
  { value: "arunachal_pradesh", label: "Arunachal Pradesh", defaultLang: "hi" },
  { value: "assam", label: "Assam", defaultLang: "hi" },
  { value: "bihar", label: "Bihar", defaultLang: "hi" },
  { value: "chhattisgarh", label: "Chhattisgarh", defaultLang: "hi" },
  { value: "goa", label: "Goa", defaultLang: "hi" },
  { value: "gujarat", label: "Gujarat", defaultLang: "gu" },
  { value: "haryana", label: "Haryana", defaultLang: "hi" },
  { value: "himachal_pradesh", label: "Himachal Pradesh", defaultLang: "hi" },
  { value: "jharkhand", label: "Jharkhand", defaultLang: "hi" },
  { value: "karnataka", label: "Karnataka", defaultLang: "hi" },
  { value: "kerala", label: "Kerala", defaultLang: "hi" },
  { value: "madhya_pradesh", label: "Madhya Pradesh", defaultLang: "hi" },
  { value: "maharashtra", label: "Maharashtra", defaultLang: "mr" },
  { value: "manipur", label: "Manipur", defaultLang: "hi" },
  { value: "meghalaya", label: "Meghalaya", defaultLang: "hi" },
  { value: "mizoram", label: "Mizoram", defaultLang: "hi" },
  { value: "nagaland", label: "Nagaland", defaultLang: "hi" },
  { value: "odisha", label: "Odisha", defaultLang: "hi" },
  { value: "punjab", label: "Punjab", defaultLang: "pa" },
  { value: "rajasthan", label: "Rajasthan", defaultLang: "hi" },
  { value: "sikkim", label: "Sikkim", defaultLang: "hi" },
  { value: "tamil_nadu", label: "Tamil Nadu", defaultLang: "hi" },
  { value: "telangana", label: "Telangana", defaultLang: "hi" },
  { value: "tripura", label: "Tripura", defaultLang: "hi" },
  { value: "uttar_pradesh", label: "Uttar Pradesh", defaultLang: "hi" },
  { value: "uttarakhand", label: "Uttarakhand", defaultLang: "hi" },
  { value: "west_bengal", label: "West Bengal", defaultLang: "hi" },
  // Union Territories
  {
    value: "andaman_nicobar",
    label: "Andaman & Nicobar Islands",
    defaultLang: "hi",
  },
  { value: "chandigarh", label: "Chandigarh", defaultLang: "hi" },
  {
    value: "dadra_nagar_haveli",
    label: "Dadra & Nagar Haveli and Daman & Diu",
    defaultLang: "hi",
  },
  { value: "delhi", label: "Delhi", defaultLang: "hi" },
  { value: "jammu_kashmir", label: "Jammu & Kashmir", defaultLang: "hi" },
  { value: "ladakh", label: "Ladakh", defaultLang: "hi" },
  { value: "lakshadweep", label: "Lakshadweep", defaultLang: "hi" },
  { value: "puducherry", label: "Puducherry", defaultLang: "hi" },
];

/**
 * Look up the default language for a given state value.
 * Falls back to Hindi if not found.
 */
export function getLanguageForState(stateValue: string): Language {
  const state = indianStates.find((s) => s.value === stateValue);
  return state?.defaultLang ?? "hi";
}

/**
 * Get the display label for a state value.
 */
export function getStateLabel(stateValue: string): string {
  const state = indianStates.find((s) => s.value === stateValue);
  return state?.label ?? stateValue;
}
