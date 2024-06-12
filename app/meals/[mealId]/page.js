export default function MealDetailsPage({params}) {
    return (
        <>
            <h1>Dynamic Meal Details page</h1>
            <p>Dynamic Meal Id: {params.mealId}</p>
        </>
        
    )
}