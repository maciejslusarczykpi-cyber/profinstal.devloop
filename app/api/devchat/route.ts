import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json().catch(() => ({ prompt: "" }));
  // STUB: na razie tylko echo. Potem podmienimy na wersję z PR + Preview.
  return Response.json({
    summary: "Stub backend OK",
    echo: prompt ?? "",
    notes: "Tu później podłączymy OpenAI + GitHub PR + Vercel Preview."
  });
}
