import React, { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring'
import './GooLoader.css'
import image1 from './Images/Accordion-card_screenshot.png'
import image2 from './Images/Calculator-app_screenshot.png'
import image3 from './Images/Crowdfunding-product-page_screenshot.png'
import image4 from './Images/Smart-Brain_screenshot.png'
import placeHolder from './Images/color-wheel.png'
import DisplaySection from "./DisplaySection";


const slides = [
    { id: 0, url: './Images/Accordion-card_screenshot.png'},
    { id: 1, url: './Images/Calculator-app_screenshot.png'},
    { id: 2, url: './Images/column-preview-card_screenshot.png'},
    { id: 3, url: './Images/Crowdfunding-product-page_screenshot.png'},
    { id: 4, url: './Images/Smart-Brain_screenshot.png'},
]


const GooLoader = () => {
    const [iconOneState, updateIconOneState] = useState(false)
    const [iconTwoState, updateIconTwoState] = useState(false)
    const [iconThreeState, updateIconThreeState] = useState(false)
    const [iconFourState, updateIconFourState] = useState(false)
    const [displayedImg, setDisplayedImg] = useState(placeHolder)
    const [isVisible, setIsvisible] = useState(false)

    const elementStyle = (icon) => {
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
                transform: icon ? "scale(1.4) translateY(-50px)" : "scale(1) translateY(0px)",
                position: "relative",
                delay: 600,
              }
        })
    }

    // SET SPRINGS FOR EACH ICON
    const iconOne = useSpring(elementStyle(iconOneState))
    const iconTwo = useSpring(elementStyle(iconTwoState))
    const iconThree = useSpring(elementStyle(iconThreeState))
    const iconFour = useSpring(elementStyle(iconFourState))


    function itemClickHandler(iconStateId, event) {
        let iconOne = false
        let iconTwo = false
        let iconThree = false
        let iconFour = false
        const iconsArray = [iconOne, iconTwo, iconThree, iconFour]

        let image = ""
        const rootElement = event.target.parentNode.parentNode.parentNode
        let color = "0, 0, 0"


        switch(iconStateId){
            default:
                break
            case "iconOneState":
                iconOne = true
                image = image1
                color = "330, 223 ,10"
                break
            case "iconTwoState":
                iconTwo = true
                image = image2
                color = "235, 52 ,171"
                break
            case "iconThreeState":
                iconThree = true
                image = image3
                color = "6, 235 ,124"
                break
            case "iconFourState":
                iconFour = true
                image = image4
                color = "302, 7 ,35"
                break
            }

            updateIconOneState(iconOne)
            updateIconTwoState(iconTwo)
            updateIconThreeState(iconThree)
            updateIconFourState(iconFour)
            transitionImages(image)
            // rootElement.style.setProperty('--var-temp', color, 'important')



            // toggleSelectedItemEffects(event.target)
            
    }

    const transitionImages = async (image) => {
        setIsvisible(false)
        setTimeout(() => {
            setDisplayedImg(image)
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
        <section>
            <div className="viewport">
                <DisplaySection imageUrl={displayedImg} items={isVisible} />
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