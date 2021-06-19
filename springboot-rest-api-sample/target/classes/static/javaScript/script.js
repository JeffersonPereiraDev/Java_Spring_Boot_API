
function pesquisarUser() {

	var nome = $('#nameBusca').val();

	if (nome != null & nome.trim() != '') {
		$.ajax({
			method: "GET",
			url: "buscarPorNome",
			data: "name=" + nome,
			success: function(response) {
				$('#tabelaResultados > tbody > tr').remove();

				for (var i = 0; i < response.length; i++) {
					$('#tabelaResultados > tbody').append('<tr id="' + response[i].id + '"><td>' + response[i].id + '</td><td>' + response[i].nome + '</td><td>' + response[i].idade + '</td><td><button type="button" onclick="colocarEmEdicao(' + response[i].id + ')" class="btn btn-outline-primary">Editar</button></td><td><button type="button" class="btn btn-outline-danger" onclick= "deleteUser(' + response[i].id + ')">Deletar</button></td></tr>');
				}
			}
		}).fail(function(xhr, status, errorThrwon) {
			alert("Erro ao salvar:" + xhr.responseText);
		});
	}
}


function colocarEmEdicao(id) {
	$.ajax({
		method: "GET",
		url: "buscaruserid",
		data: "iduser=" + id,
		success: function(response) {
			$("#id").val(response.id);
			$("#nome").val(response.nome);
			$("#idade").val(response.idade);

			$('#modalPesquisar').modal('hide');
		}
	}).fail(function(xhr, status, errorThrwon) {
		alert("Erro ao buscar o usuario por id:" + xhr.responseText);
	});
}

function deleteUser(id) {

	if (confirm('Deseja realmente deletar?')) {
		$.ajax({
			method: "DELETE",
			url: "delete",
			data: "iduser=" + id,
			success: function(response) {
				$('#' + id).remove();
				alert(response);
			}
		}).fail(function(xhr, status, errorThrwon) {
			alert("Erro ao deletar o usuario por id:" + xhr.responseText);
		});
	}
}

function deletarDaTela() {
	var id = $('#id').val();
	if (id != null && id.trim() != '') {
		deleteUser(id);
		document.getElementById('formCadastro').reset();
	}
}

function salvarUsuario() {

	var id = $("#id").val();
	var nome = $("#nome").val();
	var idade = $("#idade").val();

	if (nome == null || nome != null && nome.trim() == '') {
		alert('Informe um nome');
		$("#nome").focus();
		return;
	}
	if (idade == null || idade != null && idade.trim() == '') {
		alert('Informe a idade');
		$("#idade").focus();
		return;
	}

	$.ajax({
		method: "POST",
		url: "salvar",
		data: JSON.stringify({ id: id, nome: nome, idade: idade }),
		contentType: "application/json; charset-utf-8",
		success: function(response) {
			$("#id").val(response.id);
			alert("Salvo com sucesso!");
		}
	}).fail(function(xhr, status, errorThrwon) {
		alert("Erro ao salvar:" + xhr.responseText);
	});
}