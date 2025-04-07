import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ShareButton from '@/components/ShareButton';

interface Ingredient {
  name: string;
  amount: string;
}

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

interface RecipeCardProps {
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookTime: string;
  servings: number;
  tags: string[];
  nutrition?: Nutrition;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  description,
  ingredients,
  instructions,
  cookTime,
  servings,
  tags,
  nutrition = {
    calories: 350,
    protein: 15,
    carbs: 40,
    fat: 12,
    fiber: 5,
    sugar: 8
  }
}) => {
  const [activeTab, setActiveTab] = useState("recipe");

  const nutritionData = [
    { name: 'Protein', value: nutrition.protein, color: '#4CAF50' },
    { name: 'Carbs', value: nutrition.carbs, color: '#FF9800' },
    { name: 'Fat', value: nutrition.fat, color: '#E91E63' },
  ];

  return (
    <Card className="w-full shadow-lg bg-white bg-opacity-95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-kitchen-brown">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-kitchen-tan text-kitchen-brown">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mx-6 mb-2">
          <TabsTrigger value="recipe" className="flex-1">Recipe</TabsTrigger>
          <TabsTrigger value="nutrition" className="flex-1">Nutrition</TabsTrigger>
        </TabsList>

        <TabsContent value="recipe">
          <CardContent className="grid gap-4">
            <div>
              <div className="font-medium text-kitchen-brown mb-2">Details</div>
              <div className="flex justify-start space-x-4 text-sm">
                <div>🕒 {cookTime}</div>
                <div>👥 Serves {servings}</div>
              </div>
            </div>

            <div>
              <div className="font-medium text-kitchen-brown mb-2">Ingredients</div>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.amount} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-medium text-kitchen-brown mb-2">Instructions</div>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                {instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="nutrition">
          <CardContent className="grid gap-4">
            <div className="font-medium text-kitchen-brown mb-2">Nutrition Information</div>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nutritionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}g`}
                    >
                      {nutritionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full md:w-1/2 space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Calories</span>
                  <span>{nutrition.calories} kcal</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Protein</span>
                  <span>{nutrition.protein}g</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Carbohydrates</span>
                  <span>{nutrition.carbs}g</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Fat</span>
                  <span>{nutrition.fat}g</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Fiber</span>
                  <span>{nutrition.fiber}g</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="font-medium">Sugar</span>
                  <span>{nutrition.sugar}g</span>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>

      <CardFooter className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          Recipe generated by Kitchen Compass AI
        </p>
        <ShareButton recipe={{ title, description, ingredients, instructions, cookTime, servings, tags, nutrition }} />
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
