// decodeSchwarzkopf eg. alex-style 0929X06926 
function decodeSchwarzkopf(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearLastDigit = currentYear % 10;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Validate the batch code structure.
    if (!/^[a-zA-Z0-9]{1,12}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const day = parseInt(batchCode.substring(2, 4));
    const monthChar = batchCode.charAt(4);
    const yearChar = parseInt(batchCode.charAt(5));

    let month;

    switch (monthChar) {
        case '1': month = 1; break;
        case '2': month = 2; break;
        case '3': month = 3; break;
        case '4': month = 4; break;
        case '5': month = 5; break;
        case '6': month = 6; break;
        case '7': month = 7; break;
        case '8': month = 8; break;
        case '9': month = 9; break;
        case 'X': month = 10; break;
        case 'Y': month = 11; break;
        case 'Z': month = 12; break;
        default: return { output: "Invalid batch code" };
    }

    // Calculate the year.
    const baseYear = currentYear - currentYearLastDigit;
    let year = baseYear + yearChar;

    // If the yearChar is greater than the currentYearLastDigit, adjust for the previous decade.
    if (yearChar > currentYearLastDigit) {
        year = baseYear + yearChar - 10;
    }

    // Validation for days in the given month.
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return { output: "Invalid batch code" };
    }

    // Check if the date is in the future.
    const batchDate = new Date(year, month - 1, day); // JavaScript months are 0-11, hence the month - 1
    if (batchDate > currentDate) {
        return { output: "Invalid batch code" };
    }

    const monthName = monthNames[month - 1];

    return {
        year: year,
        month: month,
        day: day,
        output: `Manufacturing Date: ${monthName} ${day}, ${year}`
    };
}


//decodeNivea - 8x4 84213310
function decodeNivea(batchCode) {
    // Check if the batch code contains letters, numbers, * and is up to 14 characters long
    if (!/^[a-zA-Z0-9*]{1,14}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const currentYearLastDigit = new Date().getFullYear() % 10;
    const yearChar = parseInt(batchCode.charAt(0));
    const weekOfYear = parseInt(batchCode.substring(1, 3));

    // Calculate the base year using current year's last digit.
    let baseYear = new Date().getFullYear() - currentYearLastDigit;
    let year = baseYear + yearChar;

    // If the yearChar is greater than the currentYearLastDigit, it means it should wrap around to the previous decade.
    if (yearChar > currentYearLastDigit) {
        year = baseYear + yearChar - 10;
    }

    if (isNaN(weekOfYear) || weekOfYear < 1 || weekOfYear > 53) {
        return { output: "Invalid batch code" };
    }

    // Calculate the date of the Monday in the given week
    const januaryFirst = new Date(year, 0, 2); // Start with Jan 2 (to ensure it's Monday)
    const daysToAdd = (weekOfYear - 1) * 7; // Calculate the number of days to add to Jan 2
    const date = new Date(januaryFirst);
    date.setDate(januaryFirst.getDate() + daysToAdd);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    // Checking if the batch date is in the future
    const currentDate = new Date();
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: year,
        month: date.getMonth() + 1,
        day: date.getDate(),
        output: `Manufacturing Date: ${month} ${date.getDate()}, ${year}`
    };
}

//decodeLOreal - acnefree - 38U60OG 
function decodeLOreal(batchCode) {
    const yearMapping = {
        'Z': 2025, 'Y': 2024, 'X': 2023, 'W': 2022, 'U': 2021, 'V': 2021,
        'T': 2020, 'S': 2019, 'R': 2018, 'P': 2017, 'N': 2016, 'M': 2015,
        'L': 2014, 'K': 2013, 'J': 2012, 'I': 2012, 'H': 2011, 'G': 2010,
        'F': 2009, 'E': 2008, 'D': 2007, 'C': 2006, 'B': 2005, 'A': 2004
    };

    const monthMapping = {
        '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
        '7': 7, '8': 8, '9': 9, 'O': 10, 'N': 11, 'D': 12
    };

    const yearChar = batchCode.charAt(2);
    const monthChar = batchCode.charAt(3);

    const year = yearMapping[yearChar];
    const monthNumber = monthMapping[monthChar];

    if (!year || !monthNumber) {
        return { output: "Invalid batch code" };
    }

    // Checking if the batch date is in the future
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;  // JS months are 0-based but we're using 1-based

    if (year > currentYear || (year === currentYear && monthNumber > currentMonth)) {
        return { output: "Invalid batch code" };
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return {
        year: year,
        month: monthNumber,
        output: `Manufacturing Date: ${monthNames[monthNumber - 1]} ${year}`
    };
}

//decodeCoty adidas 0275
function decodeCoty(batchCode) {
    const currentYear = new Date().getFullYear();

    if (!/^\d{4,10}$/.test(batchCode)) { // Check if the batch code contains only digits and is between 5 to 10 characters long
        return { output: "Invalid batch code" };
    }

    let yearChar = parseInt(batchCode.charAt(0));
    const dayOfYear = parseInt(batchCode.substring(1, 4));

    let batchYear = currentYear - (currentYear % 10) + yearChar;
    if (batchYear > currentYear) {
        batchYear -= 10;
    }

    if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
        return { output: "Invalid batch code" };
    }

    // Calculate the month and day from the day of the year
    const date = new Date(batchYear, 0); // Start with Jan 1
    date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    // Checking if the batch date is in the future
    const currentDate = new Date();
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: batchYear,
        month: date.getMonth() + 1,
        day: date.getDate(),
        output: `Manufacturing Date: ${month} ${date.getDate()}, ${batchYear}`
    };
}

