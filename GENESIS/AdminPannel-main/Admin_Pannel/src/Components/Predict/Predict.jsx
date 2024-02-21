import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataTable() {
  const [data, setData] = useState([]);
  const [numDays, setNumDays] = useState(10); // Default value is 10

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.23.50:5000/?num_days=${numDays}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [numDays]);

  const handleSelectChange = (event) => {
    setNumDays(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h2>Waste Forcasted Data Table</h2>
      <div>
        <label htmlFor="numDays">Select Number of  Days:</label>
        <select id="numDays" value={numDays} onChange={handleSelectChange}>
          {[...Array(30).keys()].map((day) => (
            <option key={day + 1} value={day + 1}>{day + 1}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([day, value]) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
