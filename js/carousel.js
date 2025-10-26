

var carouselArr = [];

class Carousel {
  constructor(image, title, url) {
    this.image = image;
    this.title = title;
    this.url = url;
  }

  static Start(arr) {
    if (!arr || arr.length === 0) return;

    this.carouselArr = arr;
    this.currentIndex = 0;
    this.Show(this.carouselArr[this.currentIndex]);

    // botões de navegação
    this.CreateNavigationButtons();

    
    this.timer = setInterval(() => this.Next(), 3000);
  }

  static Show(item) {
    const carouselDiv = document.getElementById("carousel");
    const titleDiv = document.getElementById("carousel-title");

    if (carouselDiv && titleDiv) {
      carouselDiv.style.backgroundImage = `url('img/${item.image}')`;
      carouselDiv.style.backgroundSize = "contain";
      carouselDiv.style.backgroundRepeat = "no-repeat";
      carouselDiv.style.backgroundPosition = "center";
      carouselDiv.style.height = "900px";
      carouselDiv.style.transition = "background-image 1s ease-in-out";
      carouselDiv.style.position = "relative"; 

      
      titleDiv.innerHTML = `
        <a href="${item.url}" 
           style="color:#003399; text-decoration:none; font-size:22px; font-weight:bold;">
          ${item.title}
        </a>`;
      titleDiv.style.textAlign = "center";
      titleDiv.style.padding = "20px";
    }
  }

  static Next() {
    if (!this.carouselArr || this.carouselArr.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.carouselArr.length;
    this.Show(this.carouselArr[this.currentIndex]);
  }

  static Prev() {
    if (!this.carouselArr || this.carouselArr.length === 0) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.carouselArr.length) % this.carouselArr.length;
    this.Show(this.carouselArr[this.currentIndex]);
  }

  //setas 
  static CreateNavigationButtons() {
    const carouselDiv = document.getElementById("carousel");
    if (!carouselDiv) return;

    
    if (document.getElementById("carousel-prev")) return;

    const btnPrev = document.createElement("button");
    const btnNext = document.createElement("button");

    btnPrev.id = "carousel-prev";
    btnNext.id = "carousel-next";
    btnPrev.innerHTML = "&#10094;"; // seta esquerda
    btnNext.innerHTML = "&#10095;"; // seta direita

    // CSS
    [btnPrev, btnNext].forEach((btn) => {
      btn.style.position = "absolute";
      btn.style.top = "50%";
      btn.style.transform = "translateY(-50%)";
      btn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      btn.style.color = "#fff";
      btn.style.border = "none";
      btn.style.padding = "12px";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "24px";
      btn.style.borderRadius = "50%";
      btn.style.transition = "background-color 0.3s ease";
    });

    btnPrev.style.left = "20px";
    btnNext.style.right = "20px";

   
    btnPrev.onmouseenter = btnNext.onmouseenter = (e) =>
      (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.8)");
    btnPrev.onmouseleave = btnNext.onmouseleave = (e) =>
      (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)");

    
    btnPrev.onclick = () => {
      clearInterval(this.timer);
      this.Prev();
      this.timer = setInterval(() => this.Next(), 3000);
    };
    btnNext.onclick = () => {
      clearInterval(this.timer);
      this.Next();
      this.timer = setInterval(() => this.Next(), 3000);
    };

    carouselDiv.appendChild(btnPrev);
    carouselDiv.appendChild(btnNext);
  }
}
