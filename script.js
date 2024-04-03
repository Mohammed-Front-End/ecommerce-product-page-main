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






















let largeImage = document.querySelector('.shoes');
let smallImages = document.querySelectorAll('#underContainer img');
let nextButton = document.querySelector('.btn-next');
let prevButton = document.querySelector('.btn-prev');
let itemImges = document.querySelectorAll('#MasterImg > .item img')
let slider = document.querySelector('.slider')
let shoes = document.querySelectorAll('.shoes')
let itemsOfSlider = document.querySelectorAll('.slider .item');

let currentIndex = 0;
let isDragging = false;
let startX = 0;
let startTranslateX = 0;
const slideWidth = itemsOfSlider[0].clientWidth;


function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}
const options = {
  root: null,
  rootMargin: '120px',
  threshold: 0.8 
};
const observer = new IntersectionObserver(handleIntersection, options);
let titlProduct = document.querySelector('.imgs-price ')
const imgsProductSection = document.querySelector('.imgs-Product');
if (imgsProductSection) {
  observer.observe(imgsProductSection);
  observer.observe(titlProduct);
}



function updateCarousel() {
  let slideWidth = document.querySelector('.item').offsetWidth;
  let sliderContainerWidth = document.getElementById('MasterImg').offsetWidth;
  const offset = -currentIndex * slideWidth;
  const centerOffset = (sliderContainerWidth - slideWidth) / 2;
  const newOffset = Math.min(offset, sliderContainerWidth - slideWidth);
  slider.style.transform = `translateX(${newOffset + centerOffset}px)`;
  updateButtonVisibility()
}
function updateButtonVisibility() {
if (currentIndex === itemsOfSlider.length - 1) {
  nextButton.style.display = 'none';
} else {
  nextButton.style.display = 'block';
}
if (currentIndex === 0) {
  prevButton.style.display = 'none';
} else {
  prevButton.style.display = 'block';
}
}
function updateCurrentIndex(newIndex) {
  currentIndex = newIndex;
  updateButtonVisibility();
}
window.addEventListener('resize', updateCarousel);
updateCarousel();
function updateAdjacentSmallImage(direction) {  
  let newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < slider.length) {
    currentIndex = newIndex;
    updateCarousel();
  }
}

shoes.forEach(item => {
  item.style.cursor = "grab";
  item.addEventListener('mousedown', () => {
    item.style.cursor = "grabbing";
  });
});



document.addEventListener('mouseup', () => {
  shoes.forEach(item => {
    item.style.cursor = "grab";
  });
});
function toggleclassActive() { 
  smallImages.forEach((img, index) => {
    img.classList.toggle('active', index === currentIndex);
  });
}
function handleMouseDown(e) {
  if (e.target.classList.contains('shoes')) {
    isDragging = true;
    startX = e.clientX;
    startTranslateX = slider.scrollLeft;
    slider.style.transition = 'none';
  }
}
function handleMouseMove(e) {
  if (isDragging) {
    const diffX = e.clientX - startX;
    slider.scrollLeft = startTranslateX - diffX;
  }
}
function handleMouseUp(e) {
  if (isDragging) {
    isDragging = false;
    const diffX = e.clientX - startX;
    // Adjust as needed
    const threshold = 50; 
    if (Math.abs(diffX) > threshold) {
      // Update index based on drag direction
      currentIndex += diffX > 0 ? -1 : 1;
      currentIndex = Math.max(0, Math.min(currentIndex, itemsOfSlider.length - 1));
    }
    slider.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition for smooth transition
    updateCarousel();
    toggleclassActive()
  }
}
//! //////////////////////////
itemsOfSlider.forEach((e)=> {
  e.addEventListener('mousedown', handleMouseDown);
  e.addEventListener('mousemove', handleMouseMove);
  e.addEventListener('mouseup', handleMouseUp);
  })
//! ////////////////////
prevButton.addEventListener('click', () => {
  updateCurrentIndex( (currentIndex - 1 + itemsOfSlider.length) % itemsOfSlider.length);
  updateCarousel();
  toggleclassActive();
});
nextButton.addEventListener('click', () => {
  updateCurrentIndex( (currentIndex + 1) % itemsOfSlider.length);
  updateCarousel();
  toggleclassActive();
});

smallImages.forEach(function(smallImage, index) {
  smallImage.addEventListener('click', function() {
    currentIndex = index;
    updateCurrentIndex(index);
    toggleclassActive();
    updateAdjacentSmallImage();
    updateSliderTransform();
    updateCarousel();
  });
});
function updateSliderTransform() {
  const offset = -currentIndex * slideWidth;
  slider.style.transition = 'transform 0.5s ease-in-out';
  slider.style.transform = `translateX(${offset}px)`;
}






let masterImg = document.querySelector('.MasterImg').cloneNode(true);
let underlayImgsContainer = document.querySelector('.underlayImgsContainer').cloneNode(true);
let mainImgContainer = document.getElementById('mainImgContainer');
let imesProducdOverlay = document.querySelector('.overlay-imgs-Product');
let modalContent = document.querySelector('.modal-content');
let btnPrev = document.querySelector('.imgs-Product > .MasterImg .btn-prev')
let btnNext = document.querySelector('.imgs-Product > .MasterImg .btn-next')

