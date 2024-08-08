import { useEffect, useState } from 'react';
import { CommentType } from './CommentType';
import useDataFetchAll from '../../hooks/useDataFetchAll';
import { useToLocalDate } from '../../hooks/useToLocalDate';
import { Comment } from '@ant-design/compatible';
import { Avatar } from 'antd';

import styles from './Comment.module.scss';
import { useModalState } from '../Layout/Layout';


const CommentItem = ({comment}:{comment:CommentType}) => {
	const [nestedShow, setNestedShow] = useState<boolean>(false);
	const {error,isLoading, itemsEl} = useDataFetchAll(comment.kids!,  nestedShow);
	const convertedCommentTime =  useToLocalDate(comment.time!); 
	const {close,open } = useModalState();
    
	const commentClick = () => {
		setNestedShow(prev => !prev);
	};

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

	const actionBtn = () => {
		return(
			<>
				{comment.kids && comment.kids.length > 0 && <span key="comment-show-more" onClick={commentClick}>{nestedShow ? 'Hide comments': 'Show comments'}</span>}
			</>
		);
	};

	return (
		<>
			
			<Comment
				className={styles.comment}
				avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="ava" />}
				author={<span>{comment.by}</span>}
				content={
					<p>{comment.text}</p>
				}
				datetime={
					<span>{convertedCommentTime}</span>
				}
				actions={[
					actionBtn()
				]}
			>
				{nestedShow && itemsEl?.map(commentN => <CommentItem key={comment.id} comment={commentN as CommentType}/>)}
			</Comment>
		</>
	);
};

export default CommentItem;