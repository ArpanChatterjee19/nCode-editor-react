import React from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange, defaultLanguage }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      defaultValue={defaultLanguage || languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
      theme={theme => ({
        ...theme,
        colors: {
            ...theme,
            whiteCustom: '#fafafa',  // Placeholder color
        },
    })}
    />
  );
};

export default LanguagesDropdown;