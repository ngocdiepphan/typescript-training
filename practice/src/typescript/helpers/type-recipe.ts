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
  nutrition: string
}


export interface EditRecipeHandler {
  (
    recipeId: string,
    newRecipeImage: string,
    newRecipeName: string,
    newRecipeCategory: string,
    newRecipeCreator: string,
    newRecipeRating: string,
    newRecipeDescription: string
  ): void;
}



