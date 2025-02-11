import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import { useRef } from "react";
const Features = () => {

    const videoRef = useRef();
    useGSAP(() => {
        gsap.to(".section-heading" , {opacity:1 , y:0})
        gsap.to(".g_grow" , {scale:1 , opacity:1 , ease:'power1'} , {scrub: 5.5})
        gsap.to(".g_text" , {scale:1 , opacity:1 , y: 0 ,ease:'power2.inOut' , duration:1 })

    },[]);
  return (
    <section className="h-full common-padding bg-zinc overflow-hidden relative">
        <div className="screen-max-width">
            <div className="mb-12 w-full">
                <h1 id="#features_title" className="section-heading">Explore the full story.</h1>
            </div>

            <div className="flex flex-col overflow-hidden justify-center items-center">
                <div className="mt-32 mb-24 pl-24">
                    <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
                    <h2 className="text-5xl lg:text-7xl font-semibold">Forged in titanium.</h2>
                </div>

                <div className="flex-center flex-col sm:px-10">
                    <div className="relative w-full flex items-center h-[50vh]">
                        <video id="exploreVideo" playsInline className="w-full h-full object-cover object-center" preload="none" muted autoPlay ref={videoRef} loop>
                            <source src={exploreVideo} type="video/mp4"/>
                        </video>
                    </div>

                    <div className="flex flex-col w-full relative">
                        <div className="feature-video-container">
                            <div className="overflow-hidden flex-1 h-15vh">
                                <img src={explore1Img} alt="Titanium" className="feature-video g_grow" />
                            </div>

                            <div className="overflow-hidden flex-1 h-[50vh]">
                                <img src={explore2Img} alt="Titanium2" className="feature-video g_grow" />
                            </div>
                        </div>

                        <div className="feature-text-container">
                            <div className="flex-1 flex-center">
                                <p className="feature-text g_text">
                                    iPhone 15 Pro is {' '}
                                    <span className="text-white">
                                        the first iPhone to feature an aerospace-grade titanium design
                                    </span>,
                                    using the same alloy that spacecrafts use to missions to Mars
                                </p>
                            </div>

                            <div className="flex-1 flex-center">
                                <p className="feature-text g_text">
                                     Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                                    <span className="text-white">
                                        lighest Pro models ever
                                    </span>,
                                    You'll notice the difference the moment you pick one up.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features
