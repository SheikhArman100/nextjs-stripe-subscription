import { Settings, ShoppingCart, UserRound } from "lucide-react";
import LogoutButton from "./LogoutButton.js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { Button } from "./ui/button.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.jsx";

const UserAvatar = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={user.image_url} alt={user.display_name} />
            <AvatarFallback>{user.email[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" mt-1" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className=" flex flex-col space-y-1 text-wrap">
            <p className="text-sm font-medium leading-none">
              {user.display_name}
            </p>

            <p className="text-xs leading-none text-muted-foreground ">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center justify-between">
            Profile
            <UserRound className="size-5" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between">
            Billing
            <ShoppingCart className="size-5" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between">
            Settings
            <Settings className="size-5" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0 ">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
