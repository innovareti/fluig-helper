var TesteTeste = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function () {

    },

    //BIND de eventos
    bindings: {
        local: {
            'exemplo': ['click_exemplo']
        },
        global: {}
    },

    exemplo: function (htmlElement, event) {

    }

});