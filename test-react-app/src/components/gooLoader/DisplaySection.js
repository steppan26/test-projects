import React from 'react'
import { useTransition, animated } from 'react-spring'

function DisplaySection( { screenshotsArray, items }) {
    const transition = useTransition(items, {
        from: { height: "0%", width: "0%", borderRadius: "0em", delay: 0 },
        enter: item => async (next) => {
            // await next({ height: "50%", width: "50%", borderRadius: "5em", delay: 200 })
            await next({ height: "100%",width: "100%", borderRadius: "0em" })
        },
        leave:{ height: "0%",width: "0%", borderRadius: "5em", delay: 0 },
    })
    const imagesGallery = []
    for (const image in screenshotsArray) {
        console.log(image)
    }

    console.log("1", screenshotsArray)


    return (
        <div className="display-area">
            <div className="container">
                {transition((style, item) =>
                        <animated.img
                            src={screenshotsArray[0]}
                            alt="project screenshot"
                            style={style}
                            width="300px"
                            height="300px"
                        />
                    )
                }
            </div>
        </div>
    )
  }



  export default DisplaySection