import Hero from "./containers/Hero";
import Slideshow from "./containers/Slideshow";
import MakeAWish from "./containers/MakeAWish";
export default function Home() {
  return (
    <main className="bg-[#060d1f] font-tinos">
      <Hero />
      <Slideshow />
      <MakeAWish />
    </main>
  );
}
