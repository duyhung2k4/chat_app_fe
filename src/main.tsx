import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from './redux/store.ts'
import themeOverride from './theme/overrideTheme.ts'

import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from '@mantine/core'
import { Provider } from "react-redux";
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <MantineProvider theme={themeOverride}>
            <BrowserRouter>
                <Notifications />
                <App />
            </BrowserRouter>
        </MantineProvider>
    </Provider>
)
