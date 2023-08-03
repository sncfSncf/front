import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import dayjs from 'dayjs'
import { fr } from 'date-fns/locale'

function RangeDatePicker({ onChange }) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection])

    onChange(ranges)
  }

  return (
    <div className="filtres-gen">
      <div className="card-header">Calendrier </div>
      <DateRangePicker
        ranges={dateRange}
        onChange={handleSelect}
        dateDisplayFormat={dayjs().format('YYYY-MM-DD')}
        showDateDisplay={false}
        calendar={true}
        locale={fr}
        //maxDate={new Date()}
      />
    </div>
  )
}

export default RangeDatePicker
