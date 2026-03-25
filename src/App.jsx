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
import {useState, useEffect, createContext, useContext} from 'react';

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

const ActiveTabIdContext = createContext(input[0].tabId);

const hide = {
  display: 'none'
};

const show = {
  display: 'block'
};

// Main App
function Tabs() {
  const [activeTabId, setActiveTabId] = useState(input[0].tabId);

  useEffect(() => {
    const hashChangeHandler = () => {
      const hash = window.location.hash.replace('#', '');
      const validTab = input.find(tab => tab.tabId === hash);
      setActiveTabId(validTab ? validTab.tabId : input[0].tabId);
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
   <ActiveTabIdContext.Provider value={activeTabId}>
    <div>
      <div>
        {input.map(tab => (
          <TabBtn key={tab.tabId} tab={tab} activeTabId={activeTabId} activeTabIdHandler={activeTabIdHandler} />
        ))}
      </div>
      <div className="tab-content">
        {input.map(tab => (
          <TabContent key={tab.tabId} tab={tab} activeTabId={activeTabId} />
        ))}
      </div>
    </div>  
   </ActiveTabIdContext.Provider>
  );
}

function TabBtn({tab, activeTabIdHandler}) {
  const activeTabId = useContext(ActiveTabIdContext);

  return <button className={activeTabId === tab.tabId ? 'active' : ''} aria-selected={activeTabId === tab.tabId ? 'true' : 'false'} aria-controls={tab.tabId} id={tab.tabId} onClick={activeTabIdHandler}>{tab.tabText}</button>;
}

function TabContent({tab}) {
  const activeTabId = useContext(ActiveTabIdContext);

  return (
    <div style={activeTabId === tab.tabId ? show : hide} role="tabpanel" aria-labelledby={tab.tabId}>{tab.tabContent}</div>
  );
}

export default Tabs;