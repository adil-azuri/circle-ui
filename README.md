
# Circle Social Media App 🚀

## Environment Variables

To configure the application for your specific backend domain, you need to set up environment variables. Create a `.env` file in the root directory of the project with the following variables:

```env
# API Base URL - used for HTTP requests
VITE_API_URL=https://your-api-domain.com/api/v1

# WebSocket URL - used for real-time communication
VITE_WEBSOCKET_URL=wss://your-api-domain.com
```

You can also refer to the `.env.example` file for a template.

## Default Values

If no environment variables are set, the application will use the following default values:
- API URL: `https://circle-api-adil.vercel.app/api/v1`
- WebSocket URL: `wss://circle-api-adil.vercel.app`
