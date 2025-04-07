
import React from 'react';

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
  const displayRecipes = recipes.slice(0, 6); // Only show max 6 recipes on the wheel
  
  while (displayRecipes.length < 6) {
    displayRecipes.push({ id: `empty-${displayRecipes.length}`, title: '' });
  }
  
  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full relative">
        <div className="wheel-container relative w-72 h-72 mx-auto">
          {displayRecipes.map((recipe, index) => (
            <div 
              key={recipe.id} 
              className={`wheel-segment wheel-segment-${index + 1} cursor-pointer`}
              onClick={() => recipe.title && onSelectRecipe(recipe)}
            >
              {recipe.title && (
                <div className="wheel-segment-content">
                  <div className="wheel-segment-text">
                    {recipe.title}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeWheel;
