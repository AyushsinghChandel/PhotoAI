import express from 'express';
import {TrainModel, GenerateImage, GenrateImagesFromPack} from '@repo/common/types';
import { prismaClient } from "@repo/db";
import path from 'path';
import dotenv from 'dotenv';
import { FalAiModel } from './model/FalAiModel';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import cors from 'cors';


dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
const USER_ID = "123";

const falAiModel = new FalAiModel();
const PORT = process.env.PORT || 8080;
const app = express();
const s3 = new S3Client({
  endpoint: process.env.ENDPOINT,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  }
});

app.use(express.json());
app.use(
  cors({
    origin: [ "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.post('/upload-proxy', express.raw({ type: 'application/zip', limit: '200mb' }), async (req, res) => {
  try {
    const filename = (req.query.filename as string) || 'models.zip';
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 64);
    const key = `models/${Date.now()}_${Math.floor(Math.random()*1e6)}_${safeName}`;

    const buffer: Buffer = Buffer.isBuffer(req.body) ? req.body as Buffer : Buffer.from(req.body);
    const put = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: 'application/zip'
    });
    await s3.send(put);

    const objectUrl = `${process.env.ENDPOINT?.replace(/\/$/, '')}/${process.env.BUCKET_NAME}/${key}`;
    return res.json({ success: true, key, url: objectUrl });
  } catch (err) {
    console.error('upload-proxy error', err);
    return res.status(500).json({ message: 'Upload failed', error: String(err) });
  }
});

app.post('/ai/training', async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);
  const images = req.body.images;

  if (!parsedBody.success) {
    res.status(411).json({
      message : "Invalid input"
    })
    return;
  }
  
  const {request_id, response_url} = await falAiModel.trainModel(parsedBody.data.zipUrl,parsedBody.data.name);
  const data = await prismaClient.model.create({
    data : {
      name : parsedBody.data.name,
      type: parsedBody.data.type,
      age : parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      userId: USER_ID,
      zipUrl : parsedBody.data.zipUrl, 
      falAiRequestId : request_id
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

  const model = await prismaClient.model.findUnique({
    where : {
      id : parsedBody.data.modelId
    }
  })

  if(!model || !model?.tensorPath){
    res.json({
      message : "Model not trained yet"
    })
    return;
  }

  const {request_id, response_url} = await falAiModel.generateImage(parsedBody.data.prompt, model?.tensorPath);

  const data = await prismaClient.outputImages.create({
    data : {
      prompt: parsedBody.data.prompt,
      modelId: parsedBody.data.modelId,
      userId: USER_ID,
      imageUrl: "",
      falAiRequestId : request_id
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

  const prompts = await await prismaClient.packPrompts.findMany({
    where : {
      packId : parsedBody.data.packId
    }
  })

  let requestIds: { request_id:string }[] = await Promise.all(prompts.map( (prompt) => falAiModel.generateImage(prompt.prompt, parsedBody.data.modelId)));

  const images = await prismaClient.outputImages.createManyAndReturn({
    data : prompts.map((prompt,index) => ({
      prompt: prompt.prompt,
      modelId: parsedBody.data.modelId,
      userId : USER_ID,
      imageUrl : "",
      falAiRequestId : requestIds[index]?.request_id ?? ""
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
  const ids = req.query.images as string[];
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

app.post('/fal-ai/webhook/train', async  (req, res) => {
  const reqeustId = req.body.request_id;
  await prismaClient.model.updateMany({
    where : {
      falAiRequestId : reqeustId
    },
    data : {
      trainingStatus : "Completed",
      tensorPath : req.body.tensor_path
    }
  });

  res.json({
    message : "Webhook received" 
  })

});

app.post('/fal-ai/webhook/image', async (req, res) => {
  const reqeustId = req.body.request_id;

  await prismaClient.outputImages.updateMany({
    where: {
      falAiRequestId : reqeustId
    },
    data: {
  TrainingStatus: "Generated",
      imageUrl: req.body.image_url
    }
  });

  res.json({
    message : "Webhook received" 
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
