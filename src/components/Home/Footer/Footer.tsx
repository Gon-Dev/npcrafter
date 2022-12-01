import "./Footer.css";
import footerShape from "../../../assets/footer-shape.svg";
function Footer() {
  return (
    <footer className="footer-wrapper">
      <img className="footer-background" src={footerShape} alt="" />
      <p className="footer-text">
        The literal and graphical information presented on this site about
        Magic: The Gathering, is copyright Wizards of the Coast, LLC, a
        subsidiary of Hasbro, Inc. More information <a href="https://company.wizards.com/en" target="_blank" className="footer-link">here</a>.
        <br />
        Designed and coded with a natural 20 by Goni.
      </p>
    </footer>
  );
}

export default Footer;
