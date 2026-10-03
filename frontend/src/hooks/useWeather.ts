import { useQuery } from "@tanstack/react-query";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
} from "lucide-react";

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: any; // Lucide icon component
  isDay: boolean;
}

// Maps WMO Weather codes to a human readable description and an icon
function mapWeatherCode(code: number, isDay: boolean) {
  const codes: Record<number, { condition: string; icon: any }> = {
    0: { condition: "Clear sky", icon: isDay ? Sun : CloudSun },
    1: { condition: "Mainly clear", icon: isDay ? Sun : CloudSun },
    2: { condition: "Partly cloudy", icon: CloudSun },
    3: { condition: "Overcast", icon: Cloud },
    45: { condition: "Fog", icon: CloudFog },
    48: { condition: "Depositing rime fog", icon: CloudFog },
    51: { condition: "Light drizzle", icon: CloudDrizzle },
    53: { condition: "Moderate drizzle", icon: CloudDrizzle },
    55: { condition: "Dense drizzle", icon: CloudDrizzle },
    56: { condition: "Light freezing drizzle", icon: CloudDrizzle },
    57: { condition: "Dense freezing drizzle", icon: CloudDrizzle },
    61: { condition: "Slight rain", icon: CloudRain },
    63: { condition: "Moderate rain", icon: CloudRain },
    65: { condition: "Heavy rain", icon: CloudRain },
    66: { condition: "Light freezing rain", icon: CloudRain },
    67: { condition: "Heavy freezing rain", icon: CloudRain },
    71: { condition: "Slight snow fall", icon: CloudSnow },
    73: { condition: "Moderate snow fall", icon: CloudSnow },
    75: { condition: "Heavy snow fall", icon: CloudSnow },
    77: { condition: "Snow grains", icon: CloudSnow },
    80: { condition: "Slight rain showers", icon: CloudRain },
    81: { condition: "Moderate rain showers", icon: CloudRain },
    82: { condition: "Violent rain showers", icon: CloudRain },
    85: { condition: "Slight snow showers", icon: CloudSnow },
    86: { condition: "Heavy snow showers", icon: CloudSnow },
    95: { condition: "Thunderstorm", icon: CloudLightning },
    96: { condition: "Thunderstorm with slight hail", icon: CloudLightning },
    99: { condition: "Thunderstorm with heavy hail", icon: CloudLightning },
  };

  return codes[code] || { condition: "Unknown", icon: Cloud };
}

export function useWeather(locationString: string) {
  return useQuery<WeatherData | null>({
    queryKey: ["weather", locationString],
    queryFn: async () => {
      if (!locationString) return null;

      // Extract just the city from something like "Nagpur, Maharashtra"
      const city = locationString.split(",")[0].trim();

      try {
        // Step 1: Geocoding
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city
          )}&count=1&language=en&format=json`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("Location not found");
        }

        const { latitude, longitude } = geoData.results[0];

        // Step 2: Weather Forecast
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=auto`
        );
        const weatherData = await weatherRes.json();

        const current = weatherData.current;
        const mapped = mapWeatherCode(current.weather_code, current.is_day === 1);

        return {
          temperature: current.temperature_2m,
          humidity: current.relative_humidity_2m,
          windSpeed: current.wind_speed_10m,
          isDay: current.is_day === 1,
          condition: mapped.condition,
          icon: mapped.icon,
        };
      } catch (e) {
        console.error("Failed to fetch weather:", e);
        throw e;
      }
    },
    enabled: !!locationString,
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
  });
}
