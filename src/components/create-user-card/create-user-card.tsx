import { useState } from "react";
import { X } from "lucide-react";
import Input from "../form/input";
import { Button } from "../form/button";

interface UserCardProps {
  onClose: () => void;
}

export default function CreateUserCard({ onClose }: UserCardProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-950 rounded-lg p-6 w-full border border-zinc-700 max-w-md relative">
        <button
          onClick={onClose}
          className="absolute text-white cursor-pointer top-4 right-4 hover:text-zinc-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Create New User</h2>

        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
          />

          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end">
            <Button
              text="Cancel"
              onClick={onClose}
              variant="secondary"
              className="mr-2"
              type="button"
            />
            <Button text="Create User" type="submit" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
