import { PackCard, TPack } from "./PackCard";
import axios from "axios";
import { Backend_URL } from "@/app/config";


async function getPacks(): Promise<TPack[]> {
  const response = await axios.get(`${Backend_URL}/pack/bulk`);
  return response.data.packs ?? [];
}

export async function Packs() {
  const pack = await getPacks();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 max-w-6xl mx-auto">
      {pack.map(p => <PackCard {...p} />)}
    </div>
  );
}