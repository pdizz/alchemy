const ings   = require('json-loader!../data/skyrim-ingredients.json');
const effs   = require('json-loader!../data/skyrim-effects.json');
const recipe = require('../src/recipe.js');

Vue.config.errorHandler = function (err, vm) {
    console.log(err, vm);
};

new Vue({
    el: '#alchemy-app',
    data: {
        ingredients: ings,
        effects: effs,
        ingredientsQuery: '',
        effectsQuery: '',
        selectedIngredients: [],
        selectedEffects: []
    },
    computed: {
        filteredIngredients: function() {
            var query = String(this.ingredientsQuery).toLowerCase();
            return this.ingredients.filter(function (ingredient) {
                return String(ingredient.name).toLowerCase().indexOf(query) > -1;
            });
        },
        filteredEffects: function() {
            var query = String(this.effectsQuery).toLowerCase();
            return this.effects.filter(function (effect) {
                return String(effect.name).toLowerCase().indexOf(query) > -1;
            });
        },
        foundRecipes: function() {
            return recipe.findRecipes(this.selectedIngredients);
        }
    }
});

