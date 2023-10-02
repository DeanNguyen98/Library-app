const addbookbtn = document.getElementById("AddbookBtn");
const addmodal = document.getElementById("addBook-modal");
const addtitle = document.getElementById("modal-title");
const addauthor = document.getElementById("modal-author");
const addpages = document.getElementById("modal-pages");
const addread = document.getElementById("modal-read");
const addbtn = document.getElementById("AddBtn");

const myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

addbookbtn.addEventListener("click", () => {
    addmodal.showModal();
});

function createbookcard (book) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardtitle = document.createElement("p");
    cardtitle.textContent = `Title : "${book.title}"`;
    const cardauthor = document.createElement("p");
    cardauthor.textContent = `Author: ${book.author}`
    const cardpages = document.createElement("p");
    cardpages.textContent = `Pages: ${book.pages}`;
    const cardread = document.createElement("button");
    if (book.read == true) {
        cardread.classList.add("read-button");
        cardread.textContent = "Read"
    } else {
        cardread.classList.add("uread-button");
        cardread.textContent = "Not Read";
    }
    cardread.addEventListener("click" ,() => {
        book.read = !book.read;
        if (book.read) {
            cardread.textContent = "Read";
            cardread.classList.remove("uread-button");
            cardread.classList.add("read-button");
        } else {
            cardread.textContent = "Not Read";
            cardread.classList.remove("read-button");
            cardread.classList.add("uread-button");
        }
    })
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.textContent = "✖";
    card.appendChild(cardtitle);
    card.appendChild(cardauthor);
    card.appendChild(cardpages);
    card.appendChild(cardread);
    card.appendChild(closeButton);
    return card;
}

addbtn.addEventListener("click", (event) => {
    event.preventDefault();
    addmodal.returnValue = "Add book";
    if (formvalidation()) {
        const newbook = new Book (
            addtitle.value,
            addauthor.value,
            addpages.value,
            addread.checked
        )
        
        const existingbook = myLibrary.find(book => book.title == newbook.title && book.author == newbook.author && book.pages == newbook.pages);
        if (!existingbook) {

            myLibrary.push(newbook);
            console.log(myLibrary);
        
            const cardcontainer = document.querySelector(".card-ctn");
            cardcontainer.innerHTML = "";
        
            myLibrary.forEach((book) => {
                const card = createbookcard(book);
                cardcontainer.appendChild(card);
                
                
                const closeButton = card.querySelector(".close-button");
                
                
                closeButton.addEventListener("click" , () => {
                    const bookindex = myLibrary.indexOf(book);
                    myLibrary.splice(bookindex, 1);
                    cardcontainer.removeChild(card);
                });
            });
            addmodal.close();
        } else {

            alert('A book with the same name already exist in your library');
        }
    }

})
function formvalidation () {
    const form = document.querySelector("form");
    if (form.checkValidity()) {
        return form.checkValidity;
    } else {
        form.reportValidity();
    }
}