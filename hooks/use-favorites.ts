
"use client";

import { useAuth } from './use-auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserFavorites, toggleFavoriteTool } from '@/lib/firebase/firestore';
import { useToast } from './use-toast';
import { useLanguage } from './use-language';
import { translations } from '@/lib/translations';
import { useEffect } from 'react';

export function useFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language].account;

  const queryKey = ['favorites', user?.uid];

  const { data: favorites = [], isLoading, isError, error } = useQuery<string[], Error>({
    queryKey,
    queryFn: () => {
      if (!user) return Promise.resolve([]); // Should not happen due to `enabled`
      return getUserFavorites(user.uid)
    },
    enabled: !!user, // Only run the query if the user is logged in
    retry: false, // Don't retry on auth/permission errors
  });

  // Effect to show a toast when the initial fetch fails
  useEffect(() => {
    if (isError && error) {
      toast({
        variant: 'destructive',
        title: t.updateFailedToastTitle,
        description: error.message,
      });
    }
  }, [isError, error, toast, t.updateFailedToastTitle]);


  const toggleMutation = useMutation({
    mutationFn: (toolId: string) => {
      if (!user) throw new Error("User not authenticated");
      return toggleFavoriteTool(user.uid, toolId)
    },
    onMutate: async (toolId: string) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey });
      const previousFavorites = queryClient.getQueryData<string[]>(queryKey) || [];
      
      let newFavorites: string[];
      if (previousFavorites.includes(toolId)) {
        newFavorites = previousFavorites.filter(id => id !== toolId);
        toast({ title: t.favoriteRemovedToastTitle });
      } else {
        newFavorites = [...previousFavorites, toolId];
        toast({ title: t.favoriteAddedToastTitle });
      }
      
      queryClient.setQueryData(queryKey, newFavorites);
      return { previousFavorites };
    },
    onError: (err: Error, toolId, context) => {
      // Rollback on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(queryKey, context.previousFavorites);
      }
      toast({ variant: 'destructive', title: t.updateFailedToastTitle, description: err.message || t.favoriteErrorToastDesc });
    },
    onSettled: () => {
      // Invalidate to refetch from server and ensure consistency
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  return {
    favorites,
    isLoading,
    isError,
    toggleFavorite: toggleMutation.mutate,
    isFavorite,
    isToggling: toggleMutation.isPending,
  };
}
