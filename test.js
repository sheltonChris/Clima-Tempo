

const form = document.getElementById('dados-cidade');
const inputCidade = document.getElementById('pesquisar');

const backgrounds = {
    Clear: 'https://cdn.pixabay.com/video/2025/04/15/272086_large.mp4',
    Rain: 'https://cdn.pixabay.com/video/2015/08/08/78-135733055_medium.mp4',
    Clouds: 'https://cdn.pixabay.com/video/2025/04/15/272086_large.mp4',
    Snow: 'https://videos.pexels.com/video-files/856381/856381-hd_1920_1080_30fps.mp4',
    Thunderstorm: 'https://cdn.pixabay.com/video/2023/06/10/166697-835224043_tiny.mp4',
    Mist: 'https://cdn.pixabay.com/video/2017/06/05/9584-220312371_tiny.mp4'
}

window.addEventListener('DOMContentLoaded', climaInicial);

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nomeCidade = inputCidade.value.trim();

    coletarClima(nomeCidade);
    mudarFundo(nomeCidade);
    detalhesClima(nomeCidade);
})

async function climaInicial() {
    const cidadePadrao = 'brasilia';

    await coletarClima(cidadePadrao);
    await mudarFundo(cidadePadrao);
    await detalhesClima(cidadePadrao);
}

async function coletarClima(nomeCidade) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=72078cd456c89ad0cd6acbdbde9d05aa&units=metric&lang=pt_br`;

    try {
        const resp = await fetch(url);

        if (resp.status === 200) {
            const obj = await resp.json();
            // console.log(obj)

            const temperatura = obj.main.temp;
            const climaMain = obj.weather[0].main;
            const clima = obj.weather[0].description;
            const local = obj.name;

            let respUserCidade = document.getElementById('nome-cidade')
            respUserCidade.innerHTML = `${local}`;
            // console.log(local)

            let respUsertemp = document.getElementById('temperatura')
            respUsertemp.innerHTML = `${Math.trunc(temperatura)}ºC`;
            // console.log(temperatura);

            let respUserClima = document.getElementById('clima')
            respUserClima.innerHTML = `${clima}`;
            // console.log(climaMain)


        }
        else {
            respUsertemp.innerHTML = `<p>❌ Cidade <strong>${nomeCidade}</strong> não encontrada.</p>`;
        }
    } catch (erro) {
        respUsertemp.innerHTML = `<p>⚠️ Erro ao buscar clima. Verifique sua conexão.</p>`;
        console.error(erro);
    }
}

async function mudarFundo(nomeCidade) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=72078cd456c89ad0cd6acbdbde9d05aa&units=metric&lang=pt_br`;

    try {

        const resp = await fetch(url);

        if (resp.status === 200) {
            const obj = await resp.json();

            const clima = obj.weather[0].main;

            const fundo = backgrounds[clima];
            // console.log(fundo)

            if (fundo) {
                const backgroundVideo = document.getElementById('clima-video');
                backgroundVideo.src = fundo;
            }
        }
        else {
            const resperror = document.querySelector('#clima');
            resperror.innerHTML = `<p>❌ Cidade <strong>${nomeCidade}</strong> não encontrada.</p>`;
        }

    }
    catch (erro) {
        const resperror = document.querySelector('#clima');
        resperror.innerHTML = `<p>❌ Erro no catch</p>`;
    }
}

async function detalhesClima(nomeCidade) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=72078cd456c89ad0cd6acbdbde9d05aa&units=metric&lang=pt_br`;

    try {
        const resp = await fetch(url);

        if (resp.status === 200) {
            const obj = await resp.json();


            const temperatura = obj.main.temp;
            const sensacaoTermica = obj.main.feels_like;
            const tempMin = obj.main.temp_min;
            const tempMax = obj.main.temp_max;
            const umidade = obj.main.humidity;

            const idSensacao = document.querySelector('.noticias')
    idSensacao.innerHTML = `
    <h2>Detalhes do clima</h2>
    <p>🌡️ Sensação térmica: ${Math.trunc(sensacaoTermica)}ºC</p>
    <p>💧 Umidade relativa: ${Math.trunc(umidade)}%</p>
    <p>🔽 Mínima: ${Math.trunc(tempMin)}ºC</p>
    <p>🔼 Máxima: ${Math.trunc(tempMax)}ºC</p>
    <p>🌍 Temperatura atual: ${Math.trunc(temperatura)}ºC</p>
`;
}
        else {
            const resperror = document.querySelector('#clima');
            resperror.innerHTML = `<p>❌ Cidade <strong>${nomeCidade}</strong> não encontrada.</p>`;
        }

    }
    catch (erro) {
        const resperror = document.querySelector('#clima');
        resperror.innerHTML = `<p>❌ Erro no catch</p>`;
    }

    

}