import { NextResponse } from "next/server";
import { seedAll } from "@/lib/seeder";

export async function GET(request: Request) {
  // Authorization check to protect against unauthorized triggers
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const results = await seedAll();
    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error("Cron Seeding Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
