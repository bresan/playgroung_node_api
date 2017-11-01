var ObjectId = require('mongodb').ObjectID;

module.exports = function (app, db) {

    // GET notes
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;

        const details = {'_id': new ObjectId(id)};

        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item)
            }
        });
    });

    // POST notes
    app.post('/notes', (req, res) => {
        const note = {text: req.body.body, title: req.body.title};

        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    // DELETE notes
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;

        const details = {'_id': new ObjectId(id)};

        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted');
            }
        });
    });

    function fieldsAreValid(req) {
        if (req.body.body == null || req.body.body === '') {
            return false;
        }

        if (req.body.title == null || req.body.title === '') {
            return false;
        }

        return true;
    }

    // UPDATE routes
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;

        const details = {'_id': new ObjectId(id)};

        if (fieldsAreValid(req)) {
            const note = {text: req.body.body, title: req.body.title};

            db.collection('notes').update(details, note, (err, result) => {
                if (err) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    res.send(note);
                }
            });
        } else {
            res.send({'error': 'Invalid input'});
        }
    });
};