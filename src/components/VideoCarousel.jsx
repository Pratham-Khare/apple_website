import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import { pauseImg, playImg, replayImg } from "../utils";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const VideoCarousel = () => {
    
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video , setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoID: 0 ,
        isLastVideo: false,
        isPlaying: false
    })

    const [loadedData , setLoadedData ] = useState([]);

    const {isEnd , startPlay , videoID , isLastVideo , isPlaying} = video;

    useGSAP(() => {

        gsap.to('#slider' , {
            transform: `translateX(${-100 * videoID}%)`,
            duration:2,
            ease: 'Power2.inOut'
        }) 

        gsap.to("#video" , {
            scrollTrigger:{
                trigger: "#video",
                toggleActions: "restart none none none"
            },

            onComplete: () => {
                setVideo((pre)=> ({
                    ...pre , 
                    startPlay: true , isPlaying:true
                }) )
            }
        })
    } , [isEnd , videoID])

    useEffect(() => {

        if(loadedData.length > 3){
            if(!isPlaying){
                videoRef.current[videoID].pause();
            }
            else{
                startPlay && videoRef.current[videoID].play();
            }
        }

    }, [startPlay , videoID , isPlaying , loadedData])

    
    const handleLoadedMetaData = (i , e) => setLoadedData((pre) => [...pre , e])

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if(span[videoID]){
            //animate the progress of the video
            let anim = gsap.to(span[videoID],{
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);

                    if(progress != currentProgress){
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoID] , {
                            width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : "4vw"
                        })

                        gsap.to(span[videoID] , {
                            width: `${currentProgress}%` ,
                            backgroundColor: "white",

                        })
                    }
                },

                onComplete: () => {

                    if(isPlaying){
                        gsap.to(videoDivRef.current[videoID] , {
                            width: '12px'
                        })

                        gsap.to(span[videoID] , {
                            backgroundColor: 'afafaf'
                        })
                    }
                }
            })

            if(videoID === 0){
                anim.restart;
            }

            const animUpdate = () => {
                anim.progress(videoRef.current[videoID].currentTime / hightlightsSlides[videoID].videoDuration)
            }
    
            if(isPlaying){
                gsap.ticker.add(animUpdate)
            }
            else{
                gsap.ticker.remove(animUpdate)
            }
        }
    } , [videoID , startPlay])

    const handleProcess = (type , i) => {
        switch(type){
            case 'video-end':
                setVideo((pre) => ({...pre , isEnd: true , videoID: i+1 }));
                break;
            case 'video-last':
                setVideo((pre) => ({...pre , isLastVideo:true}));
                break;
            case 'video-reset':
                setVideo((pre) => ({...pre , isLastVideo:false , videoID:0 }));
                break;
            case 'play':
                setVideo((pre) => ({...pre , isPlaying: !pre.isPlaying}));
                break;
            case 'pause':
                setVideo((pre) => ({...pre , isPlaying: !pre.isPlaying}));
                break;
            default:
                return video;
        }
    }

    return (
    <>
        <div className="flex items-center">
            {hightlightsSlides.map((list , index) => (
                <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                    <div className="video-carousel_container">
                        <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                            <video id="video" playsInline={true} preload="auto" muted className={`${list.id ===2 && 'translate-x-44'} pointers-event-none`} ref={(el) => (videoRef.current[index] = el)}

                            onEnded = {() => {

                                index!== 3
                                    ? handleProcess('video-end' , index)
                                    : handleProcess('video-last')
                            }}
                            onPlay={() => {
                                setVideo((prevVideo) => ({
                                    ...prevVideo , isPlaying:true
                                }))
                            }}
                            onLoadedMetadata = {(e) => handleLoadedMetaData(index , e)}>

                                <source src={list.video} type="video/mp4"/>
                            </video>
                        </div>

                        <div className="absolute top-12 left-[5%]  z-10 ">
                            {list.textLists.map((text) => (
                                <p key={text} className="md:text-2xl text-xl font-medium">
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="relative mt-10 flex-center ">
            <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                {videoRef.current.map((_ , index) => (
                    <span key={index} ref={(el) => (videoDivRef.current[index] = el)} className="mx-2 w-3 h-3 rounded-full relative bg-gray-200 cursor-pointer">
                        <span key={index} className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[index] = el)}/>
                    </span>
                ))}
            </div>

            <button className="control-btn">
                <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} onClick={isLastVideo ? () => handleProcess ('video-reset') : !isPlaying ? () => handleProcess('play') :()=> handleProcess('pause')} />
            </button>

        </div>
    </>
  )
}

export default VideoCarousel
