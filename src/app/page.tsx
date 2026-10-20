import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Menu } from "@/components/sections/Menu";
import { Gallery } from "@/components/sections/Gallery";
import { Location } from "@/components/sections/Location";
import { Events } from "@/components/sections/Events";
import { Instagram } from "@/components/sections/Instagram";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Location />
      <Events />
      <Instagram />
    </>
  );
}