//decodeEsteeLauder aramis C79 
function decodeEsteeLauder(batchCode) {
    const currentYearLastDigit = new Date().getFullYear() % 10;

    if (!/^[a-zA-Z]\d{2}[a-zA-Z0-9]{0,3}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const monthChar = parseInt(batchCode.charAt(1));
    const yearChar = parseInt(batchCode.charAt(2));

    // Calculate the base year using current year's last digit.
    let baseYear = new Date().getFullYear() - currentYearLastDigit;
    let year = baseYear + yearChar;

    // If the yearChar is greater than the currentYearLastDigit, it means it should wrap around to the previous decade.
    if (yearChar > currentYearLastDigit) {
        year = baseYear + yearChar - 10;
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (monthChar < 1 || monthChar > 12) {
        return { output: "Invalid batch code" };
    }
    const month = monthNames[monthChar - 1];

    // Checking if the batch date is in the future.
    const currentDate = new Date();
    const batchDate = new Date(year, monthChar - 1, 1);
    if (batchDate > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: year,
        month: monthChar,
        output: `Manufacturing Date: ${month}, ${year}`
    };
}

//decodePalmolive colgate 2023410 -- fix
function decodePalmolive(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearLastDigit = currentYear % 10;

    // Check if the batch code contains letters, numbers, * and is up to 14 characters long
    if (!/^[a-zA-Z0-9*]{1,14}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearLastDigit = parseInt(batchCode[0]);
    let year = currentYear - currentYearLastDigit + yearLastDigit;

    // If the parsed year digit is greater than current year's last digit or the derived date is in the future, assume previous decade
    const dayOfYear = parseInt(batchCode.substring(1, 4));
    const tentativeDate = new Date(year, 0);
    tentativeDate.setDate(dayOfYear);

    if (yearLastDigit > currentYearLastDigit || tentativeDate > currentDate) {
        year -= 10;
    }

    if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 365) {
        return { output: "Invalid batch code 2" };
    }

    // Convert day of the year to month and day
    const dateFromDayOfYear = new Date(year, 0);
    dateFromDayOfYear.setDate(dayOfYear);

    const month = dateFromDayOfYear.getMonth();
    const dayOfMonth = dateFromDayOfYear.getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return {
        year: year,
        month: month + 1, // 0-indexed to 1-indexed
        day: dayOfMonth,
        output: `Manufacturing Date: ${monthNames[month]} ${dayOfMonth}, ${year}`
    };
}

//decodeUnilever folicure 12661
function decodeUnilever(batchCode) {
    if (!/^[a-zA-Z0-9]{5,10}$/.test(batchCode)) { // Check if the batch code contains digits and letters and is between 5 to 10 characters long
        return { output: "Invalid batch code" };
    }

    const currentYearLastDigit = new Date().getFullYear() % 10;
    const yearChar = parseInt(batchCode.charAt(0));
    const dayOfYear = parseInt(batchCode.substring(1, 4));

    // Calculate the base year using current year's last digit.
    let baseYear = new Date().getFullYear() - currentYearLastDigit;
    let year = baseYear + yearChar;

    // If the yearChar is greater than the currentYearLastDigit, it means it should wrap around to the previous decade.
    if (yearChar > currentYearLastDigit) {
        year = baseYear + yearChar - 10;
    }

    if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
        return { output: "Invalid batch code" };
    }

    // Calculate the month and day from the day of the year
    const date = new Date(year, 0); // Start with Jan 1
    date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    // Checking if the batch date is in the future
    const currentDate = new Date();
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: year,
        month: date.getMonth() + 1,
        day: date.getDate(),
        output: `Manufacturing Date: ${month} ${date.getDate()}, ${year}`
    };
}


