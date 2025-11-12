import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export function ActiveStatusBadge({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border mt-4 mb-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Status:</span>
        <Badge variant={value ? "success" : "secondary"} className="text-xs">
          {value ? "Ativo" : "Inativo"}
        </Badge>
      </div>

      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}
