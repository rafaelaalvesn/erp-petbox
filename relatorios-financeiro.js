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

    GeraRelatorio();

    // switch (relatorio) {
    //     case '1':
    //         GeraRelatorio(1);
    //         break;
    //     case '2':
    //         GeraRelatorio(2);
    //         break;
    //     case '3':
    //         GeraRelatorio(3);
    //         break;
    //     case '4':
    //         GeraRelatorio(4);
    //         break;
    //     case '5':
    //         GeraRelatorio(5);
    //         break;
    //     case '6':
    //         GeraRelatorio(6);
    //         break;
    //     case '7':
    //         GeraRelatorio(7);
    //         break;
    //     case '8':
    //         GeraRelatorio(8);
    //         break;
    //     case '9':
    //         GeraRelatorio(9);
    //         break;
    //     default:
    //         break;
    // }

    sessionStorage.setItem("mesRelatorio", null)
    sessionStorage.setItem("anoRelatorio", null)
    sessionStorage.setItem("nomeRelatorio", null)

});


async function GeraRelatorio(val) {

    var val_1 = Math.random() * (10000 - 1) + 1;
    var val_2 = Math.random() * (10000 - 1) + 1;
    var val_3 = Math.random() * (10000 - 1) + 1;
    var val_4 = Math.random() * (10000 - 1) + 1;

    var usuarios = [val_1, val_2, val_3, val_4];

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr'],
            datasets: [{
                label: ' reais (R$)',
                data: usuarios,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
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

async function BuscaSeguidoresInstagram() {

    var seguidores = [10, 55, 150, 200, 225, 278, 310, 485, 525, 687, 700, 1000];

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: '  nº seguidores',
                data: seguidores,
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
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


async function BuscaMeioDeComunicacao() {

    var qtdUsers = [35, 50, 5, 10];

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Facebook', 'Instagram', 'Telefone', 'Site'],
            datasets: [{
                label: ' % de contatos',
                data: qtdUsers,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
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

$("#print").click(async function () {

    $('#navigation').remove();
    window.print();
    window.document.location = "./relatorios-financeiro.html";
})