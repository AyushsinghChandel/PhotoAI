"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenrateImagesFromPack = exports.GenerateImage = exports.TrainModel = void 0;
const zod_1 = require("zod");
exports.TrainModel = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    type: zod_1.z.enum(["Man", "Women", "Other"]),
    age: zod_1.z.number().min(0).max(120),
    ethinicity: zod_1.z.enum(["White", "Black", "Asian_American", "East_Asian", "South_East_Asian", "South_Asian", "Middle_Eastern", "Pacific", "Hispanic"]),
    eyeColor: zod_1.z.enum(["Brown", "Blue", "Gray", "Hazel"]),
    bald: zod_1.z.boolean(),
    zipUrl: zod_1.z.string()
});
exports.GenerateImage = zod_1.z.object({
    prompt: zod_1.z.string().min(2).max(400),
    modelId: zod_1.z.string(),
    num: zod_1.z.number()
});
exports.GenrateImagesFromPack = zod_1.z.object({
    modelId: zod_1.z.string(),
    packId: zod_1.z.string()
});
