var devTeamCarousel = _ => {
  const
    //Carousel element styles
    style = `<style>
      #front-end-header {
        text-align: center;
        padding: 0 1rem}
      .dev__carousel-slide {
        margin: 0 6rem;
        padding: 4rem .5rem 2.5rem;
        display: flex;
        justify-content: space-evenly}
      .dev__carousel-img-wrapper {
        background: white;
        width: 20rem;
        height: 11rem;
        padding: 1rem}
      .dev__carousel img {
        width: 100%;
        transform: translate(0,-30%)}
      .dev__carousel-content {
        color: white;
        margin-left: 0.5rem}
      .dev__carousel h2 {
        font-size: 3.5em;
        margin:0.375em 0}
      .dev__carousel p {
        font-size:1.35rem}
      @media screen and (max-width: 970px){
        .dev__carousel-slide {
          margin: 0 4rem;
          padding: 4rem .5rem 2rem;
          flex-direction: column;
          align-items: center;
          text-align: center}
      }
      @media screen and (max-width: 600px){
        .dev__carousel-slide {
          margin: 0 2.5rem}
        .dev__carousel-img-wrapper {
          background: white;
          width: 17rem;
          height: 9.35rem}
        .dev__carousel h2 {
          font-size: 2em}
      }
    </style>`
    //stringified slide template
    template = (name, title, img) => (
      `<div>
        <div class='dev__carousel-slide h-background--blue'>
          <div class='dev__carousel-img-wrapper'>
            <img src='${img}' alt='${name}'/>
          </div>
          <div class='dev__carousel-content'>
            <h2>${name}</h2>
            <p>${title}</p>
          </div>
        </div>
      </div>`
    );
  //AJAX request for about page
  $.get("http://blueacorn.com/about/", null, function(r){
      const
        // return all profile card elements
        dev = $(r).find(".card .block"),
        // reduce function on returned cards
        arr = [...dev].reduce((a, c) => {
          let name = $(c).find("h2")[0].innerHTML,
              title = $(c).find("p")[0].innerHTML,
              img = $(c).find("img")[0].src;
          //if matches regex and is not duplicate, add templated data to accumulator string
          if(title.match(/front\W*end/i) && !a.includes(name)){
            a += template(name, title, img);
          }
          return a;
        }, template("Vincent Martin", "Your Newest Hire", "https://image.ibb.co/cpuAkJ/vincent_martin.png"));
      // append styles to end of head
      $("head")[0].insertAdjacentHTML("beforeend", style);
      // append carousel after 'The People' section
      $(".home__content")[1].insertAdjacentHTML("afterend",
        `<section class='home__front-end' style='margin-bottom:6.5rem;'>
          <h2 id="front-end-header">FRONT-END TEAM</h2>
          <div class='dev__carousel'>
            ${arr}
          </div>
        </section>`);
      //call slick library on carousel
      $('.dev__carousel').slick();
    });
}
$(document).ready(_ => {
  devTeamCarousel();
})
