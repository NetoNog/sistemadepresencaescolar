let alunos = [];
let turmas = [];
let professores = []; // Array para armazenar professores

// Função para cadastrar turma
document.getElementById("formTurma").addEventListener("submit", function(event) {
    event.preventDefault();
    const nomeTurma = document.getElementById("nomeTurma").value;

    // Adicionando a turma ao array
    turmas.push({
        nome: nomeTurma,
        alunos: []  // Inicialmente sem alunos
    });

    alert('Turma cadastrada!');
    updateTurmas();
    updateSelects();
});

// Função para cadastrar professor
document.getElementById("formProfessor").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeProfessor").value;
    const cpf = document.getElementById("cpfProfessor").value;
    const turmasSelecionadas = Array.from(document.getElementById("turmasProfessor").selectedOptions)
        .map(option => option.value); // Pega as turmas selecionadas

    // Adicionando o professor ao array
    const professor = {
        nome,
        cpf,
        turmas: turmasSelecionadas
    };

    professores.push(professor);

    alert('Professor cadastrado!');
    updateSelects();
    updateProfessores();
});

// Função para atualizar a lista de turmas exibida
function updateTurmas() {
    const listaTurmas = document.getElementById("listaTurmas");
    listaTurmas.innerHTML = ''; // Limpar lista antes de atualizar

    turmas.forEach(turma => {
        // Contando a quantidade de alunos na turma
        const numeroAlunos = turma.alunos.length;

        // Exibindo a turma no formato "Ano B: 04a/30"
        const turmaInfo = document.createElement("div");
        turmaInfo.innerHTML = `${turma.nome} : ${numeroAlunos} aluno(s)`;
        listaTurmas.appendChild(turmaInfo);
    });
}

// Função para atualizar os selects com alunos, turmas e professores
function updateSelects() {
    const alunoSelect = document.getElementById("alunoPresente");
    const turmaSelect = document.getElementById("turmaPresente");
    const turmasProfessorSelect = document.getElementById("turmasProfessor");

    alunoSelect.innerHTML = '';
    turmaSelect.innerHTML = '';
    turmasProfessorSelect.innerHTML = '';

    alunos.forEach(aluno => {
        const option = document.createElement("option");
        option.value = aluno.matricula;
        option.text = `${aluno.nome} ${aluno.sobrenome}`;
        alunoSelect.appendChild(option);
    });

    turmas.forEach(turma => {
        const option = document.createElement("option");
        option.value = turma.nome;
        option.text = turma.nome;
        turmaSelect.appendChild(option);

        const turmaOption = document.createElement("option");
        turmaOption.value = turma.nome;
        turmaOption.text = turma.nome;
        turmasProfessorSelect.appendChild(turmaOption);
    });
}

// Função para atualizar a lista de professores exibida
function updateProfessores() {
    const listaProfessores = document.getElementById("listaProfessores");
    listaProfessores.innerHTML = ''; // Limpar lista antes de atualizar

    professores.forEach(professor => {
        const professorInfo = document.createElement("div");
        const turmasDoProfessor = professor.turmas.join(', '); // Juntar as turmas em que o professor participa

        professorInfo.innerHTML = `${professor.nome} (CPF: ${professor.cpf}) - Turmas: ${turmasDoProfessor}`;
        listaProfessores.appendChild(professorInfo);
    });
}

// Função para gerar matrícula única
function gerarMatricula() {
    let matricula;
    do {
        matricula = Math.floor(Math.random() * 1000000); // Gera um número aleatório de 6 dígitos
    } while (alunos.some(aluno => aluno.matricula === matricula)); // Verifica se a matrícula já existe
    return matricula;
}

// Função para cadastrar aluno e associá-lo à turma
document.getElementById("formAluno").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeAluno").value;
    const sobrenome = document.getElementById("sobrenomeAluno").value;
    const nomePai = document.getElementById("nomePai").value;
    const nomeMae = document.getElementById("nomeMae").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const cpf = document.getElementById("cpfAluno").value;

    const matricula = gerarMatricula(); // Gerar matrícula única

    const aluno = {
        nome,
        sobrenome,
        nomePai,
        nomeMae,
        dataNascimento,
        cpf,
        matricula
    };

    // Perguntar em qual turma o aluno será inserido
    const turmaNome = prompt("Em qual turma deseja cadastrar este aluno?");

    // Verificar se a turma existe
    const turma = turmas.find(t => t.nome === turmaNome);
    if (turma) {
        // Associando o aluno à turma
        turma.alunos.push(aluno);
        alunos.push(aluno);

        alert('Aluno cadastrado na turma ' + turmaNome);
        updateSelects();
        updateTurmas();
    } else {
        alert('Turma não encontrada!');
    }
});
