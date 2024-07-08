import React, { useState } from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input.tsx';

export function Deposit() {
  const [firstName, setFirstName] = useState("");

  return (
    <FlowLayout>
      <Card title="Deposit funds" description="Accounts can be funded with as little as $5.">
        <div className="space-y-2">
          <Input label="Deposit Amount" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          <Button href="/signup/account-selection">Start over</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
