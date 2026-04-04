export default function TabBtn({tab, handleTabChange, isActive}) {
   return <button role="tab" id={`${tab.id}-tab`} aria-selected={isActive} aria-controls={`${tab.id}-panel`} onClick={() => handleTabChange(tab.id)} className={isActive ? 'active' : ''}>{tab.btn}</button>;
}