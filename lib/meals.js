import fs from 'node:fs'

import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'

const db = sql('meals.db')

export async function getMeals() {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // throw new Error('Loading meals failed')
    return db.prepare('SELECT * FROM meals').all()
}

export async function getMeal(id) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // throw new Error('Loading meal failed')
    return db.prepare('SELECT * FROM meals WHERE id = ?').get(id)
}

export async function saveMeal(meal) {
    function getRandomInt() {
        return Math.floor(Math.random() * 10000);
    }

    meal.slug = slugify(meal.title, {lower: true})
    meal.instructions = xss(meal.instructions)

    const extension = meal.image.name.split('.').pop()
    const fileName = `${meal.slug}${getRandomInt()}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer()
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!')
        }
    })

    meal.image = `/images/${fileName}`

    db.prepare(`
            INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
            VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
        `).run(meal)
}