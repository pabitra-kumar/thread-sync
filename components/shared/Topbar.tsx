import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/logo.svg";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import logout from "../../public/assets/logout.svg";

function Topbar() {
    return (
        <nav className="topbar">
            <Link href='/' className="flex items-center gap-4">
                <Image src={logo} alt="logo" width={28} height={28} />
                <p className=" text-light-1 max-xs:hidden text-heading3-bold"> Threads </p>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src={logout} alt="logout" width={24} height={24}/>
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <OrganizationSwitcher
                appearance={{
                    elements: {
                        organizationSwitcherTrigger:
                        "py-2 px-4"
                    }
                }}
                />
            </div>
        </nav>
    )
};

export default Topbar;