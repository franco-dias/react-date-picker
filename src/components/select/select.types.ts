import { ReactNode } from "react";

export interface Option<TOptionData = unknown> {
  label: string;
  value: string | number;
  data?: TOptionData;
}

export interface SelectProps<TOptionData> {
  options: Option<TOptionData>[];
  initialValue: string | number;
  placeholder?: string;
  renderOption?: (option: Option<TOptionData>) => ReactNode;
}
