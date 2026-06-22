@echo off
title Weekend CompetitorIQ - Dev Server
echo Start browser at http://localhost:3000/...
start http://localhost:3000/
echo Starting Next.js Dev Server...
cd app
call npm run dev
