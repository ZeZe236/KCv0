/*
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface PantryProps {
  onIngredientsChange: (ingredients: string[]) => void;
}

const Pantry: React.FC<PantryProps> = ({ onIngredientsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  
  const togglePantry = () => {
    setIsOpen(!isOpen);
  };
  
  const ingredientCategories = {
    'Proteins': ['Chicken', 'Beef', 'Pork', 'Tofu', 'Eggs', 'Fish', 'Lentils', 'Beans'],
    'Vegetables': ['Tomatoes', 'Onions', 'Peppers', 'Carrots', 'Broccoli', 'Spinach', 'Garlic', 'Potatoes'],
    'Grains': ['Rice', 'Pasta', 'Quinoa', 'Oats', 'Bread', 'Tortillas', 'Barley'],
    'Dairy': ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream'],
    'Fruits': ['Apples', 'Bananas', 'Berries', 'Citrus', 'Peaches', 'Mangoes'],
    'Spices': ['Salt', 'Pepper', 'Cumin', 'Paprika', 'Cinnamon', 'Oregano', 'Basil', 'Thyme'],
    'Oils': ['Olive Oil', 'Vegetable Oil', 'Sesame Oil', 'Coconut Oil'],
    'Other': ['Nuts', 'Seeds', 'Honey', 'Maple Syrup', 'Vinegar', 'Soy Sauce', 'Hot Sauce']
  };
  
  const toggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      const newIngredients = selectedIngredients.filter(i => i !== ingredient);
      setSelectedIngredients(newIngredients);
      onIngredientsChange(newIngredients);
    } else {
      const newIngredients = [...selectedIngredients, ingredient];
      setSelectedIngredients(newIngredients);
      onIngredientsChange(newIngredients);
    }
  };
  
  // For smaller screens, use a Sheet component
  const renderMobileView = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed left-2 top-20 md:hidden z-20 bg-kitchen-cream text-kitchen-brown"
        >
          <ChevronRight className="h-4 w-4 mr-1" />
          Pantry
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] sm:w-[385px] bg-white p-0">
        <div className="h-full bg-white flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-medium text-kitchen-brown">Your Pantry</h3>
            <XCircle className="h-5 w-5 text-kitchen-brown cursor-pointer" />
          </div>
          <ScrollArea className="flex-1 p-4">
            {Object.entries(ingredientCategories).map(([category, ingredients]) => (
              <div key={category} className="mb-4">
                <h4 className="text-sm font-bold mb-2 text-kitchen-brown">{category}</h4>
                <div className="flex flex-wrap">
                  {ingredients.map(ingredient => (
                    <div
                      key={ingredient}
                      className={`pantry-bubble ${selectedIngredients.includes(ingredient) ? 'active' : ''}`}
                      onClick={() => toggleIngredient(ingredient)}
                    >
                      {ingredient}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
  
  // For desktop view
  const renderDesktopView = () => (
    <div className={`fixed left-0 top-0 h-full z-10 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-10'} hidden md:block`}>
      <div className="h-full bg-white bg-opacity-95 backdrop-blur-sm shadow-lg flex flex-col">
        {isOpen ? (
          <>
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-medium text-kitchen-brown">Your Pantry</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={togglePantry} 
                className="p-1 hover:bg-kitchen-peach rounded-full"
              >
                <ChevronLeft className="h-5 w-5 text-kitchen-brown" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-4">
              {Object.entries(ingredientCategories).map(([category, ingredients]) => (
                <div key={category} className="mb-4">
                  <h4 className="text-sm font-bold mb-2 text-kitchen-brown">{category}</h4>
                  <div className="flex flex-wrap">
                    {ingredients.map(ingredient => (
                      <div
                        key={ingredient}
                        className={`pantry-bubble ${selectedIngredients.includes(ingredient) ? 'active' : ''}`}
                        onClick={() => toggleIngredient(ingredient)}
                      >
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </>
        ) : (
          <Button 
            variant="ghost" 
            onClick={togglePantry} 
            className="h-full w-full rounded-none flex items-center justify-center bg-kitchen-tan bg-opacity-80 hover:bg-kitchen-peach transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-kitchen-brown" />
          </Button>
        )}
      </div>
    </div>
  );
  
  return (
    <>
      {renderMobileView()}
      {renderDesktopView()}
    </>
  );
};

export default Pantry;
*/