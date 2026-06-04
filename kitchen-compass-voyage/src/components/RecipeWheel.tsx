import React, { useState } from 'react';
import { ChevronUp, ChevronDown, CookingPot } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  image?: string;
}

interface RecipeWheelProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeWheel: React.FC<RecipeWheelProps> = ({ recipes, onSelectRecipe }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Ensure we have at least 6 recipes
  const displayRecipes = recipes.slice(0, 6);
  while (displayRecipes.length < 6) {
    displayRecipes.push({ id: `empty-${displayRecipes.length}`, title: '' });
  }

  const navigateUp = () => {
    setActiveIndex((prev) => (prev === 0 ? displayRecipes.length - 1 : prev - 1));
  };

  const navigateDown = () => {
    setActiveIndex((prev) => (prev === displayRecipes.length - 1 ? 0 : prev + 1));
  };

  const selectRecipe = (recipe: Recipe) => {
    if (recipe.title) {
      onSelectRecipe(recipe);
    }
  };

  // Colors for cards
  const cardColors = [
    'from-kitchen-brown to-kitchen-peach',
    'from-kitchen-tan to-kitchen-brown',
    'from-kitchen-brown to-kitchen-peach',
    'from-kitchen-tan to-kitchen-brown',
    'from-kitchen-brown to-kitchen-peach',
    'from-kitchen-tan to-kitchen-brown',
  ];

  return (
    <div className="bg-white bg-opacity-90 rounded-xl p-4 shadow-lg border border-kitchen-brown/20">
      <div className="flex flex-col items-center">
        {/* Title and navigation */}
        <div className="flex justify-between items-center w-full mb-3">
          <button
            className="w-10 h-10 rounded-full bg-kitchen-brown flex items-center justify-center shadow-md hover:bg-kitchen-orange transition-colors"
            onClick={navigateUp}
          >
            <ChevronUp className="h-6 w-6 text-white" />
          </button>

          <div className="flex items-center justify-center gap-2">
            <CookingPot className="h-5 w-5 text-kitchen-orange" />
            <span className="font-pixel text-kitchen-brown text-lg">Recipes</span>
          </div>

          <button
            className="w-10 h-10 rounded-full bg-kitchen-brown flex items-center justify-center shadow-md hover:bg-kitchen-orange transition-colors"
            onClick={navigateDown}
          >
            <ChevronDown className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Recipe cards carousel */}
        <div className="relative w-full h-72 overflow-hidden rounded-lg">
          {displayRecipes.map((recipe, index) => {
            // Calculate position: active center, above, or below
            const position = (index - activeIndex + displayRecipes.length) % displayRecipes.length;
            let transform = '';
            let opacity = '0';
            let scale = '0.8';
            let zIndex = '0';

            if (position === 0) {
              // Active card
              transform = 'translateY(0)';
              opacity = '1';
              scale = '1';
              zIndex = '30';
            } else if (position === 1 || position === displayRecipes.length - 1) {
              // Cards directly above or below
              transform = position === 1 ? 'translateY(85%)' : 'translateY(-85%)';
              opacity = '0.7';
              zIndex = '20';
            } else if (position === 2 || position === displayRecipes.length - 2) {
              // Cards two positions away
              transform = position === 2 ? 'translateY(150%)' : 'translateY(-150%)';
              opacity = '0.4';
              zIndex = '10';
            }

            return recipe.title ? (
              <div
                key={recipe.id}
                className={`absolute w-full h-44 transition-all duration-300 ease-in-out cursor-pointer
                  bg-gradient-to-br ${cardColors[index % cardColors.length]} rounded-xl p-4 shadow-md`}
                style={{
                  transform,
                  opacity,
                  scale,
                  zIndex
                }}
                onClick={() => selectRecipe(recipe)}
              >
                <div className="h-full flex flex-col justify-between">
                  <h3 className="text-white font-bold text-lg">{recipe.title}</h3>
                  <div className="mt-auto">
                    <span className="text-xs text-white bg-black bg-opacity-30 px-2 py-1 rounded-full">
                      Click to view recipe
                    </span>
                  </div>
                </div>
              </div>
            ) : null;
          })}
        </div>

        {/* Current position indicator */}
        <div className="flex gap-1 mt-3">
          {displayRecipes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-kitchen-orange' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeWheel;
