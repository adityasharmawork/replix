"use client";
import LoginButton from "@/components/LoginButton";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

interface HeaderProfileBtnProps {
  mobile?: boolean;
}

function HeaderProfileBtn({ mobile = false }: HeaderProfileBtnProps) {
  if (mobile) {
    return (
      <div className="flex flex-col gap-3">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-12 h-12 ring-2 ring-white/20",
              userButtonTrigger: "w-full",
              userButtonPopoverCard: "top-0",
            }
          }}
        />
        
        <div className="grid grid-cols-2 gap-2">
          <Link 
            href="/profile" 
            className="flex items-center justify-center gap-2 py-2 px-3 bg-zinc-900
              hover:bg-white/5 rounded-md border border-zinc-800 text-gray-300"
          >
            <User className="w-4 h-4 text-white" />
            <span className="text-sm">Profile</span>
          </Link>
          
          <Link 
            href="/settings" 
            className="flex items-center justify-center gap-2 py-2 px-3 bg-zinc-900
              hover:bg-white/5 rounded-md border border-zinc-800 text-gray-300"
          >
            <Settings className="w-4 h-4 text-white" />
            <span className="text-sm">Settings</span>
          </Link>
        </div>
        
        <SignedOut>
          <LoginButton fullWidth />
        </SignedOut>
      </div>
    );
  }

  return (
    <>
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: "ring-2 ring-white/20 hover:ring-white/40 transition-all",
            userButtonTrigger: "hover:scale-105 transition-transform duration-200"
          }
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
          <UserButton.Link
            label="Settings"
            labelIcon={<Settings className="size-4" />}
            href="/settings"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <LoginButton />
      </SignedOut>
    </>
  );
}
export default HeaderProfileBtn;