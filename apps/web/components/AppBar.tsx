import {
  SignInButton, 
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton
} from "@clerk/nextjs";
import { Button } from "./ui/button";
export function AppBar() {
  return (
    <div className="flex justify-between p-2 border-b">
      <div className="text-xl font-bold">PhotoAI</div>
      <div className="space-x-2" >
        <SignedOut>
              <SignInButton>
              <Button className="bg-white text-black rounded-xl font-medium text-sm sm:text-base cursor-pointer hover:bg-gray-100">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-black text-white rounded-xl font-medium text-sm sm:text-base cursor-pointer">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
      </div>
    </div>
  );
}
