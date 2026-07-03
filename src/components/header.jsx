import { Link as LinkScroll } from "react-scroll";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router";
import { useTheme } from "../layout/context/themeProvider";
import { Button } from "@/components/ui/button";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { theme } = useTheme();
  const navigate = useNavigate();

  const NAV_ITEMS = ["Features", "Pricing", "FAQ",];

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <header className={clsx("fixed top-0 left-0 z-50 w-full text-foreground transition-all duration-500", hasScrolled
      ? "py-1 bg-background/70 backdrop-blur-md shadow-sm"
      : "py-4 bg-transparent")}>
      <div className="container flex items-center justify-between h-16">
        {/* logo */}
        <Link to="/" className="relative z-20 cursor-pointer">
          <img src={
            theme === "light"
              ? "/images/fina-light.png"
              : "/images/fina-dark.png"
          } width={160} height={55} alt="logo" />
        </Link>
        <div className={clsx("lg:flex lg:flex-1 lg:items-center lg:justify-between lg:ml-2", "max-lg:absolute max-lg:top-full max-lg:left-6 max-lg:right-6 max-lg:bg-card max-lg:rounded-xl max-lg:shadow-200", "transition-all duration-300 ",
          isOpen ? "max-lg:opacity-100 max-lg:translate-y-0" : "max-lg:opacity-0 max-lg:-translate-y-5")}>
          {/* navigation & authenication */}
          <div className="relative z-10 flex lg:flex-row flex-col lg:items-center lg:justify-between w-full max-lg:p-10 max-lg:gap-8">
            {/* navigation */}
            <nav className="w-full lg:w-auto">
              <ul className="flex max-lg:flex-col gap-12">
                {NAV_ITEMS.map((title) => (
                  <li key={title} className="nav-li">
                    <LinkScroll
                      onClick={() => setIsOpen(false)}
                      to={title}
                      offset={-100}
                      spy
                      smooth
                      activeClass="nav-active"
                      className="base text-foreground capitalize cursor-pointer transition-all duration-500 hover:scale-105 hover:text-secondary hover:underline"
                    >
                      {title}
                    </LinkScroll>
                  </li>
                ))}
              </ul>
            </nav>
            <hr className="lg:hidden border border-border/60 size-full rounded-full" />
            {/* authenication */}
            <div className="flex flex-col lg:flex-row gap-8">
              <Button variant="ghost" size="lg" className="rounded-full btn base" aria-label="sign-in" onClick={() => navigate("/sign-in")}>Sign In</Button>
              <Button size="lg" className="rounded-full btn base" aria-label="sign-up" onClick={() => navigate("/sign-up")}>Start for Free</Button>
            </div>
          </div>
          {/* Background */}
          <div className="lg:hidden absolute inset-0 pointer-events-none">
            <img
              src="/images/bg-outlines.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            <img
              src="/images/bg-outlines-fill.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-5"
            />
          </div>
        </div>
        {/* Hamburger */}
        <button
          className="lg:hidden z-2 size-10 border-2 border-border/60 rounded-full flex justify-center items-center"
          onClick={() => setIsOpen((prevState) => !prevState)} aria-label="Toggle menu"
        >
          <img
            src={`/images/${isOpen ? "close" : "magic"}.svg`}
            alt="magic"
            className="size-1/2 object-contain"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;