'use client';

const orders = [
  { id: 'ORD-9921', customer: 'Alex Rivera', amount: '$249.00', status: 'Processing' },
  { id: 'ORD-9842', customer: 'Sarah Chen', amount: '$1,290.50', status: 'Shipped' },
  { id: 'ORD-9731', customer: 'James Wilson', amount: '$85.20', status: 'Processing' },
  { id: 'ORD-9610', customer: 'Elena Rossi', amount: '$430.00', status: 'Delivered' },
];

export function RecentOrdersTile() {
  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold tracking-tight">Recent Transactions</h3>
        <button className="text-xs text-neonCyan hover:underline font-mono uppercase tracking-widest">Full Log →</button>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-[10px] font-mono text-neonCyan border border-white/5">
                {order.id.split('-')[1]}
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-wide">{order.customer}</div>
                <div className="text-[10px] font-mono text-textSub uppercase tracking-widest">{order.id}</div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-sm font-mono font-bold text-white">{order.amount}</div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                order.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                order.status === 'Shipped' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                'bg-neonBlue/10 text-neonBlue border-neonBlue/20'
              }`}>
                {order.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
