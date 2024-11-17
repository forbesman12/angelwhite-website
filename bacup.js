document.getElementById('hamburger').addEventListener('click', function() {
    const navIcons = document.getElementById('navIcons');
    navIcons.classList.toggle('active'); // Toggle the active class
});

let products = {
    data:[
        {
         productName: "Brown Paper Bag",
         category: "Paper",
         price: "30",
         image:"./assests/paper.png"
        },
        {
         productName: "Regular white T-shirt",
         category: "Bowls",
         price: "30",
         image:"./assests/bowls.png"
        },
        {
         productName: "Round Paper Bowl by 50pcs",
         category: "Bowls",
         price: "30",
         image:"./assests/b1.png"
        },
        {
         productName: "2ptn Box PaperPlate by 50pcs",
         category: "Plates",
         price: "30",
         image:"./assests/p3.png"
        },
        {
            productName: "2ptn plastic Plate 50pcs",
            category: "Plates",
            price: "30",
            image:"./assests/p2.png"
        },
        {
            productName: "envelope paperbox 50pcs",
            category: "Paper",
            price: "30",
            image:"./assests/envelopebox.png"
        },
        {
            productName: "fries paperbox 50pcs",
            category: "Paper",
            price: "30",
            image:"./assests/pp1.png"
        },
        {
            productName: "fries paperbox 50pcs",
            category: "Paper",
            price: "30",
            image:"./assests/foampack.png"
        },
    ],
};

for(let i of products.data){
    // create card
    let card = document.createElement("div");
    // card should have category and should stay hidden
    card.classList.add("card", i.category,"hide");
    // image div
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    // image tag
    let image = document.createElement("img");
    image.setAttribute("src", i.image);
    imgContainer.appendChild(image);
    card.appendChild(imgContainer);
    // container
    let container = document.createElement("div");
    container.classList.add("container");
    // product name
    let name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.productName.toUpperCase();
    container.appendChild(name);
    // price
    let price = document.createElement("h6");
    price.innerText = "$" + i.price;
    container.appendChild(price);

    card.appendChild(container);
    document.getElementById("products").appendChild(card);
}

// parameter passed from button (Parameter same as category)
function filterProduct(value){
    // Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        // check if value equals innerText
        if(value.toUpperCase() == button.innerText.toUpperCase()){
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    // select all cards
    let elements = document.querySelectorAll(".card");
    // loop through all cards
    elements.forEach((element) => {
        // display all cards on "all" button click 
        if(value === "all"){
            element.classList.remove("hide");
        } else {
            // check if element contains category class
            if(element.classList.contains(value)){
                // display element based on category
                element.classList.remove("hide");
            } else {
                // hide other elements
                element.classList.add("hide");
            }
        }
    });
}

// 
// 






    // Initially display all products
    window.onload = () => {
        filterProduct("all");
    }