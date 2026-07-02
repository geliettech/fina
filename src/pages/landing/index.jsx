import Download from "../../components/Download";
// import Faq from "../../components/Faq";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import Header from "../../components/header"
import Hero from "../../components/hero"
import Testimonials from "../../components/Testimonials";
// import Pricing from "../../components/Pricing";

const LandingPage = () => {
    return (
        <main className="overflow-hidden">
            <Header />
            <Hero />
            <Features />
            {/* <Pricing /> */}
            {/* <Faq /> */}
            <Download />
            <Testimonials />
            <Footer />
        </main>
    );
};

export default LandingPage;