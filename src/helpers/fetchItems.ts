import axios, { AxiosError } from 'axios';
import { API_URL } from './api';

export const getNewsItem = async (id: number) => {
	try {
		const {data} = await axios.get(`${API_URL}/item/${id}.json`);
		return data;
	} catch (error) {
		console.log('Error newsItem getting.');
	}
};

export const getItems = async(items: number[]) =>{
	try {
		const resp = await Promise.all(items.map(el => getNewsItem(el)));
		return resp;
	} catch (error) {
		console.log('Error newsList getting.');
	}
        
};

export const getNews = async (urlStr:string) => {
	try {
		const { data: newsItems } = await axios.get(
			`${API_URL}/${urlStr}`
		);
		const news = await Promise.all(newsItems.map(getNewsItem));
		return news;
	} catch (error) {
		console.log('Error news getting.');
		if(error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
};