# Student Management System

This is a Spring Boot application for managing student information. It provides a RESTful API to perform CRUD operations on student records.

## Features

- Add, update, delete, and retrieve student information.
- Simple and intuitive REST API.
- Built with Spring Boot and JPA for easy database interaction.

## Project Structure

```
student-management-system
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── studentmanagement
│   │   │               ├── StudentManagementApplication.java
│   │   │               ├── controller
│   │   │               │   └── StudentController.java
│   │   │               ├── model
│   │   │               │   └── Student.java
│   │   │               ├── repository
│   │   │               │   └── StudentRepository.java
│   │   │               └── service
│   │   │                   └── StudentService.java
│   │   └── resources
│   │       ├── application.properties
│   │       └── static
│   │       └── templates
│   └── test
│       └── java
│           └── com
│               └── example
│                   └── studentmanagement
│                       └── StudentManagementApplicationTests.java
├── mvnw
├── mvnw.cmd
└── pom.xml
```

## Getting Started

### Prerequisites

- Java 11 or higher
- Maven

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd student-management-system
   ```

3. Run the application:
   ```
   ./mvnw spring-boot:run
   ```

### API Endpoints

- `GET /students` - Retrieve all students
- `GET /students/{id}` - Retrieve a student by ID
- `POST /students` - Create a new student
- `PUT /students/{id}` - Update an existing student
- `DELETE /students/{id}` - Delete a student

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.