
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';

interface AuthPromptProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ isOpen, onClose }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white bg-opacity-95 backdrop-blur-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-pixel text-kitchen-brown">Recipe Locked</AlertDialogTitle>
          <AlertDialogDescription>
            Sign up or log in to unlock recipe generation and save your favorite recipes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-4 mt-4">
          <AlertDialogCancel 
            onClick={onClose}
            className="mt-0"
          >
            Just Browsing
          </AlertDialogCancel>
          <Link to="/login" className="w-full sm:w-auto">
            <Button className="w-full">
              Login
            </Button>
          </Link>
          <Link to="/signup" className="w-full sm:w-auto">
            <AlertDialogAction className="w-full">
              Sign Up
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthPrompt;
