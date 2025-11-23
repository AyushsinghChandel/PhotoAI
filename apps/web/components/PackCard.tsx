export interface TPack {
  name: string;
  imageUrl1: string;
  imageUrl2: string;
  description: string;
}

export function PackCard(props: TPack) {
  return (
    <div className="rounded hover:border-red-300 border-2 w-full p-2 cursor-pointer">
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
