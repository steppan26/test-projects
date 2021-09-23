import React, { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring'
import './GooLoader.css'

const GooLoader = () => {
    const [iconOneState, updateIconOneState] = useState(false)
    const [iconTwoState, updateIconTwoState] = useState(false)
    const [iconThreeState, updateIconThreeState] = useState(false)
    const [iconFourState, updateIconFourState] = useState(false)


    const elementStyle = (icon) => {
        return ({ marginBottom: icon ? "10rem" : "0rem"})
    }

    const iconOne = useSpring(elementStyle(iconOneState))
    const iconTwo = useSpring(elementStyle(iconTwoState))
    const iconThree = useSpring(elementStyle(iconThreeState))
    const iconFour = useSpring(elementStyle(iconFourState))

    function itemClickHandler(iconStateId, event) {
        let iconOne = false
        let iconTwo = false
        let iconThree = false
        let iconFour = false

        switch(iconStateId){
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

        console.log(event.target)
    }


    return(
        <section>
            <div className="viewport">
                <div className=""></div>
                <div className="selection-wrapper">
                    <div className="item-bar">
                    </div>
                    <animated.div id="iconOne" style={iconOne} onClick={ (e) => itemClickHandler("iconOneState",e)} className="selection-item"></animated.div>
                    <animated.div id="iconTwo" style={iconTwo} onClick={ (e) => itemClickHandler("iconTwoState",e)} className="selection-item"></animated.div>
                    <animated.div id="iconThree" style={iconThree} onClick={ (e) => itemClickHandler("iconThreeState",e)} className="selection-item"></animated.div>
                    <animated.div id="iconFour" style={iconFour} onClick={ (e) => itemClickHandler("iconFourState",e)} className="selection-item"></animated.div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -10" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                </filter>
            </defs>
        </svg>
        </section>
    )
}

export default GooLoader