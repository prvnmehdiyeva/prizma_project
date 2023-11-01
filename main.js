const global = {
  currentpage: window.location.pathname,
}

function showComment() {
  const writeComment = document.querySelector(".comment")
  const itemFromStorage = JSON.parse(localStorage.getItem("items")) || []

  itemFromStorage.forEach((item) => addToDOM(item))
  writeComment.addEventListener("click", writeYourComment)
}

function writeYourComment(e) {
  e.preventDefault()
  const write = document.querySelector(".write")
  if (write.style.display === "" || write.style.display === "none") {
    write.style.display = "block"

    write.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        submitComment(event)
      }
    })
  } else {
    write.style.display = "none"
  }
}

function submitComment(e) {
  const write = document.querySelector(".write")
  const yourComment = write.value
  // add to DOM
  addToDOM(yourComment)
  // add to LocalStorage
  addCommentToLocal(yourComment)
  write.value = ""
}
function addToDOM(comment) {
  const cards = document.querySelector(".comments-cards")
  const div = document.createElement("div")

  div.classList.add("card")

  div.innerHTML = `

    <div class="user">
      <div class="name">
        <h1 class="product-head-size">Name Surname</h1>
      </div>
      <div class="paragraph">
      <p class="price">
      ${comment}
      </p>

      </div>

      </div>
      <div class="images">
      <img src="./img/sinteticMat2.png" alt="sinteticLux" />
      <img src="./img/sinteticShine2.jpg" alt="sinteticLux" />
      <i class="delete-icon fas fa-square-xmark"></i>
    </div>
    `
  const noComment = document.querySelector(".no-comment")
  cards.insertBefore(div, cards.firstChild)
  if (cards.children.length === 1) {
    noComment.style.display = "block"
  } else {
    noComment.style.display = "none"
  }

  const deleteIcon = div.querySelector(".delete-icon")
  deleteIcon.addEventListener("click", () => {
    if (confirm("Are you sure you want to remove this comment?")) {
      div.remove()
      const itemFromStorage = JSON.parse(localStorage.getItem("items")) || []
      const indexToRemove = itemFromStorage.indexOf(comment)

      // Remove the comment from the local storage array
      if (indexToRemove > -1) {
        itemFromStorage.splice(indexToRemove, 1)
      }
      localStorage.setItem("items", JSON.stringify(itemFromStorage))
    }
  })
}
function addCommentToLocal(item) {
  let itemFromStorage = JSON.parse(localStorage.getItem("items")) || []

  itemFromStorage.push(item)
  localStorage.setItem("items", JSON.stringify(itemFromStorage))
}

// search////////////////////////////////////////
function search() {
  const open = document.querySelector(".open_search")

  open.addEventListener("input", searchProducts)
}

function searchProducts(e) {
  const productsLinks = document.querySelectorAll(".product-link")
  const text = e.target.value.toLowerCase()
  console.log(text)

  productsLinks.forEach((product) => {
    const productName = product
      .querySelector(".product-head-size")
      .textContent.toLowerCase()
    console.log(productName)

    if (productName.includes(text)) {
      product.style.display = "block"
    } else {
      product.style.display = "none"
    }
  })
}

function transferProductsTo(e) {
  console.log("Event listener is working!")
  if (e.target.getAttribute("class") === "product-link") {
    const productName = e.target.getAttribute("data-name")
    localStorage.setItem("transferProduct", productName)
    showProductsDetails()
  }
}
async function showProducts() {
  try {
    const res = await fetch("./data/products.json")
    const data = await res.json()
    showProduct(data.results)
  } catch (error) {
    console.error("Error fetching data:", error)
  }

  function showProduct(products) {
    products.forEach((product) => {
      const productsAll = document.querySelector(".products")
      const div = document.createElement("div")
      div.classList.add("product-link")
      div.setAttribute("data-name", `${product.name}`)

      div.innerHTML = `
      <a href="product-details.html" title="${product.name}">
      <img src="./img/${product.backdrop_path}" title="${product.name}"/>
      <h1 class="product-head-size">${product.name}</h1>
      <p class="price">$${product.price}</p>
  </a>
      `
      productsAll.appendChild(div)
    })
  }

  const productCards = document.querySelectorAll(".product-link")
  // console.log(productCards)
  productCards.forEach((card) => {
    card.addEventListener("click", transferProductsTo)
  })
}

