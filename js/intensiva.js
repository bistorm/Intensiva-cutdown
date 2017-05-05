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
		//funcion: "",
		activo: false,
		desactivado: false,
		bloqueado: false,
	});

	var boton_aceptar = new crear_boton({
		tipo: "btn-default",	
		tamano: "btn-sm",
		contenido: "Aceptar",
		//funcion: "",
		activo: false,
		desactivado: false,
		bloqueado: false,
	});

	var botones_panel = new distribuir_botones([boton_cancelar,boton_aceptar]);

	//Opciones de configuración

	var mes_1 = new crear_opcion_select({
		contenido: "Enero",
		valor: "1",
	})

	var seleccionar_mes = new crear_componente_select({
		etiqueta: "",
		id: "",
		nombre: "",
		clases: [],
		prop: "",
		multiple: false,
		opciones: [mes_1],
	})

	var formulario_configuracion = new crear_formulario({
		tipo: "inline", //inline, horizontal
		componentes: [seleccionar_mes],
	});

	//Generación del panel

	var panel = new crear_panel_flotante({
		panel_tipo: "panel-primary",
		cabecera: "Configuración",
		contenido: formulario_configuracion.texto_html,
		pie: botones_panel.texto_html,
	});

	$("body").append(panel.texto_html);
}

