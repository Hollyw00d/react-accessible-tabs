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
   3. TabContent
      Displayed outside of the `Tab` and include `data-id` of `tab-1`, etc. and include TabContent
*/
import {useState, useEffect} from 'react';
const tabs = [
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

function App() {
   return <Tabs tabs={tabs} />
};

function Tabs({tabs}) {
   const [activeTabId, setActiveTabId] = useState(firstTabId);

   const tabIdHandler = e => {
      const currentId = e.currentTarget.id;
      setActiveTabId(currentId);
      window.location.hash = currentId;
      // Mention why I chose a hash, over a query parameter including the tradeoffs
      // Hash parameters are used when I'm scrolling in parts of a page
      // Also supports back and forth
      // Query parameters do get passed to backend, and hash parameters don't 
      // New API called `navigation`:
      // https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API
      // Usually render only what is visible, for TabContent only render active content
      // Pass in data as a prop
      // Every time I write a component think about reusability
      // Use window.navigation?.navigate(url.href); rather than useEffect
      // https://stackblitz.com/edit/vitejs-vite-qu2dpbng?file=src%2FApp.tsx,src%2FTabs.tsx
      // What if get passed in no tabs
      // Don't go into useEffect unless there's a good reason to use it
      // Use a query parameter for tabs as hash is used for a jump link
      // Nested DIVs are a red flag, and have other <section> or something else
      // When I make any choice look up options and talk out loud
      // Talk about trade-offs and options
      // Look up MDN for accessiblity roles
      // Always make components reuseable
      // Unit tests are much easier with smaller components, including readability and maintainability
      // Common Amazon question: What improvements would you make?
      // Practice variations of Sum 2
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
            {tabs.map(tab => {
               const activeTab = activeTabId === tab.id;
               return <TabBtn key={tab.id} tab={tab} tabIdHandler={tabIdHandler} activeTab={activeTab} />;
            })}
         </div>
         <div>
            {tabs.map(tab => {
               const activeTab = activeTabId === tab.id;
               return <TabContent key={tab.id} tab={tab} activeTab={activeTab} />;
            })}
         </div>
      </div>
   );
}

function TabBtn({tab, tabIdHandler, activeTab}) {
   return <button role="tab" id={tab.id} onClick={tabIdHandler} style={activeTab ? activeBtn : {}}>{tab.btn}</button>;
}

function TabContent({tab, activeTab}) {
   return <div role="tabpanel" style={activeTab ? {} : hide}>{tab.content}</div>;
}

export default App;