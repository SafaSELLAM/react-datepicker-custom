export const DayGridCells = ({ day, isDisabled, isSelected, isToday, onClick, index }) => {
    const dayClasses = `p-2 w-8 h-8 flex items-center justify-center rounded-full
        ${day ? "cursor-pointer" : ""}
        ${isSelected || isToday ? "bg-blue-500 text-white" : ""}
        ${isDisabled ? "text-gray-400 cursor-not-allowed opacity-50" : "hover:bg-blue-400 hover:text-white"}
    `

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