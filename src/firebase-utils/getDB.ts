import { getDatabase, ref, onValue } from 'firebase/database';

const db = getDatabase();
export const getFalls = ref(db, 'QtC8bjpq2EUreDk27XNnBTTdUvg1' + '/yyy');
onValue(getFalls, (snapshot) => {
  const data = snapshot.val();
  console.log(Object.entries(data));
});
