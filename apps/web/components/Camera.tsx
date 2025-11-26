"use client";
import { useAuth } from "@clerk/nextjs";
import { Backend_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImageCard, TImage } from "./ImageCard";
import { Skeleton } from "./ui/skeleton";
export function Camera() {
  const [images, setImages] = useState<TImage[]>([]);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${Backend_URL}/image/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImages(response.data.images || []);
      } catch (e) {
        console.error("Error fetching images:", e);
      } finally {
        setImageLoading(false);
      }
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 max-w-6xl mx-auto">
      {imageLoading && (
        <>
          <div className="rounded border-2 p-2">
            <Skeleton className="h-[300px] w-55 rounded-lg" />
          </div>
          <div className="rounded border-2 p-2">
            <Skeleton className="h-[300px] w-55 rounded-lg" />
          </div>
          <div className="rounded border-2 p-2">
            <Skeleton className="h-[300px] w-55 rounded-lg" />
          </div>
          <div className="rounded border-2 p-2">
            <Skeleton className="h-[300px] w-55 rounded-lg" />
          </div>
        </>
      )}
      {!imageLoading &&
        images.map((image) => <ImageCard key={image.id} {...image} />)}
    </div>
  );
}
