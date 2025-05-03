module.exports = (baseUrl) => (req,res) => {
    const PARSE_URL = new URL(req.url, baseUrl);
    const params = {};
    PARSE_URL.searchParams.forEach((value, key) => {
        params[key] = value;
    })
    
    req.pathname = PARSE_URL.pathname;
    req.params = params;
}