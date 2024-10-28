export default function CreateComponentPageTabs({
  setActivePanel,
  activePanel,
}) {
  return (
    <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
      <li>
        <button
          onClick={() => {
            setActivePanel(1);
          }}
          className={`${
            activePanel == 1 && "!text-white !bg-blue-500"
          } inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-blue-700/50 w-full `}
          aria-current="page"
        >
          Ölçü
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            setActivePanel(2);
          }}
          className={`${
            activePanel == 2 && "!text-white !bg-blue-500"
          } inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-blue-700/50 w-full `}
        >
          Kartela
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            setActivePanel(3);
          }}
          className={`${
            activePanel == 3 && "!text-white !bg-blue-500"
          } inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-blue-700/50 w-full `}
        >
          Metal
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            setActivePanel(4);
          }}
          className={`${
            activePanel == 4 && "!text-white !bg-blue-500"
          } inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-blue-700/50 w-full `}
        >
          Renk
        </button>
      </li>
    </ul>
  );
}
