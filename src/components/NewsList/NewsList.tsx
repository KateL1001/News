import { useEffect, useState } from 'react';
import NewsItem from '../NewsItem/NewsItem';
import {  useSelector } from 'react-redux';
import {  RootState, useAppDispatch } from '../../store/store';
import { getNewsThunk } from '../../store/newsListSlice';
import { Button, Layout, List  } from 'antd';
import { useModalState } from '../Layout/Layout';



const NewsList = () => {
	const { news,error,loading } = useSelector((s: RootState) => s.newsSliceReducer);
	const dispatch = useAppDispatch();
	const [refetchData,setRefetchData] = useState<boolean>(false);
	const {close,open } = useModalState();

	useEffect(() => {
		const pool = setInterval(() => {
			dispatch(getNewsThunk());
		}, 60000);
		return () => {
			clearInterval(pool);
		};		
	},[]);

	useEffect(() => {
		dispatch(getNewsThunk());
		
	},[refetchData]);

	useEffect(() => {
		if(loading) {
			open();
		}else (
			close()
		);
	},[loading]);

	const refetchOnClick = () => {
		setRefetchData(prev => !prev);
	};
	

	if(error) {
		return <p>{error}</p>;
	}

	
	return (
		<>
			<Layout style={{padding: '50px', height: '100%'}}>
				<Button style={{marginBottom: '15px', maxWidth: '500px'}}  size={'middle'} disabled={loading} onClick={refetchOnClick} type="primary">Refetch</Button>
			
				{news && news.length > 0 && 
				<List 
					itemLayout="vertical"
					size="large"
					dataSource={news}
					renderItem={(item) => (
						<NewsItem 
							key={item.id}
							id={item.id}
							by={item.by}
							score={item.score}
							time={item.time}
							title={item.title}
							kids={item.kids}
						/>
					)}
				/>
				}
			</Layout>
		</>
	);
};

export default NewsList;