// app/api/v1/stats/[username]/route.ts
export const dynamic = "force-dynamic";

import { supabaseServer } from "@/lib/supabase/server";

function calculateStats(messages: any[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const lastWeekStart = new Date(weekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  let todayCount = 0, thisWeek = 0, lastWeekCount = 0;

  messages.forEach((m: any) => {
    const date = new Date(m.created_at);
    if (date >= today) todayCount++;
    if (date >= weekStart) thisWeek++;
    if (date >= lastWeekStart && date < weekStart) lastWeekCount++;
  });

  const growth = lastWeekCount > 0
    ? Math.round(((thisWeek - lastWeekCount) / lastWeekCount) * 100)
    : thisWeek > 0 ? 100 : 0;

  return {
    total: messages.length,
    today: todayCount,
    thisWeek,
    weeklyGrowth: growth,
  };
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const { data: profile } = await supabaseServer
    .from("profiles")
    .select("id")
    .eq("username", username.toLowerCase())
    .single();

  if (!profile) return Response.json({ error: "User not found" }, { status: 404 });

  const { data: messages } = await supabaseServer
    .from("messages")
    .select("created_at")
    .eq("recipient_id", profile.id);

  return Response.json({ success: true, stats: calculateStats(messages || []) });
}