function guessCheck() {
    let nutritionBlock = document.getElementById("nutrition-block");
    let guessBlock = document.getElementById("guess-block");
    let calories = document.getElementById("calories");
    let carbs = document.getElementById("carbs");
    let proteins = document.getElementById("protein");
    let fats = document.getElementById("fats");

    if (nutritionBlock.style.display === "none") {
        nutritionBlock.style.display = "block";
    }
}
