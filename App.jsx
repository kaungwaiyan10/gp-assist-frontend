
import { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    patientId: '',
    history: '',
    physicalExam: '',
    investigations: '',
    imaging: '',
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://your-backend-url.onrender.com/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    setResult(data.diagnosis);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1>GP Assist AI</h1>
      <form onSubmit={handleSubmit}>
        <label>Patient ID:</label>
        <input type="text" name="patientId" value={form.patientId} onChange={handleChange} required />
        <label>Disease History:</label>
        <textarea name="history" value={form.history} onChange={handleChange} rows={4} />
        <label>Physical Exam:</label>
        <textarea name="physicalExam" value={form.physicalExam} onChange={handleChange} rows={4} />
        <label>Investigations:</label>
        <textarea name="investigations" value={form.investigations} onChange={handleChange} rows={4} />
        <label>Imaging:</label>
        <textarea name="imaging" value={form.imaging} onChange={handleChange} rows={4} />
        <button type="submit">Submit</button>
      </form>
      {result && (
        <div style={{ marginTop: "30px", whiteSpace: "pre-wrap", background: "#f8f8f8", padding: "10px" }}>
          <h3>AI Result:</h3>
          {result}
        </div>
      )}
    </div>
  );
}

export default App;
