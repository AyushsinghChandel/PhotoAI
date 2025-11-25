import { Skeleton } from "./ui/skeleton";

export interface TImage {
  id: string;
  status: string;
  imageUrl: string;
}

export function ImageCard(props: TImage) {
  return (
    <div className="rounded hover:border-red-400 border-2 max-w-[400px] p-2 cursor-pointer">
      <div className="flex justify-center">
        {props.imageUrl ? (
          <img
            src={props.imageUrl}
            className="object-cover rounded-lg w-full h-auto"
            alt="Generated"
          />
        ) : (
          <Skeleton className="rounded w-full h-40" />
        )}
      </div>
    </div>
  );
}
