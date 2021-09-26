import React, { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring'
import './GooLoader.css'
import DisplaySection from "./DisplaySection";
import placeHolder from './Images/icon.png'
import { useRef } from "react";

const GooLoader = ( { projectsArray, projectsFolderUrl = './Images', ...props } ) => {
    const [projectsStyle, setProjectsStyle] = useState([])
    const [activeProjectId, setActiveProjectId] = useState(0)
    const sectionRef = useRef(null)
    const [tempState, setTempState] = useState(false)

    useEffect(() => {
        projectsArray.forEach(project => {
            // console.log("useEffect: ", project.screenshotsArray)
        })
    }, [])


    // const [iconOneState, updateIconOneState] = useState(false)
    // const [iconTwoState, updateIconTwoState] = useState(false)
    // const [iconThreeState, updateIconThreeState] = useState(false)
    // const [iconFourState, updateIconFourState] = useState(false)
    const [displayedImagesArray, setdisplayedImagesArray] = useState()
    const [isVisible, setIsvisible] = useState(false)


    // const importedImages = importAll(require.context(projectsFolderUrl, false, /\.(png|jpe?g|svg)$/));


    const elementStyle = (state) => {
        return ({
            config: {
                mass: 1.2,
                tension: 120,
                friction: 14,
                precision: 0.001
              },
              from: {
                  transform: "scale(1) translateY(0px)",
                  position: "relative",
                },
              to: {
                transform: state ? "scale(1.4) translateY(-50px)" : "scale(1) translateY(0px)",
                position: "relative",
                delay: 600,
              }
        })
    }

    const style = useSpring(elementStyle(tempState))
    // SET SPRINGS FOR EACH ICON
    // const iconOne = useSpring(elementStyle(iconOneState))
    // const iconTwo = useSpring(elementStyle(iconTwoState))
    // const iconThree = useSpring(elementStyle(iconThreeState))
    // const iconFour = useSpring(elementStyle(iconFourState))


    function itemClickHandler( event ) {
        const wrapper = [...event.target.parentNode.children]
        wrapper.shift()
        wrapper.forEach( (project, index) => {
            if(event.target === project){
                setActiveProjectId(index)
            }
            console.log(project)
        })
        setTimeout(setTempState(v => !v), 1000)

        const rootElement = event.target.parentNode.parentNode.parentNode


            // projectsStyle.forEach(project => console.log(project.id))
            // updateIconOneState(iconOne)
            // updateIconTwoState(iconTwo)
            // updateIconThreeState(iconThree)
            // updateIconFourState(iconFour)
            // transitionImages(image)
            // rootElement.style.setProperty('--var-temp', color, 'important')



            // toggleSelectedItemEffects(event.target)
    }

    const transitionImages = async (projectIndex) => {
        setIsvisible(false)
        setTimeout(() => {
            setdisplayedImagesArray(projectsArray[projectIndex].galleryArray)
            setIsvisible(true)

        }, 500)
    }

    const toggleSelectedItemEffects = (selectedItem) => {
        const iconsArray = [...document.getElementsByClassName('selection-item')]
        iconsArray.forEach(icon => {
            selectedItem === icon ? icon.classList.add('selected') : icon.classList.remove('selected')
        })
    }
    return(
        <section ref={sectionRef}>
            <div className="viewport">
                <DisplaySection imageUrl={projectsStyle[activeProjectId]} items={isVisible} />
                <div className="selection-wrapper">
                    <div className="item-bar" onClick={() => {console.log()}}>
                    </div>
                    {projectsArray.length > 0 ?
                        projectsArray.map((project, index) => {
                            return (
                                <animated.img
                                    style={index === activeProjectId ? style : {}}
                                    src={project.icon}
                                    id={project.id}
                                    key={index}
                                    onClick={ (event) => itemClickHandler(event)}
                                    className="selection-item"
                                    alt="project icon"
                                />
                            )
                        })
                    : <>
                    </>
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