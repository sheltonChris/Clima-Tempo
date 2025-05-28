const login = document.getElementById('login')

login.addEventListener('click', function(e){
    e.preventDefault();

    abrirLogin();
})

function abrirLogin() {
    const modal = document.getElementById('login-modal')

    modal.classList.add('abrir');

    modal.addEventListener('click',(e) => {
        if(e.target.id == 'fechar'|| e.target.id == 'login-modal'){modal.classList.remove('abrir')}
    });
}