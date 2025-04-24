// userside/src/components/SymptomForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SymptomForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const symptomArray = symptoms.split(',').map(s => s.trim());

    try {
      const res = await axios.post("/api/get-recommendation/recommend-tests", {
        symptoms: symptomArray
      });

      if (res.data.success) {
        setResult(res.data.recommendations);
      } else {
        setResult("AI did not return any results.");
      }
    } catch (error) {
      console.error("❌ Frontend error:", error.message);
      setResult("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border shadow rounded">
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={4}
        placeholder="Enter symptoms (e.g. fever, cough)"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Get Lab Test Recommendations"}
      </button>

      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="font-semibold">Recommendations:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SymptomForm;
