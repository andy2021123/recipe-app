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
          description: 'Yummy burger'
        },
        {
          id: 2,
          name: 'New Recipe',
          image: null,
          description: 'work in progress'
        }
      ])

      // res.setHeader('Content-Type', 'image/jpeg')
      // res.send(buffer)
    })

})

const examples = [
  {
    id: 1,
    name: 'The Perfect Burger',
    description: 'Yummy burger',
    ingredients: [
      '1 1/2 pounds 80% lean 20% fat ground beef or ground chuck',
      '1 tablespoon Worcestershire sauce',
      '1 1/2 teaspoons seasoning salt',
      '1 teaspoon garlic powder',
      '1/2 teaspoon ground black pepper',
      'Optional: 4 slices of cheese',
      '4 hamburger buns',
      'Optional: hamburger toppings - lettuce tomato, onion, pickles, ketchup, mustard, mayo, etc.'
    ],
    instructions: [
      'Preheat the grill to 375 degrees F (medium-high).',
      'In a large bowl, add the beef.  Sprinkle evenly with the Worcestershire sauce, seasoning salt, garlic powder, and pepper.  Use your hands to mix the ingredients until they are just combined.',
      'Divide the meat mixture into fourths.  Take ¼ of the meat mixture and use your hands to press it into the shape of a hamburger patty that is about ¾ inch thick.  Make an indention in the middle of the patty to prevent bulging in the center of the hamburger as it cooks.  Repeat with the remaining meat mixture, making 4 hamburgers.',
      'Place the burgers on the grill.  Cook 4-5 minutes on the first side.  Flip the burgers over and cook an additional 4-5 minutes, until the burgers have reached the desired doneness.*',
      'If adding cheese, lay a slice of cheese on each burger patty about 1 minute before taking the burgers off the grill, so the cheese has a chance to melt.',
      'Serve the burgers on hamburger buns with optional hamburger toppings.'
    ]
  },
  {
    id: 2,
    name: 'New Recipe',
    image: null,
    description: 'work in progress',
    ingredients: [
      '1 1/2 cups butter, softened',
      '3/4 cup granulated sugar',
      '1 1/2 cup brown sugar',
      '2 eggs',
      '1 1/2 tbsp vanilla',
      '4 1/4 cups all purpose flour',
      '2 tsp baking soda',
      '1 tsp baking powder',
      '1 tsp salt',
      '2 cups guittard milk chocolate chips'
    ],
    instructions: [
      'Preheat oven to 375°.',
      'Cream together the butter, granulated sugar and brown sugar.',
      'Add the egg and vanilla. Mix until light in color and creamy.',
      'Add in the dry ingredients (flour, baking soda, baking powder and salt), mix into the dough. Mix until completely combined.',
      'Fold in the chocolate chips.',
      'Portion out the dough into 1/2 cup portions. Roll into a ball, break the ball in half and squish the two halves together, leaving the rough edges up. Arrange 6 onto each cookie sheet. Add extra chocolate chips to the top if desired.',
      'Bake for 12-15 minutes, until the cookies are turning golden brown.',
      'Allow the cookies to cool on the pan for 20 minutes before serving or transferring to a wire rack.'
    ]
  },
]

router.get('/:id', async (req, res) => {
  const { id } = req.params 
  console.log(id)
  res.send(examples[id-1])
})

export default router
