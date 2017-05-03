
/////////////////////////////////////////////////////////////
/////////////////////// G E N E R A L ///////////////////////
/////////////////////////////////////////////////////////////

function de_array_a_string(arr)
{
	var str = "";
	var i = 0;

	if(arr != undefined)
	{
		for(i=0;i<arr.length;i++)
		{
			str += arr[i];
		}
	}

	return str;
}

function añadir_id(id)
{
	var id_str = "";

	if(id != undefined)
	{
		id_str = "id="+id;
	}

	return id_str;
}

function añadir_tipo(tipo)
{
	var tipo_str = "";

	if(tipo != undefined)
	{
		tipo_str = "type="+tipo;
	}

	return tipo_str;
}

function añadir_nombre(nombre)
{
	var nombre_str = "";

	if(nombre != undefined)
	{
		nombre_str = "name="+nombre;
	}

	return nombre_str;
}

function añadir_clases(clases)
{
	var clases_str = "";
	var i = 0;

	if(clases != undefined && clases.length > 0)
	{
		for(i=0;i<clases.length;i++)
		{
			clases_str += " "+clases[i];
		}
	}

	return clases_str;
}

function añadir_clases_y_etiqueta(clases)
{
	var clases_str = "";
	var i = 0;

	if(clases != undefined && clases.length > 0)
	{
		for(i=0;i<clases.length;i++)
		{
			clases_str += " "+clases[i];
		}
		clases_str = "class='"+clases_str+"'";
	}

	return clases_str;
}

function añadir_evento_click(funcion)
{
	var str = "";

	if(funcion != undefined)
	{
		str = "onclick="+funcion;
	}

	return str;
}

/////////////////////////////////////////////////////////////
/////////////////////// P A N E L E S ///////////////////////
/////////////////////////////////////////////////////////////

/*var panel = 
{
	panel_id: "",
	panel_clases: [],
	panel_tipo: "",

	cabecera: "",
	contenido: "",
	pie: "",

	cabecera_id: "",
	contenido_id: "",
	pie_id: "",

	cabecera_clases: [],
	contenido_clases: [],
	pie_clases: [],
}*/

function crear_panel(panel)
{
	this.panel_tipo = panel.panel_tipo || "panel-default";
	this.cabecera = panel.cabecera;
	this.contenido = panel.contenido;
	this.pie = panel.pie;
	this.panel_id = panel.panel_id;
	this.cabecera_id = panel.cabecera_id;
	this.contenido_id = panel.contenido_id;
	this.pie_id = panel.pie_id;
	this.panel_clases = panel.panel_clases;
	this.cabecera_clases = panel.cabecera_clases;
	this.contenido_clases = panel.contenido_clases;
	this.pie_clases = panel.pie_clases;

	this.panel_prop = panel.panel_prop || "";
	this.cabecera_prop = panel.cabecera_prop || "";
	this.contenido_prop = panel.contenido_prop || "";
	this.pie_prop = panel.pie_prop || "";


	this.panel_id_str = añadir_id(this.panel_id);
	this.cabecera_id_str = añadir_id(this.cabecera_id);
	this.contenido_id_str = añadir_id(this.contenido_id);
	this.pie_id_str = añadir_id(this.pie_id);

	this.panel_clases_str = añadir_clases(this.panel_clases);
	this.cabecera_clases_str = añadir_clases(this.cabecera_clases);
	this.contenido_clases_str = añadir_clases(this.contenido_clases);
	this.pie_clases_str = añadir_clases(this.pie_clases);


	this.texto_html = "<div class='panel "+this.panel_tipo+" "+this.panel_clases_str+"' "+this.panel_id_str+" "+this.panel_prop+">";

	if(this.cabecera != undefined)
	{
		this.texto_html += "<div class='panel-heading"+this.cabecera_clases_str+"' "+this.cabecera_id_str+" "+this.cabecera_prop+">"+this.cabecera+"</div>";
	}

	if(this.contenido != undefined)
	{
		this.texto_html += "<div class='panel-body"+this.contenido_clases_str+"' "+this.contenido_id_str+" "+this.contenido_prop+">"+this.contenido+"</div>";
	}

	if(this.pie != undefined)
	{
		this.texto_html += "<div class='panel-footer"+this.pie_clases_str+"' "+this.pie_id_str+" "+this.pie_prop+">"+this.pie+"</div>";
	}
	
	this.texto_html += "</div>";
}

