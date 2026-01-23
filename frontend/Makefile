.PHONY: help create save discard

help:
	@echo "Frontend helpers:"
	@echo "  make create   - create/switch to a feature branch from main (with safety prompts)"
	@echo "  make save     - run checks, commit, and push current branch"
	@echo "  make discard  - drop all uncommitted frontend changes (with confirmation)"

create:
	@set -e; \
	current_branch=$$(git rev-parse --abbrev-ref HEAD); \
	status=$$(git status --porcelain); \
	dirty=0; [ -n "$$status" ] && dirty=1; \
	if [ "$$current_branch" != "main" ]; then \
		if [ $$dirty -eq 1 ]; then \
			echo "You have uncommitted changes on '$$current_branch'."; \
			echo "Choose: (m) move changes to a new branch, (l) lose changes, (c) cancel"; \
			read -r ans; \
			case $$ans in \
				m|M) \
					read -r -p "Enter new branch slug (e.g., feat/new-page): " slug; \
					[ -n "$$slug" ] || { echo "No branch name given. Aborting."; exit 1; }; \
					git stash push -u -m "make-create-$$slug"; \
					git checkout main; \
					git checkout -b "$$slug"; \
					if git stash pop; then echo "Restored your changes onto $$slug."; else echo "Stash pop had conflicts; resolve manually."; fi; \
					exit 0 ;; \
				l|L) \
					read -r -p "Type 'yes' to discard ALL uncommitted changes: " confirm; \
					[ "$$confirm" = "yes" ] || { echo "Cancelled."; exit 1; }; \
					git reset --hard HEAD -- frontend; \
					git clean -fd frontend; \
					git checkout main; \
					dirty=0 ;; \
				*) echo "Cancelled."; exit 1 ;; \
			esac; \
		else \
			git checkout main; \
		fi; \
	fi; \
	status_main=$$(git status --porcelain); \
	if [ -n "$$status_main" ]; then \
		echo "Main has uncommitted changes."; \
		echo "Choose: (m) move changes to new branch, (l) lose changes, (c) cancel"; \
		read -r ans2; \
		case $$ans2 in \
			m|M) \
				read -r -p "Enter new branch slug (e.g., feat/new-page): " slug; \
				[ -n "$$slug" ] || { echo "No branch name given. Aborting."; exit 1; }; \
				git checkout -b "$$slug"; \
				echo "Switched to $$slug with your existing changes."; \
				exit 0 ;; \
			l|L) \
				read -r -p "Type 'yes' to discard ALL uncommitted changes: " confirm; \
				[ "$$confirm" = "yes" ] || { echo "Cancelled."; exit 1; }; \
				git reset --hard HEAD -- frontend; \
				git clean -fd frontend; \
				echo "Cleaned working tree on main."; \
				status_main=""; \
				;; \
			*) echo "Cancelled."; exit 1 ;; \
		esac; \
	fi; \
	read -r -p "Enter new branch slug (e.g., feat/new-page): " slug; \
	[ -n "$$slug" ] || { echo "No branch name given. Aborting."; exit 1; }; \
	git checkout -b "$$slug"; \
	echo "Created and switched to '$$slug' from main."

save:
	@set -e; \
	echo "Running pre-commit checks (npm run build)..."; \
	if ! npm run build; then \
		echo "Build failed. Fix the above issues (ask your LLM if needed) and run 'make save' again."; \
		exit 1; \
	fi; \
	git add -A; \
	read -r -p "Enter commit message (e.g., 'feat: New page'): " msg; \
	[ -n "$$msg" ] || { echo "Commit message required. Aborting."; exit 1; }; \
	if ! git commit -m "$$msg"; then \
		echo "Commit failed (possibly no changes staged). Resolve and try again."; \
		exit 1; \
	fi; \
	branch=$$(git rev-parse --abbrev-ref HEAD); \
	if ! git push -u origin "$$branch"; then \
		echo "Push failed. Check your network/permissions and retry."; \
		exit 1; \
	fi; \
	echo "Saved and pushed to '$$branch'."

discard:
	@set -e; \
	echo "WARNING: This will delete ALL uncommitted changes in frontend/ (staged and unstaged)."; \
	read -r -p "Type 'yes' to proceed: " ans; \
	[ "$$ans" = "yes" ] || { echo "Cancelled."; exit 1; }; \
	git reset --hard HEAD -- frontend; \
	git clean -fd frontend; \
	echo "Uncommitted changes in frontend/ discarded."
