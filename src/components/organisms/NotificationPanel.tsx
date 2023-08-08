// NotificationPanel.tsx

import React from 'react';

interface NotificationPanelProps {
  userLogoUrl: string;
  userName: string;
  notifications: string[];
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ userLogoUrl, userName, notifications }) => {
    return (
        <div>
          <div className="bg-slate-600 text-white py-4 px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold">Aurora App</h1>
            <div>
              <img
                className="w-8 h-8 rounded-full object-cover mr-2"
                src={userLogoUrl}
                alt={userName}
              />
              <span>{userName}</span>
            </div>
          </div>
        </div>
      );
};

export default NotificationPanel;
