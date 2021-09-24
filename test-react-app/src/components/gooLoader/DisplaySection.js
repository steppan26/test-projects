import React from 'react'
import { useTransition, animated } from 'react-spring'

function DisplaySection( { imageUrl = './Images/color-wheel.png', selectedSlide = {}, items }) {
    const transition = useTransition(items, {
        from: { height: "0%", width: "0%", borderRadius: "5em" },
        enter: item => async (next) => {
            await next({ height: "50%", width: "50%", borderRadius: "5em", delay: 600 })
            await next({ height: "100%",width: "100%", borderRadius: "0em" })
        },
        leave:{  height: "0%", width: "0%", borderRadius: "5em" },
    })

    return (
        <div className="display-area">
            <div className="container">
                {transition((style, item) =>
                    item ?
                        <animated.img
                            src={imageUrl}
                            alt="project screenshot"
                            style={style}
                            width="300px"
                            height="300px"
                        />
                    :   ""
                    )
                }
            </div>
        </div>
    )
  }

  export default DisplaySection