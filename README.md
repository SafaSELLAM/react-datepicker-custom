# React Datepicker Component

A reusable datepicker component built with React.

## Features

-   Easy to integrate into any React project.
-   Uses Font Awesome icons for navigation.
-   Includes internationalization (i18n) support.

## Installation

```bash
npm install @hirraeth_98/react-datepicker-custom

## Usage

```jsx

import { DatePicker } from 'react-datepicker-custom-hirraeth_98'
import 'react-datepicker-custom-hirraeth_98/dist/index.css'

function App() {
    return (
            <Datepicker
                lang="en"
                minDate={new Date(2023, 0, 1)}
                maxDate={new Date(2035, 11, 31)}
            />
    );
}

export default App;
```

## Props

| Prop        | Type     | Default    | Description                          |
|-------------|----------|------------|--------------------------------------|
| `lang`      | string   | `'en'`     | Language code ("en" or "fr")         |
| `minDate`   | Date     | `2023,0,1` | Minimum selectable date              |
| `maxDate`   | Date     |`2025,11,31`| Maximum selectable date              |



