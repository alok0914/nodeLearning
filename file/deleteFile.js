const path = require('path');
const fs = require('fs');

exports.deleteFileAsync = (request, response) => {
    let filePathToDelete = request.query.filename;

    if (filePathToDelete === undefined) {
        response.status(400).send({ error: 'Not a valid file path' }).end();
    } else if (filePathToDelete.search(/\//) < 0) {
        filePathToDelete = path.join(__dirname, filePathToDelete);
    }

    if (filePathToDelete) {
        fs.unlink(filePathToDelete, (error) => {
            if (error)
                response.status(400).send({ error: 'File does not exists' }).end();

            response.status(200).send({ message: 'File deleted successfully' }).end();
        });
    }
};

exports.deleteFileSync = (request, response) => {
    let filePathToDelete = request.query.filename;

    if (filePathToDelete === undefined) {
        response.status(400).send({ error: 'Not a valid file path' }).end();
    } else if (filePathToDelete.search(/\//) < 0) {
        filePathToDelete = path.join(__dirname, filePathToDelete);
    }

    if (filePathToDelete) {
        try {
            fs.unlinkSync(filePathToDelete);
            response.status(200).send({ message: 'File deleted successfully' }).end();
        } catch (error) {
            response.status(400).send({ error: 'File does not exists' }).end();
        }
    }
};