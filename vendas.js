$('.sair').click(function () {
    window.document.location = "./index.html";
});


$('#pedidos').click(async function () {

    var server = sessionStorage.getItem("server");
    await $.getJSON(server + 'api/petbox/pedidos/', async function (data) {

        await $.getJSON(server + 'api/petbox/assinantes/', async function (assinante) {

            var html = '<div>' +
                '<h3 style="margin-left:1%">Pedidos</h3>' +
                '<hr>' +
                '</div>'

            for (let index = 0; index < data.length; index++) {

                var dataPedido = await FormataData(data[index].DATA_PEDIDO);
                var entregue = await StatusEntrega(data[index].ID_PEDIDO)

                html += `<tr>` +
                    `<th scope="row">${data[index].ID_PEDIDO}</th>` +
                    `<td>${assinante[index].NOME}</td>` +
                    `<td>${entregue}</td>` +
                    `<td>${dataPedido}</td>` +
                    `</tr>`
            }

            $("#bodyVendas").html('<table class="table table-hover">' +
                ' <thead>' +
                '<tr>' +
                '<th scope="col">ID PEDIDO</th>' +
                '<th scope="col">ASSINANTE</th>' +
                '<th scope="col">STATUS ENTREGA</th>' +
                '<th scope="col">DATA DO PEDIDO</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                html +

                '</tbody>' +
                '</table>'
            )

        });

    });

});

$('#clientes').click(async function () {

    var server = sessionStorage.getItem("server");
    await $.getJSON(server + 'api/petbox/assinantes/', async function (data) {


        var html = '<div>' +
            '<h3 style="margin-left:1%">Clientes</h3>' +
            '<hr>' +
            '</div>'

        for (let index = 0; index < data.length; index++) {

            var dataNascimento = await FormataData(data[index].DT_NASCIMENTO);
            var plano = await GetPlano(data[index].ID_PLANO);
            var statusCadastro = await StatusCadastro(data[index].CADASTRO_ATIVO)

            html += `<tr>` +
                `<th scope="row">${data[index].ID_ASSINANTE}</th>` +
                `<td>${data[index].NOME}</td>` +
                `<td>${plano}</td>` +
                `<td>${data[index].TELEFONE_PRINCIPAL}</td>` +
                `<td>${dataNascimento}</td>` +
                `<td>${statusCadastro}</td>` +
                `</tr>`
        }

        $("#bodyVendas").html('<table class="table table-hover">' +
            ' <thead>' +
            '<tr>' +
            '<th scope="col">ID</th>' +
            '<th scope="col">NOME</th>' +
            '<th scope="col">PLANO</th>' +
            '<th scope="col">TELEFONE</th>' +
            '<th scope="col">DATA DE NASCIMENTO</th>' +
            '<th scope="col">STATUS DA ASSINATURA</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            html +

            '</tbody>' +
            '</table>'
        )

    });


});

$('#relatorios').click(function () {
    window.document.location = "./relatorios-vendas.html";
});


async function FormataData(data) {
    data = data.substring(0, 10)

    var diaF = data.split("-")[2];
    var mesF = data.split("-")[1];
    var anoF = data.split("-")[0];

    return diaF + "/" + mesF + "/" + anoF

}

async function StatusEntrega(idPedido) {
      
    return new Promise((resolve, reject) => {
        $.ajax({
        beforeSend: function(request) {
           request.setRequestHeader("Authorization", 'Bearer key5vsWx2WI9FaZPC');
        },
        type: 'GET',
        dataType: "json",
        url: `https://api.airtable.com/v0/applWk6IGtiasBZJs/Pedidos/?filterByFormula={Número}=${idPedido}`,
          success: function(data) {
            if(data.records.length > 0){
                resolve(data.records[0].fields.Status.toUpperCase()) 
              } else resolve("STATUS DESCONHECIDO")
          },
          error: function(error) {
            reject(error)
          },
        })
      })
}


async function StatusCadastro(flg) {
    if (flg) return "ATIVA"
    else return "INATIVA"

}

async function GetPlano(idPLano) {
    if (idPLano == 1) return "Básico"
    else if (idPLano == 2) return "Clássico"
    else if (idPLano == 3) return "Master"
}


$('#caixas').click(async function () {

    var server = sessionStorage.getItem("server");

    await $.getJSON(server + 'api/petbox/pedidosItens/', async function (pedidoItens) {

        await $.getJSON(server + 'api/petbox/itens/', async function (itens) {

            var descricaoItens = "";


            var html = '<div>' +
            '<h3 style="margin-left:1%">Clientes</h3>' +
            '<hr>' +
            '</div>'


            for (let index = 0; index < pedidoItens.length; index++) {

                let i = itens.findIndex(val => val.ID_ITEM == pedidoItens[index].ID_ITEM);
                descricaoItens += `<li class="list-group-item"><b>PEDIDO ${pedidoItens[index].ID_PEDIDO } </b>- ${itens[i].DESC_ITEM} </li>`
            }

            await $("#bodyVendas").html(html + '<ul class="list-group list-group-flush">' +
                descricaoItens +
                '</ul>')

        })

    })


})