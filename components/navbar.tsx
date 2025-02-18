import { auth, signIn, signOut } from "@/auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();
  const initial = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");
  console.log(session);
  return (
    <nav className="flex justify-end p-4">
      {!session?.user ? (
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
          className="inline "
        >
          <button className="mx-3 mb-6 border border-black bg-black py-3 px-12 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black lg:mb-0 lg:px-8">
            Sign in
          </button>
        </form>
      ) : (
        <>
          <Avatar className="rounded-full">
            {session?.user?.image && <AvatarImage src={session?.user?.image} />}
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          <form
            action={async () => {
              "use server";
              await signOut()
            }}
            className="inline "
          >
            <button className="mx-3 mb-6 border border-black bg-black py-3 px-12 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black lg:mb-0 lg:px-8">
              Sign out
            </button>
          </form>
        </>
      )}
    </nav>
  );
};

export default Navbar;
