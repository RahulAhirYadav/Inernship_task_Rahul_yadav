# Sample recipes stored as an array of objects
recipes = [
    {"name": "Pancakes", "type": "Breakfast", "ingredients": ["flour", "milk", "eggs", "sugar"]},
    {"name": "Omelette", "type": "Breakfast", "ingredients": ["eggs", "cheese", "milk", "salt"]},
    {"name": "Grilled Cheese Sandwich", "type": "Lunch", "ingredients": ["bread", "cheese", "butter"]},
    {"name": "Caesar Salad", "type": "Lunch", "ingredients": ["lettuce", "croutons", "cheese", "caesar dressing"]},
    {"name": "Spaghetti", "type": "Dinner", "ingredients": ["pasta", "tomato sauce", "garlic", "onions"]},
    {"name": "Tacos", "type": "Dinner", "ingredients": ["tortilla", "beef", "lettuce", "cheese"]},
]

def search_recipes(ingredients, recipe_type=None):

    #Search for recipes based on ingredients and optional recipe type.

   
    ingredients = set(ingredients.lower().split(","))
    matching_recipes = []

    for recipe in recipes:
        recipe_ingredients = set(recipe["ingredients"])
        if ingredients.issubset(recipe_ingredients):
            if recipe_type:
                if recipe["type"].lower() == recipe_type.lower():
                    matching_recipes.append(recipe)
            else:
                matching_recipes.append(recipe)
    return matching_recipes

def get_recipe_type():
    
    # Display recipe types as a menu and get the user's choice.

    
    print("\nFilter by Recipe Type:")
    print("1. Breakfast")
    print("2. Lunch")
    print("3. Dinner")
    print("4. No Filter")
    
    choice = input("Enter your choice (1-4): ")
    recipe_types = { "1": "Breakfast", "2": "Lunch", "3": "Dinner", "4": None }
    
    return recipe_types.get(choice, None)

def main():
    print("Welcome to the Recipe Finder!")
    
    while True:
        print("\nOptions:")
        print("1. Search Recipes")
        print("2. Exit")
        choice = input("Enter your choice: ")
        
        if choice == "1":
            ingredients = input("\nEnter ingredients (comma-separated): ").strip()
            
            # Get recipe type using the dropdown-like menu
            recipe_type = get_recipe_type()
            
            results = search_recipes(ingredients, recipe_type)
            if results:
                print("\nMatching Recipes:")
                for recipe in results:
                    print(f"- {recipe['name']} ({recipe['type']}) - Ingredients: {', '.join(recipe['ingredients'])}")
            else:
                print("\nNo recipes found matching your criteria.")
        elif choice == "2":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()
