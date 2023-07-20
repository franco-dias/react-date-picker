import { createPortal } from "react-dom";
import { OptionsContainer, OptionItem } from "./options-box.styles";
import { MouseEvent, ReactNode, RefObject, useRef } from "react";
import { useFixedElementPosition } from "../../../hooks/use-fixed-element-position";
import { fadeAnimation } from "../../../helpers/animations";
import { AnimatePresence } from "framer-motion";
import { useOutsideClick } from "../../../hooks/use-outside-click";
import { Option } from "../select.types";

interface OptionsBoxProps<TOptionData> {
  anchorRef: RefObject<HTMLButtonElement>;
  display: boolean;
  close: () => void;
  options: Option<TOptionData>[];
  onChange: (value: Option<TOptionData>) => void;
  renderOption?: (option: Option<TOptionData>) => ReactNode;
}

export const OptionsBox = <TOptionData,>({
  anchorRef,
  display,
  close,
  options,
  onChange,
  renderOption,
}: OptionsBoxProps<TOptionData>) => {
  const optionsRef = useRef(null);
  const { floatingElementRef, position } = useFixedElementPosition({
    anchorRef,
    marginFromAnchor: 16,
  });

  useOutsideClick({
    ref: optionsRef,
    cb: close,
    active: display,
  });

  return createPortal(
    <AnimatePresence>
      {display && (
        <div ref={floatingElementRef}>
          <OptionsContainer
            role="listbox"
            aria-expanded={display}
            ref={optionsRef}
            $position={position}
            {...fadeAnimation}
          >
            <div>
              {options.map((option) => (
                <OptionItem
                  tabIndex={0}
                  role="option"
                  key={option.value}
                  onClick={(ev: MouseEvent) => {
                    ev.stopPropagation();
                    onChange(option);
                    close();
                  }}
                >
                  {renderOption ? renderOption(option) : option.label}
                </OptionItem>
              ))}
            </div>
          </OptionsContainer>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("root") as HTMLElement
  );
};
