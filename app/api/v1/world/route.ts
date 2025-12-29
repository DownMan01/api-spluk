// app/api/v1/world/route.ts
export const dynamic = "force-dynamic";

import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const before = searchParams.get("before");

  let query = supabaseServer
    .from("world_chat")
    .select("*, world_chat_reactions(user_id, reaction_type)")
    .order("created_at", { ascending: false })
    .limit(50);

  if (before) query = query.lt("created_at", before);

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ messages: data?.reverse() || [] });
}