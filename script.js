//CRUD= Create, Read, Update, Delete

//Global variables
var row = null;

function Submit(){
    var dataEntered = retrieveData(); //function
    var readData = readingDataFromLocalStorage(dataEntered); //in Dataentered retrieve data is stored so this variable is passed in it.
    console.log(readData);
    if (dataEntered == false){
        msg.innerHTML="Please Enter Data!";
    } else{
        if(row == null){
           insert(readData);
        msg.innerHTML = "Data Inserted!";
         } else{
             update();
        msg.innerHTML = "Data Updated!";
        }
    }
    document.getElementById("form").reset();

}


//CREATE
//Retrieving Data from Form
function retrieveData() {    //defining the function
    var name1 = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;

    //keep values in an array and return that array
    var arr = [name1,age,email];
    if (arr.includes("")) {
        return false;
    } else{
      return arr;
    }

}

//READ
//Data in Local Storage
function readingDataFromLocalStorage(dataEntered){
  //Storing data in Local storage[key,value]
  var n =localStorage.setItem("Name", dataEntered[0]);
  var a =localStorage.setItem("Age", dataEntered[1]);
  var e =localStorage.setItem("E-mail", dataEntered[2]);


  //Retrieving/getting Values from Local storage to table

  var n1 = localStorage.getItem("Name", n);
  var a1 = localStorage.getItem("Age", a);
  var e1 = localStorage.getItem("E-mail", e);

  var arr = [n1,a1,e1];
  return arr;
}

//INSERT THE VALUES
function insert(readData) {
    //Insert a Row in the Table
    var row =table.insertRow();  //InsertRow is used so that when refrencing the row, we dont have to write again and again
    row.insertCell(0).innerHTML = readData[0]; //Insert the Cells(InnerHtml Access the data)
    row.insertCell(1).innerHTML = readData[1];
    row.insertCell(2).innerHTML = readData[2]; //this is the parameter that referencing to current object(innerhtml).
    row.insertCell(3).innerHTML = `<button class="edit" onclick = edit(this)>Edit</button>
                                    <button class="update" onclick = remove(this)>Delete</button>`;


}

//EDIT
function edit(td){  //here td is value inside the column used to fetch the row
    row= td.parentElement.parentElement; // row here is storing the row element(td is Refrencing the cell value)
    document.getElementById("name").value = row.cells[0].innerHTML; //Cells are basically an array stored by default
    document.getElementById("age").value = row.cells[1].innerHTML;
    document.getElementById("email").value = row.cells[2].innerHTML;
}

//UPDATE
function update() {
    row.cells[0].innerHTML = document.getElementById("name").value;
    row.cells[1].innerHTML = document.getElementById("age").value;
    row.cells[2].innerHTML = document.getElementById("email").value;
    row = null;
}

//DELETE
function remove(td) {
    var ans = confirm("Are you sure to delete this record?")
    if(ans == true){
      row = td.parentElement.parentElement;
      document.getElementById("table").deleteRow(row.rowIndex);
    }
}