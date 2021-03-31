import parse from 'csv-parse';

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
  let mockDict = {}; //[] as {};
  mockDict = {
    lowestPoints: {
      'Friday 03-05-2021': 130.00,
      'Thursday 03-04-2021': 121.00
    },
    lineData: [
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
    ]
  }
  return mockDict;
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

function moneyRound(num: number) {
  // rounds up and to two decimal places
  return Math.ceil(num * 100) / 100;
}

export const processTradingHistory = async (data: []) => {

  let resolveCSVPromise = (csv: any) => {};
  const csvPromise: Promise<any> = new Promise((resolve)=> {
    resolveCSVPromise = resolve;
  });

  parse(data.toString(), {columns: true}, 
    function(err, output) {

      const lineData = new Map();
      const lowestPoints = new Map();

      output.forEach((e: IPriceSnapshot) => {
        let parsedObject: IParsed = {};
        const [date, timestamp] = e.time.split(' ');
        parsedObject.timestamp = timestamp;
        parsedObject[date] = moneyRound(+e.close);

        const currentTimestamp = lineData.get(timestamp);
        lineData.set(timestamp, {...currentTimestamp, [date]: moneyRound(+e.close) }); // combine new entry into current fields

        // update "lowest point" value
        if (lowestPoints.get(date) == null) {
          lowestPoints.set(date, moneyRound(+e.close));
        } else if (+e.close < lowestPoints.get(date)) {
          lowestPoints.set(date, moneyRound(+e.close));
        } 
      });
    
      // handle line data
      const formattedLineData = Array.from(lineData).reduceRight((accumulator, current) => {
        const [currentTimestamp, obj] = current;
        const newEntry = {...obj, ...{ timestamp: currentTimestamp }};
        return accumulator.concat(newEntry);
      }, []);

      const allData = {
        lowestPoints: lowestPoints,
        lineData: formattedLineData,
      }

      console.log(allData);
      resolveCSVPromise(allData);
    });

    return csvPromise;
}