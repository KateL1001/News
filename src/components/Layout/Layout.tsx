import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Loader from '../Loader/Loader';

interface IModalContex {
    modal: boolean
    open: () => void
    close: () => void
  }
  
  
export default function Layout()  {
	const [modal, setModal] = useState(true);
	const open = () => setModal(true);
	const close = () => setModal(false);
	return (
		<>
			<Outlet context={{ open, close, modal } satisfies IModalContex}/>
			{modal && <Loader/>}
		</>
	);
}
  
export function useModalState() {
	return useOutletContext<IModalContex>();
}