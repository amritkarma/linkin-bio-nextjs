/**
 * Shared API utilities for token management and refresh
 */

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Refresh access token using refresh token
 * Returns true if successful, false otherwise
 */
export async function refreshTokens(): Promise<boolean> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return false;
  }

  try {
    const refreshRes = await fetch(`${API_URL}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!refreshRes.ok) {
      return false;
    }

    const refreshData = await refreshRes.json();

    // Update tokens in cookies
    cookieStore.set("token", refreshData.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 30, // 30 minutes
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    cookieStore.set("refresh_token", refreshData.refresh_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return true;
  } catch {
    return false;
  }
}

/**
 * Get current access token, refreshing if needed
 * Returns token string or null if unavailable
 */
export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      const refreshedCookieStore = await cookies();
      return refreshedCookieStore.get("token")?.value || null;
    }
  }

  return token;
}

/**
 * Get avatar URL with proper base URL handling
 */
export function getAvatarUrl(avatarUrl: string | undefined | null): string {
  if (!avatarUrl) return "";
  
  // If already a full URL, return as is
  if (avatarUrl.startsWith("http")) {
    return avatarUrl;
  }
  
  // Otherwise, prepend API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  return `${apiUrl}${avatarUrl}`;
}
