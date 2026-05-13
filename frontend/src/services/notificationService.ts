import api from './api';

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isRead: boolean;
  organization: string;
  createdAt: string;
  data?: Record<string, any>;
}

export const notificationService = {
  getNotifications: async (orgId: string, params: { page?: number; limit?: number; unreadOnly?: boolean } = {}) => {
    const response = await api.get(`/organizations/${orgId}/notifications`, { params });
    return response.data;
  },

  markAsRead: async (orgId: string, notificationId: string) => {
    const response = await api.put(`/organizations/${orgId}/notifications/${notificationId}/read`);
    return response.data;
  },

  markAllAsRead: async (orgId: string) => {
    const response = await api.put(`/organizations/${orgId}/notifications/read-all`);
    return response.data;
  },

  deleteNotification: async (orgId: string, notificationId: string) => {
    const response = await api.delete(`/organizations/${orgId}/notifications/${notificationId}`);
    return response.data;
  },
};