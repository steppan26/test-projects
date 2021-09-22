let dragHandles = [...document.getElementsByClassName('drag-handle')]
const gooeyWrapper = document.querySelector('[data-gooey-wrapper]')
const dropbox = document.querySelector('[data-dropbox]')
const icon = document.querySelector('[data-icon]')
const ball = document.querySelector('[data-ball]')


let selectedBall

const colorsArray = ['blue', 'red']



function setTestIconLocation(){
    const ballPosition = ball.getBoundingClientRect()
}

ball.addEventListener('click', e => {
    ball.style.bottom = "250px"
})





// dragHandles.forEach((handle, index) => {
//     handle.addEventListener('mousedown', mouseDownHandler)
//     let ballPosition
//     const dropboxPosition = getCoords(dropbox)

//     handle.addEventListener('dragstart', e => {
//         selectedBall = handle.parentNode
//         ballPosition = getCoords(selectedBall)
//     })

//     handle.addEventListener('dragend', e => {
//         e.preventDefault()
//         ballPosition = getCoords(selectedBall)

//         const containerTop = dropboxPosition.top
//         const containerLeft = dropboxPosition.left
//         const containerBottom = dropboxPosition.top + dropbox.offsetHeight
//         const containerRight = dropboxPosition.left + dropbox.offsetWidth

//         const elementY = ballPosition.top + (selectedBall.offsetHeight / 2)
//         const elementX = ballPosition.left + (selectedBall.offsetWidth / 2)
//         if((elementY > containerTop && elementY < containerBottom) && (elementX > containerLeft && elementX < containerRight)){
//             dropbox.style.backgroundColor = colorsArray[index]
//             console.log(true, elementX, elementY)
//         } else {
//             console.log(false,"element ", elementX, elementY, "container ", containerTop, containerLeft, containerBottom, containerRight)
//         }
//     })
// })

// document.addEventListener('drag', e => {
//     console.log(e.movementY)
// })

// document.addEventListener('dragover', e => {
//     e.preventDefault()
//     ballPosition = getCoords(selectedBall)
//     console.log(e.movementY)

//     const elementY = ballPosition.top + 27
//     const elementX = ballPosition.left + 27
//     const elementBottom = getCoords(selectedBall.parentNode)

//     selectedBall.style.left = elementX + 'px';
//     selectedBall.style.bottom = elementBottom.top + 'px';


// })

// function getCoords(elem) {
//     let box = elem.getBoundingClientRect();

//     let body = document.body;
//     let docEl = document.documentElement;

//     let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
//     let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

//     let clientTop = docEl.clientTop || body.clientTop || 0;
//     let clientLeft = docEl.clientLeft || body.clientLeft || 0;

//     let top  = box.top +  scrollTop - clientTop;
//     let left = box.left + scrollLeft - clientLeft;

//     return { top: Math.round(top), left: Math.round(left) };
// }

// function getPositionOffset(elem) {
//     const elemPosition = getCoords(elem)
//     let top
//     let bottom
//     let containerPosition = getCoords(elem.parentNode)

//     if(elemPosition.top < containerPosition.top){
//         top = elemPosition.top - containerPosition.top
//     } else {
//         top = elemPosition.top - containerPosition.top
//     }
//     return { top: Math.round(top), bottom: Math.round(bottom) }
// }