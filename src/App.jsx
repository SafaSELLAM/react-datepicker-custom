import './App.css'
import "./i18n.js"
import { DatePicker } from './Components/DatePicker.jsx'

function App() {

  return (
    <div className="h-screen flex justify-center">
      <DatePicker
        lang="en"
        minDate={new Date(2023, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </div>
  )
}

export default App
