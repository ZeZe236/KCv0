import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LogOut,
  Home,
  Heart,
  UtensilsCrossed,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="bg-white bg-opacity-85 backdrop-blur-sm shadow-sm sticky top-0 z-50 py-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <UtensilsCrossed className="h-6 w-6 text-kitchen-orange mr-2 animate-wiggle" />
              <span className="font-pixel text-xl text-kitchen-brown">Kitchen Compass</span>
            </Link>
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  to="/"
                  className={cn(
                    "px-4 py-2 text-base font-pixel font-medium text-kitchen-brown hover:text-kitchen-orange transition-colors flex items-center gap-1 relative",
                    hovered === 'home' && "text-kitchen-orange"
                  )}
                  onMouseEnter={() => setHovered('home')}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Home className="h-4 w-4" />
                  home
                  {hovered === 'home' && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-kitchen-orange rounded-full transition-all" />
                  )}
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="px-4 py-2 text-base font-pixel font-medium text-kitchen-peach hover:text-kitchen-orange transition-colors rounded-full"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  recipes
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-60 p-4 bg-kitchen-white rounded-lg shadow-lg">
                    <div className="grid gap-3">
                      <Link
                        to="/trending-recipes"
                        className="flex p-2 hover:bg-kitchen-peach rounded-md transition-colors"
                      >
                        <div className="text-kitchen-brown font-medium">Trending Recipes</div>
                      </Link>
                      <Link
                        to="/quick-meals"
                        className="flex p-2 hover:bg-kitchen-peach rounded-md transition-colors"
                      >
                        <div className="text-kitchen-brown font-medium">Quick Meals</div>
                      </Link>
                      <Link
                        to="/seasonal-favorites"
                        className="flex p-2 hover:bg-kitchen-peach rounded-md transition-colors"
                      >
                        <div className="text-kitchen-brown font-medium">Seasonal Favorites</div>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/help"
                  className="px-4 py-2 text-base font-pixel font-medium text-kitchen-brown hover:text-kitchen-orange transition-colors flex items-center gap-1"
                >
                  <HelpCircle className="h-4 w-4" />
                  help
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex space-x-1">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/favorites"
                  className="p-2 rounded-full bg-kitchen-cream hover:bg-kitchen-peach transition-colors"
                  aria-label="Favorites"
                >
                  <Heart className="h-5 w-5 text-kitchen-orange hover:animate-bounce-light" />
                </Link>
                <Button
                  variant="ghost"
                  className="px-4 py-2 text-base font-pixel font-medium text-kitchen-brown hover:bg-kitchen-peach hover:text-kitchen-brown transition-colors rounded-full"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  logout
                </Button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 text-base font-pixel font-medium text-kitchen-brown bg-kitchen-cream hover:bg-kitchen-peach transition-colors rounded-full"
                >
                  login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 text-base font-pixel font-medium text-white bg-kitchen-orange hover:bg-orange-600 transition-colors rounded-full"
                >
                  sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="block md:hidden mt-2 border-t border-gray-100">
        <div className="flex justify-around px-2 py-1">
          <Link
            to="/"
            className="p-2 text-xs font-pixel text-kitchen-brown flex flex-col items-center"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            to="/"
            className="p-2 text-xs font-pixel text-kitchen-brown flex flex-col items-center"
          >
            <Sparkles className="h-5 w-5" />
            Recipes
          </Link>
          <Link
            to="/"
            className="p-2 text-xs font-pixel text-kitchen-brown flex flex-col items-center"
          >
            <HelpCircle className="h-5 w-5" />
            Help
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
