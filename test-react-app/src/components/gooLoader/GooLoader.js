import React, { useEffect, useState } from "react";
import { useTransition, useSprings, animated } from 'react-spring'
import './GooLoader.css'
import placeHolder from './Images/arrow-icon.png'
import { useRef } from "react";


const GooLoader = ( { projectsArray, iconAnimations = { from: {}, to: {} }, galleryAnimations = { from: {}, to: {} } , ...props } ) => {
    const [activeProjectId, setActiveProjectId] = useState(0)
    const sectionRef = useRef(null)

    const [isVisible, setIsvisible] = useState(false)

    const transition = useTransition(isVisible, {
        from: { height: "0%", width: "0%", borderRadius: "0em", delay: 0 },
        enter: item => async (next) => {
            // await next({ height: "50%", width: "50%", borderRadius: "5em", delay: 200 })
            await next({ height: "100%",width: "100%", borderRadius: "0em" })
        },
        leave:{ height: "0%",width: "0%", borderRadius: "5em", delay: 0 },
    })

    const springsConfigs = projectsArray.map( (project, index) => {
        return {style: iconAnimations.from, key: index}
    })

    const [ index, setIndex ] = useState(0)

    const springs = useSprings(
        projectsArray.length,
        projectsArray.map((project, i) => {
        return({
            transform: index === null | i === index ? iconAnimations.to.transform : iconAnimations.from.transform,
            opacity: index === null | i === index ? iconAnimations.to.opacity : iconAnimations.from.opacity,
            delay: index === null | i === index ? iconAnimations.to.delay : iconAnimations.from.delay,
            from: iconAnimations.from,
        })
    }))

    function itemClickHandler( event, index ) {
        setActiveProjectId(index)
        setIndex(index)
    }

    return(
        <section ref={sectionRef}>
            <div className="viewport">
                <div className="display-area">
                    <div className="display-btns-wrapper">
                        <img src={placeHolder} className="display-nav-btn backwards" alt="previous screenshot icon" />
                        <img src={placeHolder} className="display-nav-btn forwards" alt="next screenshot icon" />
                    </div>
                    <div className="container">
                        {transition((style, item) =>
                                <animated.img
                                    src={projectsArray[activeProjectId].screenshotsArray[0]}
                                    alt="project screenshot"
                                    style={style}
                                    width="300px"
                                    height="300px"
                                />
                            )
                        }
                    </div>
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