import { useState } from "react";

export default function InputNumber({
  className = "",
  children,
  initValue,
  min,
  max,
  change,
  ...props
}) {
  const [value, setValue] = useState(initValue);

  const increment = () => {
    if (value < parseInt(max)) {
      setValue((prev) => (prev += 1));
      change(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      setValue((prev) => (prev -= 1));
      change(value - 1);
    }
  };

  const handleValue = (currentValue) => {
    const formatValue = parseInt(currentValue.target.value);
    if (formatValue >= min) {
      setValue(formatValue);
      change(formatValue);
    } else {
      setValue("");
      change("");
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ` + className}>
      <div className="flex justify-center border">
        <button
          type="button"
          onClick={decrement}
          className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-800 focus:outline-gray-800 text-white"
        >
          -
        </button>
        <input
          className="border-none bg-white outline-none focus:ring-0  text-center"
          type="number"
          value={value}
          onChange={handleValue}
        />
        <button
          type="button"
          onClick={increment}
          className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-800 focus:outline-gray-800 text-white"
        >
          +
        </button>
      </div>
      {children}
    </div>
  );
}
