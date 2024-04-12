import { useEffect } from 'react';
import "./Scroller.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Scroller = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const scrollDivs = gsap.utils.toArray(".scroll-div");
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#scrollcontainer",
                start: "50% 50%",
                end: "bottom+=50% 50%",
                // endTrigger: "#end",
                // end: "+=500",
                // pin: true,
                scrub: 1,
                pin: true,
                onUpdate: self => {
                    // document.querySelector(".container")?.classList.toggle("done",self.progress > 0.5);
                    if (self.progress > 0.8 && self.progress < 1) {
                        document.querySelector("#scrollcontainer")?.classList.add("done");
                    } else document.querySelector("#scrollcontainer")?.classList.remove("done");
                    // console.log("progress", self.progress);
                }
                // onEnter: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
                // onScrubComplete: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
                // markers: true
                // snap: {
                //     snapTo: "labels", // snap to the closest label in the timeline
                //     duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                //     delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
                //     ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
                // },
            }
        });

        scrollDivs.forEach((div, i) => {
            let circle = gsap.utils.toArray("#circle", div);
            let p = gsap.utils.toArray("p", div);
            tl.from(div, {
                autoAlpha: 0,
                y: 20,
            });
            tl.from(circle, {
                scale: 0,
            }), "<";
            tl.to(circle, {
                scale: 5
            }), "<";
            // just get the <p> elements inside this <div>
            tl.from(p, {
                autoAlpha: 0,
                y: 10,
                stagger: 0.1
            }, "<");
            tl.to(gsap.utils.toArray(" #r", div), {
                color: "#ccc"
            }), "<";
            tl.to(gsap.utils.toArray(" #r i", div), {
                scaleX: 1,
            }), "<";
            tl.to(circle, {
                scale: 6,
                borderRadius: "0"
            }), "<";
            tl.from(gsap.utils.toArray("h2 #a", div), {
                opacity: 0,
            }), "<";
            tl.to(gsap.utils.toArray("h2 #a", div), {
                opacity: 1
            }), "<";
            // tl.to(gsap.utils.toArray("h2", div).concat(circle).concat(p), {
            //     autoAlpha: 0,
            //     y: -50,
            //     stagger: 0.1,
            //     ease: "power1.in"
            // });
        });

        return () => {
            second;
        };
    }, []);

    return (
        <>
            <div id="scrollcontainer">
                <div class="scroll-div">
                    <div id="circle" />
                    <h2>Now this is a <span id="r"><i />circle</span> <span id="a">square</span></h2>
                    <p>Yet another useless paragraph</p>
                    <p>Yet another useless paragraph</p>
                    <p>Yet another useless paragraph</p>
                    <p>Yet another useless paragraph</p>
                    <p>Yet another useless paragraph</p>
                </div>
            </div>
        </>
    );
};

export default Scroller;