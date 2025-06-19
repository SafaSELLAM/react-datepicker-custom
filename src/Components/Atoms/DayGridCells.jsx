export const DayGridCells = ({ day, isDisabled, isSelected, isToday, onClick, index }) => {
    let dayClasses = "p-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 "
    //* Default styles for the day cell */
    if (!day) {
        dayClasses += "cursor-default"
        return (
            <div key={index} className={dayClasses}>
                {day}
            </div>
        )
    }
    // Disabled days to appear in gray and not clickable
    if (isDisabled) {
        dayClasses += "text-gray-400 cursor-not-allowed opacity-50"
    }
    else if (isSelected) {
        dayClasses += "bg-blue-500 text-white cursor-pointer font-semibold ring-3 ring-blue-200"
    }
    else if (isToday) {
        dayClasses += "bg-blue-300 text-white cursor-pointer hover:bg-blue-600"
    }
    else {
        dayClasses += "cursor-pointer hover:bg-blue-400 hover:text-white"
    }

    return (
        <div
            key={index}
            className={dayClasses}
            onClick={() => !isDisabled && day && onClick(day)}
        >
            {day}
        </div>
    )
}