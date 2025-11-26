"use client";

export interface TPack {
  id: string;
  name: string;
  imageUrl1: string;
  imageUrl2: string;
  description: string;
}

interface PackCardProps extends TPack {
  selected: boolean;
  onClick: () => void;
}

export function PackCard(props: PackCardProps) {
  return (
    <div className="cursor-pointer group" onClick={props.onClick}>
      <div
        className={`p-2 rounded-xl transition-all ${
          props.selected ? "border-2 border-red-400" : "border-2 border-transparent"
        }`}
      >
        <div className="flex gap-2 mb-2">
          <img
            className="w-1/2 aspect-[4/5] object-cover rounded-lg"
            src={props.imageUrl1}
            alt={props.name}
          />
          <img
            className="w-1/2 aspect-[4/5] object-cover rounded-lg"
            src={props.imageUrl2}
            alt={props.name}
          />
        </div>
        <div className="font-semibold text-lg pb-1">{props.name}</div>
        <div className="text-sm text-gray-500 line-clamp-2">
          {props.description}
        </div>
      </div>
    </div>
  );
}