import express from 'express'
const router = express.Router()
import sequelize from '#configs/db.js'
const { Product1 } = sequelize.models
import { Op } from 'sequelize'

router.get('/', async (req, res) => {
  const {
    page = 1,
    perpage = 10,
    name_like = '',
    category = '',
    price_gte = '',
    price_lte = '',
    sort = 'id',
    order = 'asc',
  } = req.query

  const whereConditions = {}
  if (name_like) whereConditions.name = { [Op.like]: `%${name_like}%` }
  if (category) whereConditions.category = category
  if (price_gte) whereConditions.price = { ...whereConditions.price, [Op.gte]: Number(price_gte) }
  if (price_lte) whereConditions.price = { ...whereConditions.price, [Op.lte]: Number(price_lte) }

  try {
    const { count, rows } = await Product1.findAndCountAll({
      where: whereConditions,
      offset: (Number(page) - 1) * Number(perpage),
      limit: Number(perpage),
      order: [[sort, order.toUpperCase()]],
    })

    const pageCount = Math.ceil(count / Number(perpage))

    res.json({
      status: 'success',
      data: {
        total: count,
        pageCount,
        page: Number(page),
        perpage: Number(perpage),
        products: rows,
      },
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
})

export default router