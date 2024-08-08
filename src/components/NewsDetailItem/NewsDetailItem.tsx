import { NavLink, useParams } from 'react-router-dom';
import { NewsDetailItemType } from './NewsDatailItemType';
import { useToLocalDate } from '../../hooks/useToLocalDate';
import { useEffect, useState } from 'react';
import { CommentType } from '../Comments/CommentType';
import { getNewsItem, getItems } from '../../helpers/fetchItems';
import { AxiosError } from 'axios';
import CommentItem from '../Comments/Comments';
import { Button, Flex, Layout, Space, Typography } from 'antd';

import { useModalState } from '../Layout/Layout';

const { Paragraph, Link  } = Typography;

const NewsDetailItem = () => {
	const {id} = useParams();
	
	const [newsItem,setNewsItem] = useState<NewsDetailItemType>({});
	const [comments,setComments] = useState<CommentType[]>([]);
	const [isLoading,setLoading] = useState<boolean>(false);
	const [error,setError] = useState<string | undefined>('');
	const convertTime = useToLocalDate(newsItem?.time);
	const {close,open } = useModalState();


	const getDataFetch = () => {
		setLoading(true);
		getNewsItem(Number(id))
			.then(res => {
				setNewsItem(res);
				if(res.kids) {
					setLoading(true);
					getItems(res.kids)
						.then((comment) => {
							comment && setComments(comment);
							setLoading(false);
						})
						.catch((e) => {
							if(e instanceof AxiosError) {
								setError(e.message);
								setLoading(false);
							}
						});
				}
				setLoading(false);
			})
			.catch((e) => {
				if(e instanceof AxiosError) {
					setError(e.message);
					setLoading(false);
				}
			});
	};

	useEffect(() => {
		getDataFetch();
	},[]);

	useEffect(()=> {
		if(isLoading) {
			open();
		}else{
			close();
		}
	},[isLoading]);

	
	if(error) {
		return <p>{error}</p>;
	}
	return (
		<Layout style={{padding: '50px', height: '100%'}}>
			<Flex style={{marginBottom: '20px'}} align='center' wrap gap='small'>
				<NavLink to={'/'}>Back to news</NavLink>
				<Button disabled={isLoading} type='primary' onClick={() => getDataFetch()}>Refetch</Button>
			</Flex>
			
			<Space direction='vertical' size={'small'}>
				<Typography>					
					<Paragraph>Author: {newsItem?.by}</Paragraph>
					<Paragraph>Date: {newsItem?.time && convertTime}</Paragraph>
					<Paragraph>Comments: {newsItem?.kids?.length}</Paragraph>
					<Link target='_blank' href={newsItem?.url}>{newsItem?.title}</Link>
				</Typography>
				<div>
					{comments?.length > 0 && comments.map(commentEl => (
						<CommentItem comment={commentEl} key={commentEl.id} />
						
					))}
				</div>
			</Space> 
		</Layout>
	);
};

export default NewsDetailItem;