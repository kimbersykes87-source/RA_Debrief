import Papa from 'papaparse';

// Map rating strings to numeric values
const ratingMap = {
  'Glorious': 5,
  'Great': 4,
  'Good': 3,
  'Needs attention': 2,
  'Rough': 1
};

// Category columns (excluding Timestamp, Name, Email)
const categoryColumns = [
  'Camp Vibes & Comms',
  'Family Dinners',
  'Mezcal Bar',
  'Water & Showers',
  'Shade & Tents',
  'Bikes',
  'Art Car',
  'Radiance Hour',
  'RA Express',
  'MOOP & Recycling'
];

export async function parseCSVData() {
  try {
    const response = await fetch('/responses.csv');
    const text = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Filter out rows that are completely empty
          const validRows = results.data.filter(row => {
            return Object.values(row).some(val => val && val.trim() !== '');
          });
          
          // Process and anonymize data (exclude Timestamp, Name, Email)
          const processed = validRows.map(row => {
            const processedRow = { ...row };
            // Remove identifying columns
            delete processedRow['Timestamp'];
            delete processedRow['Name (real or playa)'];
            delete processedRow['Email'];
            return processedRow;
          });
          
          resolve(processed);
        },
        error: (error) => reject(error)
      });
    });
  } catch (error) {
    console.error('Error parsing CSV:', error);
    throw error;
  }
}

export function getRatingValue(rating) {
  return ratingMap[rating] || 0;
}

export function getCategoryStats(data) {
  const stats = {};
  
  categoryColumns.forEach(category => {
    const ratings = data
      .map(row => row[category])
      .filter(r => r && r.trim() !== '');
    
    const distribution = {
      'Glorious': 0,
      'Great': 0,
      'Good': 0,
      'Needs attention': 0,
      'Rough': 0
    };
    
    ratings.forEach(rating => {
      if (distribution.hasOwnProperty(rating)) {
        distribution[rating]++;
      }
    });
    
    const total = ratings.length;
    const average = total > 0 
      ? ratings.reduce((sum, r) => sum + getRatingValue(r), 0) / total 
      : 0;
    
    stats[category] = {
      distribution,
      average,
      total,
      percentage: distribution
    };
  });
  
  return stats;
}

export function getRecommendRAScore(data) {
  const scores = data
    .map(row => {
      const score = parseFloat(row['Recommend RA?']);
      return isNaN(score) ? null : score;
    })
    .filter(score => score !== null);
  
  if (scores.length === 0) return { average: 0, total: 0 };
  
  const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  return { average, total: scores.length, scores };
}

export function getReturning2026(data) {
  const returning = {
    'Yes': 0,
    'Probably': 0,
    'Undecided': 0,
    'Unlikely': 0
  };
  
  data.forEach(row => {
    const value = row['Returning 2026?'];
    if (value && returning.hasOwnProperty(value)) {
      returning[value]++;
    }
  });
  
  return returning;
}

export function getFeeData(data) {
  const fees = {
    'Camp Fees': [],
    'Tent Fees': [],
    'AC Fees': [],
    'Bike Fees': []
  };
  
  data.forEach(row => {
    Object.keys(fees).forEach(feeType => {
      const value = row[feeType];
      if (value) {
        // Extract number from "USD 750" format
        const match = value.match(/[\d,]+/);
        if (match) {
          const num = parseFloat(match[0].replace(/,/g, ''));
          if (!isNaN(num)) {
            fees[feeType].push(num);
          }
        }
      }
    });
  });
  
  // Calculate averages
  const feeStats = {};
  Object.keys(fees).forEach(feeType => {
    const values = fees[feeType];
    const average = values.length > 0
      ? values.reduce((sum, v) => sum + v, 0) / values.length
      : 0;
    feeStats[feeType] = {
      values,
      average,
      min: values.length > 0 ? Math.min(...values) : 0,
      max: values.length > 0 ? Math.max(...values) : 0,
      count: values.length
    };
  });
  
  return feeStats;
}

export { categoryColumns, ratingMap };

