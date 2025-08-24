// SignalR Real-time Communication Service
// Centralized SignalR connection and event management

import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { BaseAddress } from '../api/client';

export interface SignalRService {
  connection: HubConnection | null;
  isConnected: boolean;
  connect: (hubName: string, token?: string) => Promise<void>;
  disconnect: () => Promise<void>;
  on: (eventName: string, callback: (...args: any[]) => void) => void;
  off: (eventName: string, callback?: (...args: any[]) => void) => void;
  send: (methodName: string, ...args: any[]) => Promise<void>;
}

class SignalRServiceImpl implements SignalRService {
  public connection: HubConnection | null = null;
  public isConnected: boolean = false;

  async connect(hubName: string, token?: string): Promise<void> {
    try {
      // Build connection
      const connectionBuilder = new HubConnectionBuilder()
        .withUrl(`${BaseAddress}${hubName}`, {
          accessTokenFactory: () => token || '',
        })
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .configureLogging(LogLevel.Information);

      this.connection = connectionBuilder.build();

      // Set up event handlers
      this.connection.onreconnecting((error) => {
        console.log('SignalR reconnecting:', error);
        this.isConnected = false;
      });

      this.connection.onreconnected((connectionId) => {
        console.log('SignalR reconnected:', connectionId);
        this.isConnected = true;
      });

      this.connection.onclose((error) => {
        console.log('SignalR connection closed:', error);
        this.isConnected = false;
      });

      // Start connection
      await this.connection.start();
      this.isConnected = true;
      console.log('SignalR connected successfully');

    } catch (error) {
      console.error('SignalR connection failed:', error);
      this.isConnected = false;
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.stop();
        this.isConnected = false;
        console.log('SignalR disconnected');
      } catch (error) {
        console.error('SignalR disconnect error:', error);
      }
    }
  }

  on(eventName: string, callback: (...args: any[]) => void): void {
    if (this.connection) {
      this.connection.on(eventName, callback);
    }
  }

  off(eventName: string, callback?: (...args: any[]) => void): void {
    if (this.connection) {
      if (callback) {
        this.connection.off(eventName, callback);
      } else {
        this.connection.off(eventName);
      }
    }
  }

  async send(methodName: string, ...args: any[]): Promise<void> {
    if (this.connection && this.isConnected) {
      try {
        await this.connection.send(methodName, ...args);
      } catch (error) {
        console.error(`SignalR send error for ${methodName}:`, error);
        throw error;
      }
    } else {
      throw new Error('SignalR connection not established');
    }
  }
}

// Singleton instance
export const signalRService = new SignalRServiceImpl();

// Common SignalR event types
export interface NotificationEvent {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  userId?: string;
}

export interface CallEvent {
  callId: string;
  fromUserId: string;
  toUserId: string;
  type: 'incoming' | 'outgoing' | 'ended';
  signal?: any;
}

export interface StatusEvent {
  userId: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  lastSeen?: Date;
}

// Helper functions for common SignalR operations
export const subscribeToNotifications = (
  callback: (notification: NotificationEvent) => void
): void => {
  signalRService.on('ReceiveNotification', callback);
};

export const subscribeToCallEvents = (
  callback: (callEvent: CallEvent) => void
): void => {
  signalRService.on('ReceiveCall', callback);
  signalRService.on('CallEnded', callback);
  signalRService.on('CallSignal', callback);
};

export const subscribeToStatusUpdates = (
  callback: (statusEvent: StatusEvent) => void
): void => {
  signalRService.on('UserStatusChanged', callback);
};

export const sendNotification = async (
  userId: string,
  notification: Omit<NotificationEvent, 'id' | 'timestamp'>
): Promise<void> => {
  await signalRService.send('SendNotification', userId, notification);
};

export const sendCallSignal = async (
  callId: string,
  signal: any
): Promise<void> => {
  await signalRService.send('SendCallSignal', callId, signal);
};

export const updateUserStatus = async (
  status: StatusEvent['status']
): Promise<void> => {
  await signalRService.send('UpdateStatus', status);
};
