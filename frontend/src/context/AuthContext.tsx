import type { UserProfile } from "@/types";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LS_TOKEN_KEY = "fb_auth_token";
const LS_PHONE_KEY = "fb_phone";
const LS_GUEST_KEY = "fb_guest";

const API_URL = "http://localhost:5000/api";

interface AuthContextValue {
  user: UserProfile | null;
  isGuest: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, password: string) => Promise<void>;
  register: (
    phoneNumber: string,
    name: string,
    location: string,
    preferredLanguage: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  guestLogin: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const savedGuest = localStorage.getItem(LS_GUEST_KEY);
    if (savedGuest === "true") {
      setIsGuest(true);
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem(LS_TOKEN_KEY);
    const phone = localStorage.getItem(LS_PHONE_KEY);

    if (!token || !phone) {
      setIsLoading(false);
      return;
    }

    // Fetch user profile
    fetch(`${API_URL}/users/${phone}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem(LS_TOKEN_KEY);
        localStorage.removeItem(LS_PHONE_KEY);
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function login(phoneNumber: string, password: string): Promise<void> {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Invalid credentials.");
    }

    setUser(data);
    setIsGuest(false);
    localStorage.setItem(LS_TOKEN_KEY, data.token);
    localStorage.setItem(LS_PHONE_KEY, data.phoneNumber);
    localStorage.removeItem(LS_GUEST_KEY);
  }

  async function register(
    phoneNumber: string,
    name: string,
    location: string,
    preferredLanguage: string,
    password: string,
  ): Promise<void> {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber,
        name,
        location,
        preferredLanguage,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed.");
    }
    
    // Auto login is not done here as per flow "Automatically redirect back to the Login page so the user can log in"
  }

  function logout(): void {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem(LS_TOKEN_KEY);
    localStorage.removeItem(LS_PHONE_KEY);
    localStorage.removeItem(LS_GUEST_KEY);
  }

  function guestLogin(): void {
    setIsGuest(true);
    setUser(null);
    localStorage.setItem(LS_GUEST_KEY, "true");
    localStorage.removeItem(LS_TOKEN_KEY);
    localStorage.removeItem(LS_PHONE_KEY);
  }

  return (
    <AuthContext.Provider
      value={{ user, isGuest, isLoading, login, register, logout, guestLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
