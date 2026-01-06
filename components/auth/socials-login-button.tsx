import Image from "next/image";
import { Button } from "../ui/button";
import GoogleSVG from "@/assets/google.svg";
import FacebookSVG from "@/assets/facebook.svg";

export default function SocialsLoginButtons() {
  return (
    <>
      <Button
        variant="ghost"
        size="icon-lg"
        className="bg-white border border-gray-300 w-full h-12"
      >
        <Image src={GoogleSVG} height={24} width={24} alt="google" />
        <span>Sign In with Google</span>
      </Button>

      <Button
        variant="ghost"
        className="bg-white border border-gray-300 w-full h-12"
      >
        <Image src={FacebookSVG} height={24} width={24} alt="google" />
        <span>Sign In with Facebook</span>
      </Button>
    </>
  );
}
