let d = document;
let maxWidth = "max-width";
let tooltipSelect = "tooltip-selected";
let bottonHamburger = d.querySelector(".hamburger");
let lateralNavbar = d.querySelector(".lateral-navbar");
let containerTitle = d.querySelector(".container-title");
let titleNeonLight = d.querySelector(".title-neon-light");
let knoledgeItem = d.querySelector(".knowledge-item");
let listKnoledgeItem = d.querySelectorAll(".knowledge-item");
let pHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolore temporibus laboriosam hic, odit quaerat labore. Officia quisquam consequatur ipsam animi dolorum laboriosam asperiores maiores nulla. Modi odit itaque corrupti!";
let section = d.querySelectorAll("section");
let linkA = d.querySelectorAll(".option a"); 


/*Remove class and text to figure */
function removeClassAndText(item){
    item.classList.remove(maxWidth);
    item.children.item(0).classList.remove(tooltipSelect);
    item.children.item(3).textContent = "";
}

/*Add class and text to figure*/
function addClassAndText(item, typeP){
    item.classList.add(maxWidth);
    item.children.item(0).classList.add(tooltipSelect);
    if(typeP==="HTML"){
        item.children.item(3).textContent = pHTML;
    }else if(typeP==="CSS"){
        item.children.item(3).textContent = pHTML;
    }else if(typeP==="Javascript"){
        item.children.item(3).textContent = pHTML;
    }else if(typeP==="Java"){
        item.children.item(3).textContent = pHTML;
    }else if(typeP==="Sql"){
        item.children.item(3).textContent = pHTML;
    }else if(typeP==="React"){
        item.children.item(3).textContent = pHTML;
    }
    
}

/**Add or Remove selected class*/
function addOrRemoveClassSelect(figureNode){
    if(figureNode.classList.contains(maxWidth)){
        removeClassAndText(figureNode);
        return false;
    }else{
        searchItemClicked();
        addClassAndText(figureNode, figureNode.children.item(1).getAttribute("alt"));
    }
}

/**Search figure previusly clicked */
function searchItemClicked(){
    listKnoledgeItem.forEach((item) =>{
        if(item.classList.contains(maxWidth)){
            removeClassAndText(item);
        }
    });    
}

/**Validation empty fields */

function emptyValidation(data){

    let empty = true;
    let dataError = d.createElement("ul");
    data.forEach(value =>{

        if(value.value.length <= 0){
            let li = d.createElement("li");
            let text = d.createTextNode(`El campo ${value.getAttribute("name")} está vacio`);
            li.appendChild(text);
            dataError.appendChild(li);
        }
    });    

    return dataError;
}

/**Validaation valid email */
const emailValidation = (emailValue) =>{

    let reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if(reg.test(emailValue.value)||emailValue.value.length<=0){
        return 0;
    }else{
        return 1;
    }

}

/**validation Form */
const validationForm = data =>{
    
    let dataError = emptyValidation(data);
    if(emailValidation(data[0])===1){
        let li = d.createElement("li");
        let text = d.createTextNode(`El campo email es invalido`);
        li.appendChild(text);
        dataError.appendChild(li);
    }
    return dataError;
}

d.addEventListener("click", (e) =>{

    if(e.target.matches(`.${bottonHamburger.classList.item(0)}`) || e.target.matches(`.${bottonHamburger.classList.item(0)} *`)){
        if(bottonHamburger.classList.contains("is-active")){
            bottonHamburger.classList.remove("is-active");
            lateralNavbar.classList.remove("lateral-navbar-open");
            containerTitle.classList.remove("container-title-open");
            titleNeonLight.classList.remove("neon-animation");
        }else{
            bottonHamburger.classList.add("is-active");
            lateralNavbar.classList.add("lateral-navbar-open");
            containerTitle.classList.add("container-title-open");
            titleNeonLight.classList.add("neon-animation");
        }
        
    }

    if(e.target.matches(`.${knoledgeItem.classList.item(0)}`) || e.target.matches(`.${knoledgeItem.classList.item(0)} *`)){
        if(e.target.nodeName==="IMG"||e.target.nodeName==="H3"||e.target.nodeName==="P"){
            let figureNode = e.target.parentElement; 
            addOrRemoveClassSelect(figureNode);
        }else{
            let figureNode = e.target; 
            addOrRemoveClassSelect(figureNode);
        }
    }

    if(e.target.type === "submit"){
        e.preventDefault();
        let email = d.querySelector("#email");
        let subject = d.querySelector("#subject");
        let message = d.querySelector("#message");
        let data = [email,  subject, message];
        let error = d.getElementById("error");
        let ulData = validationForm(data);
        let getError = false;
        if(ulData.childElementCount >0){
            getError = true;
            error.removeChild(error.children[0]);
            error.appendChild(validationForm(data));
            error.setAttribute("style", "display: block;");
        }else{
            if(getError){
                error.removeChild(error.children[0]);
            }
            error.setAttribute("style", "display: none;");
            window.open(`https://wa.me/584123567032?text=${subject.value} ${message.value}`,"_blank");
        }
        
    }
});

/**Add active class to navbar option */
window.onscroll = () =>{
    section.forEach(sec =>{

        let currentScroll = window.scrollY;
        let offset = sec.offsetTop;
        let offsetHeigth = sec.offsetHeight;
        let id = sec.getAttribute("id");
        if(currentScroll + 100 >= offset && currentScroll < offset + offsetHeigth){
            linkA.forEach(link =>{
                link.parentElement.classList.remove("active");
            });
            d.querySelector(`.option a[href*=`+id+`]`).parentElement.classList.add("active");
            
        }

    });
}