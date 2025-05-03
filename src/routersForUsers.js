const Router = require('../framework/Router');
const control = require('../framework/routerControlUsers');

const router = new Router();

router.get('/users', control.getUser)
router.post('/users', control.createUser)

module.exports = router;