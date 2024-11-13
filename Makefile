dev:
	$(MAKE) -j frontend backend

.PHONY: backend frontend

backend:
	cd ./backend && start cmd /c "npm run start:dev"

frontend:
	cd ./frontend && start cmd /k "npm run dev"