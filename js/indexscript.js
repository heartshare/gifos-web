//////////////////////////////TRENDING//////////////////////////////////


let containerTrending = document.getElementById("container-trending");
let trending = document.getElementById("trending");

window.onload = function accederATrending (){ //traer gifs desde la API
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=oe44FnxvDSz23VKoIEmtoRbzdYL7ISE1&limit=25&rating=G')
    .then(response => response.json()
    .then(objt => {
        accederGifs(objt)
    })
    )

    function accederGifs(objt) {
        console.log(objt)
        for (let index = 0; index < objt.data.length; index++){
        let container = document.createElement("div");
        containerTrending.appendChild(container)
        let img = document.createElement("img");
        img.classList.add('img-trend');
        container.classList.add('gif-container')
        container.appendChild(img)
        let url = objt.data[index].images.downsized.url
        img.setAttribute('src', url);
        img.setAttribute('max-width', '18rem');
        img.setAttribute('height', '288px');
        }
     }

}

////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////SUGERENCIAS///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

const apiKey = "oe44FnxvDSz23VKoIEmtoRbzdYL7ISE1";
let tag1 = "The Office";
let tag2 = "Star Wars"; 
let tag3 = "KeanuReeves";
let tag4 = "Cats";
let keanuDiv = document.querySelector('#keanu');
let officeDiv = document.querySelector('#office');
let starWarsDiv = document.querySelector('#starwars');
let catsDiv = document.querySelector('#cats');

function sugerencia(tag, unDiv){
fetch('https://api.giphy.com/v1/gifs/random?api_key='+apiKey+'&tag='+tag+'&rating=G')
.then(response => response.json())
.then(gif => {
    verSugerencia(gif, unDiv);
})

function verSugerencia(gif, unDiv){ //muestra 1 sugerencia random de cada uno
    console.log(gif);
    let img = document.createElement("img");
    let url = gif.data.images.downsized_large.url;
    unDiv.appendChild(img);
    img.setAttribute('src', url);
    img.setAttribute('width', '100%');
    img.setAttribute('height', '288px');        
}

}

sugerencia(tag1, officeDiv);
sugerencia(tag2, starWarsDiv);
sugerencia(tag3, keanuDiv);
sugerencia(tag4, catsDiv);


//ver más sugerencias...

let button = document.getElementsByClassName("ver-mas");

function despejar() {
    document.querySelector("#container-trending").innerHTML = "";
  }

function verMasGifs(tag) {
    despejar();   
    fetch('https://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&q='+tag+'&limit=25&offset=0&rating=G&lang=en')
    .then(response => response.json())
    .then(gif => {
        verMas(gif)
    })

    function verMas(gif){
        console.log(gif)
        for (let index = 0; index<gif.data.length; index++){
        let container = document.createElement("div")
        containerTrending.appendChild(container);
        let img = document.createElement("img");
        let url = gif.data[index].images.downsized_large.url;
        container.appendChild(img);
        img.setAttribute('src', url);
        img.setAttribute('width', '280px');
        img.setAttribute('height', '288px');
        tendencias.innerText = tag;
        containerTrending.scrollIntoView({ behavior: "smooth" })
    
}
}
}

for (let i=0; i < button.length; i++){
    button[i].addEventListener("click", function(e){
        if (e.target.id == "office-button"){
            console.log("boton 1");
            verMasGifs(tag1);
          
        } else if (e.target.id == "sw-button"){
            console.log("boton 2");
            verMasGifs(tag2);
           
        } else if (e.target.id == "keanu-button") {
            console.log("boton 3");
            verMasGifs(tag3);
            
        }else if (e.target.id == "cats-button"){
            console.log("boton 4");
            verMasGifs(tag4);
        }
    })
}

////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////BUSQUEDAS//////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

let searchBtn = document.getElementById('search-button');
let divChild
let input2

function guardarBusqueda (){
    menu.style.display = 'none'; 
    input2 = document.getElementById('searchinput').value; 
    divChild = document.createElement("div");
    let div= document.getElementById("div-busquedas");
    let busqueda = document.createElement("h4");
    divChild.appendChild(busqueda);
    div.appendChild(divChild);
    busqueda.innerHTML = "#"+input2;
    div.style.marginTop = '2rem';
    div.style.position = 'relative';
    divChild.style.display ="inline-block";
    divChild.style.height = '2.13 rem';
    busqueda.classList.add('una-busqueda');
    busqueda.classList.add('ver-mas-2');
    divChild.style.marginRight = '0.5rem';
    containerTrending.scrollIntoView({ behavior: "auto" })
    verDeNuevo(input2);
    divChild.style.cursor = "pointer";
}

function verDeNuevo(inp){
    divChild.addEventListener('click', ()=>{
        verMasGifs(inp);
    })
}

searchBtn.addEventListener('mousedown', ()=>{
    searchBtn.style.border = "1px dashed #110038";
})

searchBtn.addEventListener('mouseup',()=>{
    searchBtn.style.border = "1px solid #808080";
    searchBtn.style.background = "#E6E6E6";
})

searchBtn.addEventListener('mouseover', ()=>{
    searchBtn.style.border = "1px dashed #110038";
})

searchBtn.addEventListener('mouseout', ()=>{
    searchBtn.style.border = "1px solid #808080";
})

searchBtn.addEventListener('click', ()=> {
    let input = document.getElementById('searchinput').value; 
    let valorInput = localStorage.setItem("busqueda", input);
    console.log("El input ingresado es: "+input);
    verMasGifs(input);
    guardarBusqueda();
})

let input = document.getElementById("searchinput");
    

let menu = document.getElementById('busquedas-sugeridas');


input.addEventListener('keyup', (e)=>{
    let searchbtn = document.getElementById("search-button");
    
    if(e.currentTarget.value.trim() === ""){
        menu.style.display = 'none'; 
        document.getElementById("lupa-dia-activa").style.display = "none";
        document.getElementById("lupa-dia").style.display = "block";
        document.getElementById("search-text").style.color = "#B4B4B4";
        searchbtn.style.background = "#E6E6E6";

    }else{
        menu.style.display = 'block';
        
        searchbtn.style.background = "#F7C9F3";
        searchbtn.style.border = "1px solid #110038";
        searchbtn.style.boxshadow = "inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF";
        document.getElementById("search-text").style.color = "#110038";
        document.getElementById("lupa-dia").style.display = "none";
        document.getElementById("lupa-dia-activa").style.display = "block";
    }
    if(e.keyCode == 13){
        console.log("funcionó");
        let valorInput = document.getElementById("searchinput").value;
        verMasGifs(valorInput);
        guardarBusqueda();
        menu.style.display = 'none'; 
    }    
})

/////////////////////////
