import React from 'react';
import classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      Developer <a href='https://github.com/Deborasm'>Débora Mariante</a>
      <div className={classes.socialIcons}>
        <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="https://pt-br.facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="https://zap.convertte.com.br/gerador-link-whatsapp/"><FontAwesomeIcon icon={faWhatsapp} /></a>
      </div>
    </footer>
  );
};

export default Footer;