'use server'

import { TableClient, AzureNamedKeyCredential } from "@azure/data-tables"

const account = process.env.DB_ACCOUNT;
const accountKey = process.env.DB_ACCOUNT_KEY;
const tableName = process.env.DB_TABLE_NAME

const credential = new AzureNamedKeyCredential(account, accountKey);

const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);

export async function getMealEntities() {
    const entities = client.listEntities();

    var meals=[];
    for await (const entity of entities) {
        meals.push(entity)
     }
    return meals
  }

  export async function getMealEntity(id) {
    const entity = await client.getEntity("P1", id);

    return entity
  }

export async function addMealEntity(meal) {

    const newMeal = {
        partitionKey: "P1",
        rowKey: meal.mealId,
        title: meal.title,
        summary: meal.summary,
        instructions: meal.instructions,
        creator: meal.creator,
        creator_email: meal.creator_email,
        image: meal.image,
        mealId: meal.mealId
    };
    await client.createEntity(newMeal);
}
  