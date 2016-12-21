var arrayIntersect = function(a, b) {
    return a.filter(function (e) {
        return b.indexOf(e) !== -1;
    });
};

var arrayUnique = function(a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
};

// http://stackoverflow.com/a/4061198/958490
// Function to get combinations of items in array up to a certain length (choose)
// way faster and eliminates need for array comparisons and sorting everywhere
var combinations = function (arr, choose) {
    var n = arr.length;
    var c = [];
    var results = [];
    var inner = function(start, choose_) {
        if (choose_ == 0) {
            // have to clone the array since it changes on the next iteration
            results.push(c.slice(0));
        } else {
            for (var i = start; i <= n - choose_; ++i) {
                c.push(arr[i]);
                inner(i + 1, choose_ - 1);
                c.pop();
            }
        }
    };
    inner(0, choose);
    return results;
};

var matchIngredients = function (ingredients) {
    var ingCombos = combinations(ingredients, 2);
    var matched = [];
    ingCombos.forEach(function (combo) {
        matched = matched.concat(arrayIntersect(combo[0].effects, combo[1].effects));
    });

    return arrayUnique(matched);
};

var findRecipes = function (ingredients) {
    // Skyrim allows combining 2 or 3 distinct ingredients to make a potion
    var combos = combinations(ingredients, 2).concat(combinations(ingredients, 3));

    var recipes = combos.map(function(combo) {
        return {
            ingredients: combo,
            effects: matchIngredients(combo)
        };
    });

    // Only return valid combos
    return recipes.filter(function (recipe) {
        return recipe.effects.length > 0;
    });
};

module.exports = {
    matchIngredients: matchIngredients,
    findRecipes: findRecipes
};