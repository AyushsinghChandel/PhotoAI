import express from 'express';
import {TrainModel, GenerateImage, GenrateImagesFromPack} from '@repo/common/types';
import { prismaClient } from "@repo/db";

const USER_ID = "123";

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
      bald: parsedBody.data.bald,
      userId: USER_ID
    }
  })

  res.json({
    modelId: data.id
  })

});

app.post('/ai/generate', async (req, res) => {
  const parsedBody = GenerateImage.safeParse(req.body);

  if(!parsedBody.success){
    res.json({
      message : "Invalid input"
    })
    return;
  }

  const data = await prismaClient.outputImages.create({
    data : {
      prompt: parsedBody.data.prompt,
      modelId: parsedBody.data.modelId,
      userId: USER_ID,
      imageUrl: ""
    }
  })

  res.json({
    imageId : data.id
  })

});

app.post('/pack/generate', async (req, res) => {
  const parsedBody = GenrateImagesFromPack.safeParse(req.body);


  if(!parsedBody.success){
    res.json({
      message : "Invalid input"
    })
    return;
  }

  const prompts = await await prismaClient.packPromts.findMany({
    where : {
      packId : parsedBody.data.packId
    }
  })

  const images = await prismaClient.outputImages.createManyAndReturn({
    data : prompts.map(prompt => ({
      prompt: prompt.prompt,
      modelId: parsedBody.data.modelId,
      userId : USER_ID,
      imageUrl : ""
      }))
    })

    res.json({
      images : images.map((image) => image.id)
    })

});

app.get('/pack/bulk', async (req, res) => {

  const packs = await prismaClient.packs.findMany({});

  res.json({
    packs
  })

});

app.get('/image/bulk', async (req, res) => {
  const images = req.query.images as string[];
  const limit = req.query.limit as string ?? "10";
  const offset = req.query.offset as string ?? "0";


  const imagesData = await prismaClient.outputImages.findMany({
    where : {
      id : {
        in : ids
      },
      userId: USER_ID
    },
    skip : parseInt(offset),
    take : parseInt(limit)
  })

  res.json({
    images: imagesData
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
