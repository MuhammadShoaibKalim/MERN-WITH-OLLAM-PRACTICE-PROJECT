import React from 'react';
import SymptomForm from './components/SymptomForm';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">🧠 AI Health Assistant</h1>
      <SymptomForm />
    </div>
  );
}
