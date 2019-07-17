$(function () {
  let ope = "C";
  let selected_index = -1; // Inicia com o primeiro elemento
  let tblOngs = localStorage.getItem("tblOngs"); //Rertona os dados
  tblOngs = JSON.parse(tblOngs);
  if (tblOngs === null) // Se não tiver dados, inicializa vazio
    tblOngs = [];

  function Create() {
    //Transforma os dados de criação em string
    let Ong = JSON.stringify({
      Nome: $("#txtNome").val(),
      Slogan: $("#txtSlogan").val(),
      Link: $("#txtLink").val(),
      Ativo: $("#checkbox").val()
    });
    // Envia o dado para a Lista
    tblOngs.push(Ong);
    //Armazenar todos os dados no localStorage !! Ainda em teste !!
    localStorage.setItem("tblOngs", JSON.stringify(tblOngs));
    alert("Ong Criada com Sucesso"); //Caso crie uma Ong, aparece um 'alert' na tela do usuário
    return true;
  }

  function Edit() {
    // Edita o index selecionado !! Ainda em Teste !!
    tblOngs[selected_index] = JSON.stringify({
      Nome: $("#txtNome").val(),
      Slogan: $("#txtSlogan").val(),
      Link: $("#txtLink").val(),
      Ativo: $("#checkbox").val()
    });
    //Armazenar todos os dados no localStorage !! Ainda em teste !!
    localStorage.setItem("tblOngs", JSON.stringify(tblOngs));
    alert("Ong Editada com sucesso");
    return true;
  }

  function Delete() {
    //Deleta o elemento da lista, a partir de seu index
    tblOngs.splice(selected_index, 1);
    localStorage.setItem("tblOngs", JSON.stringify(tblOngs));
    alert("Ong Deletada com sucesso");
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
      "<thead>" +
      "<tr>" +
      "<th>Nome</th>" +
      "<th>Slogan</th>" +
      "<th>Link</th>" +
      "<th>Ativo</th>" +
      "<th>Configuração</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
    ); //Adiciona a tabela para estrutura HTML
    for (let i in tblOngs) {
      let cada = JSON.parse(tblOngs[i]);
      $("#tblList tbody").append("<tr>" + // class="tr" tentativa de mudar a cor quando ativo, !!conflito com w3CSS!!
        "<td>" + cada.Nome + "</td>" +
        "<td>" + cada.Slogan + "</td>" +
        "<td>" + cada.Link + "</td>" +
        "<td><input type='checkbox' class='box'>" + "</td>" +
        "<td><button alt=Edit" + i + "' class='btnEdit'>Editar</button>&nbsp|&nbsp<button onClick='window.location.reload();''  src='delete.png' alt='Delete" + i + "' class='btnDelete'>Remover</button></td>" +
        "</tr>"
      );
    }
  }

  $("#frmOng").bind("submit", function () {
    if (ope === "C")
      return Create();
    else
      return Edit();
  });
  List();

  $(".btnEdit").bind("click", function () {
    ope = "E";
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    let cada = JSON.parse(tblOngs[selected_index]);
    $("#txtNome").val(cada.Nome);
    $("#txtSlogan").val(cada.Slogan);
    $("#txtLink").val(cada.Link);
    $("#btnaddOng").click();

  });

  $(".btnDelete").bind("click", function () {
    selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
    Delete();
    List();
  });
  /*
  $('tr').on('change', function() {
  $('tr').toggleClass('add-red-color');
});*/
  $("input[type=checkbox]").each(function() {
    var name = $(this).attr('box');

    if (localStorage.getItem(name) == "true") {
      $(this).prop('checked', true);
    }
  });
/* Tentativa de salvar o checkbox:checked
  $('input[type=checkbox]').each(function() {
    var key = $(this).attr('box');
    var val = localStorage[key];
    if ( $(this).attr('box') == key && $(this).attr('value') == val ) {
      $(this).attr('checked', 'checked');
    }})*/ // PORÉM ESTÁ DEIXANDO TODOS COMO :CHECKED =(
});