import React, { useState, useEffect, useRef } from 'react';
import { X, PanelsTopLeft, Plus, Search, ChevronRight, ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
            {/* Vertical toggle panel on the left */}
            <div
                id="pantry-toggle-panel"
                className={`fixed left-0 top-0 h-full z-40 flex items-center transition-all duration-300 ${isOpen ? 'left-[320px]' : 'left-0'
                    }`}
                onClick={toggleSidebar}
            >
                <div className="h-[200px] w-8 bg-kitchen-orange rounded-r-lg flex flex-col items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors shadow-md">
                    <div className="text-white mb-2">
                        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </div>
                    <div className="vertical-text py-2">
                        PANTRY
                    </div>
                    <div className="text-white text-xs mt-2 bg-green-800 rounded-full h-6 w-6 flex items-center justify-center">
                        {pantryIngredients.length}
                    </div>
                </div>
            </div>

            {/* Overlay for closing when clicking outside */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-30 ${isOpen ? 'opacity-30' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleSidebar}
            ></div>

            {/* Pantry sidebar */}
            <aside
                id="pantry-sidebar"
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-kitchen-brown">My Pantry</h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="text-kitchen-brown hover:text-kitchen-orange"
                        >
                            <X size={20} />
                        </Button>
                    </div>

                    <div className="mb-6">
                        <div className="flex gap-2 mb-4">
                            <Input
                                placeholder="Add new ingredient..."
                                value={newIngredient}
                                onChange={(e) => setNewIngredient(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1"
                            />
                            <Button
                                onClick={handleAddIngredient}
                                size="icon"
                                className="bg-kitchen-orange hover:bg-orange-600 text-white"
                            >
                                <Plus size={18} />
                            </Button>
                        </div>
                    </div>

                    {/* Search box for filtering pantry ingredients */}
                    <div className="mb-4 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Search ingredients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium text-gray-500">Your Ingredients</h3>
                            <span className="text-xs text-gray-400">
                                {pantryIngredients.length} items
                            </span>
                        </div>
                        <div className="max-h-40 overflow-y-auto pr-2 ingredients-scrollbar">
                            <div className="flex flex-wrap gap-2">
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
                        </div>
                    </div>

                    {/* Quick suggestions - Vertically Scrollable */}
                    <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium text-gray-500">Quick Add Suggestions</h3>
                            <span className="text-xs text-gray-400">
                                {availableSuggestions.length} available
                            </span>
                        </div>

                        {/* Vertically scrollable suggestions */}
                        <div className="quick-suggestions-scroll-vertical">
                            <div className="suggestions-container-vertical">
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
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t mt-6">
                        <p className="text-sm text-gray-500">
                            Ingredients in your pantry will be used for recipe suggestions.
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default PantrySidebar;