import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Seja bem vindo</h1>
      <button
        onClick={() => setCount((count) => count + 1)}
        className="border border-white px-4 py-2 rounded-md cursor-pointer hover:bg-zinc-700"
      >
        {count}
      </button>
    </div>
  );
}

export default App;
