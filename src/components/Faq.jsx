import { Element } from "react-scroll";
import { faqs } from "../constants/index.jsx";
import { useState } from "react";
import clsx from "clsx";

const Faq = () => {

  const [activeId, setActiveId] = useState(null);


  return (
    <section>
      <Element name="faq" className="relative">
        <div className="container relative z-2 py-28">

          {/* FAQ SECTION */}
          <div>
            <div>

              <div>
                <h3 className="h3 max-md:h5 max-w-640 max-lg:max-w-md mb-7 text-p4">
                  Curiosity didn't kill the cat, it gave it answers.
                </h3>
                <p className="body-1 max-lg:max-w-sm">
                  You've got questions, we've got answers.
                </p>
              </div>

              <div className="faq-line_after w-0.5 h-full absolute left-[calc(50%-1px)] top-0 -z-1 bg-primary" />
            </div>



            <div className="faq-glow_before relative z-2 border-2 border-border bg-secondary">
              <div className="container flex gap-10 max-lg:block">
                <div className="rounded-lg absolute -top-10 left-[calc(50%-40px)] z-4 flex size-20 items-center justify-center border-2 border-secondary bg-primary">
                  <img src="/images/faq-logo.svg" alt="logo" className="size-1/2" />
                </div>
                  
            <div className="grid grid-cols-1 lg:grid-cols-2 row-span-2 gap-12 py-20 w-full">
              {faqs.map((faq) => {
                const active = activeId === faq.id;
                return (
                  <div className="relative z-2 mb-16" key={faq.id}>
                    <div
                      className="group relative flex cursor-pointer items-center justify-between gap-10 px-7"
                      onClick={() => setActiveId(active ? null : faq.id)}
                    >
                      <div className="flex-1">
                        <div className="small-compact mb-1.5 text-p3 max-lg:hidden">
                          {faq.id < 10 ? "0" : ""}
                          {faq.id}
                        </div>
                        <div
                          className={clsx(
                            "h6 text-p4 transition-colors duration-500 max-md:flex max-md:min-h-20 max-md:items-center",
                            active && "max-lg:text-p1"
                          )}
                        >
                          {faq.question}
                        </div>
                      </div>
                      <div
                        className={clsx(
                          "faq-icon relative flex size-12 items-center justify-center rounded-full border-2 border-s2 shadow-400 transition-all duration-500 group-hover:border-s4",
                          active && "before:bg-p1 after:rotate-0 after:bg-p1"
                        )}
                      >
                        <div className="g4 size-11/12 rounded-full shadow-300" />
                      </div>
                    </div>

                    {active && (
                      <div className="body-3 px-7 py-3.5">{faq.answer}</div>
                    )}

                    <div
                      className={clsx(
                        "g5 -bottom-7 -top-7 left-0 right-0 -z-1 rounded-3xl opacity-0 transition-opacity duration-500 absolute",
                        active && "opacity-100"
                      )}
                    >
                      <div className="g4 absolute inset-0.5 -z-1 rounded-3xl" />
                      <div className="absolute left-8 top-0 h-0.5 w-40 bg-p1" />
                    </div>
                  </div>
                );
              })}
            </div>
              </div>

            </div>

          </div>






          <div className="faq-lin_after absolute left-[calc(50%-1px)] top-0 -z-1 h-full w-0.5 bg-secondary max-lg:hidden" />
        </div>
      </Element>
    </section>
  );
};

export default Faq;

