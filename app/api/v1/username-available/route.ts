// app/api/v1/username-available/route.ts
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) return Response.json({ error: "username param required" }, { status: 400 });

  const { data } = await supabaseServer
    .from("profiles")
    .select("id")
    .eq("username", username.toLowerCase())
    .maybeSingle();

  return Response.json({ available: !data });
}
