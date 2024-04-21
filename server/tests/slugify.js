import slugify from "slugify"

async function generateUniqueId(existingNames, name) {
  let slug = slugify(name, { lower: true })
  let count = 0
  
  existingNames.forEach(existingName => {
    if (slug === slugify(existingName, { lower: true })) {
      count++
    }
  })

  return (count === 0 ? slug : `${slug}-${count}`)
}

// Example usage
const existingNames = ["The Perfect Burger", "The Perfect Burger"];
const name = "The Burger";
const uniqueId = await generateUniqueId(existingNames, name)
console.log(`Unique ID for "${name}": ${uniqueId}`)