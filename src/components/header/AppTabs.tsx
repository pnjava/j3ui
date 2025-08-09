import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppTabs = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-none h-12 border-b-4 border-[#00689A]">DAP Records</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[240px] p-2">
              <li>
                <Button variant="outline" className="border-none w-full justify-start">
                  <Search /> Search DAP records
                </Button>
              </li>
              <li>
                <Button variant="outline" className="border-none w-full justify-start">
                  <Search /> Search Census Records
                </Button>
              </li>
              <li>
                <Button variant="outline" className="border-none w-full justify-start">
                  <User /> Create Individual
                </Button>
              </li>
            </ul>

          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AppTabs;
