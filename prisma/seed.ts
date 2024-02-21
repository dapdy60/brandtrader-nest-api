import { PrismaClient } from '@prisma/client';
import * as fs from 'fs'; // Import fs using ES module syntax

const prisma = new PrismaClient();

async function main() {
    try {
        const data = await fs.promises.readFile('./prisma/seed/manufacturer-seed-data.json', 'utf8');
        const seedData = JSON.parse(data);

        // Insert seed data into the database
        const createdManufacturers = await prisma.manufacturer.createMany({
            data: seedData,
        });

        console.log('Manufacturers Data seeded successfully:', createdManufacturers);

            // Read the seed data from the 

        const dataBrands = await fs.promises.readFile('./prisma/seed/brand-seed-data.json', 'utf8');
        const seedDataBrands = JSON.parse(dataBrands);

        // Insert seed data into the database
        const createdBrands = await prisma.brand.createMany({
            data: seedDataBrands,
        });

        console.log('Brands Data seeded successfully:', createdBrands);
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