//decodeRevlon alfred-sung Y21921A 
function decodeRevlon(batchCode) {
    // Validate the batch code length and its structure.
    if (!/^[a-zA-Z0-9]{5,10}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    // Extract year, month, and day parts
    const yearPart = batchCode.substring(1, 3);
    const monthPart = batchCode.charAt(3);
    const dayPart = batchCode.substring(4, 6);

    // Convert extracted parts to numbers
    const year = parseInt(yearPart, 10) + 2000;
    const month = parseInt(monthPart, 10) - 1; // JavaScript months are 0-indexed
    const day = parseInt(dayPart, 10);

    // Check if the date is valid
    const batchDate = new Date(year, month, day);
    const currentDate = new Date();
    if (isNaN(batchDate.getTime()) || batchDate > currentDate) {
        return { output: "Invalid batch code" };
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const formattedMonth = monthNames[month];

    // Calculate elapsed time
    let diffYears = currentDate.getFullYear() - batchDate.getFullYear();
    let diffMonths = currentDate.getMonth() - batchDate.getMonth();
    if (diffMonths < 0 || (diffMonths === 0 && currentDate.getDate() < batchDate.getDate())) {
        diffYears--;
        diffMonths += 12;
    }

    // Construct output string for manufacturing date only
    const outputString = `Manufacturing Date: ${formattedMonth} ${day}, ${year}`;

    return {
        year: year,
        month: month + 1, // Convert back to 1-indexed for external use
        day: day,
        output: outputString
    };
}

//decodeShiseido anessa  7229MM 
function decodeShiseido(batchCode) {
    const currentYear = new Date().getFullYear();
    const currentYearLastDigit = currentYear % 10;

    if (!/^\d{2}[a-zA-Z0-9]{0,4}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearLastDigit = parseInt(batchCode.charAt(0));
    const dayOfYear = parseInt(batchCode.substring(1, 4));

    // Calculate the full year based on the provided year's last digit
    let batchYear = currentYear - currentYearLastDigit + yearLastDigit;
    if (yearLastDigit > currentYearLastDigit) {
        batchYear -= 10;
    }

    if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
        return { output: "Invalid batch code" };
    }

    // Calculate the month and day from the day of the year
    const date = new Date(batchYear, 0); // Start with Jan 1
    date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    // Checking if the batch date is in the future
    const currentDate = new Date();
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: batchYear,
        month: date.getMonth() + 1,
        day: date.getDate(),
        output: `Manufacturing Date: ${month} ${date.getDate()}, ${batchYear}`
    };
}

//decodeNeutrogena aveeno 2310VA 
function decodeNeutrogena(batchCode) {
    const currentYearLastDigit = new Date().getFullYear() % 10;

    if (!/^\d{4}[a-zA-Z0-9]{0,6}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearChar = parseInt(batchCode.charAt(3));
    const dayOfYear = parseInt(batchCode.substring(0, 3));

    // Calculate the base year using current year's last digit.
    let baseYear = new Date().getFullYear() - currentYearLastDigit;
    let year = baseYear + yearChar;

    // If the yearChar is greater than the currentYearLastDigit, it means it should wrap around to the previous decade.
    if (yearChar > currentYearLastDigit) {
        year = baseYear + yearChar - 10;
    }

    if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
        return { output: "Invalid batch code" };
    }

    // Calculate the month and day from the day of the year.
    const date = new Date(year, 0); // Start with Jan 1
    date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    // Checking if the batch date is in the future.
    const currentDate = new Date();
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: year,
        month: date.getMonth() + 1,
        day: date.getDate(),
        output: `Manufacturing Date: ${month} ${date.getDate()}, ${year}`
    };
}
//decodeClarins clarins 
function decodeClarins(batchCode) {
    if (!/^\d{5,10}$/.test(batchCode)) { // Check if the batch code contains only digits and is between 5 to 10 characters long
        return { output: "Invalid batch code" };
    }

    const currentYearLastDigit = new Date().getFullYear() % 10;
    const yearChar = parseInt(batchCode.charAt(1));
    const weekOfYear = parseInt(batchCode.substring(2, 4));

    // Calculate the base year using current year's last digit.
    let baseYear = new Date().getFullYear() - currentYearLastDigit;
    let year = baseYear + yearChar;

    // If the yearChar is greater than the currentYearLastDigit, it means it should wrap around to the previous decade.
    if (yearChar > currentYearLastDigit) {
        year = baseYear + yearChar - 10;
    }

    if (isNaN(weekOfYear) || weekOfYear < 1 || weekOfYear > 53) {
        return { output: "Invalid batch code" };
    }

    // Calculate the date of the Monday in the given week
    const januaryFirst = new Date(year, 0, 2); // Start with Jan 2 (to ensure it's Monday)
    const daysToAdd = (weekOfYear - 1) * 7; // Calculate the number of days to add to Jan 2
    const date = new Date(januaryFirst);
    date.setDate(januaryFirst.getDate() + daysToAdd);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    // Checking if the batch date is in the future
    const currentDate = new Date();
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: year,
        month: date.getMonth() + 1,
        day: date.getDate(),
        output: `Manufacturing Date: ${month} ${date.getDate()}, ${year}`
    };
}


