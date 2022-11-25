console.log(window.innerWidth)


document.addEventListener("DOMContentLoaded", function () {
    console.log('load fini')

//objet carousel2
    function ratio() {
        return window.innerWidth / window.innerHeight
    }


    class carousel {
        constructor(containerSelector, navContainer, showItems) {
            this.container = document.querySelector(containerSelector)
            this.items = [].slice.call(document.querySelectorAll(containerSelector + ' > *'))
            this.navRButton = document.querySelector(navContainer + " .navR")
            this.navLButton = document.querySelector(navContainer + " .navL")
            this.index = 0
            this.length = this.items.length
            this.shownItems = 1
            this.showItems = showItems
            this.atenuation = 100
            console.log(length)
            this.resize()
            this.listeners()
        }

        resize() {
            if (this.showItems === true) {
                if (ratio() > 1) {
                    this.shownItems = 3
                    this.atenuation = 100
                } else if (ratio() > 0.7) {
                    this.atenuation = 95
                    this.shownItems = 2
                } else {
                    this.shownItems = 1
                    this.atenuation = 95
                }
            }
            this.containerWidth = this.atenuation / this.shownItems * this.length
            this.itemWidth = 100 / this.shownItems

            this.container.style.width = this.containerWidth + '%'
            this.items.forEach((item) => {
                item.style.width = this.itemWidth + '%'
            })
            console.log(ratio())
        }

        navR() {
            console.log('r')
            this.index++

            this.goTo(this.index)
            console.log('r')
        }

        navL() {
            this.index--
            this.goTo(this.index)
            console.log('l')
        }

        goTo(index) {
            if (index < 0) {
                this.index = this.length - this.shownItems

            } else if (index >= this.length - this.shownItems + 1) {
                this.index = 0

            }

            let translateX = (-100 * this.index / this.shownItems) / this.containerWidth * this.atenuation
            this.container.style.transform = 'translate3d(' + translateX + '% , 0 , 0)'
            console.log(this.index)
        }

        listeners() {
            this.navRButton.addEventListener('click', this.navR.bind(this))
            this.navLButton.addEventListener('click', this.navL.bind(this))
        }
    }

    let car1Items = [].slice.call(document.querySelectorAll('.carousel1-container > img'))
    let navR = document.querySelector('.rightArrow')
    let navL = document.querySelector('.leftArrow')
    let shownIndex = document.querySelector('.index')
    let car1Index = 1


    function car1_navR() {
        car1Index++
        if (car1Index === car1Items.length + 1) {
            car1Index = 1
        }
        changeIndex()
    }

    function car1_navL() {
        car1Index--
        if (car1Index === 0) {
            car1Index = 4
        }
        changeIndex()
    }

    function changeIndex() {
        shownIndex.textContent = '0' + car1Index
        console.log(car1Items)
        car1Items.forEach((item) => {
            item.classList.remove('carousel1-active')
            item.style.transform = ''
        })
        setTimeout(() => {
            car1Items[car1Index - 1].classList.add('carousel1-active')
            if (window.innerWidth > 900) {
                let translate = 270 - car1Index * 100
                car1Items[car1Index - 1].style.transform = 'translate3d( -300% ,calc(' + translate + '% + '+ - 6 * car1Index +'px), 0) scale(4)'
            }
            else if (window.innerWidth < 500){
                let translate = 280 - car1Index * 100
                car1Items[car1Index - 1].style.transform = 'translate3d(calc(' + translate + '% + '+ - 13 * car1Index +'px) ,-300%, 0) scale(4)'
            }
            else if (window.innerWidth < 900 && window.innerWidth > 500){
                let translate = 270 - car1Index * 100
                car1Items[car1Index - 1].style.transform = 'translate3d(calc(' + translate + '% + '+ - 13 * car1Index +'px) ,-220%, 0) scale(3)'
            }
            else {
                let translate = 270 - car1Index * 100
                car1Items[car1Index - 1].style.transform = 'translate3d(calc(' + translate + '% + '+ - 6 * car1Index +'px) ,-250%, 0) scale(3)'
            }
        }, 200)

    }

    changeIndex()

    console.log('car1Items', car1Items)
    navR.addEventListener('click', car1_navR)
    navL.addEventListener('click', car1_navL)
// gestion nav header

    let nav_menu = document.querySelector('#nav-menu')
    let hamburger = document.querySelector('#hamburger')
    let search = document.querySelector('#search')
    let search_bar = document.querySelector('.search-bar')

    function nav_header() {

        if (ratio() < 1) {
            search_bar.classList.add('none')
            nav_menu.classList.remove('normal')
            nav_menu.classList.remove('unfold')
            nav_menu.classList.add('none')
            hamburger.classList.remove('none')
            console.log('1')
        } else {
            search_bar.classList.add('none')
            nav_menu.classList.remove('none')
            hamburger.classList.add('none')
            nav_menu.classList.add('normal')
            console.log('2')
        }
        console.log(ratio())
    }

    function search_function() {

        if (ratio() < 1) {
            search_bar.classList.toggle('none')
            console.log('petit menu')
        } else {
            search_bar.classList.toggle('none')
            nav_menu.classList.toggle('normal')
            nav_menu.classList.toggle('none')

            console.log('grand menu')
        }
    }

    function toggleHamburger() {
        nav_menu.classList.toggle('unfold')
        nav_menu.classList.toggle('none')
    }


    nav_header();
    let objCarousel2 = new carousel('#carousel2', '#section3 nav', true)
    let objCarousel3 = new carousel('.section6-slider', '#section6 main', false)


    hamburger.addEventListener('click', toggleHamburger)

    search.addEventListener('click', search_function)

    window.addEventListener('resize', function () {
        nav_header()
        objCarousel2.resize()
        changeIndex()
    })
})