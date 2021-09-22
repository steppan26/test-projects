import React, { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring'
import './GooLoader.css'

const GooLoader = () => {

    const [state, updateState] = useState(true)
    const props = useSpring({ marginTop: state ? "20rem" : "0rem" })
    let selectionItemsArray = []

    useEffect(() => {
        selectionItemsArray = [...document.getElementsByClassName('selection-item')]
        selectionItemsArray.forEach(item => {
            item.addEventListener('click', () => itemClickHandler(item))
        })
    }, [])

    function itemClickHandler(item) {
        updateState(!state)
        console.log(state)
    }

    return(
        <section>
            <div className="viewport"></div>
            <div className="selection-wrapper">
                <div className="item-bar">
                    <animated.div style={props} className="selection-item"></animated.div>
                    <animated.div className="selection-item"></animated.div>
                    <animated.div className="selection-item"></animated.div>
                    <animated.div className="selection-item"></animated.div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                </filter>
            </defs>
        </svg>
        </section>
    )
}

export default GooLoader