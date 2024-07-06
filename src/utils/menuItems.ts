import { MenuItem } from "@/components/navigation-ui/NavDropdown";

export const menuItems: MenuItem[] = [
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