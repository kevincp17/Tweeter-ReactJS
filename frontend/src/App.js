import Routes from './Route';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

function App() {
const { isLoggedIn } = useSelector(state => state.loginPageState);
console.log(isLoggedIn);
  return (
      Routes(isLoggedIn)
  );
}

export default App;