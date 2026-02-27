import { AppActivityLog } from '../types';
import { supabase } from '../lib/supabase';

class AnalyticsService {
  private logs: AppActivityLog[] = [];

  async track(action: AppActivityLog['action'], userId: string, category?: string, metadata?: any) {
    const log: AppActivityLog = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      action,
      category,
      timestamp: new Date().toISOString(),
      metadata
    };
    this.logs.push(log);

    // Log in development console
    console.debug('[MIRA Analytics]', log);

    // Send to Supabase async without waiting
    supabase.from('activity_logs').insert([{
      user_id: userId,
      action: action,
      category: category || null,
      metadata: metadata || {}
    }]).then(({ error }) => {
      if (error) console.error('Failed to save analytics to DB', error);
    });
  }

  getLogs() {
    return [...this.logs];
  }

  getLogsByTimeRange(range: 'day' | 'week' | 'month' | 'year') {
    const now = new Date();
    const filterDate = new Date();

    if (range === 'day') filterDate.setDate(now.getDate() - 1);
    else if (range === 'week') filterDate.setDate(now.getDate() - 7);
    else if (range === 'month') filterDate.setMonth(now.getMonth() - 1);
    else if (range === 'year') filterDate.setFullYear(now.getFullYear() - 1);

    return this.logs.filter(log => new Date(log.timestamp) >= filterDate);
  }
}

export const analytics = new AnalyticsService();
