import Tabs from "@/shared/components/ui/Tabs";

interface Props { filters: string[]; active: string; onChange: (val: string) => void; }

export default function TaskFilterTabs({ filters, active, onChange }: Props) {
  const tabs = filters.map((f) => ({ value: f, label: f }));
  return <Tabs tabs={tabs} active={active} onChange={onChange} />;
}
