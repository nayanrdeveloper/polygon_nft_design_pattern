import Image from "next/image";
import Link from "next/link";
import React from "react";

function NavLogo() {
  return (
    <Link href="/">
      <div className="flex space-x-2 cursor-pointer">
        <Image width={120} height={30} src="/logo-no-background.png" alt="logo" />
      </div>
    </Link>
  );
}

export default NavLogo;
