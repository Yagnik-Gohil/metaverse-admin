import React, { useState } from "react";

type EditableJsonProps = {
  label: string;
  value: any[];
  onChange: (updatedValue: any[]) => void;
};

const EditableJsonArray: React.FC<EditableJsonProps> = ({
  value,
  onChange,
}) => {
  const [textValue, setTextValue] = useState(() =>
    JSON.stringify(value, null, 2)
  );
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setTextValue(inputValue);

    try {
      const parsedValue = JSON.parse(inputValue);

      if (!Array.isArray(parsedValue)) {
        throw new Error("Input must be a JSON array.");
      }

      setError(null);
      onChange(parsedValue);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="p-2 border rounded w-full h-40 font-mono text-sm bg-gray-50 focus:outline-none focus:ring focus:ring-blue-300"
        value={textValue}
        onChange={handleChange}
        placeholder="Enter a JSON array"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default EditableJsonArray;
