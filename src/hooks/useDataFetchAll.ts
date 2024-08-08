import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { getItems } from '../helpers/fetchItems';

const useDataFetchAll = (ids: number[], effectParam?: unknown ) => {
	const [itemsEl, setItemsEl] = useState<unknown[] | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setErrror] = useState<string | undefined>('');

	useEffect(() => {
		setIsLoading(true);
		getItems(ids)
			.then((stories) => {				
				setItemsEl(stories);
				setIsLoading(false);
			})
			.catch((er) => {
				setIsLoading(false);
				if(er instanceof AxiosError) {
					setErrror(er.message);
				}
			});
	}, [effectParam]);

	return { isLoading, itemsEl, error };
};

export default useDataFetchAll;