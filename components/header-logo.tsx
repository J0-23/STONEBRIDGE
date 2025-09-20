import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="/logo2.png" alt="Logo" height={68} width={68} />
        <p className="font-semibold text-white text-2xl ml-2.5">Stone Bridge</p>
      </div>
    </Link>
  );
};
