pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/saransh-del/Container-project.git'
            }
        }

        stage('Clean Previous Containers') {
            steps {
                sh 'docker-compose down --remove-orphans || true'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Verify Containers') {
            steps {
                sh '''
                echo "Running containers:"
                docker ps
                COUNT=$(docker ps -q | wc -l)
                if [ $COUNT -lt 5 ]; then
                    echo "❌ Some containers failed to start"
                    exit 1
                else
                    echo "✅ All containers running successfully!"
                fi
                '''
            }
        }
    }

    
}
