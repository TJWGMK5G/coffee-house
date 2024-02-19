// Burger-Menu 

const menu = document.querySelector('.header-burger')
const menuOpen = document.querySelector('.popup-burger')
const menuClose = document.querySelector('.header-burger__span')
const menuItems = document.querySelectorAll('.popup-burger__list li a')

menu.addEventListener('click' , function() {
    menuOpen.classList.toggle('menu-visible')
    document.querySelector('body').classList.toggle('body-noscroll')
    menuClose.classList.toggle('header-burger__span-active')
})

menuItems.forEach(function(e) {
  e.addEventListener('click' , function() {
    menuOpen.classList.remove('menu-visible')
    document.querySelector('body').classList.remove('body-noscroll')
    menuClose.classList.remove('header-burger__span-active')
  })
})


// Carousel (Slide)
const sliderItems = document.querySelectorAll('.slider-item')
const sliderPagination = document.querySelectorAll('.pagination__item')
const sliderWrap = document.querySelector('.slider-wrapper')
const btnPrev = document.querySelector('.favourites-slider-buttons__left')
const btnNext = document.querySelector('.favourites-slider-buttons__right')

let currentSlide = 0;

for (let i = 0; i < sliderItems.length; i++) {
    sliderItems[i].dataset.id = i;
    sliderPagination[i].dataset.id = i;
}

sliderPagination.forEach(function(e) {
    e.addEventListener('click' , function() {
        let scroll = e.dataset.id * 480; 
        sliderWrap.scrollTo ({
            top: 0,
            left: scroll,
            behavior: "smooth",
        });
        currentSlide = e.dataset.id;
    })
})
function navLoad(arg) {} 



// PAGE-MENU Tabs 
const tabsButtons = document.querySelectorAll('.tags-btn');

tabsButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const prevActiveItem = document.querySelector('.content-items._active');
    const prevActiveButton = document.querySelector('.tags-btn._active');
  
    
    if (prevActiveButton) {
      prevActiveButton.classList.remove('_active');
    }
    
    if (prevActiveItem) {
      prevActiveItem.classList.remove('_active');
    }
  
    const nextActiveItemId = `#${btn.getAttribute('data-tab')}`;
    const nextActiveItem = document.querySelector(nextActiveItemId);
    btn.classList.add('_active');
    nextActiveItem.classList.add('_active');
  });
})


// Page Menu - Ошибка на другой странице
// const btnMore = document.querySelector('.indent-more')
// const Items = document.querySelectorAll('.col-indent')

// if (btnMore) {
//   btnMore.addEventListener('click' , function() {
//     btnMore.classList.add('menu-hidden')
//       Items.forEach(function(e) {
//           e.classList.remove('col-indent-hidden992')
//       })
// })
// }


// Page Menu - Items products (json)
async function getProducts() {
  const response = await fetch("https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/coffee-house/products.json");
  const result = await response.json();
  return result;
}

