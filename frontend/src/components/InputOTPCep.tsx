import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

type InputOTPCepProps = {
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (formatted: string, value: string) => void;
};

export function InputOTPCep({ onComplete, value, onChange }: InputOTPCepProps) {
  return (
    <InputOTP
      maxLength={8}
      pattern="[0-9]*"
      inputMode="numeric"
      value={value}

      onChange={(val: string) => onChange?.(val)}
      onComplete={(val: string) => {
        const formatted = `${val.slice(0, 5)}-${val.slice(5)}`
        onComplete?.(formatted, val)
      }}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
      </InputOTPGroup>

      <InputOTPSeparator className="hidden" />

      <InputOTPGroup>
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
    </InputOTP>
  )
}
