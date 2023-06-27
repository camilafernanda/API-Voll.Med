import * as Yup from 'yup';

const estadosValidos = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

export let pacienteSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é um campo obrigatório').matches(/^[a-zA-ZÀ-ú]+([ ][a-zA-ZÀ-ú]+)*([-][a-zA-ZÀ-ú]+)*$/, 'Insira um nome válido!'),
    email: Yup.string().required('Email é um campo obrigatório').matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Insira um email válido!'),
    endereco: Yup.object().shape({
        estado: Yup.string().oneOf(estadosValidos, 'Insira um estado do Brasil')
    })
})