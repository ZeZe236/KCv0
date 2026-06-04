import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
//import Pantry from '@/components/Pantry';
import RecipeCard from '@/components/RecipeCard';
import Navbar from '@/components/Navbar';
import AuthPrompt from '@/components/AuthPrompt';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ChefHat, Sparkles, UtensilsCrossed, Lock } from 'lucide-react';
import PantrySidebar from '@/components/PantrySidebar';
import RecipeWheel from '@/components/RecipeWheel';

const Index: React.FC = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState<boolean>(false);
  const [pantryIngredients, setPantryIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');

  // Sample recipes for demo
  const [recipes, setRecipes] = useState([
    { id: '1', title: 'Pasta Carbonara' },
    { id: '2', title: 'Chicken Stir Fry' },
    { id: '3', title: 'Vegetable Curry' },
    { id: '4', title: 'Beef Tacos' },
    { id: '5', title: 'Berry Smoothie' },
    { id: '6', title: 'Grilled Salmon' }
  ]);

  // Demo recipe data
  const sampleRecipe = {
    title: "Creamy Garlic Pasta",
    description: "A delicious, quick pasta dish with a creamy garlic sauce.",
    ingredients: [
      { name: "pasta", amount: "8 oz" },
      { name: "garlic", amount: "4 cloves" },
      { name: "butter", amount: "2 tbsp" },
      { name: "heavy cream", amount: "1 cup" },
      { name: "parmesan cheese", amount: "1/2 cup" },
      { name: "salt", amount: "to taste" },
      { name: "black pepper", amount: "to taste" },
      { name: "parsley", amount: "2 tbsp, chopped" }
    ],
    instructions: [
      "Cook pasta according to package directions.",
      "In a large skillet, melt butter over medium heat.",
      "Add minced garlic and sauté for 1-2 minutes until fragrant.",
      "Pour in heavy cream and bring to a simmer.",
      "Stir in parmesan cheese until melted and sauce is smooth.",
      "Season with salt and pepper to taste.",
      "Drain pasta and add to the sauce, tossing to coat.",
      "Garnish with chopped parsley before serving."
    ],
    cookTime: "20 minutes",
    servings: 4,
    tags: ["Pasta", "Quick", "Vegetarian"]
  };

  const handleSearch = async (query: string, recipe: any) => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }

    setSearchQuery(query);
    setSelectedRecipe(recipe);

    toast({
      title: "Recipe generated",
      description: `Generated recipe for: ${recipe.title}`,
    });
  };

  const handleIngredientsChange = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);

    if (ingredients.length > 0 && !isAuthenticated) {
      setShowAuthPrompt(true);
    }
  };

  const handleSelectRecipe = (recipe: any) => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }

    // In a real app, you would fetch the recipe details
    setSelectedRecipe(sampleRecipe);
    toast({
      title: "Recipe selected",
      description: `You selected: ${recipe.title}`,
    });
  };

  const addToPantry = (ingredient: string) => {
    if (!pantryIngredients.includes(ingredient)) {
      setPantryIngredients([...pantryIngredients, ingredient]);
    }
  };

  const removeFromPantry = (ingredient: string) => {
    setPantryIngredients(pantryIngredients.filter(item => item !== ingredient));
  };

  return (
    <div className="min-h-screen w-full bg-kitchen-brown bg-opacity-95 relative">
      <div className="absolute inset-0 bg-kitchen-brown bg-opacity-95 bg-food-pattern bg-cover bg-center opacity-40"></div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />

        {/* Added backdrop below navbar */}
        <div className="bg-kitchen-brown bg-[url('/images/kitchen-bg.jpg')] bg-opacity-70 backdrop-blur-sm pb-1 bg-cover bg-center">
          <div className="pt-8 pb-10 text-center">
            <div className="flex justify-center mb-2">
              <UtensilsCrossed className="h-10 w-10 text-kitchen-orange animate-wiggle" />
            </div>
            <h1 className="text-6xl font-pixel text-white mb-2 animate-float">Kitchen Compass</h1>
            <p className="text-xl text-kitchen-cream flex mb-10 items-center justify-center gap-2">
              Navigate your way to
              <span className="relative">
                <span className="text-kitchen-orange font-semibold">delicious</span>
                <Sparkles className="absolute -top-2 -right-4 h-4 w-4 text-kitchen-orange animate-pulse" />
              </span>
              meals with AI
            </p>

            <div className="mt-8 relative">
              <div className="absolute -top-7 right-1/4 text-kitchen-cream text-sm transform rotate-2 hidden md:block">
                {/*<span className="bg-kitchen-orange px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
                  <ChefHat className="h-4 w-4" />
                  AI-powered recipe suggestions!
                </span> */}
              </div>
              <SearchBar onSearch={handleSearch} selectedIngredients={pantryIngredients} />
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 pl-15 lg:pl-23">
          <div className="max-w-4x1 mx-auto px-4 sm:px-6 lg:px-8">
            {isAuthenticated ? (
              // Always show recipe wheel for authenticated users
              <div className="flex flex-row justify-between gap-8">
                <div className="text-left flex-2 mt-5 ml-5 w-[800px] bg-white bg-opacity-75 rounded-xl p-7 shadow-lg">
                  <div>
                    <RecipeCard
                      title={selectedRecipe ? selectedRecipe.title : sampleRecipe.title}
                      description={selectedRecipe ? selectedRecipe.description : sampleRecipe.description}
                      ingredients={selectedRecipe ? selectedRecipe.ingredients : sampleRecipe.ingredients}
                      instructions={selectedRecipe ? selectedRecipe.instructions : sampleRecipe.instructions}
                      cookTime={selectedRecipe ? selectedRecipe.cookTime : sampleRecipe.cookTime}
                      servings={selectedRecipe ? selectedRecipe.servings : sampleRecipe.servings}
                      tags={selectedRecipe ? selectedRecipe.tags : sampleRecipe.tags}
                    />
                  </div>
                </div>

                {/* Recipe Wheel for authenticated users - always visible */}
                <div className="w-72 flex-shrink-0">
                  <h3 className="text-xl font-pixel text-kitchen-orange mb-4 text-center">Recipe Ideas</h3>
                  <RecipeWheel
                    recipes={recipes}
                    onSelectRecipe={handleSelectRecipe}
                  />
                </div>
              </div>
            ) : (
              // Show locked/blurred version for non-authenticated users
              <div className="text-center mt-10 pl-10 mr-15 ml-10 bg-white bg-opacity-75 rounded-xl p-8 shadow-lg relative">
                {/* Sample blurred recipe card shown before login */}
                <div className="blur-md opacity-70 pointer-events-none mb-8">
                  <RecipeCard
                    title={sampleRecipe.title}
                    description={sampleRecipe.description}
                    ingredients={sampleRecipe.ingredients}
                    instructions={sampleRecipe.instructions}
                    cookTime={sampleRecipe.cookTime}
                    servings={sampleRecipe.servings}
                    tags={sampleRecipe.tags}
                  />
                </div>

                {/* Unlock overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 rounded-xl">
                  <Lock className="h-12 w-12 text-kitchen-cream mb-3" />
                  <h2 className="text-2xl font-pixel text-white mb-2">Unlock Recipe Generator</h2>
                  <p className="text-kitchen-cream mb-6 max-w-md">Sign up or log in to generate personalized recipes based on your ingredients!</p>
                  <Button
                    className="bg-kitchen-orange hover:bg-kitchen-orange/90 text-white"
                    onClick={() => setShowAuthPrompt(true)}
                  >
                    Sign Up to Unlock
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <PantrySidebar
        pantryIngredients={pantryIngredients}
        addToPantry={addToPantry}
        removeFromPantry={removeFromPantry}
      />

      <AuthPrompt
        isOpen={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
      />
    </div>
  );
};

export default Index;
