import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/auth' component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
