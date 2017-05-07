$(document).ready(function(){
	var intervalo = setInterval(function(){ 
		var date_actual = new Date();
		var date_intensiva = new Date("June 16, 2017 14:30:00");
		var segundos_restantes = Math.round((date_intensiva.getTime() - date_actual.getTime())/1000);

		$("#contador").html(segundos_restantes);
		//var segundos_restantes = 0;
		$("#contador").html(segundos_restantes);

		if(segundos_restantes <= 0)
		{
			mostrar_panel_error();
			clearInterval(intervalo);
		}

	}, 1000);

	añadir_opcion_configuracion();

})

function añadir_opcion_configuracion()
{
	var boton_config = new crear_boton({
		tipo: "btn-default",	
		tamano: "btn-sm",
		id: "boton_config",
		contenido: "<span class='glyphicon glyphicon-wrench' aria-hidden='true'></span> Configuración",
		funcion: "mostrar_panel_config()",
		activo: false,
		desactivado: false,
		bloqueado: false,
	});

	$("body").append(boton_config.texto_html);
}

function mostrar_panel_error()
{
	var boton_salir = new crear_boton({
		tipo: "btn-default",	
		tamano: "btn-sm",
		contenido: "Salir",
		//funcion: "",
		activo: false,
		desactivado: false,
		bloqueado: false,
	});

	var boton_ignorar = new crear_boton({
		tipo: "btn-default",	
		tamano: "btn-sm",
		contenido: "Ignorar",
		//funcion: "",
		activo: false,
		desactivado: false,
		bloqueado: false,
	});

	var botones_panel = new distribuir_botones([boton_salir,boton_ignorar]);

	var panel = new crear_panel_flotante({
		panel_tipo: "panel-danger",
		cabecera: "ERROR",
		contenido: "<p>Intensiva != NULL</p>",
		pie: botones_panel.texto_html,
	});

	$("body").append(panel.texto_html);
}

function mostrar_panel_config()
{

	//Botones del panel 

	var boton_cancelar = new crear_boton({
		tipo: "btn-default",	
		tamano: "btn-sm",
		contenido: "Cancelar",
		funcion: "borrar_panel('panel_configuracion')",
		activo: false,
		desactivado: false,
		bloqueado: false,
	});

	var boton_aceptar = new crear_boton({
		tipo: "btn-default",	
		tamano: "btn-sm",
		contenido: "Aceptar",
		funcion: "borrar_panel('panel_configuracion')",
		activo: false,
		desactivado: false,
		bloqueado: false,
	});

	var botones_panel = new distribuir_botones([boton_cancelar,boton_aceptar]);

	//Opciones de configuración

	var arr_nombre_meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	var arr_obj_meses = [];

	for(var i = 0; i<arr_nombre_meses.length; i++)
	{
		var mes = new crear_opcion_select({
			contenido: arr_nombre_meses[i],
			valor: i,
		});

		arr_obj_meses.push(mes);
	}

	var seleccionar_mes = new crear_componente_select({
		etiqueta: "Mes",
		id: "select_mes",
		opciones: arr_obj_meses,
	});

	var formulario_configuracion = new crear_formulario({
		tipo: "horizontal", //inline, horizontal
		componentes: [seleccionar_mes],
	});

	//Generación del panel

	var panel = new crear_panel_flotante({
		panel_tipo: "panel-primary",
		cabecera: "Configuración",
		panel_id:"panel_configuracion",
		contenido: "<p>Día de inicio de la jornada intensiva</p>"+formulario_configuracion.texto_html,
		pie: botones_panel.texto_html,
	});

	$("body").append(panel.texto_html);
}

