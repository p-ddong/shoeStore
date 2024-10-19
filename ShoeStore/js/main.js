document.addEventListener("DOMContentLoaded", () => {
    axios({
      method: 'get',
      url: 'https://shop.cyberlearn.vn/api/Product',
    }).then((response) => {
      const listShoes = response.data.content
      console.log(listShoes)
      renderCarousel(listShoes)
      renderCards(listShoes)
      setLocalStorage(listShoes)
    });
  });

  const setLocalStorage = (list) =>{
    localStorage.setItem('shoeList', JSON.stringify(list))
}


const renderCarousel = (listShoes) => {
  let item = listShoes[1]
    
  let shortDescription = item.description.length > 30 
  ? item.description.substring(0, 30) + "..."
  : item.description


  let content = `
            <img src="${item.image}" class="carousel-img"></img>
            <div class="flex-grow-1"></div>
            <div class="carousel-description">
                <h1 class="carousel-name">${item.name}</h1>
                <p class="carousel-item-description">${shortDescription}</p>
                <a href="detail.html?itemIndex=${item.id-1}">
                  <button class="carousel-btn">BUY NOW</button>
                </a>
            </div>
            <img src="./access/img/carouselBG.png" class="carousel-bg"></img>
            `
   document.getElementById("carousel").innerHTML = content
  };


const renderCards =(listShoes) => {
  let content =""
  
  listShoes.forEach((item,index) =>{
    if(index <= 20){

      let shortDescription = item.description.length > 30 
      ? item.description.substring(0, 30) + "..."
      : item.description

      let shortName = item.name.length > 10
      ? item.name.substring(0, 10) + "..."
      : item.name
      content +=`
                  <div class="col mb-4">
                  <div class="card">
                    <img src="${item.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${shortName}</h5>
                      <p class="card-decription">${shortDescription}</p>
                    </div>
                    <div class="card-btn d-flex">
                        <button onclick="window.location.href='detail.html?itemIndex=${index}'">BUY NOW</button>                 
                        <div class="d-flex justify-content-start align-items-center">
                            <P class="ml-4">${item.price}$</P>
                        </div>
                    </div>
                  </div>
                </div>
    `
  }
  })

  document.getElementById("product-list").innerHTML = content
}