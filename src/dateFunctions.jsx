export const formatDate = (date, lang) => {
    return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US").format(date)
}

export const formatInputDate = (value) => {
    const numbers = value.replace(/\D/g, "")

    if (numbers.length <= 2) return numbers
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
}

export const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
export const getFirstDayOfMonth = (year, month) =>
    new Date(year, month, 1).getDay()

export const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()


export const isDateInRange = (date, minDate, maxDate) => {
    return (!minDate || date >= minDate) && (!maxDate || date <= maxDate)
}