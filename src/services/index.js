import Axios from 'axios';

const provider = Axios.create({
    baseURL: 'https://mailingbox-api.devari.com.br/'
});

export const newAnswer = async (payload) => {
    try {
        await provider.post('resposta', payload);
    } catch (err) {
        throw Error('Ocorreu um erro ao tentar enviar o formulário, por favor, tente enviá-lo novamente');
    }
}