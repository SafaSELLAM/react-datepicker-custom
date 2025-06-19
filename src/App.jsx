import './style.css'
import "./i18n.js"
import { DatePicker } from './Components/DatePicker.jsx'

function App() {

  return (
    <>
      <div>
        <DatePicker
          lang="en"
          minDate={new Date(2023, 0, 1)}
          maxDate={new Date(2025, 12, 31)}
        />
      </div >
    </>

  )
}

export default App
