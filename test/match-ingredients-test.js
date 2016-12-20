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

    return combos.map(function(combo) {
        return {
            ingredients: combo,
            effects: matchIngredients(combo)
        };
    });
};

// http://www.uesp.net/wiki/Skyrim:Useful_Potions
var matchIngredientsTests = [
    {
        ingredients: ['Blue Mountain Flower', 'Wheat'],
        effects: ['Restore Health', 'Fortify Health']
    },
    {
        ingredients: ['Blue Mountain Flower', "Giant's Toe", 'Imp Stool'],
        effects: ['Fortify Health', 'Restore Health']
    },
    {
        ingredients: ['Creep Cluster', "Giant's Toe", 'Wheat'],
        effects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Fortify Health']
    },
    {
        ingredients: ['Bear Claws', 'Charred Skeever Hide', 'Wheat'],
        effects: ['Restore Stamina', 'Fortify Health', 'Restore Health']
    },
    {
        ingredients: ['Briar Heart', 'Red Mountain Flower'],
        effects: ['Restore Magicka', 'Fortify Magicka']
    },
    {
        ingredients: ['Jazbay Grapes', 'Moon Sugar', 'Red Mountain Flower'],
        effects: ['Regenerate Magicka', 'Fortify Magicka', 'Restore Magicka']
    },
    {
        ingredients: ['Garlic', "Namira's Rot", 'Salt Pile'],
        effects: ['Regenerate Health', 'Regenerate Magicka']
    },
    {
        ingredients: ['Luna Moth Wing', 'Vampire Dust'],
        effects: ['Regenerate Health', 'Invisibility']
    },
    {
        ingredients: ['Charred Skeever Hide', 'Eye of Sabre Cat', 'Hawk Feathers'],
        effects: ['Cure Disease', 'Restore Health', 'Restore Stamina']
    },
    {
        ingredients: ['Charred Skeever Hide', 'Eye of Sabre Cat', 'Mudcrab Chitin'],
        effects: ['Cure Disease', 'Restore Health', 'Restore Stamina', 'Resist Poison']
    }
];

describe('matchIngredients()', function () {
    matchIngredientsTests.forEach(function (test) {
        it('matches the right effects for given ingredients', function () {
            var ingredients = ings.filter(function (ingredient) {
                return test.ingredients.indexOf(ingredient.name) !== -1;
            });

            var effects = matchIngredients(ingredients);

            assert.deepEqual(test.effects.sort(sort), effects.sort(sort));
        });
    });
});