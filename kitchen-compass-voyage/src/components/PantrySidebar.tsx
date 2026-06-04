import React, { useState, useEffect, useRef } from 'react';
import { X, PanelsTopLeft, Plus, Search, ChevronRight, ChevronLeft, ArrowLeft, ArrowRight, ShoppingBasket } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PantrySidebarProps {
    pantryIngredients: string[];
    addToPantry: (ingredient: string) => void;
    removeFromPantry: (ingredient: string) => void;
}

// More comprehensive list of common ingredients
const QUICK_ADD_SUGGESTIONS = [
    // Proteins
    'Chicken', 'Beef', 'Pork', 'Salmon', 'Tuna', 'Shrimp', 'Tofu', 'Eggs', 'Bacon', 'Turkey',
    // Dairy
    'Milk', 'Butter', 'Cheese', 'Cream', 'Yogurt', 'Sour Cream', 'Cream Cheese',
    // Grains
    'Rice', 'Pasta', 'Bread', 'Quinoa', 'Oats', 'Flour', 'Tortillas', 'Noodles',
    // Vegetables
    'Onion', 'Garlic', 'Tomato', 'Potato', 'Carrot', 'Broccoli', 'Spinach', 'Bell Pepper',
    'Corn', 'Lettuce', 'Cucumber', 'Zucchini', 'Mushroom', 'Sweet Potato', 'Cabbage',
    // Fruits
    'Apple', 'Banana', 'Orange', 'Lemon', 'Lime', 'Avocado', 'Strawberry', 'Blueberry',
    'Mango', 'Pineapple', 'Grape', 'Watermelon',
    // Herbs & Spices
    'Basil', 'Cilantro', 'Parsley', 'Thyme', 'Rosemary', 'Cinnamon', 'Cumin', 'Paprika',
    'Chili Powder', 'Ginger', 'Oregano', 'Turmeric', 'Pepper', 'Salt',
    // Condiments
    'Ketchup', 'Mustard', 'Mayonnaise', 'Soy Sauce', 'Hot Sauce', 'Vinegar', 'Olive Oil',
    'Honey', 'Maple Syrup', 'Peanut Butter', 'Jam',
    // Canned Goods
    'Beans', 'Lentils', 'Chickpeas', 'Tomato Sauce', 'Coconut Milk', 'Broth',
    // Nuts & Seeds
    'Almonds', 'Walnuts', 'Cashews', 'Chia Seeds', 'Flax Seeds', 'Sesame Seeds',
    // Baking
    'Sugar', 'Brown Sugar', 'Baking Powder', 'Baking Soda', 'Vanilla Extract', 'Chocolate Chips'
];

const PantrySidebar: React.FC<PantrySidebarProps> = ({
    pantryIngredients,
    addToPantry,
    removeFromPantry,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredIngredients, setFilteredIngredients] = useState<string[]>(pantryIngredients);
    const suggestionsScrollRef = useRef<HTMLDivElement>(null);

    // State for suggestion categories
    const [activeSuggestionCategory, setActiveSuggestionCategory] = useState<string>('All');

    // Filter suggestions that are not already in pantry
    const availableSuggestions = QUICK_ADD_SUGGESTIONS.filter(
        suggestion => !pantryIngredients.includes(suggestion)
    );

    // Update filtered ingredients when pantry changes or search term changes
    useEffect(() => {
        if (searchTerm) {
            setFilteredIngredients(
                pantryIngredients.filter(ingredient =>
                    ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredIngredients(pantryIngredients);
        }
    }, [pantryIngredients, searchTerm]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleAddIngredient = () => {
        if (newIngredient.trim()) {
            addToPantry(newIngredient.trim());
            setNewIngredient('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddIngredient();
        }
    };

    // Scroll suggestions horizontally
    const scrollSuggestions = (direction: 'left' | 'right') => {
        if (suggestionsScrollRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            suggestionsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Toggle button for pantry sidebar - positioned to extend full height from below navbar */}
            <button
                onClick={toggleSidebar}
                className="fixed top-16 left-0 bottom-0 z-20 bg-kitchen-orange text-kitchen-cream p-2 rounded-r-lg flex items-center shadow-lg h-auto"
                aria-label="Toggle pantry"
            >
                {isOpen ? <ChevronLeft className="h-6 w-6" /> : (
                    <div className="flex flex-col items-center gap-2">
                        <ShoppingBasket className="h-6 w-6" />
                        <div className="vertical-text font-pixel">MY PANTRY</div>
                    </div>
                )}
            </button>

            {/* Pantry sidebar */}
            <div
                className={`fixed top-16 left-0 bottom-0 w-80 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-4 bg-kitchen-cream border-b flex justify-between items-center">
                        <h2 className="text-xl font-pixel text-kitchen-brown flex items-center gap-2">
                            <ShoppingBasket className="h-5 w-5" />
                            My Pantry
                        </h2>
                        <Button size="sm" variant="ghost" onClick={toggleSidebar} className="h-8 w-8 p-0">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Add ingredient input */}
                    <div className="p-4 border-b">
                        <p className="text-sm text-kitchen-brown mb-2">Add ingredients you have on hand:</p>
                        <div className="flex space-x-2 ">
                            <Input
                                value={newIngredient}
                                onChange={(e) => setNewIngredient(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type an ingredient..."
                                className="flex-1"
                            />
                            <Button onClick={handleAddIngredient} size="sm" className="bg-kitchen-orange hover:bg-kitchen-orange/90">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Current pantry ingredients */}
                    <div className="p-4 border-b flex-1 overflow-auto">
                        <h3 className="text-sm font-medium text-kitchen-brown mb-2">My Ingredients</h3>
                        {pantryIngredients.length === 0 ? (
                            <p className="text-sm text-muted-foreground italic">No ingredients added yet.</p>
                        ) : (
                            <div className="flex flex-wrap gap-1">
                                {filteredIngredients.length > 0 ? (
                                    filteredIngredients.map(ingredient => (
                                        <Badge
                                            key={ingredient}
                                            variant="outline"
                                            className="pl-2 pr-1 py-1 flex items-center gap-1 bg-green-50 text-green-800 ingredient-pop-in"
                                        >
                                            {ingredient}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-4 w-4 p-0 ml-1 text-green-800 hover:text-red-500"
                                                onClick={() => removeFromPantry(ingredient)}
                                            >
                                                ×
                                            </Button>
                                        </Badge>
                                    ))
                                ) : searchTerm ? (
                                    <p className="text-sm text-gray-400">No matching ingredients found</p>
                                ) : (
                                    <p className="text-sm text-gray-400">No ingredients added yet</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Common ingredients suggestions */}
                    <div className="p-4">
                        <h3 className="text-sm font-medium text-kitchen-brown mb-2">Common Ingredients</h3>
                        <ScrollArea className="h-40">
                            <div className="flex flex-wrap gap-1">
                                {availableSuggestions.length > 0 ? (
                                    availableSuggestions.map(suggestion => (
                                        <Badge
                                            key={suggestion}
                                            variant="outline"
                                            className="suggestion-badge cursor-pointer bg-gray-50 hover:bg-green-50 transition-colors"
                                            onClick={() => addToPantry(suggestion)}
                                        >
                                            + {suggestion}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        All common ingredients are already in your pantry!
                                    </p>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>

            {/* Overlay when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={toggleSidebar}
                />
            )}

            <style jsx>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                    transform: rotate(0deg);
                }
            `}</style>
        </>
    );
};

export default PantrySidebar;