from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from datetime import datetime
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Health data simulation (in production, this would connect to a database)
def generate_health_metrics():
    """Generate realistic health data"""
    return {
        'heartRate': random.randint(60, 100),
        'bloodOxygen': random.randint(95, 100),
        'steps': random.randint(1000, 15000),
        'calories': random.randint(300, 2500),
        'sleepHours': round(random.uniform(6, 9), 1),
        'stressLevel': random.randint(20, 80),
        'waterIntake': random.randint(500, 3000),
        'timestamp': datetime.now().isoformat()
    }

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        'message': 'BodySense AI Flask API is running',
        'version': '1.0.0',
        'status': 'healthy'
    })

@app.route('/api/health/metrics', methods=['GET'])
def get_health_metrics():
    """Get current health metrics"""
    try:
        metrics = generate_health_metrics()
        return jsonify({
            'success': True,
            'data': metrics
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health/trends', methods=['GET'])
def get_health_trends():
    """Get health trends data"""
    try:
        hours = int(request.args.get('hours', 24))
        trends = []
        
        for i in range(hours):
            hour_data = {
                'time': f"{i:02d}:00",
                'heartRate': random.randint(60, 120),
                'bloodOxygen': random.randint(95, 100),
                'steps': random.randint(0, 500),
                'stressLevel': random.randint(20, 80)
            }
            trends.append(hour_data)
        
        return jsonify({
            'success': True,
            'data': trends
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health/alerts', methods=['GET'])
def get_health_alerts():
    """Get health alerts and AI insights"""
    try:
        alerts = [
            {
                'id': '1',
                'type': 'recommendation',
                'title': 'Hydration Reminder',
                'message': 'Your water intake is below the recommended 2L daily goal.',
                'timestamp': '2 minutes ago',
                'priority': 'medium'
            },
            {
                'id': '2',
                'type': 'achievement',
                'title': 'Sleep Goal Achieved!',
                'message': 'Great job! You\'ve maintained 7+ hours of sleep for 5 consecutive nights.',
                'timestamp': '1 hour ago',
                'priority': 'low'
            }
        ]
        
        return jsonify({
            'success': True,
            'data': alerts
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/emergency/doctors', methods=['GET'])
def get_emergency_doctors():
    """Get nearby emergency doctors"""
    try:
        latitude = request.args.get('lat', 40.7128)
        longitude = request.args.get('lng', -74.0060)
        
        doctors = [
            {
                'id': '1',
                'name': 'Dr. Sarah Johnson',
                'specialty': 'Cardiology',
                'hospital': 'City Medical Center',
                'distance': 0.8,
                'rating': 4.9,
                'availability': 'available',
                'phone': '+1 (555) 123-4567',
                'address': '123 Medical Drive, Downtown'
            },
            {
                'id': '2',
                'name': 'Dr. Michael Chen',
                'specialty': 'Emergency Medicine',
                'hospital': 'General Hospital',
                'distance': 1.2,
                'rating': 4.8,
                'availability': 'available',
                'phone': '+1 (555) 987-6543',
                'address': '456 Health Street, Midtown'
            }
        ]
        
        return jsonify({
            'success': True,
            'data': doctors
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health/metrics', methods=['POST'])
def save_health_metrics():
    """Save health metrics (for wearable device integration)"""
    try:
        data = request.get_json()
        
        # In production, save to database
        # For now, just validate and return success
        required_fields = ['heartRate', 'bloodOxygen', 'steps']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        return jsonify({
            'success': True,
            'message': 'Health metrics saved successfully',
            'data': data
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)