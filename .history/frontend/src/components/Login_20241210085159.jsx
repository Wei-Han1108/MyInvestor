
"use client";

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

export function Login() {
  return (
    <Card className="flex max-w-md flex-col gap-2">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username1" value="Your username" />
        </div>
        <TextInput id="username1" type="username" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
    </Card>
  );
}
