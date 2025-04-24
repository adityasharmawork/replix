import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

interface LoginButtonProps {
  fullWidth?: boolean;
}

const LoginButton = ({ fullWidth = false }: LoginButtonProps) => {
  return (
    <SignInButton mode="modal">
      <button
        className={`flex items-center justify-center gap-2 py-2 px-4 
          bg-white text-black hover:bg-gray-200
          rounded-md shadow-sm transition-all duration-200 
          ${fullWidth ? 'w-full' : 'hover:scale-105'}`}
      >
        <LogIn className="w-4 h-4" />
        <span className="font-medium">Login</span>
      </button>
    </SignInButton>
  );
};

export default LoginButton;