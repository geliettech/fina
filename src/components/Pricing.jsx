import { Element } from "react-scroll";
import { useState } from "react";
import clsx from "clsx";
import { plans } from "../constants/index.jsx";
import { Button } from "@/components/ui/button";
import { Marker } from "./Marker.jsx";

const Pricing = () => {
    const [monthly, setMonthly] = useState(false);

    return (
        <section className="py-24 sm:py-28 lg:py-32">
            <Element name="pricing">
                <div className="container">
                    <div className="mx-auto w-full max-w-5xl rounded-[2rem] border border-border bg-primary/5 p-6 sm:p-8 lg:p-12">
                        <div className="space-y-10">
                            <div className="space-y-4 text-center">
                                <p className="text-sm uppercase tracking-[0.35em] text-secondary">
                                    pricing
                                </p>
                                <h3 className="h3 text-primary max-w-4xl mx-auto">
                                    Flexible pricing for Different Users
                                </h3>
                                <p className="mx-auto max-w-2xl body-one text-secondary">
                                    Pick the plan that fits your goals and scale easily to improve your financial health.
                                </p>
                            </div>

                            <div className="mx-auto max-w-md rounded-3xl border border-border/25 bg-secondary/50 p-2 shadow-sm">
                                <div className="relative flex items-center rounded-3xl bg-background p-1">
                                    <button
                                        className={clsx(
                                            "flex-1 rounded-2xl py-3 text-sm font-semibold transition-colors duration-300",
                                            monthly ? "text-foreground" : "text-secondary"
                                        )}
                                        onClick={() => setMonthly(true)}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        className={clsx(
                                            "flex-1 rounded-2xl py-3 text-sm font-semibold transition-colors duration-300",
                                            !monthly ? "text-foreground" : "text-secondary"
                                        )}
                                        onClick={() => setMonthly(false)}
                                    >
                                        Annual
                                    </button>
                                    <div
                                        className={clsx(
                                            "pointer-events-none absolute left-1 top-1 h-[calc(100%-8px)] w-[calc(50%-8px)] rounded-2xl bg-primary/20 transition-transform duration-300",
                                            !monthly && "translate-x-full"
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                                {plans.map((plan, index) => (
                                    <div
                                        key={plan.id}
                                        className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                                    >
                                        {index === 1 && (
                                            <div className="absolute inset-x-0 top-0 h-10 bg-secondary/10" />
                                        )}

                                        <div className="relative z-10 flex flex-col items-center gap-6 pt-6">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-background p-4 shadow-sm">
                                                <img
                                                    src={plan.logo}
                                                    alt={plan.title}
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>

                                            <div className="rounded-[1.25rem] border border-border px-4 py-2 uppercase text-sm tracking-[0.18em] text-center">
                                                {plan.title}
                                            </div>

                                            <div className="flex items-end gap-2 text-center">
                                                <span className="text-5xl font-bold leading-none">
                                                    &#8358;{monthly ? plan.priceMonthly : plan.priceYearly}
                                                </span>
                                                <span className="small-one uppercase relative top-2">
                                                    / {monthly ? "mo" : "yr"}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="body-1 relative z-10 mb-8 mt-4 border-b border-border pb-9 text-center text-foreground">
                                            {plan.caption}
                                        </p>

                                        <ul className="space-y-4 text-foreground">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-1">
                                                    <img
                                                        src="/images/check.png"
                                                        alt="check"
                                                        className="size-10 object-contain"
                                                    />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-10 flex justify-center">
                                            <Button
                                                size="lg"
                                                className="rounded-full btn base p-4 flex items-center gap-2 relative"
                                                aria-label={`Get started with ${plan.title}`}
                                            >
                                                <span className="absolute -left-px">
                                                    <Marker fill="currentColor" className="text-secondary size-5 z-10" />
                                                </span>
                                                <img
                                                    src={plan.icon}
                                                    alt={plan.title}
                                                    className="text-secondary size-6 z-10"
                                                />
                                                Get Started
                                            </Button>
                                        </div>

                                        {index === 1 && (
                                            <p className="small-compact mt-9 text-center text-foreground uppercase tracking-[0.25em]">
                                                Limited time offer
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Element>
        </section>
    );
};

export default Pricing;
