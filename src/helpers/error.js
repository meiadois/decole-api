const Logger = require('../services/Logger');

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
const handleError = (err, res) => {
    if (err instanceof ErrorHandler) {
        var { statusCode, message } = err;
        if (!message) {
            switch (statusCode) {
                case 500:
                    message = "Algo deu errado... tente novamente em alguns minutos.";
                    break;
                case 400:
                    message = "Há parâmetros obrigatórios mal preenchidos.";
                    break;
                case 404:
                    message = "Recurso não encontrado.";
                    break;
                default:
                    message = "Não há uma mensagem definida para este erro."
                    break;
            }
        }
        if (!statusCode) statusCode = 500;
    } else {
        console.log(err);
        var log_message = Logger.get_message_from_error(err);
        Logger.error(log_message).catch((err) => {
            console.log(`Erro do log ignorado`);
        });
        var statusCode = 500
        var message = "Algo deu errado... tente novamente em alguns minutos."
    }



    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
}

module.exports = {
    ErrorHandler,
    handleError
}