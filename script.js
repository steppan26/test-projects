const ball = document.querySelector('[data-ball]')
const gooeyWrapper = document.querySelector('[data-gooey-wrapper]')
const dropbox = document.querySelector('[data-dropbox]')
const icon = document.querySelector('[data-icon]')

gooeyWrapper.addEventListener('dragover', e => {
    e.preventDefault()
    let x = e.pageX;
    let y = e.pageY;

    y = e.pageY
    x = e.pageX

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
})

ball.addEventListener('dragstart', e => {
})

ball.addEventListener('dragend', e => {
    const element = e.target
    const containerTop = dropbox.offsetTop
    const containerLeft = dropbox.offsetLeft
    const containerBottom = dropbox.offsetTop + dropbox.offsetHeight
    const containerRight = dropbox.offsetLeft + dropbox.offsetWidth

    const elementX = element.offsetTop + (element.offsetHeight / 2)
    const elementY = element.offsetLeft + (element.offsetWidth / 2)

    if((elementY > containerTop && elementY < containerBottom) && (elementX > containerLeft && elementX < containerRight)){
        dropbox.style.backgroundColor = "red"
    }
})