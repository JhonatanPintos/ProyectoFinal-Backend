import { faker } from "@faker-js/faker"

faker.locale = 'es'

export const generateProduct = () => {
    return{
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.random.numeric(2),
        category: faker.commerce.department(),
        thumbnails: [faker.image.imageUrl()],
        
    }
}