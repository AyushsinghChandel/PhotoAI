import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/dist/client/link";

export default function Hero() {
  return (
    <div className="flex justify-center ">
      <div className="max-w-xl">
        <h1 className="text-2xl text-center p-4 text-bold">
          Generate Stunning Images with AI
        </h1>
        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-1/3">
              <img
                className="w-full h-64 object-cover rounded-lg"
                src="https://sm.mashable.com/t/mashable_in/article/g/google-gem/google-gemini-now-lets-you-create-ai-generated-images-of-peo_zgh3.2496.jpg"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <img
                className="w-full h-64 object-cover rounded-lg"
                src="https://cdn.goenhance.ai/user/2024/07/19/c0c1400b-abc2-4541-a849-a7e4f361d28d_0.jpg"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <img
                className="w-full h-64 object-cover rounded-lg"
                src="https://scontent.fpnq13-1.fna.fbcdn.net/v/t39.30808-6/559047515_24616033781351651_5783253331477741033_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=cUfFjqLuQgEQ7kNvwF8cfFA&_nc_oc=Adl4TQDf6D1T3QoqioIL4c3CBmgGCVJXKwvbfQi-N8xT6CHNNDjI5zRf-SU8kiyTNHueLa6Bo-PhOvrERdvDwWRr&_nc_zt=23&_nc_ht=scontent.fpnq13-1.fna&_nc_gid=HR1k7xVAcMEvh9GgSdMF8g&oh=00_AfgqQtCYuNtH3ebLuiKsWIVclJUpr5qw64kHZ3gAJcosNw&oe=6927EA12"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <img
                className="w-full h-64 object-cover rounded-lg"
                src="https://sm.mashable.com/t/mashable_in/article/g/google-gem/google-gemini-now-lets-you-create-ai-generated-images-of-peo_zgh3.2496.jpg"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <img
                className="w-full h-64 object-cover rounded-lg"
                src="https://cdn.goenhance.ai/user/2024/07/19/c0c1400b-abc2-4541-a849-a7e4f361d28d_0.jpg"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <img
                className="w-full h-64 object-cover rounded-lg"
                src="https://scontent.fpnq13-1.fna.fbcdn.net/v/t39.30808-6/559047515_24616033781351651_5783253331477741033_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=cUfFjqLuQgEQ7kNvwF8cfFA&_nc_oc=Adl4TQDf6D1T3QoqioIL4c3CBmgGCVJXKwvbfQi-N8xT6CHNNDjI5zRf-SU8kiyTNHueLa6Bo-PhOvrERdvDwWRr&_nc_zt=23&_nc_ht=scontent.fpnq13-1.fna&_nc_gid=HR1k7xVAcMEvh9GgSdMF8g&oh=00_AfgqQtCYuNtH3ebLuiKsWIVclJUpr5qw64kHZ3gAJcosNw&oe=6927EA12"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <img
                className="w-full h-64 object-cover rounded-lg"
                src="https://sm.mashable.com/t/mashable_in/article/g/google-gem/google-gemini-now-lets-you-create-ai-generated-images-of-peo_zgh3.2496.jpg"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <img
                className="w-full h-64 object-cover rounded-lg"
                src="https://cdn.goenhance.ai/user/2024/07/19/c0c1400b-abc2-4541-a849-a7e4f361d28d_0.jpg"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <img
                className="w-full h-64 object-cover rounded-lg"
                src="https://scontent.fpnq13-1.fna.fbcdn.net/v/t39.30808-6/559047515_24616033781351651_5783253331477741033_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=cUfFjqLuQgEQ7kNvwF8cfFA&_nc_oc=Adl4TQDf6D1T3QoqioIL4c3CBmgGCVJXKwvbfQi-N8xT6CHNNDjI5zRf-SU8kiyTNHueLa6Bo-PhOvrERdvDwWRr&_nc_zt=23&_nc_ht=scontent.fpnq13-1.fna&_nc_gid=HR1k7xVAcMEvh9GgSdMF8g&oh=00_AfgqQtCYuNtH3ebLuiKsWIVclJUpr5qw64kHZ3gAJcosNw&oe=6927EA12"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex justify-center gap-4 mt-8">
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" variant="default">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="lg" variant="outline">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg" className="w-full px-8">
                Go to Dashboard
              </Button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
