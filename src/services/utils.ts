import parse from 'csv-parse';
import { stringify } from 'node:querystring';

import { testData } from '../testdata/testData';


/* DATA MODEL: 
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

  const fakeData = [
    {time: "2021-03-04 20:00:00", open: "129.6799", high: "129.97", low: "128.25", close: "128.2501"},
    {time: "2021-03-04 19:55:00", open: "129.8", high: "130.0", low: "129.25", close: "129.68"},
    {time: "2021-03-04 19:50:00", open: "130.0", high: "130.0001", low: "129.41", close: "129.5101"},
    {time: "2021-03-04 19:45:00", open: "131.0", high: "131.0", low: "130.0", close: "130.01"},
    {time: "2021-03-04 19:40:00", open: "129.01", high: "131.0", low: "129.01", close: "130.5"},
    {time: "2021-03-05 20:00:00", open: "328.41", high: "328.97", low: "328.25", close: "328.97"},
    {time: "2021-03-05 19:55:00", open: "129.8", high: "130.0", low: "129.25", close: "329.68"},
    {time: "2021-03-05 19:50:00", open: "130.0", high: "130.0001", low: "129.41", close: "345.00"},
    {time: "2021-03-05 19:45:00", open: "131.0", high: "131.0", low: "130.0", close: "370.00"},
    {time: "2021-03-05 19:40:00", open: "129.01", high: "131.0", low: "129.01", close: "375.50"},
    {time: "2021-03-06 20:00:00", open: "928.41", high: "928.97", low: "928.25", close: "428.97"},
    {time: "2021-03-06 19:55:00", open: "129.8", high: "130.0", low: "129.25", close: "410.68"},
    {time: "2021-03-06 19:50:00", open: "130.0", high: "130.0001", low: "129.41", close: "399.5101"},
    {time: "2021-03-06 19:45:00", open: "131.0", high: "131.0", low: "130.0", close: "350.01"},
    {time: "2021-03-06 19:40:00", open: "129.01", high: "131.0", low: "129.01", close: "300.5"},
  ];

  /* 
  let resolveCSVPromise = (posts: any[]) => {};
  const csvPromise: Promise<any[]> = new Promise((resolve)=> {
    resolveCSVPromise = resolve;
  }); */

  const dict = new Map();
  fakeData.forEach((e: IPriceSnapshot) => {
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

  return doneData;

/* 
  parse(testData, {columns: true}, 
    function(err, output) {
      resolveCSVPromise(output)
    });

    return csvPromise; */
}