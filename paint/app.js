const colores_paleta = document.getElementsByClassName("color_paleta");
const span_color_seleccionado = document.getElementById(
  "span_color_seleccionado"
);
const zona_dibujo = document.getElementById("zonadibujo");
const td_estado_paleta = document.getElementById("estado_paleta");
const default_color = document.getElementById("defaultColor");
const btnReset = document.getElementById("btnreset");
td_estado_paleta.textContent = "PINCEL DESACTIVADO";

let color_seleccionado;
let td_paleta_seleccionado;
let td_anterior_paleta_selccionado = default_color;
let estadoPincel = false;
let celdas = [];

const ALTURA_ZONA_DIBUJO = 50;
const ANCHO_ZONA_DIBUJO = 90;
//Generar bucle 32x32
const generarCuadricula = () => {
  var table = document.createElement("table");
  for (var i = 0; i < ALTURA_ZONA_DIBUJO; i++) {
    var tr = document.createElement("tr");
    tr.style.margin = "0";
    tr.style.display = "flex";
    tr.style.border = "unset";
    for (var j = 0; j < ANCHO_ZONA_DIBUJO; j++) {
      var td = document.createElement("td");
      td.classList.add("celda");
      tr.appendChild(td);
      celdas.push(td);
    }
    table.appendChild(tr);
  }
  zona_dibujo.appendChild(table);
};

zona_dibujo.addEventListener("click", () => {
  if (!estadoPincel) {
    estadoPincel = true;
    td_estado_paleta.textContent = "PINCEL ACTIVADO";
  } else {
    estadoPincel = false;
    td_estado_paleta.textContent = "PINCEL DESACTIVADO";
  }
});

const eventoCeldas = () => {
  celdas.forEach((celda) => {
    celda.addEventListener("mousemove", () => {
      if (estadoPincel) {
        celda.style.backgroundColor = color_seleccionado;
      } else {
        return;
      }
    });
  });
};

const cambiarColorPaleta = () => {
  for (let paleta of colores_paleta) {
    paleta.addEventListener("click", (e) => {
      td_paleta_seleccionado = e.target;
      if (td_anterior_paleta_selccionado != null) {
        td_anterior_paleta_selccionado.classList.remove("paletaseleccionada");
      }
      td_anterior_paleta_selccionado = td_paleta_seleccionado;
      td_paleta_seleccionado.classList.add("paletaseleccionada");
      color_seleccionado = e.target.dataset.color;
      span_color_seleccionado.style.backgroundColor = color_seleccionado;
    });
  }
};

btnReset.addEventListener("click", () => {
  celdas.forEach((celda) => {
    celda.style.backgroundColor = "white";
  });
});

/*
btnReset.addEventListener('click', ()=>{
  zona_dibujo.removeChild(zona_dibujo.childNodes[1]); //Eliminamos al segundo nodo
  celdas = []; //resetamos la variable celdas
  generarCuadricula();
  eventoCeldas(); //Y volvemos a realizar la funcion para crear cuadricula
 
})
*/
generarCuadricula();
eventoCeldas();
cambiarColorPaleta();

//Resetear zona dibujo con funcion
