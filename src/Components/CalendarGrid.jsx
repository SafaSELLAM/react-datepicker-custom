import { isDateInRange, isSameDay } from "../dateFunctions"
import { DayGridCells } from "./Atoms/DayGridCells.jsx"
import { parseDateFromString } from "../dateFunctions"
export const CalendarGrid = ({ daysArray, handleDateClick, currentDate, selectedDate, minDate, maxDate, lang }) => {
    const validLang = (lang === 'fr' || lang === 'en') ? lang : 'fr'

    const today = new Date()

    let selected = null
    if (selectedDate) {
        try {
            selected = parseDateFromString(selectedDate, validLang)

        } catch (error) {
            console.warn('CalendarGrid: Error parsing selectedDate:', error)
        }
    }

    return (
        <div className="grid grid-cols-7 gap-1 text-center mt-2">

            {daysArray.map((day, index) => {
                let dateToCompare = null
                let isDisabled = true
                let isSelected = false
                let isToday = false

                try {
                    // create a date object for the current day
                    dateToCompare = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

                    // check if the date is valid
                    if (isNaN(dateToCompare.getTime())) {
                        console.warn(`CalendarGrid: Invalid date created for day ${day}`)
                        isDisabled = true
                    } else {
                        //check if the date is in range
                        isDisabled = !isDateInRange(dateToCompare, minDate, maxDate)

                        //check if the date is selected
                        if (selected && !isDisabled) {
                            isSelected = isSameDay(dateToCompare, selected)
                        }

                        //check if the date is today
                        if (!isDisabled && !isSelected) {
                            isToday = isSameDay(dateToCompare, today)
                        }
                    }
                } catch (error) {
                    console.error(`CalendarGrid: Error processing day ${day}:`, error)
                    isDisabled = true
                }
                // console.log(today)




                return (
                    <DayGridCells
                        key={index}
                        day={day}
                        isDisabled={isDisabled}
                        isSelected={isSelected}
                        isToday={isToday}
                        onClick={() => !isDisabled && day && handleDateClick(day)}
                    />
                )
            })}
        </div>
    )
}