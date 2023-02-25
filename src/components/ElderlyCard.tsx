import { Card } from 'flowbite-react';

const ElderlyCard = function () {
  return (
    <div className="grow">
      <Card>
        <div className="mt-10 flex flex-col items-center pb-10">
          <img
            className="mb-3 h-16 w-16 rounded-full shadow-lg"
            src="/images/users-old/women4.jpg"
            alt="Bonnie image"
          />
          <h5 className="mt-5 mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Helene Engels
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Age: 79
          </span>
        </div>
      </Card>
    </div>
  );
};

export default ElderlyCard;
