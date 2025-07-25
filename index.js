import axios from 'axios';
import inquirer from 'inquirer';

// --- CONFIGURAÇÃO DA API ---
const API_CONFIG = {
    undergraduate: {
        url: 'https://student-management-k1vk.onrender.com/undergraduates/',
        name: 'Estudante de Graduação',
    },
    scientific: {
        url: 'https://student-management-k1vk.onrender.com/scientifics/',
        name: 'Bolsista de Iniciação Científica',
    },
    postgraduate: {
        url: 'https://student-management-k1vk.onrender.com/postgraduates/',
        name: 'Estudante de Pós-Graduação',
    },
};

// --- FUNÇÕES DA API (CLIENTE) ---

// Função genérica para buscar todos os estudantes de um tipo
async function getAllStudents(studentType) {
    try {
        const response = await axios.get(API_CONFIG[studentType].url);
        return response.data;
    } catch (error) {
        console.error(`❌ Erro ao buscar ${API_CONFIG[studentType].name}s:`, error.response?.data || error.message);
        return [];
    }
}

// Função genérica para criar um estudante
async function createStudent(studentType, studentData) {
    try {
        const response = await axios.post(API_CONFIG[studentType].url, studentData);
        console.log(`✅ ${API_CONFIG[studentType].name} criado com sucesso!`);
        console.log(response.data);
    } catch (error) {
        console.error(`❌ Erro ao criar ${API_CONFIG[studentType].name}:`, error.response?.data || error.message);
    }
}

// Função genérica para atualizar um estudante
async function updateStudent(studentType, studentId, studentData) {
    try {
        const url = `${API_CONFIG[studentType].url}${studentId}`;
        const response = await axios.put(url, studentData);
        console.log(`✅ ${API_CONFIG[studentType].name} atualizado com sucesso!`);
        console.log(response.data);
    } catch (error) {
        console.error(`❌ Erro ao atualizar ${API_CONFIG[studentType].name}:`, error.response?.data || error.message);
    }
}

// Função genérica para deletar um estudante
async function deleteStudent(studentType, studentId) {
    try {
        const url = `${API_CONFIG[studentType].url}${studentId}`;
        await axios.delete(url);
        console.log(`✅ ${API_CONFIG[studentType].name} com ID ${studentId} deletado com sucesso.`);
    } catch (error) {
        console.error(`❌ Erro ao deletar ${API_CONFIG[studentType].name}:`, error.response?.data || error.message);
    }
}


// --- LÓGICA DO MENU INTERATIVO ---

// Função para pausar e esperar o usuário pressionar Enter
async function pressEnterToContinue() {
    await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Pressione ENTER para continuar...' }]);
}

// Perguntas comuns para todos os estudantes
const commonQuestions = [
    { type: 'input', name: 'name', message: 'Nome:' },
    { type: 'input', name: 'age', message: 'Idade:', validate: input => !isNaN(parseInt(input)) || 'Por favor, insira um número.' },
    { type: 'input', name: 'studentId', message: 'ID (Matrícula):' },
];

// Perguntas específicas para cada tipo
const specificQuestions = {
    undergraduate: [
        { type: 'input', name: 'major', message: 'Curso:' },
    ],
    scientific: [
        { type: 'input', name: 'major', message: 'Curso:' },
        { type: 'input', name: 'workedDays', message: 'Dias Trabalhados:', validate: input => !isNaN(parseInt(input)) || 'Por favor, insira um número.' },
        { type: 'input', name: 'scholarshipAmount', message: 'Valor da Bolsa (Diária):', validate: input => !isNaN(parseFloat(input)) || 'Por favor, insira um número.' },
    ],
    postgraduate: [
        { type: 'input', name: 'thesisTitle', message: 'Título da Tese:' },
        { type: 'input', name: 'supervisor', message: 'Orientador(a):' },
        { type: 'input', name: 'workedDays', message: 'Dias Trabalhados:', validate: input => !isNaN(parseInt(input)) || 'Por favor, insira um número.' },
        { type: 'input', name: 'scholarshipAmount', message: 'Valor da Bolsa (Diária):', validate: input => !isNaN(parseFloat(input)) || 'Por favor, insira um número.' },
    ],
};

// Menu de operações para um tipo de estudante
async function showStudentMenu(studentType) {
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: `O que você deseja fazer com os ${API_CONFIG[studentType].name}s?`,
                choices: ['Listar Todos', 'Adicionar Novo', 'Atualizar um Existente', 'Deletar um Existente', new inquirer.Separator(), 'Voltar ao Menu Principal'],
            },
        ]);

        if (action === 'Voltar ao Menu Principal') break;

        switch (action) {
            case 'Listar Todos':
                const students = await getAllStudents(studentType);
                if (students.length > 0) {
                    console.table(students);
                } else {
                    console.log(`ℹ️ Nenhum ${API_CONFIG[studentType].name} encontrado.`);
                }
                break;

            case 'Adicionar Novo':
                const newData = await inquirer.prompt([...commonQuestions, ...specificQuestions[studentType]]);
                await createStudent(studentType, newData);
                break;

            case 'Atualizar um Existente':
                const { idToUpdate } = await inquirer.prompt([{ type: 'input', name: 'idToUpdate', message: 'Digite o ID do estudante a ser atualizado:' }]);
                // Aqui você poderia primeiro buscar os dados atuais para preencher o formulário, mas vamos simplificar
                console.log('Por favor, insira os novos dados:');
                const updatedData = await inquirer.prompt([...commonQuestions, ...specificQuestions[studentType]]);
                await updateStudent(studentType, idToUpdate, updatedData);
                break;

            case 'Deletar um Existente':
                const { idToDelete } = await inquirer.prompt([{ type: 'input', name: 'idToDelete', message: 'Digite o ID do estudante a ser deletado:' }]);
                const { confirmDelete } = await inquirer.prompt([{ type: 'confirm', name: 'confirmDelete', message: `Tem certeza que deseja deletar o estudante com ID ${idToDelete}?`, default: false }]);
                if (confirmDelete) {
                    await deleteStudent(studentType, idToDelete);
                }
                break;
        }
        await pressEnterToContinue();
    }
}

// Menu principal da aplicação
async function mainMenu() {
    console.log('=================================================');
    console.log('    Cliente de API - Gestão Acadêmica (Node.js)');
    console.log('=================================================');
    while (true) {
        const { studentTypeChoice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'studentTypeChoice',
                message: 'Qual tipo de estudante você deseja gerenciar?',
                choices: [
                    { name: 'Estudante de Graduação', value: 'undergraduate' },
                    { name: 'Bolsista de Iniciação Científica', value: 'scientific' },
                    { name: 'Estudante de Pós-Graduação', value: 'postgraduate' },
                    new inquirer.Separator(),
                    { name: 'Sair', value: 'exit' },
                ],
            },
        ]);

        if (studentTypeChoice === 'exit') {
            console.log('👋 Até logo!');
            break;
        }

        await showStudentMenu(studentTypeChoice);
    }
}

// Inicia a aplicação
mainMenu();