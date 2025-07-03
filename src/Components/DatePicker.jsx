
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { formatDate, formatInputDate, getDaysInMonth, getFirstDayOfMonth, parseDateFromString } from "../dateFunctions"
import { CalendarGrid } from "./CalendarGrid.jsx"
import { CalendarHeader } from "./CalendarHeader.jsx"
import { Weekdays } from "./Atoms/Weekdays.jsx"

export const DatePicker = ({ lang, minDate, maxDate, value, onChange, required = "true", ...props }) => {
    const { i18n, t } = useTranslation()

    const [selectedDate, setSelectedDate] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())

    //update language
    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang, i18n])

    useEffect(() => {
        if (value !== undefined) {
            setSelectedDate(value)
        }
    }, [value])


    const toggleCalendar = () => {
        setIsOpen(!isOpen)
    }

    // Function to handle input change and format the date
    useEffect(() => {
        const defaultDate = new Date()

        if (selectedDate) {
            const parsed = parseDateFromString(selectedDate, lang)
            if (parsed) {
                setCurrentDate(parsed)
            }
        } else {
            setCurrentDate(defaultDate)
        }
    }, [selectedDate, lang])

    // Function to notify the parent component of date changes
    const notifyChange = (newValue) => {
        setSelectedDate(newValue)
        if (onChange) {
            // Create a synthetic event to mimic the onChange event
            const syntheticEvent = {
                target: {
                    value: newValue
                },
                currentTarget: {
                    value: newValue
                }
            }
            onChange(syntheticEvent)
        }
    }
    // Function to handle date selection
    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        const formattedDate = formatDate(newDate, lang)
        notifyChange(formattedDate)
        setIsOpen(false)
    }

    // Function to go to the previous month
    // Check if the previous month is within the minDate range
    const goToPreviousMonth = () => {
        const prev = new Date(currentDate)
        prev.setMonth(prev.getMonth() - 1)
        if (!minDate || prev >= new Date(minDate.getFullYear(), minDate.getMonth(), 1)) {
            setCurrentDate(prev)
        }
    }

    // Function to go to the next month
    // Check if the next month is within the maxDate range
    const goToNextMonth = () => {
        const next = new Date(currentDate)
        next.setMonth(next.getMonth() + 1)
        if (!maxDate || next <= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)) {
            setCurrentDate(next)
        }
    }

    // Get the number of days in the current month and the first day of the month
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
    const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())


    // Create an array of null values for the days before the first day of the month
    const daysArray = Array(firstDayOfMonth).fill(null)

    //push the days in the month 
    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(day)
    }


    const months = t("months", { returnObjects: true })
    const weekdays = t("weekdays", { returnObjects: true })
    return (
        <div className="relative flex date-picker-container">
            <div className="date-picker-div-input">
                <input
                    {...props}
                    type="text"
                    value={selectedDate}
                    onClick={toggleCalendar}
                    onChange={(e) => {
                        const formatted = formatInputDate(e.target.value, lang)
                        notifyChange(formatted)
                    }}
                    className="border rounded-lg bg-white p-2 w-63 cursor-pointer"
                    placeholder={t("placeholder")}
                    required={required}
                />

                {isOpen && (
                    <div className="date-picker-calendar absolute mt-2 w-64 bg-white border shadow-lg py-4 px-2 rounded-lg z-20">
                        <CalendarHeader
                            currentMonth={currentDate.getMonth()}
                            currentYear={currentDate.getFullYear()}
                            months={months}
                            goToPreviousMonth={goToPreviousMonth}
                            goToNextMonth={goToNextMonth}
                            onMonthChange={e => {
                                const newDate = new Date(currentDate)
                                newDate.setMonth(Number(e.target.value))
                                setCurrentDate(newDate)
                            }}
                            onYearChange={e => {
                                const newDate = new Date(currentDate)
                                newDate.setFullYear(Number(e.target.value))
                                setCurrentDate(newDate)
                            }}
                            setCurrentDate={setCurrentDate}
                            t={t}
                        />
                        <Weekdays weekdays={weekdays} />
                        <CalendarGrid
                            daysArray={daysArray}
                            handleDateClick={handleDateClick}
                            currentDate={currentDate}
                            selectedDate={selectedDate}
                            minDate={minDate}
                            maxDate={maxDate}
                            lang={lang}
                        />
                    </div>
                )}
            </div>
        </div >
    )
}
