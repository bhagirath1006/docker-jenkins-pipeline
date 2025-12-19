pipeline {
    agent any

    environment {
        PROJECT_REPO = 'https://github.com/bhagirath1006/docker-jenkins-pipeline.git'
        MIN_CONTAINER_COUNT = 12
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: "${PROJECT_REPO}"
            }
        }

        stage('Clean Previous Containers') {
            steps {
                sh '''
                docker compose down --remove-orphans || true
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker compose build
                '''
            }
        }

        stage('Run Containers') {
            steps {
                sh '''
                docker compose up -d
                '''
            }
        }

        stage('Verify Containers') {
            steps {
                sh '''
                echo "Running containers:"
                docker ps

                COUNT=$(docker ps -q | wc -l)
                echo "Container count: $COUNT"

                if [ "$COUNT" -lt "$MIN_CONTAINER_COUNT" ]; then
                    echo " Not enough containers running"
                    exit 1
                else
                    echo " All containers are running"
                fi
                '''
            }
        }
    }
}
