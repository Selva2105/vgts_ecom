'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PillWithNumber from "../ui/pill";
import ReusableDropdownMenu, { MenuItem } from "./NavDropdown";
import { Settings, ShoppingCart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useRouter } from "next/navigation";

export function NavigationBar() {

    const { cartLen } = useStore();
    const router = useRouter();

    const menuItems: MenuItem[] = [
        {
            type: "header",
            label: "My Account",
            headers: {
                email: "test@gmail.com",
                role: "Buyer",
                username: "User",
            },
        },
        { type: "separator" },
        {
            type: "group",
            items: [
                { label: "My Profile", link: "/profile" },
                { label: "My Orders", link: "/my-orders" },
            ],
        },
    ];


    return (
        <nav className="flex items-center h-16 px-4 border-b bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center gap-2 text-base md:text-lg font-semibold">
                <Link className="flex items-center gap-2" href="/">
                    <ShoppingCart className="w-5 h-5" />
                    <span>ShallBuy</span>
                </Link>
            </div>
            <div className="flex items-center gap-4 ml-auto">

                <Button className="w-8 h-8" size="icon" variant="ghost" onClick={() => router.push('/cart')}>
                    <PillWithNumber productCount={cartLen}>
                        <ShoppingCart className="w-5 h-5" />
                        <span className="sr-only">Toggle cart</span>
                    </PillWithNumber>
                </Button>

                <ReusableDropdownMenu
                    triggerContent={
                        <Button size="sm" variant="outline">
                            <Settings className="w-5 h-5" />
                            <span className="sr-only">Profile</span>
                        </Button>
                    }
                    menuItems={menuItems}
                />
            </div>
        </nav>
    );
}
