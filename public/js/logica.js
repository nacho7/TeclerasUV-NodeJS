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
            var element3 = document.createElement("input");
            var cell4 = row.insertCell(3);
            element3.type="hidden";
            element3.name="correctas";
            element3.value="0";
            cell4.appendChild(element3);
 
 
        }

 
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

function correcta(){
    var correcta= document.getElementsByName("rad");
    for(i in correcta){
        if(correcta[i].checked){
            document.getElementsByName("correctas")[i].value="1"
        }
    }
    }
    


