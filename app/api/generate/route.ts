import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

// Allow execution up to the maximum serverless duration on Vercel Pro/Hobby
export const maxDuration = 60; 
export const dynamic = "force-dynamic";

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, aspectRatio = "16:9", resolution = "480p" } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "A prompt is required." }, { status: 400 });
    }

    // Call Wan 2.1 via fal.ai inference API
    const result: any = await fal.subscribe("fal-ai/wan-t2v", {
      input: {
        prompt,
        aspect_ratio: aspectRatio,
        resolution: resolution, // "480p" or "720p"
      },
      pollInterval: 3000,
      logs: false,
    });

    if (!result?.video?.url) {
      return NextResponse.json(
        { error: "Model finished without returning a video URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      videoUrl: result.video.url,
      seed: result.seed,
    });
  } catch (error: any) {
    console.error("Wan 2.1 generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate video." },
      { status: 500 }
    );
  }
}
