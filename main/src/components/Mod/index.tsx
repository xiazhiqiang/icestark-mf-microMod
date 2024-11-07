import React from 'react';
import { MicroModule, getModules } from '@ice/stark-module';

export default function Mod() {
  return (
    <div>
      <MicroModule
        // moduleName="microMod"
        moduleInfo={{
          url: ['http://localhost:8883/modules/index.js', 'http://localhost:8883/modules/index.css'],
          name: 'microMod',
        }}
      />
    </div>
  );
}
