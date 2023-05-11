import React, { useEffect, useMemo, useRef, useState } from 'react';
import StyledTextBox from '../StyledTextBox';
import DropDownList, { Kind } from './DropDownList';
import Backdrop from './Backdrop';
import DropDownContainer from './DropDownContainer';
import DropDownListItem from './DropDownListItem';
import Spinner from '../Spinner';

export interface DropDownItem {
  name: string;
  value: string;
  data: any;
}

export interface DropDownProps {
  kind: Kind;
  items: DropDownItem[];
  selectedItem: DropDownItem | null;
  loading?: boolean;
  placeholder?: string;
  width?: string;
  readOnly?: boolean;
  className?: string;
  disabled?: boolean;
  onChange?: (item: DropDownItem) => void;
  onInput: (value: string) => void;
  inputValue?: string;
}

export default function DropDown(props: DropDownProps) {
  const [showList, setShowList] = useState(false);
  const [selIndex, setSelIndex] = useState(-1);
  const ddbutton = useRef('searchDropdown');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { items, loading, inputValue } = props;

  const showSpinner = useMemo(
    () => <Spinner show={!!loading} inContainer={true} />,
    [loading]
  );

  const onSelectValue = (e: React.MouseEvent) => {
    if (!(e.target instanceof HTMLLIElement) || !e.target.dataset.name) {
      return;
    }

    selectItem({
      name: e.target.dataset.name,
      value: e.target.dataset.value || '',
      data: e.target.dataset.data || null,
    });
  };

  const selectItem = (item: DropDownItem | null) => {
    setShowList(false);
    dropdownRef.current?.classList.remove('dropdown-focused');
    if (item) {
      props.onChange && props.onChange(item);
    }
  };

  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      if (element && !dropdownRef.current?.contains(element)) {
        selectItem(null);
      }
    };

    document.addEventListener('mousedown', onOutsideClick);
    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!showList && inputValue !== items[selIndex]?.name) {
      const foundItem = props.items.find((item) => item.name === inputValue);
      selectItem(
        foundItem || props.selectedItem || { name: '', value: '', data: null }
      );
    }
  }, [showList, props.selectedItem]);

  useEffect(() => {
    const selectedItem =
      dropdownRef.current?.getElementsByClassName('list-item-selected')[0];
    selectedItem?.scrollIntoView({ block: 'nearest' });
  }, [selIndex]);

  const focusDropDown = (e: React.FocusEvent<HTMLInputElement>) => {
    props.onInput('');
    setShowList(true);
    !props.readOnly && e.target.select();
    dropdownRef.current?.classList.add('dropdown-focused');
  };

  const buttonHandler = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!showList) setShowList(true);
        setSelIndex(Math.min(selIndex + 1, items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelIndex(Math.max(selIndex - 1, 0));
        break;
      case 'Enter':
        if (!showList) setShowList(true);
        if (items[selIndex]) {
          selectItem({
            name: items[selIndex]?.name,
            value: items[selIndex]?.value,
            data: items[selIndex]?.data,
          });
        }
        break;
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelIndex(-1);
    setShowList(true);
    props.onInput(e.target.value);
  };

  return (
    <>
      {showList && <Backdrop />}
      <DropDownContainer
        width={props.width || '7em'}
        className={props.className}
        ref={dropdownRef}
        data-isdisabled={props.disabled}
      >
        <StyledTextBox
          autoComplete="off"
          readOnly={!!props.readOnly}
          id={ddbutton.current}
          placeholder={props.placeholder}
          value={inputValue}
          onChange={changeHandler}
          onFocus={focusDropDown}
          onKeyDown={buttonHandler}
          onBlur={(e) => (showList ? (e.target.placeholder = '') : null)}
          disabled={props.disabled}
        />
        <div
          style={{
            right: '10px',
            width: '2em',
            height: '2em',
          }}
        >
          {showSpinner}
        </div>
        {showList && items.length > 0 && (
          <DropDownList onClick={onSelectValue} kind={props.kind}>
            {items.map((item, index) => (
              <DropDownListItem
                key={item.name + index}
                data-name={item.name}
                data-value={item.value}
                className={`${index === selIndex ? 'list-item-selected' : ''}`}
              >
                {item.name}
              </DropDownListItem>
            ))}
          </DropDownList>
        )}
      </DropDownContainer>
    </>
  );
}
