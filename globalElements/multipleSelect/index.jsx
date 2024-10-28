import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

//    labeltext={"Sütun ismi"}
//             placeholdertext="Arama .."
//             setvalue={setFilteringOption}
//             data={activeCols.map((elem) => {
//               return {
//                 value: elem.id,
//                 name: elem.columnName,
//               };
//             })}

export default function MultipleSelectComponent({
  labeltext,
  placeholdertext,
  data,
  setvalue,
}) {
  const [selectValues, setSelectValues] = useState([]);

  const handleChange = (e) => {
    setSelectValues(e.target.value);
    setvalue(e.target.value);
  };

  useEffect(() => {
    const initialValues = [];

    data.forEach((elem) => {
      if (elem.selected) {
        initialValues.push(elem.value);
      }
    });

    setSelectValues(initialValues);
  }, []);

  return (
    <div className="   w-full ">
      <FormControl sx={{ my: "2px", maxWidth: 350, width: 1 }}>
        <InputLabel id="demo-simple-select-helper-label">
          {labeltext}
        </InputLabel>
        <Select
          label={labeltext}
          multiple
          value={selectValues}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }

            let nameArr = [];
            selected.forEach((elem) => {
              nameArr.push(data.find((item) => item.value == elem).name);
            });
            return nameArr.join(", ");
          }}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>{placeholdertext}</em>
          </MenuItem>
          {data.map((elem, index) => (
            <MenuItem key={elem.value} value={elem.value}>
              <Checkbox checked={selectValues.includes(elem.value)} />
              {elem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
