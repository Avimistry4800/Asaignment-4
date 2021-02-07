const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const ingredientCloseBtn = document.getElementById('ingredient-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealingredient);
ingredientCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showingredient');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "ingredient-btn">Get ingredient</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get ingredient of the meal
function getMealingredient(e){
    e.preventDefault();
    if(e.target.classList.contains('ingredient-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealingredientModal(data.meals));
    }
}

// create a modal
function mealingredientModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "ingredient-title">${meal.strMeal}</h2>
        <p class = "ingredient-category">${meal.strCategory}</p>
        <div class = "ingredient-instruct">
            <h3>Ingredients:</h3>
            <p>
                ${meal.strIngredient1}           
                <br>${meal.strIngredient2}           
                <br>${meal.strIngredient3}           
                <br>${meal.strIngredient4}           
                <br>${meal.strIngredient5}           
                <br>${meal.strIngredient6}           
                <br>${meal.strIngredient7}           
                <br>${meal.strIngredient8}           
                <br>${meal.strIngredient9}           
                <br>${meal.strIngredient10}           
                <br>${meal.strIngredient11}           
                <br>${meal.strIngredient12}           
            </p>
            
        </div>
        <div class = "ingredient-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
       
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showingredient');
}