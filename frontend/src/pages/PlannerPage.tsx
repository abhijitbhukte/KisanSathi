import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import {
  Bug,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock,
  Droplets,
  Edit2,
  MapPin,
  Scissors,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CROPS_LIST = [
  { id: "wheat", label: "Gehu (Wheat)", season: "Rabi", basePrice: 2150 },
  { id: "rice", label: "Dhan (Rice)", season: "Kharif", basePrice: 1950 },
  { id: "cotton", label: "Kapas (Cotton)", season: "Kharif", basePrice: 6800 },
  {
    id: "sugarcane",
    label: "Ganna (Sugarcane)",
    season: "Zaid",
    basePrice: 3100,
  },
  { id: "tomato", label: "Tamatar (Tomato)", season: "Rabi", basePrice: 1200 },
  { id: "onion", label: "Pyaz (Onion)", season: "Rabi", basePrice: 1800 },
  { id: "soybean", label: "Soyabean", season: "Kharif", basePrice: 4200 },
  { id: "maize", label: "Makka (Maize)", season: "Kharif", basePrice: 1750 },
  {
    id: "chickpea",
    label: "Chana (Chickpea)",
    season: "Rabi",
    basePrice: 5200,
  },
  { id: "lentil", label: "Masoor (Lentil)", season: "Rabi", basePrice: 5500 },
  {
    id: "groundnut",
    label: "Moongfali (Groundnut)",
    season: "Kharif",
    basePrice: 5800,
  },
  { id: "mango", label: "Aam (Mango)", season: "Summer", basePrice: 4500 },
  { id: "banana", label: "Kela (Banana)", season: "Zaid", basePrice: 1400 },
  { id: "grapes", label: "Angoor (Grapes)", season: "Rabi", basePrice: 6200 },
  { id: "potato", label: "Aloo (Potato)", season: "Rabi", basePrice: 1100 },
  { id: "mustard", label: "Sarson (Mustard)", season: "Rabi", basePrice: 5100 },
  { id: "sunflower", label: "Surajmukhi", season: "Rabi", basePrice: 5600 },
  { id: "jowar", label: "Jowar (Sorghum)", season: "Kharif", basePrice: 2738 },
  {
    id: "bajra",
    label: "Bajra (Pearl Millet)",
    season: "Kharif",
    basePrice: 2350,
  },
  {
    id: "turmeric",
    label: "Haldi (Turmeric)",
    season: "Kharif",
    basePrice: 9500,
  },
];

const MANDIS = [
  { name: "Nagpur APMC", distance: 8 },
  { name: "Wardha", distance: 74 },
  { name: "Amravati", distance: 156 },
];

interface MonthCrop {
  name: string;
  type: "kharif" | "rabi" | "zaid";
  tasks: string[];
}

const MONTH_DATA: Record<string, MonthCrop[]> = {
  Jan: [
    {
      name: "Wheat",
      type: "rabi",
      tasks: ["Irrigation", "Fertilize (N top dress)", "Weed control"],
    },
  ],
  Feb: [
    {
      name: "Wheat",
      type: "rabi",
      tasks: ["Second irrigation", "Monitor pest", "Flag leaf stage"],
    },
  ],
  Mar: [
    {
      name: "Wheat",
      type: "rabi",
      tasks: ["Harvest preparation", "Moisture testing", "Storage planning"],
    },
  ],
  Apr: [
    {
      name: "Sugarcane",
      type: "zaid",
      tasks: ["Sow ratoon", "Fertilize", "Irrigate weekly"],
    },
  ],
  May: [
    {
      name: "Cotton",
      type: "kharif",
      tasks: ["Land prep", "Seed treatment", "Pre-sow irrigation"],
    },
  ],
  Jun: [
    {
      name: "Soybean",
      type: "kharif",
      tasks: ["Sowing (45×5cm)", "Inoculant application", "Weed control"],
    },
    {
      name: "Cotton",
      type: "kharif",
      tasks: ["Transplant", "Apply FYM", "First irrigation"],
    },
  ],
  Jul: [
    {
      name: "Soybean",
      type: "kharif",
      tasks: ["Top dress urea", "Pest scouting", "Interculture"],
    },
    {
      name: "Cotton",
      type: "kharif",
      tasks: ["Pinching", "Bollworm monitoring", "Spray neem oil"],
    },
  ],
  Aug: [
    {
      name: "Soybean",
      type: "kharif",
      tasks: ["Pest control spray", "Irrigation if dry", "Disease check"],
    },
    {
      name: "Cotton",
      type: "kharif",
      tasks: ["Pick 1st flush", "Apply MOP", "Irrigation"],
    },
  ],
  Sep: [
    {
      name: "Soybean",
      type: "kharif",
      tasks: ["Pre-harvest desiccation", "Moisture check <15%", "Harvest"],
    },
  ],
  Oct: [
    {
      name: "Wheat",
      type: "rabi",
      tasks: ["Land preparation", "Basal dose NPK", "Sow (Oct 15–Nov 15)"],
    },
  ],
  Nov: [
    {
      name: "Wheat",
      type: "rabi",
      tasks: ["Crown root irrigation", "First top dress N", "Weed spray"],
    },
    {
      name: "Cotton",
      type: "kharif",
      tasks: ["Final picking", "Stalk destruction", "Land clearing"],
    },
  ],
  Dec: [
    {
      name: "Wheat",
      type: "rabi",
      tasks: ["Tillering irrigation", "Monitor aphids", "Field inspection"],
    },
  ],
};

const WEEKLY_TASKS = [
  {
    week: 1,
    label: "Sowing & Planting",
    icon: "🌱",
    desc: "Prepare beds, apply basal fertilizer, sow seeds at correct depth and spacing",
    type: "planting",
  },
  {
    week: 2,
    label: "Germination Watch",
    icon: "🔍",
    desc: "Monitor germination rate (expect 70-85%), gap filling, first irrigation if needed",
    type: "monitoring",
  },
  {
    week: 3,
    label: "First Irrigation",
    icon: "💧",
    desc: "Light irrigation at seedling stage, avoid waterlogging, maintain moisture",
    type: "irrigation",
  },
  {
    week: 4,
    label: "Weed Control",
    icon: "🌿",
    desc: "Manual weeding or pre-emergent herbicide application around seedlings",
    type: "maintenance",
  },
  {
    week: 5,
    label: "Pest Control",
    icon: "🐛",
    desc: "Scout for aphids, borers, leaf miners. Apply neem-based spray if threshold exceeded",
    type: "protection",
  },
  {
    week: 6,
    label: "Top Dressing N",
    icon: "⚗️",
    desc: "Apply 30% of total N dose as urea top dressing for vegetative growth",
    type: "fertilize",
  },
  {
    week: 8,
    label: "Flowering Stage",
    icon: "🌸",
    desc: "Critical water stage — avoid stress. Stop pesticide during flowering for pollinators",
    type: "critical",
  },
  {
    week: 10,
    label: "Fruit / Pod Fill",
    icon: "🫘",
    desc: "Second K application, foliar micronutrient spray, monitor fungal diseases",
    type: "fertilize",
  },
  {
    week: 12,
    label: "Pre-Harvest",
    icon: "📅",
    desc: "Stop irrigation 10 days before harvest, check moisture content, arrange storage",
    type: "harvest",
  },
  {
    week: 14,
    label: "Harvest & Store",
    icon: "🌾",
    desc: "Harvest at optimal moisture, thresh/clean, store in dry conditions. Record yield",
    type: "harvest",
  },
];

// ─── Styling maps ──────────────────────────────────────────────────────────────

const typeColors: Record<string, string> = {
  kharif: "bg-primary/10 text-primary border-primary/20",
  rabi: "bg-accent/10 text-accent-foreground border-accent/20",
  zaid: "bg-secondary/10 text-secondary-foreground border-secondary/20",
};

const seasonColors: Record<string, string> = {
  Kharif: "bg-primary/10 text-primary border-primary/20",
  Rabi: "bg-accent/10 text-accent-foreground border-accent/20",
  Zaid: "bg-secondary/10 text-secondary-foreground border-secondary/20",
  Summer: "bg-secondary/20 text-secondary-foreground border-secondary/30",
};

const taskColors: Record<string, string> = {
  planting: "bg-primary/10 border-l-primary",
  monitoring: "bg-muted/50 border-l-muted-foreground",
  irrigation: "bg-accent/10 border-l-accent",
  maintenance: "bg-muted/50 border-l-muted-foreground",
  protection: "bg-destructive/10 border-l-destructive",
  fertilize: "bg-secondary/10 border-l-secondary",
  critical: "bg-secondary/20 border-l-secondary",
  harvest: "bg-primary/15 border-l-primary",
};

const taskIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  irrigation: Droplets,
  protection: Bug,
  harvest: Scissors,
  default: Clock,
};

