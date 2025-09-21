import { z } from 'zod';

export const TrainModel = z.object({
    name : z.string().min(2).max(100),
    type : z.enum(["Man" , "Women", "Other"]),
    age : z.number().min(0).max(120),
    ethinicity : z.enum(["White", "Black", "Asian_American", "East_Asian", "South_East_Asian", "South_Asian", "Middle_Eastern", "Pacific", "Hispanic"]),
    eyeColor : z.enum(["Brown", "Blue", "Gray", "Hazel"]),
    bald : z.boolean(),
    zipUrl : z.string()
});

export const GenerateImage = z.object({
    prompt : z.string().min(2).max(400),
    modelId : z.string(),
    num : z.number()
});

export const GenrateImagesFromPack = z.object({
    modelId : z.string(),
    packId : z.string()
})