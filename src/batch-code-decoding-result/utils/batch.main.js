let decoders = [
    // Major Global Cosmetic and Luxury Brands
    decodeLOreal,              // Brands like L'Oreal, Biotherm, Cacharel, etc.
    decodeEsteeLauder,         // Brands like Aerin, Aveda, Becca, etc.
    decodeLVMH,                // Brands like Dior, Fendi, Givenchy, etc.
    decodeUnilever,            // Brands like Alberto Balsam, Andrelon, Axe, etc.
    decodeCoty,                // Brands like Adidas, Alexander McQueen, Balenciaga, etc.
    decodeRevlon,              // Brands like Almay, American Crew, Elizabeth Arden, etc.
    decodeParlux,              // Brands like Ivanka Trump, Jay Z, Paris Hilton, etc.
    decodeAntonioPuig,         // Brands like Adolfo Dominguez, Carolina Herrera, Paco Rabanne, etc.

    // Renowned Skincare and Beauty Brands
    decodeNeutrogena,          // Brands like Aveeno, Clean & Clear, Johnson & Johnson, etc.
    decodeNivea,               // Brands like Eucerin, Florena, LaToja, etc.
    decodeShiseido,            // Brands like Anessa, Aupres, Benefique, etc.

    // Prominent Haircare and Fragrance Brands
    decodeSchwarzkopf,         // Brands like Authentic Beauty Concept, got2b, Syoss, etc.
    decodeInterparfums,        // Brands like Abercrombie & Fitch, Anna Sui, Boucheron, etc.

    // Other Notable Brands
    decodePalmolive,           // Brands like Ajax, Elmex, Irish Spring, etc.
    decodeClarins,
    decodeLaneige,
    decodeOlaplex,
    decodeCarmex,
    decodeTigi,
    decodeVaseline,
    decodeProcterGamble,       // Brands like Astor, Aussie, Pantene, etc.
    decodeIsadora,
    decodeTheBodyShop,
    decodeVictoriasSecret,
    decodeSephora,
    decodeAnastasiaBeverlyHills,
    decodeGlossier,
    decodeColourPop,
    // Add any other unique decoders that are not listed above but are present in your switch statement.
];
function getDecoderFunction(brand) {
    switch (brand) {
        case 'mydentity':
            return decodeSchwarzkopf;
        case '8x4':
            return decodeNivea;}}

// Fallback function to decode the batch code using all available decoders
async function smartDecoderLookup(batchCode, usedFallback) {
    for (let i = 0; i < decoders.length; i++) {
        try {
            let result = await decoders[i](batchCode);
            if (result && !result.output.includes("Invalid batch code")) {
                if (i !== 0) {
                    decoders.unshift(decoders.splice(i, 1)[0]);
                }
                return {
                    ...result,
                    usedFallback: usedFallback,
                    decoderUsed: decoders[i].name
                };
            }
        } catch (error) {
            console.error("Error in smart decoder lookup:", error);
        }
    }
    return {
        output: "No valid decoder found for this batch code",
        usedFallback: usedFallback
    };
}

// Main function to decode the batch code.
// This function allows specifying a brand and includes a fallback mechanism.
async function decodeBatch(brand, batchCode) {
    // Retrieve the decoder function for the specified brand
    let decoder = getDecoderFunction(brand);
    let decodedInfo = {};

    if (decoder) {
        try {
            // Attempt to decode the batch code using the brand-specific decoder
            decodedInfo = await decoder(batchCode);
            // If the brand-specific decoder returns "Invalid batch code", use fallback
            if (decodedInfo && decodedInfo.output.includes("Invalid batch code")) {
                decodedInfo = await smartDecoderLookup(batchCode, true);
            } else {
                // If decoding is successful, add additional info
                decodedInfo = {
                    ...decodedInfo,
                    usedFallback: false,
                    decoderUsed: decoder.name
                };
            }
        } catch (error) {
            // If there is an error in brand-specific decoding, use fallback
            console.error("Error in brand-specific decoding:", error);
            decodedInfo = await smartDecoderLookup(batchCode, true);
        }
    } else {
        // If no brand-specific decoder is found, use fallback
        decodedInfo = await smartDecoderLookup(batchCode, true);
    }

    // Calculate time elapsed if a valid date was returned
    if (decodedInfo && decodedInfo.year && decodedInfo.month) {
        // Manufacturing date information
        decodedInfo.manufacturingDate = {
            year: decodedInfo.year,
            month: decodedInfo.month,
            day: decodedInfo.day
        };
    }

    // Format the response as JSON
    const jsonResponse = decodedInfo.manufacturingDate
        ? {
            year: decodedInfo.manufacturingDate.year || 0,
            month: decodedInfo.manufacturingDate.month || 0,
            day: decodedInfo.manufacturingDate.day > 1 || decodedInfo.manufacturingDate.day === undefined ? (decodedInfo.manufacturingDate.day || 0) : decodedInfo.manufacturingDate.day,
            error: "",
            usedFallback: decodedInfo.usedFallback,
            decoderUsed: decodedInfo.decoderUsed
        }
        : {
            year: 0,
            month: 0,
            day: 0,
            error: "Invalid batch code",
            usedFallback: decodedInfo.usedFallback,
            decoderUsed: decodedInfo.decoderUsed
        };

    return JSON.stringify(jsonResponse);
}


// Bulk lookup function for batch codes with optional brands
async function bulkDecodeBatch(batchCodeList) {
    let results = [];

    for (const item of batchCodeList) {
        try {
            // item should have structure: { brand: 'brandName', batchCode: 'code' }
            // If brand is not provided, it will default to null
            const brand = item.brand || null;
            const decodedResult = await decodeBatch(brand, item.batchCode);

            results.push({
                brand: brand,
                batchCode: item.batchCode,
                decodedResult: JSON.parse(decodedResult) // Parsing the JSON response
            });
        } catch (error) {
            console.error("Error in bulk decoding:", error);
            results.push({
                brand: item.brand,
                batchCode: item.batchCode,
                error: "Error occurred during decoding"
            });
        }
    }

    return results;
}

// Example usage
const batchCodeList = [
    { brand: 'loreal', batchCode: '12345' },
    { brand: 'nivea', batchCode: '67890' },
    { batchCode: '98765' } // Item without a brand
    // Add more items as needed
];

bulkDecodeBatch(batchCodeList).then(results => {
    console.log("Bulk decoding results:", results);
});

