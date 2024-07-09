import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="size-12 relative shrink-0">
        <Image
          src="/logo.svg"
          alt="Logo"
          fill
          className="shrink-0 hover:opacity-80 transition"
        />
      </div>
    </Link>
  );
};
