import prisma from "../src/db/database.js";

async function main() {
    await prisma.users.createMany({
        data: [
            {
                email: "arroz123@gmail.com",
                password: "arroz123",
                username: "arroz123"
            }
        ]
    })
    await prisma.animes.createMany({
        data: [
            {
                name: "shingeky no gigante",
                image: "https://pao.com",
                user_id: 1
            }
        ]
    })
    await prisma.reviews.createMany({
        data: [
            {
                anime_id: 1,
                user_id: 1,
                rating: 5,
                description: "obra prima"
            }
        ]
    })
}

main()
    .then(() => "Deu certo!")
    .catch(e => console.log(e))
    .finally();