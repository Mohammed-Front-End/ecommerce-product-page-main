  const burgerMenu = document.querySelector('.burger-menu');
  const menuLinks = document.querySelector('.menu-links');
  const overlayMenu = document.getElementById("overlay");
  const closeButtonMenu = document.querySelector('.close');

  burgerMenu.addEventListener('click', function() {
    menuLinks.classList.toggle('open');
    burgerMenu.classList.toggle('open');

    const isMenuOpen = menuLinks.classList.contains("open");
    overlayMenu.style.opacity = isMenuOpen ? "1" : "0";
    overlayMenu.style.visibility = isMenuOpen ? "visible" : "hidden";
    overlayMenu.style.pointerEvents = isMenuOpen ? "auto" : "none";

    menuLinks.setAttribute("aria-expanded", isMenuOpen.toString());
    closeButtonMenu.setAttribute("aria-expanded", isMenuOpen.toString());
  });

  document.querySelector('.close').addEventListener('click', function () {
    menuLinks.classList.remove("open");
    burgerMenu.classList.remove("open");

    overlayMenu.style.opacity = "0";
    overlayMenu.style.visibility = "hidden";
    overlayMenu.style.pointerEvents = "none";
    menuLinks.setAttribute("aria-expanded", "false");
    closeButtonMenu.setAttribute("aria-expanded", "false");
  });

  overlayMenu.addEventListener('click', function() {
    menuLinks.classList.remove("open");
    burgerMenu.classList.remove("open");

    overlayMenu.style.opacity = "0";
    overlayMenu.style.visibility = "hidden";
    overlayMenu.style.pointerEvents = "none";
    menuLinks.setAttribute("aria-expanded", "false");
    closeButtonMenu.setAttribute("aria-expanded", "false");
  });




  
// Start Product 
// Products imges 
const imgs = document.querySelectorAll('.imgs-Product img');
const overlay = document.getElementById('overlay-imgs-Product');
const mainImgContainer = document.getElementById('mainImgContainer');
const underlayImgsContainer = document.getElementById('underlayImgsContainer');
let imge = document.querySelector('.imge')

let currentIndex = 0; 
// Track the index of the currently displayed image

// Function to display the image at the specified index
function displayImage(index) {
  const img = imgs[index];
  const imgSrc = img.src.split('-thumbnail').join('');
  const imgAlt = img.alt;

  imge.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}">`; // Display the clicked image
  currentIndex = index;
  // Show all other images underneath the clicked image
  underlayImgsContainer.innerHTML = ''; // Clear previous underlay images
  imgs.forEach((img, i) => {
    if (i !== index) {
      const imgClone = img.cloneNode(true); // Create a clone of the image
      imgClone.classList.add('underlay-img'); // Add a class to differentiate underlay images
      underlayImgsContainer.appendChild(imgClone); // Append the cloned image to the underlay images container
    }
  });
}

// Function to show the overlay and display the first image
function showOverlay() {
  overlay.style.display = 'flex'; // Display the overlay
  displayImage(0); // Display the first image
}

// Event listeners for each image
let masterImg = document.querySelector('#MasterImg img')
masterImg.addEventListener('click', function() {
  showOverlay(); // Show overlay when an image is clicked
});

// Previous button event listener
const prevButton = document.getElementById('prevButton');
prevButton.addEventListener('click', function() {
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length; // Move to the previous image
  displayImage(currentIndex);
});
// Next button event listener
const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', function() {
  currentIndex = (currentIndex + 1) % imgs.length; // Move to the next image
  displayImage(currentIndex);
});




const btnPrevMobile = document.getElementById('btn-prev');
btnPrevMobile.addEventListener('click', function() {
  // Move to the previous image
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  displayImage(currentIndex);
});
const btnNextMobile = document.getElementById('btn-next');
btnNextMobile.addEventListener('click', function() {
  // Move to the next image
  currentIndex = (currentIndex + 1) % imgs.length;
  displayImage(currentIndex);
});




// Close button event listener
const closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', function() {
  overlay.style.display = 'none'; // Hide the overlay
});
  
// Add the images dynamically
for (let i = 1; i <= 4; i++) {
  // Create main image element
  const mainImg = document.createElement('img');
  mainImg.src = `./images/image-product-${i}.jpg`;
  mainImg.alt = `Product ${i}`;
  imge.appendChild(mainImg);

  // Create thumbnail image element
  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = `./images/image-product-${i}-thumbnail.jpg`;
  thumbnailImg.alt = `Product ${i} Thumbnail`;
  underlayImgsContainer.appendChild(thumbnailImg);
}















let minus = document.querySelector('.minus');
let plus = document.querySelector('.plus');
let addRemove = document.querySelector('.add-remove span')
let addCart = document.querySelector('.add-btn')
let price = document.querySelector('.price span')
let nameProduct = document.querySelector('.imgs-price h1')
let numberOfProcduct = document.querySelector('.cart span')
let cart = document.querySelector('.cart')
let showProduct = document.querySelector('.show-Product');
let showProductSection = document.querySelector('.show-Product section');
let imagSection = document.querySelector('.show-Product section img');

// container of prodcut 
let nameAndPrice = document.querySelector('.name-and-price')
// show-Product 
let nameProductInCar = document.querySelector('.nameProduct');
let priceProduct = document.querySelector('.price-product');
let countProduct = document.querySelector('.count-product');
let totlePrice = document.querySelector('.totle-price');
let checkout = document.querySelector('.Checkout');
let emptySpan = document.querySelector('.emptySpan')


