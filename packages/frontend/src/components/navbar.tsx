import { FC, PropsWithChildren } from "react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, navigationMenuTriggerStyle } from "./ui/navigation-menu"
import { Logo } from "./logo"
import Link from "next/link"
import { Separator } from "./ui/separator"

const NavItem: FC<PropsWithChildren<{ href: string }>> = ({ href, children }) => {
    return (
        <NavigationMenuItem>
            <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {children}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    )
}

export const Navbar: FC = () => {
    return (
        <NavigationMenu className="p-2 flex gap-1 h-10 items-center flex-none">
            <Logo height={30} width={150} />
            <Separator orientation="vertical" />
            <NavigationMenuList>
                <NavItem href="/">
                    Home
                </NavItem>
                <NavItem href="/leaderboard">
                    Leaderboard
                </NavItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
