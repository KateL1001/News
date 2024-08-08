import  React, { FC } from 'react';
import { NewsItemScheme } from '../../interfaces/NewsItemScheme';
import { NavLink } from 'react-router-dom';
import { useToLocalDate } from '../../hooks/useToLocalDate';

import { List, Space } from 'antd';
import { CalendarOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
);

const NewsItem: FC<NewsItemScheme> = ({id, by,score,time,title}) => {
	const newTime = useToLocalDate(time);
	return (
		
		<List.Item
			key={id}
			actions={[
				<IconText icon={StarOutlined} text={`${score}`} key="list-vertical-star-o" />,
				<IconText icon={UserOutlined} text={by} key="list-vertical-user-o" />,
				<IconText icon={CalendarOutlined} text={newTime} key="list-vertical-user-o" />
			]}
		>
			<List.Item.Meta
				title={<NavLink to={`/newsItem/${id}`}>{title}</NavLink>}			
			/>
		</List.Item>);
	
};

export default NewsItem;