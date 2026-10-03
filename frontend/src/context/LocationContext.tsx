import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationContextValue {
  detectedLocation: string;
  city: string;
  region: string;
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
  setDetectedLocation: (loc: string) => void;
  setCoordinates: (coords: Coordinates) => void;
  detect: () => void;
}

const LocationContext = createContext<LocationContextValue | null>(null);

const CITY_MAP: Record<string, { city: string; region: string }> = {
  "21.15": { city: "Nagpur", region: "Maharashtra" },
  "19.07": { city: "Mumbai", region: "Maharashtra" },
  "18.52": { city: "Pune", region: "Maharashtra" },
  "28.61": { city: "Delhi", region: "Delhi" },
  "12.97": { city: "Bengaluru", region: "Karnataka" },
  "17.38": { city: "Hyderabad", region: "Telangana" },
  "23.02": { city: "Ahmedabad", region: "Gujarat" },
  "22.57": { city: "Kolkata", region: "West Bengal" },
  "13.08": { city: "Chennai", region: "Tamil Nadu" },
  "26.85": { city: "Jaipur", region: "Rajasthan" },
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

export function LocationProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState("Nagpur");
  const [region, setRegion] = useState("Maharashtra");
  const [coordinates, setCoordinates] = useState<Coordinates | null>({
    lat: 21.15,
    lng: 79.09,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectedLocation = `${city}, ${region}`;

  const setDetectedLocation = useCallback((loc: string) => {
    const parts = loc.split(",").map((s) => s.trim());
    if (parts.length >= 2) {
      setCity(parts[0]);
      setRegion(parts.slice(1).join(", "));
    } else {
      setCity(loc);
      setRegion("");
    }
  }, []);

  const handleSetCoordinates = useCallback((coords: Coordinates) => {
    setCoordinates(coords);
  }, []);

  const detect = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const { city: c, region: r } = resolveCity(latitude, longitude);
        setCity(c);
        setRegion(r);
        setCoordinates({ lat: latitude, lng: longitude });
        setLoading(false);
      },
      () => {
        // Fallback to Nagpur on GPS failure
        setCity("Nagpur");
        setRegion("Maharashtra");
        setCoordinates({ lat: 21.15, lng: 79.09 });
        setLoading(false);
      },
      { timeout: 8000 },
    );
  }, []);

  return (
    <LocationContext.Provider
      value={{
        detectedLocation,
        city,
        region,
        coordinates,
        loading,
        error,
        setDetectedLocation,
        setCoordinates: handleSetCoordinates,
        detect,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext(): LocationContextValue {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error(
      "useLocationContext must be used within <LocationProvider>",
    );
  }
  return ctx;
}
