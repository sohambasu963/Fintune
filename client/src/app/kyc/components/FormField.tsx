import Tooltip from "@/components/tooltip";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  handleChange: any;
  tooltip: string;
}

export default function FormField({
  label,
  name,
  value,
  handleChange,
  tooltip,
}: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-1">
        <label htmlFor={name} className="font-semibold text-gray-700">
          {label}
        </label>
        <Tooltip content={tooltip} />
      </div>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="border px-4 py-2"
        required
      />
    </div>
  );
}
