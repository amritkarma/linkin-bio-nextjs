import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const API_URL = `${apiUrl}/me`;

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  // ✅ Get raw body (FormData)
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ detail: "Invalid content type" }, { status: 400 });
  }

  const formData = await req.formData();

  const res = await fetch(API_URL, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ DO NOT manually set Content-Type for multipart/form-data
    },
    body: formData,
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
