pipeline {
    agent any

    environment {
        PROJECT_REPO = 'https://github.com/bhagirath1006/docker-jenkins-pipeline.git'
        MIN_CONTAINER_COUNT = 12
    }

    stages {

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
                docker compose down
                // if docker compose version >/dev/null 2>&1; then
                //     docker compose down --remove-orphans || true
                // else
                //     docker-compose down --remove-orphans || true
                // fi
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building all container images..."
                sh '''
                if docker compose version >/dev/null 2>&1; then
                    docker compose build
                else
                    docker-compose build
                fi
                '''
            }
        }

        stage('Run Containers') {
            steps {
                echo "Starting all containers..."
                sh '''
                if docker compose version >/dev/null 2>&1; then
                    docker compose up -d
                else
                    docker-compose up -d
                fi
                '''
            }
        }

        stage('Verify Containers') {
            steps {
                echo "Verifying that all containers are running..."
                sh '''
                echo "Current running containers:"
                docker ps

                COUNT=$(docker ps -q | wc -l)

                echo "Running container count: $COUNT"

                if [ $COUNT -lt ${MIN_CONTAINER_COUNT} ]; then
                    echo "Expected ${MIN_CONTAINER_COUNT}+ containers, but found $COUNT"
                    echo "Some containers may have failed to start."
                    exit 1
                fi

                echo "All ${COUNT} containers are running successfully!"
                '''
            }
        }
    }
}
