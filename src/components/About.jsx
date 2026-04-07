import "../blocks/About.css";
import personImage from "../assets/resume-pic.jpg";

function About() {
  return (
    <section className="about">
      <img src={personImage} alt="Author" className="about__image" />
      <div className="about__info">
        <h1 className="about__title">About The Author</h1>
        <p className="about__description">
          I am a 25-year-old Navy veteran, an electrician, and a student at
          TripleTen. I enjoy building creative websites and turning fresh ideas
          into practical, user friendly solutions. Through TripleTen, I have
          strengthened my skills in HTML, CSS, JavaScript, React. I can help
          potential customers by creating clean responsive web experiences that
          are both visually engaging and reliable.
        </p>
      </div>
    </section>
  );
}

export default About;
