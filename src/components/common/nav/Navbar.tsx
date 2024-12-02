"use client";

import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {
  const { user, loginWithGoogle, logout } = useAppContext();

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">My App</h1>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            {user.photoURL && <Image src={user.photoURL} width={50} height={50} alt="Profile" className="w-8 h-8 rounded-full" />}
            <span>{user.displayName}</span>
            <button onClick={logout} className="px-4 py-2 bg-red-600 rounded">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={loginWithGoogle} className="px-4 py-2 bg-blue-600 rounded">
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
