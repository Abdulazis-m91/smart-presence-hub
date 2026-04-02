import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupaUser, Session } from "@supabase/supabase-js";

export type UserRole = "guru" | "petugas" | "admin" | "developer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photo_url?: string;
  whatsapp?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (supaUser: SupaUser) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", supaUser.id)
      .maybeSingle();

    if (profile) {
      setUser({
        id: supaUser.id,
        name: profile.name,
        email: profile.email,
        role: profile.role as UserRole,
        photo_url: profile.photo_url || "",
        whatsapp: profile.whatsapp || "",
      });
    } else {
      // Fallback to user metadata
      setUser({
        id: supaUser.id,
        name: supaUser.user_metadata?.name || supaUser.email || "",
        email: supaUser.email || "",
        role: (supaUser.user_metadata?.role as UserRole) || "guru",
      });
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase client
          setTimeout(() => fetchProfile(newSession.user), 0);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // THEN check current session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchProfile(currentSession.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { success: false, error: error.message };
    }
    if (data.user) {
      await fetchProfile(data.user);
    }
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
