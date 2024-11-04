/*
console.log('app cargado')
console.log(JSON.parse(localStorage.getItem("datos")))
localStorage.setItem("dni3", "76546768P");
localStorage.setItem("dni3", "34262462");
*/
const tbodyContent = document.getElementById("tbodyContent");
const btnCrearRegistro = document.getElementById("btnCrearRegistro");
const btnActualizar = document.getElementById("btnActualizar");
const inputIdRegistro = document.getElementById("idActualizar");
const inputMatricula = document.getElementById("inputMatricula");
const inputModelo = document.getElementById("inputModelo");
const inputFecha = document.getElementById("inputFecha");
const inputPrecio = document.getElementById("inputPrecio");
const inputColor = document.getElementById("inputColor");
//-----------
const inputIdActualizar = document.getElementById("idActualizar");
const inputMatriculaActualizar = doument.getElementById(
  "inputActualizarMatricula"
);
const modeloActualizar = document.getElementById("modeloActualizar");
const precioActualizar = document.getElementById("precioActualizar");
const fechaActualizar = document.getElementById("fechaActualizar");
const colorActualizar = document.getElementById("colorActualizar");
if (!localStorage.getItem("data")) {
  var data = [
    {
      id: 0,
      matricula: "ABCD03545",
      modelo: "Mazda",
      fecha: "21-09-1997",
      color: "Azul",
      precio: "150000",
    },
    {
      id: 1,
      matricula: "54154545",
      modelo: "corsa",
      fecha: "21-09-1997",
      color: "rojo",
      precio: "3000",
    },
    {
      id: 2,
      matricula: "87869456",
      modelo: "skoda",
      fecha: "21-09-1997",
      color: "white",
      precio: "8555",
    },
  ];
  localStorage.setItem("data", JSON.stringify(data)); //SETEAMOS EL DATA PASANDOLO A JSON PARA EL LOCAL
}

const storeItem = () => {
  //Damos valor
  var matricula = inputMatricula.value;
  var precio = inputPrecio.value;
  var color = inputColor.value;
  var modelo = inputModelo.value;
  var fecha = inputFecha.value;

  if (
    matricula.length == 0 ||
    precio.length == 0 ||
    modelo.length == 0 ||
    fecha.length == 0 ||
    color.length == 0
  ) {
    alert("Debes completar todos los campos");
  }
  const datos = {
    //CREAMOS EL OBJETO
    id: Date.now().toString(), //PASAMOS A STRING
    matricula: matricula,
    precio: precio,
    color: color,
    fecha: fecha,
    modelo: modelo,
  };
  //Constante a json y local
  var data = JSON.parse(localStorage.getItem("data"));
  data.push(datos);
  localStorage.setItem("data", JSON.stringify(data));
  //Limpiamos
  clearInputsInsert();
  //Generamos fila con los datos
  generateRow(datos);
  alert("Registro insertado correctamente");
};
const updateItem = () => {
  if (inputIdActualizar.value == undefined || inputIdActualizar == "") {
    console.log("Falta el id");
    return;
  } else {
    const dataActualizar = {
      id: inputIdActualizar.value,
      matricula: inputMatricula.value,
      modelo: inputModelo.value,
      fecha: inputFecha.value,
      color: inputColor.value,
      precio: inputPrecio.value,
    };

    //Enviamos a json y local
    let data = JSON.parse(localStorage.getItem("data"));
    let newData = data.map((coche) => {
      //Creamos nuevo array para asignar
      if (coche.id == inputIdActualizar.value) {
        coche = dataActualizar;
        return { coche, ...dataActualizar }; //Spread operator
      }
      return coche;
    });
    localStorage.setItem("data", JSON.stringify(newData)); //Enviamos newdata

    document.getElementById("fila_" + inputIdActualizar.value).remove(); //Limpiar
    generateRow(dataActualizar);
    alert("Registro actualizado correctamente");
  }
};

btnActualizar.addEventListener("click", updateItem); //Listener con funcion actualizar
btnCrearRegistro.addEventListener("click", storeItem); //Listener con function create

const clearInputsInsert = (vehicle) => {
  inputIdRegistro.value = "";
  inputMatricula.value = "";
  inputModelo.value = "";
  inputFecha.value = "";
  inputColor.value = "";
};

