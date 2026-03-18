'use client';

import React from 'react';

export const PopularVendors = () => {
  return (
    <div className="col-span-12 lg:col-span-6 row-span-1 glass-panel border border-cyan-500/20 rounded-lg p-8 hover-lift">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-headline text-2xl font-bold uppercase tracking-tight">Popular Vendors</h2>
        <span className="text-xs text-primary font-label tracking-widest uppercase">Verified Nodes</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center gap-3 group cursor-pointer">
          <div className="w-16 h-16 rounded-full border-2 border-outline-variant/20 p-1 group-hover:border-primary transition-colors">
            <img alt="Vendor Alpha" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4oqXR1-rWA-aTF0r14DXwq_MvPpWg-97O5PfOAFrA6QMjxk_6xHcXK9331tprtIM_qvR9-TKUjGULEG_iCvzuRlGl7H2bzYvrmlkBRlIYjXsRL7jYGiwuFL7-iPnBculjTTo0RRgheAxfUiHXcAs0phlQT7A3zQnTAKeqJe9V6tZ8-EJHrQNzxv6DwTK1ZHlJSxPbURFQG3foST2cV3urHTTyMRF35zfJYBT-ROb8iau-GLdOrYCJBKSh2cYELvM7sokbWAXvtdIH" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">AETHER_X</span>
        </div>
        <div className="flex flex-col items-center gap-3 group cursor-pointer">
          <div className="w-16 h-16 rounded-full border-2 border-outline-variant/20 p-1 group-hover:border-secondary transition-colors">
            <img alt="Vendor Beta" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPSCqbTBGrB0O78tr5qZNmtZwHV7z4DFhwzS-eYb02UCdxiKSIF1AId4HQ6CcQHl5tyS45iMQRfPV7ApCukG6amrvOwoftKah87r4hPNWqJQduz6Z5k_mOuMeq64HKs0UABt2MufvZ6DVcPgP9k9yMfYiXYgEgM2gTzMJCrDmQ3OJNU2fDxp4kO_mqcLlAyVFI2oMQV2LaOC9d3z41av2SX05D0yJIEQzoG3QY92AqXWgkRq-qROvqOIrwfJYiLJYVqvkylQcd2lrF" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">NEXUS_MOD</span>
        </div>
        <div className="flex flex-col items-center gap-3 group cursor-pointer">
          <div className="w-16 h-16 rounded-full border-2 border-outline-variant/20 p-1 group-hover:border-tertiary transition-colors">
            <img alt="Vendor Gamma" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwmReEKjcpM9HPlN8ct6teX9tOLcNNfOUl3M1giCOWilk8CdqN187cIwjHgVCYcSXyUyBEcki5C8hSiw7_sDiQDvNlh9xwti7M-pxN_cKBmi5GMJAQblybnwDsVLwTzqaJrp3lEGzkC0uqcs0qYwzMQNwBGxvckvsIQnTQPPhvc88Ci0v5PCsBBwhrq2Y_whsmMe3Hxi1WmCDWKbCMISfHcPK2Y8ZlGapqEvMiExafkCVf1FbGgrz04gg5RS8znyHmu1CVdgSMS6H8" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">VOID_DEV</span>
        </div>
        <div className="flex flex-col items-center gap-3 group cursor-pointer">
          <div className="w-16 h-16 rounded-full border-2 border-outline-variant/20 p-1 group-hover:border-primary transition-colors">
            <img alt="Vendor Delta" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdYg3MLCZzaEhLC9vGyi-A0jJah_1MXja3CP6WOebzBr6lOMg-uq4z0GoYPP3_YhPFYSENh4uadYTV9oIpwJrW2uAGF_2hNNnVCfKF1dXQPlIJF2y0jMibn8wCqFLJAaiDj_Wp_5yi24LneCWyzVR3XM3vV31B8YHfKEBcr9scJ5dd98OzbfZt0WyobW_1y2-hub2jCEwxuNRMHnA-K0WyKULBJa362JWVmcmYFSE0QhEQxpQWClxEMv6lSL7h8vDYOhj6TGGIDu0l" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">ORBIT_CORE</span>
        </div>
      </div>
    </div>
  );
};
