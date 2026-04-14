pipeline {
    agent any

    environment {
        IMAGE_NAME = "nikhilabba12/bank-system:latest"
    }

    stages {

        stage('Clone Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push %IMAGE_NAME%'
            }
        }

        // ✅ ADD HERE
        stage('Run Container') {
            steps {
                bat 'docker rm -f bank-system-container || true'
                bat 'docker run -d -p 3000:3000 --name bank-system-container %IMAGE_NAME%'
            }
        }

    }
}