"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UploadModal from "@/components/ui/upload";
import { useState } from "react";
import axios from "axios";
import { Backend_URL } from "../config";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";


export default function CardDemo() {
  const [zipUrl, setZipUrl] = useState("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [ethinicity, setEthinicity] = useState<string>("");
  const [eyeColor, setEyeColor] = useState<string>("");
  const [bald, setBald] = useState(false);
  const router = useRouter();

  async function TrainModal(e?: React.MouseEvent<HTMLButtonElement>) {
    e?.preventDefault();
    const input = {
      zipUrl,
      name,
      type,
      age: parseInt(age ?? "0"),
      ethinicity,
      eyeColor,
      bald
    };
    try {
      console.log('Training model with input', input);
      await axios.post(`${Backend_URL}/ai/training`, input);
    } catch (err) {
      console.error('Training failed', err);
    }
    router.push('/');
  }
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-sm px-4">
        <CardHeader>
          <CardTitle className="text-lg">Train your model</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Enter name of your model"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Type</Label>
                <Select onValueChange={(value) => setType(value)}>
                  <SelectTrigger id="type" name="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Man">Man</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Age</Label>
                <Input
                  id="Age"
                  type="text"
                  placeholder="Enter your age"
                  required
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Ethnicity</Label>
                <Select onValueChange={(value) => setEthinicity(value)}>
                  <SelectTrigger
                    id="ethinicity"
                    name="ethinicity"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select an ethnicity" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="Asian_American">
                      Asian American
                    </SelectItem>
                    <SelectItem value="East_Asian">East Asian</SelectItem>
                    <SelectItem value="South_East_Asian">
                      South East Asian
                    </SelectItem>
                    <SelectItem value="South_Asian">South Asian</SelectItem>
                    <SelectItem value="Middle_Eastern">
                      Middle Eastern
                    </SelectItem>
                    <SelectItem value="Pacific">Pacific</SelectItem>
                    <SelectItem value="Hispanic">Hispanic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Eye Color</Label>
                <Select onValueChange={(value) => setEyeColor(value)}>
                  <SelectTrigger
                    id="eyeColor"
                    name="eyeColor"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select an eye color" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Brown">Brown</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Gray">Gray</SelectItem>
                    <SelectItem value="Hazel">Hazel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Bald</Label>
                <Switch onClick={(e) => setBald(!bald)} />
              </div>
              <UploadModal onUploadDone={(url) => {
                setZipUrl(url);
              }}/>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="button" disabled={!name ||!zipUrl || !type || !age || !ethinicity || !eyeColor} onClick={TrainModal} className="w-full">
            Create Model 
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
