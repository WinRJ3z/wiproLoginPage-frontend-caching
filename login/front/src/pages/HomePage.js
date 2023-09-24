import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { openDB } from 'idb';

const functionKey = 'hasFunctionRun';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [alpineVersions, setAlpineVersions] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [indexedDBVersions, setIndexedDBVersions] = useState([]);
  const [showIndexedDBData, setShowIndexedDBData] = useState(false);
  const [indexedDBBusiness, setIndexedDBBusiness] = useState([]);
  const [showIndexedDBBusinessData, setShowIndexedDBBusinessData] = useState(false);
  const [businessData, setBusinessData] = useState([]); // Define business data state
  const [error, setError] = useState(null); // Define an error state


  const getBusinessData = async () => {
  try {
    const hasFunctionRun = localStorage.getItem(functionKey);

    if (!hasFunctionRun) {
      const response = await axios.get('http://127.0.0.1:8000/api/business/', {
        headers: {
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
      });

      if (response.status === 200) {
        const data = response.data;
        // Call the function to store data in IndexedDB
        storeBusinessDataInDB(data);

        // Set the flag to indicate that the function has run
        localStorage.setItem(functionKey, 'true'); // Use a string value here

        setBusinessData(data);
        setError(null); // Clear any previous error
      } else if (response.statusText === 'Unauthorized') {
        logoutUser();
      }

    }
  } catch (error) {
    console.error(error);
  }
};




  const getAlpineVersions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/alpine-versions/', {
        headers: {
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setAlpineVersions(data);
        const hasFunctionRun = localStorage.getItem(functionKey);
        if (!hasFunctionRun) {
          localStorage.setItem(functionKey, 'true'); // Use a string value here
          console.log("bro1");
          storeDataInDB(data);
        }
      } else if (response.statusText === 'Unauthorized') {
        logoutUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

 const storeBusinessDataInDB = (data) => {
  const request = indexedDB.open('Business', 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const objectStoreBusiness = db.createObjectStore('BusinessData', { keyPath: 'id', autoIncrement: true });
    objectStoreBusiness.createIndex('IndustryName', 'IndustryName', { unique: false });
    objectStoreBusiness.createIndex('IndustryCode', 'IndustryCode', { unique: false });
    objectStoreBusiness.createIndex('FilledJobs', 'FilledJobs', { unique: false });
    objectStoreBusiness.createIndex('FilledJobsRevised', 'FilledJobsRevised', { unique: false });
    objectStoreBusiness.createIndex('FilledJobsDiff', 'FilledJobsDiff', { unique: false });
    objectStoreBusiness.createIndex('FilledJobs_Diff', 'FilledJobs_Diff', { unique: false });
    objectStoreBusiness.createIndex('TotalEarnings', 'TotalEarnings', { unique: false });
    objectStoreBusiness.createIndex('TotalEarningsRevised', 'TotalEarningsRevised', { unique: false });
    objectStoreBusiness.createIndex('EarningsDiff', 'EarningsDiff', { unique: false });
    objectStoreBusiness.createIndex('Earnings_Diff', 'Earnings_Diff', { unique: false });
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    // Open the transaction and objectStore here, outside of onupgradeneeded
    const transaction = db.transaction('BusinessData', 'readwrite');
    const objectStore = transaction.objectStore('BusinessData');

    data.forEach((item) => {
      let businessData = {
        'IndustryName': item.industry_name,
        'Ser_Ref': item.ser_ref,
        'IndustryCode': item.industry_code,
        'FilledJobs': item.filledjobs,
        'FilledJobsRevised': item.filledjobsrevised,
        'FilledJobsDiff': item.filledjobsdiff,
        'FilledJobs_Diff': item.filledjobs_diff,
        'TotalEarnings': item.total_earnings,
        'TotalEarningsRevised': item.totalearningsrevised,
        'EarningsDiff': item.earningsdiff,
        'Earnings_Diff': item.earnings_diff,
        // Add other fields from the Business model
      };
      objectStore.add(businessData);
    });

    transaction.oncomplete = () => {
      console.log('Business data stored successfully.');
      db.close();
    };

    transaction.onerror = (event) => {
      console.error('Error storing business data:', event.target.error);
    };
  };

  request.onerror = (event) => {
    console.error('Error opening IndexedDB:', event.target.error);
  };
};

// ...

const storeDataInDB = (data) => {
  const request = indexedDB.open('Alpine', 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const objectStoreAlpine = db.createObjectStore('TableData', { keyPath: 'id', autoIncrement: true });
    objectStoreAlpine.createIndex('Version', 'Version', { unique: false });
    objectStoreAlpine.createIndex('Released', 'Released', { unique: false });
    objectStoreAlpine.createIndex('EOS', 'EOS', { unique: false });
    objectStoreAlpine.createIndex('Latest', 'Latest', { unique: false });
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    // Open the transaction and objectStore here, outside of onupgradeneeded
    const transaction = db.transaction('TableData', 'readwrite');
    const objectStore = transaction.objectStore('TableData');

    data.forEach((item) => {
      let userData = { 'Version': item.version, 'Released': item.release_date, 'EOS': item.end_of_life_date, 'Latest': item.latest };
      objectStore.add(userData);
    });

    transaction.oncomplete = () => {
      console.log('Data stored successfully.');
      db.close();
    };

    transaction.onerror = (event) => {
      console.error('Error storing data:', event.target.error);
    };
  };

  request.onerror = (event) => {
    console.error('Error opening IndexedDB:', event.target.error);
  };
};

// ...




  const retrieveBusinessDataFromIndexedDB = () => {
    openDB('Business', 1)
      .then(db => {
        const transaction = db.transaction('BusinessData', 'readonly');
        const objectStore = transaction.objectStore('BusinessData');
        return objectStore.getAll();
      })
      .then(data => {
        setIndexedDBBusiness(data);
        setShowIndexedDBBusinessData(true); // Update the state with the retrieved data
      })
      .catch(error => {
        console.error('Error retrieving Business data from IndexedDB:', error);
      });
  };

  const retrieveAlpineVersionsFromIndexedDB = () => {
    openDB('Alpine', 1)
      .then(db => {
        const transaction = db.transaction('TableData', 'readonly');
        const objectStore1 = transaction.objectStore('TableData');
        return objectStore1.getAll();
      })
      .then(data => {
        setIndexedDBVersions(data);
        setShowIndexedDBData(true); // Update the state with the retrieved data
      })
      .catch(error => {
        console.error('Error retrieving data from IndexedDB:', error);
      });
  };

  useEffect(() => {
    getAlpineVersions();
    getBusinessData();
  }, [authTokens.access]);

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>

      <button onClick={retrieveAlpineVersionsFromIndexedDB}>
        Read Data from IndexedDB
      </button>

      <button onClick={retrieveBusinessDataFromIndexedDB}>
        Read Business Data from IndexedDB
      </button>


      <h2>Alpine Versions:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Version</th>
            <th>Release Date</th>
            <th>End of Life Date</th>
            <th>Latest</th>
          </tr>
        </thead>
        <tbody>
          {showIndexedDBData
            ? indexedDBVersions.map((version) => (
              <tr key={version.id}>
                <td>{version.Version}</td>
                <td>{version.Released}</td>
                <td>{version.EOS}</td>
                <td>{version.Latest}</td>
              </tr>
            ))
            : alpineVersions.map((version) => (
              <tr key={version.id}>
                <td>{version.version}</td>
                <td>{version.release_date}</td>
                <td>{version.end_of_life_date}</td>
                <td>{version.latest}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h2>Business Data:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Industry Name</th>
            <th>Ser Ref</th>
            <th>Industry Code</th>
            <th>Filled Jobs</th>
            <th>Filled Jobs Revised</th>
            <th>Filled Jobs Diff</th>
            <th>Filled Jobs - Diff</th>
            <th>Total Earnings</th>
            <th>Total Earnings Revised</th>
            <th>Earnings Diff</th>
            <th>Earnings - Diff</th>
          </tr>
        </thead>
        <tbody>
          {showIndexedDBBusinessData
            ? indexedDBBusiness.map((dataItem) => (
              <tr key={dataItem.id}>
                <td>{dataItem.IndustryName}</td>
                <td>{dataItem.Ser_Ref}</td>
                <td>{dataItem.IndustryCode}</td>
                <td>{dataItem.FilledJobs}</td>
                <td>{dataItem.FilledJobsRevised}</td>
                <td>{dataItem.FilledJobsDiff}</td>
                <td>{dataItem.FilledJobs_Diff}</td>
                <td>{dataItem.TotalEarnings}</td>
                <td>{dataItem.TotalEarningsRevised}</td>
                <td>{dataItem.EarningsDiff}</td>
                <td>{dataItem.Earnings_Diff}</td>
              </tr>
            ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
