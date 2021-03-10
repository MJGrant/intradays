import parse from 'csv-parse';
import { stringify } from 'node:querystring';

import { testData } from '../testdata/testData';


/* DATA MODEL EXAMPLE: 
    const data = [
      {timestamp: '09:00:00',
       2021-03-05: '145.00',   // most recent trading day
       20210304: '122.00'    // second-most recent trading day (and so on)
      },
      {timestamp: '09:05:00',
       20210305: '130.00',
       20210304: '121.00'
      },
    ]

  For each timestamp between 9am-3:30pm, 
  create an object with a snapshot of each day's value for that timestamp as a key/value pair 
  */

export const returnMockData = (data: []) => {
  let mockData = [] as {};
  mockData = [
      {timestamp: '09:00',
      'Friday 03-05-2021': 145.00,   // most recent trading day
      'Thursday 03-04-2021': 122.00    // second-most recent trading day (and so on)
    },
    {timestamp: '09:05',
      'Friday 03-05-2021': 130.00,
      'Thursday 03-04-2021': 121.00
    },
    {timestamp: '09:10',
      'Friday 03-05-2021': 132.00,
      'Thursday 03-04-2021': 160.00
    },
  ];

  return mockData;
}

interface IPriceSnapshot {
 time: string;
 open: string;
 high: string;
 low: string;
 close: string;
 //volume: string;
}

interface IParsed {
  [key: string]: number | string | undefined;
}

export const processTradingHistory = async (data: []) => {

  
  let resolveCSVPromise = (csv: any[]) => {};
  const csvPromise: Promise<any[]> = new Promise((resolve)=> {
    resolveCSVPromise = resolve;
  });

  parse(testData, {columns: true}, 
    function(err, output) {
      const dict = new Map();
      output.forEach((e: IPriceSnapshot) => {
        let parsedObject: IParsed = {};
        const [date, timestamp] = e.time.split(' ');
        parsedObject.timestamp = timestamp;
        parsedObject[date] = +e.close;
    
        const currentTimestamp = dict.get(timestamp);
        dict.set(timestamp, {...currentTimestamp, [date]: +e.close }); // combine new entry into current fields
      });
    
      const doneData = Array.from(dict).reduceRight((accumulator, current) => {
        const [currentTimestamp, obj] = current;
        const newEntry = {...obj, ...{ timestamp: currentTimestamp }};
        return accumulator.concat(newEntry);
      }, []);
      resolveCSVPromise(doneData)
    });

    return csvPromise;
}