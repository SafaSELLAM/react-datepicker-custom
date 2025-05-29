export const YearSelector = ({ currentYear, onChange }) => {
    return (
        <select
            value={currentYear}
            onChange={onChange}
            className="border rounded px-2 py-1 text-sm"
        >
            {Array.from({ length: 200 }, (_, i) => {
                const year = new Date().getFullYear() - 100 + i
                return (
                    <option key={year} value={year}>
                        {year}
                    </option>
                )
            })}
        </select>
    )
}