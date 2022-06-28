import * as React from "react";
import { Controller } from "react-hook-form";
import {
  Box,
  InputLabel,
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const MultipleSelectChip = (props) => {
  const handleChange = (field, event) => {
    const {
      target: { value },
    } = event;
    field.onChange(value);
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ field }) => (
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="tags-label">Tags</InputLabel>
          <Select
            labelId="tags-label"
            id="tag"
            label="タグ"
            defaultValue={[]}
            multiple
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            onChange={(event) => handleChange(field, event)}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {props.tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
