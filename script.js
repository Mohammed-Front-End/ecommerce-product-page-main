document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const menuLinks = document.querySelector('.menu-links');
  const overlay = document.getElementById("overlay");
  const closeButton = document.querySelector('.close');

  burgerMenu.addEventListener('click', function() {
    menuLinks.classList.toggle('open');
    burgerMenu.classList.toggle('open');

    const isMenuOpen = menuLinks.classList.contains("open");
    overlay.style.opacity = isMenuOpen ? "1" : "0";
    overlay.style.visibility = isMenuOpen ? "visible" : "hidden";
    overlay.style.pointerEvents = isMenuOpen ? "auto" : "none";

    menuLinks.setAttribute("aria-expanded", isMenuOpen.toString());
    closeButton.setAttribute("aria-expanded", isMenuOpen.toString());
  });

  document.querySelector('.close').addEventListener('click', function () {
    menuLinks.classList.remove("open");
    burgerMenu.classList.remove("open");

    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
    menuLinks.setAttribute("aria-expanded", "false");
    closeButton.setAttribute("aria-expanded", "false");
  });

  overlay.addEventListener('click', function() {
    menuLinks.classList.remove("open");
    burgerMenu.classList.remove("open");

    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
    menuLinks.setAttribute("aria-expanded", "false");
    closeButton.setAttribute("aria-expanded", "false");
  });
});

// Start Product 
// Products imges 
document.addEventListener('DOMContentLoaded', function() {
  const imgs = document.querySelectorAll('.imgs-Product img');
  const overlay = document.getElementById('overlay-imgs-Product');
  const mainImgContainer = document.getElementById('mainImgContainer');
  const underlayImgsContainer = document.getElementById('underlayImgsContainer');

  let currentIndex = 0; 
  // Track the index of the currently displayed image
  
  // Function to display the image at the specified index
  function displayImage(index) {
    const img = imgs[index];
    const imgSrc = img.src.split('-thumbnail').join('');
    console.log(imgSrc);

    const imgAlt = img.alt;
    console.log(img);
    mainImgContainer.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}">`; // Display the clicked image
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
  imgs.forEach((img, index) => {
    img.addEventListener('click', function() {
      showOverlay(); // Show overlay when an image is clicked
    });
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
    mainImgContainer.appendChild(mainImg);

    // Create thumbnail image element
    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = `./images/image-product-${i}-thumbnail.jpg`;
    thumbnailImg.alt = `Product ${i} Thumbnail`;
    underlayImgsContainer.appendChild(thumbnailImg);
  }
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

function updateDisplay() {
  if (numberOfProcduct.innerHTML === '0' || numberOfProcduct.textContent === '') {
      numberOfProcduct.style.display = 'none';
  } else {
      numberOfProcduct.style.display = 'flex';
  }
}
updateDisplay() 

// display cart and hide 
cart.addEventListener('click',function(e){
  if(showProduct.style.display === 'none'){
    showProduct.style.display = 'block';
  }else{
    showProduct.style.display = 'none';
  }
  e.preventDefault();
});


document.addEventListener('DOMContentLoaded', function() {
  let quantity = 15;
  plus.addEventListener('click',function(e){
    let currentValue = parseInt(addRemove.innerHTML);
    console.log(currentValue);
    
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
  addCart.addEventListener('click', function (e){
    let currentValue = parseInt(addRemove.innerHTML);
    let ArrayProduct = [];
    let newPrice = parseInt(price.innerHTML.replace(/[^0-9.]/g, "")) ;
    let name = nameProduct.innerHTML;
    ArrayProduct.push(currentValue,newPrice,name)
    numberOfProcduct.innerHTML = currentValue;
    updateDisplay() 
      
  let nameProductInCar = document.querySelector('.nameProduct');
  let priceProduct = document.querySelector('.price-product');
  let countProduct = document.querySelector('.count-product');
  let totlePrice = document.querySelector('.totle-price');
  let deleteProduct = document.querySelector('.delete');
  
  nameProductInCar.innerHTML = ArrayProduct[2];
  priceProduct.innerHTML = `$${ArrayProduct[1]}.00`;
  countProduct.innerHTML = ` x ${ArrayProduct[0]} ` ;
  totlePrice.innerHTML = `$${ArrayProduct[0] * ArrayProduct[1]}.00 ` ;


  deleteProduct.addEventListener('click',function(){
    ArrayProduct[0]--;
    if(ArrayProduct[0] >= 0){
    countProduct.innerHTML = ` x ${ArrayProduct[0]}` ;
    const totalPrice = ArrayProduct[0] * ArrayProduct[1]; 
    totlePrice.innerHTML = `$${totalPrice}.00`;
    }else{
      console.log("min value reached!");
    }
  })
  })


  
});









