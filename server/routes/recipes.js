import express from 'express'
import sharp from 'sharp'

const router = express.Router()

// routes
router.get('/', async (req, res) => {
  sharp('images/perfect_burger.png')
    .resize(200, 200)
    .toBuffer()
    .then(buffer => {
      const image = buffer.toString('base64')

      res.send([
        {
          id: 1,
          name: 'The Perfect Burger',
          image: image,
          category: 'Entree'
        },
        {
          id: 2,
          name: 'New Recipe',
          image: null,
          category: 'Drink'
        }
      ])
    })

})

router.get('/:id', async (req, res) => {
  const { id } = req.params 
  
})

export default router
