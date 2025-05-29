import { faChevronLeft, faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MonthSelector } from "./Atoms/MonthSelector"
import { YearSelector } from "./Atoms/YearSelector"
export const CalendarHeader = ({
    currentMonth,
    currentYear,
    months,
    goToPreviousMonth,
    goToNextMonth,
    onMonthChange,
    onYearChange,
    setCurrentDate,
    t,
}) => {
    return (
        <div className="flex justify-between items-center mb-2">

            <div className="flex items-center gap-2">
                <button onClick={goToPreviousMonth} className="text-gray-500 hover:text-blue-600 cursor-pointer">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <MonthSelector currentMonth={currentMonth} onChange={onMonthChange} months={months} />
                <YearSelector currentYear={currentYear} onChange={onYearChange} />
                <div className="text-right  items-center ">
                    <button
                        onClick={() => setCurrentDate(new Date())}
                        className="text-blue-600 text-sm  cursor-pointer"
                        title={t("today")}
                    >
                        <FontAwesomeIcon icon={faHome} />
                    </button>
                </div>
                <button onClick={goToNextMonth} className="text-gray-500 hover:text-blue-600 cursor-pointer">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>

            </div>
        </div>
    )
}