function showOverlayWithImages() {
  // Display the overlay
  imesProducdOverlay.style.display = 'flex'; 
  if(imesProducdOverlay.style.display === 'flex'){
    btnPrev.style.zIndex ='0';
    btnNext.style.zIndex ='0';
  }
  mainImgContainer.appendChild(masterImg);
  modalContent.append(underlayImgsContainer);
  
  let $btnPrev = document.querySelector('#mainImgContainer  .btn-prev')
  let $btnNext = document.querySelector('#mainImgContainer  .btn-next')
  let $slider = document.querySelector('#mainImgContainer .slider');
  let $itemsOfSlider = document.querySelectorAll('#mainImgContainer .slider .item')
  let $smallImages = document.querySelectorAll('.modal-content #underContainer img')
  
  function updateButtonVisibility() {
    if (currentIndex === $itemsOfSlider.length - 1) {
      $btnNext.style.display = 'none';
    } else {
      $btnNext.style.display = 'block';
    }
    if (currentIndex === 0) {
      $btnPrev.style.display = 'none';
    } else {
      $btnPrev.style.display = 'block';
    }
    }
  function updateCurrentIndex(newIndex) {
    currentIndex = newIndex;
    updateButtonVisibility();
  }
  function updateCarousel() {
    let slideWidth = document.querySelector('#mainImgContainer .slider .item').offsetWidth;
    let sliderContainerWidth = document.querySelector('#mainImgContainer .MasterImg').offsetWidth;
    const offset = -currentIndex * slideWidth;
    const centerOffset = (sliderContainerWidth - slideWidth) / 2;
    const newOffset = Math.min(offset, sliderContainerWidth - slideWidth);
    $slider.style.transform = `translateX(${newOffset + centerOffset}px)`;
    updateButtonVisibility()
  }
  function toggleclassActive() { 
    $smallImages.forEach((img, index) => {
      img.classList.toggle('active', index === currentIndex);
    });
  }
  function updateAdjacentSmallImage(direction) {  
    let newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < $slider.length) {
      currentIndex = newIndex;
      updateCarousel();
    }
  }
  function updateSliderTransform() {
    const offset = -currentIndex * slideWidth;
    $slider.style.transition = 'transform 0.5s ease-in-out';
    $slider.style.transform = `translateX(${offset}px)`;
  }
  
  function handleMouseDown(e) {
    if (e.target.classList.contains('shoes')) {
      isDragging = true;
      startX = e.clientX;
      startTranslateX = $slider.scrollLeft;
      $slider.style.transition = 'none';
    }
  }
  function handleMouseMove(e) {
    if (isDragging) {
      const diffX = e.clientX - startX;
      $slider.scrollLeft = startTranslateX - diffX;
    }
  }
  function handleMouseUp(e) {
    if (isDragging) {
      isDragging = false;
      const diffX = e.clientX - startX;
      // Adjust as needed
      const threshold = 50; 
      if (Math.abs(diffX) > threshold) {
        // Update index based on drag direction
        currentIndex += diffX > 0 ? -1 : 1;
        currentIndex = Math.max(0, Math.min(currentIndex, $itemsOfSlider.length - 1));
      }
      $slider.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition for smooth transition
      updateCarousel();
      toggleclassActive()
    }
  }
  $itemsOfSlider.forEach((e)=> {
  e.addEventListener('mousedown', handleMouseDown);
  e.addEventListener('mousemove', handleMouseMove);
  e.addEventListener('mouseup', handleMouseUp);
  })

  $btnPrev.addEventListener('click', () => {
    updateCurrentIndex( (currentIndex - 1 + $itemsOfSlider.length) % $itemsOfSlider.length);
    updateCarousel();
    toggleclassActive();
  });
  $btnNext .addEventListener('click', () => {
    updateCurrentIndex( (currentIndex + 1) % $itemsOfSlider.length);
    updateCarousel();
    toggleclassActive();
  });


  $smallImages.forEach(function(small, index) {
    small.addEventListener('click', function() {
      currentIndex = index;
      updateCurrentIndex(index);
      toggleclassActive();
      updateAdjacentSmallImage();
      updateSliderTransform();
      updateCarousel();
    });
  });



}
// show Overlay  With Images
let clickCount = 0;
let isOverlayShown = false;
shoes.forEach(e => {
  e.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 2 && !isOverlayShown) {
      clickCount = 0;
      showOverlayWithImages();
      isOverlayShown = true;
    }

    setTimeout(() => {
      clickCount = 0;
    }, 300); // Reset click count after 300 milliseconds
  });
});
// Close button event listener
const closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', () => {
  imesProducdOverlay.style.display = 'none'; // Hide the overlay
  if (btnPrev && btnNext) {
  btnPrev.style.zIndex = '999'; 
  btnNext.style.zIndex = '999'; 
  }
  isOverlayShown = false; 
});





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