function borrar_panel(panel_id)
{
	$("#"+panel_id).remove();
}

function crear_panel_flotante(panel)
{
	this.panel = panel;

	this.panel.panel_clases = this.panel.panel_clases || [];
	this.panel.cabecera_clases = this.panel.cabecera_clases || [];
	this.panel.contenido_clases = this.panel.contenido_clases || [];

	this.panel.panel_clases.push("panel_flotante");
	this.panel.contenido_clases.push("panel_flotante_contenido");
	this.panel.cabecera_clases.push("panel_flotante_cabecera");
	this.panel.cabecera_prop += " onmousedown=comienzo_movimiento($(this));";

	this.panel_flotante = new crear_panel (this.panel);

	this.texto_html = this.panel_flotante.texto_html;
}

//Funciones de movimiento de paneles

function comienzo_movimiento (panel_header){
	var panel_position = panel_header.parent().position();
	var panel = panel_header.parent();

	//Obtener posición del cursor
	cursorComienzoX=window.event.clientX;
	cursorComienzoY=window.event.clientY;

	$(document).mousemove( function(){ en_movimiento(panel_position, panel) });

	$(document).mouseup( function(){ fin_movimiento() });
}

function en_movimiento (panel_position, panel){
	var actual_X = window.event.clientX; 
	var actual_Y = window.event.clientY;

	nueva_posicion_X = panel_position.left + actual_X - cursorComienzoX;
	nueva_posicion_Y = panel_position.top + actual_Y - cursorComienzoY;

	panel.offset({
		top:nueva_posicion_Y,
		left:nueva_posicion_X
	});

}

function fin_movimiento (){
	$(document).unbind("mousemove");
	$(document).unbind("mouseup");
}


/////////////////////////////////////////////////////////////
/////////////////////// B O T O N E S ///////////////////////
/////////////////////////////////////////////////////////////

/*var boton = 
{
	tipo: "",			//btn, btn-default, btn-primary, btn-success, btn-info, btn-warning, btn-danger, btn-link
	tamano: "",			//btn-lg, btn-md, btn-sm, btn-xs
	contenido: "",
	id: "",
	clases: [],
	funcion: "",
	activo: false,
	desactivado: false,
	bloqueado: false,
}*/

function crear_boton(boton)
{
	this.tipo = boton.tipo;
	this.tamano = boton.tamano;
	this.contenido = boton.contenido;
	this.id = boton.id;
	this.clases = boton.clases || [];
	this.funcion = boton.funcion;
	this.activo = boton.activo;
	this.desactivado = boton.desactivado;

	if(this.tipo != undefined)
	{
		this.clases.push(this.tipo);
	}

	if(this.activo === true)
	{
		this.clases.push("active");
	}

	if(this.desactivado === true)
	{
		this.clases.push("disabled");
	}

	if(this.bloqueado === true)
	{
		this.clases.push("btn-block");
	}

	if(this.tamano != undefined)
	{
		this.clases.push(this.tamano);
	}

	this.id_str = añadir_id(this.id);
	this.clases_str = añadir_clases(this.clases);
	this.evento_click = añadir_evento_click(this.funcion);

	this.texto_html = "<button type='button' class='btn"+this.clases_str+"' "+this.id_str+" "+this.evento_click+">"+this.contenido+"</button>";

}

