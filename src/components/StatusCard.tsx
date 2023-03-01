import { Avatar, Badge, Card } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';

const StatusCard = function () {
  return (
    <Card>
      <div className="flex flex-wrap gap-2">
        <Avatar
          img="/images/users-old/women4.jpg"
          rounded={true}
        />
        <h5 className="mt-2 mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Helene Engels
        </h5>
        <div className="mt-3 mb-2 flex items-center text-base font-normal text-gray-900 dark:text-white">
          <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{' '}
          Safe
        </div>
        <Badge className="mt-3" icon={HiCheck}>
          2 minutes ago
        </Badge>
      </div>
    </Card>
  );
};

export default StatusCard;
