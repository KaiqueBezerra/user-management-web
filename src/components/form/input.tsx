export default function Input({
  label,
  id,
  name,
  value,
  type,
  onChange,
}: {
  label: string;
  id: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type || "text"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-zinc-900 w-full px-3 py-2 border border-zinc-700 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-zinc-400"
        required
      />
    </div>
  );
}
