import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from 'react-spring'
import './GooLoader.css'
import image1 from './Images/Accordion-card_screenshot.png'
import image2 from './Images/Calculator-app_screenshot.png'
import image3 from './Images/Crowdfunding-product-page_screenshot.png'
import image4 from './Images/Smart-Brain_screenshot.png'
import image5 from './Images/Todo-list_screenshot.png'
import placeHolder from './Images/color-wheel.png'


const GooLoader = () => {
    const [iconOneState, updateIconOneState] = useState(false)
    const [iconTwoState, updateIconTwoState] = useState(false)
    const [iconThreeState, updateIconThreeState] = useState(false)
    const [iconFourState, updateIconFourState] = useState(false)
    const [displayedImg, setDisplayedImg] = useState(placeHolder)


    const elementStyle = (icon) => {
        return ({
            config: {
                mass: 1.2,
                tension: 120,
                friction: 14,
                precision: 0.001
              },
            from: {transform: "scale(1)"},
            to: { transform: icon ? "scale(1.6)" : "scale(1)" }
        })
    }

    const displayStyle = useSpring({
        config: {
            mass: 1.2,
            tension: 120,
            friction: 14,
            precision: 0.001
        },
        from: {opacity: 0},
        to: {opacity: 1}
    })


    const iconOne = useSpring(elementStyle(iconOneState))
    const iconTwo = useSpring(elementStyle(iconTwoState))
    const iconThree = useSpring(elementStyle(iconThreeState))
    const iconFour = useSpring(elementStyle(iconFourState))

    function itemClickHandler(iconStateId, event) {
        let iconOne = false
        let iconTwo = false
        let iconThree = false
        let iconFour = false

        let image = ""

        switch(iconStateId){
            default:
                break
            case "iconOneState":
                iconOne = true
                image = image1
                break
            case "iconTwoState":
                iconTwo = true
                image = image2
                break
            case "iconThreeState":
                iconThree = true
                image = image3
                break
            case "iconFourState":
                iconFour = true
                image = image4
                break
            }
            updateIconOneState(iconOne)
            updateIconTwoState(iconTwo)
            updateIconThreeState(iconThree)
            updateIconFourState(iconFour)
            setDisplayedImg(image)

            // toggleSelectedItemEffects(event.target)
    }

    const toggleSelectedItemEffects = (selectedItem) => {
        const iconsArray = [...document.getElementsByClassName('selection-item')]
        iconsArray.forEach(icon => {
            selectedItem === icon ? icon.classList.add('selected') : icon.classList.remove('selected')
        })
    }

    return(
        <section>
            <div className="viewport">
                <animated.img style={displayStyle} src={displayedImg} className="display-area" />
                <div className="selection-wrapper">
                    <div className="item-bar">
                    </div>
                    <animated.img src={image1} id="iconOne" style={iconOne} onClick={ (e) => itemClickHandler("iconOneState",e)} className="selection-item" />
                    <animated.img src={image2} id="iconTwo" style={iconTwo} onClick={ (e) => itemClickHandler("iconTwoState",e)} className="selection-item" />
                    <animated.img src={image3} id="iconThree" style={iconThree} onClick={ (e) => itemClickHandler("iconThreeState",e)} className="selection-item" />
                    <animated.img src={image4} id="iconFour" style={iconFour} onClick={ (e) => itemClickHandler("iconFourState",e)} className="selection-item" />
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