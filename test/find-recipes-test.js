const assert = require('assert');
const ings   = require('../data/skyrim-ingredients.json');
const recipe = require('../src/recipe.js');

var findRecipesTests = [
    {
        ingredients: ['Blue Mountain Flower', 'Wheat'],
        recipes: [
            {
                ingredients: ['Blue Mountain Flower', 'Wheat'],
                effects: ['Restore Health', 'Fortify Health']
            }
        ]
    },
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

            var recipes = recipe.findRecipes(ingredients);

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