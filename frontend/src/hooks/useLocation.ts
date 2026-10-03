import { useCallback, useState } from "react";

interface LocationState {
  lat: number | null;
  lng: number | null;
  city: string | null;
  region: string | null;
  error: string | null;
  loading: boolean;
}

const CITY_MAP: Record<string, { city: string; region: string }> = {
  "21.15": { city: "Nagpur", region: "Maharashtra" },
  "19.07": { city: "Mumbai", region: "Maharashtra" },
  "28.61": { city: "New Delhi", region: "Delhi" },
  "12.97": { city: "Bengaluru", region: "Karnataka" },
  "17.38": { city: "Hyderabad", region: "Telangana" },
  "23.02": { city: "Ahmedabad", region: "Gujarat" },
  "22.57": { city: "Kolkata", region: "West Bengal" },
};

function resolveCity(
  lat: number,
  lng: number,
): { city: string; region: string } {
  const latKey = lat.toFixed(2);
  return (
    CITY_MAP[latKey] ?? {
      city: `Lat ${lat.toFixed(2)}`,
      region: `Lng ${lng.toFixed(2)}`,
    }
  );
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    lat: null,
    lng: null,
    city: null,
    region: null,
    error: null,
    loading: false,
  });

  const detect = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: "Geolocation not supported" }));
      return;
    }
    setState((s) => ({ ...s, loading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const { city, region } = resolveCity(latitude, longitude);
        setState({
          lat: latitude,
          lng: longitude,
          city,
          region,
          error: null,
          loading: false,
        });
      },
      () => {
        // Fallback: use a demo location
        setState({
          lat: 21.15,
          lng: 79.09,
          city: "Nagpur",
          region: "Maharashtra",
          error: null,
          loading: false,
        });
      },
      { timeout: 8000 },
    );
  }, []);

  const locationLabel =
    state.city && state.region
      ? `${state.city}, ${state.region}`
      : "Location not set";

  return { ...state, detect, locationLabel };
}