async function showProductsDetails() {
  console.log("showProductsDetails function is called")
  const productName = localStorage.getItem("transferProduct")
  console.log("Data Name:", productName)
  try {
    const res = await fetch("./data/products.json")
    const data = await res.json()
    selectProduct(data.results)
  } catch (error) {
    console.error("Error fetching data:", error)
  }

  function selectProduct(products) {
    products.forEach((product) => {
      console.log("Product Name:", product.name)
      console.log("Data Name:", productName)

      if (product.name === productName) {
        const detailsProduct = document.getElementById("product-details")
        detailsProduct.innerHTML = ""
        detailsProduct.innerHTML = `
        <div class="content">
        <h1 class="section-head-size">${product.name}</h1>
      </div>
      <div class="cards">
        <div class="card">
          <div class="img">
            <img class="png" src="./img/${product.png}" alt="png" />
            <img src="./img/${product.poster_path}" alt="details-img" />
          </div>
          <h1 class="details-head-size">Prizma ${product.name} Paint</h1>
          <p class="price">$${product.price}</p>
          
        </div>
        
      </div>

      <div class="details">
        <div class="card1">
          <div class="text">
            <p>
              ${product.overview}
            </p>
          </div>
          <div class="recommend">
            <h1>Tips & Recommendations</h1>
            <div class="card">
              <h3>1. Surface preparation</h3>
              <p>
                Interior is for use. It is recommended to apply it on smooth and
                smooth subsurfaces in order to ensure visual properties.
              </p>
            </div>
            <div class="card">
              <h3>1. Surface preparation</h3>
              <p>
                Interior is for use. It is recommended to apply it on smooth and
                smooth subsurfaces in order to ensure visual properties.
              </p>
            </div>
          </div>
        </div>
        <div class="card2">
          <p>Choose color: <span>Blue</span></p>
          <div class="colors">
            <div class="color blue"></div>
            <div class="color blue"></div>
            <div class="color blue"></div>
            <div class="color blue"></div>
            <div class="color blue"></div>
            <a href="">Palitra</a>
          </div>
          <div class="measure container">
            <div class="litr">
              <p>Choose size: <span>1L</span></p>
              <div class="boxes">
                <div class="box">1L</div>
                <div class="box">1.5L</div>
                <div class="box">2L</div>
              </div>
            </div>
            <div class="quantity">
              <p>Choose quantity: <span>1</span></p>
              <div class="boxes">
                <div class="box">-</div>
                <p class="num">1</p>
                <div class="box">+</div>
                <a href="">Hesabla</a>
              </div>
            </div>
          </div>
          <button class="btn btn-black">add to basket</button>
        </div>
      </div>
        `
      }
    })
  }
}

function transferTo(e) {
  if (e.target.getAttribute("class") === "idea-card") {
    const dataName = e.target.getAttribute("data-name")
    localStorage.setItem("transferName", dataName)
    showIdeasItem()
  }
}
const ideaCards = document.querySelectorAll(".idea-card")
ideaCards.forEach((card) => {
  card.addEventListener("click", transferTo)
})

async function showIdeasItem() {
  const dataName = localStorage.getItem("transferName")

  const res = await fetch("./data/ideas-details.json")
  const data = await res.json()
  selectItem(data.ideas)

  function selectItem(ideas) {
    ideas.forEach((idea) => {
      if (idea.name === dataName) {
        const detailsData = document.getElementById("ideas-details")
        detailsData.innerHTML = ""
        detailsData.innerHTML = `
        <div class="content">
        <h1 class="section-head-size">${idea.name}</h1>
      </div>
      <div class="cards">
        <div class="card">
          <div class="img">
            <img src="./img/${idea.mainImg}" alt="details-img" />
          </div>
        </div>
      </div>
      <div class="details">
        <div class="card1">
          <div class="recommend">
            <h1>Tips & Recommendations</h1>
            <div class="card">
              <h3>${idea.tip1}</h3>
              <p>${idea.tip1Desc}</p>
            </div>
            <div class="card">
              <h3>${idea.tip2}</h3>
              <p>${idea.tip2Desc}</p>
            </div>
          </div>
        </div>
        <div class="images">
          <img src="${idea.img1}" alt="" class="photo" />
          <img src="${idea.img2}" alt="" class="photo" />
          <img src="${idea.img3}" alt="" class="photo" />
          <img src="${idea.img4}" alt="" class="photo" />
        </div>
      </div>
        `
      }
    })
  }
}

function init() {
  switch (global.currentpage) {
    case "/":
    case "/index.html":
      showProducts()
      showProductsDetails()
      break
    case "/ideas-details.html":
      showIdeasItem()
      break
    case "/product-details.html":
      showProductsDetails()
      showComment()
      break
    case "/products.html":
      showProducts()
      search()
      break
  }
}

document.addEventListener("DOMContentLoaded", init)
