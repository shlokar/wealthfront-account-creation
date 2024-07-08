import React, { useState } from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input';

export function JointAccess() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <FlowLayout>
      <Card
        title="Will this be a joint account?"
        description="Joint accounts allow for a secondary account holder which provides the same level of access as the primary."
      >
        <div className="space-y-2">
          <Input label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          <Input label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Button href="/signup/stock-restrictions">Continue</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
