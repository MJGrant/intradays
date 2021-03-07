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
  return processedData;
}