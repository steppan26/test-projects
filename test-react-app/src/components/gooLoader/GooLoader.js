import React, { useEffect, useState } from "react";
import { useSpring, useSprings, animated } from 'react-spring'
import './GooLoader.css'
import DisplaySection from "./DisplaySection";
import placeHolder from './Images/icon.png'
import { useRef } from "react";

const GooLoader = ( { projectsArray, iconAnimations = { from: {}, to: {} }, galleryAnimations = { from: {}, to: {} } , ...props } ) => {
    const [projectsStyle, setProjectsStyle] = useState([])
    const [activeProjectId, setActiveProjectId] = useState(0)
    const sectionRef = useRef(null)
    const [tempState, setTempState] = useState(false)

    const [displayedImagesArray, setdisplayedImagesArray] = useState()
    const [isVisible, setIsvisible] = useState(false)

    // const style = useSpring(elementStyle(tempState))


    useEffect(() => {
        projectsArray.forEach(project => {
            // console.log("useEffect: ", project.screenshotsArray)
        })
    }, [])

    const springsConfigs = projectsArray.map( (project, index) => {
        return {style: iconAnimations.from, key: index}
    })

    const setVariable = (animationValues, isActive = false) => {
        console.log(animationValues)
    }


    const [ index, setIndex ] = useState(0)

    const springs = useSprings(
        projectsArray.length,
        projectsArray.map((project, i) => {
            setVariable(iconAnimations)
        return({
            transform: index === null | i === index ? iconAnimations.to.transform : iconAnimations.from.transform,
            opacity: index === null | i === index ? iconAnimations.to.opacity : iconAnimations.from.opacity,
            delay: index === null | i === index ? iconAnimations.to.delay : iconAnimations.from.delay,
            from: iconAnimations.from,
        })
    }))


    function itemClickHandler( event, index ) {
        setIndex(index)
    }



    const transitionImages = async (projectIndex) => {
        setIsvisible(false)
        setTimeout(() => {
            setdisplayedImagesArray(projectsArray[projectIndex].galleryArray)
            setIsvisible(true)

        }, 500)
    }

    const toggleSelectedItemEffects = (selectedItem) => {
        const iconsArray = [...document.getElementsByClassName('project-item')]
        iconsArray.forEach(icon => {
            selectedItem === icon ? icon.classList.add('selected') : icon.classList.remove('selected')
        })
    }
    return(
        <section ref={sectionRef}>
            <div className="viewport">
                <DisplaySection imageUrl={projectsStyle[activeProjectId]} items={isVisible} />
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