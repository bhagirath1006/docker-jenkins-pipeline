pipeline {
    agent any

    environment {
        PROJECT_REPO = 'https://github.com/bhagirath1006/docker-jenkins-pipeline.git'
        EXPECTED_CONTAINER_COUNT = 12
    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Cloning repository..."
                git branch: 'main', url: "${PROJECT_REPO}"
            }
        }

        stage('Clean Old Containers') {
            steps {
                echo "Stopping old containers..."
                sh '''
                if docker compose version >/dev/null 2>&1; then
                    docker compose down || true
                else
                    docker-compose down || true
                fi
                '''
            }
        }

        stage('Build 12 Docker Images') {
            steps {
                echo "Building Docker images..."
                sh '''
                if docker compose version >/dev/null 2>&1; then
                    docker compose build
                else
                    docker-compose build
                fi
                '''
            }
        }

        stage('Deploy 12 Containers') {
            steps {
                echo "Starting containers..."
                sh '''
                if docker compose version >/dev/null 2>&1; then
                    docker compose up -d
                else
                    docker-compose up -d
                fi
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                docker ps

                RUNNING=$(docker ps -q | wc -l)
                echo "Running containers: $RUNNING"

                if [ "$RUNNING" -lt "$EXPECTED_CONTAINER_COUNT" ]; then
                    echo " Not all containers are running"
                    exit 1
                else
                    echo " All 12 containers are running"
                fi
                '''
            }
        }
    }

    post {
        success {
            echo " Deployment successful"
        }
        failure {
            echo " Deployment failed"
        }
    }
}
