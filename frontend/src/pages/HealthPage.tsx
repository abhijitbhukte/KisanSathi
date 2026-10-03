import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Microscope,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

interface Diagnosis {
  disease: string;
  severity: "High" | "Medium" | "Low";
  confidence: number;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
}

const MOCK_DIAGNOSES: Diagnosis[] = [
  {
    disease: "Nitrogen Deficiency",
    severity: "Medium",
    confidence: 91,
    symptoms: [
      "Yellowing of lower/older leaves (chlorosis)",
      "Pale green overall color",
      "Stunted growth",
    ],
    treatment: [
      "Apply urea (46-0-0) at 50 kg/hectare",
      "Foliar spray: 2% urea solution in early morning",
      "Top dress with ammonium sulfate for quick release",
    ],
    prevention: [
      "Soil test before each season",
      "Incorporate crop residue",
      "Use legume cover crops",
    ],
  },
  {
    disease: "Leaf Spot (Cercospora)",
    severity: "High",
    confidence: 88,
    symptoms: [
      "Circular brown spots with yellow halo",
      "Spots merge in severe infections",
      "Premature defoliation",
    ],
    treatment: [
      "Spray Mancozeb 75 WP @ 2g/L water",
      "Copper oxychloride 50 WP @ 3g/L",
      "Remove and destroy infected leaves",
    ],
    prevention: [
      "Crop rotation (3-year cycle)",
      "Use resistant varieties",
      "Avoid overhead irrigation",
    ],
  },
  {
    disease: "Powdery Mildew",
    severity: "Low",
    confidence: 79,
    symptoms: [
      "White powdery coating on leaves",
      "Leaf curl and distortion",
      "Reduced photosynthesis",
    ],
    treatment: [
      "Sulfur dust @ 25 kg/ha",
      "Spray Propiconazole 25 EC @ 1 ml/L",
      "Neem oil 5% EC spray",
    ],
    prevention: [
      "Good air circulation spacing",
      "Avoid excess nitrogen",
      "Morning irrigation preferred",
    ],
  },
];

const severityConfig = {
  High: {
    color: "text-destructive border-destructive/30 bg-destructive/10",
    icon: AlertTriangle,
  },
  Medium: {
    color: "text-secondary border-secondary/30 bg-secondary/10",
    icon: Info,
  },
  Low: {
    color: "text-primary border-primary/30 bg-primary/10",
    icon: CheckCircle,
  },
};

export function HealthPage() {
  const { t } = useLanguage();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setAnalyzing(true);
    setDiagnosis(null);
    setTimeout(() => {
      setAnalyzing(false);
      setDiagnosis(
        MOCK_DIAGNOSES[Math.floor(Math.random() * MOCK_DIAGNOSES.length)],
      );
    }, 2200);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function clear() {
    setImageUrl(null);
    setDiagnosis(null);
    setAnalyzing(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  const SeverityIcon = diagnosis
    ? severityConfig[diagnosis.severity].icon
    : Info;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl" data-ocid="health-page">
      <div>
        <h1 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
          <Microscope className="w-5 h-5 text-primary" />
          {t.health_title}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {t.health_subtitle}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Upload zone */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t.health_upload}</CardTitle>
          </CardHeader>
          <CardContent>
            {!imageUrl ? (
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-xl p-8 text-center transition-smooth cursor-pointer",
                  dragOver
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-muted/30",
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                data-ocid="health-upload-zone"
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files?.[0] && handleFile(e.target.files[0])
                  }
                />
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-sm font-medium text-foreground">
                  {t.health_drag}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {t.health_upload_hint}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4 gap-2"
                  onClick={() => inputRef.current?.click()}
                  data-ocid="health-browse-btn"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Browse Files
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden bg-muted aspect-video">
                  <img
                    src={imageUrl}
                    alt="Crop for analysis"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card transition-smooth"
                    onClick={clear}
                    aria-label={t.close}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {analyzing && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-primary font-medium">
                      {t.health_analyzing}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Sample images */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">
                Try sample images:
              </p>
              <div className="flex gap-2">
                {["🫘 Soybean", "🌾 Wheat", "🌿 Cotton"].map((label) => (
                  <button
                    type="button"
                    key={label}
                    className="text-xs px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground border border-border transition-smooth"
                    onClick={() => {
                      setAnalyzing(true);
                      setImageUrl(
                        `https://placehold.co/400x300/4ade80/1a2e1a?text=${encodeURIComponent(label.split(" ").slice(1).join("+"))}`,
                      );
                      setDiagnosis(null);
                      setTimeout(() => {
                        setAnalyzing(false);
                        setDiagnosis(
                          MOCK_DIAGNOSES[
                            Math.floor(Math.random() * MOCK_DIAGNOSES.length)
                          ],
                        );
                      }, 2000);
                    }}
                    data-ocid="health-sample-btn"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diagnosis */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t.health_diagnosis}</CardTitle>
          </CardHeader>
          <CardContent>
            {!diagnosis && !analyzing && (
              <div className="py-12 text-center" data-ocid="health-empty-state">
                <Microscope className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                  Upload a crop image to get AI diagnosis
                </p>
              </div>
            )}

            {analyzing && (
              <div className="space-y-3" data-ocid="health-analyzing">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            )}

            {diagnosis && !analyzing && (
              <div className="space-y-4" data-ocid="health-diagnosis-result">
                {/* Disease name */}
                <div
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border",
                    severityConfig[diagnosis.severity].color,
                  )}
                >
                  <SeverityIcon className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-base">
                      {diagnosis.disease}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs">
                        {t.health_severity}:{" "}
                        <strong>{diagnosis.severity}</strong>
                      </span>
                      <span className="text-xs">
                        {t.health_confidence}:{" "}
                        <strong>{diagnosis.confidence}%</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Symptoms Detected
                  </p>
                  <ul className="space-y-1">
                    {diagnosis.symptoms.map((s) => (
                      <li
                        key={s}
                        className="text-xs text-muted-foreground flex gap-2"
                      >
                        <span className="text-secondary mt-0.5">●</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Treatment */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    {t.health_treatment}
                  </p>
                  <ol className="space-y-1.5">
                    {diagnosis.treatment.map((step, i) => (
                      <li
                        key={step}
                        className="text-xs text-muted-foreground flex gap-2"
                      >
                        <Badge
                          variant="outline"
                          className="w-4 h-4 p-0 flex-shrink-0 flex items-center justify-center text-[9px] bg-primary/10 border-primary/30 text-primary rounded-full"
                        >
                          {i + 1}
                        </Badge>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Prevention */}
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/15">
                  <p className="text-xs font-semibold text-primary mb-1.5">
                    Prevention Tips
                  </p>
                  <ul className="space-y-1">
                    {diagnosis.prevention.map((tip) => (
                      <li
                        key={tip}
                        className="text-xs text-muted-foreground flex gap-2"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
