const ings = require('json-loader!../data/skyrim-ingredients.json');
const effs = require('json-loader!../data/skyrim-effects.json');

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
            var query = this.ingredientsQuery;
            return this.ingredients.filter(function (ingredient) {
                return String(ingredient.name).toLowerCase().indexOf(query) > -1;
            });
        },
        filteredEffects: function() {
            var query = this.effectsQuery;
            return this.effects.filter(function (effect) {
                return String(effect.name).toLowerCase().indexOf(query) > -1;
            });
        }
    }
});

