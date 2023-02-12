import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown";

const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    // put in the right place
    <div>
      <div className="mb-6 flex w-[100%] max-w-[1000px] flex-row items-center justify-between">
        <h1 className="flex-1 font-sans text-xl font-extrabold text-white">
          hey, {sessionData?.user?.name} 👋
        </h1>
        <div>
          {sessionData ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={sessionData.user?.image || ""} />
                  <AvatarFallback>{sessionData.user?.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => void signOut()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => void signIn()}>Log In</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
