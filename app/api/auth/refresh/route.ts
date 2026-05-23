import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { detail: "Refresh token not found" },
      { status: 401 }
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiUrl}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Clear cookies if refresh fails
      cookieStore.delete("token");
      cookieStore.delete("refresh_token");
      return NextResponse.json(
        { detail: data.detail || "Failed to refresh token" },
        { status: 401 }
      );
    }

    // Update tokens in cookies
    cookieStore.set("token", data.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 30, // 30 minutes
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    cookieStore.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    cookieStore.delete("token");
    cookieStore.delete("refresh_token");
    return NextResponse.json(
      { detail: "Failed to refresh token" },
      { status: 500 }
    );
  }
}
