let estudantes = [];

document.addEventListener("DOMContentLoaded", function () {
    carrega();

    let btnNovoEstudante = document.getElementById("btnNovoEstudante");
    let modalNovoEstudante = document.getElementById("modalNovoEstudante");
    let spanNovoEstudante = modalNovoEstudante.querySelector(".close");

    btnNovoEstudante.onclick = function () {
        modalNovoEstudante.style.display = "block";
    };

    spanNovoEstudante.onclick = function () {
        modalNovoEstudante.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovoEstudante) {
            modalNovoEstudante.style.display = "none";
        }
    };

    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

function identifica(cpf) {
    for (let estudante of estudantes) {
        if (estudante.cpf === cpf.id) {
            return estudante;
        }
    }
    return null;
}

function modal(button) {
    let estudante = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    let cpfModal = modal.querySelector("#cpfModal");
    let nomeModal = modal.querySelector("#nomeModal");
    let generoModal = modal.querySelector("#generoModal");
    let areaModal = modal.querySelector("#areaModal");
    let anoModal = modal.querySelector("#anoModal");
    let pneModal = modal.querySelector("#pneModal");
    let btnExcluirEstudante = modal.querySelector("#btnExcluirEstudante");

    if (!cpfModal || !nomeModal || !generoModal || !areaModal || !anoModal || !pneModal || !btnExcluirEstudante) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    cpfModal.innerHTML = estudante.cpf;
    nomeModal.innerHTML = estudante.nome;
    generoModal.innerHTML = estudante.genero;
    areaModal.innerHTML = estudante.area;
    anoModal.innerHTML = estudante.ano;
    pneModal.innerHTML = estudante.pne;

    btnExcluirEstudante.onclick = function () {
        excluirEstudante(estudante.cpf);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";
}

function excluirEstudante(cpf) {
    estudantes = estudantes.filter(estudante => estudante.cpf !== cpf);
    localStorage.setItem("estudantes", JSON.stringify(estudantes));
    carrega();
}

function carrega() {
    let tabela = document.getElementById("estudantes");
    estudantes = JSON.parse(localStorage.getItem("estudantes")) ||[];

    tabela.innerHTML = "";

    for (let estudante of estudantes) {
        let botaoId = `<td><button id='${estudante.cpf}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${estudante.cpf}</td>
            <td>${estudante.nome}</td>
            <td>${estudante.genero}</td>
            <td>${estudante.area}</td>
            <td>${estudante.ano}</td>
            <td>${estudante.pne}</td>
            ${botaoId}</tr>`;
        tabela.innerHTML += linha;
    }

    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

function cadastrarEstudante() {
    let cpf = document.getElementById("cpf").value;
    let nome = document.getElementById("nome").value;
    let genero = document.getElementById("genero").value;
    let area = document.getElementById("area").value;
    let ano = document.getElementById("ano").value;
    let pne = document.getElementById("pne").value;

    if (estudanteExistente(cpf)) {
        alert("CPF já cadastrado. Insira um CPF diferente.");
        return;
    }

    let novoEstudante = {
        cpf: cpf,
        nome: nome,
        genero: genero,
        area: area,
        ano: ano,
        pne: pne
    };

    estudantes = JSON.parse(localStorage.getItem("estudantes")) || [];
    estudantes.push(novoEstudante);

    localStorage.setItem("estudantes", JSON.stringify(estudantes));

    carrega();

    modalNovoEstudante.style.display = "none";
}

function estudanteExistente(cpf) {
    return estudantes.some(estudante => estudante.cpf === cpf);
}