//decodeLaneige  laneige - ??
function decodeLaneige(batchCode) {
    const currentYear = new Date().getFullYear();

    if (!/^\d{1}[a-zA-Z0-9]{0,4}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    let yearChar = parseInt(batchCode.charAt(0));
    const dayOfYear = parseInt(batchCode.substring(1, 4));

    let batchYear = currentYear - (currentYear % 10) + yearChar;
    if (batchYear > currentYear) {
        batchYear -= 10;
    }

    if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
        return { output: "Invalid batch code" };
    }

    // Calculate the month and day from the day of the year
    const date = new Date(batchYear, 0); // Start with Jan 1
    date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    // Checking if the batch date is in the future
    const currentDate = new Date();
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: batchYear,
        month: date.getMonth() + 1,
        day: date.getDate(),
        output: `Manufacturing Date: ${month} ${date.getDate()}, ${batchYear}`
    };
}

//decodeOlaplex olaplex - ??
function decodeOlaplex(batchCode) {
    const currentYear = new Date().getFullYear();
    const currentYearLastDigit = currentYear % 10;  // Just the last digit
    const currentDate = new Date();
    const monthMap = {
        'A': "January",
        'B': "February",
        'C': "March",
        'D': "April",
        'E': "May",
        'F': "June",
        'G': "July",
        'H': "August",
        'I': "September",
        'J': "October",
        'K': "November",
        'L': "December"
    };

    // Extract year and month from the start of the code.
    const yearChar = parseInt(batchCode.charAt(0));
    const monthChar = batchCode.charAt(1).toUpperCase();

    // Calculate the base year using the current year.
    let year = currentYear - currentYearLastDigit + yearChar;

    // Adjust for decades.
    if (yearChar > currentYearLastDigit) {
        year -= 10;
    }

    let monthName = monthMap[monthChar];

    // Check for future date in short version:
    const shortDate = new Date(year, Object.keys(monthMap).indexOf(monthChar));
    if (shortDate > currentDate) {
        return { output: "Invalid batch code" };
    }

    let day = null;
    // If extended batch code is present.
    if (batchCode.includes('-')) {
        const extendedCodeParts = batchCode.split('-');
        if (extendedCodeParts.length > 1 && extendedCodeParts[1].length >= 5) {
            year = 2000 + parseInt(extendedCodeParts[1].substring(0, 2));
            const dayOfYear = parseInt(extendedCodeParts[1].substring(2, 5));

            if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
                return { output: "Invalid batch code" };
            }

            // Calculate the month and day from the day of the year.
            const date = new Date(year, 0); // Start with Jan 1
            date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

            // Check for future date in the extended version:
            if (date > currentDate) {
                return { output: "Invalid batch code" };
            }

            monthName = monthMap[Object.keys(monthMap)[date.getMonth()]];
            day = date.getDate();
        }
    }

    if (!monthName) {
        return { output: "Invalid batch code" };
    }

    const output = day
        ? `Manufacturing Date: ${monthName} ${day}, ${year}`
        : `Manufacturing Date: ${monthName}, ${year}`;

    return {
        year: year,
        month: Object.keys(monthMap).indexOf(monthChar) + 1,
        day: day,
        output: output
    };
}

