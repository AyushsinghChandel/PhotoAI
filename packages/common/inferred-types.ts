import { z } from "zod";
import { TrainModel, GenerateImage, GenrateImagesFromPack } from ".";
 
export type TrainModelInput = z.infer<typeof TrainModel>;
export type GenerateImageInput = z.infer<typeof GenerateImage>;
export type GenrateImagesFromPackInput = z.infer<typeof GenrateImagesFromPack>; 