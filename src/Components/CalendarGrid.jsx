import { isDateInRange, isSameDay } from "../dateFunctions"
import { DayGridCells } from "./Atoms/DayGridCells.jsx"
import { parseDateFromString } from "../dateFunctions"
export const CalendarGrid = ({ daysArray, handleDateClick, currentDate, selectedDate, minDate, maxDate, lang }) => {
    const today = new Date()
    const selected = selectedDate ? parseDateFromString(selectedDate, lang) : null



    return (
        <div className="grid grid-cols-7 gap-1 text-center mt-2">

            {daysArray.map((day, index) => {
                const dateToCompare = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                const isDisabled = (!isDateInRange(dateToCompare, minDate, maxDate) || !day)

                // Check if the date is disabled based on minDate and maxDate
                const isSelected =
                    selectedDate &&
                    isSameDay(dateToCompare, selected)


                const isToday =
                    !selectedDate &&
                    isSameDay(dateToCompare, today)

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