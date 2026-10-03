import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/LanguageContext";
import { useLocationContext } from "@/context/LocationContext";
import { useGetSoilData } from "@/hooks/useBackend";
import {
  Droplets,
  FlaskConical,
  Leaf,
  MapPin,
  RefreshCw,
  TrendingUp,
  Navigation,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

// ── Mock data seeded by location ──────────────────────────────────────────────
function hashLocation(loc: string): number {
  let h = 0;
  for (let i = 0; i < loc.length; i++) {
    h = (h * 31 + loc.charCodeAt(i)) >>> 0;
  }
  return h;
}

interface MockSoil {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  fertility: number;
}

const KNOWN_MOCK: Record<string, MockSoil> = {
  "Nagpur, Maharashtra": {
    nitrogen: 72,
    phosphorus: 40,
    potassium: 35,
    fertility: 78,
  },
  "Mumbai, Maharashtra": {
    nitrogen: 65,
    phosphorus: 55,
    potassium: 42,
    fertility: 82,
  },
  "Delhi, Delhi": {
    nitrogen: 58,
    phosphorus: 38,
    potassium: 48,
    fertility: 71,
  },
  "Pune, Maharashtra": {
    nitrogen: 68,
    phosphorus: 45,
    potassium: 38,
    fertility: 80,
  },
  "Bengaluru, Karnataka": {
    nitrogen: 70,
    phosphorus: 48,
    potassium: 40,
    fertility: 76,
  },
  "Hyderabad, Telangana": {
    nitrogen: 62,
    phosphorus: 42,
    potassium: 44,
    fertility: 74,
  },
  "Ahmedabad, Gujarat": {
    nitrogen: 55,
    phosphorus: 35,
    potassium: 50,
    fertility: 69,
  },
  "Kolkata, West Bengal": {
    nitrogen: 75,
    phosphorus: 52,
    potassium: 36,
    fertility: 73,
  },
  "Chennai, Tamil Nadu": {
    nitrogen: 60,
    phosphorus: 46,
    potassium: 39,
    fertility: 77,
  },
  "Jaipur, Rajasthan": {
    nitrogen: 48,
    phosphorus: 32,
    potassium: 55,
    fertility: 65,
  },
};

function getMockSoil(location: string): MockSoil {
  if (KNOWN_MOCK[location]) return KNOWN_MOCK[location];
  const h = hashLocation(location);
  return {
    nitrogen: 45 + (h % 40),
    phosphorus: 30 + ((h >> 4) % 35),
    potassium: 25 + ((h >> 8) % 40),
    fertility: 55 + ((h >> 12) % 35),
  };
}

function getCropRecs(location: string) {
  const allCrops = [
    {
      name: "Soybean",
      icon: "🫘",
      suitability: 94,
      season: "Kharif Jun–Sep",
      desc: "Excellent N-fix, ideal for current NPK profile",
    },
    {
      name: "Cotton",
      icon: "🌿",
      suitability: 87,
      season: "Kharif May–Nov",
      desc: "Good for moderate phosphorus, deep roots",
    },
    {
      name: "Wheat",
      icon: "🌾",
      suitability: 82,
      season: "Rabi Oct–Mar",
      desc: "Strong response to available potassium",
    },
    {
      name: "Rice",
      icon: "🌾",
      suitability: 85,
      season: "Kharif Jun–Oct",
      desc: "High moisture, suited for clay-rich soil",
    },
    {
      name: "Sugarcane",
      icon: "🎋",
      suitability: 79,
      season: "Annual Oct–Nov",
      desc: "Benefits from high potassium levels",
    },
    {
      name: "Turmeric",
      icon: "🌿",
      suitability: 76,
      season: "Kharif Jun–Dec",
      desc: "Warm climate, moderate NPK needs",
    },
  ];
  const h = hashLocation(location);
  const offset = h % allCrops.length;
  return [
    allCrops[offset % allCrops.length],
    allCrops[(offset + 1) % allCrops.length],
    allCrops[(offset + 2) % allCrops.length],
  ];
}

// ── NutrientBar ───────────────────────────────────────────────────────────────
function NutrientBar({
  label,
  value,
  max = 100,
  color,
}: {
  label: string;
  value: number;
  max?: number;
  color: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <Badge variant="outline" className={`text-xs font-semibold ${color}`}>
          {pct}%
        </Badge>
      </div>
      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color.includes("primary") ? "bg-primary" : color.includes("secondary") ? "bg-secondary" : "bg-accent"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── SoilPage ──────────────────────────────────────────────────────────────────
export function SoilPage() {
  const { t } = useLanguage();
  const loc = useLocationContext();

  // queryLocation tracks what we're actually querying — starts as detected location
  const [locationInput, setLocationInput] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [queryLocation, setQueryLocation] = useState<string>(
    loc.detectedLocation,
  );

  // When detected location changes (via header button), auto-update query
  useEffect(() => {
    setQueryLocation(loc.detectedLocation);
  }, [loc.detectedLocation]);

  const { data: soilData, isLoading } = useGetSoilData(queryLocation);

  function handleFetch() {
    const target = locationInput.trim() || loc.detectedLocation;
    setQueryLocation(target);
    if (locationInput.trim()) {
      // Also sync context so header label updates
      loc.setDetectedLocation(locationInput.trim());
    }
  }

  async function handleAutoLocate() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
          const data = await res.json();
          
          const city = data.city || data.locality || "Unknown Location";
          const principalSubdivision = data.principalSubdivision || "Unknown State";
          
          const newLocation = `${city}, ${principalSubdivision}`;
          setLocationInput(newLocation);
          setQueryLocation(newLocation);
          loc.setDetectedLocation(newLocation);
        } catch (error) {
          console.error("Failed to reverse geocode:", error);
          alert("Could not get your location details.");
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.error(err);
        alert("Failed to access your location. Please allow location permissions.");
        setIsLocating(false);
      }
    );
  }

  // Real data from backend OR location-seeded mock
  const mock = getMockSoil(queryLocation);
  const n = soilData ? Number(soilData.nitrogen) : mock.nitrogen;
  const p = soilData ? Number(soilData.phosphorus) : mock.phosphorus;
  const k = soilData ? Number(soilData.potassium) : mock.potassium;
  const fertility = soilData
    ? Number(soilData.fertility_score)
    : mock.fertility;

  const cropRecs = getCropRecs(queryLocation);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl" data-ocid="soil-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-primary" />
            {t.soil_title}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t.soil_subtitle}
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto mt-3 sm:mt-0">
          <div className="relative">
            <Input
              placeholder={t.soil_enter_location}
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full sm:w-64 pr-9 text-sm h-9"
              data-ocid="soil-location-input"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1 w-7 h-7 text-muted-foreground hover:text-primary"
              onClick={handleAutoLocate}
              disabled={isLocating}
              title="Use current location"
            >
              {isLocating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Navigation className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            size="sm"
            onClick={handleFetch}
            className="gap-2 h-9 flex-shrink-0"
            disabled={isLocating}
            data-ocid="btn-fetch-soil"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t.soil_fetch}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* NPK Card */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{t.soil_npk}</CardTitle>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {queryLocation}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            ) : (
              <>
                {/* N */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/15">
                  <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                    N
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground mb-2">
                      {t.soil_nitrogen}
                    </p>
                    <NutrientBar
                      label=""
                      value={n}
                      color="text-primary border-primary/30"
                    />
                  </div>
                </div>
                {/* P */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/5 border border-secondary/15">
                  <div className="w-10 h-10 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                    P
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground mb-2">
                      {t.soil_phosphorus}
                    </p>
                    <NutrientBar
                      label=""
                      value={p}
                      color="text-secondary border-secondary/30"
                    />
                  </div>
                </div>
                {/* K */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/5 border border-accent/15">
                  <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                    K
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground mb-2">
                      {t.soil_potassium}
                    </p>
                    <NutrientBar
                      label=""
                      value={k}
                      color="text-accent border-accent/30"
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Fertility score */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              {t.soil_fertility}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4">
              <div className="relative w-28 h-28">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full -rotate-90"
                  role="img"
                  aria-label="Soil fertility score gauge"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="oklch(var(--muted))"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="oklch(var(--primary))"
                    strokeWidth="10"
                    strokeDasharray={`${fertility * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">
                    {fertility}
                  </span>
                  <span className="text-xs text-muted-foreground">/100</span>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">
                {fertility >= 80
                  ? "Excellent"
                  : fertility >= 60
                    ? "Good"
                    : "Needs Improvement"}
              </p>
              <p className="text-xs text-muted-foreground text-center mt-1">
                Soil fertility score based on NPK balance and organic matter
              </p>
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-4">
              {[
                { label: "Organic Matter", val: "2.4%", icon: Leaf, ok: true },
                { label: "Moisture", val: "38%", icon: Droplets, ok: true },
                { label: "pH Level", val: "6.8", icon: FlaskConical, ok: true },
              ].map(({ label, val, icon: Icon, ok }) => (
                <div
                  key={label}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </div>
                  <span
                    className={`font-medium ${ok ? "text-primary" : "text-destructive"}`}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crop recommendations — dynamic by location */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            {t.soil_recommendations}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-3">
            {cropRecs.map((crop, i) => (
              <div
                key={`${crop.name}-${i}`}
                className="p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-smooth"
                data-ocid={`soil-rec-${i}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{crop.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {crop.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {crop.season}
                    </p>
                  </div>
                  <span className="ml-auto text-sm font-bold text-primary">
                    {crop.suitability}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full mb-2">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${crop.suitability}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{crop.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
