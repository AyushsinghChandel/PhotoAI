import express from 'express';
import {TrainModel, GenerateImage, GenrateImagesFromPack} from '@repo/common/types';
import { prismaClient } from "@repo/db";

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

app.post('/ai/training', async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({
      message : "Invalid input"
    })
    return;
  }
  
  const data = await prismaClient.model.create({
    data : {
      name : parsedBody.data.name,
      type: parsedBody.data.type,
      age : parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald
    }
  })

  res.json({
    modelId: data.id
  })
  
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