//decodeCarmex carmex - ??
function decodeCarmex(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-11, so +1 to make it 1-12
    const currentYearLastTwoDigits = currentYear % 100;

    // Check if the batch code contains only digits and is between 5 to 10 characters long
    if (!/^\d{5,10}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearDigits = parseInt(batchCode.substring(0, 2));
    const year = 2000 + yearDigits;

    if (yearDigits > currentYearLastTwoDigits || year > currentYear) {
        return { output: "Invalid batch code" };
    }

    return {
        year: year,
        month: currentMonth,
        output: `Manufacturing Year: ${year}`
    };
}

//decodeTigi tigi - 12661 
function decodeTigi(batchCode) {
    const currentDate = new Date();
    const currentYearLastDigit = currentDate.getFullYear() % 10;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // First type of batch code (similar to Dove)
    if (/^\d{5,10}$/.test(batchCode)) {
        const yearChar = parseInt(batchCode.charAt(0));
        const dayOfYear = parseInt(batchCode.substring(1, 4));

        // Calculate the base year using current year's last digit.
        let baseYear = currentDate.getFullYear() - currentYearLastDigit;
        let year = baseYear + yearChar;

        // If the yearChar is greater than the currentYearLastDigit, adjust for the previous decade.
        if (yearChar > currentYearLastDigit) {
            year = baseYear + yearChar - 10;
        }

        if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
            return { output: "Invalid batch code" };
        }

        // Calculate the month and day from the day of the year
        const date = new Date(year, 0); // Start with Jan 1
        date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

        const month = monthNames[date.getMonth()];

        // Check if the batch date is in the future
        if (date > currentDate) {
            return { output: "Invalid batch code" };
        }

        return {
            year: year,
            month: date.getMonth() + 1,
            day: date.getDate(),
            output: `Manufacturing Date: ${month} ${date.getDate()}, ${year}`
        };
    }

    // Second type of batch code
    if (/^\d{6}[a-zA-Z]{2}\d{2}$/.test(batchCode)) {
        const month = parseInt(batchCode.substring(0, 2));
        const day = parseInt(batchCode.substring(2, 4));
        const year = parseInt("20" + batchCode.substring(4, 6));

        // Check the validity of the date
        const date = new Date(year, month - 1, day);
        if (date.getMonth() + 1 !== month || date.getDate() !== day) {
            return { output: "Invalid batch code" };
        }

        // Check if the batch date is in the future
        if (date > currentDate) {
            return { output: "Invalid batch code" };
        }

        return {
            year: year,
            month: month,
            day: day,
            output: `Manufacturing Date: ${monthNames[month - 1]} ${day}, ${year}`
        };
    }

    return { output: "Invalid batch code" };
}

//decodeVaseline vaseline - 12661 
function decodeVaseline(batchCode) {
    const currentYear = new Date().getFullYear();

    if (!/^\d{4,10}$/.test(batchCode)) { // Check if the batch code contains only digits and is between 5 to 10 characters long
        return { output: "Invalid batch code" };
    }

    let yearChar = parseInt(batchCode.charAt(0));
    const dayOfYear = parseInt(batchCode.substring(1, 4));

    let batchYear = currentYear - (currentYear % 10) + yearChar;
    if (batchYear > currentYear) {
        batchYear -= 10;
    }

    if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
        return { output: "Invalid batch code" };
    }

    // Calculate the month and day from the day of the year
    const date = new Date(batchYear, 0); // Start with Jan 1
    date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    // Checking if the batch date is in the future
    const currentDate = new Date();
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: batchYear,
        month: date.getMonth() + 1,
        day: date.getDate(),
        output: `Manufacturing Date: ${month} ${date.getDate()}, ${batchYear}`
    };
}
//decodeVeet veet - ??
function decodeVeet(batchCode) {
    const currentYear = new Date().getFullYear();
    const currentYearLast2Digits = currentYear % 100;

    if (!/^[A-Z]?\d{6,10}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    // Remove any leading letter, if present
    batchCode = batchCode.replace(/^[A-Z]/, '');

    const dayOfMonth = parseInt(batchCode.substring(0, 2));
    const month = parseInt(batchCode.substring(2, 4));
    const yearCode = parseInt(batchCode.substring(4, 6));

    if (yearCode > currentYearLast2Digits) {
        return { output: "Invalid batch code" };
    }

    let batchYear = currentYear - currentYearLast2Digits + yearCode;

    if (!batchYear || isNaN(dayOfMonth) || dayOfMonth < 1 || dayOfMonth > 31 || isNaN(month) || month < 1 || month > 12) {
        return { output: "Invalid batch code" };
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(batchYear, month - 1, dayOfMonth);
    const currentDate = new Date();

    if (date <= currentDate) {
        return {
            year: batchYear,
            month: month,
            day: dayOfMonth,
            output: `Manufacturing Date: ${monthNames[month - 1]} ${dayOfMonth}, ${batchYear}`
        };
    }

    return { output: "Invalid batch code" };
}

//decodeAntonioPuig antonioPuig - 83471 
function decodeAntonioPuig(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearLastDigit = currentYear % 10;

    // Validate the batch code length and its structure.
    if (!/^[a-zA-Z0-9]{4,10}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearChar = parseInt(batchCode.charAt(0));
    const dayOfYear = parseInt(batchCode.substring(1, 4));

    // Calculate the base year
    let baseYear = currentYear - currentYearLastDigit;
    let year = baseYear + yearChar;

    // Adjust for the previous decade if necessary
    if (yearChar > currentYearLastDigit) {
        year -= 10;
    }

    if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
        return { output: "Invalid batch code" };
    }

    // Calculate the month and day from the day of the year
    const date = new Date(year, 0); // Start with Jan 1
    date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

    // Checking if the batch date is in the future
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: year,
        month: date.getMonth() + 1, // Returning the month as a number
        day: date.getDate(),
        output: `Manufacturing Date: ${date.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + date.toLocaleString('default', { month: 'long' }).slice(1)} ${date.getDate()}, ${year}`

    };
}

//decodeInterparfums abercrombie-and-fitch - 08J38J169
function decodeInterparfums(batchCode) {
    const yearMapping = {
        'A': 2010, 'B': 2011, 'C': 2012, 'D': 2013, 'E': 2014,
        'F': 2015, 'G': 2016, 'H': 2017, 'I': 2018, 'J': 2019,
        'K': 2020, 'L': 2021, 'M': 2022, 'N': 2023, 'O': 2024,
        'P': 2025, 'Q': 2026, 'R': 2027, 'S': 2028, 'T': 2029,
        'U': 2030
    };

    // Ensure the batch code is the correct length
   /* if (batchCode.length < 12) {
        return { output: "Invalid batch code length" };
    }*/

    const yearChar = batchCode.charAt(5);
    const dayOfYear = parseInt(batchCode.substring(6, 9));

    const year = yearMapping[yearChar];

    if (!year || isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
        return { output: "Invalid batch code" };
    }

    // Calculate the month and day from the day of the year
    const date = new Date(year, 0); // Start with Jan 1
    date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    // Check if the batch date is in the future
    const currentDate = new Date();
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: year,
        month: date.getMonth() + 1,
        day: date.getDate(),
        output: `Manufacturing Date: ${month} ${date.getDate()}, ${year}`
    };
}

