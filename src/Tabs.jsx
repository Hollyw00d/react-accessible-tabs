import {useState} from 'react';
import TabBtn from "./TabBtn";
import TabPanel from "./TabPanel";

const queryParamName = 'tab';

export default function Tabs({tabs, defaultTabId}) {
   const url = new URL(window.location.href);
   const params = url.searchParams;

   const [activeTabId, setActiveTabId] = useState(
      params.get(queryParamName) ?? defaultTabId
   );

   const handleTabChange = tabId => {
      setActiveTabId(tabId);
      params.set(queryParamName, tabId);
      window.history.pushState({}, '', url);
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