function distribuir_botones(arr_botones)
{
	this.arr_botones = arr_botones;
	this.arr_obj_botones = [];
	this.texto_html = "<div class='container-fluid'><table class='col-xs-12'><tr>";

	var i = 0;

	for (i = 0; i < this.arr_botones.length; i++) 
	{
		this.arr_botones[i].clases = this.arr_botones[i].clases || [];
	}

	for (i = 0; i < this.arr_botones.length; i++) 
	{
		if(i === 0)
		{
			this.texto_html += "<th class='text-left'>";
		}
		else if (i === this.arr_botones.length - 1)
		{
			this.texto_html += "<th class='text-right'>";
		}
		else
		{
			this.texto_html += "<th class='text-center'>";
		}
		this.arr_obj_botones[i] = new crear_boton (this.arr_botones[i]);
		this.texto_html += this.arr_obj_botones[i].texto_html;
		this.texto_html += "</th>";
	}

	this.texto_html += "</tr></table></div>";
}

/////////////////////////////////////////////////////////////
/////////////////// F O R M U L A R I O S ///////////////////
/////////////////////////////////////////////////////////////

var formulario = 
{
	tipo: "", //inline, horizontal
	id: "",
	clases: [],
	leyenda: "",
	componentes: [],
}

var componente_input =
{
	etiqueta: "",
	input_id: "",
	input_nombre: "",
	input_clases: [],
	input_prop: "",
	tipo: "",
}

function crear_formulario(formulario)
{

	var i = 0;

	this.tipo = formulario.tipo || "";
	this.id = formulario.id;
	this.clases = formulario.clases || [];
	this.componentes = formulario.componentes || [];
	this.leyenda = formulario.leyenda;

	if(this.tipo.length > 0)
	{
		this.tipo = "form-"+this.tipo;
		this.clases.push(this.tipo);
	}

	this.id_str = añadir_id(this.id);
	this.clases_str = añadir_clases(this.clases);

	this.componentes_str = "";

	for(i=0; i<this.componentes.length; i++)
	{
		switch(this.componentes[i].tipo)
		{
			case "file":
				this.componentes_str += new crear_componente_input (this.componentes[i]).texto_html;
			break;
		}	
	}

	this.texto_html = "<form class='"+this.clases_str+"' "+this.id_str+">";
	if(this.leyenda != undefined)
	{
		this.texto_html += "<legend>"+this.leyenda+"</legend>";
	}
	this.texto_html += this.componentes_str+"</form>";
}

function crear_componente_input(componente_input)
{
	this.etiqueta = componente_input.etiqueta;
	this.input_id = componente_input.input_id;
	this.input_nombre = componente_input.input_nombre;
	this.input_clases = componente_input.input_clases || [];
	this.tipo = componente_input.tipo;
	this.input_prop = componente_input.input_prop || "";

	this.input_id_str = añadir_id(this.input_id);
	this.input_clases_str = añadir_clases(this.input_clases);
	this.input_nombre_str = añadir_nombre(this.input_nombre);
	this.tipo_str = añadir_tipo(this.tipo);

	this.texto_html = "<div class='form-group'>";
	if(this.etiqueta != undefined)
	{
		this.texto_html += "<label class='col-md-4 control-label' for='"+this.input_id+"'>"+this.etiqueta+"</label>";
	}
	this.texto_html += "<div class='col-md-4'>";
	this.texto_html += "<input "+this.input_id_str+" "+this.input_nombre_str+" class='"+this.input_clases_str+"' "+this.tipo_str+" "+this.input_prop+">";
	this.texto_html += "</div> </div>";
}

/////////////////////////////////////////////////////////////
//////////////////////// T A B L A S ////////////////////////
/////////////////////////////////////////////////////////////

var tabla = {
	tipo: "", //table, table-striped, table-bordered, table-hover, table-condensed
	tabla_id: "",
	tabla_clases: [],
	tabla_prop: "",
	
	cabecera_id: "",
	cabecera_clases: [],
	cabecera_prop: "",

	cuerpo_id: "",
	cuerpo_clases: [],
	cuerpo_prop: "",

	cabecera: "",
	cuerpo: "",
}

