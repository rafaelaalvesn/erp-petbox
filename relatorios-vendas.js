$('.sair').click(function () {
    window.document.location = "./index.html";
});

function MesSelecionado(descMes, numMes) {
    $('#mesRelatorio').html(descMes)
    sessionStorage.setItem("mesRelatorio", numMes)
}

function AnoSelecionado(ano) {
    $('#anoRelatorio').html(ano)
    sessionStorage.setItem("anoRelatorio", ano)
}

function RelatorioSelecionado(descRelatorio, nomeEncurtado) {
    $('#nomeRelatorio').html(descRelatorio)
    sessionStorage.setItem("nomeRelatorio", nomeEncurtado)

}


$('#btnGerarRelatorio').click(function () {

    var mes = sessionStorage.getItem("mesRelatorio")
    var ano = sessionStorage.getItem("anoRelatorio")
    var relatorio = sessionStorage.getItem("nomeRelatorio")

    if (relatorio == "" || relatorio == "null") {
        alert("Selecione o Relatório.")
        return;
    }
    if (mes == "" || mes == "null") {
        mes = 0;
    }
    if (ano == "" || ano == "null") {
        ano = 2020;
    }

    switch (relatorio) {
        case 'qtdPedidos':
            BuscaPedidosPeriodo(mes, ano);
            break;

        default:
            break;
    }

    sessionStorage.setItem("mesRelatorio", null)
    sessionStorage.setItem("anoRelatorio", null)
    sessionStorage.setItem("nomeRelatorio", null)



});

async function BuscaPedidosPeriodo(mes, ano) {

    var server = sessionStorage.getItem("server");
    var ano = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


    await $.getJSON(server + 'api/petbox/pedidos/', async function (data) {


        
        for (let index = 0; index < data.length; index++) {

            mesPedido = await GetMes(data[index].DATA_PEDIDO) - 1;
            ano[mesPedido] += 1 

        }

    })

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: ' nº de vendas',
                data: ano,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


async function FormataData(data) {
    data = data.substring(0, 10)

    var diaF = data.split("-")[2];
    var mesF = data.split("-")[1];
    var anoF = data.split("-")[0];

    return diaF + "/" + mesF + "/" + anoF

}

async function GetMes(data) {
   data = await FormataData(data);
   return data.split("/")[1];

}


async function GetAno(data) {
    data = await FormataData(data);
    return data.split("/")[2];
}

$("#print").click(async function(){

    $('#navigation').remove();
    window.print();
    window.document.location = "./relatorios-vendas.html";
})