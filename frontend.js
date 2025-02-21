import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";

export default function Home() {
  const [apiResult, setApiResult] = useState(null);
  
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const sampleInput = { data: ["A", "1", "B"] };
        const response = await axios.post("http://localhost:5000/bfhl", sampleInput);
        setApiResult(response.data);
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    
    retrieveData();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <Head>
        <title>22BCS15617</title>
      </Head>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Data Fetcher</h1>
      <p><strong>Profile:</strong> Student</p>
      <p><strong>ID:</strong> 22BCS15617</p>
      <p><strong>Email:</strong> 22BCS156117@cuchd.in</p>
      <p><strong>Roll Number:</strong> 22BCS15617</p>
      {apiResult && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Server Response:</h2>
          <pre>{JSON.stringify(apiResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

