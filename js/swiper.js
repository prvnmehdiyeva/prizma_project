var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slidesPerView: "auto",
  spaceBetween: 5,
  // loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
})
document.addEventListener("DOMContentLoaded", function () {
  const swiper = document.querySelector(".swiper-wrapper") // Select the swiper wrapper

  async function getShowcase() {
    try {
      const res = await fetch("./data/showcase.json")
      const data = await res.json()

      data.showcases.forEach((element) => {
        const div = document.createElement("div")
        div.classList.add("swiper-slide")

        div.innerHTML = `
          <img src="${element.image}" alt="showcase" />
          <div class="content container">
            <h1 class="showcase-p-size">${element.title1}</h1>
            <h1 class="showcase-head-size">${element.title2}</h1>
            <h1 class="showcase-p-size">${element.description}</h1>
          </div>
        `

        swiper.appendChild(div)
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  getShowcase()
})
