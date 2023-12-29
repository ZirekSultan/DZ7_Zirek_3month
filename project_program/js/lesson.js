//PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [25793]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'ok'
        phoneResult.style.color= 'green'
    } else {
        phoneResult.innerHTML = ' not ok'
        phoneResult.style.color= 'red'
    }
}

//Tab Slider ( и 3 дз первая часть)

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')


const hideTabContent = () => {
    tabContentBlocks.forEach(tabCard => {
        tabCard.style.display = 'none'
    })
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (tabIndex = 0) => {
    tabContentBlocks[tabIndex].style.display = 'block'
    tabs[tabIndex].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab,tabIndex) => {
            if(event.target === tab){
                hideTabContent()
                showTabContent(tabIndex)
            }

        })
    }
}
const autoTabContent = (i = 0) => {
    setInterval(() => {
        i++
        if (i > tabs.length - 1){
            i = 0
        }
        hideTabContent()
        showTabContent(i)
        },9000)
}
autoTabContent()

//CONVERTOR (дз 5)



const usd = document.querySelector('#usd')
const som = document.querySelector('#som')
const zireksPositiveCoin = document.querySelector('#zireksPositiveCoin')
const converter = (element, targetElement, target2, current) => {
    element.oninput = async () => {

        try {
            const response = await fetch("../data/converter.json")
            const data = await response.json()

            switch (current) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2)
                    target2.value = (element.value / data.zireksPositiveCoin).toFixed(2)
                    break
                case 'usd' :
                    targetElement.value = (element.value * data.usd).toFixed(2)
                    target2.value = (element.value * data.zireksPositiveCoin / data.usd).toFixed(2)
                    break
                case 'zireksPositiveCoin' :
                    targetElement.value = (element.value * data.zireksPositiveCoin).toFixed(2)
                    target2.value = (element.value * (data.usd / data.zireksPositiveCoin)).toFixed(2)
                    break
                default:
                    break
            }
            element.value === '' && (targetElement.value = '')

        } catch (e) {
            console.log(e)
        }
    }
}
converter(som, usd, zireksPositiveCoin,'som')
converter(usd, som, zireksPositiveCoin,'usd')
converter(zireksPositiveCoin, usd, som, 'zireksPositiveCoin')

// CARD SWITCHER

const card = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')

let countCard = 1
btnNext.addEventListener('click', () =>{
    countCard++

    if(countCard > 200) countCard = 1

    getData()
})
btnPrev.addEventListener('click', () =>{
    countCard--

    if(countCard < 1) countCard = 200

    getData()
})

const getData = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${countCard}`)
        const data = await response.json()
        card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `;
    } catch (e) {

    }
}
getData()

//2

const zireshka = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        console.log(data)
    } catch (e) {

    }
}
zireshka()

//WEATHER

const cityNameInput = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

const BASE_URL = 'http://api.openweathermap.org'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const citySearch = () => {
    cityNameInput.addEventListener('input', async (event) => {
        try {
            const response = await fetch(`${BASE_URL}/data/2.5/weather?q=${cityNameInput.value}&appid=${API_KEY}`)
            const data = await response.json()
            city.innerHTML = data.name ? data.name : 'Город не найден...'
            temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273.15) + '&deg;C' : '...'

        } catch (e) {

        }
    })
}

citySearch()





