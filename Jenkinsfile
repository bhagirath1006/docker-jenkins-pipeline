pipeline {
    agent any
 
    environment {
        PROJECT_REPO = 'https://github.com/bhagirath1006/docker-jenkins-pipeline.git'
        MIN_CONTAINER_COUNT = 12
    }
 
    stages {
 
        stage('Install Docker & Docker Compose') {
            steps {
                echo "Installing Docker and Docker Compose..."
                sh '''
                # Update system
                sudo apt-get update -y
 
                # Install required packages
                sudo apt-get install -y \
                    ca-certificates \
                    curl \
                    gnupg \
                    lsb-release
 
                # Install Docker if not installed
                if ! command -v docker >/dev/null 2>&1; then
                    curl -fsSL https://get.docker.com | sudo sh
                fi
 
                # Start and enable Docker
                sudo systemctl start docker
                sudo systemctl enable docker
 
                # Add Jenkins user to docker group
                sudo usermod -aG docker $USER
 
                # Install Docker Compose plugin if not installed
                if ! docker compose version >/dev/null 2>&1; then
                    sudo mkdir -p /usr/local/lib/docker/cli-plugins
                    sudo curl -SL https://github.com/docker/compose/releases/download/v2.29.2/docker-compose-linux-x86_64 \
                        -o /usr/local/lib/docker/cli-plugins/docker-compose
                    sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
                fi
 
                docker --version
                docker compose version
                '''
            }
        }
 
        stage('Checkout Code') {
            steps {
                echo "Checking out latest code..."
                git branch: 'main', url: "${PROJECT_REPO}"
            }
        }
 
        stage('Clean Previous Containers') {
            steps {
                echo "Cleaning old containers (if any)..."
                sh '''
                docker compose down --remove-orphans || true
                '''
            }
        }
 
        stage('Build Docker Images') {
            steps {
                echo "Building all container images..."
                sh '''
                docker compose build
                '''
            }
        }
 
        stage('Run Containers') {
            steps {
                echo "Starting all containers..."
                sh '''
                docker compose up -d
                '''
            }
        }
 
        stage('Verify Containers') {
            steps {
                echo "Verifying that all containers are running..."
                sh '''
                docker ps
 
                COUNT=$(docker ps -q | wc -l)
                echo "Running container count: $COUNT"
 
                if [ "$COUNT" -lt "${MIN_CONTAINER_COUNT}" ]; then
                    echo "Expected at least ${MIN_CONTAINER_COUNT} containers, but found $COUNT"
                    exit 1
                fi
 
                echo "All containers are running successfully!"
                '''
            }
        }
    }
}