const generateRow = (vehicle) => {
  var tr = document.createElement("tr");
  tr.id = "fila_" + vehicle.id;
  var tdId = document.createElement("td");
  tdId.textContent = vehicle.id;
  var tdMatricula = document.createElement("td");
  tdMatricula.textContent = vehicle.matricula;
  var tdModelo = document.createElement("td");
  tdModelo.textContent = vehicle.modelo;
  var tdPrecio = document.createElement("td");
  tdPrecio.textContent = vehicle.precio;
  var tdFecha = document.createElement("td");
  tdFecha.textContent = vehicle.fecha;
  var tdColor = document.createElement("td");
  tdColor.textContent = vehicle.color;
  var tdBorrar = document.createElement("td");
  //---------
  tr.appendChild(tdId);
  tr.appendChild(tdMatricula);
  tr.appendChild(tdModelo);
  tr.appendChild(tdFecha);
  tr.appendChild(tdPrecio);
  tr.appendChild(tdColor);
  //-------
  var tdEditar = document.createElement("td");
  var btnEditar = document.createElement("button");
  btnEditar.textContent = "EDITAR";
  //Pasamos props a boton
  //console.log(btnEditar.dataset)
  btnEditar.dataset.id = vehicle.id;
  btnEditar.dataset.matricula = vehicle.matricula;
  btnEditar.dataset.modelo = vehicle.modelo;
  btnEditar.dataset.precio = vehicle.precio;
  btnEditar.dataset.fecha = vehicle.fecha;
  btnEditar.dataset.color = vehicle.color;
  //Listener  Cogemos elementos y los valores los seteamos por parametro excepto el id;
  btnEditar.addEventListener("click", (e) => {
    document.getElementById("idActualizar").value = vehicle.id;
    //console.log(e.target.dataset)
    document.getElementById("modeloActualizar").value = e.target.dataset.modelo;
    document.getElementById("matriculaActualizar").value =
      e.target.dataset.matricula;
    document.getElementById("colorActualizar").value = e.target.dataset.color;
    document.getElementById("precioActualizar").value = e.target.dataset.precio;
    document.getElementById("fechaActualizar").value = e.target.dataset.fecha;
  });
  tdEditar.appendChild(btnEditar);

  var btnBorrar = document.createElement("button");
  btnBorrar.textContent = " BORRAR";
  btnBorrar.dataset.id = vehicle.id;
  btnBorrar.addEventListener("click", (e) => {
    var confirmacion = confirm("¿Estas seguro de eliminar?");
    if (confirmacion) {
      removeitem(e.target.dataset.id);
    }
  });

  tdBorrar.appendChild(btnBorrar);
  tr.appendChild(tdEditar);
  tr.appendChild(tdBorrar);
  tbodyContent.prepend(tr);
};
const removeItem = (id_vehicle) => {
  let data = JSON.parse(localStorage.getItem("data"));
  let newData = data.filter((coche) => coche.id != id_vehicle);
  localStorage.setItem("data", JSON.stringify(newData));
  document.getElementById("fila_ " + id_vehicle).remove();
  alert("Registro eliminado correctamente");
};

const getData = () => {
  var data = JSON.parse(localStorage.getItem("data"));
  if (data != null) {
    data.forEach((element) => {
      var tr = document.createElement("tr");
      tr.id = "fila_" + element.id;
      var tdId = document.createElement("td");
      tdId.textContent = element.id;
      var tdMatricula = document.createElement("td");
      tdMatricula.textContent = element.matricula;
      var tdFecha = document.createElement("td");
      tdFecha.textContent = element.fecha;
      var tdPrecio = document.createElement("td");
      tdPrecio.textContent = element.precio;
      var tdModelo = document.createElement("td");
      tdModelo.textContent = element.modelo;
      var tdColor = document.createElement("td");
      tdColor.textContent = element.color;
      var tdBorrar = document.createElement("td");
      tr.appendChild(tdId);
      tr.appendChild(tdMatricula);
      tr.appendChild(tdModelo);
      tr.appendChild(tdPrecio);
      tr.appendChild(tdFecha);
      tr.appendChild(tdColor);
      var tdEditar = document.createElement("td");
      var botonEditar = document.createElement("button");
      botonEditar.textContent = "Editar";
      botonEditar.dataset.id = element.id;
      botonEditar.dataset.matricula = element.matricula;
      botonEditar.dataset.modelo = element.modelo;
      botonEditar.dataset.fecha = element.fecha;
      botonEditar.dataset.precio = element.precio;
      botonEditar.dataset.color = element.color;

      botonEditar.addEventListener("click", (e) => {
        document.getElementById("idActualizarRegistro").value = element.id;
        document.getElementById("matriculaActualizar").value =
          e.target.dataset.matricula;
        document.getElementById("modeloActualizar").value =
          e.target.dataset.modelo;
        document.getElementById("precioActualizar").value =
          e.target.dataset.precio;
        document.getElementById("fechaActualizar").value =
          e.target.dataset.fecha;
        document.getElementById("colorActualizar").value =
          e.target.dataset.color;
      });
      tdEditar.appendChild(botonEditar);
      var buttonBorrar = document.createElement("button");
      buttonBorrar.textContent = "Borrar";
      buttonBorrar.dataset.id = element.id;
      buttonBorrar.addEventListener("click", (e) => {
        var confirmacion = confirm("¿Estas seguro de borrarlo?");
        if (confirmacion) {
          removeItem(e.target.dataset.id);
        }
      });
      tdBorrar.appendChild(buttonBorrar);
      tr.appendChild(tdEditar);
      tr.appendChild(tdBorrar);

      tbodycontent.appendChild(tr);
    });
  } else {
    console.error("No existe la key 'data' ");
  }
};

getData();
