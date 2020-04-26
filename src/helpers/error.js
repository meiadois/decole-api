class ErrorHandler extends Error{
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
const handleError = (err, res) => {
    var { statusCode, message } = err;
    console.log("Handling error...")
    if(!message){
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
    if(!statusCode) statusCode = 500;
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