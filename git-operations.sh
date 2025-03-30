
#!/bin/bash
# MedReport Git Operations Helper Script

# Color codes for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}MedReport Project Git Operations${NC}"
echo -e "${BLUE}========================================${NC}"

# Function to check if we're in a git repository
check_git_repo() {
  if [ ! -d .git ]; then
    echo -e "${RED}Error: Not a git repository!${NC}"
    echo -e "Run 'git init' to initialize a new repository."
    exit 1
  fi
}

# Initialize repository if needed
init_repo() {
  if [ ! -d .git ]; then
    echo -e "${YELLOW}Initializing git repository...${NC}"
    git init
    echo -e "${GREEN}Repository initialized!${NC}"
  else
    echo -e "${YELLOW}Repository already initialized.${NC}"
  fi
}

# Add all files and commit
commit_all() {
  check_git_repo
  echo -e "${YELLOW}Adding all files...${NC}"
  git add .
  echo -e "${YELLOW}Enter commit message:${NC}"
  read commit_message
  git commit -m "$commit_message"
  echo -e "${GREEN}Changes committed!${NC}"
}

# Pull from remote repository
pull_changes() {
  check_git_repo
  echo -e "${YELLOW}Pulling latest changes...${NC}"
  git pull
  echo -e "${GREEN}Pull complete!${NC}"
}

# Push to remote repository
push_changes() {
  check_git_repo
  echo -e "${YELLOW}Pushing to remote...${NC}"
  git push
  echo -e "${GREEN}Push complete!${NC}"
}

# Check status
check_status() {
  check_git_repo
  echo -e "${YELLOW}Current git status:${NC}"
  git status
}

# Show commit history
show_history() {
  check_git_repo
  echo -e "${YELLOW}Recent commit history:${NC}"
  git log --oneline --graph --decorate -n 10
}

# Create and checkout a new branch
create_branch() {
  check_git_repo
  echo -e "${YELLOW}Enter new branch name:${NC}"
  read branch_name
  git checkout -b "$branch_name"
  echo -e "${GREEN}Created and switched to branch: $branch_name${NC}"
}

# List all branches
list_branches() {
  check_git_repo
  echo -e "${YELLOW}All branches:${NC}"
  git branch -a
}

# Switch branch
switch_branch() {
  check_git_repo
  echo -e "${YELLOW}Current branches:${NC}"
  git branch
  echo -e "${YELLOW}Enter branch name to switch to:${NC}"
  read branch_name
  git checkout "$branch_name"
  echo -e "${GREEN}Switched to branch: $branch_name${NC}"
}

# Merge branch
merge_branch() {
  check_git_repo
  echo -e "${YELLOW}Enter branch name to merge into current branch:${NC}"
  read branch_name
  git merge "$branch_name"
  echo -e "${GREEN}Merged $branch_name into current branch${NC}"
}

# Configure git user
configure_user() {
  echo -e "${YELLOW}Enter your name:${NC}"
  read user_name
  echo -e "${YELLOW}Enter your email:${NC}"
  read user_email
  git config user.name "$user_name"
  git config user.email "$user_email"
  echo -e "${GREEN}Git user configured!${NC}"
}

# Show menu
show_menu() {
  echo -e "${BLUE}========================================${NC}"
  echo -e "${GREEN}Select an operation:${NC}"
  echo -e "${BLUE}========================================${NC}"
  echo -e "1. ${YELLOW}Initialize repository${NC}"
  echo -e "2. ${YELLOW}Commit all changes${NC}"
  echo -e "3. ${YELLOW}Pull latest changes${NC}"
  echo -e "4. ${YELLOW}Push to remote${NC}"
  echo -e "5. ${YELLOW}Check repository status${NC}"
  echo -e "6. ${YELLOW}Show commit history${NC}"
  echo -e "7. ${YELLOW}Create new branch${NC}"
  echo -e "8. ${YELLOW}List all branches${NC}"
  echo -e "9. ${YELLOW}Switch branch${NC}"
  echo -e "10. ${YELLOW}Merge branch${NC}"
  echo -e "11. ${YELLOW}Configure git user${NC}"
  echo -e "0. ${RED}Exit${NC}"
  echo -e "${BLUE}========================================${NC}"
  echo -e "${YELLOW}Enter your choice [0-11]:${NC}"
  read choice

  case $choice in
    1) init_repo; show_menu ;;
    2) commit_all; show_menu ;;
    3) pull_changes; show_menu ;;
    4) push_changes; show_menu ;;
    5) check_status; show_menu ;;
    6) show_history; show_menu ;;
    7) create_branch; show_menu ;;
    8) list_branches; show_menu ;;
    9) switch_branch; show_menu ;;
    10) merge_branch; show_menu ;;
    11) configure_user; show_menu ;;
    0) echo -e "${GREEN}Goodbye!${NC}"; exit 0 ;;
    *) echo -e "${RED}Invalid option. Please try again.${NC}"; show_menu ;;
  esac
}

# Start the script
show_menu
