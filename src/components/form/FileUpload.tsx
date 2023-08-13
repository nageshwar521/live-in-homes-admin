import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Box,
  CardMedia,
  Container,
  FormControl,
  Input,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { noop } from "lodash";
import FieldWrapper from "./FieldWrapper";
import {
  useFormContext,
  UseControllerReturn,
  useController,
  Controller,
} from "react-hook-form";

interface FileUploadProps {
  name: string;
  placeholder?: string;
  label?: string;
  fieldWrapperClass?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  placeholder,
  name,
  label,
  fieldWrapperClass = "",
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name,
    control,
  });

  console.log(controller, "controller.field.value");

  return (
    <FieldWrapper className={fieldWrapperClass}>
      <FormControl fullWidth>
        <Box display={"flex"} flexDirection={"row"}>
          <Box display={"flex"} flex={1}>
            <FormControl>
              {controller.field.value && (
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={imageUrl || controller.field.value}
                />
              )}
            </FormControl>
          </Box>
          <Box display={"flex"} flex={3}>
            <FormControl>
              <Controller
                control={control}
                name={"logoUrl"}
                render={({ field: { value, onChange, ...field } }: any) => {
                  return (
                    <TextField
                      {...field}
                      label={label}
                      placeholder={placeholder}
                      variant="outlined"
                      value={value?.fileName}
                      onChange={(event: any) => {
                        console.log(event.target.files[0]);
                        const reader = new FileReader();
                        reader.onload = (result: any) => {
                          setImageUrl(result.target.result);
                        };
                        reader.readAsDataURL(event.target.files[0]);
                        onChange(event.target.files[0]);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{ accept: "image/*" }}
                      type="file"
                      hidden
                      id="logoUrl"
                    />
                  );
                }}
              />
            </FormControl>
          </Box>
        </Box>
      </FormControl>
    </FieldWrapper>
  );
};

export default FileUpload;
