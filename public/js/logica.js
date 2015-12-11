function goBack() {
	window.history.back()
}

function checkExt() {
	if(!document.getElementById("comprobarImagenes").value.length==0){
		if (!/.(gif|jpeg|jpg|png)$/i.test(document.getElementById("comprobarImagenes").value)){
			alert('Comprueba la extensión de tus imagenes, recuerda que los formatos aceptados son .gif, .jpeg, .jpg y .png');
			document.getElementById("comprobarImagenes").focus();
		return false;
		}
	}
}
// function agregar() {
 
//             var table = document.getElementById("tableId");
 
//             var rowCount = table.rows.length;
//             var row = table.insertRow(rowCount);
//             var cell1 = row.insertCell(0);
//             var cell2 = row.insertCell(1);
//             var cell3 = row.insertCell(2);
//             var respuesta = prompt("Por favor, ingrese una respuesta", "");
//             cell1.innerHTML=respuesta;
//             cell1.setAttribute("id","cell1")
//             cell2.innerHTML = '<input type="radio" name="radio" id="">';
//             cell3.innerHTML='<input type="checkbox" name="checkbox" id="">';
           
 
 
//         }
function agregar() {
            
           
            var table = document.getElementById("tableId");
 
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
            var cell1 = row.insertCell(0);
            var element0 = document.createElement("input");
            element0.type = "text";
            element0.name = "respuesta";
            cell1.appendChild(element0);
            var cell2 = row.insertCell(1);
            var element1 = document.createElement("input");
            element1.type = "radio";
            element1.name="rad";
            cell2.appendChild(element1);
            var cell3 = row.insertCell(2);
            var element2 = document.createElement("input");
            element2.type = "checkbox";
            element2.name = "check";
            cell3.appendChild(element2);

 
 
        }

 


// function quitar() {
//     var table = document.getElementById("tableId");
//     var rowCount = table.rows.length;
// 	if(rowCount > 1){
// 		document.getElementById("tableId").deleteRow(rowCount-1);	
// 	}else{
// 		alert("Esta fila no se puede eliminar");
// 	}
// }
  function quitar() {
            try {
            var table = document.getElementById("tableId");
            var rowCount = table.rows.length;
 
            for(var i=0; i<rowCount; i++) {
                var row = table.rows[i];
                var chkbox = row.cells[2].childNodes[0];
                if(null != chkbox && true == chkbox.checked) {
                    table.deleteRow(i);
                    rowCount--;
                    i--;
                }
 
 
            }
            }catch(e) {
                alert(e);
            }
        }
function editar(){
    var respuesta = prompt("Por favor, ingrese una respuesta", "");
    document.getElementById("cell1").innerHTML = respuesta;
}

