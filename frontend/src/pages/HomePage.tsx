import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useLocationContext } from "@/context/LocationContext";
import { useGetAlerts, useGetCrops, useGetSoilData } from "@/hooks/useBackend";
import { useWeather } from "@/hooks/useWeather";
import { AlertType, CropStatus } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  CloudSun,
  FlaskConical,
  Leaf,
  MapPin,
  ShoppingCart,
  Sprout,
  TrendingUp,
  Droplets,
  Wind,
} from "lucide-react";

export function HomePage() {
  const { t } = useLanguage();
  const { data: alerts } = useGetAlerts();
  const { data: crops } = useGetCrops();
  const loc = useLocationContext();
  const { data: weather, isLoading: weatherLoading, isError: weatherError } = useWeather(loc.detectedLocation);

  // Fetch real soil data using the globally detected location
  const { data: soilData } = useGetSoilData(loc.detectedLocation);

  const activeListings =
    crops?.filter((c) => c.status === CropStatus.listed).length ?? 0;
  const recentAlerts = alerts?.slice(0, 3) ?? [];
  const unread = alerts?.filter((a) => !a.read_status).length ?? 0;

  // Soil health: real backend data only
  const soilHealth = soilData ? Number(soilData.fertility_score) : null;

  // Crop count from backend
  const cropCount = crops?.length ?? 0;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl" data-ocid="home-page">
      {/* Welcome banner */}
      <div
        className="rounded-xl px-6 py-5 text-primary-foreground flex flex-col sm:flex-row sm:items-center gap-4 relative overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/farming-hero.dim_800x1000.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 rounded-xl bg-black/40" />
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 relative z-10">
          <Sprout className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0 relative z-10">
          <h1 className="text-xl font-display font-semibold">
            {t.home_welcome}
          </h1>
          <p className="text-white/80 text-sm mt-0.5">{t.home_subtitle}</p>
        </div>
        <div className="flex items-center gap-1.5 text-sm bg-white/15 rounded-lg px-3 py-1.5 relative z-10">
          <MapPin className="w-4 h-4" />
          <span>{loc.detectedLocation}</span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: t.home_soil_health,
            value: soilHealth !== null ? `${soilHealth}%` : "—",
            icon: FlaskConical,
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: t.home_crop_recs,
            value: String(cropCount),
            icon: Leaf,
            color: "text-chart-1",
            bg: "bg-chart-1/10",
          },
          {
            label: t.home_active_listings,
            value: String(activeListings),
            icon: ShoppingCart,
            color: "text-secondary",
            bg: "bg-secondary/10",
          },
          {
            label: t.alerts,
            value: String(unread),
            icon: Bell,
            color: "text-destructive",
            bg: "bg-destructive/10",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="shadow-card">
            <CardContent className="p-4">
              <div
                className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Crop listings from backend */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                {t.home_crop_recs}
              </CardTitle>
              <Link to="/soil">
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  {t.home_view_all} <ChevronRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {crops && crops.length > 0 ? (
              crops.slice(0, 5).map((crop, i) => (
                <div
                  key={crop.crop_id.toString()}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-smooth"
                  data-ocid={`crop-rec-${i}`}
                >
                  <span className="text-2xl">🌾</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-foreground">
                        {crop.crop_type}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-[10px] h-4 px-1.5 border-primary/30 text-primary"
                      >
                        {crop.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {Number(crop.quantity_kg)} kg · ₹{Number(crop.base_price)}
                      /kg
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-primary">
                      {crop.harvest_date}
                    </p>
                    <p className="text-[10px] text-muted-foreground">harvest</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center" data-ocid="crops-empty">
                <Leaf className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No crops listed yet — visit Digital Mandi to add your first
                  crop.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent alerts */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="w-4 h-4 text-secondary" />
                {t.home_alerts}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentAlerts.length > 0 ? (
              recentAlerts.map((alert) => (
                <div
                  key={alert.alert_id.toString()}
                  className={`p-3 rounded-lg border text-sm ${
                    alert.alert_type === AlertType.weather
                      ? "bg-accent/10 border-accent/20"
                      : "bg-secondary/10 border-secondary/20"
                  }`}
                  data-ocid="alert-item"
                >
                  <p className="text-foreground leading-snug">
                    {alert.message}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1 capitalize">
                    {alert.alert_type}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-6 text-center" data-ocid="alerts-empty">
                <Bell className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {t.home_no_alerts}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Real Weather Integration */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-accent" />
            {t.home_weather}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {weatherLoading ? (
            <div className="py-8 text-center animate-pulse">
              <CloudSun className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Loading weather for {loc.detectedLocation}...</p>
            </div>
          ) : weatherError || !weather ? (
            <div className="py-8 text-center">
              <CloudSun className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground text-destructive">Failed to load weather data.</p>
              <p className="text-xs text-muted-foreground mt-1">Could not fetch data for {loc.detectedLocation}.</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
              <div className="flex items-center gap-4">
                <weather.icon className="w-16 h-16 text-accent drop-shadow-md" />
                <div>
                  <p className="text-4xl font-display font-bold text-foreground">
                    {Math.round(weather.temperature)}°C
                  </p>
                  <p className="text-base font-medium text-muted-foreground mt-1">{weather.condition}</p>
                  <p className="text-xs text-muted-foreground">{loc.detectedLocation}</p>
                </div>
              </div>
              <div className="flex gap-4 sm:flex-col sm:gap-3 w-full sm:w-auto">
                <div className="flex-1 flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-2 border border-border">
                  <Droplets className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Humidity</p>
                    <p className="text-sm font-semibold text-foreground">{weather.humidity}%</p>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-2 border border-border">
                  <Wind className="w-4 h-4 text-secondary" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Wind</p>
                    <p className="text-sm font-semibold text-foreground">{Math.round(weather.windSpeed)} km/h</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
