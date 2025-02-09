import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './store'
import App from './App'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import './index.css'

dayjs.extend(utc);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
) 