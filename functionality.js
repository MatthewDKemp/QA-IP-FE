function formVisibility(toShow,toHide1,toHide2){
    document.getElementById(toShow).style.visibility="visible";
    document.getElementById(toHide1).style.visibility="hidden";
    document.getElementById(toHide2).style.visibility="hidden";
    readRecords();
    clearForm();
}

function clearForm(){  
    let form=document.getElementById("addFrm");
    for (let info of form){
            info.value="";
    } 
}


function createRecord(form){
    let record ={};
    for (let info of form){
        if(info.id){
            record[info.id]=info.value;
        }
    }
    
    record=JSON.stringify(record);
    let request=new XMLHttpRequest();
    request.open("POST","http://"+location.hostname+":8081/passenger")
    request.setRequestHeader("Content-Type","application/json");
    request.onload=function(){
        readRecords();
    }
    request.send(record);
}


function readRecords(){    
    let request=new XMLHttpRequest();
    request.open("GET","http://"+location.hostname+":8081/passenger")
    request.setRequestHeader("Content-Type","application/json");
    request.onload=function(){
        populateTable(JSON.parse(request.response));
    }
    request.send();
}

function populateTable(jsData){
    let table=document.getElementById("customerTable");
    table.innerHTML="";
    for(let passenger of jsData){   
        let tablerow=document.createElement("tr");
        let firstName= document.createElement("td");
        let surname= document.createElement("td");
        let dob= document.createElement("td");
        let email= document.createElement("td");
        let phone= document.createElement("td");
        let buttons=document.createElement("td");
        let updateBtn=document.createElement("button");
        let deleteBtn=document.createElement("button");
        let bookingsBtn=document.createElement("button");

        updateBtn.style.margin="2%";
        deleteBtn.style.margin="2%";
        bookingsBtn.style.margin="2%";

        buttons.appendChild(updateBtn);
        buttons.appendChild(deleteBtn);
        buttons.appendChild(bookingsBtn);

        let date = new Date(passenger.dob);
        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear();
        let dateoutput=(d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;

        firstName.innerHTML = passenger.fname;
        surname.innerHTML = passenger.lname;
        dob.innerHTML = dateoutput;
        email.innerHTML = passenger.email;
        phone.innerHTML = passenger.phone;
        updateBtn.innerHTML="Update";
        deleteBtn.innerHTML="Delete";
        bookingsBtn.innerHTML="Bookings";

        tablerow.appendChild(firstName);
        tablerow.appendChild(surname);
        tablerow.appendChild(dob);
        tablerow.appendChild(email);
        tablerow.appendChild(phone);
        tablerow.appendChild(buttons);

        tablerow.style.verticalAlign="middle";

        table.appendChild(tablerow);
        
        updateBtn.onclick=function(){updateRequest(passenger.id,passenger.fname,passenger.lname,passenger.dob,passenger.email,passenger.phone)};
        deleteBtn.onclick=function(){deleteRecord(passenger.id)};
        bookingsBtn.onclick=function(){alert("Feature under development")}
    }


}

function updateRequest(id,fname,lname,dob,email,phone){
    document.getElementById("editFrmWnd").style.visibility="visible";
    document.getElementById("existTbl").style.visibility="hidden";
    let form =document.getElementById("editFrm");
    form.id.value=id;
    form.fname.value=fname;
    form.lname.value=lname;
    form.dob.value=dob;
    form.email.value=email;
    form.phone.value=phone;
}


function updateRecord(form){
    let record ={};
    for (let info of form){
        if(info.id){
            record[info.id]=info.value;
        }
    }
    
    record=JSON.stringify(record);
    let request=new XMLHttpRequest();
    request.open("PUT","http://"+location.hostname+":8081/passenger/")
    request.setRequestHeader("Content-Type","application/json");
    request.onload=function(){
        readRecords();
    }
    request.send(record);
}

function deleteRecord(id){
    let request=new XMLHttpRequest();
    request.open("DELETE","http://"+location.hostname+":8081/passenger/"+id)
    request.setRequestHeader("Content-Type","application/json");
    request.onload=function(){
        readRecords();
    }
    request.send();
}