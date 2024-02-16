import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector() {
  const defaultOption = useMemo(() => countryList().getValue('IN'), []); // 'IN' is the ISO code for India
  const [value, setValue] = useState(defaultOption);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = selectedOption => {
    setValue(selectedOption);
  }

  return <Select options={options} value={value} onChange={changeHandler} />
}

export default CountrySelector