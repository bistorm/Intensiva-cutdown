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
			debugger;
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

			clearInterval(intervalo);
		}

	}, 1000);
})

