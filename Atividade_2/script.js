const setup = document.querySelector("#setup")
const delivery = document.querySelector("#delivery")
const reactionImage = document.querySelector("#reaction-image")
const button = document.querySelector("#btn");

function gerarPiada() {
    axios.get('https://v2.jokeapi.dev/joke/Any?lang=en').then(response => {
        const piada = response.data;
        setup.textContent = piada.setup
        delivery.textContent = piada.delivery
    })
}

function gerarReacao() {
    axios.get('https://api.thecatapi.com/v1/images/search').then(response => {
        const reacaoUrl = response.data[0].url
        reactionImage.src = reacaoUrl
    })
}

button.addEventListener('click', () => {
    gerarPiada()
    gerarReacao()
})

