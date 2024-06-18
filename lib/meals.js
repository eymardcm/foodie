import sql from 'better-sqlite3'
import xss from 'xss'
import { storeBlob } from './connectors/azure-blob-storage-connector'
import { v4 as uuid } from 'uuid'
import { addMealEntity, getMealEntities, getMealEntity } from './connectors/azure-table-storage-connector'

const db = sql('meals.db')

export async function getMeals() {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return await getMealEntities()
    // throw new Error('Loading meals failed')
    //return db.prepare('SELECT * FROM meals').all()
}

export async function getMeal(mealId) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return await getMealEntity(mealId)
    
    // throw new Error('Loading meal failed')
    //return db.prepare('SELECT * FROM meals WHERE mealId = ?').get(mealId)
}

export async function saveMeal(meal) {

    meal.mealId = uuid()
    meal.instructions = xss(meal.instructions)

    const extension = meal.image.name.split('.').pop()
    const fileName = `${meal.mealId}.${extension}`

    const res = await storeBlob('images', fileName, meal.image)

    if (res.error) {
        throw new Error("Unable to save image.")
    }

    meal.image = `https://foodieapp.blob.core.windows.net/images/${fileName}`

    await addMealEntity(meal)

    // TODO: Add error handler

}