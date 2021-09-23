import React, { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring'
import './GooLoader.css'

const GooLoader = () => {
    const [iconOneState, updateIconOneState] = useState(false)
    const [iconTwoState, updateIconTwoState] = useState(false)
    const [iconThreeState, updateIconThreeState] = useState(false)
    const [iconFourState, updateIconFourState] = useState(false)


    const elementStyle = (icon) => {
        return ({
            config: { duration: 0},
            marginTop: icon ? "20rem" : "0px",
            left: icon ? "18rem" : "0px",
            top: icon ? "22rem" : "0px",
            width: icon ? "500px" : "50px",
            height: icon ? "500px" : "50px",
            // position: icon ? "absolute" : "relative"

        }
        )
    }

    const iconOne = useSpring(elementStyle(iconOneState))
    const iconTwo = useSpring(elementStyle(iconTwoState))
    const iconThree = useSpring(elementStyle(iconThreeState))
    const iconFour = useSpring(elementStyle(iconFourState))

    function itemClickHandler(iconState) {
        let iconOne = false
        let iconTwo = false
        let iconThree = false
        let iconFour = false

        console.log(iconState)

        switch(iconState){
            default:
                break
            case "iconOneState":
                iconOne = true
                break
            case "iconTwoState":
                iconTwo = true
                break
            case "iconThreeState":
                iconThree = true
                break
            case "iconFourState":
                iconFour = true
                break
            }
            updateIconOneState(iconOne)
            updateIconTwoState(iconTwo)
            updateIconThreeState(iconThree)
            updateIconFourState(iconFour)

        console.log(iconOne,iconTwo,iconThree,iconFour)
    }


    return(
        <section>
            <div className="viewport"></div>
            <div className="selection-wrapper">
                <div className="item-bar">
                    <animated.div id="iconOne" style={iconOne} onClick={ () => itemClickHandler("iconOneState")} className="selection-item"></animated.div>
                    <animated.div id="iconTwo" style={iconTwo} onClick={ () => itemClickHandler("iconTwoState")} className="selection-item"></animated.div>
                    <animated.div id="iconThree" style={iconThree} onClick={ () => itemClickHandler("iconThreeState")} className="selection-item"></animated.div>
                    <animated.div id="iconFour" style={iconFour} onClick={ () => itemClickHandler("iconFourState")} className="selection-item"></animated.div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                </filter>
            </defs>
        </svg>
        </section>
    )
}

export default GooLoader