var slide = document.querySelector('.slide')
var imgs = slide.querySelectorAll('.slide-image')
var circles = slide.querySelectorAll('.slide-circle')
var slideArrow = slide.querySelector('.slide-arrow')
var slideRight = slide.querySelector('.slide-right')
var slideLeft = slide.querySelector('.slide-left')

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var change = function(dir = 1) {
    var totalImgs = parseInt(slide.dataset.imgs)
    var activeImg = parseInt(slide.dataset.active)
    var next = (activeImg + dir + totalImgs) % totalImgs
    toggleClass(imgs[activeImg], 'slide-active')
    toggleClass(circles[activeImg], 'circle-active')
    slide.dataset.active = next;
    toggleClass(imgs[next], 'slide-active')
    toggleClass(circles[next], 'circle-active')
}

slideRight.addEventListener('click', function() {
    change()
})

slideLeft.addEventListener('click', function() {
    change(-1)
})

slide.addEventListener('mouseenter', function() {
    toggleClass(slideArrow, 'slide-enter')
    clearTimeout(slideOne)
    clearInterval(slideRun)
})

var changeOne = function() {
    change()
    slideRun = setInterval(change, 1200)
}

slide.addEventListener('mouseleave', function() {
    toggleClass(slideArrow, 'slide-enter')
    slideOne = setTimeout(changeOne, 500);
})

var sliderun;
var slideOne = setTimeout(changeOne, 500);