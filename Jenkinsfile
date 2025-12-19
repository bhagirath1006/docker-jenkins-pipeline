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
                echo "Stopping and removing old containers..."
                sh '''
                docker compose down --remove-orphans || true
                '''
            }
        }

        stage('Build 12 Docker Images') {
            steps {
                echo "Building Docker images for all 12 services..."
                sh '''
                docker compose build --no-cache
                '''
            }
        }

        stage('Deploy 12 Containers') {
            steps {
                echo "Starting containers..."
                sh '''
                docker compose up -d
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Verifying container status..."
                sh '''
                docker ps

                RUNNING_COUNT=$(docker ps --format '{{.Names}}' | wc -l)
                echo "Running containers: $RUNNING_COUNT"

                if [ "$RUNNING_COUNT" -lt "$EXPECTED_CONTAINER_COUNT" ]; then
                    echo " Deployment failed: Not all containers are running"
                    exit 1
                else
                    echo " Deployment successful: All 12 containers are running"
                fi
                '''
            }
        }
    }

    post {
        success {
            echo " Jenkins pipeline completed successfully"
        }
        failure {
            echo " Jenkins pipeline failed"
        }
        always {
            echo "Pipeline execution finished"
        }
    }
}
