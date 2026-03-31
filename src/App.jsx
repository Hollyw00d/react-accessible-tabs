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

const input = [
  {
    tabText: 'Tab 1',
    tabContent: 'Content 1',
    tabId: 'tab-1'
  },
  {
    tabText: 'Tab 2',
    tabContent: 'Content 2',
    tabId: 'tab-2'
  },
  {
    tabText: 'Tab 3',
    tabContent: 'Content 3',
    tabId: 'tab-3'
  }  
];

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

const input = [
  {
    tabText: 'Tab 1',
    tabContent: 'Content 1',
    tabId: 'tab-1'
  },
  {
    tabText: 'Tab 2',
    tabContent: 'Content 2',
    tabId: 'tab-2'
  },
  {
    tabText: 'Tab 3',
    tabContent: 'Content 3',
    tabId: 'tab-3'
  }  
];

const firstInputTabId = input[0].tabId;

const activeBtn = {
  backgroundColor: '#000',
  color: '#fff'
};

const hide = {
  display: 'none'
};

// Main App
function Tabs() {
  const [activeTabId, setActiveTabId] = useState(firstInputTabId);

  useEffect(() => {
    const hashChangeHandler = () => {
      const hash = window.location.hash.replace('#', '');
      const validTab = input.find(tab => tab.tabId === hash);
      setActiveTabId(validTab ? validTab.tabId : firstInputTabId);
    };

    hashChangeHandler();
    window.addEventListener('hashchange', hashChangeHandler);

    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, []);

  const activeTabIdHandler = (e) => {
    const id = e.currentTarget.id;
    window.location.hash = id;
    setActiveTabId(id);
  };

  return (
    <div>
        {input.map(tab => {
          const isActive = activeTabId === tab.tabId; 
          return <TabBtn key={tab.tabId} tab={tab} activeTabIdHandler={activeTabIdHandler} isActive={isActive} />;
        })}
    
        {input.map(tab => {
          const isActive = activeTabId === tab.tabId; 
          return <TabContent key={tab.tabId} tab={tab} isActive={isActive} />
        })}
    </div>  
  );
}

function TabBtn({tab, activeTabIdHandler, isActive}) {
  return <button role="tab" style={isActive ? activeBtn : {}} aria-selected={isActive ? 'true' : 'false'} aria-controls={tab.tabId} id={tab.tabId} onClick={activeTabIdHandler}>{tab.tabText}</button>;
}

function TabContent({tab, isActive}) {
  return (
    <div style={isActive ? {} : hide} role="tabpanel" aria-labelledby={tab.tabId}>{tab.tabContent}</div>
  );
}

export default Tabs;