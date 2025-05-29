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
export const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()

// Checks if a date is within the given min and max range
export const isDateInRange = (date, minDate, maxDate) => {
    return (!minDate || date >= minDate) && (!maxDate || date <= maxDate)
}

// Parses a string (in DD/MM/YYYY or MM/DD/YYYY format) into a Date object, based on language
export const parseDateFromString = (selectedate, lang = "fr") => {
    const parts = selectedate.split("/")
    let day, month, year

    if (lang === "fr" && parts.length === 3) {
        [day, month, year] = parts
    } else if (lang === "en" && parts.length === 3) {
        [month, day, year] = parts
    }

    if (day && month && year) {
        const dateObj = new Date(year, Number(month) - 1, Number(day))
        if (!isNaN(dateObj)) {
            return dateObj
        }
    }

    return null
}
