import { Input } from "@heroui/react";

function PhoneInput() {
  return (
    <Input
      className="max-w-xs"
      defaultValue="junior@heroui.com"
      label="Phone number"
      type="tel"
    />
  );
}
