import Link from "next/link";
import Avatar from "./Avatar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header className="bg-white shadow-sm text-gray-800 flex justify-between p-5">
      <Link href="/" className="felx items-center text-4xl font-thin">
        <Avatar seed="AIris Custom Agent" />
        <div className="space-y-1">
          <h1>AIris</h1>
          <h2 className="text-sm">Built to Think, Designed to Sync.</h2>
        </div>
      </Link>

      <div className="flex items-center">
        <SignedIn>
            <UserButton showName />
        </SignedIn>

        <SignedOut>
            <SignInButton/>
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
