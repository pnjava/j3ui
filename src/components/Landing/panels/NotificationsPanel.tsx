import { Info, OctagonX } from "lucide-react";
import BasePanel from "./BasePanel";
import NotificationCard from "./NotificationCard";

const NotificationsPanel = () => (
  <BasePanel title="Notifications">
    <NotificationCard title="Annual rate change is coming" date="12/18/2024" iconColor="bg-[#e6f0f5]" IconComponent={Info}>
        Remember to change your plans by MM/DD/YYYY.
    </NotificationCard>
    <NotificationCard title="Annual rate change is coming" date="12/18/2024" iconColor="bg-[#f1f6ec]" IconComponent={OctagonX}>
        Remember to change your plans by MM/DD/YYYY.
    </NotificationCard>
    <NotificationCard title="Annual rate change is coming" date="12/18/2024" iconColor="bg-[#e6f0f5]" IconComponent={Info}>
        Remember to change your plans by MM/DD/YYYY.
    </NotificationCard>
  </BasePanel>
);

export default NotificationsPanel;
