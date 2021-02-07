// global varibale here 
const searchBtn = document.getElementById("searchBtn");
const listGroup = document.getElementById("mealsList");
const details = document.getElementById("detailsDiv");

// click event area here 
searchBtn.addEventListener("click", mealsList);
listGroup.addEventListener("click", getMealReciepe);

// display list 
function mealsList(inputValue) {
    const inputvalue = document.getElementById("inputValue").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputvalue}`)
        .then(response => response.json())
        .then( data => {
            let html = "";
            if(data.meals){
                data.meals.forEach(mealsItem => {
                    html += `
                        <div class="meals-item" data-id=${mealsItem.idMeal}>
                            <img src="${mealsItem.strMealThumb}" alt="">
                            <div class="meals-title">
                                <h2>${mealsItem.strMeal}</h2>
                            </div>
                        </div> 
                    `;
                });
                listGroup.classList.remove('notFound');
                details.classList.remove("showMe");
            }
            else{
                html = "nothing found here "
                listGroup.classList.add('notFound');
            }
            listGroup.innerHTML = html

        })

}
// meals details information click event get element by id
function getMealReciepe(e) {
    listGroup.style.display = "none";
    details.style.display = "block";
    const ele = e.target.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ele.dataset.id}`)
        .then(response => response.json())
        .then(data => mealsDetails(data.meals)) 

}

// meals details function
function mealsDetails(meals) {
    console.log(meals);
    let html = `
            <div class="meals-details-heading">
            <h2>Meals Category : ${meals[0].strCategory}</h2>
        </div>
        <div class="signle-food">
            <div class="meals-img">
            <img src="${meals[0].strMealThumb}" alt="">
            </div>
            <div class="meals-title-details">
            <h3>${meals[0].strMeal}</h3>
            </div>
        </div>
        <div class="ingerient">
            <h3> INSTRUCTIONS</h3>
            <p class=desc>${meals[0].strInstructions}</p>
        </div>
    `
    details.innerHTML = html;
    details.classList.add("showMe");

}

