import React, { useState } from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input';

export function CreateUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <FlowLayout>
      <Card title="What's your first and last name?">
        <div className="space-y-2">
          <Input label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          <Input label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Button href="/signup/joint-access">Continue</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