function updateDisplay() {
  if (numberOfProcduct.innerHTML === '0' || numberOfProcduct.textContent === '') {
    numberOfProcduct.style.display = 'none';
    showProductSection.style.display = 'none';
    emptySpan.style.display = 'block';
    checkout.style.display = 'none';
  } else {
    numberOfProcduct.style.display = 'flex';
    showProductSection.style.display = 'flex';
    emptySpan.style.display = 'none';
    checkout.style.display = 'block';
  }
}
// updateDisplay() 

cart.addEventListener('click', function() {
  showProduct.style.display = 'flex';
});
document.addEventListener('click', function(event) {
  const target = event.target;
  if (!showProduct.contains(target) && target !== cart) {
      showProduct.style.display = 'none';
  }
});

plus.addEventListener('click',function(e){
    let currentValue = parseInt(addRemove.innerHTML);
    
    let incressingValue = currentValue + 1;
    if(addRemove.innerHTML < quantity){
      addRemove.innerHTML = incressingValue;
    }else{
      console.log("Maximum value reached!");
    }
  });

minus.addEventListener('click',function(e){
  let currentValue = parseInt(addRemove.innerHTML);
  let decreasingValue = currentValue - 1;
  if(addRemove.innerHTML > 0){
    addRemove.innerHTML = decreasingValue;
  }else{
    console.log("min value reached!");
  }
})

  // preice item
  let newPrice = parseInt(price.innerHTML.replace(/[^0-9.]/g, ""));
  addCart.addEventListener('click', function (e){
  let ArrayProduct = [];
  // console.log(ArrayProduct);
  let quantity = 15;
  // get value number from span product
  let currentValue = parseInt(addRemove.innerHTML);
  let name = nameProduct.innerHTML;
  // count of basket
  numberOfProcduct.innerHTML = currentValue;
  updateDisplay();
  // price  span from element price
  nameProductInCar.innerHTML = name;
  priceProduct.innerHTML = `$${newPrice}.00  x`;
  let totalCollection = newPrice  *  currentValue; 
  totlePrice.innerHTML = `$${totalCollection}.00`;
  // console.log(totalCollection);
  ArrayProduct.push(currentValue,totalCollection,name);
  countProduct.innerHTML = '';
  for (let i = 1; i <= quantity; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    countProduct.appendChild(option);
  }
  // count select option number
  countProduct.value = currentValue;
  countProduct.addEventListener('change', function() {
    let selectedValue = parseInt(this.value);
    totlePrice.innerHTML = `$${selectedValue * newPrice}.00`;
    numberOfProcduct.innerHTML = selectedValue;
  })

  let deleteProduct = document.querySelector('.delete');
  let currentCount = parseInt(countProduct.value);
  // display again all items
  if(currentCount >= 0){
    emptySpan.style.display = 'none';
    showProductSection.style.display = 'flex';
    checkout.style.display = 'block';
    // container of prodcut 
    nameAndPrice.style.display = 'block';
    deleteProduct.style.display = 'block';
    imagSection.style.display = 'block';
    checkout.style.display = 'block';
    showProductSection.style.padding = '20px'
  }
  checkout.addEventListener('click',function(e){
    let successfulRequest = [];
    successfulRequest.push(name,totlePrice.innerHTML,countProduct.value)
    nameAndPrice.style.display = 'none';
    deleteProduct.style.display = 'none';
    imagSection.style.display = 'none';
    checkout.style.display = 'none';
    showProductSection.style.padding = '0'

    let congratulations = document.querySelector('.congratulations')
    congratulations.style.display = 'block';
    setTimeout( s=>{
      numberOfProcduct.style.display = 'none';
      congratulations.style.display = 'none';
      emptySpan.style.display = 'block';
    },800)
  })
});
/* 
let countProductToLocal = JSON.stringify(ArrayProduct[0])
let totlePriceToLocal = JSON.stringify(ArrayProduct[1])
let namesToLocal= JSON.stringify(ArrayProduct[2])

console.log(countProductToLocal);
console.log(totlePriceToLocal);
console.log(namesToLocal);

// Set items in localStorage
window.localStorage.setItem("countProduct", countProductToLocal);
window.localStorage.setItem("totlePrice", totlePriceToLocal);
window.localStorage.setItem("names", namesToLocal);

// Get items from localStorage
// let $cProduct = JSON.parse(window.localStorage.getItem('countProduct'));
// let $tPrice = JSON.parse(window.localStorage.getItem('totlePrice'));
// let $names = JSON.parse(window.localStorage.getItem('names'));

console.log(localStorage.getItem('names'));

if (localStorage.getItem('countProduct')) {
    nameProduct.innerHTML = localStorage.getItem('names');
    countProduct.value = localStorage.getItem('countProduct');
    totlePrice.innerHTML = localStorage.getItem('totlePrice');
  }else{
    updateDisplay();
  }
*/

function deleteItem (){
  let deleteProduct = document.querySelector('.delete');
  let currentValue = parseInt(addRemove.innerHTML);
  deleteProduct.addEventListener('click',function(){
  let selectIndex = countProduct.selectedIndex
  let currentCount = parseInt(countProduct.value);
  if (selectIndex !== -1) {
    if(currentCount >= 0){
      currentCount--;
      // remove product in span cart 
      numberOfProcduct.innerHTML = selectIndex;
      // remove one value on counter select option 
      countProduct.value =  currentCount
      // remove product of totle price
      const totalPrice = currentCount * newPrice; 
      totlePrice.innerHTML = `$${totalPrice}.00`;
    }
    if (currentCount === 0) {
      // select.remove(selectIndex);
      emptySpan.style.display = 'block';
      nameAndPrice.style.display = 'none';
      deleteProduct.style.display = 'none';
      imagSection.style.display = 'none';
      checkout.style.display = 'none';
      showProductSection.style.padding = '0'
    }
  }
  })
}
deleteItem()