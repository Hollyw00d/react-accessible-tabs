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
import {useState, useEffect} from 'react';
const tabs = [
   {
      btn: 'MLB',
      content: 'Major League Baseball',
      id: 'mlb'
   },
   {
      btn: 'NBA',
      content: 'National Basketball Association',
      id: 'nba'
   },
   {
      btn: 'NFL',
      content: 'National Football League',
      id: 'nfl'
   }      
];

const activeBtnStyle = {
   backgroundColor: '#000',
   color: '#fff'
};

const queryParamName = 'tab';

function App() {
   return <Tabs tabs={tabs} defaultTabId="nba" />
};

function Tabs({tabs, defaultTabId}) {
   const url = new URL(window.location.href);
   const params = url.searchParams;
   console.log(url.href);

   const [activeTabId, setActiveTabId] = useState(
      params.get(queryParamName) ?? defaultTabId
   );

   const handleTabChange = tabId => {
      setActiveTabId(tabId);
      params.set(queryParamName, tabId);
      window.navigation?.navigate(url.href);
   };

   return (
      <>
         {tabs.map(tab => {
            const isActive = activeTabId === tab.id;
            return <TabBtn key={tab.id} tab={tab} handleTabChange={handleTabChange} isActive={isActive} />;
         })}
      
         {tabs.map(tab => {
            const isActive = activeTabId === tab.id;
            return <TabPanel key={tab.id} tab={tab} isActive={isActive} />;
         })}
      </>
   );
}

function TabBtn({tab, handleTabChange, isActive}) {
   return <button role="tab" id={`${tab.id}-tab`} aria-selected={isActive} aria-controls={`${tab.id}-panel`} onClick={() => handleTabChange(tab.id)} style={isActive ? activeBtnStyle : {}}>{tab.btn}</button>;
}

function TabPanel({tab, isActive}) {
   if(!isActive) return null;

   return <div role="tabpanel" id={`${tab.id}-panel`} aria-labelledby={`${tab.id}-tab`}>{tab.content}</div>;
}

export default App;