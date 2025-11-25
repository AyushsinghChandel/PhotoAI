"use client";
import { useAuth } from "@clerk/nextjs";
import { Backend_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImageCard } from "./ImageCard";
import { TImage } from "./ImageCard";

export function Camera() {
  const [images, setImages] = useState<TImage[]>([]);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const response = await axios.get(`${Backend_URL}/image/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(response.data.images || []);
      setImageLoading(false);
    })();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 max-w-6xl mx-auto">
      {images.map(image => 
        <ImageCard {...image} />
      )}
    </div>
  );
}
