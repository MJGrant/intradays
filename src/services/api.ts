import Axios from 'axios';

export const callAPI = (symbol: string) => {
    const config = {
        params:  {
            'api_key': process.env.REACT_APP_API_KEY_ALPHAVANTAGE
        }
    };
  
    return Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${config.params.api_key}`)
}

export const getTradingData = async (symbol: string): Promise<[]> => {
    const result = await callAPI(symbol);
    return result.data;
}