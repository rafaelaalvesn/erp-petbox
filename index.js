$("#logar").click(function () {

    SelecionaServer();

    var login = $('#login').val();
    var senha = $('#password').val();

    if (login == "vendas" && senha == "123") {
        window.document.location = "./vendas.html";
    }
    else if (login == "mkt" && senha == "123") {
        window.document.location = "./marketing.html";
    }
    else if (login == "rh" && senha == "123") {
        window.document.location = "./rh.html";
    }
    else if (login == "financeiro" && senha == "123") {
        window.document.location = "./financeiro.html";
    }
    else if (login != "petbox" && senha != "123") {
        alert("Login Inválido")
        return
    }

});


function SelecionaServer()
{
    var radioValue = $("input[name='customRadio']:checked").val();

    if (radioValue == null) {
        alert("Selecione o servidor.")
        return;
    }
    else if (radioValue == "heroku") {
        sessionStorage.setItem("server", "https://petbox-api.herokuapp.com/")
    } else {
        sessionStorage.setItem("server", "http://localhost:8080/")
    }
}