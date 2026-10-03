import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getLanguageForState, getStateLabel, indianStates } from "@/data/states";
import { languageNames } from "@/data/translations";
import type { Language } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Eye, EyeOff, Globe, Sprout } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

const LANGS: Language[] = ["en", "hi", "mr", "pa", "gu"];

export function AuthPage() {
  const { t, language, setLanguage } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background mesh-bg">
      {/* Left panel — farming imagery */}
      <div className="relative hidden md:flex md:w-[55%] flex-col justify-end overflow-hidden">
        <img
          src="/assets/generated/farming-hero.dim_800x1000.jpg"
          alt="Lush green farming fields at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Decorative grain texture */}
        <div className="absolute inset-0 bg-[url('/assets/images/grain.png')] opacity-5 mix-blend-overlay" />

        <div className="relative z-10 p-10 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display text-5xl font-bold text-white leading-tight mb-3">
            {t.auth_welcome_title}:
          </h1>
          <p className="font-display text-4xl font-semibold text-white/90 leading-tight">
            {t.auth_welcome_subtitle}
          </p>
          <p className="mt-5 text-white/70 text-sm max-w-xs leading-relaxed">
            AI-powered crop intelligence, soil analysis & live market auctions —
            all in one place for Indian farmers.
          </p>

          {/* Trust badges */}
          <div className="flex gap-3 mt-8 flex-wrap">
            {["🌾 AI Crop Advice", "🧪 Soil Analysis", "📊 Live Mandi"].map(
              (badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs font-medium border border-white/20"
                >
                  {badge}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Right panel — auth card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-0">
        <div className="w-full max-w-md">
          {/* Mobile brand header */}
          <div className="flex items-center gap-3 mb-8 md:hidden">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              {t.farmer_brain}
            </span>
          </div>

          {/* Auth card */}
          <div className="bg-card/80 backdrop-blur-md rounded-3xl shadow-elevation border border-border p-7 md:p-8">
            {/* Language selector */}
            <div className="flex justify-end mb-5">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="pl-9 pr-8 py-2 rounded-2xl border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer appearance-none"
                  data-ocid="lang-selector"
                  aria-label={t.auth_language}
                >
                  {LANGS.map((lang) => (
                    <option key={lang} value={lang}>
                      {languageNames[lang]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Animated page transition */}
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <LoginForm onToggle={() => setIsLogin(false)} />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <SignupForm onToggle={() => setIsLogin(true)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-5">
            © {new Date().getFullYear()} Farmer Brain. Built with ❤️ for Indian
            farmers.
          </p>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ onToggle }: { onToggle: () => void }) {
  const { login, guestLogin } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      triggerShake();
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      await login(phone, password);
      await navigate({ to: "/" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed.";
      toast.error(msg);
      triggerShake();
    } finally {
      setLoading(false);
    }
  }

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  const inputCls =
    "w-full px-4 py-3 rounded-2xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth text-sm";

  return (
    <motion.div
      animate={shake ? { x: [0, -10, 10, -10, 10, -5, 5, 0] } : { x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Welcome back, Farmer 👋
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Sign in to your farm dashboard
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t.auth_phone}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your 10-digit phone number"
            className={inputCls}
            maxLength={10}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t.auth_password}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`${inputCls} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm transition-smooth hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? t.auth_signing_in : t.auth_login}
        </button>

        <button
          type="button"
          onClick={() => {
            guestLogin();
            navigate({ to: "/" });
          }}
          className="w-full py-3 rounded-2xl border-2 border-primary text-primary font-semibold text-sm transition-smooth hover:bg-primary/5 active:scale-[0.98]"
        >
          🎯 {t.auth_guest_demo}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          {t.auth_no_account}{" "}
          <button
            type="button"
            onClick={onToggle}
            className="text-primary font-semibold hover:underline"
          >
            {t.auth_signup}
          </button>
        </p>
      </form>
    </motion.div>
  );
}

function SignupForm({ onToggle }: { onToggle: () => void }) {
  const { register } = useAuth();
  const { t } = useLanguage();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [village, setVillage] = useState("");
  const [lang, setLang] = useState<Language>("hi");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state) {
      const autoLang = getLanguageForState(state);
      setLang(autoLang);
    }
  }, [state]);

  async function handleSignup(e: FormEvent) {
    e.preventDefault();

    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name) || name.trim().length < 2) {
      toast.error("Please enter a valid full name.");
      return;
    }

    if (!state) {
      toast.error("Please select your state.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const stateLabel = getStateLabel(state);
    const location = village.trim() ? `${village.trim()}, ${stateLabel}` : stateLabel;

    setLoading(true);
    try {
      await register(phone, name.trim(), location, lang, password);
      setShowSuccess(true);
      setTimeout(() => {
        toast.success("Account created! Please login with your credentials.");
        onToggle(); // Redirect back to login
      }, 1500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-2xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth text-sm";

  if (showSuccess) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16 gap-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 12 }}
        >
          <CheckCircle2 className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </motion.div>
        <motion.p
          className="text-lg font-display font-semibold text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Account Created!
        </motion.p>
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Redirecting to login...
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Join Farmer Brain 🌱
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Create your account to get started
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              {t.auth_phone}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit phone"
              className={inputCls}
              maxLength={10}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              {t.auth_name}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            State
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={inputCls}
          >
            <option value="">Select your state</option>
            {indianStates.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            <span className="flex items-center gap-2">
              {t.auth_language}
              <AnimatePresence mode="wait">
                {state && (
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-xs text-primary font-normal"
                  >
                    (Auto-selected for {getStateLabel(state)})
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className={inputCls}
          >
            {LANGS.map((l) => (
              <option key={l} value={l}>
                {languageNames[l]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t.auth_password}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min 6 chars)"
              className={`${inputCls} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm transition-smooth hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? t.auth_registering : t.auth_signup}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          {t.auth_have_account}{" "}
          <button
            type="button"
            onClick={onToggle}
            className="text-primary font-semibold hover:underline"
          >
            {t.auth_login}
          </button>
        </p>
      </form>
    </div>
  );
}
