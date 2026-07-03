import { Element } from "react-scroll";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Marker } from "./Marker.jsx";


const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 sm:py-28 lg:py-36">
      <Element name="hero">
        <div className="container flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:w-1/2">
            <div className="caption small-two uppercase text-foreground mb-4">
              finance tracking
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:h2 max-md:text-5xl max-md:leading-12">
              manager & advisor
            </h1>
            <p className="max-w-2xl mb-10 body-1">
              We designed fina - Finance tracker with AI advisor to help you understand your financial health, receive financial advice, and make smarter money decisions through a secure platform.
            </p>
            <div className="flex flex-wrap gap-4">
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
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/images/hero.png"
              className="max-w-full h-auto"
              alt="hero"
            />
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
