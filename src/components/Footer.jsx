import "../blocks/Footer.css";
import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© 2024 Supersite, Powered by News API</p>
      <div className="footer__items">
        <p className="footer__home">Home</p>
        <p className="footer__about">TripleTen</p>
      </div>
      <div className="footer__links">
        <a href="https://github.com/dashboard" className="footer__icon-link">
          <img src={githubIcon} alt="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/deondre-butler-7b88b6214/"
          className="footer__icon-link"
        >
          <img src={linkedinIcon} alt="LinkedIn" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
