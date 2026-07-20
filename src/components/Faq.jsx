import { Element } from "react-scroll";
import { faqs } from "../constants/index.jsx";
import { useState } from "react";
import clsx from "clsx";

const Faq = () => {

  const [activeId, setActiveId] = useState(null);


  return (
    <section className="bg-secondary py-16 sm:py-20">
      <Element name="faq" className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary opacity-80">
              Frequently asked questions
            </p>
            <h2 className="mb-4 text-3xl font-semibold leading-tight text-primary sm:text-4xl">
              Curiosity didn't kill the cat, it gave it answers.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-8 text-primary sm:text-lg">
              You've got questions, we've got answers. Explore our most common queries and get the clarity you need.
            </p>
          </div>



          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {faqs.map((faq) => {
              const active = activeId === faq.id;
              return (
                <div key={faq.id} className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-sm transition-shadow duration-300 hover:shadow-lg">
                  <button
                    type="button"
                    onClick={() => setActiveId(active ? null : faq.id)}
                    className="flex w-full flex-col gap-4 px-6 py-6 text-left sm:px-8 sm:py-7"
                    aria-expanded={active}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary opacity-80 sm:text-sm">
                          {faq.id < 10 ? `0${faq.id}` : faq.id}
                        </div>
                        <h3 className={clsx("text-lg font-semibold leading-7 text-primary transition-colors duration-300 sm:text-xl", active && "text-sidebar-primary")}>
                          {faq.question}
                        </h3>
                      </div>
                      <div
                        className={clsx(
                          "relative flex h-12 w-12 items-center justify-center rounded-full border border-s2 transition duration-300",
                          active ? "bg-sidebar-primary border-sidebar-primary text-primary-foreground" : "bg-background"
                        )}
                      >
                        <span className={clsx("block h-5 w-5 rounded-full transition-transform duration-300", active ? "bg-background" : "bg-chart-4")} />
                      </div>
                    </div>
                  </button>

                  {active && (
                    <div className="border-t border-border px-6 py-5 text-sm leading-7 text-foreground sm:px-8 sm:py-6">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Element>
    </section>





  );
};

export default Faq;

