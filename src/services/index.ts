// Services Barrel Export
// Main entry point for all services

export * from './api';
export * from './realtime/signalr';

// Service initialization helper
export const initializeServices = async (token?: string) => {
  // Initialize SignalR connection
  const { signalRService } = await import('./realtime/signalr');
  
  try {
    await signalRService.connect('MMSHHUB/Notification', token);
    console.log('Services initialized successfully');
  } catch (error) {
    console.error('Service initialization failed:', error);
  }
};

// Service cleanup helper
export const cleanupServices = async () => {
  const { signalRService } = await import('./realtime/signalr');
  
  try {
    await signalRService.disconnect();
    console.log('Services cleaned up successfully');
  } catch (error) {
    console.error('Service cleanup failed:', error);
  }
};
