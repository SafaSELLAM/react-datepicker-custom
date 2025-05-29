export const MonthSelector = ({ currentMonth, onChange, months }) => {
    return (
        <select
            value={currentMonth}
            onChange={onChange}
            className="border rounded px-2 py-1 text-sm"
        >
            {months.map((month, index) => (
                <option key={index} value={index}>
                    {month}
                </option>
            ))}
        </select>
    )
}