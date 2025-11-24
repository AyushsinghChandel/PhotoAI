import { GenerateImages } from "@/components/GenerateImages";
import { Packs } from "@/components/Packs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Train } from "@/components/Train";
import { Camera } from "@/components/Camera";
import { use } from "react";

export default function Dashboard() {
  return (
    <div className="flex justify-center">
      <div className="w-2xl">
        <div className="flex justify-center">
          <Tabs defaultValue="account" className="w-2xl3">
            <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="camera ">Camera</TabsTrigger>
              <TabsTrigger value="generate">Generate Image</TabsTrigger>
              <TabsTrigger value="train">Train Modal</TabsTrigger>
              <TabsTrigger value="packs">Packs</TabsTrigger>
            </TabsList>
            </div>
            <TabsContent value="generate">
              <GenerateImages />
            </TabsContent>
            <TabsContent value="train">
              <Train />
            </TabsContent>
            <TabsContent value="packs" className="">
              <Packs />
            </TabsContent>
            <TabsContent value="camera ">
              <Camera />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
