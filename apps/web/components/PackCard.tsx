import { Backend_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

export interface TPack {
  id: string;
  name: string;
  imageUrl1: string;
  imageUrl2: string;
  description: string;
}

export function PackCard(props: TPack & { selectedModelId: string }) {
    const {getToken} = useAuth();
  return (
    <div className="rounded hover:border-red-400 border-2 w-full p-2 cursor-pointer" onClick={async () => {
        const token = getToken();
        await axios.post(`${Backend_URL}/pack/generate`,{
            packId : props.id,
            modelId : props.selectedModelId
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }}>
      <div className="flex p-4 gap-4 ">
        <img src={props.imageUrl1} className="w-1/2 aspect-[4/5] object-cover rounded-lg" />
        <img src={props.imageUrl2} className="w-1/2 aspect-[3/4] object-cover rounded-lg" />
      </div>
      <div className="font-bold text-lg pb-2">
        {props.name}
      </div>
      <div className="text-sm">
        {props.description}
      </div>
    </div>
  );
}
