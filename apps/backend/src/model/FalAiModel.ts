import { fal } from "@fal-ai/client";
import { BaseModel } from "./BaseModel";
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export class FalAiModel extends BaseModel {
  constructor() {
    super();
  }

  public async generateImage(prompt: string, tensorPath: string) {
    // --- START MOCK BLOCK ---
    // Change this to false when you have credits
    const MOCK_MODE = true; 

    if (MOCK_MODE) {
        console.log("⚠️ MOCK MODE: Skipping Fal.ai generateImage call");
        return {
            request_id: `mock-gen-${Date.now()}`,
            response_url: "https://fal.ai/models/fal-ai/flux-lora/requests/mock-request"
        };
    }
    // --- END MOCK BLOCK ---

    const { request_id, response_url } = await fal.queue.submit("fal-ai/flux-lora", {
      input: {
        prompt: prompt,
        loras: [{ path: tensorPath, scale: 1 }],
      },
      webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/image`,
    });
    return { request_id, response_url };
  }

  public async trainModel(zipUrl: string, triggerWord: string) {
    // --- START MOCK BLOCK ---
    const MOCK_MODE = true;

    if (MOCK_MODE) {
        console.log("⚠️ MOCK MODE: Skipping Fal.ai trainModel call");
        return {
            request_id: `mock-train-${Date.now()}`,
            response_url: "https://fal.ai/models/fal-ai/flux-lora-fast-training/requests/mock-request"
        };
    }
    // --- END MOCK BLOCK ---

    const { request_id, response_url } = await fal.queue.submit(
      "fal-ai/flux-lora-fast-training",
      {
        input: {
          images_data_url: zipUrl,
          trigger_word: triggerWord
        },
        webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/train`,
      }
    );
    return { request_id, response_url };
  }
}