import React, { useState } from "react";
import { useTransition, useSprings, animated } from 'react-spring'
import './GooLoader.css'
import placeHolder from './Images/arrow-icon.png'
import { useRef } from "react";

const GooLoader = ( {
        viewportWidth = "650px",
        viewportHeight = "500px",
        itembarHeight = "15%",
        width = "auto",
        height="auto",
        projectsArray,
        iconAnimations = { from: {}, to: {} },
        ...props
    } ) => {

    const [ imageIndex, setimageIndex ] = useState(0)
    // const [ isVisible, setIsvisible ] = useState(false)
    const [ index, setIndex ] = useState(0)

    const sectionRef = useRef(null)

    const screenshotsTransition = useTransition(imageIndex, {
        key: imageIndex,
        from: { opacity: 0, },
        enter: { opacity: 1, },
        leave: item => async (next) => {
            await next({ opacity: 0, })
        },
        // config: { duration: 200}
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

    const getImageIndex = (scrollForward) => {
        const { screenshotsArray } = projectsArray[index]
        if(scrollForward) {
            imageIndex === screenshotsArray.length - 1 ? setimageIndex(0) : setimageIndex(imageIndex + 1)
        } else {
            imageIndex === 0 ?  setimageIndex(screenshotsArray.length - 1) : setimageIndex(imageIndex - 1)
        }

    }

    const onGalleryScrollClick = (scrollForward = true) => {
        getImageIndex(scrollForward)
    }

    return(
        <section ref={sectionRef} style={{width:width, height: height}}>
            <div className="viewport" style={{
                // gridTemplateRows: `${viewportHeight} ${itembarHeight}`,
                height: viewportHeight
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
                    <div className="container" style={{ width: viewportWidth}}>
                        {screenshotsTransition((imageStyle, i) =>
                            <animated.img
                                src={projectsArray[index].screenshotsArray[i]}
                                alt="project screenshot"
                                style={imageStyle}
                                onClick={() => console.log(projectsArray[index].screenshotsArray[i])}
                            />
                        )}
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