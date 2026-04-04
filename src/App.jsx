/*
Implement a tabs component

Steps:
1. Clarify requirements (5 min)
   Mental model:
   Work backwards from the customer (user) such as:
   1. Responsiveness
   2. Browser support
   3. What do I need to know for the input or output
   4. How do I manage the state and recommend "controlled" state
      1. PERSONAL THOUGHT: Will I need local storage
      2. Will this be shareable
      3. Maybe use React context  
   5. Mention why I chose a hash, over a query parameter including the tradeoffs    

Plan:
1. Input will be whatever I want it to be (and include the key)
2. Components:
   1. Tabs
      List of 3 buttons
      A button is more semantically correct for something that is clickable (not navigation, which is for links)
   2. TabBtn
      Individual button with with an `id` of `tab-1`, `tab-2`, etc. and tabText
   3. TabPanel
      Displayed outside of the `Tab` and include `data-id` of `tab-1`, etc. and include TabPanel
*/
import Tabs from './Tabs';
import tabs from './api/tabs';
import './App.css';

export default function App() {
   return <Tabs tabs={tabs} defaultTabId="nba" />
};