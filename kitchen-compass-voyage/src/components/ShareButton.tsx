import React, { useState } from 'react';
import { Share, Copy, CheckCircle, Twitter, Facebook, Mail } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

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

interface ShareButtonProps {
    recipe: {
        title: string;
        description: string;
        ingredients: Ingredient[];
        instructions: string[];
        cookTime: string;
        servings: number;
        tags: string[];
        nutrition?: Nutrition;
    };
}

const ShareButton: React.FC<ShareButtonProps> = ({ recipe }) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const shareUrl = window.location.href;
    const shareTitle = `Check out this recipe: ${recipe.title}`;
    const shareText = `${recipe.title} - ${recipe.description}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(
                `${recipe.title}\n\n${recipe.description}\n\nIngredients:\n${recipe.ingredients
                    .map((ing) => `- ${ing.amount} ${ing.name}`)
                    .join('\n')}\n\nInstructions:\n${recipe.instructions
                        .map((step, index) => `${index + 1}. ${step}`)
                        .join('\n')}`
            );

            setCopied(true);
            toast({
                title: "Recipe copied to clipboard",
                description: "You can now paste it anywhere you like!",
            });

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast({
                title: "Failed to copy",
                description: "Could not copy to clipboard",
                variant: "destructive",
            });
        }
    };

    const shareToTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            '_blank'
        );
    };

    const shareToFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
            '_blank'
        );
    };

    const shareByEmail = () => {
        window.open(
            `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(
                `${shareText}\n\nCheck it out here: ${shareUrl}`
            )}`,
            '_blank'
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-kitchen-brown hover:text-kitchen-orange">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
                    {copied ? (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                        <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copy Recipe
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareToTwitter} className="cursor-pointer">
                    <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                    Share to Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareToFacebook} className="cursor-pointer">
                    <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                    Share to Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareByEmail} className="cursor-pointer">
                    <Mail className="h-4 w-4 mr-2" />
                    Share by Email
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ShareButton;