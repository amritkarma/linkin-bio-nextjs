import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // 🔁 Point to your FastAPI backend

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");

  try {
    if (username) {
      // 🔎 Public profile fetch
      const profileRes = await fetch(`${BASE_URL}/users/${username}`);
      const profileData = await profileRes.json();

      if (!profileRes.ok) {
        return NextResponse.json(
          { detail: profileData.detail || "User not found" },
          { status: profileRes.status }
        );
      }

      return NextResponse.json(profileData, { status: 200 });
    }

    // 🔐 Authenticated fetch (user's own links)
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    const userRes = await fetch(`${BASE_URL}/links`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await userRes.json();
    return NextResponse.json(data, { status: userRes.status });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const linkRes = await fetch(`${BASE_URL}/links`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await linkRes.json();
    return NextResponse.json(data, { status: linkRes.status });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create link";
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}
