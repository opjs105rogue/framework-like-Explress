module.exports = (req, res) => new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
            req.body = JSON.parse(body || '{}');
            resolve();
    });
});
