const Recipe = ({recipe,onEdit,onDelete}) =>{
    return(
        <div>
            <h2>{recipe.title}</h2>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instruction}</p>
            <p>preparation time: {recipe.preparationTime}</p>
            <p>Cooking time: {recipe.cookingTime}</p>
            <p>Difficulty: {recipe.difficulty}</p>

            <button onClick={onEdit}>Edit Recipe</button>
            <button onClick={onDelete}>Delete Recipe</button>
        </div>
    );
};

export default Recipe;