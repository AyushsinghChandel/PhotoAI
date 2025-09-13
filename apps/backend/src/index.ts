import express from 'express';
import {TrainModel, GenerateImage, GenrateImagesFromPack} from '@repo/common/types';
import { prismaClient } from "@repo/db";

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

app.post('/ai/training', (req, res) => {

});
app.post('/ai/generate', (req, res) => {
    
});
app.post('/pack/generate', (req, res) => {
    
});
app.post('/pack/bulk', (req, res) => {
    
});
app.get('/ai/training', (req, res) => {
    
});
app.get('/image', (req, res) => {
    
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
