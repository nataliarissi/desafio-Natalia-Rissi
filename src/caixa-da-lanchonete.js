import formaDePagamento from "./Classes/formaDePagamento.js";
import { listaComidas, listaFormasPagamento } from "./bancoDados.js";

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if(itens.length == 0)
            return "Não há itens no carrinho de compra!";

        let pagamento = this.procurarMetodoPagamento(metodoDePagamento);

        if(pagamento == null)
            return "Forma de pagamento inválida!";

        let itensBanco = this.procurarItens(itens)

        if(itensBanco.length != itens.length) //length saber tamanho do array
            return "Item inválido!";

        if(!this.validarQuantidade(itens))
            return "Quantidade inválida!";

        if(!this.validarItemPrincipal(itensBanco))
            return "Item extra não pode ser pedido sem o principal";

            return this.calcularValorFinal(pagamento, itensBanco, itens)
    }

    procurarMetodoPagamento(metodoDePagamento) {
        for(let n = 0; n < listaFormasPagamento.length; n++){
            //pegar o item
            let valorPagamento = listaFormasPagamento[n];
            //comparar para ver o numero indicado
            if(valorPagamento.codigo == metodoDePagamento)
                return valorPagamento;
        }
        return null;
    }

    procurarItens(itens){
        let resultado = [];
        for(let n = 0; n < itens.length; n++){
            let item = itens[n].split(','); //item atual
            let codigoItem = item[0];
            for(let m = 0; m < listaComidas.length; m++){
                let comidaAtual = listaComidas[m];
                if(codigoItem == comidaAtual.codigo)
                    resultado.push(comidaAtual); //estilo add - adiciona o item 
            }
        }
        return resultado;
    }
    
    validarQuantidade(itens){
        for(let n = 0; n < itens.length; n++){
            let quantidade = itens[n].split(',')[1];
            if(quantidade <= 0)
            return false;            
        }
        return true;
    }

    validarItemPrincipal(itens){
        for(let n = 0; n < itens.length; n++){
            let itemAtual = itens[n];
            if(itemAtual.principal != undefined && itemAtual.principal != null){
                let possuiPrincipal = false;
                for(let m = 0; m < itens.length; m++){
                    let itemBancoAtual = itens[m];
                    possuiPrincipal = itemAtual.principal == itemBancoAtual.codigo;
                    if(possuiPrincipal)
                        break;
                }
                if(!possuiPrincipal)
                    return false;
            }
        }
        return true;
    }
    // Pennsar numa lógica para atrelar o extra ao item principal (por código de preferencia)
    // e daí, a partir disso mudar a função de validarItemPrincipal
    // Digamos assim, tenque fazer com que: se a lista de itens do 
    // usuário tiver um acompanhamento pra cafe e n tiver cafe, tenque retornar msg de erro

    calcularValorFinal(formaDePagamento, itensBanco, itensDigitadosUsuario){
        let resultado = 0;
        for(let n = 0; n < itensDigitadosUsuario.length; n++){
            let itemAtual = itensDigitadosUsuario[n].split(',');
            let itemCodigoAtual = itemAtual[0];
            let itemQuantidadeAtual = itemAtual[1];

            for(let m = 0; m < itensBanco.length; m++){
                let itemBanco = itensBanco[m];
                if(itemBanco.codigo == itemCodigoAtual)
                    resultado += itemBanco.valor * itemQuantidadeAtual;
            }
        }
        if(formaDePagamento.desconto > 0)
            resultado *= (1 - (formaDePagamento.desconto/100));

        if(formaDePagamento.taxa > 0)
            resultado *= (1 + (formaDePagamento.taxa/100));
        return "R$ " + resultado.toFixed(2).replace("." , ",");
    }
}
export { CaixaDaLanchonete };