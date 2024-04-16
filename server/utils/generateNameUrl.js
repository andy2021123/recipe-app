import slugify from "slugify"

export default function generateNameUrl(existingNames, name) {
  let slug = slugify(name, { lower: true })
  let count = 0
  
  existingNames.forEach(existingName => {
    if (slug === slugify(existingName, { lower: true })) {
      count++
    }
  })

  return (count === 0 ? slug : `${slug}-${count}`)
}