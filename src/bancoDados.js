import comida from "./Classes/comida.js";
import formaDePagamento from "./Classes/formaDePagamento.js";

var listaComidas = [
    new comida("cafe", "Café", 3.00),
    new comida("chantily", "Chantily (extra do café)", 1.50, 'cafe'),
    new comida("suco", "Suco Natural", 6.20),
    new comida("sanduiche", "Sanduíche", 6.50),
    new comida("queijo", "Queijo (extra do Sanduíche)", 2.00, 'sanduiche'),
    new comida("salgado", "Salgado", 7.25),
    new comida("combo1", "1 Suco e 1 Sanduíche", 9.50),
    new comida("combo2", "1 Café e 1 Sanduíche", 7.50)
];

var listaFormasPagamento = [
    new formaDePagamento("dinheiro", "Dinheiro", 5, 0),
    new formaDePagamento("debito", "Débito", 0, 0),
    new formaDePagamento("credito", "Crédito", 0, 3)
]

export {listaComidas, listaFormasPagamento}