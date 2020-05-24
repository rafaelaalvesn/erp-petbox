$('.sair').click(function () {
    window.document.location = "./index.html";
});

$('#funcionarios').click(async function () {

    await $.getJSON('https://api.airtable.com/v0/appoAW6cx5OpDFgik/Funcionarios?api_key=keyKYnivsmDdUhpoa', async function (data) {

        localStorage.setItem("funcionarios", JSON.stringify(data));

        var html = '<div>' +
            '<h3 style="margin-left:1%">Funcionários</h3>' +
            '<hr>' +
            '</div>'

        for (let index = 0; index < data.records.length; index++) {


            html += `<tr>` +
                `<th scope="row">${data.records[index].fields.Matrícula}</th>` +
                `<td>${data.records[index].fields.Nome}</td>` +
                `<td>${data.records[index].fields.Setor}</td>` +
                `<td>${data.records[index].fields.Função}</td>` +
                `<td>${data.records[index].fields.Salário}</td>` +
                `<td>${data.records[index].fields["Data de Admissão"]}</td>` +
                // `<td><i class="fa fa-pencil" aria-hidden="true" onclick="EditarFuncionario(${data[index].ID}})"></i></td>` +
                // `<td><i class="fa fa-trash-o" aria-hidden="true" onclick="RemoverFuncionario(${data[index].ID})"></i></td>` +
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
            // '<th scope="col"></th>' +
            // '<th scope="col"></th>' +
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

    var funcionario = $(this).val();
    $('#tableFolhaDePonto').remove();

    var numMes = $('#mesReferencia').val();
    var descMes = $("#mesReferencia option:selected").text();

    PreencheFolhaDePonto(funcionario, numMes, descMes);


});


async function PreencheFolhaDePonto(funcionario, numMes, descMes) {
    await $.getJSON('https://api.airtable.com/v0/appoAW6cx5OpDFgik/FolhadePonto?api_key=keyKYnivsmDdUhpoa', async function (data) {

        var html = ""
        for (let index = 0; index < data.records.length; index++) {

            if(funcionario == data.records[index].fields.Funcionário && data.records[index].fields["Mês referência"])

            html += `<tr>` +
                `<th scope="row">${data.records[index].fields["Mês referência"]}</th>` +
                `<td>${data.records[index].fields.Data}</td>` +
                `<td>${data.records[index].fields.Entrada}</td>` +
                `<td>${data.records[index].fields.Saída}</td>` +
                `<td>${data.records[index].fields["Horas Trabalhadas"]}</td>` +
                `<td>--</td>` +
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

async function RemoverFuncionario(id, data) {

    var excluir = confirm("Tem certeza que deseja excluir?")

    if (excluir) {
        $("#bodyVendas").html("");
        await $.getJSON('json/funcionarios.json', async function (data) {
    
            var html = '<div>' +
                '<h3 style="margin-left:1%">Funcionários</h3>' +
                '<hr>' +
                '</div>'
    
            for (let index = 0; index < data.length; index++) {
    
                if (data[index].ID != id) {
                    html += `<tr>` +
                        `<th scope="row">${data[index].ID}</th>` +
                        `<td>${data[index].NOME}</td>` +
                        `<td>${data[index].SETOR}</td>` +
                        `<td>${data[index].FUNCAO}</td>` +
                        `<td>${data[index].SALARIO}</td>` +
                        `<td>${data[index].DATA_ADMISSAO}</td>` +
                        `<td><i class="fa fa-pencil" aria-hidden="true" onclick="EditarFuncionario(${data[index].ID})"></i></td>` +
                    `<td><i class="fa fa-trash-o" aria-hidden="true" onclick="RemoverFuncionario(${data[index].ID})"></i></td>` +
                        `</tr>`
                }
    
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
                '<th scope="col"></th>' +
                '<th scope="col"></th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                html +
    
                '</tbody>' +
                '</table>'
            )
        })
    }
    else return
   
}
