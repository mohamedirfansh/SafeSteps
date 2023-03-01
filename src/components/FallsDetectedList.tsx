import { useState, useEffect } from 'react';
import { Badge, Table } from 'flowbite-react';
import type { FC } from 'react';

const dummyFalls = [
  { fallId: 123, date: 'Apr 23, 2021', time: '2:32pm', isTrue: 'success' },
  { fallId: 124, date: 'Apr 23, 2021', time: '3:33pm', isTrue: 'failure' },
  { fallId: 125, date: 'Apr 24, 2021', time: '5:35am', isTrue: 'success' },
];
import { getDatabase, ref, onValue } from 'firebase/database';

const db = getDatabase();

const FallsDetectedList: FC = function () {
  const [falls, setFalls] = useState([]);
  useEffect(() => {
    const getFalls = ref(db, 'QtC8bjpq2EUreDk27XNnBTTdUvg1' + '/yyy');
    onValue(getFalls, (snapshot) => {
      const data = snapshot.val();
      setFalls(Object.entries(data));
      // console.log(Object.entries(data));
    });
  }, []);
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Stumble History
          </h3>
          <span className="text-base font-normal text-gray-600 dark:text-gray-400">
            This is a list of latest detected stumbles
          </span>
        </div>
        <div className="shrink-0">
          <a
            href="#"
            className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
          >
            View all
          </a>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table
                striped
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
              >
                <Table.Head className="bg-gray-50 dark:bg-gray-700">
                  <Table.HeadCell>Fall ID</Table.HeadCell>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>Time</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>
                <Table.Body className="bg-white dark:bg-gray-800">
                  {falls.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                        <span className="font-semibold">#{index+1}</span>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                        {(item[1].Time).split(' ')[0]}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {(item[1].Time).split(' ')[1]}
                      </Table.Cell>
                      <Table.Cell className="flex whitespace-nowrap p-4">
                        <Badge color="failure">{item[1].isFall}</Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallsDetectedList;
