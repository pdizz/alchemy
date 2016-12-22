import ings from '../data/skyrim-ingredients.json';
import effs from '../data/skyrim-effects.json';
import recipe from '../src/recipe.js';


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

