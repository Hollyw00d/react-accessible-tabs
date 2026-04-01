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

Plan:
1. Input will be whatever I want it to be (and include the key)
2. Components:
   1. Tabs
      List of 3 buttons
      A button is more semantically correct for something that is clickable (not navigation, which is for links)
   2. TabBtn
      Individual button with with an `id` of `tab-1`, `tab-2`, etc. and tabText
   3. TabContent
      Displayed outside of the `Tab` and include `data-id` of `tab-1`, etc. and include TabContent
*/
import {useState, useEffect} from 'react';
const tabsInput = [
   {
      btn: 'Button 1',
      content: 'Content 1',
      id: 'tab-1'
   },
   {
      btn: 'Button 2',
      content: 'Content 2',
      id: 'tab-2'
   },
   {
      btn: 'Button 3',
      content: 'Content 3',
      id: 'tab-3'
   }      
];

const firstTabId = tabsInput[0].id;

const activeBtn = {
   backgroundColor: '#000',
   color: '#fff'
};

const hide = {
   display: 'none'
};

function Tabs() {
   const [activeTabId, setActiveTabId] = useState(firstTabId);

   const tabIdHandler = e => {
      const currentId = e.currentTarget.id;
      setActiveTabId(currentId);
      window.location.hash = currentId;
   };

   useEffect(() => {
      function hashChangeHandler() {
         const hash = window.location.hash.replace('#', '');
         const validTab = tabsInput.find(tab => tab.id === hash);
         setActiveTabId(validTab ? validTab.id : firstTabId);
      }
      
     hashChangeHandler();
     window.addEventListener('hashchange', hashChangeHandler);

     return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
     };
   }, []);

   return (
      <div>
         <div>
            {tabsInput.map(tab => {
               const activeTab = activeTabId === tab.id;
               return <TabBtn key={tab.id} tab={tab} tabIdHandler={tabIdHandler} activeTab={activeTab} />;
            })}
         </div>
         <div>
            {tabsInput.map(tab => {
               const activeTab = activeTabId === tab.id;
               return <TabContent key={tab.id} tab={tab} activeTab={activeTab} />;
            })}
         </div>
      </div>
   );
}

function TabBtn({tab, tabIdHandler, activeTab}) {
   return <button id={tab.id} onClick={tabIdHandler} style={activeTab ? activeBtn : {}}>{tab.btn}</button>;
}

function TabContent({tab, activeTab}) {
   return <div style={activeTab ? {} : hide}>{tab.content}</div>;
}

export default Tabs;