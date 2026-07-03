import { Element, Link as LinkScroll } from "react-scroll";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Marker } from "./Marker.jsx";


const Hero = () => {
  const navigate = useNavigate();


  return (
    <section className="relative py-30">
      <Element name="hero">
        <div className="container flex flex-row max-lg:flex-col-reverse justify-between max-lg:justify-center items-center">
          <div className="max-w-512 max-lg:max-w-388">
            <div className="caption small-two uppercase text-foreground">
              finance tracking
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              manager & advisor
            </h1>
            <p className="max-w-440 mb-10 body-1 max-md:mb-10">
              We designed fina - Finance tracker with AI advisor to helps you understand your financial health, receive Financial Advice, and make smarter financial decisions through a secure platform.
            </p>
            <LinkScroll to="features" offset={-100} spy smooth>

              <Button
                size="lg"
                className="rounded-full btn base p-4 flex items-center gap-2 relative"
                aria-label="sign-up"
                onClick={() => navigate("/sign-up")}
              >
                <span className="absolute -left-px">
                  <Marker fill="currentColor" className="text-secondary size-5 z-10" />
                </span>
                <img
                  src="/images/zap.svg"
                  alt="zap"
                  className="text-secondary size-6 z-10"
                />
                Try it now
              </Button>
            </LinkScroll>
          </div>

          <div className="w-150 pointer-events-none">
            <img
              src="/images/hero.png"
              className="size-150 max-lg:h-auto"
              alt="hero"
            />
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
