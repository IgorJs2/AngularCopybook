const { Router } = require('express')
const NewsValidator = require('../validators/news-validator')
const NewsController = require('../controllers/news-controller')
const router = Router()

router.post('/create_news', NewsValidator.cr_news, NewsController.cr_news)
router.post('/get_news', NewsValidator.gt_news, NewsController.gt_news)
router.post('/delete_news', NewsValidator.dl_news, NewsController.dl_news)

module.exports = router
