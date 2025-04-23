import React from "react";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
return (
<div>
<div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators text-dark">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/adidas-hero.avif" class="d-block w-100" alt="Hero 1" />
      <div class="carousel-caption d-none d-md-block">
        <h5 className="text-dark">Latest Adidas Drops</h5>
        <p className="text-dark">Slide into style</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/nike-hero.avif" class="d-block w-100" alt="Hero 2" />
      <div class="carousel-caption d-none d-md-block">
        <h5 className="text-dark">Latest Nike Drops</h5>
        <p className="text-dark">Slide into style.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/reebok-hero.webp" class="d-block w-100" alt="Hero 4" />
      <div class="carousel-caption d-none d-md-block">
        <h5 className="text-dark">Latest Reebok Drops</h5>
        <p className="text-dark">Slide into style.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/puma-hero.avif" class="d-block w-100" alt="Hero 3" />
      <div class="carousel-caption d-none d-md-block">
        <h5 className="text-dark">Latest Puma Drops</h5>
        <p className="text-dark">Slide with style.</p>
      </div>
    </div>
  </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
  <span className="custom-carousel-icon">←</span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
  <span className="custom-carousel-icon">→</span>
  <span className="visually-hidden">Next</span>
</button>

</div>
)
}

export default Home;