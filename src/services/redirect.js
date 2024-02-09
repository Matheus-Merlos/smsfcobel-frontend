import { useSelector } from 'react-redux';
import history from './history';

export default function useRedirect(permission) {
  const userPermissions = useSelector((state) => state.reducer.permissions);
  if (!userPermissions.includes(permission)) {
    history.go(-1);
  }
}
