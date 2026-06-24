import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { Info } from "lucide-react";

export function DropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AlignJustify className="hover:text-horizon h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-60 border-2 border-yellowish rounded-sm text-3xl text-horizon p-1"
      >
        <DropdownMenuItem className="p-0 transition-none">
          <Link
            href={"/regions/all"}
            className="text-lg font-semibold py-4 px-4 hover:bg-horizon w-full hover:text-white"
          >
            Random Game
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0 transition-none">
          <Link
            href={"/regions/6_14240"}
            className="text-lg font-semibold py-4 px-4 hover:bg-horizon w-full hover:text-white"
          >
            Phoenix
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0 transition-none">
          <Link
            href={"/regions/6_11203"}
            className="text-lg font-semibold py-4 px-4 hover:bg-horizon w-full hover:text-white"
          >
            Los Angeles
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0 transition-none">
          <Link
            href={"/regions/6_8903"}
            className="text-lg font-semibold py-4 px-4 hover:bg-horizon w-full hover:text-white"
          >
            Houston
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0 transition-none">
          <Link
            href={"/regions/6_16163"}
            className="text-lg font-semibold py-4 px-4 hover:bg-horizon w-full hover:text-white"
          >
            Seattle
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0 transition-none">
          <Link
            href={"/regions/6_2942"}
            className="text-lg font-semibold py-4 px-4 hover:bg-horizon w-full hover:text-white"
          >
            Chicago
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0 transition-none">
          <Link
            href={"/regions/6_11485"}
            className="text-lg font-semibold py-4 px-4 hover:bg-horizon w-full hover:text-white"
          >
            Miami
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
