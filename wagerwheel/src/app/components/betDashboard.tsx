export default function BetDashboard() {
    return (
        <div className="flex-1 flex flex-col bg-gradient-to-r from-slate-100 to-slate-200 p-6">
            <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Betting Amount
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="number"
                      placeholder="in ETH"
                      className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <button
                type="button"
                className="mt-5 bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                Bet
                </button>
            </div>
        </div>
    )
}