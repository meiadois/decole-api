const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const public_folder = path.join(__dirname, '..', '..', 'public')
const COMPANIES_THUMBNAILS_FOLDER = path.join(public_folder, 'companies', 'thumbnails')

module.exports = {
    async processCompanyThumbnail(file_path, width = 64, height = 64, quality = 80) {
        let filename_without_ext = path.basename(file_path, path.extname(file_path));
        const processed_imagem_filename = filename_without_ext + '.png'
        const processed_image_path = path.join(COMPANIES_THUMBNAILS_FOLDER, processed_imagem_filename)
        var result = await sharp(file_path)
            .resize({
                width: width,
                height: height,
            })
            .png({ quality: quality })
            .toFile(processed_image_path)
            .then(function (newFileInfo) {
                // newFileInfo holds the output file properties
                return true
            })
            .catch(function (err) {
                console.log("Error occured");
                throw err;
            });
        if (result != true) {
            throw err;
        }

        return processed_image_path
    }
}
exports.compressImage = (file, width, height) => {
    const newPath = file.path.split('.')[0] + '.png';

    return sharp(file.path)
        .resize({
            width: width,
            height: height,
        })
        .toFormat('png')
        .toBuffer()
        .then(data => {

            // Deletando o arquivo antigo
            // O fs.acess serve para testar se o arquivo realmente existe, evitando bugs
            fs.access(file.path, (err) => {

                // Um erro significa que a o arquivo não existe, então não tentamos apagar
                if (!err) {

                    //Se não houve erros, tentamos apagar
                    fs.unlink(file.path, err => {

                        // Não quero que erros aqui parem todo o sistema, então só vou imprimir o erro, sem throw.
                        if (err) console.log(err)
                    })
                }
            });

            //Agora vamos armazenar esse buffer no novo caminho
            fs.writeFile(newPath, data, err => {
                if (err) {
                    // Já aqui um erro significa que o upload falhou, então é importante que o usuário saiba.
                    throw err;
                }
            });

            // Se o código chegou até aqui, deu tudo certo, então vamos retornar o novo caminho
            return newPath;
        })
}