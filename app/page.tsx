import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Process from "./components/Process";
import Services from "./components/Services";
import SiteChrome from "./components/SiteChrome";
import Work from "./components/Work";

export default function Home() {
  return (
    <>
      <SiteChrome />
      <div className="lg:pr-24 lg:pl-[300px] xl:pl-[360px] 2xl:pl-sidebar-width">
        {/* Sections size themselves against this container, not the viewport, since the sidebar eats into the width. */}
        <main className="@container relative min-h-screen overflow-x-clip bg-background pt-16 pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pt-0 lg:pb-0">
          <Hero />
          <About />
          <Services />
          <Process />
          <Work />
          <Contact />
        </main>
      </div>
    </>
  );
}