async function madeProducts() {
  const data = await getProducts();

  const card = document.querySelectorAll('.content-items');
  let templateCoffee = '';
  let templateTea = '';
  let templateDessert = '';

  let index = 0;

    for(let i = 0; i < data.length; i++) {
      if (i % 8 == 0) {
        index = 0;
      }
      index +=1;
      
        if (data[i].category == "coffee") {
          templateCoffee = `<div class="col-3 col-md-6 col-xs-12 col-indent">
            <div data-index="${i}" class="items-content">
                <div class="items-content__picture"><img src="./icon/menu-page/coffee-${index}.jpg" alt="alt"></div>
                <div class="content-wrap">
                    <div class="items-content__title">${data[i].name}</div>
                    <div class="items-content__description">${data[i].description}</div>
                    <div class="items-content__price">${data[i].price}$</div>
                </div>
            </div>
            </div>` + templateCoffee;

            card[0].innerHTML = templateCoffee;
        }

        if (data[i].category == "tea") {
          templateTea = `<div class="col-3 col-md-6 col-xs-12 col-indent">
            <div data-index="${i}" class="items-content">
                <div class="items-content__picture"><img src="./icon/menu-page/tea-${index}.png" alt="alt"></div>
                <div class="content-wrap">
                    <div class="items-content__title">${data[i].name}</div>
                    <div class="items-content__description">${data[i].description}</div>
                    <div class="items-content__price">${data[i].price}$</div>
                </div>
            </div>
            </div>` + templateTea;

            card[1].innerHTML = templateTea;
        }

        if (data[i].category == "dessert") {
          templateDessert = `<div class="col-3 col-md-6 col-xs-12 col-indent">
            <div data-index="${i}" class="items-content">
                <div class="items-content__picture"><img src="./icon/menu-page/dessert-${index}.png" alt="alt"></div>
                <div class="content-wrap">
                    <div class="items-content__title">${data[i].name}</div>
                    <div class="items-content__description">${data[i].description}</div>
                    <div class="items-content__price">${data[i].price}$</div>
                </div>
            </div>
            </div>` + templateDessert;

            card[2].innerHTML = templateDessert;
        }
    } 

    // Page Menu - Modal
        const itemCards = document.querySelectorAll('.items-content')
        const modal = document.querySelector('.modal')
        

          itemCards.forEach(function(e) {
            e.addEventListener("click" , function() {
              
              let imagePath = e.querySelector('.items-content__picture img').src;  
        
              document.querySelector('body').classList.add('body-noscroll')
              modal.classList.add('modal-visible')
             
              let itemIndex = e.dataset.index;
                let modalTemplate = `
                  <div class="modal-wrapper">
                  <div class="modal__icon"><img src="${imagePath}" alt="alt"></div>
                  <div class="modal-information">
                  <div class="modal-information__title">${data[itemIndex].name}</div>
                  <div class="modal-information__subtitle">${data[itemIndex].description}</div>
                  <div class="modal-information__size">
                      Size
                      <div class="modal-information__size-wrapper">
                          <div class="modal-information__size-item _active"><span>S</span>${data[itemIndex].sizes.s.size}</div>
                          <div class="modal-information__size-item"><span>M</span>${data[itemIndex].sizes.m.size}</div>
                          <div class="modal-information__size-item"><span>L</span>${data[itemIndex].sizes.l.size}</div>
                      </div>
                  </div>
                  <div class="modal-information__additives">
                      Additives
                      <div class="modal-information__size-wrapper">
                          <div class="modal-information__additives-item"><span>1</span>${data[itemIndex].additives[0].name}</div>
                          <div class="modal-information__additives-item"><span>2</span>${data[itemIndex].additives[1].name}</div>
                          <div class="modal-information__additives-item"><span>3</span>${data[itemIndex].additives[2].name}</div>
                      </div>
                  </div>
                  <div class="modal-information__price">
                      <span>Total:</span>
                      <span>$${data[itemIndex].price}</span>
                  </div>
                  <div class="modal-information-alert">
                      <div class="modal-information-alert__icon"><img src="./icon/menu-page/info-empty.svg" alt="alt"></div>
                      <div class="modal-information-alert__text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</div>
                  </div>
                  <button class="modal-information__btn">Close</button>
              </div>
              </div>  
            `;

              modal.innerHTML = modalTemplate;

              const modalClose = document.querySelector('.modal-information__btn')
                modalClose.addEventListener('click' , function() {
                  document.querySelector('body').classList.remove('body-noscroll')
                  modal.classList.remove('modal-visible')
                })
                
                modal.addEventListener('click' , function(e) {
                  if (e.target.classList[0] === "modal") {
                    modal.classList.remove('modal-visible')
                    document.querySelector('body').classList.remove('body-noscroll')
                  } 
                  
                })  

                  // Page Menu - Modal-items
                      const itemsChooseSize = document.querySelectorAll('.modal-information__size-item')
                      const itemsChooseAdditives = document.querySelectorAll('.modal-information__additives-item')

                      itemsChooseSize.forEach(function(e) {
                        e.addEventListener('click' , function() {
                          itemsChooseSize.forEach(function(elem) {
                            elem.classList.remove('_active')
                          })
                          e.classList.add('_active')
                        })
                      })

                      itemsChooseAdditives.forEach(function(e) {
                        e.addEventListener('click' , function() {
                            e.classList.toggle('_active')
                        })
                      })   
            })
          })

}
madeProducts();










