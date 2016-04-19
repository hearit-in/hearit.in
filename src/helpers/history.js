import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory as history } from 'react-router';
import store from '../store';

const enhancedHistory = syncHistoryWithStore(history, store);

export default hashHistory;
