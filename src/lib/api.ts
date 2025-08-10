// API configuration for Flask backend integration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-flask-api.herokuapp.com' 
  : 'http://localhost:5000';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Health Metrics API
export async function fetchHealthMetrics() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health/metrics`);
    const result: ApiResponse<any> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    // Fallback to local generation if API fails
    return generateHealthMetrics();
  } catch (error) {
    console.warn('API unavailable, using local data:', error);
    return generateHealthMetrics();
  }
}

export async function fetchHealthTrends(hours: number = 24) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health/trends?hours=${hours}`);
    const result: ApiResponse<any[]> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    // Fallback to local generation if API fails
    return generateTrendData(hours);
  } catch (error) {
    console.warn('API unavailable, using local data:', error);
    return generateTrendData(hours);
  }
}

export async function fetchHealthAlerts() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health/alerts`);
    const result: ApiResponse<any[]> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    // Fallback to local generation if API fails
    return generateAIInsights();
  } catch (error) {
    console.warn('API unavailable, using local data:', error);
    return generateAIInsights();
  }
}

export async function saveHealthMetrics(metrics: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health/metrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metrics),
    });
    
    const result: ApiResponse<any> = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to save health metrics:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function fetchEmergencyDoctors(lat?: number, lng?: number) {
  try {
    const params = new URLSearchParams();
    if (lat) params.append('lat', lat.toString());
    if (lng) params.append('lng', lng.toString());
    
    const response = await fetch(`${API_BASE_URL}/api/emergency/doctors?${params}`);
    const result: ApiResponse<any[]> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    // Fallback to local data if API fails
    return [];
  } catch (error) {
    console.warn('Emergency API unavailable:', error);
    return [];
  }
}

// Fallback functions (keep existing local generation functions)
import { generateHealthMetrics, generateTrendData, generateAIInsights } from './healthData';