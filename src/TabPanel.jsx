export default function TabPanel({tab, isActive}) {
   if(!isActive) return null;

   return <div role="tabpanel" id={`${tab.id}-panel`} aria-labelledby={`${tab.id}-tab`}>{tab.content}</div>;
}