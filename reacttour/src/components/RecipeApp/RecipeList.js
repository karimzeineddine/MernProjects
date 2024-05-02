import Recipe from "./RecipeItem";

const RecipeList = ({recipes,onEdit,onDelete}) => {
    return(
        <div>
            {
            recipes.map((recipe,index)=> (
                <Recipe
                key={index}
                recipe={recipe}
                onEdit={()=> onEdit(index)}
                onDelete={()=> onDelete(index)}
                />
            ))}
        </div>
    );
};

export default RecipeList;