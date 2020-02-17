const path = require('path');
const fs = require('fs');

exports.readFileAsync = (request, response) => {
    let filePathToRead = request.query.filename;

    if (filePathToRead === undefined) {
        response.status(400).send({ error: 'Not a valid file path' }).end();
    } else if (filePathToRead.search(/\//) < 0) {
        filePathToRead = path.join(__dirname, filePathToDelete);
    }

    if (filePathToRead) {
        fs.readFile(filePathToRead, 'utf8', (error, data) => {
            if (error)
                response.status(400).send({ error: 'File does not exists' }).end();

            response.status(200).send(data).end();
        });
    }
};

exports.readFileSync = (request, response) => {
    let filePathToRead = request.query.filename;

    if (filePathToRead === undefined) {
        response.status(400).send({ error: 'Not a valid file path' }).end();
    } else if (filePathToRead.search(/\//) < 0) {
        filePathToRead = path.join(__dirname, filePathToDelete);
    }

    if (filePathToRead) {
        try {
            const responseForData = fs.readFileSync(filePathToRead, 'utf8');
            response.status(200).send(responseForData).end();
        } catch (error) {
            response.status(400).send({ error: 'File does not exists' }).end();
        }
    }
};