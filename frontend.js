import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Select from "react-select";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [result, setResult] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const filterOptions = [
    { value: "alphabetic_data", label: "Alphabets" },
    { value: "numeric_data", label: "Numbers" }
  ];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format. Use: { \"data\": [values] }");
      }
      setErrorMsg("");

      const res = await axios.post("http://localhost:5000/bfhl", parsedData);
      setResult(res.data);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <Head>
        <title>22BCS15617</title>
      </Head>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>JSON Processor</h1>
      <p><strong>Status:</strong> Student</p>
      <p><strong>User ID:</strong> 22BCS15617</p>
      <p><strong>College Email:</strong> 22BCS156117@cuchd.in</p>
      <p><strong>College Roll Number:</strong> 22BCS15617</p>
      <textarea
        style={{ width: "100%", padding: "10px", border: "1px solid #ccc" }}
        rows="4"
        placeholder='Enter JSON: { "data": ["A", "1", "B"] }'
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button
        style={{ backgroundColor: "blue", color: "white", padding: "10px", marginTop: "10px", border: "none" }}
        onClick={handleSubmit}
      >
        Submit
      </button>
      {errorMsg && <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Select Data to Display</h2>
          <Select
            isMulti
            options={filterOptions}
            onChange={setSelectedFilters}
          />
          <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc" }}>
            {selectedFilters.map((option) => (
              <p key={option.value}>
                <strong>{option.label}: </strong>
                {result[option.value]?.join(", ")}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
