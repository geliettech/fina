import { socials } from "../constants/index.jsx";

const Footer = () => {
  return (
    <footer className="bg-surface py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-center">
          <div className="text-center md:text-left">
            <p className="small-compact text-sm text-foreground opacity-70">Copyright, fina 2026. Powered by geliettech.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-center text-sm text-foreground md:justify-center">
            <a href="#" className="transition-all duration-500 hover:text-secondary">
              Privacy Policy
            </a>
            <span className="hidden md:inline-block">|</span>
            <a href="#" className="transition-all duration-500 hover:text-secondary">
              Terms of Use
            </a>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((social) => (
              <li key={social.id}>
                <a href={social.url} className="social-icon transition-colors duration-300 hover:text-secondary">
                  <img src={social.icon} alt={social.title} className="h-8 w-8 object-contain" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
