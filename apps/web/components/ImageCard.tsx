export interface TImage {
    id: string;
    status: string;
    imageUrl: string;
}

export function ImageCard(props: TImage) {
  return (
    <div className="rounded hover:border-red-300 border-2 max-w-[400px] p-2 cursor-pointer">
      <div className="flex p-4 gap-4 ">
        <img src={props.imageUrl} className="object-cover rounded-lg" />
      </div>
    </div>
  );
}
