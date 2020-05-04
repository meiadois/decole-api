const path = require('path');
var fs = require('fs');
function createFolderIfNotExists(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}
exports.createPublicFolders = (public_folder_path) => {
    var folders = []
    folders.push(public_folder_path);

    const uploads = path.join(public_folder_path, 'uploads');
    folders.push(uploads);

    const companies = path.join(public_folder_path, 'companies');
    folders.push(companies);

    const companies_thumbnails = path.join(companies, 'thumbnails');
    folders.push(companies_thumbnails);

    const companies_banners = path.join(companies, 'banners');
    folders.push(companies_banners);

    folders.forEach((folder, index, array) => {
        createFolderIfNotExists(folder);
    })

}