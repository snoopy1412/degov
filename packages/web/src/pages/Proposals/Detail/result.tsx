import { ResultTable } from './result-table';

export const Result = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
      <h4 className="mb-4 text-xl">Result details</h4>
      <div className="grid grid-cols-3">
        {/* For Column */}
        <div>
          <h5 className="mb-2 text-green-500">For</h5>
          <div className="mb-2 h-2 rounded bg-green-500/20">
            <div className="h-full rounded bg-green-500" style={{ width: '60%' }} />
          </div>
        </div>

        {/* Against Column */}
        <div>
          <h5 className="mb-2 text-red-500">Against</h5>
          <div className="mb-2 h-2 rounded bg-red-500/20">
            <div className="h-full rounded bg-red-500" style={{ width: '30%' }} />
          </div>
          <div className="space-y-4">{/* Voter items */}</div>
        </div>

        {/* Abstain Column */}
        <div>
          <h5 className="mb-2 text-gray-500">Abstain</h5>
          <div className="mb-2 h-2 rounded bg-gray-500/20">
            <div className="h-full rounded bg-gray-500" style={{ width: '10%' }} />
          </div>
          <div className="space-y-4">{/* Voter items */}</div>
        </div>
      </div>
      <ResultTable
        data={[
          {
            address: '0x123',
            vote: 'For'
          },
          {
            address: '0x133',
            vote: 'Against'
          }
        ]}
      />
    </div>
  );
};
