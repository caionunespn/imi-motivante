import Axios from 'axios';

const provider = Axios.create({
    baseURL: 'https://mailingbox-api.devari.com.br/'
});

export const newAnswer = async (payload) => {
    try {
        await provider.post('resposta', payload, {
            headers: {
                Authorization: 'Bearer J7Td9Uj3JDbkq5TPR52jwDcCiQFQYoXY'
            }
        });
    } catch (err) {
        throw Error('Ocorreu um erro ao tentar enviar o formulário, por favor, tente enviá-lo novamente');
    }
}