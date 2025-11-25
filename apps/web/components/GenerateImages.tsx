"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Backend_URL } from "@/app/config";
import { Skeleton } from "./ui/skeleton";

interface TModel {
  id: string;
  thumbnail: string;
  name: string;
}

export function GenerateImages() {
  const [prompt, setPrompt] = useState<string>("");
  const [models, setModels] = useState<TModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>();
  const { getToken } = useAuth();
  const [modelLoading, setModelLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${Backend_URL}/model/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setModels(response.data.models);
        setSelectedModel(response.data.models[0]?.id);
      } catch (e) {
        console.error(e);
      } finally {
        setModelLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col justify-start w-full max-w-2xl mx-auto pt-10 px-4 pb-10">
      <div className="text-2xl font-bold mb-6">Select Model</div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modelLoading && (
            <>
              <Skeleton className="w-45 h-55 aspect-[4/5] rounded-lg" />
              <Skeleton className="w-45 h-55 aspect-[4/5] rounded-lg" />
              <Skeleton className="w-45 h-55 aspect-[4/5] rounded-lg" />
            </>
          )}
          {!modelLoading && models.map((model) => (
            <div
              key={model.id}
              className="cursor-pointer group"
              onClick={() => {
                setSelectedModel(model.id);
              }}
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  selectedModel === model.id
                    ? "border-2 border-red-400"
                    : "border-2 border-transparent"
                }`}
              >
                <img
                  className="w-40 h-50 aspect-[4/5] object-cover rounded-lg"
                  src={model.thumbnail}
                  alt={model.name}
                />
              </div>
              <div className="text-center mt-2 font-semibold group-hover:opacity-80 transition-opacity">
                {model.name}
              </div>
            </div>
          ))}
        </div>

        <Textarea
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
          placeholder="Describe the image you would like to generate..."
          className="py-8 px-4 w-full border border-blue-200 hover:border-blue-300 focus:border-blue-300 outline-none mt-6"
        />
        <div className="flex justify-center pt-4">
          <Button onClick={async () => {
            const token = await getToken();
            await axios.post(`${Backend_URL}/ai/generate`,{
              prompt,
              modelId: selectedModel,
              num: 1 
            },{
              headers: {
                Authorization: `Bearer ${token}`,
              }
            })
          }} variant={"secondary"}>Generate Images</Button>
        </div>
      </div>
    </div>
  );
}