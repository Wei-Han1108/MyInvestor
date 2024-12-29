import { Sidebar } from "flowbite-react";
const MySidebar = () => {
   return (
     <aside id="default-sidebar" className="fixed  left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800">
       <div className="h-full px-3 py-4 ">
         <ul className="space-y-2 font-medium">
           <li>
             <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
               <span className="ms-3">Dashboard</span>
             </a>
           </li>
           <li>
             <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
               <span className="ms-3">Kanban</span>
             </a>
           </li>
           <li>
             <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
               <span className="ms-3">Inbox</span>
             </a>
           </li>
           <li>
             <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
               <span className="ms-3">Users</span>
             </a>
           </li>
         </ul>
       </div>
     </aside>
   );
 };
 
 export default MySidebar;
 