function crear_tabla(tabla)
{
	tabla = tabla || {};
	this.tipo = tabla.tipo || "";
	this.tabla_id = tabla.tabla_id;
	this.tabla_clases = tabla.tabla_clases;
	this.tabla_prop = tabla.tabla_prop || "";
	this.cabecera_id = tabla.cabecera_id;
	this.cabecera_clases = tabla.cabecera_clases;
	this.cabecera_prop = tabla.cabecera_prop || "";
	this.cuerpo_id = tabla.cuerpo_id;
	this.cuerpo_clases = tabla.cuerpo_clases;
	this.cuerpo_prop = tabla.cuerpo_prop || "";
	this.cabecera  = tabla.cabecera || "";
	this.cuerpo = tabla.cuerpo || "";

	this.tabla_id_str = añadir_id(this.tabla_id);
	this.cabecera_id_str = añadir_id(this.cabecera_id);
	this.cuerpo_id_str = añadir_id(this.cuerpo_id);

	this.tabla_clases_str = añadir_clases(this.tabla_clases);
	this.cabecera_clases_str = añadir_clases_y_etiqueta(this.cabecera_clases);
	this.cuerpo_clases_str = añadir_clases_y_etiqueta(this.cuerpo_clases);

	this.texto_html = "<table "+this.tabla_id_str+" class='table "+this.tipo+" "+this.tabla_clases_str+"' "+this.tabla_prop+">";
	this.texto_html += "<thead "+this.cabecera_id_str+" "+this.cabecera_clases_str+" "+this.cabecera_prop+">"+this.cabecera+"</thead>";
	this.texto_html += "<tbody "+this.cuerpo_id_str+" "+this.cuerpo_clases_str+" "+this.cuerpo_prop+">"+this.cuerpo+"</tbody>";
	this.texto_html += "</table>";
}

var fila = {
	tipo: "", //cabecera, cuerpo
	id: "",
	clases: [],
	prop: "",
	columnas: [],
}

var celda = {
	tipo: "", //cabecera, cuerpo
	id: "",
	clases: [],
	prop: "",
	texto: "",
}

function crear_fila (fila)
{
	fila = fila || {};
	this.tipo = fila.tipo || "cuerpo";
	this.id = fila.id;
	this.clases = fila.clases;
	this.prop = fila.prop || "";
	this.columnas = fila.columnas || [];

	this.id_str = añadir_id(this.id);
	this.clases_str = añadir_clases_y_etiqueta(this.clases);

	this.columnas_str = de_array_a_string(this.columnas);
}

function crear_celda (celda)
{
	celda = celda || {};
	this.tipo = celda.tipo || "cuerpo";
	this.id = celda.id;
	this.clases = celda.clases;
	this.prop = celda.prop  || "";
	this.texto = celda.texto;

	this.id_str = añadir_id(this.id);
	this.clases_str = añadir_clases_y_etiqueta(this.clases);

	if(this.tipo === "cuerpo")
	{
		this.etiqueta_html = "td";
	}
	else if(this.tipo === "cabecera")
	{
		this.etiqueta_html = "th";
	}
}

function añadir_celda_a_fila(fila,celda)
{
	var texto_html = "<"+celda.etiqueta_html+" "+celda.id_str+" "+celda.clases_str+" "+celda.prop+">"+celda.texto+"</"+celda.etiqueta_html+">";

	fila.columnas.push(texto_html);
	fila.columnas_str += texto_html;
}

function añadir_fila_a_tabla(tabla,fila)
{
	var texto_html = "<tr "+fila.id_str+" "+fila.clases_str+" "+fila.prop+">"+fila.columnas_str+"</tr>";

	if(fila.tipo === "cabecera")
	{
		tabla.cabecera += texto_html;
	}
	else
	{
		tabla.cuerpo += texto_html;
	}
}


