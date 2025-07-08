"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type User = {
  token: string; // "cookie" placeholder
  username: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean; // ✅ Added loading state
  login: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Track auth check
  const router = useRouter();

  const publicPages = ["/", "/login", "/register", "/u/", "/about", "/terms", "/policy", "/contact"];
  const isPublicPage =
    publicPages.includes(pathname) || pathname?.startsWith("/u/");


  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.username) {
            setUser({ token: "cookie", username: data.username });
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (!loading && !user && !isPublicPage) {
      router.push("/login");
    }
  }, [loading, user, isPublicPage, router]);


  const login = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      if (data.username) {
        setUser({ token: "cookie", username: data.username });
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
