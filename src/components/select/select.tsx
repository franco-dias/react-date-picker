import { useCallback, useRef, useState } from "react";
import { SelectProps, Option } from "./select.types";
import { SelectContainer } from "./select.styles";
import { OptionsBox } from "./options-box/options-box";

export const Select = <TOptionData,>({
  options,
  initialValue,
  placeholder,
  renderOption,
}: SelectProps<TOptionData>) => {
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef<HTMLButtonElement>(null);
  const [value, setValue] = useState<Option<TOptionData> | null>(
    options.find((option) => option.value === initialValue) ?? null
  );

  const onContainerClick = () => {
    setShowOptions(true);
  };

  const onOptionClick = useCallback((option: Option<TOptionData>) => {
    setValue(option);
  }, []);

  console.log(showOptions);

  return (
    <SelectContainer
      ref={containerRef}
      onClick={onContainerClick}
      role="button"
      tabIndex={0}
    >
      <OptionsBox<TOptionData>
        options={options}
        display={showOptions}
        anchorRef={containerRef}
        onChange={onOptionClick}
        close={() => setShowOptions(false)}
        renderOption={renderOption}
      />
      <select
        value={value?.value}
        onClick={() => console.log("click!")}
        disabled
        aria-disabled="false"
        placeholder={placeholder}
        aria-placeholder={placeholder}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </SelectContainer>
  );
};
