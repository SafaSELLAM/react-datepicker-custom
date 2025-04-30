import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const DatePicker = ({ lang = "en" }) => {
    const { i18n, t } = useTranslation();

    const [selectedDate, setSelectedDate] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    //update language
    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang, i18n])

    const toggleCalendar = () => {
        setIsOpen(!isOpen);
    }
    useEffect(() => {
        const defaultDate = new Date()
        if (selectedDate) {
            const parts = selectedDate.split("/")

            let day, month, year

            if (lang === "fr" && parts.length === 3) {
                [day, month, year] = parts
            } else if (lang === "en" && parts.length === 3) {
                [month, day, year] = parts
            }

            if (day && month && year) {
                const dateObj = new Date(year, parseInt(month) - 1, parseInt(day));
                if (!isNaN(dateObj)) {
                    setCurrentDate(dateObj)
                }
            }
        } else {
            setCurrentDate(defaultDate)
        }
    }, [selectedDate, lang])

    //formate Date
    const formatDate = (date) => {
        return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US").format(date)
    }

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        setSelectedDate(formatDate(newDate))
        setIsOpen(false);
    };

    const formatInputDate = (value) => {

        const numbers = value.replace(/\D/g, "");

        if (numbers.length <= 2) return numbers;
        if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
        return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;

    };


    // create date with the first day of the next month, day = 0 => last day of the current month 
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    //return the day of the first day of the current month 
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const goToPreviousMonth = () => {
        const prev = new Date(currentDate);
        prev.setMonth(prev.getMonth() - 1);
        setCurrentDate(prev);
    };

    const goToNextMonth = () => {
        const next = new Date(currentDate);
        next.setMonth(next.getMonth() + 1);
        setCurrentDate(next);
    };

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    //const daysArray = [];
    // add empty spots
    /*for (let i = 0; i < firstDayOfMonth; i++) {
        daysArray.push(null);
    }*/
    const daysArray = Array(firstDayOfMonth).fill(null);

    //push the days in the month 
    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(day);
    }


    const isSameDay = (date1, date2) => {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen">
            <div>
                <input
                    type="text"
                    value={selectedDate}
                    onClick={toggleCalendar}
                    onChange={(e) => {
                        const formatted = formatInputDate(e.target.value, lang);
                        setSelectedDate(formatted)
                    }}
                    className="border rounded-lg bg-white p-2 w-63 cursor-pointer"
                    placeholder={t("placeholder")}
                />

                {isOpen && (
                    <div className="absolute mt-2 w-64 bg-white border shadow-lg p-4 rounded-lg z-20">

                        <div className="flex justify-between items-center mb-2">

                            <button onClick={goToPreviousMonth} className="text-gray-500 hover:text-black cursor-pointer">&lt;</button>
                            <div className="font-bold">
                                {t("months", { returnObjects: true })[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </div>
                            <div className="text-right  items-center ">
                                <button
                                    onClick={() => setCurrentDate(new Date())}
                                    className="text-blue-600 text-sm  cursor-pointer"
                                >
                                    {t("today")}
                                </button>
                            </div>
                            <button onClick={goToNextMonth} className="text-gray-500 hover:text-black cursor-pointer">&gt;</button>
                        </div>



                        <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-gray-600">
                            {t("weekdays", { returnObjects: true }).map((day, idx) => (
                                <div key={idx}>{day}</div>
                            ))}
                        </div>


                        <div className="grid grid-cols-7 gap-1 text-center mt-2">
                            {daysArray.map((day, index) => {
                                const dateToCompare = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                                const today = new Date()
                                const selected = selectedDate ? new Date(currentDate) : null

                                const isSelected =
                                    selectedDate &&
                                    isSameDay(dateToCompare, selected)

                                const isToday =
                                    !selectedDate &&
                                    isSameDay(dateToCompare, today)

                                const dayClasses = `p-2 w-8 h-8 flex items-center justify-center rounded-full
                            ${day ? "cursor-pointer" : ""}
                            ${isSelected || isToday ? "bg-blue-500 text-white" : ""}
                            hover:bg-blue-400 hover:text-white
                            `;

                                return (
                                    <div
                                        key={index}
                                        className={dayClasses}
                                        onClick={() => day && handleDateClick(day)}
                                    >
                                        {day}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};
