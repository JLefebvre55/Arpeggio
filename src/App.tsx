// React engine, router
import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Contexts
import {useAuth} from './contexts/AuthContext';

// Components
import NavBar from './components/NavBar';
import CircularProgress from '@material-ui/core/CircularProgress';

// Pages
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import DAW from './pages/DAW';

// Theme
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createTheme({
    typography: {
        fontFamily: 'AvantGarde'
    },
    palette: {
        background: {
            default: '#6b6b84',
            paper: '#383444'
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffffff'
        },
        primary: {
            main: '#ffb634',
            contrastText: '#171615'
        },
        secondary: {
            main: '#71d8ff',
            contrastText: '#171615'
        }
    },
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: 25
            }
        }
    }
});

const AuthLoader:FC = ({children}) => {
    return (
        <>
            {useAuth() === undefined ? 
                (
                    <div style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        marginTop: '2%'
                    }}>
                        <CircularProgress/>
                    </div>
                ) : (
                    <div>
                        {children}
                    </div>
                )
            }
        </>
    );
};
    
const App:FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <NavBar />
                <AuthLoader>
                    <Switch>
                        <Route exact path='/dashboard'>
                            {useAuth() ? <Dashboard/> : <Redirect to='/login'/>}
                        </Route>
                        <Route exact path='/login'>
                            {useAuth() ? <Redirect to='/dashboard'/> : <Auth/> }
                        </Route>
                        <Route path='/project/:id' render={(props)=><DAW {...props}/>}/>
                        <Route path='/'> 
                            <Redirect to='/dashboard'/>
                        </Route>
                    </Switch>
                </AuthLoader>
            </Router>
        </ThemeProvider>
    );
};

export default App;