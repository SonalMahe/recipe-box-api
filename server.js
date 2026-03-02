import express from 'express';

//Initialize Express app-
const app = express();

//Middleware to parse JSON bodies-
app.use(express.json());

//Set the port-
const PORT = 5000;

let recipe = [
    {
        "id": 1,
        "name": "Spaghetti Bolognese",
        "ingredients": ["spaghetti", "green vegetables", "tomato sauce", "onion", "garlic"],
        "cuisine": "Italian",
        "cookTime": "20mins",
    },
    {
        "id": 2,
        "name": "Paneer Tikka",
        "ingredients": ["paneer", "yogurt", "spices", "onion", "tomato"],
        "cuisine": "Indian",
        "cookTime": "30mins"
   },
   {
        "id": 3,
        "name": "Chole Bhature",
        "ingredients": ["chickpeas", "butter", "onion", "tomato", "bhature"],
        "cuisine": "Indian",
        "cookTime": "45mins"
   },
   {
        "id": 4,
        "name": "Pav Bhaji",
        "ingredients": ["potatoes", "mixed vegetables", "tomato", "onion", "pav"],
        "cuisine": "Indian",
        "cookTime": "30mins"
   },
   {
        "id": 5,
        "name": "Tacos",
        "ingredients": ["tortillas", "meat", "cheese", "lettuce", "tomato"],
        "cuisine": "Mexican",
        "cookTime": "20mins"
   },
]


// Route to get all recipes
app.get("/recipes", (req, res) => {
  res.json(recipe);
});


// Route to get a specific recipe by ID
app.get("/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const recipeById = recipe.find(r => r.id === id);
  if (recipeById) {
    res.json(recipeById);
  } else {
    res.status().json({ error: "Recipe not found" });
  }
});


// Route to add a new recipe.
app.post("/addrecipe", (req, res) => {
    const addReceipe = req.body;
    addReceipe.id = recipe.length + 1; // Assign a new ID based on the length of the array. 
    recipe.push(addReceipe);
    res.status(201).json(addReceipe);
});


// Route to update an existing recipe by ID.
app.put("/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const recipeToUpdate = recipe.find(r => r.id === id);
  if (!recipeToUpdate) {
   return res.status(404).json({ error: "Recipe not found" });
 }
  recipeToUpdate.name = req.body.name || recipeToUpdate.name;
  recipeToUpdate.ingredients = req.body.ingredients || recipeToUpdate.ingredients;
  recipeToUpdate.cuisine = req.body.cuisine || recipeToUpdate.cuisine;
  recipeToUpdate.cookTime = req.body.cookTime || recipeToUpdate.cookTime;
  res.json({message:"Recipe updated successfully", recipe: recipeToUpdate});
});

// Route to delete a recipe by ID.
app.delete("/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);   
  const recipes = recipe.filter(r => r.id !==id);
  res.json({message:"Recipe deleted successfully", recipe: recipes});
});
  

//start the express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});