import React from "react";
import classes from "./Home.module.css";
import { NavLink } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imgHome1 from "../assets/imghome.webp";
import imgHome2 from "../assets/imghome2.webp";
import imgHome3 from "../assets/imghome3.webp";

const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.container}>
        <div className={classes.txts}>
          <p>Conheça nossa cafeteria!</p>
          <h1>
            Café colonial, <br/>à la carte <br /> eventos e festas!
          </h1>
          <p className={classes.descricao}>
            Produtos de alta qualidade, <br /> feitos com muito amor!
          </p>

          <NavLink
            to="/cardapio"
            className={`btn-style ${classes.linkCardapio}`}
          >
            Conheça o Cardápio
          </NavLink>
        </div>
        <div className={classes.img}>
          <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} showStatus={false} showIndicators={false}>
            <div>
              <img src={imgHome1} alt="imagem da nossa cafeteria" className={classes.carouselImage} />
            </div>
            <div>
              <img src={imgHome2} alt="imagem da nossa cafeteria" className={classes.carouselImage} />
            </div>
            <div>
              <img src={imgHome3} alt="imagem da nossa cafeteria" className={classes.carouselImage} />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;