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
        case 'hrsExtra':
            BuscaHoraExtra(mes, ano);
            break;
        case 'faixasSalariais':
            BuscaFaixaSalarial();
            break;
        case 'tempoEmpresa':
            BuscaTempoEmpresa();
            break;
        default:
            break;
    }

    sessionStorage.setItem("mesRelatorio", null)
    sessionStorage.setItem("anoRelatorio", null)
    sessionStorage.setItem("nomeRelatorio", null)

});


async function BuscaHoraExtra(mes, ano) {

    var horas = [5, 10, 2, 5];

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Italo', 'Letícia', 'Rafaela', 'Rafaelle'],
            datasets: [{
                label: ' horas',
                data: horas,
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

async function BuscaFaixaSalarial() {

    var salario = [5000, 5000, 5000, 5000];

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Italo', 'Letícia', 'Rafaela', 'Rafaelle'],
            datasets: [{
                label: '  reais',
                data: salario,
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


async function BuscaTempoEmpresa() {

    var meses = [1, 1, 1, 1];

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Italo', 'Letícia', 'Rafaela', 'Rafaelle'],
            datasets: [{
                label: ' meses',
                data: meses,
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

$("#print").click(async function(){

    $('#navigation').remove();
    window.print();
    window.document.location = "./relatorios-rh.html";
})