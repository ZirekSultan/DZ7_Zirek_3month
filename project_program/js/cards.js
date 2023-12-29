const cards = document.querySelector(".cards");

const fetchData = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await response.json()
        console.log(data)
        data.forEach(item => {
            const div = document.createElement("div")
            div.classList.add("card")

            div.innerHTML = `
            <img src="../photo/_.jpeg" alt="">
            <p>${item.title}</p>
            <p>${item.body}</p>
            `
            cards.append(div)
        })
    } catch (e) {
        console.error(e)
    }
}

fetchData()