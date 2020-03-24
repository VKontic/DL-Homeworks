//postavljanje kukija
window.addEventListener("load", function(){
})

// 1. Dodavanje itema
const form = document.getElementById("addForm");
// Treba nam container gdje se nalazi svi itemi, id - items
const itemList = document.getElementById("items");
// Na submit forme gdje unosimo item treba da aktiviramo submit event i zakacimo funkciju addItem
form.addEventListener("submit", addItem)
// Za brisanje
itemList.addEventListener("click", removeItem);

function addItem(event) {
    // Na submit forme trebamo da onemogucimo default ponasanje forme
    event.preventDefault();
    // Sada nam treba vrijednost iz input polja
    const vrijednost = document.querySelector('#item').value;
    // Sledeci korak je kreiranje novog li itema
    const newLi = document.createElement('li');
    if (itemList.childElementCount == 0){
        newLi.tabIndex = 1;
    }else{
        newLi.tabIndex =  Number(itemList.lastElementChild.tabIndex) + 1;
        console.log(Number(itemList.lastElementChild.tabIndex));
    }
    // Nakon toga li itemu trebamo dodati klasu 
    // class - list-group-item
    newLi.classList.add("list-group-item");
    // Nakon ovog trebamo da kreiramo text node cija je vrijednost sacuvana u input polju
    // i da dodamo taj text node u li
    const txt = document.createTextNode(vrijednost);
    newLi.appendChild(txt);
    // Potrebno je da kreiramo i delete button element
    const delBtn = document.createElement("button");
    // Potrebno je da dodamo klase za delete button
    delBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right','delete');
    // Potrebno je da dodamo na delete button text node "X"
    const btnText = document.createTextNode("X");
    delBtn.appendChild(btnText);
    // Sada moramo da dodamo deleteBtn u li
    newLi.appendChild(delBtn);
    // Nakon toga, potrebno je da dodamo novokreirani li u listu itema
    itemList.appendChild(newLi);
}
// 2. Brisanje elemenata iz liste
// Na item list dodamo click event i event handler za brisanje itema removeItem
function removeItem(event) {
    // sad treba da provjerimo da li je user kliknuo na X
    if (event.target.classList.contains("delete")) {
        // ako sadrzi pozvati confirm sa porukom "Jeste li sigurni"
        if (confirm("Jeste li sigurni da zelite da uklonite item?")) {
            // trebamo da obrisemo li element
            const liDel = event.target.parentElement;
            liDel.parentElement.removeChild(liDel);
        }
    }else{
    //ovo je 1. b) ako nije kliknuto delete u input polje za pretragu upisati tekst
    //izabranog itema, i prikazati samo njega
    const itemText = event.target.firstChild.textContent;
    filter.value = itemText;
    const items = document.querySelectorAll(".list-group-item");

    Array.from(items).forEach(function(item) {
        let itemName = item.firstChild.textContent;
        if(itemName === itemText) {
            item.style.display = "block";
        } else{
            item.style.display = "none";
        }
    })
}
}
// 3. Filtriranje/pretraga elemenata
// prvo nam treba input polje za pretragu itema
let filter = document.getElementById("filter");
filter.addEventListener("keyup", filterItems)

// Event handler za filtriranje itema
function filterItems(e) {
    // konvertovanje slova iz e.target.value u lowercase,
    let text = e.target.value.toLowerCase().trim();
    // taj tekst cuvamo u varijablu 
    // lakse nam je da radimo pretragu
    // uzmemo sve li iteme iz liste itema, gore vec definisali
    // sve elemente moramo da sacuvamo u varijablu
    // mozemo da koristimo getElementsByTagName
    const items = document.querySelectorAll(".list-group-item");

    Array.from(items).forEach( function(item) {
        let itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) == 0) {
            item.style.display = "block";
        } else{
            item.style.display = "none";
        }
    })
}

//c - upravljanje streicima i enter klik
document.querySelector("body").addEventListener("keydown", function(e){
    if (e.keyCode == '38'){//strelica gore
        let a = document.querySelector("li:focus");
        if (a==null){
            itemList.firstElementChild.focus(); //ako nijedan item nije fokusiran, fokusiraj prvi
        }else{
            if (a == itemList.firstElementChild) {
                itemList.lastElementChild.focus(); //ako je bio selektovan prvi i kliknuta strelica gore, fokusiraj zadnji
            }else{
                a.previousElementSibling.focus(); //fokusiraj prethodni
            }
             a.blur(); //makni fokus sa item koji je do sad bio fokusiran
        }
    }else if (e.keyCode == '40'){
        let a = document.querySelector("li:focus");
        if (a==null){
            itemList.firstElementChild.focus(); //ako nije vec neki fokusiran, fokusiraj prvi
        }else{
            if (a == itemList.lastElementChild) {
                console.log("a je posljednji element")
                itemList.firstElementChild.focus(); //ako je bio selektovan prvi i kliknuta strelica gore, fokusiraj zadnji
            }else{
                a.nextElementSibling.focus(); //fokusiraj prethodni
            }
             a.blur();
        }
    }else if (e.keyCode == '13'){
        let a = document.querySelector("li:focus");
        if (a !== null){ //ako je neki element fokusiran
            let itemValue = a.firstChild.textContent;//vrijednost li itema koji je fokusiran (text)
            document.querySelector('#item').value = itemValue;
        }
    }
})