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





let overlay = document.getElementById('overlay-imgs-Product');
let underlayImgsContainer = document.querySelector('.underlayImgsContainer');
let mainImgContainer = document.getElementById('mainImgContainer');
let largeImage = document.querySelector('.shoes');
let smallImages = document.querySelectorAll('#underContainer img');
let nextButton = document.querySelector('.btn-next');
let prevButton = document.querySelector('.btn-prev');

let currentIndex = 0;
let isDragging = false;
let startX = 0;
let startTranslateX = 0;
// let nextImage = null;

function updateLargeImage() {
  largeImage.src = smallImages[currentIndex].src.replace('-thumbnail', '');
  smallImages.forEach((img, index) => {
    img.classList.toggle('active', index === currentIndex);
  });
}

function updateAdjacentSmallImage(direction) {
  let newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < smallImages.length) {
    smallImages[newIndex].src = smallImages[newIndex].src.replace('-thumbnail', '');
  }
}

function handleMouseDown(e) {
  if (e.target === largeImage) {
    isDragging = true;
    startX = e.clientX;
    startTranslateX = largeImage.getBoundingClientRect().left;
    // nextImage = document.createElement('img');
    // nextImage.src = smallImages[(currentIndex + 1) % smallImages.length].src.replace('-thumbnail', '');
    // nextImage.classList.add('next-image');
    // mainImgContainer.appendChild(nextImage);
  }
}

function handleMouseMove(e) {
  if (isDragging) {
    const diffX = e.clientX - startX;
    const newTranslateX = startTranslateX + diffX;
    largeImage.style.transform = `translateX(${newTranslateX}px)`;
  }
}

function handleMouseUp(e) {
  if (isDragging) {
    isDragging = false;
    const diffX = e.clientX - startX;
    const threshold = largeImage.clientWidth * 0.2; // 30% of large image width
    if (Math.abs(diffX) > threshold) {
      currentIndex = (currentIndex + (diffX > 0 ? 1 : -1) + smallImages.length) % smallImages.length;
      updateLargeImage();
      updateAdjacentSmallImage(diffX > 0 ? 1 : -1);
    }
    largeImage.style.transform = '';
    // if (nextImage) {
    //   nextImage.remove();
    //   nextImage = null;
    // }
  }
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % smallImages.length;
  updateLargeImage();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + smallImages.length) % smallImages.length;
  updateLargeImage();
});

largeImage.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

// Event listeners for clicking on small images to update the large image
smallImages.forEach(function(smallImage, index) {
  smallImage.addEventListener('click', function() {
    currentIndex = index;
    updateLargeImage();
  });
});

// Grabbing functionality for large image
largeImage.style.cursor = "grab";
largeImage.addEventListener('mousedown', () => {
  largeImage.style.cursor = "grabbing";
});
document.addEventListener('mouseup', () => {
  largeImage.style.cursor = "grab";
});

/**/ 






/*
TODO Function to display the image at the specified index
function displayImage(index) {
const img = imgs[index];
const imgSrc = img.src.split('-thumbnail').join('');
console.log(imgSrc);

const imgAlt = img.alt;
console.log(img);
mainImgContainer.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}">`; // Display the clicked image
currentIndex = index;

! Show all other images underneath the clicked image
underlayImgsContainer.innerHTML = ''; // Clear previous underlay images
imgs.forEach((img, i) => {
  if (i !== index) {
    !Create a clone of the image
    const imgClone = img.cloneNode(true); 

    ! Add a class to differentiate underlay images
    imgClone.classList.add('underlay-img'); 

    !Append the cloned image to the underlay images container
    underlayImgsContainer.appendChild(imgClone);
  }
});
}

// Function to show the overlay and display the first image
function showOverlay() {
overlay.style.display = 'flex'; // Display the overlay
displayImage(0); // Display the first image
}


// Event listeners for each image

shoes.forEach((img, index) => {
img.addEventListener('click', function() {
  showOverlay(); // Show overlay when an image is clicked
});
})

let masterImg = document.querySelector('#MasterImg .shoes')
masterImg.addEventListener('click', function() {
showOverlay(); // Show overlay when an image is clicked

});

// Previous button event listener
const prevButton = document.querySelector('.prevButton');
prevButton.addEventListener('click', function() {
currentIndex = (currentIndex - 1 + imgs.length) % imgs.length; // Move to the previous image
displayImage(currentIndex);
});
// Next button event listener
const nextButton = document.querySelector('.nextButton');
nextButton.addEventListener('click', function() {
currentIndex = (currentIndex + 1) % imgs.length; // Move to the next image
displayImage(currentIndex);
});



// Close button event listener
const closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', function() {
overlay.style.display = 'none'; // Hide the overlay
});

! Add the images dynamically
for (let i = 1; i <= 4; i++) {
! Create main image element
const mainImg = document.createElement('img');
mainImg.src = `./images/image-product-${i}.jpg`;
mainImg.alt = `Product ${i}`;
mainImgContainer.appendChild(mainImg);

// Create thumbnail image element
const thumbnailImg = document.createElement('img');
thumbnailImg.src = `./images/image-product-${i}-thumbnail.jpg`;
thumbnailImg.alt = `Product ${i} Thumbnail`;
underlayImgsContainer.appendChild(thumbnailImg);
}
*/ 













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
let nameAndPrice = document.querySelector('.name-and-price')
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
addCart.addEventListener('click', function (){
let ArrayProduct = [];
let quantity = 15;
// get value number from span product
let currentValue = parseInt(addRemove.innerHTML);
let name = nameProduct.innerHTML;
// price  span from element price
nameProductInCar.innerHTML = name;
priceProduct.innerHTML = `$${newPrice}.00`;
let totalQuantity;
let existingValue = parseInt(numberOfProcduct.textContent);
if (!isNaN(existingValue)) {
  totalQuantity = existingValue + currentValue;
  if (totalQuantity > quantity) {
    numberOfProcduct.textContent = quantity;
  } else {
    numberOfProcduct.textContent = totalQuantity;
  }
} else {
  numberOfProcduct.textContent = currentValue;
}
let totalCollection = newPrice * parseInt(numberOfProcduct.textContent);
totlePrice.innerHTML = `$${totalCollection}.00`;
// reset the array
function resetCart() {
  ArrayProduct = []; 
  numberOfProcduct.textContent = '0'; 
  totlePrice.textContent = '$0.00'; 
}
updateDisplay();
priceProduct.innerHTML = `$${newPrice}.00  x`;
ArrayProduct.push(currentValue,totalCollection,name);
countProduct.innerHTML = '';
for (let i = 1; i <= quantity; i++) {
  let option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  countProduct.appendChild(option);
}
countProduct.value =  numberOfProcduct.textContent;
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
  resetCart()
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