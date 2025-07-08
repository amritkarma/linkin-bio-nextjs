import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { detail: data.detail || "Invalid credentials" },
      { status: 401 }
    );
  }

  // Set the access token as a secure httpOnly cookie
  (await
    // Set the access token as a secure httpOnly cookie
    cookies()).set("token", data.access_token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  // Fetch user data using token to extract username
  const userRes = await fetch(`${apiUrl}/me`, {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
  });

  const user = await userRes.json();

  return NextResponse.json({ username: user.username });
}
