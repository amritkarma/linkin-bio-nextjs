import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, refreshTokens } from "@/app/lib/api-utils";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const API_URL = `${apiUrl}/me`;

export async function GET() {
  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // If token expired, try to refresh and retry
  if (res.status === 401) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      const newToken = await getAccessToken();
      if (newToken) {
        const retryRes = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        const retryData = await retryRes.json();
        return NextResponse.json(retryData, { status: retryRes.status });
      }
    }
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(req: NextRequest) {
  let token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  // ✅ Get raw body (FormData)
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ detail: "Invalid content type" }, { status: 400 });
  }

  const formData = await req.formData();

  let res = await fetch(API_URL, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ DO NOT manually set Content-Type for multipart/form-data
    },
    body: formData,
  });

  // If token expired, try to refresh and retry
  if (res.status === 401) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      token = await getAccessToken();
      if (token) {
        res = await fetch(API_URL, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }
    }
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
