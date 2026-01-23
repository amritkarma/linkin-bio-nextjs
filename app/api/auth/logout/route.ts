import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const res = NextResponse.json({ message: "Logged out" });
  
  // Clear both tokens
  cookieStore.delete("token");
  cookieStore.delete("refresh_token");
  
  return res;
}
