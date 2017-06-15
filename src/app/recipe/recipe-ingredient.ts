export interface IRecipeIngredient {
    recipeIngredientId: number;
    recipeId: number;
    recipeName: string;
    recipeDescription?: string;
    ingredientId: number;
    ingredientName: string;
    ingredientDescription?: string;
}
