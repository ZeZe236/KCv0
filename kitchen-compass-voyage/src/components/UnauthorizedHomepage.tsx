import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LockIcon, ChefHat } from 'lucide-react';
import AuthPrompt from './AuthPrompt';

const UnauthorizedHomepage: React.FC = () => {
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    return (
        <div className="container mx-auto py-8 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
            {/* Blurred Recipe Card Background */}
            <div className="relative w-full max-w-3xl mx-auto">
                {/* Blurred Recipe Card */}
                <div className="filter blur-[6px] pointer-events-none">
                    <Card className="shadow-lg border-2 border-kitchen-cream">
                        <CardHeader className="bg-kitchen-cream/50">
                            <CardTitle className="font-pixel text-xl text-kitchen-brown">Tasty Homemade Pasta</CardTitle>
                            <CardDescription>Made with your pantry ingredients</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="font-medium text-kitchen-brown">Ingredients</h3>
                                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                        <li>2 cups all-purpose flour</li>
                                        <li>3 large eggs</li>
                                        <li>1 tsp salt</li>
                                        <li>1 tbsp olive oil</li>
                                        <li>Water, as needed</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-medium text-kitchen-brown">Instructions</h3>
                                    <ol className="list-decimal pl-5 text-muted-foreground space-y-1">
                                        <li>Mix flour and salt in a bowl</li>
                                        <li>Create a well in the center</li>
                                        <li>Add eggs and olive oil to the well</li>
                                        <li>Gradually mix together until dough forms</li>
                                        <li>Knead dough for 10 minutes until smooth</li>
                                    </ol>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">Serves 4 • Ready in 45 minutes</p>
                            <Button className="bg-kitchen-orange hover:bg-kitchen-orange/90">
                                View Recipe
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Unlock Recipe Generator Card - Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Card className="w-full max-w-md shadow-xl border-2 border-kitchen-orange bg-white/95 backdrop-blur-sm transform transition-all">
                        <CardHeader className="text-center bg-kitchen-cream/70">
                            <div className="mx-auto w-12 h-12 rounded-full bg-kitchen-orange flex items-center justify-center mb-2">
                                <LockIcon className="text-white h-6 w-6" />
                            </div>
                            <CardTitle className="font-pixel text-xl text-kitchen-brown">Recipe Generator Locked</CardTitle>
                            <CardDescription>Sign up or log in to unlock recipe generation</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 pb-2 text-center">
                            <div className="flex items-center justify-center mb-4">
                                <ChefHat className="h-10 w-10 text-kitchen-orange mr-2" />
                                <span className="text-lg font-medium">Create delicious recipes with what you have!</span>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                Get personalized recipe suggestions based on ingredients in your pantry,
                                save your favorite recipes, and more.
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center p-6">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto"
                                onClick={() => setShowAuthPrompt(true)}
                            >
                                Learn More
                            </Button>
                            <Link to="/signup" className="w-full sm:w-auto">
                                <Button className="w-full bg-kitchen-orange hover:bg-kitchen-orange/90">
                                    Sign Up Free
                                </Button>
                            </Link>
                            <Link to="/login" className="w-full sm:w-auto">
                                <Button variant="secondary" className="w-full">
                                    Login
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* Auth prompt dialog */}
            <AuthPrompt isOpen={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />
        </div>
    );
};

export default UnauthorizedHomepage;