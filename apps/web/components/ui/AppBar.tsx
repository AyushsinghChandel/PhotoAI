import {
  SignInButton, 
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./button";
export function AppBar() {
  return (
    <div className="flex justify-between p-2 border-b">
      <div className="text-xl">PhotoAI</div>
      <div className="space-x-2" >
        <SignedOut>
            <Button variant={"default"}>
              <SignInButton />
            </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
