import { z } from 'zod';
export declare const TrainModel: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<{
        Man: "Man";
        Women: "Women";
        Other: "Other";
    }>;
    age: z.ZodNumber;
    ethinicity: z.ZodEnum<{
        White: "White";
        Black: "Black";
        Asian_American: "Asian_American";
        East_Asian: "East_Asian";
        South_East_Asian: "South_East_Asian";
        South_Asian: "South_Asian";
        Middle_Eastern: "Middle_Eastern";
        Pacific: "Pacific";
        Hispanic: "Hispanic";
    }>;
    eyeColor: z.ZodEnum<{
        Brown: "Brown";
        Blue: "Blue";
        Gray: "Gray";
        Hazel: "Hazel";
    }>;
    bald: z.ZodBoolean;
    imageUrl: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const GenerateImage: z.ZodObject<{
    prompt: z.ZodString;
    modelId: z.ZodString;
    num: z.ZodNumber;
}, z.core.$strip>;
export declare const GenrateImagesFromPack: z.ZodObject<{
    modelId: z.ZodString;
    packId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=index.d.ts.map