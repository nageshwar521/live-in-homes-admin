import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
} from "@mui/material";
import { SelectInputOption } from "./SelectInput";
import { get, isEmpty, noop } from "lodash";

interface ExtendedFilterDropdownProps {
  options: any[];
  onChange: (event: SelectChangeEvent<any>, child: React.ReactNode) => void;
  value: any;
  label: string;
  placeholder?: string;
  onClearFilter?: (option: any) => void;
}

const FilterDropdown: React.FC<ExtendedFilterDropdownProps> = ({
  label = "",
  placeholder = "",
  value = "",
  options = [],
  onChange = noop,
  onClearFilter = noop,
}) => {
  const valueOption =
    (value &&
      options.find((option: any) => {
        return option.value === value;
      })) ||
    {};
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Box marginRight={"10px"}>
        <FormControl style={{ width: "150px" }}>
          <InputLabel>{label}</InputLabel>
          <Select
            variant="outlined"
            label={label}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          >
            {options.map((option: SelectInputOption) => (
              <MenuItem key={option.value} value={option.value}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {!isEmpty(valueOption) && (
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <InputLabel sx={{ marginRight: "5px" }}>Applied Filters: </InputLabel>
          <Chip
            label={get(valueOption, "data.name")}
            onDelete={onClearFilter.bind(null, valueOption)}
          />
        </Box>
      )}
    </Box>
  );
};

export default FilterDropdown;
