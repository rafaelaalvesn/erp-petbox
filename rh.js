$('.sair').click(function () {
    window.document.location = "./index.html";
});

$('#funcionarios').click(async function () {

    await $.getJSON('json/funcionarios.json', async function (data) {

        var html = '<div>' +
            '<h3 style="margin-left:1%">Funcionários</h3>' +
            '<hr>' +
            '</div>'

        for (let index = 0; index < data.length; index++) {


            html += `<tr>` +
                `<th scope="row">${data[index].ID}</th>` +
                `<td>${data[index].NOME}</td>` +
                `<td>${data[index].SETOR}</td>` +
                `<td>${data[index].FUNCAO}</td>` +
                `<td>${data[index].SALARIO}</td>` +
                `<td>${data[index].DATA_ADMISSAO}</td>` +
                `</tr>`
        }

        $("#bodyVendas").html('<table class="table table-hover">' +
            ' <thead>' +
            '<tr>' +
            '<th scope="col">ID</th>' +
            '<th scope="col">NOME</th>' +
            '<th scope="col">SETOR</th>' +
            '<th scope="col">FUNÇÃO</th>' +
            '<th scope="col">SALÁRIO</th>' +
            '<th scope="col">DATA DE ADMISSÃO</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            html +

            '</tbody>' +
            '</table>'
        )
    })
});


$('#folhaDePonto').click(async function () {

    window.document.location = "./folhaDePonto.html";
        //MontaHTML();
    //var funcionario = $('#funcionarioSelecionado:selected').text();
    //await PreencheFolhaDePonto(funcionario)
});

$('#funcionarioSelecionado').change(async function () {

    var funcionario=$(this).val();
    $('#tableFolhaDePonto').remove();
  
   var numMes= $('#mesReferencia').val();
   var descMes = $("#mesReferencia option:selected").text();

   PreencheFolhaDePonto(funcionario, numMes, descMes);
    
    
});


async function PreencheFolhaDePonto(funcionario, numMes, descMes)
{
    await $.getJSON('json/folhaDePonto'+funcionario+'.json', async function (data) {

        var html = ""
        for (let index = 0; index < data.length; index++) {

            html += `<tr>` +
                `<th scope="row">${descMes}</th>` +
                `<td>${data[index].DIA}/${numMes}/${data[index].ANO}</td>` +
                `<td>${data[index].HORA_ENTRADA}</td>` +
                `<td>${data[index].HORA_SAIDA}</td>` +
                `<td>${data[index].HORAS_TRABALHADAS}</td>` +
                `<td>${data[index].OBSERVACAO}</td>` +
                `</tr>`
        }

        $("#bodyFolhaDePonto").append('<table class="table table-hover" id="tableFolhaDePonto">' +
            ' <thead>' +
            '<tr>' +
            '<th scope="col">MÊS DE REFERÊNCIA</th>' +
            '<th scope="col">DATA</th>' +
            '<th scope="col">HORA ENTRADA</th>' +
            '<th scope="col">HORA SAÍDA</th>' +
            '<th scope="col">HORAS TRABALHADAS</th>' +
            '<th scope="col">OBSERVAÇÃO</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            html +

            '</tbody>' +
            '</table>'
        )
    })

    //await alert(funcionario);
}