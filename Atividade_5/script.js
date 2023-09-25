const contadorSpan = document.getElementById('contador')
const btnTema = document.getElementById('btnTema')

let temaAtual = localStorage.getItem('tema')

if (!temaAtual) {
    temaAtual = 'light'
}

function mudarTema(tema) {
    localStorage.setItem('tema', tema)
    document.body.style.backgroundColor = tema === 'dark' ? '#4c5251' : '#ffffff'
}

btnTema.addEventListener('click', () => {
    if (temaAtual === 'light') {
        temaAtual = 'dark'
    } else {
        temaAtual = 'light'
    }
    mudarTema(temaAtual)
})

// Incrementa o contador no carregamento da página
window.addEventListener('load', () => {

    mudarTema(temaAtual)

    let contador = localStorage.getItem('contador');
 
    if (contador) {
        contador++
        localStorage.setItem('contador', contador)
    } else {
        localStorage.setItem('contador', 0)
    }

    contadorSpan.textContent = contador

});

