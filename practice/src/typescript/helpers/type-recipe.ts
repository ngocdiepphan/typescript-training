export interface Recipe {
  name: string;
  description: string;
  ingredient: string[];
  instruction: string;
  nutrition: string;
  creator: string;
  category: string;
  id: string;
  role: string;
  imageURL: string;
  ratings: number;
  createdAt: Date;
}
