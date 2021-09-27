import React, { useEffect, useState } from "react";
import { useTransition, useSprings, animated } from 'react-spring'
import './GooLoader.css'
import placeHolder from './Images/arrow-icon.png'
import { useRef } from "react";


const GooLoader = ( {width = "auto", height="auto", projectsArray, iconAnimations = { from: {}, to: {} }, galleryAnimations = { from: {}, to: {} } , ...props } ) => {
    const [ activeProjectId, setActiveProjectId ] = useState(0)
    const [ isVisible, setIsvisible ] = useState(false)
    const [ displayedGalleryImageId, setDisplayedGalleryImageId ] = useState(0)

    const sectionRef = useRef(null)

    const projectsTransition = useTransition(true, {
        from: { height: "50%", width: "50%", borderRadius: "0em", delay: 0 },
        enter: item => async (next) => {
            // await next({ height: "50%", width: "50%", borderRadius: "5em", delay: 200 })
            await next({ height: "100%",width: "100%", borderRadius: "0em" })
        },
        leave:{ height: "0%",width: "0%", borderRadius: "5em", delay: 0 },
    })

    const screenshotsTransition = useTransition(isVisible, {
        from: { marginLeft: "auto", marginRight: "auto", width: "0%", borderRadius: "0em", delay: 0 },
        enter: item => async (next) => {
            // await next({ height: "50%", width: "50%", borderRadius: "5em", delay: 200 })
            await next({ marginLeft: "auto", marginRight: "auto", width: "100%", borderRadius: "0em", delay: 200 })
        },
        leave:{ marginLeft: "auto", marginRight: "auto", width: "0%", borderRadius: "5em", delay: 0 },
    })

    const [ index, setIndex ] = useState(0)

    const getAnimationStyles = (animationStyles) => {
        let styleObj = {}
        for (const key in animationStyles) {
            if (Object.hasOwnProperty.call(animationStyles, key)) {
                // element = animationStyles[key];
                styleObj.from = animationStyles['from']
                styleObj.to = animationStyles['to']
            }
        }
        return styleObj
    }

    const springs = useSprings(
        projectsArray.length,
        projectsArray.map((project, i) => {
        return({
            from: getAnimationStyles(iconAnimations).from,
            to: index === null | i === index ? getAnimationStyles(iconAnimations).to : getAnimationStyles(iconAnimations).from
        })
        //     {
        //     transform: index === null | i === index ? iconAnimations.to.transform : iconAnimations.from.transform,
        //     opacity: index === null | i === index ? iconAnimations.to.opacity : iconAnimations.from.opacity,
        //     delay: index === null | i === index ? iconAnimations.to.delay : iconAnimations.from.delay,
        //     from: iconAnimations.from,
        // })
    }))

    const itemClickHandler = ( event, index ) => {
        // setIsvisible(v => !v)
        let result
        index === 0 ? result = getAnimationStyles(iconAnimations, index) : result = getAnimationStyles(galleryAnimations, index)
        console.log(result)
        // if(index !== activeProjectId) return setIsvisible(v => !v)
        // transitionImage()
        setIndex(index)
    }

    const transitionImage = () => {
        console.log("setting to false")

        setIsvisible(false)
        setTimeout(() => {
            console.log("setting to true")
            setIsvisible(true)
        }, 2000)
    }

    const onGalleryScrollClick = (scrollForward = true) => {
        scrollForward ? console.log("next image") : console.log("previous image")
    }

    return(
        <section ref={sectionRef} style={{width:width, height: height}}>
            <div className="viewport">
                <div className="display-area">
                    <div className="display-btns-wrapper">
                        <img
                            src={placeHolder}
                            className="display-nav-btn backwards"
                            alt="previous screenshot icon"
                            onClick= {() => onGalleryScrollClick(false)}
                        />
                        <img
                            src={placeHolder}
                            className="display-nav-btn forwards"
                            alt="next screenshot icon"
                            onClick= {() => onGalleryScrollClick(true)}
                        />
                    </div>
                    {projectsTransition((style, item) =>
                    <animated.div className="container" style={style}>
                        {screenshotsTransition((imagesStyle, item) =>
                            <animated.img
                                src={projectsArray[activeProjectId].screenshotsArray[displayedGalleryImageId]}
                                alt="project screenshot"
                                style={imagesStyle}
                            />
                        )}
                    </animated.div>
                    )}
                </div>
                <div className="selection-wrapper">
                    <div className="item-bar" onClick={() => {console.log(springs)}}>
                    </div>
                    {projectsArray.length > 0 ?
                        springs.map((spring, index) => <animated.img
                                style={{...spring}}
                                src={projectsArray[index].icon}
                                id={projectsArray[index].id}
                                key={projectsArray[index].id}
                                onClick={ (event) => itemClickHandler(event, index)}
                                className="project-item"
                                alt="project icon"
                            />)
                    :
                    <></>
                    }
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                </filter>
            </defs>
        </svg>
        </section>
    )
}

export default GooLoader