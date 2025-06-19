// Formats a Date object into a localized string based on the given language ("fr" or "en")
export const formatDate = (date, lang) => {
    return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US").format(date)
}

// Formats an input string by automatically adding slashes as the user types a date (DD/MM/YYYY)
export const formatInputDate = (value) => {
    const numbers = value.replace(/\D/g, "") // Remove all non-digit characters

    if (numbers.length <= 2) return numbers
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
}

// Returns the total number of days in a given month and year
export const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

// Returns the index of the first day of the month (0 = Sunday, 1 = Monday, ...)
export const getFirstDayOfMonth = (year, month) =>
    new Date(year, month, 1).getDay()

// Compares two dates and returns true if they fall on the exact same day
export const isSameDay = (date1, date2) => {


    try {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()

    } catch (error) {
        console.log(error)
        return false
    }

}
// Checks if a date is within the given min and max range
export const isDateInRange = (date, minDate, maxDate) => {
    return (!minDate || date >= minDate) && (!maxDate || date <= maxDate)
}

// Parses a string (in DD/MM/YYYY or MM/DD/YYYY format) into a Date object, based on language
export const parseDateFromString = (selectedate, lang) => {
    if (!selectedate || typeof selectedate !== "string") {
        return null
    }
    if (!lang || (lang !== 'fr' && lang !== 'en')) {
        console.warn('Invalid language, defaulting to "fr"')
        lang = 'en'
    }
    const parts = selectedate.split("/")
    if (parts.length !== 3) {
        return null
    }
    let day, month, year

    if (lang === "fr" && parts.length === 3) {
        [day, month, year] = parts
    } else if (lang === "en" && parts.length === 3) {
        [month, day, year] = parts
    }

    // Convert parts to numbers
    const dayNum = Number(day)
    const monthNum = Number(month)
    const yearNum = Number(year)

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
        return null
    }

    if (dayNum < 1 || dayNum > 31) {
        return null
    }
    if (monthNum < 1 || monthNum > 12) {
        return null
    }

    if (yearNum < 1000 || yearNum > 9999) {
        return null
    }
    try {
        const dateObj = new Date(yearNum, monthNum - 1, dayNum)

        // Validate the date to ensure it matches the input
        if (dateObj.getDate() !== dayNum ||
            dateObj.getMonth() !== monthNum - 1 ||
            dateObj.getFullYear() !== yearNum) {
            return null
        }

        if (!isNaN(dateObj.getTime())) {
            return dateObj
        }
    } catch (error) {
        console.error('parseDateFromString: Error creating date:', error)
    }

    return null
}
