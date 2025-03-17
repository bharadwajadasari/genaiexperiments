import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import TaskifyIcon from '../components/TaskifyIcon';
import '../App.css';

const ExcelViewer = () => {
  const [excelData, setExcelData] = useState(null);
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array', cellDates: true, cellNF: true, cellFormula: true });
          
          // Get all sheet names
          const sheetNames = workbook.SheetNames;
          setSheets(sheetNames);
          
          // Set first sheet as default
          if (sheetNames.length > 0) {
            setSelectedSheet(sheetNames[0]);
            processSheet(workbook.Sheets[sheetNames[0]], sheetNames[0]);
          }
        } catch (err) {
          setError('Error processing Excel file: ' + err.message);
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = () => {
        setError('Error reading file');
        setIsLoading(false);
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      setError('Error uploading file: ' + err.message);
      setIsLoading(false);
    }
  };

  const processSheet = (worksheet, sheetName) => {
    // Get the range of the worksheet
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    
    // Process each cell
    const data = [];
    for (let R = range.s.r; R <= range.e.r; ++R) {
      const row = [];
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        const cell = worksheet[cell_ref];
        
        if (!cell) {
          row.push('');
          continue;
        }

        // Get cell value and formula
        const cellData = {
          value: cell.v,
          formula: cell.f,
          type: cell.t,
          format: cell.z
        };

        // Handle different cell types
        switch (cell.t) {
          case 'n': // Number
            cellData.displayValue = cell.v;
            break;
          case 's': // String
            cellData.displayValue = cell.v;
            break;
          case 'b': // Boolean
            cellData.displayValue = cell.v ? 'TRUE' : 'FALSE';
            break;
          case 'd': // Date
            cellData.displayValue = new Date(cell.v).toLocaleDateString();
            break;
          case 'e': // Error
            cellData.displayValue = '#ERROR!';
            break;
          default:
            cellData.displayValue = cell.v;
        }

        row.push(cellData);
      }
      data.push(row);
    }

    setExcelData({
      sheetName,
      data,
      range: {
        start: { row: range.s.r, col: range.s.c },
        end: { row: range.e.r, col: range.e.c }
      }
    });
  };

  const handleSheetChange = (sheetName) => {
    setSelectedSheet(sheetName);
    // You would need to store the workbook in state to access it here
    // For now, we'll need to reload the file to change sheets
  };

  return (
    <div className="app-container">
      <header className="header">
        <TaskifyIcon />
        <h1>Excel Viewer</h1>
      </header>
      <main className="main-content">
        <div className="excel-viewer">
          <div className="excel-controls">
            <label className="action-button">
              Upload Excel File
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
            {sheets.length > 0 && (
              <select 
                value={selectedSheet}
                onChange={(e) => handleSheetChange(e.target.value)}
                className="sheet-selector"
              >
                {sheets.map(sheet => (
                  <option key={sheet} value={sheet}>{sheet}</option>
                ))}
              </select>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}
          
          {isLoading ? (
            <div className="loading">Loading Excel file...</div>
          ) : excelData ? (
            <div className="excel-table-container">
              <table className="excel-table">
                <tbody>
                  {excelData.data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td 
                          key={`${rowIndex}-${colIndex}`}
                          className={`excel-cell ${cell.formula ? 'has-formula' : ''}`}
                          title={cell.formula ? `Formula: ${cell.formula}` : ''}
                        >
                          {cell.displayValue}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="excel-placeholder">
              Upload an Excel file to view its contents
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExcelViewer; 