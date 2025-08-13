import type { Control, FieldErrors } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

import { PRIORITY_OPTIONS, DEPARTMENT_OPTIONS } from '../tickets-config';

import type { FormValues, UserOption } from './types';

interface FormInputsProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  userOptions: UserOption[];
  isLoading: boolean;
}

export const FormInputs = ({ control, errors, userOptions, isLoading }: FormInputsProps) => (
  <>
    <Controller
      name="title"
      control={control}
      rules={{
        required: 'عنوان تیکت الزامی است',
        minLength: { value: 5, message: 'عنوان باید حداقل ۵ کاراکتر باشد' },
        maxLength: { value: 100, message: 'عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد' },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          label="عنوان تیکت"
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}
          slotProps={{ htmlInput: { 'aria-required': true, 'aria-describedby': 'title-error' } }}
        />
      )}
    />

    <FormControl error={!!errors.user} sx={{ gridColumn: { xs: 'span 1', md: 'span 1' } }}>
      <InputLabel id="user-label">انتخاب کاربر</InputLabel>
      <Controller
        name="user"
        control={control}
        rules={{ required: 'انتخاب کاربر الزامی است' }}
        render={({ field }) => (
          <Select {...field} labelId="user-label" label="انتخاب کاربر" disabled={isLoading}>
            <MenuItem value="" sx={{ color: 'text.disabled' }}>
              <em>انتخاب کنید</em>
            </MenuItem>
            {userOptions.map((obj) => (
              <MenuItem key={obj.id} value={obj.id}>
                {obj.name} - {obj.mobile}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{errors.user?.message}</FormHelperText>
    </FormControl>

    <FormControl error={!!errors.department}>
      <InputLabel id="department-label">دپارتمان</InputLabel>
      <Controller
        name="department"
        control={control}
        rules={{ required: 'دپارتمان الزامی است' }}
        render={({ field }) => (
          <Select
            {...field}
            labelId="department-label"
            label="دپارتمان"
            value={field.value as number}
          >
            {DEPARTMENT_OPTIONS.map((obj) => (
              <MenuItem key={obj.value} value={obj.value as number}>
                {obj.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{errors.department?.message}</FormHelperText>
    </FormControl>

    <FormControl error={!!errors.priority}>
      <InputLabel id="priority-label">درجه اهمیت</InputLabel>
      <Controller
        name="priority"
        control={control}
        rules={{ required: 'درجه اهمیت الزامی است' }}
        render={({ field }) => (
          <Select {...field} labelId="priority-label" label="درجه اهمیت">
            {PRIORITY_OPTIONS.map((obj) => (
              <MenuItem key={obj.value} value={obj.value}>
                {obj.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{errors.priority?.message}</FormHelperText>
    </FormControl>

    <Controller
      name="tag"
      control={control}
      render={({ field }) => (
        <TextField {...field} label="تگ" error={!!errors.tag} helperText={errors.tag?.message} />
      )}
    />

    <Controller
      name="description"
      control={control}
      rules={{
        required: 'متن تیکت الزامی است',
        minLength: {
          value: 10,
          message: 'متن تیکت باید حداقل ۱۰ کاراکتر باشد',
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          label="متن تیکت"
          placeholder="یک متن وارد کنید..."
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{ gridColumn: 'span 3' }}
        />
      )}
    />
  </>
);
