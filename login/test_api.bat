@echo off
for /l %%i in (1, 1,15) do (
    curl -X GET http://localhost:8000/api/business/
)
