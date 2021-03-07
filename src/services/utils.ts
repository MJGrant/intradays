export const processTradingHistory = (data: []) => {
  let processedData = [] as {};
  /* DATA MODEL: 
    const data = [
      {timestamp: '09:00',
       030521: '$145.00',   // most recent trading day
       030421: '$122.00'    // second-most recent trading day (and so on)
      },
      {timestamp: '09:05',
       030521: '$130.00',
       030421: '$121.00'
      },
    ]

  For each timestamp between 9am-3:30pm, 
  create an object with a snapshot of each day's value for that timestamp as a key/value pair 
  */
  processedData = [
      {'timestamp': '09:00',
      'Friday 2021-03-05': '$145.00',   // most recent trading day
      'Thursday 2021-03-04': '$122.00'    // second-most recent trading day (and so on)
    },
    {'timestamp': '09:05',
      'Friday 2021-03-05': '$130.00',
      'Thursday 2021-03-04': '$121.00'
    },
    {'timestamp': '09:10',
      'Friday 2021-03-05': '$132.00',
      'Thursday 2021-03-04': '$160.00'
    },
  ];
  return processedData;
}