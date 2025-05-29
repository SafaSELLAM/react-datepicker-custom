export const Weekdays = ({ weekdays }) => {
    return (
        <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-gray-600">
            {weekdays.map((day, idx) => (
                <div key={idx}>{day}</div>
            ))}
        </div>
    )
}