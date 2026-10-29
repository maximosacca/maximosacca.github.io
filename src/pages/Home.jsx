import Hero from "../components/Home/Hero.jsx";
import About from "../components/Home/About.jsx";
import NasaButton from "../components/Layout/NasaButton.jsx";

export default function Home() {
  return (
    <main >
      <NasaButton />
      <Hero />
      <About />
    </main>
  );
}
