/* eslint-disable jsx-a11y/anchor-is-valid */
import NavbarSidebarLayout from '../layouts/navbar-sidebar';
import FallDetectedList from '../components/FallsDetectedList';
import FallsThisWeek from '../components/FallsThisWeek';
import StatusCard from '../components/StatusCard';
import type { FC } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase-utils/getFirestore'
import FallModal from '../components/FallModal';

const DashboardPage: FC = function () {
  async function test () {
  const docRef = doc(db, 'Users', 'Device1');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
 }
  //test();
  // const falls = getFalls;
  

  return (
    <NavbarSidebarLayout>
      <FallModal />
      <div className="px-4 pt-6">
        <StatusCard />
      </div>
      <div className="px-4 pt-6">
        <FallsThisWeek />
        <div className="my-6">
          <FallDetectedList />
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;
