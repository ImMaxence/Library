module.exports = (err, req, res, next) => {
    console.error(err.stack);

    if (err.status === 401) {
        return res.status(401).json({
            error: 'Unauthorized' + (err.message ? ': ' + err.message : '')
        });
    }

    if (err.status === 403) {
        return res.status(401).json({
            error: 'Forbidden' + (err.message ? ': ' + err.message : '')
        });
    }

    if (err.status === 404) {
        return res.status(401).json({
            error: 'Not Found' + (err.message ? ': ' + err.message : '')
        });
    }

    if (err.status === 409) {
        return res.status(401).json({
            error: 'Conflict' + (err.message ? ': ' + err.message : '')
        });
    }

    res.status(500).json({ error: 'Something went wrong!' });
};
