import React, { useEffect, useState } from "react";
import { useTransition, useSprings, animated } from 'react-spring'
import './GooLoader.css'
import placeHolder from './Images/arrow-icon.png'
import { useRef } from "react";


const GooLoader = ( { viewportHeight = "85%", itembarHeight = "15%", width = "auto", height="auto", projectsArray, iconAnimations = { from: {}, to: {} }, galleryAnimations = { from: {}, to: {} } , ...props } ) => {
    const [ imageIndex, setimageIndex ] = useState(0)
    const [ isVisible, setIsvisible ] = useState(false)
    const [ imageArray, setImageArray ] = useState(projectsArray[0].screenshotsArray)
    const [ index, setIndex ] = useState(0)

    const sectionRef = useRef(null)

    const projectsTransition = useTransition(true, {
        from: { height: "50%", width: "50%", borderRadius: "0em", delay: 0 },
        enter: item => async (next) => {
            await next({ height: "100%",width: "100%", borderRadius: "0em" })
        },
        leave:{ height: "0%",width: "0%", borderRadius: "5em", delay: 0 },
    })

    const screenshotsTransition = useTransition(imageArray, {
        from: { width: "0%", delay: 0 },
        enter: item => async (next) => {
            await next({  width: "100%", delay: 0 })
        },
        leave:{ width: "0%", delay: 0 },
    })

    const getAnimationStyles = (animationStyles) => {
        let styleObj = {}
        for (const key in animationStyles) {
            if (Object.hasOwnProperty.call(animationStyles, key)) {
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
    }))

    const itemClickHandler = ( event, itemIndex ) => {
        setIndex(itemIndex)
        setimageIndex(0)
    }

    const transitionImage = () => {
        console.log("setting to false")

        setIsvisible(false)
        setTimeout(() => {
            console.log("setting to true")
            setIsvisible(true)
        }, 2000)
    }

    const getImageIndex = (scrollForward) => {
        const { screenshotsArray } = projectsArray[index]
        if(scrollForward) {
            imageIndex === screenshotsArray.length - 1 ? setimageIndex(0) : setimageIndex(v => v+1)
        } else {
            imageIndex === 0 ?  setimageIndex(screenshotsArray.length - 1) : setimageIndex(v => v-1)
        }
    }

    const onGalleryScrollClick = (scrollForward = true) => {
        getImageIndex(scrollForward)
        setIsvisible(v => !v)
    }

    return(
        <section ref={sectionRef} style={{width:width, height: height}}>
            <div className="viewport" style={{
                gridTemplateRows: `${viewportHeight} ${itembarHeight}`
            }}>
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
                        {screenshotsTransition((imagesStyle, imageItem) =>
                            <animated.img
                                src={imageItem[imageIndex]}
                                alt="project screenshot"
                                style={imagesStyle}
                                onClick={() => console.log(imageItem)}
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