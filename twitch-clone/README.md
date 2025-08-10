# twitch-clone-live

## What's inside
- backend/ — Express + NodeMediaServer (RTMP -> HLS), OAuth via Passport (Google & GitHub)
- frontend/ — simple HTML/CSS/vanilla JS pages (index, channel, auth)
- Dockerfile + docker-compose for quick local deploy (installs ffmpeg)

## Quickstart (local)
1. copy `.env.example` to `backend/.env` and set credentials (Google/GitHub) if you want OAuth.
2. from `backend/` run `npm install`
3. run `npm start`
4. open `http://localhost:3000/` and open demo channel `channel.html?s=demo`
5. stream from OBS to `rtmp://localhost:1935/live` with stream key `demo`

## Docker
- build: `docker build -t twitch-clone-live-backend ./backend`
- run: `docker run -p 3000:3000 -p 1935:1935 -p 8000:8000 twitch-clone-live-backend`

## Notes
- This is a demo project. For production you need stronger security, HTTPS, proper session/JWT flows, RTMP auth and scaling.
