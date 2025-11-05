import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"

type InputOTPCepProps = {
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (formatted: string, value: string) => void;
  status?: 'default' | 'valid' | 'invalid';
};

export function InputOTPCep({ value, onChange, status = 'default' }: InputOTPCepProps) {
  const getStatusClasses = () => {
    switch (status) {
      case 'valid':
        return 'border-green-500 focus:border-green-600 focus:ring-green-500';
      case 'invalid':
        return 'border-red-500 focus:border-red-600 focus:ring-red-500';
      default:
        return '';
    }
  };

  return (
    <InputOTP
      maxLength={8}
      pattern="[0-9]*"
      inputMode="numeric"
      value={value}
      onChange={(val: string) => onChange?.(val)}
      className={cn(getStatusClasses())}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} className={cn(getStatusClasses())} />
        <InputOTPSlot index={1} className={cn(getStatusClasses())} />
        <InputOTPSlot index={2} className={cn(getStatusClasses())} />
        <InputOTPSlot index={3} className={cn(getStatusClasses())} />
        <InputOTPSlot index={4} className={cn(getStatusClasses())} />
      </InputOTPGroup>

      - <InputOTPSeparator className="hidden" />

      <InputOTPGroup>
        <InputOTPSlot index={5} className={cn(getStatusClasses())} />
        <InputOTPSlot index={6} className={cn(getStatusClasses())} />
        <InputOTPSlot index={7} className={cn(getStatusClasses())} />
      </InputOTPGroup>
    </InputOTP>
  )
}
