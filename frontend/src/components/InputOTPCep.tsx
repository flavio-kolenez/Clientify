import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

type InputOTPCepProps = {
  onComplete?: (formatted: string, value: string) => void;
};

export function InputOTPCep({ onComplete }: InputOTPCepProps) {
  return (
    <InputOTP
      maxLength={8}
      pattern="[0-9]*"
      inputMode="numeric"
      onComplete={(value: string) => {
        const formatted = `${value.slice(0, 5)}-${value.slice(5)}`
        onComplete?.(formatted, value)
      }}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
      </InputOTPGroup>

 - 
      <InputOTPGroup>
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
    </InputOTP>
  )
}
