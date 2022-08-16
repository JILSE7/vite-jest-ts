import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import { JournalApp } from './JournalApp'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <Provider store={store}>
        <JournalApp />
    </Provider>

)
