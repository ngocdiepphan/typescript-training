export interface Recipe {
  name: string;
  description: string;
  ingredient: string;
  instruction: string;
  creator: string;
  category: string;
  id: string;
  imageURL: string;
  ratings: number;
  createdAt: string;
  nutrition: string;
  collection_id: number;
  image: string
}

export type EditRecipeHandler = (
  recipeId: string,
  newRecipeImage: string,
  newRecipeName: string,
  newRecipeCategory: string,
  newRecipeCreator: string,
  newRecipeRating: number,
  newRecipeDescription: string
) => void;

export type DeleteRecipeHandler = (recipeId: string) => void;

export type AddRecipeHandler = (newRecipe: Recipe) => void;


