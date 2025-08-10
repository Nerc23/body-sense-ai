# BodySense AI Flask API

This Flask API provides backend services for the BodySense AI health monitoring application.

## Features

- Health metrics simulation and storage
- Real-time health trend analysis
- Emergency doctor finder API
- Health alerts and AI insights
- Wearable device integration endpoints

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Run the development server:
```bash
python app.py
```

## API Endpoints

### Health Metrics
- `GET /api/health/metrics` - Get current health metrics
- `POST /api/health/metrics` - Save health metrics from devices
- `GET /api/health/trends?hours=24` - Get health trends data

### Alerts & Insights
- `GET /api/health/alerts` - Get AI health insights and alerts

### Emergency Services
- `GET /api/emergency/doctors?lat=40.7128&lng=-74.0060` - Find nearby doctors

## Deployment

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Railway
```bash
railway login
railway init
railway up
```

### Render
1. Connect your GitHub repository
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `gunicorn app:app`

## Integration with React Frontend

The React app can consume this API by updating the base URL in the health data functions:

```javascript
const API_BASE_URL = 'https://your-flask-api.herokuapp.com';

export async function fetchHealthMetrics() {
  const response = await fetch(`${API_BASE_URL}/api/health/metrics`);
  return response.json();
}
```