// ─── LocalStorage helpers ─────────────────────────────────────────────────────

const LS_COMPLETED_KEY = "farmerBrain_completedTasks";
const LS_CROP_KEY = "farmerBrain_selectedCrop";

function loadCompleted(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(LS_COMPLETED_KEY) ?? "{}") as Record<
      string,
      string
    >;
  } catch {
    return {};
  }
}

interface SavedCrop {
  cropId: string;
  acres: number;
}

function loadSavedCrop(): SavedCrop | null {
  try {
    const raw = localStorage.getItem(LS_CROP_KEY);
    return raw ? (JSON.parse(raw) as SavedCrop) : null;
  } catch {
    return null;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MandiPredictionCard({ cropId }: { cropId: string }) {
  const cropInfo = CROPS_LIST.find((c) => c.id === cropId);
  if (!cropInfo) return null;

  const base = cropInfo.basePrice;
  const trendUp = [
    "wheat",
    "rice",
    "cotton",
    "chickpea",
    "turmeric",
    "groundnut",
  ].includes(cropId);
  const trendPct = trendUp ? 4.2 : -2.8;
  const predicted = trendUp
    ? { min: Math.round(base * 1.03), max: Math.round(base * 1.09) }
    : { min: Math.round(base * 0.94), max: Math.round(base * 0.99) };

  return (
    <Card
      className="shadow-card border-primary/20 mt-6"
      data-ocid="mandi-prediction-card"
    >
      <CardHeader className="pb-3 bg-primary/5 rounded-t-xl">
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Mandi Aur Bhav Prediction 🎯
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Sabhi tasks complete! Ab mandi aur price prediction dekhein.
        </p>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {/* Nearest Mandis */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Nearest Mandis (Nagpur Area)
          </p>
          <div className="space-y-2">
            {MANDIS.map((mandi) => {
              const price = Math.round(base * (0.95 + Math.random() * 0.1));
              return (
                <div
                  key={mandi.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                  data-ocid="mandi-row"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {mandi.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {mandi.distance} km door
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">
                      ₹{price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground">per quintal</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Price Prediction */}
        <div className="p-4 rounded-xl bg-card border border-border space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            AI Bhav Prediction
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Predicted Price Range
            </span>
            <span className="text-sm font-bold text-foreground">
              ₹{predicted.min.toLocaleString("en-IN")} – ₹
              {predicted.max.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Best Time to Sell
            </span>
            <span className="text-sm font-semibold text-foreground">
              {trendUp ? "2-3 hafte baad" : "Abhi becho"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">7-Day Trend</span>
            <span
              className={cn(
                "flex items-center gap-1 text-sm font-semibold",
                trendUp ? "text-primary" : "text-destructive",
              )}
            >
              {trendUp ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {trendUp ? "+" : ""}
              {trendPct}%
            </span>
          </div>
        </div>

        {/* Recommendation Badge */}
        <div
          className={cn(
            "flex items-center justify-center gap-2 p-3 rounded-xl font-bold text-sm",
            trendUp
              ? "bg-primary/10 text-primary border border-primary/30"
              : "bg-secondary/10 text-secondary-foreground border border-secondary/30",
          )}
          data-ocid="mandi-recommendation"
        >
          {trendUp ? (
            <>
              <TrendingUp className="w-5 h-5" />
              RUKO — Bhav Badhega! 📈
            </>
          ) : (
            <>
              <TrendingDown className="w-5 h-5" />
              BECHO — Abhi Accha Bhav Hai! 💰
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function PlannerPage() {
  const { t } = useLanguage();
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Crop selection state
  const [cropId, setCropId] = useState<string>("");
  const [acres, setAcres] = useState<string>("");
  const [savedCrop, setSavedCrop] = useState<SavedCrop | null>(loadSavedCrop);

  // Task completion state
  const [completed, setCompleted] =
    useState<Record<string, string>>(loadCompleted);

  const crops = MONTH_DATA[MONTHS[selectedMonth]] ?? [];
  const totalTasks = WEEKLY_TASKS.length;
  const completedCount = WEEKLY_TASKS.filter(
    (t) => completed[String(t.week)],
  ).length;
  const allDone = completedCount === totalTasks;

  // Group completed counts by "week bucket" (all tasks use individual week numbers)
  function weekDoneCount(weekNum: number): boolean {
    return !!completed[String(weekNum)];
  }

  // Persist completed tasks
  useEffect(() => {
    localStorage.setItem(LS_COMPLETED_KEY, JSON.stringify(completed));
  }, [completed]);

  function handleSaveCrop() {
    if (!cropId || !acres || Number(acres) <= 0) return;
    const crop: SavedCrop = { cropId, acres: Number(acres) };
    setSavedCrop(crop);
    localStorage.setItem(LS_CROP_KEY, JSON.stringify(crop));
  }

  function handleEditCrop() {
    setSavedCrop(null);
    localStorage.removeItem(LS_CROP_KEY);
  }

  function toggleTask(weekNum: number) {
    const key = String(weekNum);
    setCompleted((prev) => {
      if (prev[key]) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      const dateStr = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return { ...prev, [key]: dateStr };
    });
  }

  function prev() {
    setSelectedMonth((m) => (m - 1 + 12) % 12);
  }
  function next() {
    setSelectedMonth((m) => (m + 1) % 12);
  }

  const selectedCropInfo = CROPS_LIST.find((c) => c.id === savedCrop?.cropId);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl" data-ocid="planner-page">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          {t.planner_title}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {t.planner_subtitle}
        </p>
      </div>

      {/* ── CROP SELECTION ────────────────────────────────────────────────── */}
      <Card className="shadow-card" data-ocid="crop-selection-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            🌾 {t.planner_crop_select_title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {savedCrop && selectedCropInfo ? (
            // Crop card (after selection)
            <div
              className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20"
              data-ocid="saved-crop-card"
            >
              <div className="text-3xl">🌱</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-base truncate">
                  {selectedCropInfo.label}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className={`text-xs ${seasonColors[selectedCropInfo.season] ?? ""}`}
                  >
                    {selectedCropInfo.season}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {savedCrop.acres} {t.planner_acres}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleEditCrop}
                className="flex-shrink-0"
                data-ocid="edit-crop-btn"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1" />
                {t.planner_edit}
              </Button>
            </div>
          ) : (
            // Selection form
            <div className="space-y-4" data-ocid="crop-select-form">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="crop-select"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.planner_fasal_naam}
                  </label>
                  <select
                    id="crop-select"
                    value={cropId}
                    onChange={(e) => setCropId(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    data-ocid="crop-dropdown"
                  >
                    <option value="">— Fasal Chuno —</option>
                    {CROPS_LIST.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="acres-input"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.planner_zameen_acres}
                  </label>
                  <div className="relative">
                    <input
                      id="acres-input"
                      type="number"
                      min={0.1}
                      step={0.1}
                      value={acres}
                      onChange={(e) => setAcres(e.target.value)}
                      placeholder="e.g. 2.5"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 pr-14 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      data-ocid="acres-input"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      Acres
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSaveCrop}
                disabled={!cropId || !acres || Number(acres) <= 0}
                className="w-full sm:w-auto"
                data-ocid="crop-save-btn"
              >
                {t.planner_aage_badhe} →
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── MONTHLY CALENDAR (always visible) ────────────────────────────── */}
      <Card className="shadow-card">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-2 mb-4">
            <button
              type="button"
              onClick={prev}
              className="p-1.5 rounded-lg hover:bg-muted transition-smooth"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-1.5 min-w-max px-1">
                {MONTHS.map((m, i) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setSelectedMonth(i)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap",
                      selectedMonth === i
                        ? "bg-primary text-primary-foreground"
                        : i === currentMonth
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:bg-muted",
                    )}
                    data-ocid={`month-${m.toLowerCase()}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={next}
              className="p-1.5 rounded-lg hover:bg-muted transition-smooth"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {crops.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                No active crops in {MONTHS[selectedMonth]}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {crops.map((crop) => (
                <div
                  key={crop.name}
                  className="p-4 rounded-xl border border-border bg-muted/20"
                  data-ocid="planner-month-crop"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🌾</span>
                    <p className="font-semibold text-foreground">{crop.name}</p>
                    <Badge
                      variant="outline"
                      className={`ml-auto text-xs capitalize ${typeColors[crop.type]}`}
                    >
                      {crop.type}
                    </Badge>
                  </div>
                  <ul className="space-y-1.5">
                    {crop.tasks.map((task) => (
                      <li
                        key={task}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── WEEKLY TASK STEPPER (only after crop selected) ────────────────── */}
      {savedCrop && (
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-base">
                {t.planner_weekly_guide}
              </CardTitle>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-semibold",
                  allDone
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-muted text-muted-foreground",
                )}
                data-ocid="weekly-progress-badge"
              >
                {completedCount}/{totalTasks} {t.planner_complete}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-4">
                {WEEKLY_TASKS.map((task, i) => {
                  const TaskIcon = taskIcons[task.type] ?? taskIcons.default;
                  const isDone = weekDoneCount(task.week);
                  const doneDate = completed[String(task.week)];
                  return (
                    <div
                      key={task.week}
                      className="flex gap-4 items-start relative"
                      data-ocid={`weekly-task-${i}`}
                    >
                      {/* Week circle */}
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 text-sm font-bold transition-smooth",
                          isDone
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-card border-primary/30 text-primary",
                        )}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          task.week
                        )}
                      </div>

                      {/* Task content */}
                      <div
                        className={cn(
                          "flex-1 p-3 rounded-lg border-l-2 text-sm transition-smooth",
                          isDone
                            ? "bg-muted/30 border-l-primary opacity-70"
                            : taskColors[task.type],
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{task.icon}</span>
                          <p
                            className={cn(
                              "font-semibold text-foreground",
                              isDone && "line-through text-muted-foreground",
                            )}
                          >
                            {t.planner_week} {task.week}: {task.label}
                          </p>
                          <TaskIcon className="w-3.5 h-3.5 text-muted-foreground ml-auto flex-shrink-0" />
                          {/* Complete toggle */}
                          <button
                            type="button"
                            onClick={() => toggleTask(task.week)}
                            title={
                              isDone ? "Mark incomplete" : "Task Complete karo"
                            }
                            className={cn(
                              "flex-shrink-0 rounded-full p-0.5 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                              isDone
                                ? "text-primary hover:text-destructive"
                                : "text-muted-foreground hover:text-primary",
                            )}
                            data-ocid={`task-complete-btn-${task.week}`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <p
                          className={cn(
                            "text-muted-foreground leading-relaxed",
                            isDone && "line-through opacity-60",
                          )}
                        >
                          {task.desc}
                        </p>
                        {isDone && doneDate && (
                          <p className="text-xs text-primary mt-1 font-medium">
                            ✅ Task Complete — {doneDate}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── MANDI & PRICE PREDICTION (only when all tasks done) ──────────── */}
      {savedCrop && allDone && (
        <MandiPredictionCard cropId={savedCrop.cropId} />
      )}
    </div>
  );
}
