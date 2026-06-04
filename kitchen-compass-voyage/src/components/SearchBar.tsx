import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getRecipeFromGemini } from '@/config/gemini';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FilterIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SearchBarProps {
  onSearch: (query: string, recipe: any) => void;
  selectedIngredients?: string[];
}

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
  { id: 'keto', label: 'Keto' },
  { id: 'low-carb', label: 'Low-Carb' },
  { id: 'low-fat', label: 'Low-Fat' },
  { id: 'high-protein', label: 'High-Protein' },
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, selectedIngredients = [] }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);

  const handleDietaryChange = (id: string) => {
    setSelectedDietary(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const removeDietaryFilter = (filter: string) => {
    setSelectedDietary(prev => prev.filter(item => item !== filter));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Pass both ingredients and dietary preferences to Gemini
      const recipe = await getRecipeFromGemini(query, selectedIngredients, selectedDietary);
      onSearch(query, recipe);
    } catch (error) {
      console.error('Search failed:', error);
      setError('Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex items-center mb-3">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for recipes or enter ingredients..."
            className="w-full pl-4 pr-24 py-6 rounded-full bg-white bg-opacity-90 backdrop-blur-sm border-2 border-kitchen-orange focus:border-kitchen-orange focus:ring-kitchen-orange"
          />
          <div className="absolute right-16">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                >
                  <FilterIcon className="h-5 w-5 text-kitchen-brown" />
                  {selectedDietary.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-kitchen-orange rounded-full text-white text-xs flex items-center justify-center">
                      {selectedDietary.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[556px] p-6 mt-1" align="end">
                <div className="space-y-1">
                  <h4 className="font-medium text-kitchen-brown">Dietary Preferences</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {dietaryOptions.map(option => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={selectedDietary.includes(option.id)}
                          onCheckedChange={() => handleDietaryChange(option.id)}
                        />
                        <Label htmlFor={option.id} className="cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="absolute right-2 rounded-full w-10 h-10 flex items-center justify-center bg-kitchen-orange hover:bg-orange-600"
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
            ) : (
              <Search className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>

        {/* Show selected filters */}
        {(selectedDietary.length > 0 || selectedIngredients.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedDietary.map(filter => (
              <Badge
                key={filter}
                variant="secondary"
                className="pl-2 pr-1 py-1 flex items-center gap-1 bg-kitchen-tan text-kitchen-brown"
              >
                {dietaryOptions.find(opt => opt.id === filter)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 text-kitchen-brown hover:text-kitchen-orange"
                  onClick={() => removeDietaryFilter(filter)}
                >
                  ×
                </Button>
              </Badge>
            ))}
            {selectedIngredients.map(ingredient => (
              <Badge
                key={ingredient}
                variant="outline"
                className="bg-green-50 text-green-800 border-green-200"
              >
                {ingredient}
              </Badge>
            ))}
          </div>
        )}

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default SearchBar;
