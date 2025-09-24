import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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

export default function CardDemo() {
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
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Type</Label>
                <Select>
                  <SelectTrigger id="type" name="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="man">Man</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Ethnicity</Label>
                <Select>
                  <SelectTrigger
                    id="ethinicity"
                    name="ethinicity"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select an ethnicity" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="asian_american">
                      Asian American
                    </SelectItem>
                    <SelectItem value="east_asian">East Asian</SelectItem>
                    <SelectItem value="south_east_asian">
                      South East Asian
                    </SelectItem>
                    <SelectItem value="south_asian">South Asian</SelectItem>
                    <SelectItem value="middle_eastern">
                      Middle Eastern
                    </SelectItem>
                    <SelectItem value="pacific">Pacific</SelectItem>
                    <SelectItem value="hispanic">Hispanic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Eye Color</Label>
                <Select>
                  <SelectTrigger
                    id="eyeColor"
                    name="eyeColor"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select an eye color" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="brown">Brown</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                    <SelectItem value="hazel">Hazel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Bald</Label>
                <Select>
                  <SelectTrigger id="bald" name="bald" className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <UploadModal />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Create Model
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