//decodeProcterGamble crest 8318A007F0 
function decodeProcterGamble(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearLastDigit = currentYear % 10;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Validate the batch code structure.
    if (!/^[a-zA-Z0-9]{4,14}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearChar = parseInt(batchCode.charAt(0));
    const dayOfYear = parseInt(batchCode.substring(1, 4));

    // Calculate the year.
    const baseYear = currentYear - currentYearLastDigit;
    let year = baseYear + yearChar;

    // If the yearChar is greater than the currentYearLastDigit, adjust for the previous decade.
    if (yearChar > currentYearLastDigit) {
        year = baseYear + yearChar - 10;
    }

    // Convert the day of the year to a date.
    let date = new Date(year, 0); // Start at Jan 1
    date.setDate(dayOfYear); // Set to the nth day of the year

    // Extract the month and day from the new date.
    const month = date.getMonth() + 1; // JavaScript months are 0-11, hence the + 1
    const day = date.getDate();

    // Check if the date is in the future.
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    const monthName = monthNames[month - 1];

    return {
        year: year,
        month: month,
        day: day,
        output: `Manufacturing Date: ${monthName} ${day}, ${year}`
    };
}

//decodeLVMH louis-vuitton 9B01
function decodeLVMH(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearLastDigit = currentYear % 10;

    // Corrected month mapping
    const monthMapping = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6,
        'G': 7, 'H': 8, 'I': 9, 'J': 9, 'K': 10, 'L': 11, 'M': 12
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // Validate the batch code structure
    if (!/^[0-9][A-M][a-zA-Z0-9]{2,8}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearChar = parseInt(batchCode.charAt(0));
    const monthChar = batchCode.charAt(1).toUpperCase();

    if (!monthMapping[monthChar]) {
        return { output: "Invalid batch code" }; // Invalid month
    }

    // Calculate the year
    let year = (currentYear - currentYearLastDigit) + yearChar;
    if (yearChar > currentYearLastDigit) {
        year -= 10; // Adjust for previous decade if necessary
    }

    // Check if the date is in the future
    const monthIndex = monthMapping[monthChar];
    const batchDate = new Date(year, monthIndex - 1);
    if (batchDate > currentDate) {
        return { output: "Invalid batch code" }; // Date is in the future
    }

    return {
        year: year,
        month: monthIndex,
        monthName: monthNames[monthIndex - 1],
        output: `Manufacturing Date: ${monthNames[monthIndex - 1]}, ${year}`
    };
}

//decodeColourPop colourpop 2023410 
function decodeColourPop(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearLastTwoDigits = currentYear % 100;

    // Validate the batch code length and structure
    if (!/^\d{2}[A-L][a-zA-Z0-9]{1,8}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearDigits = parseInt(batchCode.substring(0, 2));
    const monthLetter = batchCode.charAt(2).toUpperCase();

    // Mapping letters to months
    const monthMapping = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6,
        'G': 7, 'H': 8, 'I': 9, 'J': 10, 'K': 11, 'L': 12
    };

    const monthNumber = monthMapping[monthLetter];
    if (!monthNumber) {
        return { output: "Invalid batch code" }; // Invalid month letter
    }

    let year = 2000 + yearDigits;
    // Check if the year is in the future
    if (yearDigits > currentYearLastTwoDigits || year > currentYear) {
        return { output: "Invalid batch code" }; // Year is in the future
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[monthNumber - 1];

    // Check if the date is in the future
    if (year === currentYear && monthNumber > (currentDate.getMonth() + 1)) {
        return { output: "Invalid batch code" }; // Date is in the future
    }

    return {
        year: year,
        month: monthNumber, // return the numeric month for calculation
        monthName: monthName, // return the month name for display
        output: `Manufacturing Date: ${monthName}, ${year}`
    };
}

//decodeGlossier glossier 2023410 
function decodeGlossier(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearLastTwoDigits = currentYear % 100;

    // Validate the batch code structure - first five characters must be digits
    if (!/^\d{5}[a-zA-Z0-9]{0,5}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const year = parseInt(batchCode.substring(0, 2), 10);
    const dayOfYear = parseInt(batchCode.substring(2, 5), 10);

    // Check if the year is greater than the current year's last two digits
    if (year > currentYearLastTwoDigits) {
        return { output: "Invalid batch code" };
    }

    let fullYear = (currentYear - currentYearLastTwoDigits) + year;

    // Check if day of the year is valid
    const yearDate = new Date(fullYear, 0); // Start with Jan 1 of the calculated year
    yearDate.setDate(dayOfYear); // Set to the calculated day of the year

    if (dayOfYear < 1 || dayOfYear > 365 || (yearDate.getFullYear() !== fullYear)) {
        return { output: "Invalid batch code" }; // Invalid day of the year
    }

    // Check if the date is in the future
    if (yearDate > currentDate) {
        return { output: "Invalid batch code" }; // Date is in the future
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[yearDate.getMonth()];
    const day = yearDate.getDate();

    return {
        year: fullYear,
        month: yearDate.getMonth() + 1, // For numeric month value
        day: day,
        output: `Manufacturing Date: ${monthName} ${day}, ${fullYear}`
    };
}

//decodeIsadora isadora 042015 
function decodeIsadora(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearLastDigit = currentYear % 10;

    // Validate the batch code length and structure
    if (!/^[a-zA-Z0-9]{3,10}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    // Ensure the first three characters are numerical
    if (!/^\d{3}/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const weekOfYear = parseInt(batchCode.substring(0, 2));
    const yearChar = parseInt(batchCode.charAt(2));

    // Calculate the base year
    let year = (currentYear - currentYearLastDigit) + yearChar;

    // Adjust for the previous decade if necessary
    if (year > currentYear || (year === currentYear && weekOfYear > getWeekNumber(currentDate))) {
        year -= 10;
    }

    // Convert week of year to date (starting from Monday of that week)
    const date = getDateOfISOWeek(weekOfYear, year);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // Numeric month (January = 1, February = 2, etc.)
        day: date.getDate(),
        output: `Manufacturing Date: ${month} ${date.getDate()}, ${date.getFullYear()}`,
        elapsedOutput: function() {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            let diffYears = currentYear - this.year;
            let diffMonths = currentMonth - this.month;

            if (diffMonths < 0) {
                diffYears -= 1;
                diffMonths += 12;
            }

            return `Elapsed Time: ${diffYears} years and ${diffMonths} months`;
        },
        shelfLifeOutput: function() {
            const shelfLifeDate = new Date(this.year + 3, this.month - 1, this.day);
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const formattedShelfLifeDate = `${monthNames[shelfLifeDate.getMonth()]} ${shelfLifeDate.getFullYear()}`;

            const color = shelfLifeDate > new Date() ? 'green' : 'red';

            return `Estimated Shelf Life: <span style="color: ${color};font-weight:bold;">${formattedShelfLifeDate}</span>`;
        }
    };
}

// Helper function to get the date of Monday in a specific ISO week of a year
function getDateOfISOWeek(week, year) {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

// Helper function to get the ISO week number
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    const weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
}

//decodeTheBodyShop the-body-shop 28P703 
function decodeTheBodyShop(batchCode) {
    // Check if the batch code contains letters or numbers and is between 3 to 10 characters long
    if (!/^[a-zA-Z0-9]{3,10}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearMapping = {
        'A': 2004, 'B': 2005, 'C': 2006, 'D': 2007, 'E': 2008, 'F': 2009, 'G': 2010, 'H': 2011, 'I': 2012, 'J': 2012, 'K': 2013, 'L': 2014, 'M': 2015, 'N': 2016, 'P': 2017, 'R': 2018, 'S': 2019, 'T': 2020, 'U': 2021, 'V': 2021, 'X': 2022, 'Y': 2023, 'Z': 2024
    };

    const monthMapping = {
        '1': 'January', '2': 'February', '3': 'March', '4': 'April',
        '5': 'May', '6': 'June', '7': 'July', '8': 'August',
        '9': 'September', 'O': 'October', 'N': 'November', 'D': 'December'
    };

    const yearChar = batchCode.charAt(2).toUpperCase(); // Convert to uppercase
    const monthChar = batchCode.charAt(3).toUpperCase(); // Convert to uppercase

    const year = yearMapping[yearChar];
    const monthName = monthMapping[monthChar];
    const monthNumber = Object.keys(monthMapping).indexOf(monthChar) + 1;

    if (!year || !monthName) {
        return { output: "Invalid batch code" };
    }

    // Checking if the batch date is in the future
    const currentDate = new Date();
    const batchDate = new Date(year, monthNumber - 1);

    if (batchDate > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: year,
        month: monthNumber, // Return the numerical value of the month
        monthName: monthName,
        output: `Manufacturing Date: ${monthName} ${year}`
    };
}

//decodeVictoriasSecret victorias-secret  9127caa1 
function decodeVictoriasSecret(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearLastDigit = currentYear % 10;

    // Validate the batch code structure
    if (!/^[0-9][0-9]{3}[a-zA-Z0-9]{0,7}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearChar = parseInt(batchCode.charAt(0));
    const dayOfYear = parseInt(batchCode.substring(1, 4));

    // Calculate the base year using current year's last digit
    let baseYear = currentYear - currentYearLastDigit;
    let year = baseYear + yearChar;

    // If the yearChar is greater than the currentYearLastDigit, adjust for the previous decade
    if (yearChar > currentYearLastDigit || year > currentYear) {
        year -= 10;
    }

    if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
        return { output: "Invalid batch code" };
    }

    // Calculate the month and day from the day of the year
    const date = new Date(year, 0); // Start with Jan 1
    date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    // Check if the batch date is in the future
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: year,
        month: date.getMonth() + 1,
        day: day,
        output: `Manufacturing Date: ${month} ${day}, ${year}`
    };
}

//decodeSephora sephora 1123A 
function decodeSephora(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearLastDigit = currentYear % 10;

    // Validate the batch code structure
    if (!/^[0-9][0-9]{3}[a-zA-Z0-9]{0,7}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearChar = parseInt(batchCode.charAt(0));
    const dayOfYear = parseInt(batchCode.substring(1, 4));

    // Calculate the base year using current year's last digit
    let baseYear = currentYear - currentYearLastDigit;
    let year = baseYear + yearChar;

    // If the yearChar is greater than the currentYearLastDigit, adjust for the previous decade
    if (yearChar > currentYearLastDigit || year > currentYear) {
        year -= 10;
    }

    if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
        return { output: "Invalid batch code" };
    }

    // Calculate the month and day from the day of the year
    const date = new Date(year, 0); // Start with Jan 1
    date.setDate(date.getDate() + dayOfYear - 1); // Add the day of the year (-1 because we started on Jan 1)

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    // Check if the batch date is in the future
    if (date > currentDate) {
        return { output: "Invalid batch code" };
    }

    return {
        year: year,
        month: date.getMonth() + 1,
        day: day,
        output: `Manufacturing Date: ${month} ${day}, ${year}`
    };
}

//decodeAnastasiaBeverlyHills anastasia-beverly-hills B19D03 
function decodeAnastasiaBeverlyHills(batchCode) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Check if the batch code contains letters or numbers and is between 4 to 10 characters long
    if (!/^[a-zA-Z0-9]{4,10}$/.test(batchCode)) {
        return { output: "Invalid batch code" };
    }

    const yearPart = parseInt(batchCode.substring(1, 3));
    const monthChar = batchCode.charAt(3).toUpperCase();

    // Mapping of month characters to month numbers
    const monthMapping = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6,
        'G': 7, 'H': 8, 'I': 9, 'J': 9, 'K': 10, 'L': 11, 'M': 12
    };

    const monthNumber = monthMapping[monthChar];
    if (!monthNumber) {
        return { output: "Invalid batch code" }; // Invalid month character
    }

    let year = 2000 + yearPart;

    // Check if the date is in the future
    if (year > currentYear || (year === currentYear && monthNumber > currentDate.getMonth() + 1)) {
        return { output: "Invalid batch code" }; // Date is in the future
    }

    // Month names array for output formatting
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[monthNumber - 1];

    return {
        year: year,
        month: monthNumber, // Return the month as a number
        output: `Manufacturing Date: ${monthName}, ${year}`
    };
}


















