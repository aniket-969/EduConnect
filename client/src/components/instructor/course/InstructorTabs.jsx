import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

export default function InstructorTabs({
  selectedTab,
  setSelectedTab,
  navigate,
}) {
  return (
    <Tabs
      value={selectedTab}
      onValueChange={(val) => {
        setSelectedTab(val);
        if (val === "all") {
          navigate("/app/instructor/courses", { replace: true });
        } else {
          navigate(`/app/instructor/courses/${val}`, { replace: true });
        }
      }}
      className="mb-6 mt-6"
    >
      <TabsList className="w-full flex gap-2 border-b bg-background p-0 rounded-b-none shadow-sm">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`flex-1 px-4 py-2 text-sm font-medium border-b-2 rounded-t-lg transition-colors duration-150
              ${
                selectedTab === tab.value
                  ? "border-primary text-primary bg-muted shadow"
                  : "border-transparent text-muted-foreground hover:text-primary bg-background"
              }
            `}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
