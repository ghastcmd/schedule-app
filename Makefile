dev:
	$(MAKE) -j frontend backend

.PHONY: backend frontend

backend:
	cd ./backend && start cmd /c "npm run start:dev"

backend-debug:
	cd ./backend && start cmd /c "npm run start:debug"

frontend:
	cd ./frontend && start cmd /k "npm run dev"