import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Params = Promise<{ id: string }>;

interface APIError {
  message?: string;
  detail?: string;
}

interface LinkData {
  [key: string]: unknown; // Use specific fields if known
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(`${BASE_URL}/links/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: LinkData | APIError = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { detail: (data as APIError).detail || "Link not found" },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const err = error as APIError;
    return NextResponse.json({ detail: err.message || "Failed to fetch link" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const res = await fetch(`${BASE_URL}/links/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data: LinkData | APIError = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const err = error as APIError;
    return NextResponse.json({ detail: err.message || "Failed to update link" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(`${BASE_URL}/links/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: LinkData | APIError = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const err = error as APIError;
    return NextResponse.json({ detail: err.message || "Failed to delete link" }, { status: 500 });
  }
}
