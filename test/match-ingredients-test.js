const assert = require('assert');
const ings   = require('../data/skyrim-ingredients.json');
const recipe = require('../src/recipe.js');

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

            var effects = recipe.matchIngredients(ingredients);

            var sort = function (a, b) {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            };
            assert.deepEqual(test.effects.sort(sort), effects.sort(sort));
        });
    });
});