$(document).ready(function(){ 

	setDataTableMedicos();

	$("#btn-add-medico").on('click',function(e){
		e.preventDefault();
		registrarNuevoMedico();
	});

	switch_on_off('input-male', 'input-female');

	setInputPlugins();
});

function openMedicos(){
	window.location.href = "?op=Medicos/index";
}

function setInputPlugins(){
	$("#cell_input").inputmask({
		"mask" : "(9999)-9999999"
	});
	$("#fec_nac").bootstrapMaterialDatePicker({
		"format" : "DD/MM/YYYY",
		"time"   : false
	});
	$("#fec_nac").inputmask({
		"mask":"99/99/9999"
	});
}


function setDataTableMedicos(){
	$.ajax({
		"url"      : "?op=Medicos/dataTableMedicos",
		"method"   : "POST",
		beforeSend : function(){
		},
		success    : function(data){
			$("#datatable-container").html(data);
			$("#table-medicos").dataTable();
		}
	})
}

function openNewMedico(){
	window.location.href = "?op=Medicos/nuevo";
}

function getCheckedValue(){
	return document.querySelector('input[type=checkbox]:checked').value;
}

function eliminarMedico(id){
	$.post('?op=Medicos/eliminarMedico',{"id":id},function(resp){
		if(resp == '1'){
			swal({
				"title" : "Listo !",
				"text"  : "Operacion Realizada con Exito !",
				"type"  : "success"
			});
			setDataTableMedicos();
		}else{
			swal({
				"title" : "Oop´s",
				"text"  : "Error al Realizar Operacion",
				"type"  : "error"
			});
		}
	});
}

function formEditar(id){
	window.location.href="?op=Medicos/editar&cod="+id;
}

function editarMedico(id){
	$.ajax({
		"method" : "POST",
		"url"    :  "?op=Medicos/editarMedico",
		"data"   : {
			"id"    : id,
			"nom" 	: $("#nom").val(),
			"ape" 	: $("#ape").val(),
			"ced" 	: $("#ced_ide").val(),
 			"cell"  : $("#cell_input").val(),
			"mail"  : $("#email").val(),
			"sex" 	: getCheckedValue(),
			"nac" 	: $("#fec_nac").val(),
 			"dir" 	: $("#dir").val(),
 			"user" 	: $("#username").val(),
 			"pass" 	: $("#password").val(),
 			"rol" 	: $("#rol").val()
		},
		success     : function(resp){
			console.log(resp);
		}
	});
}

function registrarNuevoMedico(){
	$.ajax({
		"method" : "POST",
		"url"    : "?op=Medicos/newMedico",
		"data"   : {
			"nom" 	: $("#nom").val(),
			"ape" 	: $("#ape").val(),
			"ced" 	: $("#ced_ide").val(),
 			"cell"  : $("#cell_input").val(),
			"mail"  : $("#email").val(),
			"sex" 	: getCheckedValue(),
			"nac" 	: $("#fec_nac").val(),
 			"dir" 	: $("#dir").val(),
 			"user" 	: $("#username").val(),
 			"pass" 	: $("#password").val(),
 			"rol" 	: $("#rol").val()
		},
		beforeSend : function(){
			setBsAlert('al',true,'primary','Procesando...!');
		},
		success  : function(resp){
			console.log(resp);
			if(resp == "1"){
				swal({
					"title" : "Listo !",
					"type"   : "success",
					"text"   : "Operacion Realizada con Exito !"
				});
			}else if(resp == "duplicate"){
				swal({
					"title"  : "Oop´s",
					"type"   : "warning",
					"text"   : "El Medico ya se Encuentra Registrado"
				});
			}else{
				swal({
					"title"  : "Oop´s",
					"type"   : "danger",
					"text"   : "Error al Realizar la Operacion"
				});
			}
			$("#al").html(" ");
		},
	})
}