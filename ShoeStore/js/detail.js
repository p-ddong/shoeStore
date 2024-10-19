const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const itemIndex = urlParams.get('itemIndex');

console.log(itemIndex);

const getLocalStorage = () =>{
    const localValue = localStorage.getItem('shoeList')
    let shoeList = ""
    if( localValue !== null){
        shoeList = JSON.parse(localValue)    
    }
    return shoeList
}

const showDetailItem = () => {
    
    const start =`
        <img src="${shoeList[itemIndex].image}" alt="" id="detail-img">
        <div id="detail-info">
        <h5 id="detail-name">${shoeList[itemIndex].name}</h5>
        <p id="detail-decription">${shoeList[itemIndex].description}</p>
        <h6 id="size">Available size</h6>
        <div id="size-choose" class="d-flex">
    `

    let mid =""
    const sizeArr = JSON.parse(shoeList[itemIndex].size)
    console.log(sizeArr)
    
    sizeArr.forEach(item => {
        mid += `
            <div class="size">
            <label class="square-radio">
                <input type="radio" name="size" value="${item}">
                <span class="radio-label">${item}</span>
            </label>
            </div>
        `
    })

    const end = `
        </div>
        <div id="detail-price">${shoeList[itemIndex].price}$</div>
        <div id="count-box" class="d-flex align-items-center">
            <button onclick="minus()" id="minus-btn" class="btn">-</button>
            <p id="count-display">1</p>
            <button onclick="add()" id="minus-btn" class="btn">+</button>
        </div>
        <button id="add-to-cart">Add to cart</button>
        </div>
        `
    
    const content = start + mid + end
    
    document.getElementById("detail").innerHTML = content
}

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

const updateCountDisplay = () => {
    document.getElementById("count-display").innerText = count;
}

const minus = () => {
    if (count >= 2){
        count -=1
        updateCountDisplay()
    }
}

const add = () => {
    count +=1
    updateCountDisplay()
}

let count = 1

const shoeList = getLocalStorage()
showDetailItem()
renderCards(shoeList)
