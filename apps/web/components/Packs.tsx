"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Backend_URL } from "@/app/config";
import { Skeleton } from "./ui/skeleton";
import { PackCard, TPack } from "./PackCard";

interface TModel {
  id: string;
  thumbnail: string;
  name: string;
}

export function Packs() {
  const [models, setModels] = useState<TModel[]>([]);
  const [packs, setPacks] = useState<TPack[]>([]);
  
  const [selectedModel, setSelectedModel] = useState<string>();
  const [selectedPack, setSelectedPack] = useState<string>();
  
  const { getToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        
        const [modelRes, packRes] = await Promise.all([
            axios.get(`${Backend_URL}/model/bulk`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${Backend_URL}/pack/bulk`, {
                headers: { Authorization: `Bearer ${token}` },
            })
        ]);

        setModels(modelRes.data.models);
        setPacks(packRes.data.packs);

        setSelectedModel(modelRes.data.models[0]?.id);
        setSelectedPack(packRes.data.packs[0]?.id);

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col justify-start w-full max-w-2xl mx-auto pt-10 px-4 pb-10">
      <div className="text-2xl font-bold mb-6">Select Model</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {loading && (
          <>
            <Skeleton className="w-full aspect-[4/5] rounded-lg" />
            <Skeleton className="w-full aspect-[4/5] rounded-lg" />
            <Skeleton className="w-full aspect-[4/5] rounded-lg" />
          </>
        )}
        {!loading && models.map((model) => (
          <div
            key={model.id}
            className="cursor-pointer group"
            onClick={() => setSelectedModel(model.id)}
          >
            <div
              className={`p-2 rounded-xl transition-all ${
                selectedModel === model.id
                  ? "border-2 border-red-400"
                  : "border-2 border-transparent"
              }`}
            >
              <img
                className="w-full aspect-[4/5] object-cover rounded-lg"
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
      <div className="text-2xl font-bold mb-6">Select Pack</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading && (
           <>
             <Skeleton className="w-full h-64 rounded-lg" />
             <Skeleton className="w-full h-64 rounded-lg" />
           </>
        )}
        {!loading && packs.map((pack) => (
          <PackCard 
            key={pack.id} 
            {...pack} 
            selected={selectedPack === pack.id}
            onClick={() => setSelectedPack(pack.id)}
          />
        ))}
      </div>
      <div className="flex justify-center pt-10">
        <Button
          disabled={!selectedModel || !selectedPack || loading}
          onClick={async () => {
            if(!selectedModel || !selectedPack) return;
            try {
                const token = await getToken();
                await axios.post(`${Backend_URL}/pack/generate`, {
                    packId: selectedPack,
                    modelId: selectedModel,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                alert("Pack generation started!");
            } catch(e) {
                console.error("Generation failed", e);
            }
          }}
          variant={"secondary"}
        >
          Generate Pack
        </Button>
      </div>
    </div>
  );
}