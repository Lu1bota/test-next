import { cookies } from "next/headers";
import { api } from "../../api";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  await api.post("auth/logout", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return NextResponse.json({
    message: "Logged out successfully",
  });
}
