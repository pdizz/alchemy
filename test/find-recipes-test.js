const assert = require('assert');
const ings   = require('../data/skyrim-ingredients.json');

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
var sort = function(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
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
    })
};

var findRecipesTests = [
    // {
    //     ingredients: ['Blue Mountain Flower', 'Wheat'],
    //     recipes: [
    //         ['Restore Health', 'Fortify Health']
    //     ]
    // },
    {
        ingredients: ['Deathbell', 'Pine Thrush Egg', 'River Betty'],
        recipes: [
            {
                "ingredients": ["Deathbell", "Pine Thrush Egg"],
                "effects": ["Weakness to Poison"]
            },
            {
                "ingredients": ["Deathbell", "River Betty"],
                "effects": ["Damage Health", "Slow"]
            },
            {
                "ingredients": [
                    "Deathbell",
                    "Pine Thrush Egg",
                    "River Betty"
                ],
                "effects": [
                    "Weakness to Poison",
                    "Damage Health",
                    "Slow"
                ]
            }
        ]
    }
];

describe('findRecipes()', function () {
    findRecipesTests.forEach(function (test) {
        it('finds possible potions for a list of ingredients', function () {
            var ingredients = ings.filter(function (ingredient) {
                return test.ingredients.indexOf(ingredient.name) !== -1;
            });

            var recipes = findRecipes(ingredients);

            test.recipes.forEach(function (expectedRecipe, key) {
                // actual result has ingredient object, we just want the names
                var ingredients = recipes[key].ingredients.map(function (ingredient) {
                    return ingredient.name;
                });
                assert.deepEqual(expectedRecipe.ingredients, ingredients);

                assert.deepEqual(expectedRecipe.effects, recipes[key].effects);
            });
        });
    });
});